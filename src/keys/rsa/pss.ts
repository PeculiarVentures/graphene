import * as pkcs11 from "pkcs11js";
import { MechanismEnum } from "../../mech_enum";
import { IParams, MechParams } from "../params";
import { RsaMgf } from "./mgf";

/**
 * RSA-PSS parameters
 */
export class RsaPssParams implements IParams {

  /**
   * Hash algorithm used in the PSS encoding;
   * - if the signature mechanism does not include message hashing,
   * then this value must be the mechanism used by the application to generate
   * the message hash;
   * - if the signature mechanism includes hashing,
   * then this value must match the hash algorithm indicated
   * by the signature mechanism
   */
  public hashAlgorithm: MechanismEnum;
  /**
   * Mask generation function to use on the encoded block
   */
  public mgf: RsaMgf;
  /**
   * Length, in bytes, of the salt value used in the PSS encoding;
   * - typical values are the length of the message hash and zero
   */
  public saltLength: number;

  public type = MechParams.RsaPSS;

  /**
   * Creates a new instance of {@link RsaPssParams}
   * @param hashAlg Hash algorithm used in the PSS encoding
   * @param mgf Mask generation function to use on the encoded block
   * @param saltLen Length, in bytes, of the salt value used in the PSS encoding
   */
  constructor(hashAlg: MechanismEnum = MechanismEnum.SHA1, mgf: RsaMgf = RsaMgf.MGF1_SHA1, saltLen: number = 20) {
    this.hashAlgorithm = hashAlg;
    this.mgf = mgf;
    this.saltLength = saltLen;
  }

  public toCKI(): pkcs11.RsaPSS {
    return {
      hashAlg: this.hashAlgorithm,
      mgf: this.mgf,
      saltLen: this.saltLength,
      type: this.type,
    };
  }
}
