import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Mechanism, MechanismType } from "../mech";
import { Key } from "../object";
import { Session } from "../session";

const DEFAULT_BLOCK_SIZE = 256 >> 3;

export class Decipher extends core.BaseObject {

  protected session: Session;
  protected blockSize = DEFAULT_BLOCK_SIZE;

  constructor(session: Session, alg: MechanismType, key: Key, blockSize: number, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.blockSize = blockSize || DEFAULT_BLOCK_SIZE;

    this.init(alg, key);
  }

  public update(data: Buffer): Buffer {
    try {
      const len = Math.ceil(data.length / this.blockSize) * this.blockSize;
      const dec = Buffer.alloc(len);

      const res = this.lib.C_DecryptUpdate(this.session.handle, data, dec);

      return res;
    } catch (e) {
      try {
        // Finalize decrypt operation
        this.final();
      } catch (e) {
        // nothing
      }

      throw e;
    }
  }

  public final(): Buffer {
    const dec = Buffer.alloc(this.blockSize);

    const res = this.lib.C_DecryptFinal(this.session.handle, dec);

    return res;
  }

  public once(data: Buffer, dec: Buffer): Buffer;
  public once(data: Buffer, dec: Buffer, cb: (error: Error, data: Buffer) => void): void;
  public once(data: Buffer, dec: Buffer, cb?: (error: Error, data: Buffer) => void): any {
    if (cb) {
      this.lib.C_Decrypt(this.session.handle, data, dec, cb);
    } else {
      return this.lib.C_Decrypt(this.session.handle, data, dec);
    }
  }

  protected init(alg: MechanismType, key: Key) {
    const pMech = Mechanism.create(alg);
    this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
  }

}
