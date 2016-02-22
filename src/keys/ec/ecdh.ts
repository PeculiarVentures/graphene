import * as core from "../../core";
import * as pkcs11 from "../../pkcs11";
import {MechanismEnum} from "../../mech";
import {IParams} from "../params";

import {EcKdf} from "./kdf";

export class EcdhParams implements IParams {

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

    /**
     * @param  {EcKdf} kdf key derivation function used on the shared secret value 
     * @param  {Buffer=null} sharedData some data shared between the two parties
     * @param  {Buffer=null} publicData other party's EC public key value
     */
    constructor(kdf: EcKdf, sharedData: Buffer = null, publicData: Buffer = null) {
        this.kdf = kdf;
        this.sharedData = sharedData;
        this.publicData = publicData;
    }

    toCKI(): Buffer {
        return new pkcs11.CK_ECDH1_DERIVE_PARAMS({
            kdf: this.kdf,
            ulSharedDataLen: (this.sharedData) ? this.sharedData.length : 0,
            pSharedData: this.sharedData,
            ulPublicDataLen: (this.publicData) ? this.publicData.length : 0,
            pPublicData: this.publicData
        })["ref.buffer"];
    }
}