import { attribute } from "../../core";
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
  @attribute("subject")
  public subject: Buffer;

  /**
   * WTLS-encoding (Identifier type) of the certificate issuer (default empty)
   */
  @attribute("issuer")
  public issuer: Buffer;

  /**
   * Key identifier for public/private key pair (default empty)
   */
  @attribute("id")
  public id: Buffer;

  /**
   * WTLS-encoding of the certificate
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
   * DER-encoding of the certificate serial number (default empty)
   */
  @attribute("serial")
  public serialNumber: Buffer;

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

}
