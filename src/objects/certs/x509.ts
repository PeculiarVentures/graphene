import {Certificate} from "./cert";

export enum JavaMIDP {
    Unspecified = 0,
    Manufacturer = 1,
    Operator = 2,
    ThirdParty = 3
}

/**
 * X.509 certificate objects (certificate type `CKC_X_509`) hold X.509 public key certificates
 */
export class X509Certificate extends Certificate {

    /**
     * DER-encoding of the certificate subject name
     * - Must be specified when the object is created.
     * - Must be non-empty if `CKA_URL` is empty.
     */
    get subject(): Buffer {
        return this.get("subject");
    }

    set subject(v: Buffer) {
        this.set("subject", v);
    }

    /**
     * Key identifier for public/private key pair (default empty)
     */
    get id(): Buffer {
        return this.get("id");
    }

    set id(v: Buffer) {
        this.set("id", v);
    }

    /**
     * DER-encoding of the certificate issuer name (default empty)
     */
    get issuer(): Buffer {
        return this.get("issuer");
    }

    set issuer(v: Buffer) {
        this.set("issuer", v);
    }

    /**
     * HEX-encoding of the certificate serial number (default empty)
     */
    get serialNumber(): string {
        return this.get("serial").toString("hex");
    }

    set serialNumber(v: string) {
        this.set("serial", new Buffer(v, "hex"));
    }

    /**
     * BER-encoding of the certificate
     * - Must be specified when the object is created.
     * - Must be non-empty if `CKA_URL` is empty.
     */
    get value(): Buffer {
        return this.get("value");
    }

    set value(v: Buffer) {
        this.set("value", v);
    }

    /**
     * If not empty this attribute gives the URL where the complete certificate 
     * can be obtained (default empty)
     * - Must be non-empty if `CKA_VALUE` is empty
     */
    get url(): string {
        return this.get("url");
    }

    set url(v: string) {
        this.set("url", v);
    }

    /**
     * SHA-1 hash of the subject public key (default empty)
     * - Can only be empty if `CKA_URL` is empty.
     */
    get subjectKeyIdentifier(): Buffer {
        return this.get("ski");
    }

    set subjectKeyIdentifier(v: Buffer) {
        this.set("ski", v);
    }

    /**
     * SHA-1 hash of the issuer public key (default empty)
     * - Can only be empty if `CKA_URL` is empty.
     */
    get authorityKeyIdentifier(): Buffer {
        return this.get("aki");
    }

    set authorityKeyIdentifier(v: Buffer) {
        this.set("aki", v);
    }

    /**
     * Java MIDP security domain
     */
    get java(): JavaMIDP {
        return this.get("javaDomain");
    }

    set java(v: JavaMIDP) {
        this.set("javaDomain", v);
    }

}