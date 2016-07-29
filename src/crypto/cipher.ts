import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import {Session} from "../session";
import {Key} from "../object";
import {Mechanism, MechanismType} from "../mech";

export class Cipher extends core.BaseObject {

    session: Session;

    constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.PKCS11) {
        super(lib);
        this.session = session;

        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        this.lib.C_EncryptInit(this.session.handle, pMech, key.handle);
    }

    update(data: core.CryptoData): Buffer {
        try {
            data = new Buffer(data as string);

            let enc = new Buffer(data.length + 1024); // RSA k + 2*mdlen + 2

            let res = this.lib.C_EncryptUpdate(this.session.handle, data as Buffer, enc);
            return res;
        }
        catch (e) {
            try {
                // Finalize encrypt operation
                this.final();
            }
            catch (e) { }

            throw e;
        }
    }

    final(): Buffer {
        const BUF_SIZE = 4048;
        let enc = new Buffer(BUF_SIZE);

        let res = this.lib.C_EncryptFinal(this.session.handle, enc);

        return res;
    }

    once(data: core.CryptoData, enc: Buffer): Buffer;
    once(data: core.CryptoData, enc: Buffer, cb: (error: Error, data: Buffer) => void): void;
    once(data: core.CryptoData, enc: Buffer, cb?: (error: Error, data: Buffer) => void): any {
        let _data = new Buffer(data as string);
        if (cb) {
            this.lib.C_Encrypt(this.session.handle, _data, enc, cb);
        }
        else
            return this.lib.C_Encrypt(this.session.handle, _data, enc);
    }
}