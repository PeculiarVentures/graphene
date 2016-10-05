import * as pkcs11 from "pkcs11js";
import {IParams, MechParams} from "../params";

export class AesCbcParams implements IParams, pkcs11.AesCBC {

    /**
     * initialization vector
     * - must have a fixed size of 16 bytes
     */
    iv: Buffer;
    /**
     * the data
     */
    data: Buffer;

    type = MechParams.AesCBC;

    constructor(iv: Buffer, data: Buffer = new Buffer(0)) {
        this.iv = iv;
        this.data = data;
    }

    toCKI(): Buffer {
        return this.iv;
    }
}