import {Storage} from "./storage";
import * as keys from "./keys/common";

export class DomainParameters extends Storage {

    /**
     * Type of key the domain parameters can be used to generate.
     */
    get keyType(): keys.KeyType {
        return this.get("keyType");
    }
    set keyType(v: keys.KeyType) {
        this.set("keyType", v);
    }

    /**
     * `CK_TRUE` only if domain parameters were either * generated locally (i.e., on the token) 
     * with a `C_GenerateKey` * created with a `C_CopyObject` call as a copy of domain parameters 
     * which had its `CKA_LOCAL` attribute set to `CK_TRUE` 
     */
    get local(): boolean {
        return this.get("local");
    }

    set local(v: boolean) {
        this.set("local", v);
    }

}