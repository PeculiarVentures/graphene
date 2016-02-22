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

    update(text: string);
    update(data: Buffer);
    update(data) {
        data = new Buffer(data);

        let rv = this.lib.C_SignUpdate(this.session.handle, data, data.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_SignUpdate");
    }

    final(): Buffer {
        let $sig = new Buffer(1024);
        let $siglen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);

        let rv = this.lib.C_SignFinal(this.session.handle, $sig, $siglen);
        if (rv) throw new core.Pkcs11Error(rv, "C_SignFinal");

        return $sig.slice(0, $siglen.deref());
    }

}