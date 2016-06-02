import * as core from "../core";
import * as pkcs11 from "../pkcs11";
import {Session} from "../session";
import {Key} from "../object";
import {Mechanism, MechanismType} from "../mech";

const DEFAULT_BLOCK_SIZE = 256 >> 3;

export class Decipher {

    protected session: Session;
    protected lib: pkcs11.Pkcs11;
    protected blockSize = DEFAULT_BLOCK_SIZE; 

    constructor(session: Session, alg: MechanismType, key: Key, blockSize: number, lib: pkcs11.Pkcs11) {
        this.session = session;
        this.lib = lib;
        this.blockSize = blockSize || DEFAULT_BLOCK_SIZE;

        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        let rv = this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_DecryptInit");
    }

    update(data: string | Buffer): Buffer;
    update(data: string | Buffer, callback: (error: Error, enc: Buffer) => void): void;
    update(data, callback?: (error: Error, enc: Buffer) => void): Buffer {
        try {
            data = new Buffer(data);

            let len = Math.ceil(data.length / this.blockSize) * this.blockSize;
            let $enc = new Buffer(len);
            let $encLen = core.Ref.alloc(pkcs11.CK_ULONG, $enc.length);

            if (callback) {
                // async
                this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $enc, $encLen, (err, rv) => {
                    // check result
                    if (rv) throw new core.Pkcs11Error(rv, "C_DecryptUpdate");

                    // return
                    callback(null, $enc.slice(0, $encLen.deref()));
                });
            }
            else {
                // sync
                let rv = this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $enc, $encLen);
                if (rv) throw new core.Pkcs11Error(rv, "C_DecryptUpdate");

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
            let $dec = new Buffer(this.blockSize);
            let $decLen = core.Ref.alloc(pkcs11.CK_ULONG, this.blockSize);

            if (callback) {
                // async
                this.lib.C_DecryptFinal(this.session.handle, $dec, $decLen, (err, rv) => {
                    if (err)
                        callback(err, null)
                    else {
                        // check result
                        if (rv) callback(new core.Pkcs11Error(rv, "C_DecryptFinal"), null);

                        // return
                        callback(null, $dec.slice(0, $decLen.deref()));
                    }
                });
            }
            else {
                // sync
                let rv = this.lib.C_DecryptFinal(this.session.handle, $dec, $decLen);
                if (rv) throw new core.Pkcs11Error(rv, "C_DecryptFinal");

                return $dec.slice(0, $decLen.deref());
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