import * as pkcs11 from "pkcs11js";
import { IParams, MechParams } from "../params";

import { EcKdf } from "./kdf";

/**
 * ECDH parameters
 */
export class EcdhParams implements IParams, pkcs11.ECDH1 {

  /**
   * Key derivation function used on the shared secret value
   */
  public kdf: EcKdf;
  /**
   * Some data shared between the two parties
   */
  public sharedData: Buffer;
  /**
   * Other party's EC public key value
   */
  public publicData: Buffer;

  public type = MechParams.EcDH;

  /**
   * Creates an instance of {@link EcdhParams}
   *
   * @param kdf key derivation function used on the shared secret value
   * @param sharedData some data shared between the two parties
   * @param publicData other party's EC public key value
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
