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

    update(text: string);
    update(data: Buffer);
    update(data) {
        data = new Buffer(data);

        let rv = this.lib.C_DigestUpdate(this.session.handle, data, data.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_DigestUpdate");
    }

    final(): Buffer {
        let $digest = new Buffer(1024);
        let $digestlen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);

        let rv = this.lib.C_DigestFinal(this.session.handle, $digest, $digestlen);
        if (rv) throw new core.Pkcs11Error(rv, "C_DigestFinal");

        return $digest.slice(0, $digestlen.deref());
    }

}