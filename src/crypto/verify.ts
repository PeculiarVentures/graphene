import * as core from "../core";
import * as pkcs11 from "../pkcs11";
import {Session} from "../session";
import {Key} from "../object";
import {Mechanism, MechanismType} from "../mech";

export class Verify {

    session: Session;
    lib: pkcs11.Pkcs11;

    constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.Pkcs11) {
        this.session = session;
        this.lib = lib;
        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        let rv = this.lib.C_VerifyInit(this.session.handle, pMech, key.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_VerifyInit");
    }

    update(data: string | Buffer): void;
    update(data: string | Buffer, callback: (error: Error) => void): void;
    update(data, callback?: (error: Error) => void): void {
        try {
            data = new Buffer(data);

            if (callback) {
                // async
                this.lib.C_VerifyUpdate(this.session.handle, data, data.length, (err: Error, rv: number) => {
                    if (err)
                        callback(err);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_VerifyUpdate"));
                    else
                        callback(null);
                });
            }
            else {
                // sync
                let rv = this.lib.C_VerifyUpdate(this.session.handle, data, data.length);
                if (rv) throw new core.Pkcs11Error(rv, "C_VerifyUpdate");
            }
        } catch (e) {
            if (callback)
                callback(e);
        }
    }

    final(signature: Buffer): boolean;
    final(signature: Buffer, callback: (err: Error, verify: boolean) => void): boolean;
    final(signature: Buffer, callback?: (err: Error, verify: boolean) => void): any {
        try {
            if (callback) {
                // async
                this.lib.C_VerifyFinal(this.session.handle, signature, signature.length, (err: Error, rv: number) => {
                    if (err)
                        callback(err, null);
                    callback(null, rv === pkcs11.CKR_OK);
                });
            }
            else {
                // sync
                let rv = this.lib.C_VerifyFinal(this.session.handle, signature, signature.length);
                return rv === pkcs11.CKR_OK;
            }
        } catch (e) {
            if (callback)
                callback(e, null);
        }
    }

}