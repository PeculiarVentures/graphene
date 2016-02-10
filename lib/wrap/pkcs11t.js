var ref = require("ref");
var struct = require('ref-struct');
var arrayType = require('ref-array');
var PLATFORM = process.platform;

var t = {};
/* an unsigned 8-bit value */
t.CK_BYTE = "uchar";
t.CK_BYTE_PTR = arrayType(t.CK_BYTE);
/* an unsigned 8-bit character */
t.CK_CHAR = t.CK_BYTE;
/* an 8-bit UTF-8 character */
t.CK_UTF8CHAR = t.CK_BYTE;
/* a BYTE-sized Boolean flag */
t.CK_BBOOL = t.CK_BYTE;

/* an unsigned value, at least 32 bits long */
switch (PLATFORM) {
  case "win32":
    t.CK_ULONG = "ulong";
    break;
  case "linux":
    t.CK_ULONG = "ulong";
    break;
  default:
    t.CK_ULONG = "uint32";
}

/* a signed value, the same size as at.CK_ULONG */
/*t.CK_LONG is new for v2.0 */
t.CK_LONG = "long";
/* at least 32 bits; each bit is a Boolean flag */
t.CK_FLAGS = t.CK_ULONG;

t.CK_SLOT_ID = t.CK_ULONG;
t.CK_SLOT_ID_PTR = arrayType(t.CK_SLOT_ID);

t.CK_VOID = "void";
t.CK_VOID_PTR = ref.refType(t.CK_VOID);
t.CK_ULONG_PTR = ref.refType(t.CK_ULONG);

t.CK_VERSION = struct({
  major: t.CK_BYTE,                     /* integer portion of version number */
  minor: t.CK_BYTE                      /* 1/100ths portion of version number */
})

/* CK_DATE is a structure that defines a date */
t.CK_DATE = struct({
  year: arrayType(t.CK_CHAR, 4),   /* the year ("1900" - "9999") */
  month: arrayType(t.CK_CHAR, 2),  /* the month ("01" - "12") */
  day: arrayType(t.CK_CHAR, 2)    /* the day   ("01" - "31") */
});

t.CK_INFO = struct({
  cryptokiVersion: t.CK_VERSION,        /* Cryptoki interface ver */
  manufacturerID: arrayType(t.CK_UTF8CHAR, 32),             /* blank padded */
  flags: t.CK_FLAGS,                    /* must be zero */

  /* libraryDescription and libraryVersion are new for v2.0 */
  libraryDescription: arrayType(t.CK_UTF8CHAR, 32),         /* blank padded */
  libraryVersion: t.CK_VERSION          /* version of library */
});
t.CK_INFO_PTR = ref.refType(t.CK_INFO);

/* CK_SLOT_INFO provides information about a slot */
t.CK_SLOT_INFO = struct({
  /* slotDescription and manufacturerID have been changed from
   * CK_CHAR to CK_UTF8CHAR for v2.10 */
  slotDescription: arrayType(t.CK_UTF8CHAR, 64),              /* blank padded */
  manufacturerID: arrayType(t.CK_UTF8CHAR, 32),       /* blank padded */
  flags: t.CK_FLAGS,

  /* hardwareVersion and firmwareVersion are new for v2.0 */
  hardwareVersion: t.CK_VERSION,          /* version of hardware */
  firmwareVersion: t.CK_VERSION           /* version of firmware */
});

/* flags: bit flags that provide capabilities of the slot
 *      Bit Flag              Mask        Meaning
 */
t.CKF_TOKEN_PRESENT = 0x00000001;  /* a token is there */
t.CKF_REMOVABLE_DEVICE = 0x00000002;  /* removable devices*/
t.CKF_HW_SLOT = 0x00000004;  /* hardware slot */

t.CK_SLOT_INFO_PTR = ref.refType(t.CK_SLOT_INFO);

/* CK_TOKEN_INFO provides information about a token */
t.CK_TOKEN_INFO = struct({
  /* label, manufacturerID, and model have been changed from
   * CK_CHAR to CK_UTF8CHAR for v2.10 */
  label: arrayType(t.CK_UTF8CHAR, 32),                    /* blank padded */
  manufacturerID: arrayType(t.CK_UTF8CHAR, 32),           /* blank padded */
  model: arrayType(t.CK_UTF8CHAR, 16),                    /* blank padded */
  serialNumber: arrayType(t.CK_UTF8CHAR, 16),             /* blank padded */
  flags: t.CK_FLAGS,                  /* see below */

  /* ulMaxSessionCount, ulSessionCount, ulMaxRwSessionCount,
   * ulRwSessionCount, ulMaxPinLen, and ulMinPinLen have all been
   * changed from CK_USHORT to CK_ULONG for v2.0 */
  ulMaxSessionCount: t.CK_ULONG,           /* max open sessions */
  ulSessionCount: t.CK_ULONG,              /* sess. now open */
  ulMaxRwSessionCount: t.CK_ULONG,         /* max R/W sessions */
  ulRwSessionCount: t.CK_ULONG,            /* R/W sess. now open */
  ulMaxPinLen: t.CK_ULONG,                 /* in bytes */
  ulMinPinLen: t.CK_ULONG,                 /* in bytes */
  ulTotalPublicMemory: t.CK_ULONG,         /* in bytes */
  ulFreePublicMemory: t.CK_ULONG,          /* in bytes */
  ulTotalPrivateMemory: t.CK_ULONG,        /* in bytes */
  ulFreePrivateMemory: t.CK_ULONG,         /* in bytes */

  /* hardwareVersion, firmwareVersion, and time are new for
   * v2.0 */
  hardwareVersion: t.CK_VERSION,          /* version of hardware */
  firmwareVersion: t.CK_VERSION,          /* version of firmware */
  utcTime: arrayType(t.CK_UTF8CHAR, 16)   /* time */
});

/* The flags parameter is defined as follows:
 *      Bit Flag                    Mask        Meaning
 */
t.CKF_RNG = 0x00000001;  /* has random #
                                                 * generator */
t.CKF_WRITE_PROTECTED = 0x00000002;  /* token is
                                                 * write-
                                                 * protected */
t.CKF_LOGIN_REQUIRED = 0x00000004;  /* user must
                                                 * login */
t.CKF_USER_PIN_INITIALIZED = 0x00000008;  /* normal user's
                                                 * PIN is set */

/* CKF_RESTORE_KEY_NOT_NEEDED is new for v2.0.  If it is set,
 * that means that *every* time the state of cryptographic
 * operations of a session is successfully saved, all keys
 * needed to continue those operations are stored in the state */
t.CKF_RESTORE_KEY_NOT_NEEDED = 0x00000020;

/* CKF_CLOCK_ON_TOKEN is new for v2.0.  If it is set, that means
 * that the token has some sort of clock.  The time on that
 * clock is returned in the token info structure */
t.CKF_CLOCK_ON_TOKEN = 0x00000040;

/* CKF_PROTECTED_AUTHENTICATION_PATH is new for v2.0.  If it is
 * set, that means that there is some way for the user to login
 * without sending a PIN through the Cryptoki library itself */
t.CKF_PROTECTED_AUTHENTICATION_PATH = 0x00000100;

/* CKF_DUAL_CRYPTO_OPERATIONS is new for v2.0.  If it is true,
 * that means that a single session with the token can perform
 * dual simultaneous cryptographic operations (digest and
 * encrypt; decrypt and digest; sign and encrypt; and decrypt
 * and sign) */
t.CKF_DUAL_CRYPTO_OPERATIONS = 0x00000200;

/* CKF_TOKEN_INITIALIZED if new for v2.10. If it is true, the
 * token has been initialized using C_InitializeToken or an
 * equivalent mechanism outside the scope of PKCS #11.
 * Calling C_InitializeToken when this flag is set will cause
 * the token to be reinitialized. */
t.CKF_TOKEN_INITIALIZED = 0x00000400;

/* CKF_SECONDARY_AUTHENTICATION if new for v2.10. If it is
 * true, the token supports secondary authentication for
 * private key objects. This flag is deprecated in v2.11 and
   onwards. */
t.CKF_SECONDARY_AUTHENTICATION = 0x00000800;

/* CKF_USER_PIN_COUNT_LOW if new for v2.10. If it is true, an
 * incorrect user login PIN has been entered at least once
 * since the last successful authentication. */
t.CKF_USER_PIN_COUNT_LOW = 0x00010000;

/* CKF_USER_PIN_FINAL_TRY if new for v2.10. If it is true,
 * supplying an incorrect user PIN will it to become locked. */
