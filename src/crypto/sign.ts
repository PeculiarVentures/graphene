import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import {Session} from "../session";
import * as objects from "../object";
import * as mech from "../mech";

export class Sign extends core.BaseObject {

    session: Session;

    constructor(session: Session, alg: mech.MechanismType, key: objects.Key, lib: pkcs11.PKCS11) {
        super(lib);
        this.session = session;
        this.init(alg, key);
    }

    protected init(alg: mech.MechanismType, key: objects.Key) {
        let pMech = mech.Mechanism.create(alg);
        this.lib.C_SignInit(this.session.handle, pMech, key.handle);
    }

    update(data: core.CryptoData): void {
        try {
            let _data = new Buffer(data as string);

            this.lib.C_SignUpdate(this.session.handle, _data);
        } catch (e) {
            try {
                // Finalize sign operation
                this.final();
            }
            catch (e) { }

            throw e;
        }
    }

    final(): Buffer {
        let sig = new Buffer(1024);

        let res = this.lib.C_SignFinal(this.session.handle, sig);

        return res;
    }

    once(data: core.CryptoData): Buffer;
    once(data: core.CryptoData, cb: (error: Error, data: Buffer) => void): void;
    once(data: core.CryptoData, cb?: (error: Error, data: Buffer) => void): any {
        let signature = new Buffer(1024);
        let _data = new Buffer(data as string);
        if (cb) {
            this.lib.C_Sign(this.session.handle, _data, signature, cb);
        }
        else
            return this.lib.C_Sign(this.session.handle, _data, signature);
    }

}