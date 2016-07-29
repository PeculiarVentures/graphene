import * as pkcs11 from "pkcs11js";
import * as core from "../../core";
import {MechanismEnum} from "../../mech";
import {RsaMgf} from "./mgf";
import {IParams} from "../params";

export class RsaOaepParams implements IParams {

    hashAlgorithm: MechanismEnum;
    mgf: RsaMgf;
    source: number = pkcs11.CKZ_DATA_SPECIFIED;
    sourceData: Buffer;


    constructor(hashAlg: MechanismEnum = MechanismEnum.SHA1, mgf: RsaMgf = RsaMgf.MGF1_SHA1, sourceData: Buffer = null) {
        this.hashAlgorithm = hashAlg;
        this.mgf = mgf;
        this.sourceData = sourceData || null;
    }

    toCKI(): Buffer {
        return new pkcs11.CK_RSA_PKCS_OAEP_PARAMS({
            hashAlg: this.hashAlgorithm,
            mgf: this.mgf,
            source: this.source,
            pSourceData: this.sourceData,
            ulSourceDataLen: this.sourceData ? this.sourceData.length : 0,
        })["ref.buffer"];
    }
}