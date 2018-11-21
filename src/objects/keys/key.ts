import * as pkcs11 from "pkcs11js";
import { Storage } from "../storage";

export enum KeyType {
  RSA = pkcs11.CKK_RSA,
  DSA = pkcs11.CKK_DSA,
  DH = pkcs11.CKK_DH,
  ECDSA = pkcs11.CKK_ECDSA,
  EC = pkcs11.CKK_EC,
  X9_42_DH = pkcs11.CKK_X9_42_DH,
  KEA = pkcs11.CKK_KEA,
  GENERIC_SECRET = pkcs11.CKK_GENERIC_SECRET,
  RC2 = pkcs11.CKK_RC2,
  RC4 = pkcs11.CKK_RC4,
  DES = pkcs11.CKK_DES,
  DES2 = pkcs11.CKK_DES2,
  DES3 = pkcs11.CKK_DES3,
  CAST = pkcs11.CKK_CAST,
  CAST3 = pkcs11.CKK_CAST3,
  CAST5 = pkcs11.CKK_CAST5,
  CAST128 = pkcs11.CKK_CAST128,
  RC5 = pkcs11.CKK_RC5,
  IDEA = pkcs11.CKK_IDEA,
  SKIPJACK = pkcs11.CKK_SKIPJACK,
  BATON = pkcs11.CKK_BATON,
  JUNIPER = pkcs11.CKK_JUNIPER,
  CDMF = pkcs11.CKK_CDMF,
  AES = pkcs11.CKK_AES,
  GOSTR3410 = pkcs11.CKK_GOSTR3410,
  GOSTR3411 = pkcs11.CKK_GOSTR3411,
  GOST28147 = pkcs11.CKK_GOST28147,
  BLOWFISH = pkcs11.CKK_BLOWFISH,
  TWOFISH = pkcs11.CKK_TWOFISH,
  SECURID = pkcs11.CKK_SECURID,
  HOTP = pkcs11.CKK_HOTP,
  ACTI = pkcs11.CKK_ACTI,
  CAMELLIA = pkcs11.CKK_CAMELLIA,
  ARIA = pkcs11.CKK_ARIA,
}

export enum KeyGenMechanism {
  AES = pkcs11.CKM_AES_KEY_GEN,
  RSA = pkcs11.CKM_RSA_PKCS_KEY_PAIR_GEN,
  RSA_X9_31 = pkcs11.CKM_RSA_X9_31_KEY_PAIR_GEN,
  DSA = pkcs11.CKM_DSA_KEY_PAIR_GEN,
  DH_PKCS = pkcs11.CKM_DH_PKCS_KEY_PAIR_GEN,
  DH_X9_42 = pkcs11.CKM_X9_42_DH_KEY_PAIR_GEN,
  GOSTR3410 = pkcs11.CKM_GOSTR3410_KEY_PAIR_GEN,
  GOST28147 = pkcs11.CKM_GOST28147_KEY_GEN,
  RC2 = pkcs11.CKM_RC2_KEY_GEN,
  RC4 = pkcs11.CKM_RC4_KEY_GEN,
  DES = pkcs11.CKM_DES_KEY_GEN,
  DES2 = pkcs11.CKM_DES2_KEY_GEN,
  SECURID = pkcs11.CKM_SECURID_KEY_GEN,
  ACTI = pkcs11.CKM_ACTI_KEY_GEN,
  CAST = pkcs11.CKM_CAST_KEY_GEN,
  CAST3 = pkcs11.CKM_CAST3_KEY_GEN,
  CAST5 = pkcs11.CKM_CAST5_KEY_GEN,
  CAST128 = pkcs11.CKM_CAST128_KEY_GEN,
  RC5 = pkcs11.CKM_RC5_KEY_GEN,
  IDEA = pkcs11.CKM_IDEA_KEY_GEN,
  GENERIC_SECRET = pkcs11.CKM_GENERIC_SECRET_KEY_GEN,
  SSL3_PRE_MASTER = pkcs11.CKM_SSL3_PRE_MASTER_KEY_GEN,
  CAMELLIA = pkcs11.CKM_CAMELLIA_KEY_GEN,
  ARIA = pkcs11.CKM_ARIA_KEY_GEN,
  SKIPJACK = pkcs11.CKM_SKIPJACK_KEY_GEN,
  KEA = pkcs11.CKM_KEA_KEY_PAIR_GEN,
  BATON = pkcs11.CKM_BATON_KEY_GEN,
  ECDSA = pkcs11.CKM_ECDSA_KEY_PAIR_GEN,
  EC = pkcs11.CKM_EC_KEY_PAIR_GEN,
  JUNIPER = pkcs11.CKM_JUNIPER_KEY_GEN,
  TWOFISH = pkcs11.CKM_TWOFISH_KEY_GEN,
}

/**
 * Definition for the base key object class
 * - defines the object class `CKO_PUBLIC_KEY`, `CKO_PRIVATE_KEY` and `CKO_SECRET_KEY` for type `CK_OBJECT_CLASS`
 * as used in the `CKA_CLASS` attribute of objects
 */
export class Key extends Storage {

  /**
   * Type of key
   * - Must be specified when object is created with `C_CreateObject`
   * - Must be specified when object is unwrapped with `C_UnwrapKey`
   */
  get type(): KeyType {
    return this.get("keyType");
  }

  set type(v: KeyType) {
    this.set("keyType", v);
  }

  /**
   * Key identifier for key (default empty)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification
   * of the attribute during the course of a `C_CopyObject` call.
   */
  get id(): Buffer {
    return this.get("id");
  }

  set id(v: Buffer) {
    this.set("id", v);
  }

  /**
   * Start date for the key (default empty)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification
   * of the attribute during the course of a `C_CopyObject` call.
   */
  get startDate(): Date {
    return this.get("startDate");
  }

  set startDate(v: Date) {
    this.set("startDate", v);
  }

  /**
   * End date for the key (default empty)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification
   * of the attribute during the course of a `C_CopyObject` call.
   */
  get endDate(): Date {
    return this.get("endDate");
  }

  set endDate(v: Date) {
    this.set("endDate", v);
  }

  /**
   * `CK_TRUE` if key supports key derivation
   * (i.e., if other keys can be derived from this one (default `CK_FALSE`)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification
   * of the attribute during the course of a `C_CopyObject` call.
   * @returns boolean
   */
  get derive(): boolean {
    try {
      return this.get("derive");
    } catch (err) {
      return false;
    }
  }

  set derive(v: boolean) {
    this.set("derive", v);
  }

  /**
   * `CK_TRUE` only if key was either * generated locally (i.e., on the token)
   * with a `C_GenerateKey` or `C_GenerateKeyPair` call * created with a `C_CopyObject` call
   * as a copy of a key which had its `CKA_LOCAL` attribute set to `CK_TRUE`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  get local(): boolean {
    return this.get("local");
  }

  set local(v: boolean) {
    this.set("local", v);
  }

  /**
   * Identifier of the mechanism used to generate the key material.
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  get mechanism(): KeyGenMechanism {
    return this.get("keyGenMechanism");
  }

  set mechanism(v: KeyGenMechanism) {
    this.set("keyGenMechanism", v);
  }

  get allowedMechanisms() {
    throw new Error("Not implemented");
  }

  set allowedMechanisms(v) {
    throw new Error("Not implemented");
  }

}
