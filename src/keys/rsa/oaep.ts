import * as pkcs11 from "pkcs11js";
import { MechanismEnum } from "../../mech";
import { IParams, MechParams } from "../params";
import { RsaMgf } from "./mgf";

export class RsaOaepParams implements IParams {

  public hashAlgorithm: MechanismEnum;
  public mgf: RsaMgf;
  public source: number = 1;
  public sourceData: Buffer;

  public type = MechParams.RsaOAEP;

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
