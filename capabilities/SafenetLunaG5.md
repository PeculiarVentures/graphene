**[SafeNet Luna G5](http://www.safenet-inc.com/data-encryption/hardware-security-modules-hsms/luna-hsms-key-management/luna-G5-usb-attached-hsm/) PKCS #11 DEVICE CAPABILITIES**

---
[SafeNet Luna G5](http://www.safenet-inc.com/data-encryption/hardware-security-modules-hsms/luna-hsms-key-management/luna-G5-usb-attached-hsm/)

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

> test gen -it 5 -a all

| Algorithm                 | Generate | Generate/s |
|---------------------------|---------:|-----------:|
| RSA-1024                  |  868.6ms |      1.151 |
| RSA-2048                  | 8769.6ms |      0.114 |
| RSA-4096                  | 109307.8ms |      0.009 |
| ECDSA-SECP192R1           |   67.8ms |     14.749 |
| ECDSA-SECP256R1           |   95.6ms |      10.46 |
| ECDSA-SECP384R1           |  209.6ms |      4.771 |
| ECDSA-SECP256K1           |  102.6ms |      9.747 |
| ECDSA-BRAINPOOLP192R1     |  102.2ms |      9.785 |
| ECDSA-BRAINPOOLP224R1     |   89.8ms |     11.136 |
| ECDSA-BRAINPOOLP256R1     |  103.8ms |      9.634 |
| ECDSA-BRAINPOOLP320R1     |  165.8ms |      6.031 |
| AES-128                   |    8.8ms |    113.636 |
| AES-192                   |    8.4ms |    119.048 |
| AES-256                   |      9ms |    111.111 |


##### Signing

> test sign -it 200 -a all

| Algorithm                 |     Sign |   Verify |   Sign/s | Verify/s |
|---------------------------|---------:|---------:|---------:|---------:|
| RSA-1024                  |  5.745ms |  2.435ms |  174.064 |  410.678 |
| RSA-2048                  |  16.58ms |   3.51ms |   60.314 |    284.9 |
| RSA-4096                  |  84.71ms |    5.3ms |   11.805 |  188.679 |
| ECDSA-SECP192R1           | 17.155ms |  20.02ms |   58.292 |    49.95 |
| ECDSA-SECP256R1           |  25.93ms |   30.3ms |   38.565 |   33.003 |
| ECDSA-SECP384R1           | 61.775ms | 72.845ms |   16.188 |   13.728 |
| ECDSA-SECP256K1           |  29.72ms |  32.78ms |   33.647 |   30.506 |
| ECDSA-BRAINPOOLP192R1     | 28.355ms | 32.855ms |   35.267 |   30.437 |
| ECDSA-BRAINPOOLP224R1     |  24.87ms |  29.11ms |   40.209 |   34.352 |
| ECDSA-BRAINPOOLP256R1     |  28.97ms | 33.435ms |   34.518 |   29.909 |
| ECDSA-BRAINPOOLP320R1     |  48.58ms |  57.34ms |   20.585 |    17.44 |

##### Encryption
> test enc -it 200 -a all

| Algorithm                 |  Encrypt |  Decrypt | Encrypt/s | Decrypt/s |
|---------------------------|---------:|---------:|---------:|---------:|
| AES-CBC128                |   3.27ms |  5.435ms |   305.81 |  183.993 |
| AES-CBC192                |   3.59ms |  5.645ms |  278.552 |  177.148 |
| AES-CBC256                |  3.395ms |  5.505ms |  294.551 |  181.653 |
| AES-GCM128                |    296ms |    296ms |    3.378 |    3.378 |
| AES-GCM192                |    295ms |    296ms |     3.39 |    3.378 |
| AES-GCM256                |    294ms |    295ms |    3.401 |     3.39 |