t.CKF_USER_PIN_FINAL_TRY = 0x00020000;

/* CKF_USER_PIN_LOCKED if new for v2.10. If it is true, the
 * user PIN has been locked. User login to the token is not
 * possible. */
t.CKF_USER_PIN_LOCKED = 0x00040000;

/* CKF_USER_PIN_TO_BE_CHANGED if new for v2.10. If it is true,
 * the user PIN value is the default value set by token
 * initialization or manufacturing, or the PIN has been
 * expired by the card. */
t.CKF_USER_PIN_TO_BE_CHANGED = 0x00080000;

/* CKF_SO_PIN_COUNT_LOW if new for v2.10. If it is true, an
 * incorrect SO login PIN has been entered at least once since
 * the last successful authentication. */
t.CKF_SO_PIN_COUNT_LOW = 0x00100000;

/* CKF_SO_PIN_FINAL_TRY if new for v2.10. If it is true,
 * supplying an incorrect SO PIN will it to become locked. */
t.CKF_SO_PIN_FINAL_TRY = 0x00200000;

/* CKF_SO_PIN_LOCKED if new for v2.10. If it is true, the SO
 * PIN has been locked. SO login to the token is not possible.
 */
t.CKF_SO_PIN_LOCKED = 0x00400000;

/* CKF_SO_PIN_TO_BE_CHANGED if new for v2.10. If it is true,
 * the SO PIN value is the default value set by token
 * initialization or manufacturing, or the PIN has been
 * expired by the card. */
t.CKF_SO_PIN_TO_BE_CHANGED = 0x00800000;

t.CK_TOKEN_INFO_PTR = ref.refType(t.CK_TOKEN_INFO);

/* CK_SESSION_HANDLE is a Cryptoki-assigned value that
 * identifies a session */
t.CK_SESSION_HANDLE = t.CK_ULONG;

t.CK_SESSION_HANDLE_PTR = ref.refType(t.CK_SESSION_HANDLE);

/* CK_MECHANISM_INFO provides information about a particular
 * mechanism */
t.CK_MECHANISM_INFO = struct({
  ulMinKeySize: t.CK_ULONG,
  ulMaxKeySize: t.CK_ULONG,
  flags: t.CK_FLAGS,
});
t.CK_MECHANISM_INFO_PTR = ref.refType(t.CK_MECHANISM_INFO);

/* The flags are defined as follows:
 *      Bit Flag               Mask        Meaning */
t.CKF_HW = 0x00000001;  /* performed by HW */

/* The flags CKF_ENCRYPT, CKF_DECRYPT, CKF_DIGEST, CKF_SIGN,
 * CKG_SIGN_RECOVER, CKF_VERIFY, CKF_VERIFY_RECOVER,
 * CKF_GENERATE, CKF_GENERATE_KEY_PAIR, CKF_WRAP, CKF_UNWRAP,
 * and CKF_DERIVE are new for v2.0.  They specify whether or not
 * a mechanism can be used for a particular task */
t.CKF_ENCRYPT = 0x00000100;
t.CKF_DECRYPT = 0x00000200;
t.CKF_DIGEST = 0x00000400;
t.CKF_SIGN = 0x00000800;
t.CKF_SIGN_RECOVER = 0x00001000;
t.CKF_VERIFY = 0x00002000;
t.CKF_VERIFY_RECOVER = 0x00004000;
t.CKF_GENERATE = 0x00008000;
t.CKF_GENERATE_KEY_PAIR = 0x00010000;
t.CKF_WRAP = 0x00020000;
t.CKF_UNWRAP = 0x00040000;
t.CKF_DERIVE = 0x00080000;

/* CKF_EC_F_P, CKF_EC_F_2M, CKF_EC_ECPARAMETERS, CKF_EC_NAMEDCURVE,
 * CKF_EC_UNCOMPRESS, and CKF_EC_COMPRESS are new for v2.11. They
 * describe a token's EC capabilities not available in mechanism
 * information. */
t.CKF_EC_F_P = 0x00100000;
t.CKF_EC_F_2M = 0x00200000;
t.CKF_EC_ECPARAMETERS = 0x00400000;
t.CKF_EC_NAMEDCURVE = 0x00800000;
t.CKF_EC_UNCOMPRESS = 0x01000000;
t.CKF_EC_COMPRESS = 0x02000000;

t.CKF_EXTENSION = 0x80000000; /* FALSE for this version */

/* CK_MECHANISM_TYPE is a value that identifies a mechanism
 * type */
/* CK_MECHANISM_TYPE was changed from CK_USHORT to CK_ULONG for
 * v2.0 */
t.CK_MECHANISM_TYPE = t.CK_ULONG;

/* CK_MECHANISM is a structure that specifies a particular
 * mechanism  */
t.CK_MECHANISM = struct({
  mechanism: t.CK_MECHANISM_TYPE,
  pParameter: t.CK_VOID_PTR,

  /* ulParameterLen was changed from CK_USHORT to CK_ULONG for
   * v2.0 */
  ulParameterLen: t.CK_ULONG  /* in bytes */
});

t.CK_MECHANISM_PTR = ref.refType(t.CK_MECHANISM);

/* the following mechanism types are defined: */
t.CKM_RSA_PKCS_KEY_PAIR_GEN = 0x00000000;
t.CKM_RSA_PKCS = 0x00000001;
t.CKM_RSA_9796 = 0x00000002;
t.CKM_RSA_X_509 = 0x00000003;

/* CKM_MD2_RSA_PKCS, CKM_MD5_RSA_PKCS, and CKM_SHA1_RSA_PKCS
 * are new for v2.0.  They are mechanisms which hash and sign */
t.CKM_MD2_RSA_PKCS = 0x00000004;
t.CKM_MD5_RSA_PKCS = 0x00000005;
t.CKM_SHA1_RSA_PKCS = 0x00000006;

/* CKM_RIPEMD128_RSA_PKCS, CKM_RIPEMD160_RSA_PKCS, and
 * CKM_RSA_PKCS_OAEP are new for v2.10 */
t.CKM_RIPEMD128_RSA_PKCS = 0x00000007;
t.CKM_RIPEMD160_RSA_PKCS = 0x00000008;
t.CKM_RSA_PKCS_OAEP = 0x00000009;

/* CKM_RSA_X9_31_KEY_PAIR_GEN, CKM_RSA_X9_31, CKM_SHA1_RSA_X9_31,
 * CKM_RSA_PKCS_PSS, and CKM_SHA1_RSA_PKCS_PSS are new for v2.11 */
t.CKM_RSA_X9_31_KEY_PAIR_GEN = 0x0000000A;
t.CKM_RSA_X9_31 = 0x0000000B;
t.CKM_SHA1_RSA_X9_31 = 0x0000000C;
t.CKM_RSA_PKCS_PSS = 0x0000000D;
t.CKM_SHA1_RSA_PKCS_PSS = 0x0000000E;

t.CKM_DSA_KEY_PAIR_GEN = 0x00000010;
t.CKM_DSA = 0x00000011;
t.CKM_DSA_SHA1 = 0x00000012;
t.CKM_DH_PKCS_KEY_PAIR_GEN = 0x00000020;
t.CKM_DH_PKCS_DERIVE = 0x00000021;

/* CKM_X9_42_DH_KEY_PAIR_GEN, CKM_X9_42_DH_DERIVE,
 * CKM_X9_42_DH_HYBRID_DERIVE, and CKM_X9_42_MQV_DERIVE are new for
 * v2.11 */
t.CKM_X9_42_DH_KEY_PAIR_GEN = 0x00000030;
t.CKM_X9_42_DH_DERIVE = 0x00000031;
t.CKM_X9_42_DH_HYBRID_DERIVE = 0x00000032;
t.CKM_X9_42_MQV_DERIVE = 0x00000033;

/* CKM_SHA256/384/512 are new for v2.20 */
t.CKM_SHA256_RSA_PKCS = 0x00000040;
t.CKM_SHA384_RSA_PKCS = 0x00000041;
t.CKM_SHA512_RSA_PKCS = 0x00000042;
t.CKM_SHA256_RSA_PKCS_PSS = 0x00000043;
t.CKM_SHA384_RSA_PKCS_PSS = 0x00000044;
t.CKM_SHA512_RSA_PKCS_PSS = 0x00000045;

/* SHA-224 RSA mechanisms are new for PKCS #11 v2.20 amendment 3 */
t.CKM_SHA224_RSA_PKCS = 0x00000046;
t.CKM_SHA224_RSA_PKCS_PSS = 0x00000047;

