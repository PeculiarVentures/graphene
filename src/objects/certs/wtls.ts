import { Certificate } from "./cert";

/**
 * WTLS certificate objects (certificate type `CKC_WTLS`) hold WTLS public key certificates
 */
export class WtlsCertificate extends Certificate {

  /**
   * WTLS-encoding (Identifier type) of the certificate subject
   * - Must be specified when the object is created.
   * - Can only be empty if `CKA_VALUE` is empty.
   */
  get subject(): Buffer {
    return this.get("subject");
  }

  set subject(v: Buffer) {
    this.set("subject", v);
  }

  /**
   * WTLS-encoding (Identifier type) of the certificate issuer (default empty)
   */
  get issuer(): Buffer {
    return this.get("issuer");
  }

  set issuer(v: Buffer) {
    this.set("issuer", v);
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
   * WTLS-encoding of the certificate
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
   * DER-encoding of the certificate serial number (default empty)
   */
  get serialNumber(): Buffer {
    return this.get("serial");
  }

  set serialNumber(v: Buffer) {
    this.set("serial", v);
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

}
