import * as pkcs11 from "pkcs11js";
import * as core from "../../core";
import {MechanismEnum} from "../../mech";
import {IParams} from "../params";

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

    type = pkcs11.MechParams.AesCBC;

    constructor(iv: Buffer, data: Buffer = null) {
        this.iv = iv;
        this.data = data;
    }

    toCKI(): Buffer {
        return this.iv;
    }
}