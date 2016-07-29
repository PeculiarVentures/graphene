import * as pkcs11 from "pkcs11js";
import * as core from "../../core";
import {MechanismEnum} from "../../mech";
import {IParams} from "../params";

export class AesCbcParams implements IParams {

    /**
     * initialization vector
     * - must have a fixed size of 16 bytes
     */
    iv: Buffer;
    /**
     * the data
     */
    data: Buffer;

    constructor(iv: Buffer, data: Buffer) {
        this.iv = iv;
        this.data = data;
    }

    toCKI(): Buffer {
        // convert iv to array
        let arIv = [];
        for (let i = 0; i < this.iv.length; i++)
            arIv.push(this.iv[i]);
        return new pkcs11.CK_AES_CBC_ENCRYPT_DATA_PARAMS({
            iv: arIv,
            pData: this.data,
            length: (this.data) ? this.data.length : 0
        })["ref.buffer"];
    }
}