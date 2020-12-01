import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import * as mech from "../mech";
import { Session } from "../session";
import { Key } from '../objects';
import * as types from '../types';

/**
 * Represents signing operation
 */
export class Sign extends core.BaseObject {

  /**
   * Session
   */
  public session: Session;

  /**
   * Creates a new instance of signing operation
   * @param session Session
   * @param alg The signing mechanism
   * @param key The signing key
   * @param lib PKCS#11 library
   */
  constructor(session: Session, alg: mech.MechanismType, key: Key, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.init(alg, key);
  }

  /**
   * Continues a multiple-part signature operation, where the signature is (will be) an appendix to the data
   * @param data The data to be signed
   */
  public update(data: types.CryptoData): void {
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

  /**
   * Finishes a multiple-part signature operation, returning the signature
   * @returns The signature value
   */
  public final(): Buffer {
    const sig = Buffer.alloc(1024);

    const res = this.lib.C_SignFinal(this.session.handle, sig);

    return res;
  }

  /**
   * Signs (encrypts with private key) data in a single part
   * @param data The data to be signed
   * @returns Signature value
   */
  public once(data: types.CryptoData): Buffer;
  /**
   * Signs (encrypts with private key) data in a single part
   * @param data The data to be signed
   * @param cb Async callback function with signature value
   */
  public once(data: types.CryptoData, cb: (error: Error, data: Buffer) => void): void;
  public once(data: types.CryptoData, cb?: (error: Error, data: Buffer) => void): any {
    const signature = Buffer.alloc(1024);
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Sign(this.session.handle, bytes, signature, cb);
    } else {
      return this.lib.C_Sign(this.session.handle, bytes, signature);
    }
  }

  /**
   * initializes a signature (private key encryption) operation
   * @param alg The signing mechanism
   * @param key The signing key
   */
  protected init(alg: mech.MechanismType, key: Key) {
    const pMech = mech.Mechanism.create(alg);
    this.lib.C_SignInit(this.session.handle, pMech, key.handle);
  }

}
