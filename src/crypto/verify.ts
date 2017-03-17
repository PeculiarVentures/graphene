import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Session } from "../session";
import { Key } from "../object";
import { Mechanism, MechanismType } from "../mech";

const INVALID = 192;

export class Verify extends core.BaseObject {

    session: Session;

    constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.PKCS11) {
        super(lib);
        this.session = session;
        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        this.lib.C_VerifyInit(this.session.handle, pMech, key.handle);
    }

    update(data: core.CryptoData): void {
        try {
            let _data = new Buffer(data as string);

            this.lib.C_VerifyUpdate(this.session.handle, _data);
        } catch (e) {
            try {
                // Finalize verify operation
                this.final(new Buffer(0));
            }
            catch (e) { }

            throw e;
        }
    }

    final(signature: Buffer): boolean {
        let res = false;
        try {
            res = this.lib.C_VerifyFinal(this.session.handle, signature);
        } catch (err) {
            if (core.getPKCS11ErrorCode(err) !== INVALID) {
                throw err;
            }
        }
        return res;
    }

    once(data: core.CryptoData, signature: Buffer): boolean;
    once(data: core.CryptoData, signature: Buffer, cb: (error: Error | null, valid: boolean) => void): void;
    once(data: core.CryptoData, signature: Buffer, cb?: (error: Error | null, valid: boolean) => void): any {
        let _data = new Buffer(data as string);
        if (cb) {
            this.lib.C_Verify(this.session.handle, _data, signature, (err, data) => {
                if (err && core.getPKCS11ErrorCode(err) === INVALID) {
                    cb(null, false);
                } else {
                    cb(err, data);
                }
            });
        }
        else {
            let res = false;
            try {
                res = this.lib.C_Verify(this.session.handle, _data, signature);
            } catch (err) {
                if (core.getPKCS11ErrorCode(err) !== INVALID) {
                    throw err;
                }
            }
            return res;
        }
    }

}