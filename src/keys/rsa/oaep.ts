import * as pkcs11 from "pkcs11js";
import { MechanismEnum } from "../../mech_enum";
import { IParams, MechParams } from "../params";
import { RsaMgf } from "./mgf";

/**
 * RSA-OAEP parameters
 */
export class RsaOaepParams implements IParams {

  /**
   * Hash algorithm
   */
  public hashAlgorithm: MechanismEnum;
  /**
   * Mask generation function to use on the encoded block
   */
  public mgf: RsaMgf;
  /**
   * Source
   */
  public source: number = 1;
  /**
   * Source data
   */
  public sourceData: Buffer;

  public type = MechParams.RsaOAEP;

  /**
   * Creates a new instance of {@link RsaOaepParams}
   * @param hashAlg Hash algorithm
   * @param mgf Mask generation function to use on the encoded block
   * @param sourceData Source data
   */
  constructor(
    hashAlg: MechanismEnum = MechanismEnum.SHA1,
    mgf: RsaMgf = RsaMgf.MGF1_SHA1,
    sourceData: Buffer | null = null,
  ) {
    this.hashAlgorithm = hashAlg;
    this.mgf = mgf;
    this.sourceData = sourceData!;
  }

  public toCKI(): pkcs11.RsaOAEP {
    return {
      hashAlg: this.hashAlgorithm,
      mgf: this.mgf,
      source: this.source,
      sourceData: this.sourceData,
      type: this.type,
    };
  }
}
