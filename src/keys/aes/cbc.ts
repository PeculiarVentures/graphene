import * as pkcs11 from "pkcs11js";
import { IParams, MechParams } from "../params";

export class AesCbcParams implements IParams, pkcs11.AesCBC {

  /**
   * initialization vector
   * - must have a fixed size of 16 bytes
   */
  public iv: Buffer;
  /**
   * the data
   */
  public data: Buffer;

  public type = MechParams.AesCBC;

  constructor(iv: Buffer, data: Buffer = new Buffer(0)) {
    this.iv = iv;
    this.data = data;
  }

  public toCKI(): Buffer {
    return this.iv;
  }
}

export class AesCbcEncryptDataParams implements IParams, pkcs11.AesCBC {

  /**
   * initialization vector
   * - must have a fixed size of 16 bytes
   */
  public iv: Buffer;
  /**
   * the data
   */
  public data: Buffer;

  public type = MechParams.AesCBC;

  constructor(iv: Buffer, data: Buffer = new Buffer(0)) {
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
