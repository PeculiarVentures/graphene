import * as core from "../core";
import * as pkcs11 from "../pkcs11";
import {Session} from "../session";
import * as objects from "../object";
import * as mech from "../mech";

export class Sign {

    session: Session;
    lib: pkcs11.Pkcs11;

    constructor(session: Session, alg: mech.MechanismType, key: objects.Key, lib: pkcs11.Pkcs11) {
        this.session = session;
        this.lib = lib;
        this.init(alg, key);
    }

    protected init(alg: mech.MechanismType, key: objects.Key) {
        let pMech = mech.Mechanism.create(alg);
        let rv = this.lib.C_SignInit(this.session.handle, pMech, key.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_SignInit");
    }

    update(data: string | Buffer): void;
    update(data: string | Buffer, callback: (error: Error) => void): void;
    update(data, callback?: (error: Error) => void): void {
        try {
            data = new Buffer(data);

            if (callback) {
                this.lib.C_SignUpdate(this.session.handle, data, data.length, (err: Error, rv: number) => {
                    if (err)
                        callback(err);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_SignUpdate"));
                    else
                        callback(null);
                });
            }
            else {
                let rv = this.lib.C_SignUpdate(this.session.handle, data, data.length);
                if (rv) throw new core.Pkcs11Error(rv, "C_SignUpdate");
            }
        } catch (e) {
            if (callback)
                callback(e);
            else
                throw e;
        }
    }

    final(): Buffer;
    final(callback: (err: Error, signature: Buffer) => void): void;
    final(callback?: (err: Error, signature: Buffer) => void): Buffer {
        try {
            let $sig = new Buffer(1024);
            let $siglen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);

            if (callback) {
                // async
                this.lib.C_SignFinal(this.session.handle, $sig, $siglen, (err: Error, rv: number) => {
                    if (err)
                        callback(err, null);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_SignFinal"), null);
                    else
                        callback(null, $sig.slice(0, $siglen.deref()));
                });
            }
            else {
                // sync
                let rv = this.lib.C_SignFinal(this.session.handle, $sig, $siglen);
                if (rv) throw new core.Pkcs11Error(rv, "C_SignFinal");

                return $sig.slice(0, $siglen.deref());
            }
        } catch (e) {
            if (callback)
                callback(e, null);
        }
    }

}