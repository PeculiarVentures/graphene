import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import * as mech from "../mech";
import { Session } from "../session";

export class Digest extends core.BaseObject {

  public session: Session;

  constructor(session: Session, alg: mech.MechanismType, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.init(alg);
  }

  public update(data: core.CryptoData): void {
    try {
      const bytes = Buffer.from(data as string);

      this.lib.C_DigestUpdate(this.session.handle, bytes);
    } catch (e) {
      try {
        // Finalize digest operation
        this.final();
      } catch (e) {
        // nothing
      }

      throw e;
    }
  }

  public final(): Buffer {
    const digest = Buffer.alloc(1024);

    const res = this.lib.C_DigestFinal(this.session.handle, digest);

    return res;
  }

  public once(data: core.CryptoData): Buffer;
  public once(data: core.CryptoData, cb: (error: Error, data: Buffer) => void): void;
  public once(data: core.CryptoData, cb?: (error: Error, data: Buffer) => void): any {
    const digest = Buffer.alloc(1024);
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Digest(this.session.handle, bytes, digest, cb);
    } else {
      return this.lib.C_Digest(this.session.handle, bytes, digest);
    }
  }

  protected init(alg: mech.MechanismType) {
    const pMech = mech.Mechanism.create(alg);
    this.lib.C_DigestInit(this.session.handle, pMech);
  }

}
