import * as pkcs11 from "pkcs11js";
import { IParams, MechParams } from "../params";

/**
 * AES-CBC parameters
 */
export class AesCbcParams implements IParams, pkcs11.AesCBC {

  /**
   * Initialization vector
   * - must have a fixed size of 16 bytes
   */
  public iv: Buffer;
  /**
   * The data
   */
  public data: Buffer;

  public type = MechParams.AesCBC;

  /**
   * Creates a new instance of AES-CBC parameters
   * @param iv The initialization vector. Must have a fixed size of 16 bytes
   * @param data The data
   */
  constructor(iv: Buffer, data: Buffer = Buffer.alloc(0)) {
    this.iv = iv;
    this.data = data;
  }

  public toCKI(): Buffer {
    return this.iv;
  }
}

/**
 * AES-CBC encrypted data parameters
 */
export class AesCbcEncryptDataParams implements IParams, pkcs11.AesCBC {

  /**
   * Initialization vector
   * - must have a fixed size of 16 bytes
   */
  public iv: Buffer;
  /**
   * The data
   */
  public data: Buffer;

  public type = MechParams.AesCBC;

  /**
   * Creates a new instance of {@link AesCbcEncryptDataParams}
   * @param iv The initialization vector. Must have a fixed size of 16 bytes
   * @param data The data
   */
  constructor(iv: Buffer, data: Buffer = Buffer.alloc(0)) {
    this.iv = iv;
    this.data = data;
  }

  public toCKI(): pkcs11.AesCBC {
    return {
      type: this.type,
      iv: this.iv,
      data: this.data,
    };
  }
}