t.CKM_RC2_KEY_GEN = 0x00000100;
t.CKM_RC2_ECB = 0x00000101;
t.CKM_RC2_CBC = 0x00000102;
t.CKM_RC2_MAC = 0x00000103;

/* CKM_RC2_MAC_GENERAL and CKM_RC2_CBC_PAD are new for v2.0 */
t.CKM_RC2_MAC_GENERAL = 0x00000104;
t.CKM_RC2_CBC_PAD = 0x00000105;

t.CKM_RC4_KEY_GEN = 0x00000110;
t.CKM_RC4 = 0x00000111;
t.CKM_DES_KEY_GEN = 0x00000120;
t.CKM_DES_ECB = 0x00000121;
t.CKM_DES_CBC = 0x00000122;
t.CKM_DES_MAC = 0x00000123;

/* CKM_DES_MAC_GENERAL and CKM_DES_CBC_PAD are new for v2.0 */
t.CKM_DES_MAC_GENERAL = 0x00000124;
t.CKM_DES_CBC_PAD = 0x00000125;

t.CKM_DES2_KEY_GEN = 0x00000130;
t.CKM_DES3_KEY_GEN = 0x00000131;
t.CKM_DES3_ECB = 0x00000132;
t.CKM_DES3_CBC = 0x00000133;
t.CKM_DES3_MAC = 0x00000134;


/* CKM_DES3_MAC_GENERAL, CKM_DES3_CBC_PAD, CKM_CDMF_KEY_GEN,
 * CKM_CDMF_ECB, CKM_CDMF_CBC, CKM_CDMF_MAC,
 * CKM_CDMF_MAC_GENERAL, and CKM_CDMF_CBC_PAD are new for v2.0 */
t.CKM_DES3_MAC_GENERAL = 0x00000135;
t.CKM_DES3_CBC_PAD = 0x00000136;
t.CKM_CDMF_KEY_GEN = 0x00000140;
t.CKM_CDMF_ECB = 0x00000141;
t.CKM_CDMF_CBC = 0x00000142;
t.CKM_CDMF_MAC = 0x00000143;
t.CKM_CDMF_MAC_GENERAL = 0x00000144;
t.CKM_CDMF_CBC_PAD = 0x00000145;

/* v2.3 */
t.CKM_DES3_CMAC_GENERAL = 0x00000137;
t.CKM_DES3_CMAC = 0x00000138;

/* the following four DES mechanisms are new for v2.20 */
t.CKM_DES_OFB64 = 0x00000150;
t.CKM_DES_OFB8 = 0x00000151;
t.CKM_DES_CFB64 = 0x00000152;
t.CKM_DES_CFB8 = 0x00000153;

t.CKM_MD2 = 0x00000200;

/* CKM_MD2_HMAC and CKM_MD2_HMAC_GENERAL are new for v2.0 */
t.CKM_MD2_HMAC = 0x00000201;
t.CKM_MD2_HMAC_GENERAL = 0x00000202;

t.CKM_MD5 = 0x00000210;

/* CKM_MD5_HMAC and CKM_MD5_HMAC_GENERAL are new for v2.0 */
t.CKM_MD5_HMAC = 0x00000211;
t.CKM_MD5_HMAC_GENERAL = 0x00000212;

t.CKM_SHA_1 = 0x00000220;

/* CKM_SHA_1_HMAC and CKM_SHA_1_HMAC_GENERAL are new for v2.0 */
t.CKM_SHA_1_HMAC = 0x00000221;
t.CKM_SHA_1_HMAC_GENERAL = 0x00000222;

/* CKM_RIPEMD128, CKM_RIPEMD128_HMAC,
 * CKM_RIPEMD128_HMAC_GENERAL, CKM_RIPEMD160, CKM_RIPEMD160_HMAC,
 * and CKM_RIPEMD160_HMAC_GENERAL are new for v2.10 */
t.CKM_RIPEMD128 = 0x00000230;
t.CKM_RIPEMD128_HMAC = 0x00000231;
t.CKM_RIPEMD128_HMAC_GENERAL = 0x00000232;
t.CKM_RIPEMD160 = 0x00000240;
t.CKM_RIPEMD160_HMAC = 0x00000241;
t.CKM_RIPEMD160_HMAC_GENERAL = 0x00000242;

/* CKM_SHA256/384/512 are new for v2.20 */
t.CKM_SHA256 = 0x00000250;
t.CKM_SHA256_HMAC = 0x00000251;
t.CKM_SHA256_HMAC_GENERAL = 0x00000252;

/* SHA-224 is new for PKCS #11 v2.20 amendment 3 */
t.CKM_SHA224 = 0x00000255;
t.CKM_SHA224_HMAC = 0x00000256;
t.CKM_SHA224_HMAC_GENERAL = 0x00000257;

t.CKM_SHA384 = 0x00000260;
t.CKM_SHA384_HMAC = 0x00000261;
t.CKM_SHA384_HMAC_GENERAL = 0x00000262;
t.CKM_SHA512 = 0x00000270;
t.CKM_SHA512_HMAC = 0x00000271;
t.CKM_SHA512_HMAC_GENERAL = 0x00000272;

/* SecurID is new for PKCS #11 v2.20 amendment 1 */
t.CKM_SECURID_KEY_GEN = 0x00000280;
t.CKM_SECURID = 0x00000282;

/* HOTP is new for PKCS #11 v2.20 amendment 1 */
t.CKM_HOTP_KEY_GEN = 0x00000290;
t.CKM_HOTP = 0x00000291;

/* ACTI is new for PKCS #11 v2.20 amendment 1 */
t.CKM_ACTI = 0x000002A0;
t.CKM_ACTI_KEY_GEN = 0x000002A1;

/* All of the following mechanisms are new for v2.0 */
/* Note that CAST128 and CAST5 are the same algorithm */
t.CKM_CAST_KEY_GEN = 0x00000300;
t.CKM_CAST_ECB = 0x00000301;
t.CKM_CAST_CBC = 0x00000302;
t.CKM_CAST_MAC = 0x00000303;
t.CKM_CAST_MAC_GENERAL = 0x00000304;
t.CKM_CAST_CBC_PAD = 0x00000305;
t.CKM_CAST3_KEY_GEN = 0x00000310;
t.CKM_CAST3_ECB = 0x00000311;
t.CKM_CAST3_CBC = 0x00000312;
t.CKM_CAST3_MAC = 0x00000313;
t.CKM_CAST3_MAC_GENERAL = 0x00000314;
t.CKM_CAST3_CBC_PAD = 0x00000315;
t.CKM_CAST5_KEY_GEN = 0x00000320;
t.CKM_CAST128_KEY_GEN = 0x00000320;
t.CKM_CAST5_ECB = 0x00000321;
t.CKM_CAST128_ECB = 0x00000321;
t.CKM_CAST5_CBC = 0x00000322;
t.CKM_CAST128_CBC = 0x00000322;
t.CKM_CAST5_MAC = 0x00000323;
t.CKM_CAST128_MAC = 0x00000323;
t.CKM_CAST5_MAC_GENERAL = 0x00000324;
t.CKM_CAST128_MAC_GENERAL = 0x00000324;
t.CKM_CAST5_CBC_PAD = 0x00000325;
t.CKM_CAST128_CBC_PAD = 0x00000325;
t.CKM_RC5_KEY_GEN = 0x00000330;
t.CKM_RC5_ECB = 0x00000331;
t.CKM_RC5_CBC = 0x00000332;
t.CKM_RC5_MAC = 0x00000333;
t.CKM_RC5_MAC_GENERAL = 0x00000334;
t.CKM_RC5_CBC_PAD = 0x00000335;
t.CKM_IDEA_KEY_GEN = 0x00000340;
t.CKM_IDEA_ECB = 0x00000341;
t.CKM_IDEA_CBC = 0x00000342;
t.CKM_IDEA_MAC = 0x00000343;
t.CKM_IDEA_MAC_GENERAL = 0x00000344;
t.CKM_IDEA_CBC_PAD = 0x00000345;
t.CKM_GENERIC_SECRET_KEY_GEN = 0x00000350;
t.CKM_CONCATENATE_BASE_AND_KEY = 0x00000360;
t.CKM_CONCATENATE_BASE_AND_DATA = 0x00000362;
t.CKM_CONCATENATE_DATA_AND_BASE = 0x00000363;
t.CKM_XOR_BASE_AND_DATA = 0x00000364;
t.CKM_EXTRACT_KEY_FROM_KEY = 0x00000365;
t.CKM_SSL3_PRE_MASTER_KEY_GEN = 0x00000370;
t.CKM_SSL3_MASTER_KEY_DERIVE = 0x00000371;
t.CKM_SSL3_KEY_AND_MAC_DERIVE = 0x00000372;

