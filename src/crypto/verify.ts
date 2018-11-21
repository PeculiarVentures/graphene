import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Mechanism, MechanismType } from "../mech";
import { Key } from "../object";
import { Session } from "../session";

const INVALID = 192;

export class Verify extends core.BaseObject {

  public session: Session;

  constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.init(alg, key);
  }

  public update(data: core.CryptoData): void {
    try {
      const bytes = Buffer.from(data as string);

      this.lib.C_VerifyUpdate(this.session.handle, bytes);
    } catch (e) {
      try {
        // Finalize verify operation
        this.final(Buffer.alloc(0));
      } catch (e) {
        // nothing
      }

      throw e;
    }
  }

  public final(signature: Buffer): boolean {
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

  public once(data: core.CryptoData, signature: Buffer): boolean;
  public once(data: core.CryptoData, signature: Buffer, cb: (error: Error | null, valid: boolean) => void): void;
  public once(data: core.CryptoData, signature: Buffer, cb?: (error: Error | null, valid: boolean) => void): any {
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Verify(this.session.handle, bytes, signature, (err, data2) => {
        if (err && core.getPKCS11ErrorCode(err) === INVALID) {
          cb(null, false);
        } else {
          cb(err, data2);
        }
      });
    } else {
      let res = false;
      try {
        res = this.lib.C_Verify(this.session.handle, bytes, signature);
      } catch (err) {
        if (core.getPKCS11ErrorCode(err) !== INVALID) {
          throw err;
        }
      }
      return res;
    }
  }

  protected init(alg: MechanismType, key: Key) {
    const pMech = Mechanism.create(alg);
    this.lib.C_VerifyInit(this.session.handle, pMech, key.handle);
  }

}
