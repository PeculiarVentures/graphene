import {Certificate} from "./cert";

/**
 * X.509 attribute certificate objects (certificate type `CKC_X_509_ATTR_CERT`) hold X.509 attribute certificates
 */
export class AttributeCertificate extends Certificate {

    /**
     * DER-encoding of the attribute certificate's subject field. 
     * This is distinct from the `CKA_SUBJECT` attribute contained in `CKC_X_509` certificates 
     * because the `ASN.1` syntax and encoding are different.
     * - Must be specified when the object is created
     */
    get owner(): Buffer {
        return this.get("owner");
    }

    set owner(v: Buffer) {
        this.set("owner", v);
    }

    /**
     * DER-encoding of the attribute certificate's issuer field. 
     * This is distinct from the `CKA_ISSUER` attribute contained in `CKC_X_509` certificates 
     * because the ASN.1 syntax and encoding are different. (default empty)
     */
    get issuer(): Buffer {
        return this.get("issuerAC");
    }

    set issuer(v: Buffer) {
        this.set("issuerAC", v);
    }

    /**
     * DER-encoding of the certificate serial number (default empty)
     */
    get serialNumber(): Buffer {
        return this.get("serial");
    }

    set serialNumber(v: Buffer) {
        this.set("serial", v);
    }

    /**
     * BER-encoding of a sequence of object identifier values corresponding 
     * to the attribute types contained in the certificate. 
     * When present, this field offers an opportunity for applications 
     * to search for a particular attribute certificate without fetching 
     * and parsing the certificate itself. (default empty)
     */
    get types(): Buffer {
        return this.get("attrTypes");
    }

    set types(v: Buffer) {
        this.set("attrTypes", v);
    }

    /**
     * BER-encoding of the certificate
     * - Must be specified when the object is created.
     */
    get value(): Buffer {
        return this.get("value");
    }

    set value(v: Buffer) {
        this.set("value", v);
    }

}