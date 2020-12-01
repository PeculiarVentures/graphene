import { attribute } from "../../core";
import { Certificate } from "./cert";

/**
 * Enumeration specifies Java MIDP
 */
export enum JavaMIDP {
  Unspecified = 0,
  Manufacturer = 1,
  Operator = 2,
  ThirdParty = 3,
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
  @attribute("subject")
  public subject: Buffer;

  /**
   * Key identifier for public/private key pair (default empty)
   */
  @attribute("id")
  public id: Buffer;

  /**
   * DER-encoding of the certificate issuer name (default empty)
   */
  @attribute("issuer")
  public issuer: Buffer;

  /**
   * HEX-encoding of the certificate serial number (default empty)
   */
  public get serialNumber(): string {
    return this.get("serial").toString("hex");
  }

  /**
   * HEX-encoding of the certificate serial number (default empty)
   */
  public set serialNumber(v: string) {
    this.set("serial", Buffer.from(v, "hex"));
  }

  /**
   * BER-encoding of the certificate
   * - Must be specified when the object is created.
   * - Must be non-empty if `CKA_URL` is empty.
   */
  @attribute("value")
  public value: Buffer;

  /**
   * If not empty this attribute gives the URL where the complete certificate
   * can be obtained (default empty)
   * - Must be non-empty if `CKA_VALUE` is empty
   */
  @attribute("url")
  public url: string;

  /**
   * SHA-1 hash of the subject public key (default empty)
   * - Can only be empty if `CKA_URL` is empty.
   */
  @attribute("ski")
  public subjectKeyIdentifier: Buffer;

  /**
   * SHA-1 hash of the issuer public key (default empty)
   * - Can only be empty if `CKA_URL` is empty.
   */
  @attribute("aki")
  public authorityKeyIdentifier: Buffer;

  /**
   * Java MIDP security domain
   */
  @attribute("javaDomain")
  public java: JavaMIDP;

}
