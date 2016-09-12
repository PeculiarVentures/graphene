**SoftHSM2 PKCS#11 DEVICE CAPABILITIES**
---

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

  Library: /usr/local/lib/softhsm/libsofthsm2.so
  Name: SoftHSM2
  Cryptoki version: 2.30

Session is started

| Algorithm name            | h | s | v | e | d | w | u | g | D |
|---------------------------|---|---|---|---|---|---|---|---|---|
| MD5                       | x |   |   |   |   |   |   |   |   |
| SHA_1                     | x |   |   |   |   |   |   |   |   |
| SHA224                    | x |   |   |   |   |   |   |   |   |
| SHA256                    | x |   |   |   |   |   |   |   |   |
| SHA384                    | x |   |   |   |   |   |   |   |   |
| SHA512                    | x |   |   |   |   |   |   |   |   |
| MD5_HMAC                  |   | x | x |   |   |   |   |   |   |
| SHA_1_HMAC                |   | x | x |   |   |   |   |   |   |
| SHA224_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA256_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA384_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA512_HMAC               |   | x | x |   |   |   |   |   |   |
| RSA_PKCS_KEY_PAIR_GEN     |   |   |   |   |   |   |   | x |   |
| RSA_PKCS                  |   | x | x | x | x | x | x |   |   |
| RSA_X_509                 |   | x | x | x | x |   |   |   |   |
| MD5_RSA_PKCS              |   | x | x |   |   |   |   |   |   |
| SHA1_RSA_PKCS             |   | x | x |   |   |   |   |   |   |
| RSA_PKCS_OAEP             |   |   |   | x | x | x | x |   |   |
| SHA224_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA256_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA384_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA512_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA1_RSA_PKCS_PSS         |   | x | x |   |   |   |   |   |   |
| SHA224_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA256_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA384_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA512_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| DES_KEY_GEN               |   |   |   |   |   |   |   | x |   |
| DES2_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| DES3_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| DES_ECB                   |   |   |   | x | x |   |   |   |   |
| DES_CBC                   |   |   |   | x | x |   |   |   |   |
| DES_CBC_PAD               |   |   |   | x | x |   |   |   |   |
| DES_ECB_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| DES_CBC_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| DES3_ECB                  |   |   |   | x | x |   |   |   |   |
| DES3_CBC                  |   |   |   | x | x |   |   |   |   |
| DES3_CBC_PAD              |   |   |   | x | x |   |   |   |   |
| DES3_ECB_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| DES3_CBC_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| AES_KEY_GEN               |   |   |   |   |   |   |   | x |   |
| AES_ECB                   |   |   |   | x | x |   |   |   |   |
| AES_CBC                   |   |   |   | x | x |   |   |   |   |
| AES_CBC_PAD               |   |   |   | x | x |   |   |   |   |
| unknown                   |   |   |   |   |   | x | x |   |   |
| AES_ECB_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| AES_CBC_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| DSA_PARAMETER_GEN         |   |   |   |   |   |   |   | x |   |
| DSA_KEY_PAIR_GEN          |   |   |   |   |   |   |   | x |   |
| DSA                       |   | x | x |   |   |   |   |   |   |
| DSA_SHA1                  |   | x | x |   |   |   |   |   |   |
| DSA_SHA224                |   | x | x |   |   |   |   |   |   |
| DSA_SHA256                |   | x | x |   |   |   |   |   |   |
| DSA_SHA384                |   | x | x |   |   |   |   |   |   |
| DSA_SHA512                |   | x | x |   |   |   |   |   |   |
| DH_PKCS_KEY_PAIR_GEN      |   |   |   |   |   |   |   | x |   |
| DH_PKCS_PARAMETER_GEN     |   |   |   |   |   |   |   | x |   |
| DH_PKCS_DERIVE            |   |   |   |   |   |   |   |   | x |
| EC_KEY_PAIR_GEN           |   |   |   |   |   |   |   | x |   |
| ECDSA                     |   | x | x |   |   |   |   |   |   |
| ECDH1_DERIVE              |   |   |   |   |   |   |   |   | x |
| GOSTR3411                 | x |   |   |   |   |   |   |   |   |
| GOSTR3411_HMAC            |   | x | x |   |   |   |   |   |   |
| GOSTR3410_KEY_PAIR_GEN    |   |   |   |   |   |   |   | x |   |
| GOSTR3410                 |   | x | x |   |   |   |   |   |   |
| GOSTR3410_WITH_GOSTR3411  |   | x | x |   |   |   |   |   |   |

66 algorithm(s) in list


#### Performance
##### Encryption
Module info

  Library: /usr/local/lib/softhsm/libsofthsm2.so
  Name: SoftHSM2
  Cryptoki version: 2.30

Session is started

| Algorithm                 |  Encrypt |  Decrypt | Encrypt/s | Decrypt/s |
|---------------------------|---------:|---------:|----------:|----------:|
| AES-CBC128                |  0.095ms |   0.08ms | 10526.316 |     12500 |
| AES-CBC192                |   0.04ms |  0.035ms |     25000 | 28571.429 |
| AES-CBC256                |  0.045ms |  0.025ms | 22222.222 |     40000 |


##### Signing
Module info

  Library: /usr/local/lib/softhsm/libsofthsm2.so
  Name: SoftHSM2
  Cryptoki version: 2.30

Session is started

| Algorithm                 |     Sign |   Verify |    Sign/s |  Verify/s |
|---------------------------|---------:|---------:|----------:|----------:|
| RSA-1024                  |  0.615ms |   0.05ms |  1626.016 |     20000 |
| RSA-2048                  |   1.96ms |   0.06ms |   510.204 | 16666.667 |
| RSA-4096                  |   10.4ms |   0.12ms |    96.154 |  8333.333 |


##### Key generation
Module info

  Library: /usr/local/lib/softhsm/libsofthsm2.so
  Name: SoftHSM2
  Cryptoki version: 2.30

Session is started

| Algorithm                 | Generate | Generate/s |
|---------------------------|---------:|-----------:|
| RSA-1024                  |     35ms |     28.571 |
| RSA-2048                  |  141.8ms |      7.052 |
| RSA-4096                  | 1358.8ms |      0.736 |
| ECDSA-SECP192R1           |    0.6ms |   1666.667 |
| ECDSA-SECP256R1           |    0.8ms |       1250 |
| ECDSA-SECP384R1           |    1.2ms |    833.333 |
| ECDSA-SECP256K1           |    0.6ms |   1666.667 |
| ECDSA-BRAINPOOLP192R1     |    0.8ms |       1250 |
| ECDSA-BRAINPOOLP224R1     |    0.8ms |       1250 |
| ECDSA-BRAINPOOLP256R1     |      1ms |       1000 |
| ECDSA-BRAINPOOLP320R1     |      1ms |       1000 |
| AES-128                   |    0.4ms |       2500 |
| AES-192                   |    0.2ms |       5000 |
| AES-256                   |    0.4ms |       2500 |


