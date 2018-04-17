**[SafeNet Luna 7](http://www.safenet-inc.com/data-encryption/hardware-security-modules-hsms/luna-hsms-key-management/luna-G5-usb-attached-hsm/) PKCS #11 DEVICE CAPABILITIES**

---
[SafeNet Luna 7](http://www.safenet-inc.com/data-encryption/hardware-security-modules-hsms/luna-hsms-key-management/luna-G5-usb-attached-hsm/)

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
| RSA_PKCS                  |   | x | x | x | x | x | x |   |   |
| SHA1_RSA_PKCS             |   | x | x |   |   |   |   |   |   |
| RSA_PKCS_OAEP             |   |   |   | x | x | x | x |   |   |
| RSA_X9_31_KEY_PAIR_GEN    |   |   |   |   |   |   |   | x |   |
| SHA1_RSA_X9_31            |   | x | x |   |   |   |   |   |   |
| RSA_PKCS_PSS              |   | x | x |   |   |   |   |   |   |
| SHA1_RSA_PKCS_PSS         |   | x | x |   |   |   |   |   |   |
| DSA_KEY_PAIR_GEN          |   |   |   |   |   |   |   | x |   |
| DSA                       |   | x | x |   |   |   |   |   |   |
| SHA224_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA224_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA256_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA256_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA384_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA384_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| SHA512_RSA_PKCS           |   | x | x |   |   |   |   |   |   |
| SHA512_RSA_PKCS_PSS       |   | x | x |   |   |   |   |   |   |
| DES2_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| DES3_KEY_GEN              |   |   |   |   |   |   |   | x |   |
| DES3_ECB                  |   |   |   | x | x | x | x |   |   |
| DES3_CBC                  |   |   |   | x | x | x | x |   |   |
| DES3_MAC                  |   | x | x |   |   |   |   |   |   |
| DES3_MAC_GENERAL          |   | x | x |   |   |   |   |   |   |
| CKM_DES3_CMAC_GENERAL     |   | x | x |   |   |   |   |   |   |
| CKM_DES3_CMAC             |   | x | x |   |   |   |   |   |   |
| DES3_CBC_PAD              |   |   |   | x | x | x | x |   |   |
| DES_CFB8                  |   |   |   | x | x |   |   |   |   |
| DES_CFB64                 |   |   |   | x | x |   |   |   |   |
| DES_OFB64                 |   |   |   | x | x |   |   |   |   |
| AES_KEY_GEN               |   |   |   |   |   |   |   | x |   |
| AES_ECB                   |   |   |   | x | x | x | x |   |   |
| AES_CBC                   |   |   |   | x | x | x | x |   |   |
| AES_MAC                   |   | x | x |   |   |   |   |   |   |
| AES_MAC_GENERAL           |   | x | x |   |   |   |   |   |   |
| AES_CMAC                  |   | x | x |   |   |   |   |   |   |
| AES_CMAC_GENERAL          |   | x | x |   |   |   |   |   |   |
| AES_CBC_PAD               |   |   |   | x | x | x | x |   |   |
| AES_CFB8                  |   |   |   | x | x |   |   |   |   |
| AES_CFB128                |   |   |   | x | x |   |   |   |   |
| AES_OFB                   |   |   |   | x | x |   |   |   |   |
| AES_GCM                   |   |   |   | x | x |   |   |   |   |
| SHA1                      | x |   |   |   |   |   |   |   |   |
| SHA224                    | x |   |   |   |   |   |   |   |   |
| SHA224_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA224_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| SHA256                    | x |   |   |   |   |   |   |   |   |
| SHA256_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA256_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| SHA384                    | x |   |   |   |   |   |   |   |   |
| SHA384_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA384_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| SHA512                    | x |   |   |   |   |   |   |   |   |
| SHA512_HMAC               |   | x | x |   |   |   |   |   |   |
| SHA512_HMAC_GENERAL       |   | x | x |   |   |   |   |   |   |
| ECDSA_KEY_PAIR_GEN        |   |   |   |   |   |   |   | x |   |
| ECDSA                     |   | x | x |   |   |   |   |   |   |
| ECDSA_SHA1                |   | x | x |   |   |   |   |   |   |
| ECDSA_SHA224              |   | x | x |   |   |   |   |   |   |
| ECDSA_SHA256              |   | x | x |   |   |   |   |   |   |
| ECDSA_SHA384              |   | x | x |   |   |   |   |   |   |
| ECDSA_SHA512              |   | x | x |   |   |   |   |   |   |
| ECDH1_DERIVE              |   |   |   |   |   |   |   |   | x |
| ECDH1_COFACTOR_DERIVE     |   |   |   |   |   |   |   |   | x |
| DES3_ECB_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| DES3_CBC_ENCRYPT_DATA     |   |   |   |   |   |   |   |   | x |
| AES_ECB_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| AES_CBC_ENCRYPT_DATA      |   |   |   |   |   |   |   |   | x |
| DSA_PARAMETER_GEN         |   |   |   |   |   |   |   | x |   |
| GENERIC_SECRET_KEY_GEN    |   |   |   |   |   |   |   | x |   |
| SHA_1_HMAC                |   | x | x |   |   |   |   |   |   |
| SHA_1_HMAC_GENERAL        |   | x | x |   |   |   |   |   |   |
| DSA_SHA224                |   | x | x |   |   |   |   |   |   |
| DSA_SHA256                |   | x | x |   |   |   |   |   |   |
| NIST_PRF_KDF              |   |   |   |   |   |   |   |   | x |

75 algorithm(s) in list

#### Performance
##### Key generation

> test gen -s 0 --pin userpin -a all -t 20 -it 100

| Algorithm                 | Generate | Generate/s |
|---------------------------|---------:|-----------:|
| RSA-1024                  |    0.156 |    109.763 |
| RSA-2048                  |    0.531 |     34.789 |
| RSA-4096                  |    2.881 |      6.537 |
| ECDSA-SECP160R1           |    0.236 |     74.261 |
| ECDSA-SECP192R1           |    0.019 |    496.894 |
| ECDSA-SECP256R1           |    0.019 |    485.084 |
| ECDSA-SECP384R1           |    0.020 |    484.144 |
| ECDSA-SECP256K1           |    0.505 |     36.716 |
| ECDSA-BRAINPOOLP192R1     |    0.505 |     36.993 |
| ECDSA-BRAINPOOLP224R1     |    0.019 |    492.368 |
| ECDSA-BRAINPOOLP256R1     |    0.019 |    486.855 |
| ECDSA-BRAINPOOLP320R1     |    0.021 |    482.044 |
| AES-128                   |    0.007 |    757.576 |
| AES-192                   |    0.008 |    747.943 |
| AES-256                   |    0.008 |    724.113 |


##### Signing

> test sign -s 0 --pin userpin -a all -t 20 -it 10000

| Algorithm                 |       Sign |     Sign/s |
|---------------------------|-----------:|-----------:|
| RSA-1024                  |      0.001 |  19745.286 |
| RSA-2048                  |      0.002 |   8888.099 |
| RSA-4096                  |      0.015 |   1346.248 |
| ECDSA-SECP160R1           |      0.073 |    273.503 |
| ECDSA-SECP192R1           |      0.001 |  18501.388 |
| ECDSA-SECP256R1           |      0.001 |  17051.752 |
| ECDSA-SECP384R1           |      0.001 |  11576.754 |
| ECDSA-SECP256K1           |      0.157 |    127.054 |
| ECDSA-BRAINPOOLP192R1     |      0.157 |    127.358 |
| ECDSA-BRAINPOOLP224R1     |      0.001 |  17094.017 |
| ECDSA-BRAINPOOLP256R1     |      0.001 |  15059.107 |
| ECDSA-BRAINPOOLP320R1     |      0.001 |  11660.448 |

##### Encryption

> test enc -s 0 --pin userpin -a all -t 20 -it 10000

| Algorithm                 |    Encrypt |  Encrypt/s |
|---------------------------|-----------:|-----------:|
| AES-CBC128                |      0.001 |  15765.411 |
| AES-CBC192                |      0.001 |  15576.324 |
| AES-CBC256                |      0.001 |  15584.820 |
| AES-GCM128                |      0.001 |  17432.232 |
| AES-GCM192                |      0.001 |  19011.407 |
| AES-GCM256                |      0.001 |  18438.278 |
| RSA-1024                  |      0.004 |   5092.039 |
| RSA-2048                  |      0.005 |   3776.934 |
| RSA-4096                  |      0.008 |   2389.686 |
