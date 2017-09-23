**Thales nShield PKCS#11 DEVICE CAPABILITIES**
---
### [Thales nShield Solo+](https://www.thales-esecurity.com/products-and-services/products-and-services/hardware-security-modules/general-purpose-hsms/nshield-solo)

#### Capabilities

    a - all mechanisms in PKCS11
    h - mechanism can be used with C_DigestInit
    s - mechanism can be used with C_SignInit
    v - mechanism can be used with C_VerifyInit
    e - mechanism can be used with C_EncryptInit
    d - mechanism can be used with C_DecryptInit
    w - mechanism can be used with C_WrapKey
    u - mechanism can be used with C_UnwrapKey
    g - mechanism can be used with C_GenerateKey or C_GenerateKeyPair
    D - mechanism can be used with C_DeriveKey


Module info
==============================
 > slot algs -s 0
 
| Algorithm name            | h | s | v | e | d | w | u | g | D |
|---------------------------|---|---|---|---|---|---|---|---|---|
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_X9_31_KEY_PAIR_GEN    |   |   |   |   |   |   |   | x |   |
| RSA_PKCS                  |   | x | x | x | x | x | x |   |   |
| RSA_9796                  |   | x | x |   |   |   |   |   |   |
| RSA_X_509                 |   | x | x | x | x |   |   |   |   |
| RSA_PKCS_OAEP             |   |   |   | x | x | x | x |   |   |
| RSA_PKCS_PSS              |   | x | x |   |   |   |   |   |   |
| SHA1_RSA_PKCS_PSS         |   | x | x |   |   |   |   |   |   |
| SHA224_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA256_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA384_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA512_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| MD5_RSA_PKCS              |   | x | x |   |   |   |   |   |   |
| SHA1_RSA_PKCS             |   | x | x |   |   |   |   |   |   |
| SHA256_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA384_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA512_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| DSA_KEY_PAIR_GEN          |   |   |   |   |   |   |   | x |   |
| DSA                       |   | x | x |   |   |   |   |   |   |
| DSA_SHA1                  |   | x | x |   |   |   |   |   |   |
| DSA_PARAMETER_GEN         |   |   |   |   |   |   |   | x |   |
| KCDSA_KEY_PAIR_GEN        |   |   |   |   |   |   |   | x |   |
| KCDSA                     |   | x | x |   |   |   |   |   |   |
| KCDSA_SHA1                |   | x | x |   |   |   |   |   |   |
| KCDSA_SHA224              |   | x | x |   |   |   |   |   |   |
| KCDSA_SHA256              |   | x | x |   |   |   |   |   |   |
| KCDSA_HAS160              |   | x | x |   |   |   |   |   |   |
| KCDSA_RIPEMD160           |   | x | x |   |   |   |   |   |   |
| KCDSA_PARAMETER_GEN       |   |   |   |   |   |   |   | x |   |
| DH_PKCS_KEY_PAIR_GEN      |   |   |   |   |   |   |   | x |   |
| DH_PKCS_DERIVE            |   |   |   |   |   |   |   |   | x |
| EC_KEY_PAIR_GEN           |   |   |   |   |   |   |   | x |   |
| ECDSA                     |   | x | x |   |   |   |   |   |   |
| ECDSA_SHA1                |   | x | x |   |   |   |   |   |   |
| ECDH1_DERIVE              |   |   |   |   |   |   |   |   | x |
| DES_KEY_GEN               |   |   |   |   |   |   |   | x |   |
| DES_ECB                   |   |   |   | x | x | x | x |   | x |
| DES_ECB_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| DES_CBC_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| DES_CBC                   |   |   |   | x | x | x | x |   |   |
| DES_CBC_PAD               |   |   |   | x | x | x | x |   |   |
| DES_MAC                   |   | x | x |   |   |   |   |   |   |
| DES_MAC_GENERAL           |   | x | x |   |   |   |   |   |   |
| DES2_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| DES3_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| DES3_ECB                  |   |   |   | x | x | x | x |   | x |
| DES3_ECB_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| DES3_CBC_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| DES3_CBC                  |   |   |   | x | x | x | x |   |   |
| DES3_CBC_PAD              |   |   |   | x | x | x | x |   |   |
| DES3_MAC                  |   | x | x |   |   |   |   |   |   |
| DES3_MAC_GENERAL          |   | x | x |   |   |   |   |   |   |
| AES_KEY_GEN               |   |   |   |   |   |   |   | x |   |
| AES_ECB                   |   |   |   | x | x | x | x |   | x |
| AES_CBC                   |   |   |   | x | x | x | x |   |   |
| AES_CBC_PAD               |   |   |   | x | x | x | x |   |   |
| AES_MAC                   |   | x | x |   |   |   |   |   |   |
| AES_MAC_GENERAL           |   | x | x |   |   |   |   |   |   |
| AES_ECB_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| AES_CBC_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| AES_CMAC                  |   | x | x |   |   |   |   |   |   |
| NC_AES_CMAC               |   | x | x |   |   |   |   |   |   |
| SEED_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| SEED_ECB                  |   |   |   | x | x | x | x |   | x |
| SEED_CBC                  |   |   |   | x | x | x | x |   |   |
| SEED_CBC_PAD              |   |   |   | x | x | x | x |   |   |
| SEED_ECB_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| SEED_CBC_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| SEED_MAC                  |   | x | x |   |   |   |   |   |   |
| SEED_MAC_GENERAL          |   | x | x |   |   |   |   |   |   |
| MD5                       | x |   |   |   |   |   |   |   |   |
| NC_MD5_HMAC_KEY_GEN       |   |   |   |   |   |   |   | x |   |
| MD5_HMAC                  |   | x | x |   |   |   |   |   |   |
| MD5_HMAC_GENERAL          |   | x | x |   |   |   |   |   |   |
| SHA_1                     | x |   |   |   |   |   |   |   |   |
| SHA224                    | x |   |   |   |   |   |   |   |   |
| SHA256                    | x |   |   |   |   |   |   |   |   |
| SHA384                    | x |   |   |   |   |   |   |   |   |
| SHA512                    | x |   |   |   |   |   |   |   |   |
| RIPEMD160                 | x |   |   |   |   |   |   |   |   |
| NC_SHA_1_HMAC_KEY_GEN     |   |   |   |   |   |   |   | x |   |
| SHA_1_HMAC                |   | x | x |   |   |   |   |   |   |
| SHA_1_HMAC_GENERAL        |   | x | x |   |   |   |   |   |   |
| NC_SHA224_HMAC_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| SHA224_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA224_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| NC_SHA256_HMAC_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| SHA256_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA256_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| NC_SHA384_HMAC_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| SHA384_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA384_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| NC_SHA512_HMAC_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| SHA512_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA512_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| HAS160                    | x |   |   |   |   |   |   |   |   |
| GENERIC_SECRET_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| XOR_BASE_AND_DATA         |   |   |   |   |   |   |   |   | x |
| CONCATENATE_BASE_AND_KEY  |   |   |   |   |   |   |   |   | x |
| PUBLIC_FROM_PRIVATE       |   |   |   |   |   |   |   |   | x |
| PBE_MD5_DES_CBC           |   |   |   |   |   |   |   | x |   |
| WRAP_RSA_CRT_COMPONENTS   |   |   |   |   |   | x |   |   |   |
| CAC_TK_DERIVATION         |   |   |   |   |   |   |   | x |   |
| NC_AES_CMAC_KEY_DERIVATION |   |   |   |   |   |   |   |   | x |
| NC_AES_CMAC_KEY_DERIVATION_SCP03 |   |   |   |   |   |   |   |   | x |