/* CKM_SSL3_MASTER_KEY_DERIVE_DH, CKM_TLS_PRE_MASTER_KEY_GEN,
 * CKM_TLS_MASTER_KEY_DERIVE, CKM_TLS_KEY_AND_MAC_DERIVE, and
 * CKM_TLS_MASTER_KEY_DERIVE_DH are new for v2.11 */
t.CKM_SSL3_MASTER_KEY_DERIVE_DH = 0x00000373;
t.CKM_TLS_PRE_MASTER_KEY_GEN = 0x00000374;
t.CKM_TLS_MASTER_KEY_DERIVE = 0x00000375;
t.CKM_TLS_KEY_AND_MAC_DERIVE = 0x00000376;
t.CKM_TLS_MASTER_KEY_DERIVE_DH = 0x00000377;

/* CKM_TLS_PRF is new for v2.20 */
t.CKM_TLS_PRF = 0x00000378;

t.CKM_SSL3_MD5_MAC = 0x00000380;
t.CKM_SSL3_SHA1_MAC = 0x00000381;
t.CKM_MD5_KEY_DERIVATION = 0x00000390;
t.CKM_MD2_KEY_DERIVATION = 0x00000391;
t.CKM_SHA1_KEY_DERIVATION = 0x00000392;

/* CKM_SHA256/384/512 are new for v2.20 */
t.CKM_SHA256_KEY_DERIVATION = 0x00000393;
t.CKM_SHA384_KEY_DERIVATION = 0x00000394;
t.CKM_SHA512_KEY_DERIVATION = 0x00000395;

/* SHA-224 key derivation is new for PKCS #11 v2.20 amendment 3 */
t.CKM_SHA224_KEY_DERIVATION = 0x00000396;

t.CKM_PBE_MD2_DES_CBC = 0x000003A0;
t.CKM_PBE_MD5_DES_CBC = 0x000003A1;
t.CKM_PBE_MD5_CAST_CBC = 0x000003A2;
t.CKM_PBE_MD5_CAST3_CBC = 0x000003A3;
t.CKM_PBE_MD5_CAST5_CBC = 0x000003A4;
t.CKM_PBE_MD5_CAST128_CBC = 0x000003A4;
t.CKM_PBE_SHA1_CAST5_CBC = 0x000003A5;
t.CKM_PBE_SHA1_CAST128_CBC = 0x000003A5;
t.CKM_PBE_SHA1_RC4_128 = 0x000003A6;
t.CKM_PBE_SHA1_RC4_40 = 0x000003A7;
t.CKM_PBE_SHA1_DES3_EDE_CBC = 0x000003A8;
t.CKM_PBE_SHA1_DES2_EDE_CBC = 0x000003A9;
t.CKM_PBE_SHA1_RC2_128_CBC = 0x000003AA;
t.CKM_PBE_SHA1_RC2_40_CBC = 0x000003AB;

/* CKM_PKCS5_PBKD2 is new for v2.10 */
t.CKM_PKCS5_PBKD2 = 0x000003B0;

t.CKM_PBA_SHA1_WITH_SHA1_HMAC = 0x000003C0;

/* WTLS mechanisms are new for v2.20 */
t.CKM_WTLS_PRE_MASTER_KEY_GEN = 0x000003D0;
t.CKM_WTLS_MASTER_KEY_DERIVE = 0x000003D1;
t.CKM_WTLS_MASTER_KEY_DERIVE_DH_ECC = 0x000003D2;
t.CKM_WTLS_PRF = 0x000003D3;
t.CKM_WTLS_SERVER_KEY_AND_MAC_DERIVE = 0x000003D4;
t.CKM_WTLS_CLIENT_KEY_AND_MAC_DERIVE = 0x000003D5;

t.CKM_KEY_WRAP_LYNKS = 0x00000400;
t.CKM_KEY_WRAP_SET_OAEP = 0x00000401;

/* CKM_CMS_SIG is new for v2.20 */
t.CKM_CMS_SIG = 0x00000500;

/* CKM_KIP mechanisms are new for PKCS #11 v2.20 amendment 2 */
t.CKM_KIP_DERIVE = 0x00000510;
t.CKM_KIP_WRAP = 0x00000511;
t.CKM_KIP_MAC = 0x00000512;

/* Camellia is new for PKCS #11 v2.20 amendment 3 */
t.CKM_CAMELLIA_KEY_GEN = 0x00000550;
t.CKM_CAMELLIA_ECB = 0x00000551;
t.CKM_CAMELLIA_CBC = 0x00000552;
t.CKM_CAMELLIA_MAC = 0x00000553;
t.CKM_CAMELLIA_MAC_GENERAL = 0x00000554;
t.CKM_CAMELLIA_CBC_PAD = 0x00000555;
t.CKM_CAMELLIA_ECB_ENCRYPT_DATA = 0x00000556;
t.CKM_CAMELLIA_CBC_ENCRYPT_DATA = 0x00000557;
t.CKM_CAMELLIA_CTR = 0x00000558;

/* ARIA is new for PKCS #11 v2.20 amendment 3 */
t.CKM_ARIA_KEY_GEN = 0x00000560;
t.CKM_ARIA_ECB = 0x00000561;
t.CKM_ARIA_CBC = 0x00000562;
t.CKM_ARIA_MAC = 0x00000563;
t.CKM_ARIA_MAC_GENERAL = 0x00000564;
t.CKM_ARIA_CBC_PAD = 0x00000565;
t.CKM_ARIA_ECB_ENCRYPT_DATA = 0x00000566;
t.CKM_ARIA_CBC_ENCRYPT_DATA = 0x00000567;

/* Fortezza mechanisms */
t.CKM_SKIPJACK_KEY_GEN = 0x00001000;
t.CKM_SKIPJACK_ECB64 = 0x00001001;
t.CKM_SKIPJACK_CBC64 = 0x00001002;
t.CKM_SKIPJACK_OFB64 = 0x00001003;
t.CKM_SKIPJACK_CFB64 = 0x00001004;
t.CKM_SKIPJACK_CFB32 = 0x00001005;
t.CKM_SKIPJACK_CFB16 = 0x00001006;
t.CKM_SKIPJACK_CFB8 = 0x00001007;
t.CKM_SKIPJACK_WRAP = 0x00001008;
t.CKM_SKIPJACK_PRIVATE_WRAP = 0x00001009;
t.CKM_SKIPJACK_RELAYX = 0x0000100a;
t.CKM_KEA_KEY_PAIR_GEN = 0x00001010;
t.CKM_KEA_KEY_DERIVE = 0x00001011;
t.CKM_FORTEZZA_TIMESTAMP = 0x00001020;
t.CKM_BATON_KEY_GEN = 0x00001030;
t.CKM_BATON_ECB128 = 0x00001031;
t.CKM_BATON_ECB96 = 0x00001032;
t.CKM_BATON_CBC128 = 0x00001033;
t.CKM_BATON_COUNTER = 0x00001034;
t.CKM_BATON_SHUFFLE = 0x00001035;
t.CKM_BATON_WRAP = 0x00001036;

/* CKM_ECDSA_KEY_PAIR_GEN is deprecated in v2.11,
 * CKM_EC_KEY_PAIR_GEN is preferred */
t.CKM_ECDSA_KEY_PAIR_GEN = 0x00001040;
t.CKM_EC_KEY_PAIR_GEN = 0x00001040;

t.CKM_ECDSA = 0x00001041;
t.CKM_ECDSA_SHA1 = 0x00001042;

/* v2.30 */
//t.CKM_ECDSA_SHA224 = 0x00001043;
t.CKM_ECDSA_SHA224 = 0x80000122;
// t.CKM_ECDSA_SHA256 = 0x00001044;
t.CKM_ECDSA_SHA256 = 0x80000123;
// t.CKM_ECDSA_SHA384 = 0x00001045;
t.CKM_ECDSA_SHA384 = 0x80000124;
// t.CKM_ECDSA_SHA512 = 0x00001046;
t.CKM_ECDSA_SHA512 = 0x80000125;

/* CKM_ECDH1_DERIVE, CKM_ECDH1_COFACTOR_DERIVE, and CKM_ECMQV_DERIVE
 * are new for v2.11 */
