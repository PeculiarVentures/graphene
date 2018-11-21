import * as pkcs11 from "pkcs11js";
import { IParams, MechParams } from "../params";

export class AesCcmParams implements IParams {

  /**
   * length of the data where 0 <= dataLength < 2^8L
   */
  public dataLength: number;
  /**
   * the nonce
   */
  public nonce: Buffer;
  /**
   * the additional authentication data
   * - This data is authenticated but not encrypted
   */
  public aad: Buffer;
  /**
   * length of authentication tag (output following cipher text) in bits.
   * - Can be any value between 0 and 128
   */
  public macLength: number;

  public type = MechParams.AesCCM;

  constructor(dataLength: number, nonce: Buffer, aad: Buffer = Buffer.alloc(0), macLength: number = 0) {
    this.dataLength = dataLength;
    this.nonce = nonce;
    this.aad = aad;
    this.macLength = macLength;
  }

  public toCKI(): pkcs11.AesCCM {
    return {
      aad: this.aad,
      dataLen: this.dataLength,
      macLen: this.macLength,
      nonce: this.nonce,
      type: this.type,
    };
  }
}
