import * as pkcs11 from "pkcs11js";

export enum RsaMgf {
  MGF1_SHA1 = pkcs11.CKG_MGF1_SHA1,
  MGF1_SHA224 = pkcs11.CKG_MGF1_SHA224,
  MGF1_SHA256 = pkcs11.CKG_MGF1_SHA256,
  MGF1_SHA384 = pkcs11.CKG_MGF1_SHA384,
  MGF1_SHA512 = pkcs11.CKG_MGF1_SHA512,
}
