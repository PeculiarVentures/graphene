import * as core from "../core";
import * as pkcs11 from "../pkcs11";
import {Session} from "../session";
import {Key} from "../object";
import {Mechanism, MechanismType} from "../mech";

export class Cipher {

    session: Session;
    lib: pkcs11.Pkcs11;

    constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.Pkcs11) {
        this.session = session;
        this.lib = lib;

        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        let rv = this.lib.C_EncryptInit(this.session.handle, pMech, key.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_EncryptInit");
    }

    update(data: string | Buffer): Buffer;
    update(data: string | Buffer, callback: (error: Error, enc: Buffer) => void): void;
    update(data, callback?: (error: Error, enc: Buffer) => void): Buffer {
        try {
            data = new Buffer(data);

            let $enc = new Buffer(data.length + 1024); // RSA k + 2*mdlen + 2
            let $encLen = core.Ref.alloc(pkcs11.CK_ULONG, $enc.length);

            if (callback) {
                // async
                this.lib.C_EncryptUpdate(this.session.handle, data, data.length, $enc, $encLen, (err, rv) => {
                    // check result
                    if (rv) throw new core.Pkcs11Error(rv, "C_EncryptUpdate");
                    if ($enc.length < $encLen.deref())
                        callback(new Error(`Encrypted data wrong data size`), null);
                    else {
                        // return
                        callback(null, $enc.slice(0, $encLen.deref()));
                    }
                });
            }
            else {
                // sync
                let rv = this.lib.C_EncryptUpdate(this.session.handle, data, data.length, $enc, $encLen);
                if (rv) throw new core.Pkcs11Error(rv, "C_EncryptUpdate");
                if ($enc.length < $encLen.deref()) throw new Error(`Encrypted data wrong data size`);

                return $enc.slice(0, $encLen.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    }

    final(): Buffer;
    final(callback: (error: Error, enc: Buffer) => void): void;
    final(callback?: (error: Error, enc: Buffer) => void): Buffer {
        try {
            const BUF_SIZE = 4048;
            let $enc = new Buffer(BUF_SIZE);
            let $encLen = core.Ref.alloc(pkcs11.CK_ULONG, BUF_SIZE);

            if (callback) {
                // async
                this.lib.C_EncryptFinal(this.session.handle, $enc, $encLen, (err, rv) => {
                    if (err)
                        callback(err, null);
                    else {
                        // check result
                        if (rv) callback(new core.Pkcs11Error(rv, "C_EncryptFinal"), null);

                        // return
                        callback(null, $enc.slice(0, $encLen.deref()));
                    }
                });
            }
            else {
                // sync
                let rv = this.lib.C_EncryptFinal(this.session.handle, $enc, $encLen);
                if (rv) throw new core.Pkcs11Error(rv, "C_EncryptFinal");

                return $enc.slice(0, $encLen.deref());
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