t.CKM_ECDH1_DERIVE = 0x00001050;
t.CKM_ECDH1_COFACTOR_DERIVE = 0x00001051;
t.CKM_ECMQV_DERIVE = 0x00001052;

t.CKM_JUNIPER_KEY_GEN = 0x00001060;
t.CKM_JUNIPER_ECB128 = 0x00001061;
t.CKM_JUNIPER_CBC128 = 0x00001062;
t.CKM_JUNIPER_COUNTER = 0x00001063;
t.CKM_JUNIPER_SHUFFLE = 0x00001064;
t.CKM_JUNIPER_WRAP = 0x00001065;
t.CKM_FASTHASH = 0x00001070;

/* CKM_AES_KEY_GEN, CKM_AES_ECB, CKM_AES_CBC, CKM_AES_MAC,
 * CKM_AES_MAC_GENERAL, CKM_AES_CBC_PAD, CKM_DSA_PARAMETER_GEN,
 * CKM_DH_PKCS_PARAMETER_GEN, and CKM_X9_42_DH_PARAMETER_GEN are
 * new for v2.11 */
t.CKM_AES_KEY_GEN = 0x00001080;
t.CKM_AES_ECB = 0x00001081;
t.CKM_AES_CBC = 0x00001082;
t.CKM_AES_MAC = 0x00001083;
t.CKM_AES_MAC_GENERAL = 0x00001084;
t.CKM_AES_CBC_PAD = 0x00001085;

/* AES counter mode is new for PKCS #11 v2.20 amendment 3 */
t.CKM_AES_CTR = 0x00001086;

/* v.2.40 */
t.CKM_AES_CMAC = 0x0000108A;
t.CKM_AES_CMAC_GENERAL = 0x00001089;

/* BlowFish and TwoFish are new for v2.20 */
t.CKM_BLOWFISH_KEY_GEN = 0x00001090;
t.CKM_BLOWFISH_CBC = 0x00001091;
t.CKM_TWOFISH_KEY_GEN = 0x00001092;
t.CKM_TWOFISH_CBC = 0x00001093;


/* CKM_xxx_ENCRYPT_DATA mechanisms are new for v2.20 */
t.CKM_DES_ECB_ENCRYPT_DATA = 0x00001100;
t.CKM_DES_CBC_ENCRYPT_DATA = 0x00001101;
t.CKM_DES3_ECB_ENCRYPT_DATA = 0x00001102;
t.CKM_DES3_CBC_ENCRYPT_DATA = 0x00001103;
t.CKM_AES_ECB_ENCRYPT_DATA = 0x00001104;
t.CKM_AES_CBC_ENCRYPT_DATA = 0x00001105;

/* CKM_GOST mechanisms */
t.CKM_GOSTR3410_KEY_PAIR_GEN = 0x00001200;
t.CKM_GOSTR3410 = 0x00001201;
t.CKM_GOSTR3410_WITH_GOSTR3411 = 0x00001202;
t.CKM_GOSTR3410_KEY_WRAP = 0x00001203;
t.CKM_GOSTR3410_DERIVE = 0x00001204;
t.CKM_GOSTR3411 = 0x00001210;
t.CKM_GOSTR3411_HMAC = 0x00001211;
t.CKM_GOST28147_KEY_GEN = 0x00001220;
t.CKM_GOST28147_ECB = 0x00001221;
t.CKM_GOST28147 = 0x00001222;
t.CKM_GOST28147_MAC = 0x00001223;
t.CKM_GOST28147_KEY_WRAP = 0x00001224;

t.CKM_DSA_PARAMETER_GEN = 0x00002000;
t.CKM_DH_PKCS_PARAMETER_GEN = 0x00002001;
t.CKM_X9_42_DH_PARAMETER_GEN = 0x00002002;

t.CKM_VENDOR_DEFINED = 0x80000000;

t.CK_MECHANISM_TYPE_PTR = ref.refType(t.CK_MECHANISM_TYPE);

/* The flags are defined in the following table:
 *      Bit Flag                Mask        Meaning
 */
t.CKF_RW_SESSION = 0x00000002  /* session is r/w */
t.CKF_SERIAL_SESSION = 0x00000004  /* no parallel */

/* CK_STATE enumerates the session states */
/* CK_STATE has been changed from an enum to a CK_ULONG for
 * v2.0 */
t.CK_STATE = t.CK_ULONG;
t.CKS_RO_PUBLIC_SESSION = 0;
t.CKS_RO_USER_FUNCTIONS = 1;
t.CKS_RW_PUBLIC_SESSION = 2;
t.CKS_RW_USER_FUNCTIONS = 3;
t.CKS_RW_SO_FUNCTIONS = 4;

/* CK_SESSION_INFO provides information about a session */
t.CK_SESSION_INFO = struct({
  slotID: t.CK_SLOT_ID,
  state: t.CK_STATE,
  flags: t.CK_FLAGS,          /* see below */

  /* ulDeviceError was changed from CK_USHORT to CK_ULONG for
   * v2.0 */
  ulDeviceError: t.CK_ULONG  /* device-dependent error code */
});
t.CK_SESSION_INFO_PTR = ref.refType(t.CK_SESSION_INFO);

/* CK_RV is a value that identifies the return value of a
 * Cryptoki function */
/* CK_RV was changed from CK_USHORT to CK_ULONG for v2.0 */
t.CK_RV = t.CK_ULONG;

t.CKR_OK = 0x00000000;
t.CKR_CANCEL = 0x00000001;
t.CKR_HOST_MEMORY = 0x00000002;
t.CKR_SLOT_ID_INVALID = 0x00000003;

/* CKR_FLAGS_INVALID was removed for v2.0 */

/* CKR_GENERAL_ERROR and CKR_FUNCTION_FAILED are new for v2.0 */
t.CKR_GENERAL_ERROR = 0x00000005;
t.CKR_FUNCTION_FAILED = 0x00000006;

/* CKR_ARGUMENTS_BAD, CKR_NO_EVENT, CKR_NEED_TO_CREATE_THREADS,
 * and CKR_CANT_LOCK are new for v2.01 */
t.CKR_ARGUMENTS_BAD = 0x00000007;
t.CKR_NO_EVENT = 0x00000008;
t.CKR_NEED_TO_CREATE_THREADS = 0x00000009;
t.CKR_CANT_LOCK = 0x0000000A;

t.CKR_ATTRIBUTE_READ_ONLY = 0x00000010;
t.CKR_ATTRIBUTE_SENSITIVE = 0x00000011;
t.CKR_ATTRIBUTE_TYPE_INVALID = 0x00000012;
t.CKR_ATTRIBUTE_VALUE_INVALID = 0x00000013;
t.CKR_DATA_INVALID = 0x00000020;
t.CKR_DATA_LEN_RANGE = 0x00000021;
t.CKR_DEVICE_ERROR = 0x00000030;
t.CKR_DEVICE_MEMORY = 0x00000031;
t.CKR_DEVICE_REMOVED = 0x00000032;
t.CKR_ENCRYPTED_DATA_INVALID = 0x00000040;
t.CKR_ENCRYPTED_DATA_LEN_RANGE = 0x00000041;
t.CKR_FUNCTION_CANCELED = 0x00000050;
t.CKR_FUNCTION_NOT_PARALLEL = 0x00000051;

/* CKR_FUNCTION_NOT_SUPPORTED is new for v2.0 */
t.CKR_FUNCTION_NOT_SUPPORTED = 0x00000054;

t.CKR_KEY_HANDLE_INVALID = 0x00000060;

/* CKR_KEY_SENSITIVE was removed for v2.0 */

t.CKR_KEY_SIZE_RANGE = 0x00000062;
t.CKR_KEY_TYPE_INCONSISTENT = 0x00000063;

/* CKR_KEY_NOT_NEEDED, CKR_KEY_CHANGED, CKR_KEY_NEEDED,
 * CKR_KEY_INDIGESTIBLE, CKR_KEY_FUNCTION_NOT_PERMITTED,
 * CKR_KEY_NOT_WRAPPABLE, and CKR_KEY_UNEXTRACTABLE are new for
 * v2.0 */
t.CKR_KEY_NOT_NEEDED = 0x00000064;
t.CKR_KEY_CHANGED = 0x00000065;
t.CKR_KEY_NEEDED = 0x00000066;
t.CKR_KEY_INDIGESTIBLE = 0x00000067;
t.CKR_KEY_FUNCTION_NOT_PERMITTED = 0x00000068;
t.CKR_KEY_NOT_WRAPPABLE = 0x00000069;
t.CKR_KEY_UNEXTRACTABLE = 0x0000006A;

