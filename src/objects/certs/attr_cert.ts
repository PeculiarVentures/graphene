import { attribute } from "../../core";
import { Certificate } from "./cert";

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
  @attribute("owner")
  public owner: Buffer;

  /**
   * DER-encoding of the attribute certificate's issuer field.
   * This is distinct from the `CKA_ISSUER` attribute contained in `CKC_X_509` certificates
   * because the ASN.1 syntax and encoding are different. (default empty)
   */
  @attribute("issuerAC")
  public issuer: Buffer;

  /**
   * DER-encoding of the certificate serial number (default empty)
   */
  @attribute("serial")
  public serialNumber: Buffer;

  /**
   * BER-encoding of a sequence of object identifier values corresponding
   * to the attribute types contained in the certificate.
   * When present, this field offers an opportunity for applications
   * to search for a particular attribute certificate without fetching
   * and parsing the certificate itself. (default empty)
   */
  @attribute("attrTypes")
  public types: Buffer;

  /**
   * BER-encoding of the certificate
   * - Must be specified when the object is created.
   */
  @attribute("value")
  public value: Buffer;

}
