import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Mechanism, MechanismType } from "../mech";
import { Session } from "../session";
import { Key } from '../objects';

export class Cipher extends core.BaseObject {

  public session: Session;

  constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;

    this.init(alg, key);
  }

  public update(data: core.CryptoData): Buffer {
    try {
      data = Buffer.from(data as string);

      const enc = Buffer.alloc(data.length + 1024); // RSA k + 2*mdlen + 2

      const res = this.lib.C_EncryptUpdate(this.session.handle, data as Buffer, enc);
      return res;
    } catch (e) {
      try {
        // Finalize encrypt operation
        this.final();
      } catch (e) {
        // nothing
      }

      throw e;
    }
  }

  public final(): Buffer {
    const BUF_SIZE = 4048;
    const enc = Buffer.alloc(BUF_SIZE);

    const res = this.lib.C_EncryptFinal(this.session.handle, enc);

    return res;
  }

  public once(data: core.CryptoData, enc: Buffer): Buffer;
  public once(data: core.CryptoData, enc: Buffer, cb: (error: Error, data: Buffer) => void): void;
  public once(data: core.CryptoData, enc: Buffer, cb?: (error: Error, data: Buffer) => void): any {
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Encrypt(this.session.handle, bytes, enc, cb);
    } else {
      return this.lib.C_Encrypt(this.session.handle, bytes, enc);
    }
  }

  protected init(alg: MechanismType, key: Key) {
    const pMech = Mechanism.create(alg);
    this.lib.C_EncryptInit(this.session.handle, pMech, key.handle);
  }
}