t.CKR_MECHANISM_INVALID = 0x00000070;
t.CKR_MECHANISM_PARAM_INVALID = 0x00000071;

/* CKR_OBJECT_CLASS_INCONSISTENT and CKR_OBJECT_CLASS_INVALID
 * were removed for v2.0 */
t.CKR_OBJECT_HANDLE_INVALID = 0x00000082;
t.CKR_OPERATION_ACTIVE = 0x00000090;
t.CKR_OPERATION_NOT_INITIALIZED = 0x00000091;
t.CKR_PIN_INCORRECT = 0x000000A0;
t.CKR_PIN_INVALID = 0x000000A1;
t.CKR_PIN_LEN_RANGE = 0x000000A2;

/* CKR_PIN_EXPIRED and CKR_PIN_LOCKED are new for v2.0 */
t.CKR_PIN_EXPIRED = 0x000000A3;
t.CKR_PIN_LOCKED = 0x000000A4;

t.CKR_SESSION_CLOSED = 0x000000B0;
t.CKR_SESSION_COUNT = 0x000000B1;
t.CKR_SESSION_HANDLE_INVALID = 0x000000B3;
t.CKR_SESSION_PARALLEL_NOT_SUPPORTED = 0x000000B4;
t.CKR_SESSION_READ_ONLY = 0x000000B5;
t.CKR_SESSION_EXISTS = 0x000000B6;

/* CKR_SESSION_READ_ONLY_EXISTS and
 * CKR_SESSION_READ_WRITE_SO_EXISTS are new for v2.0 */
t.CKR_SESSION_READ_ONLY_EXISTS = 0x000000B7;
t.CKR_SESSION_READ_WRITE_SO_EXISTS = 0x000000B8;

t.CKR_SIGNATURE_INVALID = 0x000000C0;
t.CKR_SIGNATURE_LEN_RANGE = 0x000000C1;
t.CKR_TEMPLATE_INCOMPLETE = 0x000000D0;
t.CKR_TEMPLATE_INCONSISTENT = 0x000000D1;
t.CKR_TOKEN_NOT_PRESENT = 0x000000E0;
t.CKR_TOKEN_NOT_RECOGNIZED = 0x000000E1;
t.CKR_TOKEN_WRITE_PROTECTED = 0x000000E2;
t.CKR_UNWRAPPING_KEY_HANDLE_INVALID = 0x000000F0;
t.CKR_UNWRAPPING_KEY_SIZE_RANGE = 0x000000F1;
t.CKR_UNWRAPPING_KEY_TYPE_INCONSISTENT = 0x000000F2;
t.CKR_USER_ALREADY_LOGGED_IN = 0x00000100;
t.CKR_USER_NOT_LOGGED_IN = 0x00000101;
t.CKR_USER_PIN_NOT_INITIALIZED = 0x00000102;
t.CKR_USER_TYPE_INVALID = 0x00000103;

/* CKR_USER_ANOTHER_ALREADY_LOGGED_IN and CKR_USER_TOO_MANY_TYPES
 * are new to v2.01 */
t.CKR_USER_ANOTHER_ALREADY_LOGGED_IN = 0x00000104;
t.CKR_USER_TOO_MANY_TYPES = 0x00000105;

t.CKR_WRAPPED_KEY_INVALID = 0x00000110;
t.CKR_WRAPPED_KEY_LEN_RANGE = 0x00000112;
t.CKR_WRAPPING_KEY_HANDLE_INVALID = 0x00000113;
t.CKR_WRAPPING_KEY_SIZE_RANGE = 0x00000114;
t.CKR_WRAPPING_KEY_TYPE_INCONSISTENT = 0x00000115;
t.CKR_RANDOM_SEED_NOT_SUPPORTED = 0x00000120;

/* These are new to v2.0 */
t.CKR_RANDOM_NO_RNG = 0x00000121;

/* These are new to v2.11 */
t.CKR_DOMAIN_PARAMS_INVALID = 0x00000130;

/* These are new to v2.0 */
t.CKR_BUFFER_TOO_SMALL = 0x00000150;
t.CKR_SAVED_STATE_INVALID = 0x00000160;
t.CKR_INFORMATION_SENSITIVE = 0x00000170;
t.CKR_STATE_UNSAVEABLE = 0x00000180;

/* These are new to v2.01 */
t.CKR_CRYPTOKI_NOT_INITIALIZED = 0x00000190;
t.CKR_CRYPTOKI_ALREADY_INITIALIZED = 0x00000191;
t.CKR_MUTEX_BAD = 0x000001A0;
t.CKR_MUTEX_NOT_LOCKED = 0x000001A1;

/* The following return values are new for PKCS #11 v2.20 amendment 3 */
t.CKR_NEW_PIN_MODE = 0x000001B0;
t.CKR_NEXT_OTP = 0x000001B1;

/* This is new to v2.20 */
t.CKR_FUNCTION_REJECTED = 0x00000200;

t.CKR_VENDOR_DEFINED = 0x80000000;

/* CK_USER_TYPE enumerates the types of Cryptoki users */
/* CK_USER_TYPE has been changed from an enum to a CK_ULONG for
 * v2.0 */
t.CK_USER_TYPE = t.CK_ULONG;
/* Security Officer */
t.CKU_SO = 0
/* Normal user */
t.CKU_USER = 1
/* Context specific (added in v2.20) */
t.CKU_CONTEXT_SPECIFIC = 2

/* CK_OBJECT_HANDLE is a token-specific identifier for an
 * object  */
t.CK_OBJECT_HANDLE = t.CK_ULONG;

t.CK_OBJECT_HANDLE_PTR = ref.refType(t.CK_OBJECT_HANDLE);

/* CK_OBJECT_CLASS is a value that identifies the classes (or
 * types) of objects that Cryptoki recognizes.  It is defined
 * as follows: */
/* CK_OBJECT_CLASS was changed from CK_USHORT to CK_ULONG for
 * v2.0 */
t.CK_OBJECT_CLASS = t.CK_ULONG;

/* The following classes of objects are defined: */
/* CKO_HW_FEATURE is new for v2.10 */
/* CKO_DOMAIN_PARAMETERS is new for v2.11 */
/* CKO_MECHANISM is new for v2.20 */
t.CKO_DATA = 0x00000000;
t.CKO_CERTIFICATE = 0x00000001;
t.CKO_PUBLIC_KEY = 0x00000002;
t.CKO_PRIVATE_KEY = 0x00000003;
t.CKO_SECRET_KEY = 0x00000004;
t.CKO_HW_FEATURE = 0x00000005;
t.CKO_DOMAIN_PARAMETERS = 0x00000006;
t.CKO_MECHANISM = 0x00000007;

/* CKO_OTP_KEY is new for PKCS #11 v2.20 amendment 1 */
t.CKO_OTP_KEY = 0x00000008;

t.CKO_VENDOR_DEFINED = 0x80000000;

t.CK_OBJECT_CLASS_PTR = ref.refType(t.CK_OBJECT_CLASS);

/* CK_ATTRIBUTE_TYPE is a value that identifies an attribute
 * type */
/* CK_ATTRIBUTE_TYPE was changed from CK_USHORT to CK_ULONG for
 * v2.0 */
t.CK_ATTRIBUTE_TYPE = t.CK_ULONG;

/* CK_ATTRIBUTE is a structure that includes the type, length
 * and value of an attribute */
t.CK_ATTRIBUTE = struct({
  type: t.CK_ATTRIBUTE_TYPE,
  pValue: t.CK_VOID_PTR,

  /* ulValueLen went from CK_USHORT to CK_ULONG for v2.0 */
  ulValueLen: t.CK_ULONG  /* in bytes */
});

t.CK_ATTRIBUTE_PTR = ref.refType(t.CK_ATTRIBUTE);

/* CK_KEY_TYPE is a value that identifies a key type */
/* CK_KEY_TYPE was changed from CK_USHORT to CK_ULONG for v2.0 */
t.CK_KEY_TYPE = t.CK_ULONG;

/* the following key types are defined: */
t.CKK_RSA = 0x00000000;
t.CKK_DSA = 0x00000001;
t.CKK_DH = 0x00000002;

/* CKK_ECDSA and CKK_KEA are new for v2.0 */
/* CKK_ECDSA is deprecated in v2.11, CKK_EC is preferred. */
t.CKK_ECDSA = 0x00000003;
t.CKK_EC = 0x00000003;
t.CKK_X9_42_DH = 0x00000004;
t.CKK_KEA = 0x00000005;

