import * as core from "../../core";
import * as pkcs11 from "pkcs11js";
import {MechanismEnum} from "../../mech";
import {IParams} from "../params";

export class AesGcmParams implements IParams {

    /**
     * initialization vector 
     * - The length of the initialization vector can be any number between 1 and 256. 
     * 96-bit (12 byte) IV values can be processed more efficiently, 
     * so that length is recommended for situations in which efficiency is critical. 
     */
    iv: Buffer;
    /**
     * pointer to additional authentication data. 
     * This data is authenticated but not encrypted. 
     */
    aad: Buffer;
    /**
     * length of authentication tag (output following cipher text) in bits. 
     * Can be any value between 0 and 128. Default 128
     */
    tagBits: number;

    constructor(iv: Buffer, aad: Buffer = null, tagBits: number = 128) {
        this.iv = iv;
        this.aad = aad;
        this.tagBits = tagBits;
    }

    toCKI(): pkcs11.AesGCM {
        return {
            iv: this.iv,
            ivBits: this.iv.length * 8,
            aad: this.aad,
            tagBits: this.tagBits
        };
    }
}