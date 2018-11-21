import * as pkcs11 from "pkcs11js";
import { IParams, MechParams } from "../params";

import { EcKdf } from "./kdf";

export class EcdhParams implements IParams, pkcs11.ECDH1 {

  /**
   * key derivation function used on the shared secret value
   */
  public kdf: EcKdf;
  /**
   * some data shared between the two parties
   */
  public sharedData: Buffer;
  /**
   * other party's EC public key value
   */
  public publicData: Buffer;

  public type = MechParams.EcDH;

  /**
   * Creates an instance of EcdhParams.
   *
   * @param {EcKdf} kdf key derivation function used on the shared secret value
   * @param {Buffer} [sharedData=null] some data shared between the two parties
   * @param {Buffer} [publicData=null] other party's EC public key value
   */
  constructor(kdf: EcKdf, sharedData: Buffer | null = null, publicData: Buffer | null = null) {
    this.kdf = kdf;
    if (sharedData) {
      this.sharedData = sharedData;
    }
    if (publicData) {
      this.publicData = publicData;
    }
  }

  public toCKI(): pkcs11.ECDH1 {
    return this;
  }
}
