import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import {Session} from "../session";
import {Key} from "../object";
import {Mechanism, MechanismType} from "../mech";

const DEFAULT_BLOCK_SIZE = 256 >> 3;

export class Decipher extends core.BaseObject {

    protected session: Session;
    protected blockSize = DEFAULT_BLOCK_SIZE;

    constructor(session: Session, alg: MechanismType, key: Key, blockSize: number, lib: pkcs11.PKCS11) {
        super(lib);
        this.session = session;
        this.blockSize = blockSize || DEFAULT_BLOCK_SIZE;

        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
    }

    update(data: Buffer): Buffer {
        try {
            let len = Math.ceil(data.length / this.blockSize) * this.blockSize;
            let dec = new Buffer(len);

            let res = this.lib.C_DecryptUpdate(this.session.handle, data, dec);

            return res;
        }
        catch (e) {
            try {
                // Finalize decrypt operation
                this.final();
            }
            catch (e) { }

            throw e;
        }
    }

    final(): Buffer {
        let dec = new Buffer(this.blockSize);

        let res = this.lib.C_DecryptFinal(this.session.handle, dec);

        return res;
    }

    once(data: Buffer, dec: Buffer): Buffer;
    once(data: Buffer, dec: Buffer, cb: (error: Error, data: Buffer) => void): void;
    once(data: Buffer, dec: Buffer, cb?: (error: Error, data: Buffer) => void): any {
        if (cb) {
            this.lib.C_Decrypt(this.session.handle, data, dec, cb);
        }
        else
            return this.lib.C_Decrypt(this.session.handle, data, dec);
    }

}