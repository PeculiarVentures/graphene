import * as pkcs11 from "pkcs11js";
import {Storage} from "../storage";

export enum CertificateType {
    X_509 = pkcs11.CKC_X_509,
    X_509_ATTR_CERT = pkcs11.CKC_X_509_ATTR_CERT,
    WTLS = pkcs11.CKC_WTLS
}

export enum CertificateCategory {
    Unspecified = 0,
    TokenUser = 1,
    Authority = 2,
    OtherEntity = 3
}

/**
 * Certificate objects (object class CKO_CERTIFICATE) hold public-key or attribute certificates
 */
export class Certificate extends Storage {

    /**
     * Type of certificate
     */
    get type(): CertificateType {
        return this.get("certType");
    }

    set type(v: CertificateType) {
        this.set("certType", v);
    }

    /**
     * The certificate can be trusted for the application that it was created.
     */
    get trusted(): boolean {
        return this.get("trusted");
    }

    set trusted(v: boolean) {
        this.set("trusted", v);
    }

    /**
     * Categorization of the certificate
     */
    get category(): CertificateCategory {
        return this.get("certCategory");
    }

    set category(v: CertificateCategory) {
        this.set("certCategory", v);
    }

    /**
     * Checksum
     */
    get checkValue(): Buffer {
        return this.get("checkValue");
    }

    set checkValue(v: Buffer) {
        this.set("checkValue", v);
    }

    /**
     * Start date for the certificate (default empty)
     */
    get startDate(): Date {
        return this.get("startDate");
    }

    set startDate(v: Date) {
        this.set("startDate", v);
    }

    /**
     * End date for the certificate (default empty)
     */
    get endDate(): Date {
        return this.get("endDate");
    }

    set endDate(v: Date) {
        this.set("endDate", v);
    }
}