t.CKK_GENERIC_SECRET = 0x00000010;
t.CKK_RC2 = 0x00000011;
t.CKK_RC4 = 0x00000012;
t.CKK_DES = 0x00000013;
t.CKK_DES2 = 0x00000014;
t.CKK_DES3 = 0x00000015;

/* all these key types are new for v2.0 */
t.CKK_CAST = 0x00000016;
t.CKK_CAST3 = 0x00000017;
/* CKK_CAST5 is deprecated in v2.11, CKK_CAST128 is preferred. */
t.CKK_CAST5 = 0x00000018;
t.CKK_CAST128 = 0x00000018;
t.CKK_RC5 = 0x00000019;
t.CKK_IDEA = 0x0000001A;
t.CKK_SKIPJACK = 0x0000001B;
t.CKK_BATON = 0x0000001C;
t.CKK_JUNIPER = 0x0000001D;
t.CKK_CDMF = 0x0000001E;
t.CKK_AES = 0x0000001F;

/* BlowFish and TwoFish are new for v2.20 */
t.CKK_BLOWFISH = 0x00000020;
t.CKK_TWOFISH = 0x00000021;

/* SecurID, HOTP, and ACTI are new for PKCS #11 v2.20 amendment 1 */
t.CKK_SECURID = 0x00000022;
t.CKK_HOTP = 0x00000023;
t.CKK_ACTI = 0x00000024;

/* GOST KEY TYPES */
t.CKK_GOSTR3410 = 0x00000030;
t.CKK_GOSTR3411 = 0x00000031;
t.CKK_GOST28147 = 0x00000032;

/* Camellia is new for PKCS #11 v2.20 amendment 3 */
t.CKK_CAMELLIA = 0x00000025;
/* ARIA is new for PKCS #11 v2.20 amendment 3 */
t.CKK_ARIA = 0x00000026;


t.CKK_VENDOR_DEFINED = 0x80000000;

/* The following certificate types are defined: */
/* CKC_X_509_ATTR_CERT is new for v2.10 */
/* CKC_WTLS is new for v2.20 */
t.CKC_X_509 = 0x00000000;
t.CKC_X_509_ATTR_CERT = 0x00000001;
t.CKC_WTLS = 0x00000002;
t.CKC_VENDOR_DEFINED = 0x80000000;

/* The following attribute types are defined: */
t.CKA_CLASS = 0x00000000;
t.CKA_TOKEN = 0x00000001;
t.CKA_PRIVATE = 0x00000002;
t.CKA_LABEL = 0x00000003;
t.CKA_APPLICATION = 0x00000010;
t.CKA_VALUE = 0x00000011;

/* CKA_OBJECT_ID is new for v2.10 */
t.CKA_OBJECT_ID = 0x00000012;

t.CKA_CERTIFICATE_TYPE = 0x00000080;
t.CKA_ISSUER = 0x00000081;
t.CKA_SERIAL_NUMBER = 0x00000082;

/* CKA_AC_ISSUER, CKA_OWNER, and CKA_ATTR_TYPES are new
 * for v2.10 */
t.CKA_AC_ISSUER = 0x00000083;
t.CKA_OWNER = 0x00000084;
t.CKA_ATTR_TYPES = 0x00000085;

/* CKA_TRUSTED is new for v2.11 */
t.CKA_TRUSTED = 0x00000086;

/* CKA_CERTIFICATE_CATEGORY ...
 * CKA_CHECK_VALUE are new for v2.20 */
t.CKA_CERTIFICATE_CATEGORY = 0x00000087;
t.CKA_JAVA_MIDP_SECURITY_DOMAIN = 0x00000088;
t.CKA_URL = 0x00000089;
t.CKA_HASH_OF_SUBJECT_PUBLIC_KEY = 0x0000008A;
t.CKA_HASH_OF_ISSUER_PUBLIC_KEY = 0x0000008B;
t.CKA_CHECK_VALUE = 0x00000090;

t.CKA_KEY_TYPE = 0x00000100;
t.CKA_SUBJECT = 0x00000101;
t.CKA_ID = 0x00000102;
t.CKA_SENSITIVE = 0x00000103;
t.CKA_ENCRYPT = 0x00000104;
t.CKA_DECRYPT = 0x00000105;
t.CKA_WRAP = 0x00000106;
t.CKA_UNWRAP = 0x00000107;
t.CKA_SIGN = 0x00000108;
t.CKA_SIGN_RECOVER = 0x00000109;
t.CKA_VERIFY = 0x0000010A;
t.CKA_VERIFY_RECOVER = 0x0000010B;
t.CKA_DERIVE = 0x0000010C;
t.CKA_START_DATE = 0x00000110;
t.CKA_END_DATE = 0x00000111;
t.CKA_MODULUS = 0x00000120;
t.CKA_MODULUS_BITS = 0x00000121;
t.CKA_PUBLIC_EXPONENT = 0x00000122;
t.CKA_PRIVATE_EXPONENT = 0x00000123;
t.CKA_PRIME_1 = 0x00000124;
t.CKA_PRIME_2 = 0x00000125;
t.CKA_EXPONENT_1 = 0x00000126;
t.CKA_EXPONENT_2 = 0x00000127;
t.CKA_COEFFICIENT = 0x00000128;
t.CKA_PRIME = 0x00000130;
t.CKA_SUBPRIME = 0x00000131;
t.CKA_BASE = 0x00000132;

/* CKA_PRIME_BITS and CKA_SUB_PRIME_BITS are new for v2.11 */
t.CKA_PRIME_BITS = 0x00000133;
t.CKA_SUBPRIME_BITS = 0x00000134;
t.CKA_SUB_PRIME_BITS = t.CKA_SUBPRIME_BITS
/* (To retain backwards-compatibility) */

t.CKA_VALUE_BITS = 0x00000160;
t.CKA_VALUE_LEN = 0x00000161;

/* CKA_EXTRACTABLE, CKA_LOCAL, CKA_NEVER_EXTRACTABLE,
 * CKA_ALWAYS_SENSITIVE, CKA_MODIFIABLE, CKA_ECDSA_PARAMS,
 * and CKA_EC_POINT are new for v2.0 */
t.CKA_EXTRACTABLE = 0x00000162;
t.CKA_LOCAL = 0x00000163;
t.CKA_NEVER_EXTRACTABLE = 0x00000164;
t.CKA_ALWAYS_SENSITIVE = 0x00000165;

/* CKA_KEY_GEN_MECHANISM is new for v2.11 */
t.CKA_KEY_GEN_MECHANISM = 0x00000166;

t.CKA_MODIFIABLE = 0x00000170;

/* CKA_ECDSA_PARAMS is deprecated in v2.11,
 * CKA_EC_PARAMS is preferred. */
t.CKA_ECDSA_PARAMS = 0x00000180;
t.CKA_EC_PARAMS = 0x00000180;

t.CKA_EC_POINT = 0x00000181;

/* CKA_SECONDARY_AUTH, CKA_AUTH_PIN_FLAGS,
 * are new for v2.10. Deprecated in v2.11 and onwards. */
t.CKA_SECONDARY_AUTH = 0x00000200;
t.CKA_AUTH_PIN_FLAGS = 0x00000201;

/* CKA_ALWAYS_AUTHENTICATE ...
 * CKA_UNWRAP_TEMPLATE are new for v2.20 */
t.CKA_ALWAYS_AUTHENTICATE = 0x00000202;

t.CKA_WRAP_WITH_TRUSTED = 0x00000210;
t.CKA_WRAP_TEMPLATE = (t.CKF_ARRAY_ATTRIBUTE | 0x00000211);
t.CKA_UNWRAP_TEMPLATE = (t.CKF_ARRAY_ATTRIBUTE | 0x00000212);

/* CKA_OTP... atttributes are new for PKCS #11 v2.20 amendment 3. */
t.CKA_OTP_FORMAT = 0x00000220;
t.CKA_OTP_LENGTH = 0x00000221;
t.CKA_OTP_TIME_INTERVAL = 0x00000222;
t.CKA_OTP_USER_FRIENDLY_MODE = 0x00000223;
t.CKA_OTP_CHALLENGE_REQUIREMENT = 0x00000224;
t.CKA_OTP_TIME_REQUIREMENT = 0x00000225;
t.CKA_OTP_COUNTER_REQUIREMENT = 0x00000226;
t.CKA_OTP_PIN_REQUIREMENT = 0x00000227;
t.CKA_OTP_COUNTER = 0x0000022E;
t.CKA_OTP_TIME = 0x0000022F;
t.CKA_OTP_USER_IDENTIFIER = 0x0000022A;
t.CKA_OTP_SERVICE_IDENTIFIER = 0x0000022B;
t.CKA_OTP_SERVICE_LOGO = 0x0000022C;
t.CKA_OTP_SERVICE_LOGO_TYPE = 0x0000022D;


