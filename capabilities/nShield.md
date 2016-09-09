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

  Library: /opt/nfast/toolkits/pkcs11/libcknfast.so
  Name: nShield
  Cryptoki version: 2.1


Session is started


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
| unknown                   |   |   |   |   |   |   |   | x |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
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
| unknown                   |   | x | x |   |   |   |   |   |   |
| AES_CMAC                  |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| unknown                   |   |   |   | x | x | x | x |   | x |
| unknown                   |   |   |   | x | x | x | x |   |   |
| unknown                   |   |   |   | x | x | x | x |   |   |
| unknown                   |   |   |   |   |   |   |   |   | x |
| unknown                   |   |   |   |   |   |   |   |   | x |
| unknown                   |   | x | x |   |   |   |   |   |   |
| unknown                   |   | x | x |   |   |   |   |   |   |
| MD5                       | x |   |   |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| MD5_HMAC                  |   | x | x |   |   |   |   |   |   |
| MD5_HMAC_GENERAL          |   | x | x |   |   |   |   |   |   |
| SHA_1                     | x |   |   |   |   |   |   |   |   |
| SHA224                    | x |   |   |   |   |   |   |   |   |
| SHA256                    | x |   |   |   |   |   |   |   |   |
| SHA384                    | x |   |   |   |   |   |   |   |   |
| SHA512                    | x |   |   |   |   |   |   |   |   |
| RIPEMD160                 | x |   |   |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| SHA_1_HMAC                |   | x | x |   |   |   |   |   |   |
| SHA_1_HMAC_GENERAL        |   | x | x |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| SHA224_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA224_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| SHA256_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA256_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| SHA384_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA384_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| SHA512_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA512_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| unknown                   | x |   |   |   |   |   |   |   |   |
| GENERIC_SECRET_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| XOR_BASE_AND_DATA         |   |   |   |   |   |   |   |   | x |
| CONCATENATE_BASE_AND_KEY  |   |   |   |   |   |   |   |   | x |
| unknown                   |   |   |   |   |   |   |   |   | x |
| PBE_MD5_DES_CBC           |   |   |   |   |   |   |   | x |   |
| unknown                   |   |   |   |   |   | x |   |   |   |
| unknown                   |   |   |   |   |   |   |   | x |   |
| unknown                   |   |   |   |   |   |   |   |   | x |
| unknown                   |   |   |   |   |   |   |   |   | x |

106 algorithm(s) in list



#### Performance
##### Encryption

Module info
==============================

  Library: /opt/nfast/toolkits/pkcs11/libcknfast.so
  Name: nShield
  Cryptoki version: 2.1


Session is started


| Algorithm                 |  Encrypt |  Decrypt | Encrypt/s | Decrypt/s |
|---------------------------|---------:|---------:|----------:|----------:|
| AES-CBC128                |   1.24ms |   1.03ms |   806.452 |   970.874 |
| AES-CBC192                |   1.12ms |   1.11ms |   892.857 |   900.901 |
| AES-CBC256                |  1.135ms |  1.025ms |   881.057 |    975.61 |



##### Signing

Module info
==============================

  Library: /opt/nfast/toolkits/pkcs11/libcknfast.so
  Name: nShield
  Cryptoki version: 2.1


Session is started


| Algorithm                 |     Sign |   Verify |    Sign/s |  Verify/s |
|---------------------------|---------:|---------:|----------:|----------:|
| RSA-1024                  |  0.645ms |  0.595ms |  1550.388 |  1680.672 |
| RSA-2048                  |  1.175ms |   0.56ms |   851.064 |  1785.714 |
| RSA-4096                  |   6.34ms |   0.89ms |   157.729 |  1123.596 |



##### Key generation

Module info
==============================

  Library: /opt/nfast/toolkits/pkcs11/libcknfast.so
  Name: nShield
  Cryptoki version: 2.1


Session is started


| Algorithm                 | Generate | Generate/s |
|---------------------------|---------:|-----------:|
| RSA-1024                  |  119.2ms |      8.389 |
| RSA-2048                  | 1156.2ms |      0.865 |
| RSA-4096                  |   5621ms |      0.178 |
| ECDSA-SECP192R1           |    5.4ms |    185.185 |
| ECDSA-SECP256R1           |      5ms |        200 |
| ECDSA-SECP384R1           |    6.4ms |     156.25 |
| AES-128                   |    2.2ms |    454.545 |
| AES-192                   |    2.4ms |    416.667 |
| AES-256                   |    2.2ms |    454.545 |
