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

    update(text: string);
    update(data: Buffer);
    update(data) {
        data = new Buffer(data);

        let rv = this.lib.C_VerifyUpdate(this.session.handle, data, data.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_VerifyUpdate");
    }

    final(signature: Buffer): boolean {
        let rv = this.lib.C_VerifyFinal(this.session.handle, signature, signature.length);
        return rv === pkcs11.CKR_OK;
    }

}