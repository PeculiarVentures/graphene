import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Mechanism, MechanismType } from "../mech";
import { Session } from "../session";
import { Key } from '../objects';

const DEFAULT_BLOCK_SIZE = 256 >> 3;

/**
 * Represents decryption operation
 */
export class Decipher extends core.BaseObject {

  /**
   * Session
   */
  protected session: Session;

  /**
   * Block size
   */
  protected blockSize = DEFAULT_BLOCK_SIZE;

  /**
   * Creates a new instance of {@link Decipher}
   * @param session Session
   * @param alg The decryption mechanism
   * @param key The decryption key
   * @param blockSize Block size
   * @param lib PKCS#11 library
   */
  constructor(session: Session, alg: MechanismType, key: Key, blockSize: number, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.blockSize = blockSize || DEFAULT_BLOCK_SIZE;

    this.init(alg, key);
  }

  /**
   * Continues a multiple-part decryption operation
   * @param data Encrypted data
   * @returns Decrypted block
   */
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

  /**
   * Finishes a multiple-part decryption operation
   * @returns Final decrypted block
   */
  public final(): Buffer {
    const dec = Buffer.alloc(this.blockSize);

    const res = this.lib.C_DecryptFinal(this.session.handle, dec);

    return res;
  }

  /**
   * Decrypts encrypted data in a single part
   * @param data Encrypted data
   * @param dec Allocated buffer for decrypted data
   * @returns Decrypted data
   */
  public once(data: Buffer, dec: Buffer): Buffer;
  /**
   * Decrypts encrypted data in a single part
   * @param data Encrypted data
   * @param dec Allocated buffer for decrypted data
   * @param cb Async callback function with decrypted data
   */
  public once(data: Buffer, dec: Buffer, cb: (error: Error, data: Buffer) => void): void;
  public once(data: Buffer, dec: Buffer, cb?: (error: Error, data: Buffer) => void): any {
    if (cb) {
      this.lib.C_Decrypt(this.session.handle, data, dec, cb);
    } else {
      return this.lib.C_Decrypt(this.session.handle, data, dec);
    }
  }

  /**
   * Initializes a decryption operation
   * @param alg The decryption mechanism
   * @param key The decryption key
   */
  protected init(alg: MechanismType, key: Key) {
    const pMech = Mechanism.create(alg);
    this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
  }

}
