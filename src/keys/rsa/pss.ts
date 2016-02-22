import * as core from "../../core";
import * as pkcs11 from "../../pkcs11";
import {MechanismEnum} from "../../mech";
import {IParams} from "../params";
import {RsaMgf} from "./mgf";


export class RsaPssParams implements IParams {

    /**
     * hash algorithm used in the PSS encoding; 
     * - if the signature mechanism does not include message hashing, 
     * then this value must be the mechanism used by the application to generate 
     * the message hash; 
     * - if the signature mechanism includes hashing, 
     * then this value must match the hash algorithm indicated 
     * by the signature mechanism 
     */
    hashAlgorithm: MechanismEnum;
    /**
     * mask generation function to use on the encoded block
     */
    mgf: RsaMgf;
    /**
     * length, in bytes, of the salt value used in the PSS encoding; 
     * - typical values are the length of the message hash and zero
     */
    saltLength: number;

    constructor(hashAlg: MechanismEnum = MechanismEnum.SHA1, mgf: RsaMgf = RsaMgf.MGF1_SHA1, saltLen: number = 0) {
        this.hashAlgorithm = hashAlg;
        this.mgf = mgf;
        this.saltLength = saltLen;
    }

    toCKI(): Buffer {
        return new pkcs11.CK_RSA_PKCS_PSS_PARAMS({
            hashAlg: this.hashAlgorithm,
            mgf: this.mgf,
            sLen: this.saltLength,
        })["ref.buffer"];
    }
}