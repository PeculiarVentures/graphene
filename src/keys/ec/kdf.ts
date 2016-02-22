import * as pkcs11 from "../../pkcs11";

/**
 * EcKdf is used to indicate the Key Derivation Function (KDF) 
 * applied to derive keying data from a shared secret. 
 * The key derivation function will be used by the EC key agreement schemes.
 */
export enum EcKdf{
    NULL = pkcs11.CKD_NULL,
    SHA1 = pkcs11.CKD_SHA1_KDF,
    SHA224 = pkcs11.CKD_SHA224_KDF,
    SHA256 = pkcs11.CKD_SHA256_KDF,
    SHA384 = pkcs11.CKD_SHA384_KDF,
    SHA512 = pkcs11.CKD_SHA512_KDF,
}