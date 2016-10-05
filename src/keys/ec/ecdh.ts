import * as pkcs11 from "pkcs11js";
import {IParams, MechParams} from "../params";

import {EcKdf} from "./kdf";

export class EcdhParams implements IParams, pkcs11.ECDH1 {

    /**
     * key derivation function used on the shared secret value
     */
    kdf: EcKdf;
    /**
     * some data shared between the two parties
     */
    sharedData: Buffer;
    /**
     * other party's EC public key value
     */
    publicData: Buffer;

    type = MechParams.EcDH;

    /**
     * Creates an instance of EcdhParams.
     * 
     * @param {EcKdf} kdf key derivation function used on the shared secret value
     * @param {Buffer} [sharedData=null] some data shared between the two parties
     * @param {Buffer} [publicData=null] other party's EC public key value
     */
    constructor(kdf: EcKdf, sharedData: Buffer = new Buffer(0), publicData: Buffer = new Buffer(0)) {
        this.kdf = kdf;
        this.sharedData = sharedData;
        this.publicData = publicData;
    }

    toCKI(): pkcs11.ECDH1 {
        return this;
    }
}