105 algorithm(s) in list

 
#### Performance
##### Key generation

> test gen -it 5 -a all

| Algorithm                 | Generate | Generate/s |
|---------------------------|---------:|-----------:|
| RSA-1024                  |    202ms |       4.95 |
| RSA-2048                  |  950.4ms |      1.052 |
| RSA-4096                  | 4827.4ms |      0.207 |
| ECDSA-SECP160R1           |     20ms |         50 |
| ECDSA-SECP192R1           |    5.4ms |    185.185 |
| ECDSA-SECP256R1           |    5.6ms |    178.571 |
| ECDSA-SECP384R1           |      7ms |    142.857 |
| AES-128                   |    3.2ms |      312.5 |
| AES-192                   |    2.6ms |    384.615 |
| AES-256                   |      3ms |    333.333 |

##### Signing

> test sign -it 200 -a all
 
| Algorithm                 |     Sign |   Verify |    Sign/s |  Verify/s |
|---------------------------|---------:|---------:|----------:|----------:|
| RSA-1024                  |   0.78ms |  0.545ms |  1282.051 |  1834.862 |
| RSA-2048                  |  1.605ms |    0.7ms |   623.053 |  1428.571 |
| RSA-4096                  |   6.59ms |  1.135ms |   151.745 |   881.057 |
| ECDSA-SECP160R1           |    1.9ms |   2.95ms |   526.316 |   338.983 |
| ECDSA-SECP192R1           |    1.6ms |      2ms |       625 |       500 |
| ECDSA-SECP256R1           |    1.4ms |   1.65ms |   714.286 |   606.061 |
| ECDSA-SECP384R1           |    2.1ms |   2.35ms |    476.19 |   425.532 |

##### Encryption

> test enc -it 200 -a all
 
| Algorithm                 |  Encrypt |  Decrypt | Encrypt/s | Decrypt/s |
|---------------------------|---------:|---------:|----------:|----------:|
| AES-CBC128                |   1.23ms |  1.175ms |   813.008 |   851.064 |
| AES-CBC192                |  1.175ms |  1.215ms |   851.064 |   823.045 |
| AES-CBC256                |  1.255ms |   1.24ms |   796.813 |   806.452 |

