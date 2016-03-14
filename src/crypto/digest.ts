import * as core from "../core";
import * as pkcs11 from "../pkcs11";
import {Session} from "../session";
import * as objects from "../object";
import * as mech from "../mech";

export class Digest {

    session: Session;
    lib: pkcs11.Pkcs11;

    constructor(session: Session, alg: mech.MechanismType, lib: pkcs11.Pkcs11) {
        this.session = session;
        this.lib = lib;
        this.init(alg);
    }

    protected init(alg: mech.MechanismType) {
        let pMech = mech.Mechanism.create(alg);
        let rv = this.lib.C_DigestInit(this.session.handle, pMech);
        if (rv) throw new core.Pkcs11Error(rv, "C_DigestInit");
    }

    update(data: string | Buffer): void;
    update(data: string | Buffer, callback: (error: Error) => void): void;
    update(data, callback?: (error: Error) => void): void {
        try {
            data = new Buffer(data);

            if (callback) {
                this.lib.C_DigestUpdate(this.session.handle, data, data.length, (err, rv) => {
                    if (err)
                        callback(err);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_DigestUpdate"));
                    else
                        callback(null);
                });
            }
            else {
                let rv = this.lib.C_DigestUpdate(this.session.handle, data, data.length);
                if (rv) throw new core.Pkcs11Error(rv, "C_DigestUpdate");
            }
        }
        catch (e) {
            if (callback)
                callback(e);
            else
                throw e;
        }
    }

    final(): Buffer;
    final(callback: (error: Error, digest: Buffer) => void): void;
    final(callback?: (error: Error, digest: Buffer) => void): Buffer {
        try {
            let $digest = new Buffer(1024);
            let $digestlen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);

            if (callback) {
                this.lib.C_DigestFinal(this.session.handle, $digest, $digestlen, (err, rv) => {
                    if (err)
                        callback(err, null);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_DigestFinal"), null);
                    else
                        callback(null, $digest.slice(0, $digestlen.deref()));
                });
            }
            else {
                let rv = this.lib.C_DigestFinal(this.session.handle, $digest, $digestlen);
                if (rv) throw new core.Pkcs11Error(rv, "C_DigestFinal");

                return $digest.slice(0, $digestlen.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    }

}