/* CKA_HW_FEATURE_TYPE, CKA_RESET_ON_INIT, and CKA_HAS_RESET
 * are new for v2.10 */
t.CKA_HW_FEATURE_TYPE = 0x00000300;
t.CKA_RESET_ON_INIT = 0x00000301;
t.CKA_HAS_RESET = 0x00000302;

/* The following attributes are new for v2.20 */
t.CKA_PIXEL_X = 0x00000400;
t.CKA_PIXEL_Y = 0x00000401;
t.CKA_RESOLUTION = 0x00000402;
t.CKA_CHAR_ROWS = 0x00000403;
t.CKA_CHAR_COLUMNS = 0x00000404;
t.CKA_COLOR = 0x00000405;
t.CKA_BITS_PER_PIXEL = 0x00000406;
t.CKA_CHAR_SETS = 0x00000480;
t.CKA_ENCODING_METHODS = 0x00000481;
t.CKA_MIME_TYPES = 0x00000482;
t.CKA_MECHANISM_TYPE = 0x00000500;
t.CKA_REQUIRED_CMS_ATTRIBUTES = 0x00000501;
t.CKA_DEFAULT_CMS_ATTRIBUTES = 0x00000502;
t.CKA_SUPPORTED_CMS_ATTRIBUTES = 0x00000503;
t.CKA_ALLOWED_MECHANISMS = (t.CKF_ARRAY_ATTRIBUTE | 0x00000600);

t.CKA_VENDOR_DEFINED = 0x80000000;

/* CK_RSA_PKCS_OAEP_MGF_TYPE is new for v2.10.
 * CK_RSA_PKCS_OAEP_MGF_TYPE  is used to indicate the Message
 * Generation Function (MGF) applied to a message block when
 * formatting a message block for the PKCS #1 OAEP encryption
 * scheme. */
t.CK_RSA_PKCS_MGF_TYPE = t.CK_ULONG;

t.CK_RSA_PKCS_MGF_TYPE_PTR = ref.refType(t.CK_RSA_PKCS_MGF_TYPE);

/* The following MGFs are defined */
/* CKG_MGF1_SHA256, CKG_MGF1_SHA384, and CKG_MGF1_SHA512
 * are new for v2.20 */
t.CKG_MGF1_SHA1 = 0x00000001;
t.CKG_MGF1_SHA256 = 0x00000002;
t.CKG_MGF1_SHA384 = 0x00000003;
t.CKG_MGF1_SHA512 = 0x00000004;
/* SHA-224 is new for PKCS #11 v2.20 amendment 3 */
t.CKG_MGF1_SHA224 = 0x00000005;

/* CK_RSA_PKCS_OAEP_SOURCE_TYPE is new for v2.10.
 * CK_RSA_PKCS_OAEP_SOURCE_TYPE  is used to indicate the source
 * of the encoding parameter when formatting a message block
 * for the PKCS #1 OAEP encryption scheme. */
t.CK_RSA_PKCS_OAEP_SOURCE_TYPE = t.CK_ULONG;

t.CK_RSA_PKCS_OAEP_SOURCE_TYPE_PTR = ref.refType(t.CK_RSA_PKCS_OAEP_SOURCE_TYPE);

/* The following encoding parameter sources are defined */
t.CKZ_DATA_SPECIFIED = 0x00000001;

/* CK_RSA_PKCS_OAEP_PARAMS is new for v2.10.
 * CK_RSA_PKCS_OAEP_PARAMS provides the parameters to the
 * CKM_RSA_PKCS_OAEP mechanism. */
t.CK_RSA_PKCS_OAEP_PARAMS = struct({
  hashAlg: t.CK_MECHANISM_TYPE,
  mgf: t.CK_RSA_PKCS_MGF_TYPE,
  source: t.CK_RSA_PKCS_OAEP_SOURCE_TYPE,
  pSourceData: t.CK_VOID_PTR,
  ulSourceDataLen: t.CK_ULONG
});

t.CK_RSA_PKCS_OAEP_PARAMS_PTR = ref.refType(t.CK_RSA_PKCS_OAEP_PARAMS);

/* CK_RSA_PKCS_PSS_PARAMS is new for v2.11.
 * CK_RSA_PKCS_PSS_PARAMS provides the parameters to the
 * CKM_RSA_PKCS_PSS mechanism(s). */
t.CK_RSA_PKCS_PSS_PARAMS = struct({
  hashAlg: t.CK_MECHANISM_TYPE,
  mgf: t.CK_RSA_PKCS_MGF_TYPE,
  sLen: t.CK_ULONG
});

t.CK_RSA_PKCS_PSS_PARAMS_PTR = ref.refType(t.CK_RSA_PKCS_PSS_PARAMS);

t.CK_AES_GCM_PARAMS = struct({
  pIv: t.CK_BYTE_PTR,
  ulIvLen: t.CK_ULONG,
  ulIvBits: t.CK_ULONG,
  pAAD: t.CK_BYTE_PTR,
  ulAADLen: t.CK_ULONG,
  ulTagBits: t.CK_ULONG
});

t.CK_AES_GCM_PARAMS_PTR = ref.refType(t.CK_AES_GCM_PARAMS);

t.CK_EC_KDF_TYPE = t.CK_ULONG;
t.CK_EC_KDF_TYPE_PTR = ref.refType(t.CK_EC_KDF_TYPE);

/* The following EC Key Derivation Functions are defined */
t.CKD_NULL = 0x00000001;
t.CKD_SHA1_KDF = 0x00000002;

/* CK_ECDH1_DERIVE_PARAMS is new for v2.11.
 * CK_ECDH1_DERIVE_PARAMS provides the parameters to the
 * CKM_ECDH1_DERIVE and CKM_ECDH1_COFACTOR_DERIVE mechanisms,
 * where each party contributes one key pair.
 */
t.CK_ECDH1_DERIVE_PARAMS = struct({
  kdf: t.CK_EC_KDF_TYPE,
  ulSharedDataLen: t.CK_ULONG,
  pSharedData: t.CK_BYTE_PTR,
  ulPublicDataLen: t.CK_ULONG,
  pPublicData: t.CK_BYTE_PTR
});
t.CK_ECDH1_DERIVE_PARAMS_PTR = ref.refType(t.CK_ECDH1_DERIVE_PARAMS);

/* CK_ECDH2_DERIVE_PARAMS is new for v2.11.
 * CK_ECDH2_DERIVE_PARAMS provides the parameters to the
 * CKM_ECMQV_DERIVE mechanism, where each party contributes two key pairs. */
t.CK_ECDH2_DERIVE_PARAMS = struct({
  kdf: t.CK_EC_KDF_TYPE,
  ulSharedDataLen: t.CK_ULONG,
  pSharedData: t.CK_BYTE_PTR,
  ulPublicDataLen: t.CK_ULONG,
  pPublicData: t.CK_BYTE_PTR,
  ulPrivateDataLen: t.CK_ULONG,
  hPrivateData: t.CK_OBJECT_HANDLE,
  ulPublicDataLen2: t.CK_ULONG,
  pPublicData2: t.CK_BYTE_PTR
});
t.CK_ECDH2_DERIVE_PARAMS_PTR = ref.refType(t.CK_ECDH2_DERIVE_PARAMS);

t.CK_ECMQV_DERIVE_PARAMS = struct({
  kdf: t.CK_EC_KDF_TYPE,
  ulSharedDataLen: t.CK_ULONG,
  pSharedData: t.CK_BYTE_PTR,
  ulPublicDataLen: t.CK_ULONG,
  pPublicData: t.CK_BYTE_PTR,
  ulPrivateDataLen: t.CK_ULONG,
  hPrivateData: t.CK_OBJECT_HANDLE,
  ulPublicDataLen2: t.CK_ULONG,
  pPublicData2: t.CK_BYTE_PTR,
  publicKey: t.CK_OBJECT_HANDLE
});
t.CK_ECMQV_DERIVE_PARAMS_PTR = ref.refType(t.CK_ECMQV_DERIVE_PARAMS);


module.exports = t;