import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import {Session} from "../session";
import * as objects from "../object";
import * as mech from "../mech";

export class Digest extends core.BaseObject {

    session: Session;

    constructor(session: Session, alg: mech.MechanismType, lib: pkcs11.PKCS11) {
        super(lib);
        this.session = session;
        this.init(alg);
    }

    protected init(alg: mech.MechanismType) {
        let pMech = mech.Mechanism.create(alg);
        this.lib.C_DigestInit(this.session.handle, pMech);
    }

    update(data: core.CryptoData): void {
        try {
            let _data = new Buffer(data as string);

            this.lib.C_DigestUpdate(this.session.handle, _data);
        }
        catch (e) {
            try {
                // Finalize digest operation
                this.final();
            }
            catch (e) { }

            throw e;
        }
    }

    final(): Buffer {
        let digest = new Buffer(1024);

        let res = this.lib.C_DigestFinal(this.session.handle, digest);

        return res;
    }

    once(data: core.CryptoData): Buffer;
    once(data: core.CryptoData, cb: (error: Error, data: Buffer) => void): void;
    once(data: core.CryptoData, cb?: (error: Error, data: Buffer) => void): any {
        let digest = new Buffer(1024);
        let _data = new Buffer(data as string);
        if (cb) {
            this.lib.C_Digest(this.session.handle, _data, digest, cb);
        }
        else
            return this.lib.C_Digest(this.session.handle, _data, digest);
    }

}