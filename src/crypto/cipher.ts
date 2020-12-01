import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Mechanism, MechanismType } from "../mech";
import { Session } from "../session";
import { Key } from '../objects';
import * as types from '../types';

/**
 * Represents encryption operation
 * @example
 * ```js
 * // Encrypt multi-part data
 *
 * const alg = {
 *   name: "AES_CBC_PAD",
 *   params: session.generateRandom(16), // IV
 * };
 * const cipher = session.createCipher(alg, secretKey);
 * let enc = cipher.update("Some message");
 * enc = Buffer.concat([enc, cipher.final()]);
 * console.log(enc.toString("hex")); // 351a253df0d5bc9018afd7eed825ae9a
 * ```
 * @example
 * ```js
 * // Encrypt single-part data
 *
 * const alg = {
 *   name: "AES_CBC_PAD",
 *   params: session.generateRandom(16), // IV
 * };
 * const enc = session.createCipher(alg, secretKey)
 *   .once("Some data", Buffer.alloc(1024));
 * console.log(enc.toString("hex")); // 0a3335e0ec8b0265d6ca70d789649b94
 * ```
 */
export class Cipher extends core.BaseObject {

  /**
   * Session
   */
  public session: Session;

  /**
   * Creates a new instance of {@link Cipher}
   * @param session Session
   * @param alg The encryption mechanism
   * @param key The encrypting key
   * @param lib PKCS#11 library
   */
  constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;

    this.init(alg, key);
  }

  /**
   * Continues a multiple-part encryption operation
   * @param data Data to be encrypted
   * @returns Encrypted block
   */
  public update(data: types.CryptoData): Buffer {
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

  /**
   * Finishes a multiple-part encryption operation
   * @returns The final encrypted block
   */
  public final(): Buffer {
    const BUF_SIZE = 4048;
    const enc = Buffer.alloc(BUF_SIZE);

    const res = this.lib.C_EncryptFinal(this.session.handle, enc);

    return res;
  }

  /**
   * Encrypts single-part data
   * @param data Data to be encrypted
   * @param enc Allocated buffer for encrypted data
   */
  public once(data: types.CryptoData, enc: Buffer): Buffer;
  /**
   * Encrypts single-part data
   * @param data Data to be encrypted
   * @param enc Allocated buffer for encrypted data
   * @param cb Async callback function with encrypted data
   */
  public once(data: types.CryptoData, enc: Buffer, cb: (error: Error, data: Buffer) => void): void;
  public once(data: types.CryptoData, enc: Buffer, cb?: (error: Error, data: Buffer) => void): any {
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Encrypt(this.session.handle, bytes, enc, cb);
    } else {
      return this.lib.C_Encrypt(this.session.handle, bytes, enc);
    }
  }

  /**
   * Initializes an encryption operation
   * @param alg The encryption mechanism
   * @param key The encryption key
   */
  protected init(alg: MechanismType, key: Key) {
    const pMech = Mechanism.create(alg);
    this.lib.C_EncryptInit(this.session.handle, pMech, key.handle);
  }
}
