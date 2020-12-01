import * as pkcs11 from "pkcs11js";
import * as core from "../core";
import * as mech from "../mech";
import { Session } from "../session";
import * as types from "../types";

/**
 * Represents digest operation
 */
export class Digest extends core.BaseObject {

  /**
   * Session
   */
  public session: Session;

  /**
   * Creates a new instance of {@link Digest}
   * @param session Session
   * @param alg The digesting mechanism
   * @param lib PKCS#11 library
   */
  constructor(session: Session, alg: mech.MechanismType, lib: pkcs11.PKCS11) {
    super(lib);
    this.session = session;
    this.init(alg);
  }

  /**
   * Continues a multiple-part message-digesting operation operation
   * @param data Data for digest computing
   */
  public update(data: types.CryptoData): void {
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

  /**
   * Finishes a multiple-part message-digesting operation
   * @returns Computed digest value
   */
  public final(): Buffer {
    const digest = Buffer.alloc(1024);

    const res = this.lib.C_DigestFinal(this.session.handle, digest);

    return res;
  }

  /**
   * Digests data in a single part
   * @param data Data for digest computing
   * @returns Computed digest value
   */
  public once(data: types.CryptoData): Buffer;
  /**
   * Digests data in a single part
   * @param data Data for digest computing
   * @param cb Async callback function with computed digest value
   */
  public once(data: types.CryptoData, cb: (error: Error, data: Buffer) => void): void;
  public once(data: types.CryptoData, cb?: (error: Error, data: Buffer) => void): any {
    const digest = Buffer.alloc(1024);
    const bytes = Buffer.from(data as string);
    if (cb) {
      this.lib.C_Digest(this.session.handle, bytes, digest, cb);
    } else {
      return this.lib.C_Digest(this.session.handle, bytes, digest);
    }
  }

  /**
   * Initializes a message-digesting operation
   * @param alg The digesting mechanism
   */
  protected init(alg: mech.MechanismType) {
    const pMech = mech.Mechanism.create(alg);
    this.lib.C_DigestInit(this.session.handle, pMech);
  }

}
