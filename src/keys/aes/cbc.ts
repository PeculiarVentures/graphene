import * as core from "../../core";
import * as pkcs11 from "../../pkcs11";
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
       return new pkcs11.CK_AES_CBC_ENCRYPT_DATA_PARAMS({
            iv: this.iv,
            pData: this.data,
            length: (this.data) ? this.data.length : 0
        })["ref.buffer"];
    }
}