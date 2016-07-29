import * as core from "../../core";
import * as pkcs11 from "pkcs11js";
import {MechanismEnum} from "../../mech";
import {IParams} from "../params";

export class AesCcmParams implements IParams {

    /**
     * length of the data where 0 <= dataLength < 2^8L
     */
    dataLength: number;
    /**
     * the nonce
     */
    nonce: Buffer;
    /**
     * the additional authentication data
     * - This data is authenticated but not encrypted
     */
    aad: Buffer;
    /**
     * length of authentication tag (output following cipher text) in bits. 
     * - Can be any value between 0 and 128
     */
    macLength: number;

    constructor(dataLength: number, nonce: Buffer, aad: Buffer = null, macLength: number = 0) {
        this.dataLength = dataLength;
        this.nonce = nonce;
        this.aad = aad;
        this.macLength = macLength;
    }

    toCKI(): Buffer {
        return new pkcs11.CK_GCM_PARAMS({
            ulDataLen: this.dataLength,
            pNonce: this.nonce,
            ulNonceLen: this.nonce.length,
            pAAD: this.aad,
            ulADDLen: (this.aad) ? this.aad.length : 0,
            ulMACLen: this.macLength
        })["ref.buffer"];
    }
}