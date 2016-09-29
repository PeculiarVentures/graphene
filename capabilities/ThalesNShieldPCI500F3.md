**Thales nShield PCI 500 F3 PKCS#11 DEVICE CAPABILITIES**
---
[No longer sold or supported](http://images.go.thales-esecurity.com/Web/ThalesEsecurity/%7B601b654c-a86e-4ffd-ad57-35a7c510562a%7D_Product_Update_Solo_Connect_Non__EOS_v10.pdf)

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
| KCDSA                     |   | x | x |   |   |   |   |   |   |
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
| NC_AES_CMAC               |   | x | x |   |   |   |   |   |   |
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
| GENERIC_SECRET_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| XOR_BASE_AND_DATA         |   |   |   |   |   |   |   |   | x |
| CONCATENATE_BASE_AND_KEY  |   |   |   |   |   |   |   |   | x |
| PUBLIC_FROM_PRIVATE       |   |   |   |   |   |   |   |   | x |
| PBE_MD5_DES_CBC           |   |   |   |   |   |   |   | x |   |
| WRAP_RSA_CRT_COMPONENTS   |   |   |   |   |   | x |   |   |   |
| CAC_TK_DERIVATION         |   |   |   |   |   |   |   | x |   |
| NC_AES_CMAC_KEY_DERIVATION |   |   |   |   |   |   |   |   | x |
| NC_AES_CMAC_KEY_DERIVATION_SCP03 |   |   |   |   |   |   |   |   | x |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |

106 algorithm(s) in list

#### Performance
##### Key generation

> test gen -it 5 -a all

| Algorithm                 | Generate | Generate/s |
|---------------------------|---------:|-----------:|
| RSA-1024                  |  810.6ms |      1.234 |
| RSA-2048                  |   4828ms |      0.207 |
| RSA-4096                  | 100158.6ms |       0.01 |
| ECDSA-SECP192R1           |   35.6ms |      28.09 |
| ECDSA-SECP256R1           |   78.6ms |     12.723 |
| ECDSA-SECP384R1           |  163.8ms |      6.105 |
| AES-128                   |    2.2ms |    454.545 |
| AES-192                   |      2ms |        500 |
| AES-256                   |      2ms |        500 |

##### Signing

> test sign -it 200 -a all

| Algorithm                 |     Sign |   Verify |    Sign/s |  Verify/s |
|---------------------------|---------:|---------:|----------:|----------:|
| RSA-1024                  |   7.26ms |   1.32ms |   137.741 |   757.576 |
| RSA-2048                  |   37.9ms |   2.71ms |    26.385 |   369.004 |
| RSA-4096                  | 243.995ms | 12.995ms |     4.098 |    76.953 |

##### Encryption
> test enc -it 200 -a all

| Algorithm                 |  Encrypt |  Decrypt | Encrypt/s | Decrypt/s |
|---------------------------|---------:|---------:|----------:|----------:|
| AES-CBC128                |  1.055ms |   1.05ms |   947.867 |   952.381 |
| AES-CBC192                |  1.075ms |  1.065ms |   930.233 |   938.967 |
| AES-CBC256                |   1.08ms |  1.115ms |   925.926 |   896.861 |
