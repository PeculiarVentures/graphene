import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import * as mech from "../mech";
import * as objects from "../object";
import { Session } from "../session";

export class Sign extends core.BaseObject {

  public session: Session;

  constructor(session: Session, alg: mech.MechanismType, key: objects.Key, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.init(alg, key);
  }

  public update(data: core.CryptoData): void {
    try {
      const bytes = Buffer.from(data as string);

      this.lib.C_SignUpdate(this.session.handle, bytes);
    } catch (e) {
      try {
        // Finalize sign operation
        this.final();
      } catch (e) {
        // nothing
      }

      throw e;
    }
  }

  public final(): Buffer {
    const sig = Buffer.alloc(1024);

    const res = this.lib.C_SignFinal(this.session.handle, sig);

    return res;
  }

  public once(data: core.CryptoData): Buffer;
  public once(data: core.CryptoData, cb: (error: Error, data: Buffer) => void): void;
  public once(data: core.CryptoData, cb?: (error: Error, data: Buffer) => void): any {
    const signature = Buffer.alloc(1024);
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Sign(this.session.handle, bytes, signature, cb);
    } else {
      return this.lib.C_Sign(this.session.handle, bytes, signature);
    }
  }

  protected init(alg: mech.MechanismType, key: objects.Key) {
    const pMech = mech.Mechanism.create(alg);
    this.lib.C_SignInit(this.session.handle, pMech, key.handle);
  }

}
