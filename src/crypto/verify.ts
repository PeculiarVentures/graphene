import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import { Mechanism, MechanismType } from "../mech";
import { Session } from "../session";
import { Key } from '../objects';
import * as types from '../types';

/**
 * Represents verifying operation
 */
export class Verify extends core.BaseObject {

  /**
   * Session
   */
  public session: Session;

  /**
   * Create a new instance of verifying operation
   * @param session Session
   * @param alg The verifying mechanism
   * @param key The verifying key
   * @param lib PKCS#11 library
   */
  constructor(session: Session, alg: MechanismType, key: Key, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.init(alg, key);
  }

  /**
   * Continues a multiple-part verification operation
   * @param data The signed data
   */
  public update(data: types.CryptoData): void {
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

  /**
   * Finishes a multiple-part verification operation, checking the signature
   * @param signature Th signature value
   * @returns `true` if signature is valid, otherwise `false`
   */
  public final(signature: Buffer): boolean {
    let res = false;
    try {
      res = this.lib.C_VerifyFinal(this.session.handle, signature);
    } catch (err) {
      if (!(err instanceof pkcs11.Pkcs11Error && err.code === pkcs11.CKR_SIGNATURE_INVALID)) {
        throw err;
      }
    }
    return res;
  }

  /**
   * Verifies a signature in a single-part operation
   * @param data The signed data
   * @param signature The signature value
   * @returns `true` if signature is valid, otherwise `false`
   */
  public once(data: types.CryptoData, signature: Buffer): boolean;
  /**
   * * Verifies a signature in a single-part operation
   * @param data The signed data
   * @param signature The signature value
   * @param cb Async callback function with boolean result of checking. `true` if signature is valid, otherwise `false`
   */
  public once(data: types.CryptoData, signature: Buffer, cb: (error: Error | null, valid: boolean) => void): void;
  public once(data: types.CryptoData, signature: Buffer, cb?: (error: Error | null, valid: boolean) => void): any {
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Verify(this.session.handle, bytes, signature, (err, data2) => {
        if (err instanceof pkcs11.Pkcs11Error && err.code === pkcs11.CKR_SIGNATURE_INVALID) {
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
        if (!(err instanceof pkcs11.Pkcs11Error && err.code === pkcs11.CKR_SIGNATURE_INVALID)) {
          throw err;
        }
      }
      return res;
    }
  }

  /**
   * initializes a verification operation
   * @param alg The verifying mechanism
   * @param key The verifying key
   */
  protected init(alg: MechanismType, key: Key) {
    const pMech = Mechanism.create(alg);
    this.lib.C_VerifyInit(this.session.handle, pMech, key.handle);
  }

}
