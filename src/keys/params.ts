export interface IParams {
  /**
   * Converts parameter to pkcs11js paramter
   */
  toCKI(): any;
}

/**
 * Enumeration specifies mechanism parameter types
 */
export enum MechParams {
  AesCBC = 1,
  AesCCM = 2,
  AesGCM = 3,
  RsaOAEP = 4,
  RsaPSS = 5,
  EcDH = 6,
  AesGCMv240 = 7,
}
