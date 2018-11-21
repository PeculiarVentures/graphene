export interface IParams {
  toCKI(): any;
}

export enum MechParams {
  AesCBC = 1,
  AesCCM = 2,
  AesGCM = 3,
  RsaOAEP = 4,
  RsaPSS = 5,
  EcDH = 6,
  AesGCMv240 = 7,
}
