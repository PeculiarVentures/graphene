import * as pkcs11 from "pkcs11js";
import { attribute } from "../../core";
import { Storage } from "../storage";

/**
 * Enumeration specifies certificate types
 */
export enum CertificateType {
  /**
   * X509 certificate
   */
  X_509 = pkcs11.CKC_X_509,
  /**
   * X509 attribute certificate
   */
  X_509_ATTR_CERT = pkcs11.CKC_X_509_ATTR_CERT,
  /**
   * WTLS public key certificates
   */
  WTLS = pkcs11.CKC_WTLS,
}

/**
 * Enumeration specifies categories of certificate
 */
export enum CertificateCategory {
  Unspecified = 0,
  TokenUser = 1,
  Authority = 2,
  OtherEntity = 3,
}

/**
 * Certificate objects (object class CKO_CERTIFICATE) hold public-key or attribute certificates
 */
export class Certificate extends Storage {

  /**
   * Type of certificate
   */
  @attribute("certType")
  public type: CertificateType;

  /**
   * The certificate can be trusted for the application that it was created.
   */
  @attribute("trusted")
  public trusted: boolean;

  /**
   * Categorization of the certificate
   */
  @attribute("certCategory")
  public category: CertificateCategory;

  /**
   * Checksum
   */
  @attribute("checkValue")
  public checkValue: Buffer;

  /**
   * Start date for the certificate (default empty)
   */
  @attribute("startDate")
  public startDate: Date;

  /**
   * End date for the certificate (default empty)
   */
  @attribute("endDate")
  public endDate: Date;

}
