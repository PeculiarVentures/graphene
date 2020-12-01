import * as pkcs11 from "pkcs11js";
import { IParams, MechParams } from "../params";

/**
 * AES-CCM parameters
 */
export class AesCcmParams implements IParams {

  /**
   * Length of the data where 0 <= dataLength < 2^8L
   */
  public dataLength: number;
  /**
   * The nonce
   */
  public nonce: Buffer;
  /**
   * The additional authentication data
   * - This data is authenticated but not encrypted
   */
  public aad: Buffer;
  /**
   * Length of authentication tag (output following cipher text) in bits.
   * - Can be any value between 0 and 128
   */
  public macLength: number;

  public type = MechParams.AesCCM;

  /**
   * Creates a new instance of {@link AesCcmParams}
   * @param dataLength Length of the data where 0 <= dataLength < 2^8L
   * @param nonce The nonce
   * @param aad The additional authentication data
   * @param macLength Length of authentication tag (output following cipher text) in bits. Can be any value between 0 and 128
   */
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
