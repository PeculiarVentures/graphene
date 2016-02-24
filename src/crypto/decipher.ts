import * as core from "../core";
import * as pkcs11 from "../pkcs11";
import {Session} from "../session";
import {Key} from "../object";
import {Mechanism, MechanismType} from "../mech";

export class Decipher {

    session: Session;
    lib: pkcs11.Pkcs11;

    constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.Pkcs11) {
        this.session = session;
        this.lib = lib;

        this.init(alg, key);
    }

    protected init(alg: MechanismType, key: Key) {
        let pMech = Mechanism.create(alg);
        let rv = this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_DecryptInit");
    }

    update(text: string): Buffer;
    update(data: Buffer): Buffer;
    update(data): Buffer {
        data = new Buffer(data);

        let $dec = new Buffer(data.length);
        let $declen = core.Ref.alloc(pkcs11.CK_ULONG, $dec.length);

        let rv = this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $dec, $declen);
        if (rv) throw new core.Pkcs11Error(rv, "C_DecryptUpdate");
        if ($dec.length < $declen.deref()) throw new Error(`Encrypted data wrong data size`);

        return $dec.slice(0, $declen.deref());
    }

    final(): Buffer {
        const BUF_SIZE = 4048;
        let $dec = new Buffer(BUF_SIZE);
        let $declen = core.Ref.alloc(pkcs11.CK_ULONG, BUF_SIZE);

        let rv = this.lib.C_DecryptFinal(this.session.handle, $dec, $declen);
        if (rv) throw new core.Pkcs11Error(rv, "C_DecryptFinal");

        return $dec.slice(0, $declen.deref());
    }

}