/* pkcs11t.h include file for PKCS #11. */
/* $Revision: 1.10 $ */
/* License to copy and use this software is granted provided that it is
 * identified as "RSA Security Inc. PKCS #11 Cryptographic Token Interface
 * (Cryptoki)" in all material mentioning or referencing this software.

 * License is also granted to make and use derivative works provided that
 * such works are identified as "derived from the RSA Security Inc. PKCS #11
 * Cryptographic Token Interface (Cryptoki)" in all material mentioning or
 * referencing the derived work.

 * RSA Security Inc. makes no representations concerning either the
 * merchantability of this software or the suitability of this software for
 * any particular purpose. It is provided "as is" without express or implied
 * warranty of any kind.
 */
/* See top of pkcs11.h for information about the macros that
 * must be defined and the structure-packing conventions that
 * must be set before including this file. */
var Ffi = require("ffi");
var Ref = require("ref");
var RefStruct = require("ref-struct");
var RefArray = require("ref-array");
exports.CRYPTOKI_VERSION_MAJOR = 2;
exports.CRYPTOKI_VERSION_MINOR = 20;
exports.CRYPTOKI_VERSION_AMENDMENT = 3;
exports.CK_TRUE = 1;
exports.CK_FALSE = 0;
/**
 * an unsigned 8-bit value
 */
exports.CK_BYTE = "byte";
/**
 * an unsigned 8-bit character
 */
exports.CK_CHAR = exports.CK_BYTE;
/**
 * an 8-bit UTF-8 character
 */
exports.CK_UTF8CHAR = exports.CK_BYTE;
/**
 * a BYTE-sized Boolean flag
 */
exports.CK_BBOOL = exports.CK_BYTE;
/**
 * an unsigned value, at least 32 bits long
 */
exports.CK_ULONG = "ulong";
/**
 * a signed value, the same size as a CK_ULONG
 * CK_LONG is new for v2.0
 */
exports.CK_LONG = "long";
/**
 * at least 32 bits; each bit is a Boolean flag
 */
exports.CK_FLAGS = exports.CK_ULONG;
/**
 * some special values for certain CK_ULONG variables
 */
exports.CK_UNAVAILABLE_INFORMATION = (~0);
exports.CK_EFFECTIVELY_INFINITE = 0;
exports.CK_BYTE_PTR = Ref.refType(exports.CK_BYTE);
exports.CK_CHAR_PTR = Ref.refType(exports.CK_CHAR);
exports.CK_UTF8CHAR_PTR = Ref.refType(exports.CK_UTF8CHAR);
exports.CK_ULONG_PTR = Ref.refType(exports.CK_ULONG);
exports.CK_VOID_PTR = Ref.refType("void");
/**
 * Pointer to a CK_VOID_PTR-- i.e., pointer to pointer to void
 */
exports.CK_VOID_PTR_PTR = Ref.refType(exports.CK_VOID_PTR);
/**
 * The following value is always invalid if used as a session
 * handle or object handle
 */
exports.CK_INVALID_HANDLE = 0;
exports.CK_VERSION = RefStruct({
    major: exports.CK_BYTE,
    minor: exports.CK_BYTE // 1/100ths portion of version number
});
exports.CK_VERSION_PTR = Ref.refType(exports.CK_VERSION);
exports.CK_INFO = RefStruct({
    /* manufacturerID and libraryDecription have been changed from
     * CK_CHAR to CK_UTF8CHAR for v2.10 */
    cryptokiVersion: exports.CK_VERSION,
    manufacturerID: RefArray(exports.CK_UTF8CHAR, 32),
    flags: exports.CK_FLAGS,
    /* libraryDescription and libraryVersion are new for v2.0 */
    libraryDescription: RefArray(exports.CK_UTF8CHAR, 32),
    libraryVersion: exports.CK_VERSION /* version of library */
});
exports.CK_INFO_PTR = Ref.refType(exports.CK_INFO);
/**
 * CK_NOTIFICATION enumerates the types of notifications that
 * Cryptoki provides to an application
 * CK_NOTIFICATION has been changed from an enum to a CK_ULONG
 * for v2.0
 */
exports.CK_NOTIFICATION = exports.CK_ULONG;
exports.CKN_SURRENDER = 0;
/**
 * The following notification is new for PKCS #11 v2.20 amendment 3
 */
exports.CKN_OTP_CHANGED = 1;
exports.CK_SLOT_ID = exports.CK_ULONG;
exports.CK_SLOT_ID_PTR = Ref.refType(exports.CK_SLOT_ID);
/**
 * CK_SLOT_INFO provides information about a slot
 */
exports.CK_SLOT_INFO = RefStruct({
    /* slotDescription and manufacturerID have been changed from
     * CK_CHAR to CK_UTF8CHAR for v2.10 */
    slotDescription: RefArray(exports.CK_UTF8CHAR, 64),
    manufacturerID: RefArray(exports.CK_UTF8CHAR, 32),
    flags: exports.CK_FLAGS,
    /* hardwareVersion and firmwareVersion are new for v2.0 */
    hardwareVersion: exports.CK_VERSION,
    firmwareVersion: exports.CK_VERSION /* version of firmware */
});
/* flags: bit flags that provide capabilities of the slot
 *      Bit Flag              Mask        Meaning
 */
exports.CKF_TOKEN_PRESENT = 0x00000001; /* a token is there */
exports.CKF_REMOVABLE_DEVICE = 0x00000002; /* removable devices*/
exports.CKF_HW_SLOT = 0x00000004; /* hardware slot */
exports.CK_SLOT_INFO_PTR = Ref.refType(exports.CK_SLOT_INFO);
/**
 * CK_TOKEN_INFO provides information about a token
 */
exports.CK_TOKEN_INFO = RefStruct({
    /* label, manufacturerID, and model have been changed from
     * CK_CHAR to CK_UTF8CHAR for v2.10 */
    label: RefArray(exports.CK_UTF8CHAR, 32),
    manufacturerID: RefArray(exports.CK_UTF8CHAR, 32),
    model: RefArray(exports.CK_UTF8CHAR, 16),
    serialNumber: RefArray(exports.CK_CHAR, 16),
    flags: exports.CK_FLAGS,
    /* ulMaxSessionCount, ulSessionCount, ulMaxRwSessionCount,
     * ulRwSessionCount, ulMaxPinLen, and ulMinPinLen have all been
     * changed from CK_USHORT to CK_ULONG for v2.0 */
    ulMaxSessionCount: exports.CK_ULONG,
    ulSessionCount: exports.CK_ULONG,
    ulMaxRwSessionCount: exports.CK_ULONG,
    ulRwSessionCount: exports.CK_ULONG,
    ulMaxPinLen: exports.CK_ULONG,
    ulMinPinLen: exports.CK_ULONG,
    ulTotalPublicMemory: exports.CK_ULONG,
    ulFreePublicMemory: exports.CK_ULONG,
    ulTotalPrivateMemory: exports.CK_ULONG,
    ulFreePrivateMemory: exports.CK_ULONG,
    /* hardwareVersion, firmwareVersion, and time are new for
     * v2.0 */
    hardwareVersion: exports.CK_VERSION,
    firmwareVersion: exports.CK_VERSION,
    utcTime: RefArray(exports.CK_CHAR, 16) /* time */
});
/* The flags parameter is defined as follows:
 *      Bit Flag                    Mask        Meaning
 */
/**
 * has random generator
 */
exports.CKF_RNG = 0x00000001;
/**
 * token is write-protected
 */
exports.CKF_WRITE_PROTECTED = 0x00000002;
/**
 * user must login
 */
exports.CKF_LOGIN_REQUIRED = 0x00000004;
/**
 * normal user's PIN is set
 */
exports.CKF_USER_PIN_INITIALIZED = 0x00000008;
/**
 * CKF_RESTORE_KEY_NOT_NEEDED is new for v2.0.  If it is set,
 * that means that *every* time the state of cryptographic
 * operations of a session is successfully saved, all keys
 * needed to continue those operations are stored in the state */
exports.CKF_RESTORE_KEY_NOT_NEEDED = 0x00000020;
/**
 * CKF_CLOCK_ON_TOKEN is new for v2.0.  If it is set, that means
 * that the token has some sort of clock.  The time on that
 * clock is returned in the token info structure
 */
exports.CKF_CLOCK_ON_TOKEN = 0x00000040;
/**
 * CKF_PROTECTED_AUTHENTICATION_PATH is new for v2.0.  If it is
 * set, that means that there is some way for the user to login
 * without sending a PIN through the Cryptoki library itself
 */
exports.CKF_PROTECTED_AUTHENTICATION_PATH = 0x00000100;
/**
 * CKF_DUAL_CRYPTO_OPERATIONS is new for v2.0.  If it is true,
 * that means that a single session with the token can perform
 * dual simultaneous cryptographic operations (digest and
 * encrypt; decrypt and digest; sign and encrypt; and decrypt
 * and sign)
 */
exports.CKF_DUAL_CRYPTO_OPERATIONS = 0x00000200;
/**
 * CKF_TOKEN_INITIALIZED if new for v2.10. If it is true, the
 * token has been initialized using C_InitializeToken or an
 * equivalent mechanism outside the scope of PKCS #11.
 * Calling C_InitializeToken when this flag is set will cause
 * the token to be reinitialized.
 */
exports.CKF_TOKEN_INITIALIZED = 0x00000400;
/**
 * CKF_SECONDARY_AUTHENTICATION if new for v2.10. If it is
 * true, the token supports secondary authentication for
 * private key objects. This flag is deprecated in v2.11 and
 * onwards.
 */
exports.CKF_SECONDARY_AUTHENTICATION = 0x00000800;
/**
 * CKF_USER_PIN_COUNT_LOW if new for v2.10. If it is true, an
 * incorrect user login PIN has been entered at least once
 * since the last successful authentication.
 */
exports.CKF_USER_PIN_COUNT_LOW = 0x00010000;
/**
 * CKF_USER_PIN_FINAL_TRY if new for v2.10. If it is true,
 * supplying an incorrect user PIN will it to become locked.
 */
exports.CKF_USER_PIN_FINAL_TRY = 0x00020000;
/**
 * CKF_USER_PIN_LOCKED if new for v2.10. If it is true, the
 * user PIN has been locked. User login to the token is not
 * possible.
 */
exports.CKF_USER_PIN_LOCKED = 0x00040000;
/**
 * CKF_USER_PIN_TO_BE_CHANGED if new for v2.10. If it is true,
 * the user PIN value is the default value set by token
 * initialization or manufacturing, or the PIN has been
 * expired by the card.
 */
exports.CKF_USER_PIN_TO_BE_CHANGED = 0x00080000;
/**
 * CKF_SO_PIN_COUNT_LOW if new for v2.10. If it is true, an
 * incorrect SO login PIN has been entered at least once since
 * the last successful authentication.
 */
exports.CKF_SO_PIN_COUNT_LOW = 0x00100000;
/**
 * CKF_SO_PIN_FINAL_TRY if new for v2.10. If it is true,
 * supplying an incorrect SO PIN will it to become locked.
 */
exports.CKF_SO_PIN_FINAL_TRY = 0x00200000;
/**
 * CKF_SO_PIN_LOCKED if new for v2.10. If it is true, the SO
 * PIN has been locked. SO login to the token is not possible.
 */
exports.CKF_SO_PIN_LOCKED = 0x00400000;
/**
 * CKF_SO_PIN_TO_BE_CHANGED if new for v2.10. If it is true,
 * the SO PIN value is the default value set by token
 * initialization or manufacturing, or the PIN has been
 * expired by the card.
 */
exports.CKF_SO_PIN_TO_BE_CHANGED = 0x00800000;
exports.CK_TOKEN_INFO_PTR = Ref.refType(exports.CK_TOKEN_INFO);
/**
 * CK_SESSION_HANDLE is a Cryptoki-assigned value that
 * identifies a session
 */
exports.CK_SESSION_HANDLE = exports.CK_ULONG;
exports.CK_SESSION_HANDLE_PTR = Ref.refType(exports.CK_SESSION_HANDLE);
/**
 * CK_USER_TYPE enumerates the types of Cryptoki users
 * CK_USER_TYPE has been changed from an enum to a CK_ULONG for
 * v2.0
 */
exports.CK_USER_TYPE = exports.CK_ULONG;
/**
 * Security Officer
 */
exports.CKU_SO = 0;
/**
 * Normal user
 */
exports.CKU_USER = 1;
/**
 * Context specific (added in v2.20)
 */
exports.CKU_CONTEXT_SPECIFIC = 2;
/**
 * CK_STATE enumerates the session states
 * CK_STATE has been changed from an enum to a CK_ULONG for
 * v2.0
 */
exports.CK_STATE = exports.CK_ULONG;
exports.CKS_RO_PUBLIC_SESSION = 0;
exports.CKS_RO_USER_FUNCTIONS = 1;
exports.CKS_RW_PUBLIC_SESSION = 2;
exports.CKS_RW_USER_FUNCTIONS = 3;
exports.CKS_RW_SO_FUNCTIONS = 4;
/**
 * CK_SESSION_INFO provides information about a session
 */
exports.CK_SESSION_INFO = RefStruct({
    slotID: exports.CK_SLOT_ID,
    state: exports.CK_STATE,
    flags: exports.CK_FLAGS,
    /* ulDeviceError was changed from CK_USHORT to CK_ULONG for
     * v2.0 */
    ulDeviceError: exports.CK_ULONG /* device-dependent error code */
});
/* The flags are defined in the following table:
 *      Bit Flag                Mask        Meaning
 */
/**
 * session is r/w
 */
exports.CKF_RW_SESSION = 0x00000002;
/**
 * no parallel
 */
exports.CKF_SERIAL_SESSION = 0x00000004;
exports.CK_SESSION_INFO_PTR = Ref.refType(exports.CK_SESSION_INFO);
/**
 * CK_OBJECT_HANDLE is a token-specific identifier for an
 * object
 */
exports.CK_OBJECT_HANDLE = exports.CK_ULONG;
exports.CK_OBJECT_HANDLE_PTR = Ref.refType(exports.CK_OBJECT_HANDLE);
/** CK_OBJECT_CLASS is a value that identifies the classes (or
 * types) of objects that Cryptoki recognizes.  It is defined
 * as follows:
 * CK_OBJECT_CLASS was changed from CK_USHORT to CK_ULONG for
 * v2.0
 */
exports.CK_OBJECT_CLASS = exports.CK_ULONG;
/* The following classes of objects are defined: */
/* CKO_HW_FEATURE is new for v2.10 */
/* CKO_DOMAIN_PARAMETERS is new for v2.11 */
/* CKO_MECHANISM is new for v2.20 */
exports.CKO_DATA = 0x00000000;
exports.CKO_CERTIFICATE = 0x00000001;
exports.CKO_PUBLIC_KEY = 0x00000002;
exports.CKO_PRIVATE_KEY = 0x00000003;
exports.CKO_SECRET_KEY = 0x00000004;
exports.CKO_HW_FEATURE = 0x00000005;
exports.CKO_DOMAIN_PARAMETERS = 0x00000006;
exports.CKO_MECHANISM = 0x00000007;
/* CKO_OTP_KEY is new for PKCS #11 v2.20 amendment 1 */
exports.CKO_OTP_KEY = 0x00000008;
exports.CKO_VENDOR_DEFINED = 0x80000000;
exports.CK_OBJECT_CLASS_PTR = Ref.refType(exports.CK_OBJECT_CLASS);
/**
 * CK_HW_FEATURE_TYPE is new for v2.10. CK_HW_FEATURE_TYPE is a
 * value that identifies the hardware feature type of an object
 * with CK_OBJECT_CLASS equal to CKO_HW_FEATURE.
 */
exports.CK_HW_FEATURE_TYPE = exports.CK_ULONG;
/* The following hardware feature types are defined */
/* CKH_USER_INTERFACE is new for v2.20 */
exports.CKH_MONOTONIC_COUNTER = 0x00000001;
exports.CKH_CLOCK = 0x00000002;
exports.CKH_USER_INTERFACE = 0x00000003;
exports.CKH_VENDOR_DEFINED = 0x80000000;
/**
 * CK_KEY_TYPE is a value that identifies a key type
 * CK_KEY_TYPE was changed from CK_USHORT to CK_ULONG for v2.0
 */
exports.CK_KEY_TYPE = exports.CK_ULONG;
/* the following key types are defined: */
exports.CKK_RSA = 0x00000000;
exports.CKK_DSA = 0x00000001;
exports.CKK_DH = 0x00000002;
/* CKK_ECDSA and CKK_KEA are new for v2.0 */
/* CKK_ECDSA is deprecated in v2.11, CKK_EC is preferred. */
exports.CKK_ECDSA = 0x00000003;
exports.CKK_EC = 0x00000003;
exports.CKK_X9_42_DH = 0x00000004;
exports.CKK_KEA = 0x00000005;
exports.CKK_GENERIC_SECRET = 0x00000010;
exports.CKK_RC2 = 0x00000011;
exports.CKK_RC4 = 0x00000012;
exports.CKK_DES = 0x00000013;
exports.CKK_DES2 = 0x00000014;
exports.CKK_DES3 = 0x00000015;
/* all these key types are new for v2.0 */
exports.CKK_CAST = 0x00000016;
exports.CKK_CAST3 = 0x00000017;
/* CKK_CAST5 is deprecated in v2.11, CKK_CAST128 is preferred. */
exports.CKK_CAST5 = 0x00000018;
exports.CKK_CAST128 = 0x00000018;
exports.CKK_RC5 = 0x00000019;
exports.CKK_IDEA = 0x0000001A;
exports.CKK_SKIPJACK = 0x0000001B;
exports.CKK_BATON = 0x0000001C;
exports.CKK_JUNIPER = 0x0000001D;
exports.CKK_CDMF = 0x0000001E;
exports.CKK_AES = 0x0000001F;
/* BlowFish and TwoFish are new for v2.20 */
exports.CKK_BLOWFISH = 0x00000020;
exports.CKK_TWOFISH = 0x00000021;
/* SecurID, HOTP, and ACTI are new for PKCS #11 v2.20 amendment 1 */
exports.CKK_SECURID = 0x00000022;
exports.CKK_HOTP = 0x00000023;
exports.CKK_ACTI = 0x00000024;
/* Camellia is new for PKCS #11 v2.20 amendment 3 */
exports.CKK_CAMELLIA = 0x00000025;
/* ARIA is new for PKCS #11 v2.20 amendment 3 */
exports.CKK_ARIA = 0x00000026;
exports.CKK_VENDOR_DEFINED = 0x80000000;
/**
 * CK_CERTIFICATE_TYPE is a value that identifies a certificate type
 * CK_CERTIFICATE_TYPE was changed from CK_USHORT to CK_ULONG for v2.0
 */
exports.CK_CERTIFICATE_TYPE = exports.CK_ULONG;
/* The following certificate types are defined: */
/* CKC_X_509_ATTR_CERT is new for v2.10 */
/* CKC_WTLS is new for v2.20 */
exports.CKC_X_509 = 0x00000000;
exports.CKC_X_509_ATTR_CERT = 0x00000001;
exports.CKC_WTLS = 0x00000002;
exports.CKC_VENDOR_DEFINED = 0x80000000;
/**
 * CK_ATTRIBUTE_TYPE is a value that identifies an attribute type
/* CK_ATTRIBUTE_TYPE was changed from CK_USHORT to CK_ULONG for v2.0
 */
exports.CK_ATTRIBUTE_TYPE = exports.CK_ULONG;
/* The CKF_ARRAY_ATTRIBUTE flag identifies an attribute which
   consists of an array of values. */
exports.CKF_ARRAY_ATTRIBUTE = 0x40000000;
/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1
   and relates to the CKA_OTP_FORMAT attribute */
exports.CK_OTP_FORMAT_DECIMAL = 0;
exports.CK_OTP_FORMAT_HEXADECIMAL = 1;
exports.CK_OTP_FORMAT_ALPHANUMERIC = 2;
exports.CK_OTP_FORMAT_BINARY = 3;
/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1
   and relates to the CKA_OTP_..._REQUIREMENT attributes */
exports.CK_OTP_PARAM_IGNORED = 0;
exports.CK_OTP_PARAM_OPTIONAL = 1;
exports.CK_OTP_PARAM_MANDATORY = 2;
/* The following attribute types are defined: */
exports.CKA_CLASS = 0x00000000;
exports.CKA_TOKEN = 0x00000001;
exports.CKA_PRIVATE = 0x00000002;
exports.CKA_LABEL = 0x00000003;
exports.CKA_APPLICATION = 0x00000010;
exports.CKA_VALUE = 0x00000011;
/* CKA_OBJECT_ID is new for v2.10 */
exports.CKA_OBJECT_ID = 0x00000012;
exports.CKA_CERTIFICATE_TYPE = 0x00000080;
exports.CKA_ISSUER = 0x00000081;
exports.CKA_SERIAL_NUMBER = 0x00000082;
/* CKA_AC_ISSUER, CKA_OWNER, and CKA_ATTR_TYPES are new
 * for v2.10 */
exports.CKA_AC_ISSUER = 0x00000083;
exports.CKA_OWNER = 0x00000084;
exports.CKA_ATTR_TYPES = 0x00000085;
/* CKA_TRUSTED is new for v2.11 */
exports.CKA_TRUSTED = 0x00000086;
/* CKA_CERTIFICATE_CATEGORY ...
 * CKA_CHECK_VALUE are new for v2.20 */
exports.CKA_CERTIFICATE_CATEGORY = 0x00000087;
exports.CKA_JAVA_MIDP_SECURITY_DOMAIN = 0x00000088;
exports.CKA_URL = 0x00000089;
exports.CKA_HASH_OF_SUBJECT_PUBLIC_KEY = 0x0000008A;
exports.CKA_HASH_OF_ISSUER_PUBLIC_KEY = 0x0000008B;
exports.CKA_CHECK_VALUE = 0x00000090;
exports.CKA_KEY_TYPE = 0x00000100;
exports.CKA_SUBJECT = 0x00000101;
exports.CKA_ID = 0x00000102;
exports.CKA_SENSITIVE = 0x00000103;
exports.CKA_ENCRYPT = 0x00000104;
exports.CKA_DECRYPT = 0x00000105;
exports.CKA_WRAP = 0x00000106;
exports.CKA_UNWRAP = 0x00000107;
exports.CKA_SIGN = 0x00000108;
exports.CKA_SIGN_RECOVER = 0x00000109;
exports.CKA_VERIFY = 0x0000010A;
exports.CKA_VERIFY_RECOVER = 0x0000010B;
exports.CKA_DERIVE = 0x0000010C;
exports.CKA_START_DATE = 0x00000110;
exports.CKA_END_DATE = 0x00000111;
exports.CKA_MODULUS = 0x00000120;
exports.CKA_MODULUS_BITS = 0x00000121;
exports.CKA_PUBLIC_EXPONENT = 0x00000122;
exports.CKA_PRIVATE_EXPONENT = 0x00000123;
exports.CKA_PRIME_1 = 0x00000124;
exports.CKA_PRIME_2 = 0x00000125;
exports.CKA_EXPONENT_1 = 0x00000126;
exports.CKA_EXPONENT_2 = 0x00000127;
exports.CKA_COEFFICIENT = 0x00000128;
exports.CKA_PRIME = 0x00000130;
exports.CKA_SUBPRIME = 0x00000131;
exports.CKA_BASE = 0x00000132;
/* CKA_PRIME_BITS and CKA_SUB_PRIME_BITS are new for v2.11 */
exports.CKA_PRIME_BITS = 0x00000133;
exports.CKA_SUBPRIME_BITS = 0x00000134;
exports.CKA_SUB_PRIME_BITS = exports.CKA_SUBPRIME_BITS;
/* (To retain backwards-compatibility) */
exports.CKA_VALUE_BITS = 0x00000160;
exports.CKA_VALUE_LEN = 0x00000161;
/* CKA_EXTRACTABLE, CKA_LOCAL, CKA_NEVER_EXTRACTABLE,
 * CKA_ALWAYS_SENSITIVE, CKA_MODIFIABLE, CKA_ECDSA_PARAMS,
 * and CKA_EC_POINT are new for v2.0 */
exports.CKA_EXTRACTABLE = 0x00000162;
exports.CKA_LOCAL = 0x00000163;
exports.CKA_NEVER_EXTRACTABLE = 0x00000164;
exports.CKA_ALWAYS_SENSITIVE = 0x00000165;
/* CKA_KEY_GEN_MECHANISM is new for v2.11 */
exports.CKA_KEY_GEN_MECHANISM = 0x00000166;
exports.CKA_MODIFIABLE = 0x00000170;
/* CKA_ECDSA_PARAMS is deprecated in v2.11,
 * CKA_EC_PARAMS is preferred. */
exports.CKA_ECDSA_PARAMS = 0x00000180;
exports.CKA_EC_PARAMS = 0x00000180;
exports.CKA_EC_POINT = 0x00000181;
/* CKA_SECONDARY_AUTH, CKA_AUTH_PIN_FLAGS,
 * are new for v2.10. Deprecated in v2.11 and onwards. */
exports.CKA_SECONDARY_AUTH = 0x00000200;
exports.CKA_AUTH_PIN_FLAGS = 0x00000201;
/* CKA_ALWAYS_AUTHENTICATE ...
 * CKA_UNWRAP_TEMPLATE are new for v2.20 */
exports.CKA_ALWAYS_AUTHENTICATE = 0x00000202;
exports.CKA_WRAP_WITH_TRUSTED = 0x00000210;
exports.CKA_WRAP_TEMPLATE = (exports.CKF_ARRAY_ATTRIBUTE | 0x00000211);
exports.CKA_UNWRAP_TEMPLATE = (exports.CKF_ARRAY_ATTRIBUTE | 0x00000212);
/* CKA_OTP... atttributes are new for PKCS #11 v2.20 amendment 3. */
exports.CKA_OTP_FORMAT = 0x00000220;
exports.CKA_OTP_LENGTH = 0x00000221;
exports.CKA_OTP_TIME_INTERVAL = 0x00000222;
exports.CKA_OTP_USER_FRIENDLY_MODE = 0x00000223;
exports.CKA_OTP_CHALLENGE_REQUIREMENT = 0x00000224;
exports.CKA_OTP_TIME_REQUIREMENT = 0x00000225;
exports.CKA_OTP_COUNTER_REQUIREMENT = 0x00000226;
exports.CKA_OTP_PIN_REQUIREMENT = 0x00000227;
exports.CKA_OTP_COUNTER = 0x0000022E;
exports.CKA_OTP_TIME = 0x0000022F;
exports.CKA_OTP_USER_IDENTIFIER = 0x0000022A;
exports.CKA_OTP_SERVICE_IDENTIFIER = 0x0000022B;
exports.CKA_OTP_SERVICE_LOGO = 0x0000022C;
exports.CKA_OTP_SERVICE_LOGO_TYPE = 0x0000022D;
/* CKA_HW_FEATURE_TYPE, CKA_RESET_ON_INIT, and CKA_HAS_RESET
 * are new for v2.10 */
exports.CKA_HW_FEATURE_TYPE = 0x00000300;
exports.CKA_RESET_ON_INIT = 0x00000301;
exports.CKA_HAS_RESET = 0x00000302;
/* The following attributes are new for v2.20 */
exports.CKA_PIXEL_X = 0x00000400;
exports.CKA_PIXEL_Y = 0x00000401;
exports.CKA_RESOLUTION = 0x00000402;
exports.CKA_CHAR_ROWS = 0x00000403;
exports.CKA_CHAR_COLUMNS = 0x00000404;
exports.CKA_COLOR = 0x00000405;
exports.CKA_BITS_PER_PIXEL = 0x00000406;
exports.CKA_CHAR_SETS = 0x00000480;
exports.CKA_ENCODING_METHODS = 0x00000481;
exports.CKA_MIME_TYPES = 0x00000482;
exports.CKA_MECHANISM_TYPE = 0x00000500;
exports.CKA_REQUIRED_CMS_ATTRIBUTES = 0x00000501;
exports.CKA_DEFAULT_CMS_ATTRIBUTES = 0x00000502;
exports.CKA_SUPPORTED_CMS_ATTRIBUTES = 0x00000503;
exports.CKA_ALLOWED_MECHANISMS = (exports.CKF_ARRAY_ATTRIBUTE | 0x00000600);
exports.CKA_VENDOR_DEFINED = 0x80000000;
/**
 * CK_ATTRIBUTE is a structure that includes the type, length
 * and value of an attribute
 */
exports.CK_ATTRIBUTE = RefStruct({
    type: exports.CK_ATTRIBUTE_TYPE,
    pValue: exports.CK_VOID_PTR,
    /* ulValueLen went from CK_USHORT to CK_ULONG for v2.0 */
    ulValueLen: exports.CK_ULONG /* in bytes */
});
exports.CK_ATTRIBUTE_PTR = Ref.refType(exports.CK_ATTRIBUTE);
/**
 * CK_DATE is a structure that defines a date
 */
exports.CK_DATE = RefStruct({
    year: RefArray(exports.CK_CHAR, 4),
    month: RefArray(exports.CK_CHAR, 2),
    day: RefArray(exports.CK_CHAR, 2) /* the day   ("01" - "31") */
});
/**
 * CK_MECHANISM_TYPE is a value that identifies a mechanism type
 * CK_MECHANISM_TYPE was changed from CK_USHORT to CK_ULONG for v2.0
 */
exports.CK_MECHANISM_TYPE = exports.CK_ULONG;
/* the following mechanism types are defined: */
exports.CKM_RSA_PKCS_KEY_PAIR_GEN = 0x00000000;
exports.CKM_RSA_PKCS = 0x00000001;
exports.CKM_RSA_9796 = 0x00000002;
exports.CKM_RSA_X_509 = 0x00000003;
/* CKM_MD2_RSA_PKCS, CKM_MD5_RSA_PKCS, and CKM_SHA1_RSA_PKCS
 * are new for v2.0.  They are mechanisms which hash and sign */
exports.CKM_MD2_RSA_PKCS = 0x00000004;
exports.CKM_MD5_RSA_PKCS = 0x00000005;
exports.CKM_SHA1_RSA_PKCS = 0x00000006;
/* CKM_RIPEMD128_RSA_PKCS, CKM_RIPEMD160_RSA_PKCS, and
 * CKM_RSA_PKCS_OAEP are new for v2.10 */
exports.CKM_RIPEMD128_RSA_PKCS = 0x00000007;
exports.CKM_RIPEMD160_RSA_PKCS = 0x00000008;
exports.CKM_RSA_PKCS_OAEP = 0x00000009;
/* CKM_RSA_X9_31_KEY_PAIR_GEN, CKM_RSA_X9_31, CKM_SHA1_RSA_X9_31,
 * CKM_RSA_PKCS_PSS, and CKM_SHA1_RSA_PKCS_PSS are new for v2.11 */
exports.CKM_RSA_X9_31_KEY_PAIR_GEN = 0x0000000A;
exports.CKM_RSA_X9_31 = 0x0000000B;
exports.CKM_SHA1_RSA_X9_31 = 0x0000000C;
exports.CKM_RSA_PKCS_PSS = 0x0000000D;
exports.CKM_SHA1_RSA_PKCS_PSS = 0x0000000E;
exports.CKM_DSA_KEY_PAIR_GEN = 0x00000010;
exports.CKM_DSA = 0x00000011;
exports.CKM_DSA_SHA1 = 0x00000012;
exports.CKM_DH_PKCS_KEY_PAIR_GEN = 0x00000020;
exports.CKM_DH_PKCS_DERIVE = 0x00000021;
/* CKM_X9_42_DH_KEY_PAIR_GEN, CKM_X9_42_DH_DERIVE,
 * CKM_X9_42_DH_HYBRID_DERIVE, and CKM_X9_42_MQV_DERIVE are new for
 * v2.11 */
exports.CKM_X9_42_DH_KEY_PAIR_GEN = 0x00000030;
exports.CKM_X9_42_DH_DERIVE = 0x00000031;
exports.CKM_X9_42_DH_HYBRID_DERIVE = 0x00000032;
exports.CKM_X9_42_MQV_DERIVE = 0x00000033;
/* CKM_SHA256/384/512 are new for v2.20 */
exports.CKM_SHA256_RSA_PKCS = 0x00000040;
exports.CKM_SHA384_RSA_PKCS = 0x00000041;
exports.CKM_SHA512_RSA_PKCS = 0x00000042;
exports.CKM_SHA256_RSA_PKCS_PSS = 0x00000043;
exports.CKM_SHA384_RSA_PKCS_PSS = 0x00000044;
exports.CKM_SHA512_RSA_PKCS_PSS = 0x00000045;
/* SHA-224 RSA mechanisms are new for PKCS #11 v2.20 amendment 3 */
exports.CKM_SHA224_RSA_PKCS = 0x00000046;
exports.CKM_SHA224_RSA_PKCS_PSS = 0x00000047;
exports.CKM_RC2_KEY_GEN = 0x00000100;
exports.CKM_RC2_ECB = 0x00000101;
exports.CKM_RC2_CBC = 0x00000102;
exports.CKM_RC2_MAC = 0x00000103;
/* CKM_RC2_MAC_GENERAL and CKM_RC2_CBC_PAD are new for v2.0 */
exports.CKM_RC2_MAC_GENERAL = 0x00000104;
exports.CKM_RC2_CBC_PAD = 0x00000105;
exports.CKM_RC4_KEY_GEN = 0x00000110;
exports.CKM_RC4 = 0x00000111;
exports.CKM_DES_KEY_GEN = 0x00000120;
exports.CKM_DES_ECB = 0x00000121;
exports.CKM_DES_CBC = 0x00000122;
exports.CKM_DES_MAC = 0x00000123;
/* CKM_DES_MAC_GENERAL and CKM_DES_CBC_PAD are new for v2.0 */
exports.CKM_DES_MAC_GENERAL = 0x00000124;
exports.CKM_DES_CBC_PAD = 0x00000125;
exports.CKM_DES2_KEY_GEN = 0x00000130;
exports.CKM_DES3_KEY_GEN = 0x00000131;
exports.CKM_DES3_ECB = 0x00000132;
exports.CKM_DES3_CBC = 0x00000133;
exports.CKM_DES3_MAC = 0x00000134;
/* CKM_DES3_MAC_GENERAL, CKM_DES3_CBC_PAD, CKM_CDMF_KEY_GEN,
 * CKM_CDMF_ECB, CKM_CDMF_CBC, CKM_CDMF_MAC,
 * CKM_CDMF_MAC_GENERAL, and CKM_CDMF_CBC_PAD are new for v2.0 */
exports.CKM_DES3_MAC_GENERAL = 0x00000135;
exports.CKM_DES3_CBC_PAD = 0x00000136;
exports.CKM_CDMF_KEY_GEN = 0x00000140;
exports.CKM_CDMF_ECB = 0x00000141;
exports.CKM_CDMF_CBC = 0x00000142;
exports.CKM_CDMF_MAC = 0x00000143;
exports.CKM_CDMF_MAC_GENERAL = 0x00000144;
exports.CKM_CDMF_CBC_PAD = 0x00000145;
/* the following four DES mechanisms are new for v2.20 */
exports.CKM_DES_OFB64 = 0x00000150;
exports.CKM_DES_OFB8 = 0x00000151;
exports.CKM_DES_CFB64 = 0x00000152;
exports.CKM_DES_CFB8 = 0x00000153;
exports.CKM_MD2 = 0x00000200;
/* CKM_MD2_HMAC and CKM_MD2_HMAC_GENERAL are new for v2.0 */
exports.CKM_MD2_HMAC = 0x00000201;
exports.CKM_MD2_HMAC_GENERAL = 0x00000202;
exports.CKM_MD5 = 0x00000210;
/* CKM_MD5_HMAC and CKM_MD5_HMAC_GENERAL are new for v2.0 */
exports.CKM_MD5_HMAC = 0x00000211;
exports.CKM_MD5_HMAC_GENERAL = 0x00000212;
exports.CKM_SHA_1 = 0x00000220;
/* CKM_SHA_1_HMAC and CKM_SHA_1_HMAC_GENERAL are new for v2.0 */
exports.CKM_SHA_1_HMAC = 0x00000221;
exports.CKM_SHA_1_HMAC_GENERAL = 0x00000222;
/* CKM_RIPEMD128, CKM_RIPEMD128_HMAC,
 * CKM_RIPEMD128_HMAC_GENERAL, CKM_RIPEMD160, CKM_RIPEMD160_HMAC,
 * and CKM_RIPEMD160_HMAC_GENERAL are new for v2.10 */
exports.CKM_RIPEMD128 = 0x00000230;
exports.CKM_RIPEMD128_HMAC = 0x00000231;
exports.CKM_RIPEMD128_HMAC_GENERAL = 0x00000232;
exports.CKM_RIPEMD160 = 0x00000240;
exports.CKM_RIPEMD160_HMAC = 0x00000241;
exports.CKM_RIPEMD160_HMAC_GENERAL = 0x00000242;
/* CKM_SHA256/384/512 are new for v2.20 */
exports.CKM_SHA256 = 0x00000250;
exports.CKM_SHA256_HMAC = 0x00000251;
exports.CKM_SHA256_HMAC_GENERAL = 0x00000252;
/* SHA-224 is new for PKCS #11 v2.20 amendment 3 */
exports.CKM_SHA224 = 0x00000255;
exports.CKM_SHA224_HMAC = 0x00000256;
exports.CKM_SHA224_HMAC_GENERAL = 0x00000257;
exports.CKM_SHA384 = 0x00000260;
exports.CKM_SHA384_HMAC = 0x00000261;
exports.CKM_SHA384_HMAC_GENERAL = 0x00000262;
exports.CKM_SHA512 = 0x00000270;
exports.CKM_SHA512_HMAC = 0x00000271;
exports.CKM_SHA512_HMAC_GENERAL = 0x00000272;
/* SecurID is new for PKCS #11 v2.20 amendment 1 */
exports.CKM_SECURID_KEY_GEN = 0x00000280;
exports.CKM_SECURID = 0x00000282;
/* HOTP is new for PKCS #11 v2.20 amendment 1 */
exports.CKM_HOTP_KEY_GEN = 0x00000290;
exports.CKM_HOTP = 0x00000291;
/* ACTI is new for PKCS #11 v2.20 amendment 1 */
exports.CKM_ACTI = 0x000002A0;
exports.CKM_ACTI_KEY_GEN = 0x000002A1;
/* All of the following mechanisms are new for v2.0 */
/* Note that CAST128 and CAST5 are the same algorithm */
exports.CKM_CAST_KEY_GEN = 0x00000300;
exports.CKM_CAST_ECB = 0x00000301;
exports.CKM_CAST_CBC = 0x00000302;
exports.CKM_CAST_MAC = 0x00000303;
exports.CKM_CAST_MAC_GENERAL = 0x00000304;
exports.CKM_CAST_CBC_PAD = 0x00000305;
exports.CKM_CAST3_KEY_GEN = 0x00000310;
exports.CKM_CAST3_ECB = 0x00000311;
exports.CKM_CAST3_CBC = 0x00000312;
exports.CKM_CAST3_MAC = 0x00000313;
exports.CKM_CAST3_MAC_GENERAL = 0x00000314;
exports.CKM_CAST3_CBC_PAD = 0x00000315;
exports.CKM_CAST5_KEY_GEN = 0x00000320;
exports.CKM_CAST128_KEY_GEN = 0x00000320;
exports.CKM_CAST5_ECB = 0x00000321;
exports.CKM_CAST128_ECB = 0x00000321;
exports.CKM_CAST5_CBC = 0x00000322;
exports.CKM_CAST128_CBC = 0x00000322;
exports.CKM_CAST5_MAC = 0x00000323;
exports.CKM_CAST128_MAC = 0x00000323;
exports.CKM_CAST5_MAC_GENERAL = 0x00000324;
exports.CKM_CAST128_MAC_GENERAL = 0x00000324;
exports.CKM_CAST5_CBC_PAD = 0x00000325;
exports.CKM_CAST128_CBC_PAD = 0x00000325;
exports.CKM_RC5_KEY_GEN = 0x00000330;
exports.CKM_RC5_ECB = 0x00000331;
exports.CKM_RC5_CBC = 0x00000332;
exports.CKM_RC5_MAC = 0x00000333;
exports.CKM_RC5_MAC_GENERAL = 0x00000334;
exports.CKM_RC5_CBC_PAD = 0x00000335;
exports.CKM_IDEA_KEY_GEN = 0x00000340;
exports.CKM_IDEA_ECB = 0x00000341;
exports.CKM_IDEA_CBC = 0x00000342;
exports.CKM_IDEA_MAC = 0x00000343;
exports.CKM_IDEA_MAC_GENERAL = 0x00000344;
exports.CKM_IDEA_CBC_PAD = 0x00000345;
exports.CKM_GENERIC_SECRET_KEY_GEN = 0x00000350;
exports.CKM_CONCATENATE_BASE_AND_KEY = 0x00000360;
exports.CKM_CONCATENATE_BASE_AND_DATA = 0x00000362;
exports.CKM_CONCATENATE_DATA_AND_BASE = 0x00000363;
exports.CKM_XOR_BASE_AND_DATA = 0x00000364;
exports.CKM_EXTRACT_KEY_FROM_KEY = 0x00000365;
exports.CKM_SSL3_PRE_MASTER_KEY_GEN = 0x00000370;
exports.CKM_SSL3_MASTER_KEY_DERIVE = 0x00000371;
exports.CKM_SSL3_KEY_AND_MAC_DERIVE = 0x00000372;
/* CKM_SSL3_MASTER_KEY_DERIVE_DH, CKM_TLS_PRE_MASTER_KEY_GEN,
 * CKM_TLS_MASTER_KEY_DERIVE, CKM_TLS_KEY_AND_MAC_DERIVE, and
 * CKM_TLS_MASTER_KEY_DERIVE_DH are new for v2.11 */
exports.CKM_SSL3_MASTER_KEY_DERIVE_DH = 0x00000373;
exports.CKM_TLS_PRE_MASTER_KEY_GEN = 0x00000374;
exports.CKM_TLS_MASTER_KEY_DERIVE = 0x00000375;
exports.CKM_TLS_KEY_AND_MAC_DERIVE = 0x00000376;
exports.CKM_TLS_MASTER_KEY_DERIVE_DH = 0x00000377;
/* CKM_TLS_PRF is new for v2.20 */
exports.CKM_TLS_PRF = 0x00000378;
exports.CKM_SSL3_MD5_MAC = 0x00000380;
exports.CKM_SSL3_SHA1_MAC = 0x00000381;
exports.CKM_MD5_KEY_DERIVATION = 0x00000390;
exports.CKM_MD2_KEY_DERIVATION = 0x00000391;
exports.CKM_SHA1_KEY_DERIVATION = 0x00000392;
/* CKM_SHA256/384/512 are new for v2.20 */
exports.CKM_SHA256_KEY_DERIVATION = 0x00000393;
exports.CKM_SHA384_KEY_DERIVATION = 0x00000394;
exports.CKM_SHA512_KEY_DERIVATION = 0x00000395;
/* SHA-224 key derivation is new for PKCS #11 v2.20 amendment 3 */
exports.CKM_SHA224_KEY_DERIVATION = 0x00000396;
exports.CKM_PBE_MD2_DES_CBC = 0x000003A0;
exports.CKM_PBE_MD5_DES_CBC = 0x000003A1;
exports.CKM_PBE_MD5_CAST_CBC = 0x000003A2;
exports.CKM_PBE_MD5_CAST3_CBC = 0x000003A3;
exports.CKM_PBE_MD5_CAST5_CBC = 0x000003A4;
exports.CKM_PBE_MD5_CAST128_CBC = 0x000003A4;
exports.CKM_PBE_SHA1_CAST5_CBC = 0x000003A5;
exports.CKM_PBE_SHA1_CAST128_CBC = 0x000003A5;
exports.CKM_PBE_SHA1_RC4_128 = 0x000003A6;
exports.CKM_PBE_SHA1_RC4_40 = 0x000003A7;
exports.CKM_PBE_SHA1_DES3_EDE_CBC = 0x000003A8;
exports.CKM_PBE_SHA1_DES2_EDE_CBC = 0x000003A9;
exports.CKM_PBE_SHA1_RC2_128_CBC = 0x000003AA;
exports.CKM_PBE_SHA1_RC2_40_CBC = 0x000003AB;
/* CKM_PKCS5_PBKD2 is new for v2.10 */
exports.CKM_PKCS5_PBKD2 = 0x000003B0;
exports.CKM_PBA_SHA1_WITH_SHA1_HMAC = 0x000003C0;
/* WTLS mechanisms are new for v2.20 */
exports.CKM_WTLS_PRE_MASTER_KEY_GEN = 0x000003D0;
exports.CKM_WTLS_MASTER_KEY_DERIVE = 0x000003D1;
exports.CKM_WTLS_MASTER_KEY_DERIVE_DH_ECC = 0x000003D2;
exports.CKM_WTLS_PRF = 0x000003D3;
exports.CKM_WTLS_SERVER_KEY_AND_MAC_DERIVE = 0x000003D4;
exports.CKM_WTLS_CLIENT_KEY_AND_MAC_DERIVE = 0x000003D5;
exports.CKM_KEY_WRAP_LYNKS = 0x00000400;
exports.CKM_KEY_WRAP_SET_OAEP = 0x00000401;
/* CKM_CMS_SIG is new for v2.20 */
exports.CKM_CMS_SIG = 0x00000500;
/* CKM_KIP mechanisms are new for PKCS #11 v2.20 amendment 2 */
exports.CKM_KIP_DERIVE = 0x00000510;
exports.CKM_KIP_WRAP = 0x00000511;
exports.CKM_KIP_MAC = 0x00000512;
/* Camellia is new for PKCS #11 v2.20 amendment 3 */
exports.CKM_CAMELLIA_KEY_GEN = 0x00000550;
exports.CKM_CAMELLIA_ECB = 0x00000551;
exports.CKM_CAMELLIA_CBC = 0x00000552;
exports.CKM_CAMELLIA_MAC = 0x00000553;
exports.CKM_CAMELLIA_MAC_GENERAL = 0x00000554;
exports.CKM_CAMELLIA_CBC_PAD = 0x00000555;
exports.CKM_CAMELLIA_ECB_ENCRYPT_DATA = 0x00000556;
exports.CKM_CAMELLIA_CBC_ENCRYPT_DATA = 0x00000557;
exports.CKM_CAMELLIA_CTR = 0x00000558;
/* ARIA is new for PKCS #11 v2.20 amendment 3 */
exports.CKM_ARIA_KEY_GEN = 0x00000560;
exports.CKM_ARIA_ECB = 0x00000561;
exports.CKM_ARIA_CBC = 0x00000562;
exports.CKM_ARIA_MAC = 0x00000563;
exports.CKM_ARIA_MAC_GENERAL = 0x00000564;
exports.CKM_ARIA_CBC_PAD = 0x00000565;
exports.CKM_ARIA_ECB_ENCRYPT_DATA = 0x00000566;
exports.CKM_ARIA_CBC_ENCRYPT_DATA = 0x00000567;
/* Fortezza mechanisms */
exports.CKM_SKIPJACK_KEY_GEN = 0x00001000;
exports.CKM_SKIPJACK_ECB64 = 0x00001001;
exports.CKM_SKIPJACK_CBC64 = 0x00001002;
exports.CKM_SKIPJACK_OFB64 = 0x00001003;
exports.CKM_SKIPJACK_CFB64 = 0x00001004;
exports.CKM_SKIPJACK_CFB32 = 0x00001005;
exports.CKM_SKIPJACK_CFB16 = 0x00001006;
exports.CKM_SKIPJACK_CFB8 = 0x00001007;
exports.CKM_SKIPJACK_WRAP = 0x00001008;
exports.CKM_SKIPJACK_PRIVATE_WRAP = 0x00001009;
exports.CKM_SKIPJACK_RELAYX = 0x0000100a;
exports.CKM_KEA_KEY_PAIR_GEN = 0x00001010;
exports.CKM_KEA_KEY_DERIVE = 0x00001011;
exports.CKM_FORTEZZA_TIMESTAMP = 0x00001020;
exports.CKM_BATON_KEY_GEN = 0x00001030;
exports.CKM_BATON_ECB128 = 0x00001031;
exports.CKM_BATON_ECB96 = 0x00001032;
exports.CKM_BATON_CBC128 = 0x00001033;
exports.CKM_BATON_COUNTER = 0x00001034;
exports.CKM_BATON_SHUFFLE = 0x00001035;
exports.CKM_BATON_WRAP = 0x00001036;
/* CKM_ECDSA_KEY_PAIR_GEN is deprecated in v2.11,
 * CKM_EC_KEY_PAIR_GEN is preferred */
exports.CKM_ECDSA_KEY_PAIR_GEN = 0x00001040;
exports.CKM_EC_KEY_PAIR_GEN = 0x00001040;
exports.CKM_ECDSA = 0x00001041;
exports.CKM_ECDSA_SHA1 = 0x00001042;
/* CKM_ECDH1_DERIVE, CKM_ECDH1_COFACTOR_DERIVE, and CKM_ECMQV_DERIVE
 * are new for v2.11 */
exports.CKM_ECDH1_DERIVE = 0x00001050;
exports.CKM_ECDH1_COFACTOR_DERIVE = 0x00001051;
exports.CKM_ECMQV_DERIVE = 0x00001052;
exports.CKM_JUNIPER_KEY_GEN = 0x00001060;
exports.CKM_JUNIPER_ECB128 = 0x00001061;
exports.CKM_JUNIPER_CBC128 = 0x00001062;
exports.CKM_JUNIPER_COUNTER = 0x00001063;
exports.CKM_JUNIPER_SHUFFLE = 0x00001064;
exports.CKM_JUNIPER_WRAP = 0x00001065;
exports.CKM_FASTHASH = 0x00001070;
/* CKM_AES_KEY_GEN, CKM_AES_ECB, CKM_AES_CBC, CKM_AES_MAC,
 * CKM_AES_MAC_GENERAL, CKM_AES_CBC_PAD, CKM_DSA_PARAMETER_GEN,
 * CKM_DH_PKCS_PARAMETER_GEN, and CKM_X9_42_DH_PARAMETER_GEN are
 * new for v2.11 */
exports.CKM_AES_KEY_GEN = 0x00001080;
exports.CKM_AES_ECB = 0x00001081;
exports.CKM_AES_CBC = 0x00001082;
exports.CKM_AES_MAC = 0x00001083;
exports.CKM_AES_MAC_GENERAL = 0x00001084;
exports.CKM_AES_CBC_PAD = 0x00001085;
/* AES counter mode is new for PKCS #11 v2.20 amendment 3 */
exports.CKM_AES_CTR = 0x00001086;
/* BlowFish and TwoFish are new for v2.20 */
exports.CKM_BLOWFISH_KEY_GEN = 0x00001090;
exports.CKM_BLOWFISH_CBC = 0x00001091;
exports.CKM_TWOFISH_KEY_GEN = 0x00001092;
exports.CKM_TWOFISH_CBC = 0x00001093;
/* CKM_xxx_ENCRYPT_DATA mechanisms are new for v2.20 */
exports.CKM_DES_ECB_ENCRYPT_DATA = 0x00001100;
exports.CKM_DES_CBC_ENCRYPT_DATA = 0x00001101;
exports.CKM_DES3_ECB_ENCRYPT_DATA = 0x00001102;
exports.CKM_DES3_CBC_ENCRYPT_DATA = 0x00001103;
exports.CKM_AES_ECB_ENCRYPT_DATA = 0x00001104;
exports.CKM_AES_CBC_ENCRYPT_DATA = 0x00001105;
exports.CKM_DSA_PARAMETER_GEN = 0x00002000;
exports.CKM_DH_PKCS_PARAMETER_GEN = 0x00002001;
exports.CKM_X9_42_DH_PARAMETER_GEN = 0x00002002;
exports.CKM_VENDOR_DEFINED = 0x80000000;
exports.CK_MECHANISM_TYPE_PTR = Ref.refType(exports.CK_MECHANISM_TYPE);
/**
 * CK_MECHANISM is a structure that specifies a particular mechanism
 */
exports.CK_MECHANISM = RefStruct({
    mechanism: exports.CK_MECHANISM_TYPE,
    pParameter: exports.CK_VOID_PTR,
    /* ulParameterLen was changed from CK_USHORT to CK_ULONG for
     * v2.0 */
    ulParameterLen: exports.CK_ULONG,
});
exports.CK_MECHANISM_PTR = Ref.refType(exports.CK_MECHANISM);
/**
 * CK_MECHANISM_INFO provides information about a particular mechanism
 */
exports.CK_MECHANISM_INFO = RefStruct({
    ulMinKeySize: exports.CK_ULONG,
    ulMaxKeySize: exports.CK_ULONG,
    flags: exports.CK_FLAGS
});
/* The flags are defined as follows:
 *      Bit Flag               Mask        Meaning */
exports.CKF_HW = 0x00000001; /* performed by HW */
/* The flags CKF_ENCRYPT, CKF_DECRYPT, CKF_DIGEST, CKF_SIGN,
 * CKG_SIGN_RECOVER, CKF_VERIFY, CKF_VERIFY_RECOVER,
 * CKF_GENERATE, CKF_GENERATE_KEY_PAIR, CKF_WRAP, CKF_UNWRAP,
 * and CKF_DERIVE are new for v2.0.  They specify whether or not
 * a mechanism can be used for a particular task */
exports.CKF_ENCRYPT = 0x00000100;
exports.CKF_DECRYPT = 0x00000200;
exports.CKF_DIGEST = 0x00000400;
exports.CKF_SIGN = 0x00000800;
exports.CKF_SIGN_RECOVER = 0x00001000;
exports.CKF_VERIFY = 0x00002000;
exports.CKF_VERIFY_RECOVER = 0x00004000;
exports.CKF_GENERATE = 0x00008000;
exports.CKF_GENERATE_KEY_PAIR = 0x00010000;
exports.CKF_WRAP = 0x00020000;
exports.CKF_UNWRAP = 0x00040000;
exports.CKF_DERIVE = 0x00080000;
/* CKF_EC_F_P, CKF_EC_F_2M, CKF_EC_ECPARAMETERS, CKF_EC_NAMEDCURVE,
 * CKF_EC_UNCOMPRESS, and CKF_EC_COMPRESS are new for v2.11. They
 * describe a token's EC capabilities not available in mechanism
 * information. */
exports.CKF_EC_F_P = 0x00100000;
exports.CKF_EC_F_2M = 0x00200000;
exports.CKF_EC_ECPARAMETERS = 0x00400000;
exports.CKF_EC_NAMEDCURVE = 0x00800000;
exports.CKF_EC_UNCOMPRESS = 0x01000000;
exports.CKF_EC_COMPRESS = 0x02000000;
exports.CKF_EXTENSION = 0x80000000; /* FALSE for this version */
exports.CK_MECHANISM_INFO_PTR = Ref.refType(exports.CK_MECHANISM_INFO);
/* CK_RV is a value that identifies the return value of a
 * Cryptoki function */
/* CK_RV was changed from CK_USHORT to CK_ULONG for v2.0 */
exports.CK_RV = exports.CK_ULONG;
exports.CKR_OK = 0x00000000;
exports.CKR_CANCEL = 0x00000001;
exports.CKR_HOST_MEMORY = 0x00000002;
exports.CKR_SLOT_ID_INVALID = 0x00000003;
/* CKR_FLAGS_INVALID was removed for v2.0 */
/* CKR_GENERAL_ERROR and CKR_FUNCTION_FAILED are new for v2.0 */
exports.CKR_GENERAL_ERROR = 0x00000005;
exports.CKR_FUNCTION_FAILED = 0x00000006;
/* CKR_ARGUMENTS_BAD, CKR_NO_EVENT, CKR_NEED_TO_CREATE_THREADS,
 * and CKR_CANT_LOCK are new for v2.01 */
exports.CKR_ARGUMENTS_BAD = 0x00000007;
exports.CKR_NO_EVENT = 0x00000008;
exports.CKR_NEED_TO_CREATE_THREADS = 0x00000009;
exports.CKR_CANT_LOCK = 0x0000000A;
exports.CKR_ATTRIBUTE_READ_ONLY = 0x00000010;
exports.CKR_ATTRIBUTE_SENSITIVE = 0x00000011;
exports.CKR_ATTRIBUTE_TYPE_INVALID = 0x00000012;
exports.CKR_ATTRIBUTE_VALUE_INVALID = 0x00000013;
exports.CKR_DATA_INVALID = 0x00000020;
exports.CKR_DATA_LEN_RANGE = 0x00000021;
exports.CKR_DEVICE_ERROR = 0x00000030;
exports.CKR_DEVICE_MEMORY = 0x00000031;
exports.CKR_DEVICE_REMOVED = 0x00000032;
exports.CKR_ENCRYPTED_DATA_INVALID = 0x00000040;
exports.CKR_ENCRYPTED_DATA_LEN_RANGE = 0x00000041;
exports.CKR_FUNCTION_CANCELED = 0x00000050;
exports.CKR_FUNCTION_NOT_PARALLEL = 0x00000051;
/* CKR_FUNCTION_NOT_SUPPORTED is new for v2.0 */
exports.CKR_FUNCTION_NOT_SUPPORTED = 0x00000054;
exports.CKR_KEY_HANDLE_INVALID = 0x00000060;
/* CKR_KEY_SENSITIVE was removed for v2.0 */
exports.CKR_KEY_SIZE_RANGE = 0x00000062;
exports.CKR_KEY_TYPE_INCONSISTENT = 0x00000063;
/* CKR_KEY_NOT_NEEDED, CKR_KEY_CHANGED, CKR_KEY_NEEDED,
 * CKR_KEY_INDIGESTIBLE, CKR_KEY_FUNCTION_NOT_PERMITTED,
 * CKR_KEY_NOT_WRAPPABLE, and CKR_KEY_UNEXTRACTABLE are new for
 * v2.0 */
exports.CKR_KEY_NOT_NEEDED = 0x00000064;
exports.CKR_KEY_CHANGED = 0x00000065;
exports.CKR_KEY_NEEDED = 0x00000066;
exports.CKR_KEY_INDIGESTIBLE = 0x00000067;
exports.CKR_KEY_FUNCTION_NOT_PERMITTED = 0x00000068;
exports.CKR_KEY_NOT_WRAPPABLE = 0x00000069;
exports.CKR_KEY_UNEXTRACTABLE = 0x0000006A;
exports.CKR_MECHANISM_INVALID = 0x00000070;
exports.CKR_MECHANISM_PARAM_INVALID = 0x00000071;
/* CKR_OBJECT_CLASS_INCONSISTENT and CKR_OBJECT_CLASS_INVALID
 * were removed for v2.0 */
exports.CKR_OBJECT_HANDLE_INVALID = 0x00000082;
exports.CKR_OPERATION_ACTIVE = 0x00000090;
exports.CKR_OPERATION_NOT_INITIALIZED = 0x00000091;
exports.CKR_PIN_INCORRECT = 0x000000A0;
exports.CKR_PIN_INVALID = 0x000000A1;
exports.CKR_PIN_LEN_RANGE = 0x000000A2;
/* CKR_PIN_EXPIRED and CKR_PIN_LOCKED are new for v2.0 */
exports.CKR_PIN_EXPIRED = 0x000000A3;
exports.CKR_PIN_LOCKED = 0x000000A4;
exports.CKR_SESSION_CLOSED = 0x000000B0;
exports.CKR_SESSION_COUNT = 0x000000B1;
exports.CKR_SESSION_HANDLE_INVALID = 0x000000B3;
exports.CKR_SESSION_PARALLEL_NOT_SUPPORTED = 0x000000B4;
exports.CKR_SESSION_READ_ONLY = 0x000000B5;
exports.CKR_SESSION_EXISTS = 0x000000B6;
/* CKR_SESSION_READ_ONLY_EXISTS and
 * CKR_SESSION_READ_WRITE_SO_EXISTS are new for v2.0 */
exports.CKR_SESSION_READ_ONLY_EXISTS = 0x000000B7;
exports.CKR_SESSION_READ_WRITE_SO_EXISTS = 0x000000B8;
exports.CKR_SIGNATURE_INVALID = 0x000000C0;
exports.CKR_SIGNATURE_LEN_RANGE = 0x000000C1;
exports.CKR_TEMPLATE_INCOMPLETE = 0x000000D0;
exports.CKR_TEMPLATE_INCONSISTENT = 0x000000D1;
exports.CKR_TOKEN_NOT_PRESENT = 0x000000E0;
exports.CKR_TOKEN_NOT_RECOGNIZED = 0x000000E1;
exports.CKR_TOKEN_WRITE_PROTECTED = 0x000000E2;
exports.CKR_UNWRAPPING_KEY_HANDLE_INVALID = 0x000000F0;
exports.CKR_UNWRAPPING_KEY_SIZE_RANGE = 0x000000F1;
exports.CKR_UNWRAPPING_KEY_TYPE_INCONSISTENT = 0x000000F2;
exports.CKR_USER_ALREADY_LOGGED_IN = 0x00000100;
exports.CKR_USER_NOT_LOGGED_IN = 0x00000101;
exports.CKR_USER_PIN_NOT_INITIALIZED = 0x00000102;
exports.CKR_USER_TYPE_INVALID = 0x00000103;
/* CKR_USER_ANOTHER_ALREADY_LOGGED_IN and CKR_USER_TOO_MANY_TYPES
 * are new to v2.01 */
exports.CKR_USER_ANOTHER_ALREADY_LOGGED_IN = 0x00000104;
exports.CKR_USER_TOO_MANY_TYPES = 0x00000105;
exports.CKR_WRAPPED_KEY_INVALID = 0x00000110;
exports.CKR_WRAPPED_KEY_LEN_RANGE = 0x00000112;
exports.CKR_WRAPPING_KEY_HANDLE_INVALID = 0x00000113;
exports.CKR_WRAPPING_KEY_SIZE_RANGE = 0x00000114;
exports.CKR_WRAPPING_KEY_TYPE_INCONSISTENT = 0x00000115;
exports.CKR_RANDOM_SEED_NOT_SUPPORTED = 0x00000120;
/* These are new to v2.0 */
exports.CKR_RANDOM_NO_RNG = 0x00000121;
/* These are new to v2.11 */
exports.CKR_DOMAIN_PARAMS_INVALID = 0x00000130;
/* These are new to v2.0 */
exports.CKR_BUFFER_TOO_SMALL = 0x00000150;
exports.CKR_SAVED_STATE_INVALID = 0x00000160;
exports.CKR_INFORMATION_SENSITIVE = 0x00000170;
exports.CKR_STATE_UNSAVEABLE = 0x00000180;
/* These are new to v2.01 */
exports.CKR_CRYPTOKI_NOT_INITIALIZED = 0x00000190;
exports.CKR_CRYPTOKI_ALREADY_INITIALIZED = 0x00000191;
exports.CKR_MUTEX_BAD = 0x000001A0;
exports.CKR_MUTEX_NOT_LOCKED = 0x000001A1;
/* The following return values are new for PKCS #11 v2.20 amendment 3 */
exports.CKR_NEW_PIN_MODE = 0x000001B0;
exports.CKR_NEXT_OTP = 0x000001B1;
/* This is new to v2.20 */
exports.CKR_FUNCTION_REJECTED = 0x00000200;
exports.CKR_VENDOR_DEFINED = 0x80000000;
/**
 * CK_NOTIFY is an application callback that processes events
 */
exports.CK_NOTIFY = Ffi.Function(exports.CK_RV, [
    exports.CK_SESSION_HANDLE,
    exports.CK_NOTIFICATION,
    exports.CK_VOID_PTR /* passed to C_OpenSession */
]);
/**
 * CK_FUNCTION_LIST is a structure holding a Cryptoki spec
 * version and pointers of appropriate types to all the
 * Cryptoki functions
 */
/* CK_FUNCTION_LIST is new for v2.0 */
// export const CK_FUNCTION_LIST = CK_FUNCTION_LIST;
// export const CK_FUNCTION_LIST_PTR = Ref.refType(CK_FUNCTION_LIST);
// export const CK_FUNCTION_LIST_PTR_PTR = Ref.refType(CK_FUNCTION_LIST_PTR);
/**
 * CK_CREATEMUTEX is an application callback for creating a
 * mutex object
 */
exports.CK_CREATEMUTEX = Ffi.Function(exports.CK_RV, [
    exports.CK_VOID_PTR_PTR /* location to receive ptr to mutex */
]);
/**
 * CK_DESTROYMUTEX is an application callback for destroying a
 * mutex object
 */
exports.CK_DESTROYMUTEX = Ffi.Function(exports.CK_RV, [
    exports.CK_VOID_PTR /* pointer to mutex */
]);
/**
 * CK_LOCKMUTEX is an application callback for locking a mutex
 */
exports.CK_LOCKMUTEX = Ffi.Function(exports.CK_RV, [
    exports.CK_VOID_PTR /* pointer to mutex */
]);
/**
 * CK_UNLOCKMUTEX is an application callback for unlocking a
 * mutex
 */
exports.CK_UNLOCKMUTEX = Ffi.Function(exports.CK_RV, [
    exports.CK_VOID_PTR /* pointer to mutex */
]);
/**
 * CK_C_INITIALIZE_ARGS provides the optional arguments to
 * C_Initialize
 */
exports.CK_C_INITIALIZE_ARGS = RefStruct({
    CreateMutex: exports.CK_CREATEMUTEX,
    DestroyMutex: exports.CK_DESTROYMUTEX,
    LockMutex: exports.CK_LOCKMUTEX,
    UnlockMutex: exports.CK_UNLOCKMUTEX,
    flags: exports.CK_FLAGS,
    pReserved: exports.CK_VOID_PTR
});
/* flags: bit flags that provide capabilities of the slot
 *      Bit Flag                           Mask       Meaning
 */
exports.CKF_LIBRARY_CANT_CREATE_OS_THREADS = 0x00000001;
exports.CKF_OS_LOCKING_OK = 0x00000002;
exports.CK_C_INITIALIZE_ARGS_PTR = Ref.refType(exports.CK_C_INITIALIZE_ARGS);
/* additional flags for parameters to functions */
/**
 * CKF_DONT_BLOCK is for the function C_WaitForSlotEvent
 */
exports.CKF_DONT_BLOCK = 1;
/**
 * CK_RSA_PKCS_OAEP_MGF_TYPE is new for v2.10.
 * CK_RSA_PKCS_OAEP_MGF_TYPE  is used to indicate the Message
 * Generation Function (MGF) applied to a message block when
 * formatting a message block for the PKCS #1 OAEP encryption
 * scheme.
 */
exports.CK_RSA_PKCS_MGF_TYPE = exports.CK_ULONG;
exports.CK_RSA_PKCS_MGF_TYPE_PTR = Ref.refType(exports.CK_RSA_PKCS_MGF_TYPE);
/* The following MGFs are defined */
/* CKG_MGF1_SHA256, CKG_MGF1_SHA384, and CKG_MGF1_SHA512
 * are new for v2.20 */
exports.CKG_MGF1_SHA1 = 0x00000001;
exports.CKG_MGF1_SHA256 = 0x00000002;
exports.CKG_MGF1_SHA384 = 0x00000003;
exports.CKG_MGF1_SHA512 = 0x00000004;
/* SHA-224 is new for PKCS #11 v2.20 amendment 3 */
exports.CKG_MGF1_SHA224 = 0x00000005;
/**
 * CK_RSA_PKCS_OAEP_SOURCE_TYPE is new for v2.10.
 * CK_RSA_PKCS_OAEP_SOURCE_TYPE  is used to indicate the source
 * of the encoding parameter when formatting a message block
 * for the PKCS #1 OAEP encryption scheme.
 */
exports.CK_RSA_PKCS_OAEP_SOURCE_TYPE = exports.CK_ULONG;
exports.CK_RSA_PKCS_OAEP_SOURCE_TYPE_PTR = Ref.refType(exports.CK_RSA_PKCS_OAEP_SOURCE_TYPE);
/* The following encoding parameter sources are defined */
exports.CKZ_DATA_SPECIFIED = 0x00000001;
/**
 * CK_RSA_PKCS_OAEP_PARAMS is new for v2.10.
 * CK_RSA_PKCS_OAEP_PARAMS provides the parameters to the
 * CKM_RSA_PKCS_OAEP mechanism.
 */
exports.CK_RSA_PKCS_OAEP_PARAMS = RefStruct({
    hashAlg: exports.CK_MECHANISM_TYPE,
    mgf: exports.CK_RSA_PKCS_MGF_TYPE,
    source: exports.CK_RSA_PKCS_OAEP_SOURCE_TYPE,
    pSourceData: exports.CK_VOID_PTR,
    ulSourceDataLen: exports.CK_ULONG
});
exports.CK_RSA_PKCS_OAEP_PARAMS_PTR = Ref.refType(exports.CK_RSA_PKCS_OAEP_PARAMS);
/**
 * CK_RSA_PKCS_PSS_PARAMS is new for v2.11.
 * CK_RSA_PKCS_PSS_PARAMS provides the parameters to the
 * CKM_RSA_PKCS_PSS mechanism(s).
 */
exports.CK_RSA_PKCS_PSS_PARAMS = RefStruct({
    hashAlg: exports.CK_MECHANISM_TYPE,
    mgf: exports.CK_RSA_PKCS_MGF_TYPE,
    sLen: exports.CK_ULONG
});
exports.CK_RSA_PKCS_PSS_PARAMS_PTR = Ref.refType(exports.CK_RSA_PKCS_PSS_PARAMS);
/* CK_EC_KDF_TYPE is new for v2.11. */
exports.CK_EC_KDF_TYPE = exports.CK_ULONG;
/* The following EC Key Derivation Functions are defined */
exports.CKD_NULL = 0x00000001;
exports.CKD_SHA1_KDF = 0x00000002;
/**
 * CK_ECDH1_DERIVE_PARAMS is new for v2.11.
 * CK_ECDH1_DERIVE_PARAMS provides the parameters to the
 * CKM_ECDH1_DERIVE and CKM_ECDH1_COFACTOR_DERIVE mechanisms,
 * where each party contributes one key pair.
 */
exports.CK_ECDH1_DERIVE_PARAMS = RefStruct({
    kdf: exports.CK_EC_KDF_TYPE,
    ulSharedDataLen: exports.CK_ULONG,
    pSharedData: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR
});
exports.CK_ECDH1_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_ECDH1_DERIVE_PARAMS);
/**
 * CK_ECDH2_DERIVE_PARAMS is new for v2.11.
 * CK_ECDH2_DERIVE_PARAMS provides the parameters to the
 * CKM_ECMQV_DERIVE mechanism, where each party contributes two key pairs.
 */
exports.CK_ECDH2_DERIVE_PARAMS = RefStruct({
    kdf: exports.CK_EC_KDF_TYPE,
    ulSharedDataLen: exports.CK_ULONG,
    pSharedData: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR,
    ulPrivateDataLen: exports.CK_ULONG,
    hPrivateData: exports.CK_OBJECT_HANDLE,
    ulPublicDataLen2: exports.CK_ULONG,
    pPublicData2: exports.CK_BYTE_PTR
});
exports.CK_ECDH2_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_ECDH2_DERIVE_PARAMS);
exports.CK_ECMQV_DERIVE_PARAMS = RefStruct({
    kdf: exports.CK_EC_KDF_TYPE,
    ulSharedDataLen: exports.CK_ULONG,
    pSharedData: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR,
    ulPrivateDataLen: exports.CK_ULONG,
    hPrivateData: exports.CK_OBJECT_HANDLE,
    ulPublicDataLen2: exports.CK_ULONG,
    pPublicData2: exports.CK_BYTE_PTR,
    publicKey: exports.CK_OBJECT_HANDLE
});
exports.CK_ECMQV_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_ECMQV_DERIVE_PARAMS);
/* export consts and defines for the CKM_X9_42_DH_KEY_PAIR_GEN and the
 * CKM_X9_42_DH_PARAMETER_GEN mechanisms (new for PKCS #11 v2.11) */
exports.CK_X9_42_DH_KDF_TYPE = exports.CK_ULONG;
exports.CK_X9_42_DH_KDF_TYPE_PTR = Ref.refType(exports.CK_X9_42_DH_KDF_TYPE);
/* The following X9.42 DH key derivation functions are defined
   (besides CKD_NULL already defined : */
exports.CKD_SHA1_KDF_ASN1 = 0x00000003;
exports.CKD_SHA1_KDF_CONCATENATE = 0x00000004;
/**
 * CK_X9_42_DH1_DERIVE_PARAMS is new for v2.11.
 * CK_X9_42_DH1_DERIVE_PARAMS provides the parameters to the
 * CKM_X9_42_DH_DERIVE key derivation mechanism, where each party
 * contributes one key pair
 */
exports.CK_X9_42_DH1_DERIVE_PARAMS = RefStruct({
    kdf: exports.CK_X9_42_DH_KDF_TYPE,
    ulOtherInfoLen: exports.CK_ULONG,
    pOtherInfo: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR
});
exports.CK_X9_42_DH1_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_X9_42_DH1_DERIVE_PARAMS);
/**
 * CK_X9_42_DH2_DERIVE_PARAMS is new for v2.11.
 * CK_X9_42_DH2_DERIVE_PARAMS provides the parameters to the
 * CKM_X9_42_DH_HYBRID_DERIVE and CKM_X9_42_MQV_DERIVE key derivation
 * mechanisms, where each party contributes two key pairs
 */
exports.CK_X9_42_DH2_DERIVE_PARAMS = RefStruct({
    kdf: exports.CK_X9_42_DH_KDF_TYPE,
    ulOtherInfoLen: exports.CK_ULONG,
    pOtherInfo: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR,
    ulPrivateDataLen: exports.CK_ULONG,
    hPrivateData: exports.CK_OBJECT_HANDLE,
    ulPublicDataLen2: exports.CK_ULONG,
    pPublicData2: exports.CK_BYTE_PTR
});
exports.CK_X9_42_DH2_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_X9_42_DH2_DERIVE_PARAMS);
exports.CK_X9_42_MQV_DERIVE_PARAMS = RefStruct({
    kdf: exports.CK_X9_42_DH_KDF_TYPE,
    ulOtherInfoLen: exports.CK_ULONG,
    pOtherInfo: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR,
    ulPrivateDataLen: exports.CK_ULONG,
    hPrivateData: exports.CK_OBJECT_HANDLE,
    ulPublicDataLen2: exports.CK_ULONG,
    pPublicData2: exports.CK_BYTE_PTR,
    publicKey: exports.CK_OBJECT_HANDLE
});
exports.CK_X9_42_MQV_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_X9_42_MQV_DERIVE_PARAMS);
/**
 * CK_KEA_DERIVE_PARAMS provides the parameters to the
 * CKM_KEA_DERIVE mechanism
 * CK_KEA_DERIVE_PARAMS is new for v2.0
 */
exports.CK_KEA_DERIVE_PARAMS = RefStruct({
    isSender: exports.CK_BBOOL,
    ulRandomLen: exports.CK_ULONG,
    pRandomA: exports.CK_BYTE_PTR,
    pRandomB: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR
});
exports.CK_KEA_DERIVE_PARAMS_PTR = RefStruct(exports.CK_KEA_DERIVE_PARAMS);
/**
 * CK_RC2_PARAMS provides the parameters to the CKM_RC2_ECB and
 * CKM_RC2_MAC mechanisms.  An instance of CK_RC2_PARAMS just
 * holds the effective keysize
 */
exports.CK_RC2_PARAMS = exports.CK_ULONG;
exports.CK_RC2_PARAMS_PTR = Ref.refType(exports.CK_RC2_PARAMS);
/**
 * CK_RC2_CBC_PARAMS provides the parameters to the CKM_RC2_CBC mechanism
 */
exports.CK_RC2_CBC_PARAMS = RefStruct({
    /* ulEffectiveBits was changed from CK_USHORT to CK_ULONG for
     * v2.0 */
    ulEffectiveBits: exports.CK_ULONG,
    iv: RefArray(exports.CK_BYTE, 8) /* IV for CBC mode */
});
exports.CK_RC2_CBC_PARAMS_PTR = Ref.refType(exports.CK_RC2_CBC_PARAMS);
/**
 * CK_RC2_MAC_GENERAL_PARAMS provides the parameters for the
 * CKM_RC2_MAC_GENERAL mechanism
 * CK_RC2_MAC_GENERAL_PARAMS is new for v2.0
 */
exports.CK_RC2_MAC_GENERAL_PARAMS = RefStruct({
    ulEffectiveBits: exports.CK_ULONG,
    ulMacLength: exports.CK_ULONG /* Length of MAC in bytes */
});
exports.CK_RC2_MAC_GENERAL_PARAMS_PTR = Ref.refType(exports.CK_RC2_MAC_GENERAL_PARAMS);
/**
 * CK_RC5_PARAMS provides the parameters to the CKM_RC5_ECB and
 * CKM_RC5_MAC mechanisms
 * CK_RC5_PARAMS is new for v2.0
 */
exports.CK_RC5_PARAMS = RefStruct({
    ulWordsize: exports.CK_ULONG,
    ulRounds: exports.CK_ULONG /* number of rounds */
});
exports.CK_RC5_PARAMS_PTR = Ref.refType(exports.CK_RC5_PARAMS);
/**
 * CK_RC5_CBC_PARAMS provides the parameters to the CKM_RC5_CBC mechanism
 * CK_RC5_CBC_PARAMS is new for v2.0
 */
exports.CK_RC5_CBC_PARAMS = RefStruct({
    ulWordsize: exports.CK_ULONG,
    ulRounds: exports.CK_ULONG,
    pIv: exports.CK_BYTE_PTR,
    ulIvLen: exports.CK_ULONG /* length of IV in bytes */
});
exports.CK_RC5_CBC_PARAMS_PTR = Ref.refType(exports.CK_RC5_CBC_PARAMS);
/**
 * CK_RC5_MAC_GENERAL_PARAMS provides the parameters for the
 * CKM_RC5_MAC_GENERAL mechanism
 * CK_RC5_MAC_GENERAL_PARAMS is new for v2.0
 */
exports.CK_RC5_MAC_GENERAL_PARAMS = RefStruct({
    ulWordsize: exports.CK_ULONG,
    ulRounds: exports.CK_ULONG,
    ulMacLength: exports.CK_ULONG /* Length of MAC in bytes */
});
exports.CK_RC5_MAC_GENERAL_PARAMS_PTR = Ref.refType(exports.CK_RC5_MAC_GENERAL_PARAMS);
/**
 * CK_MAC_GENERAL_PARAMS provides the parameters to most block
 * ciphers' MAC_GENERAL mechanisms.  Its value is the length of
 * the MAC
 * CK_MAC_GENERAL_PARAMS is new for v2.0
 */
exports.CK_MAC_GENERAL_PARAMS = exports.CK_ULONG;
exports.CK_MAC_GENERAL_PARAMS_PTR = Ref.refType(exports.CK_MAC_GENERAL_PARAMS);
/* CK_DES/AES_ECB/CBC_ENCRYPT_DATA_PARAMS are new for v2.20 */
exports.CK_DES_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(exports.CK_BYTE, 8),
    pData: exports.CK_BYTE_PTR,
    length: exports.CK_ULONG
});
exports.CK_DES_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(exports.CK_DES_CBC_ENCRYPT_DATA_PARAMS);
exports.CK_AES_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(exports.CK_BYTE, 16),
    pData: exports.CK_BYTE_PTR,
    length: exports.CK_ULONG
});
exports.CK_AES_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(exports.CK_AES_CBC_ENCRYPT_DATA_PARAMS);
/**
 * CK_SKIPJACK_PRIVATE_WRAP_PARAMS provides the parameters to the
 * CKM_SKIPJACK_PRIVATE_WRAP mechanism
 * CK_SKIPJACK_PRIVATE_WRAP_PARAMS is new for v2.0
 */
exports.CK_SKIPJACK_PRIVATE_WRAP_PARAMS = RefStruct({
    ulPasswordLen: exports.CK_ULONG,
    pPassword: exports.CK_BYTE_PTR,
    ulPublicDataLen: exports.CK_ULONG,
    pPublicData: exports.CK_BYTE_PTR,
    ulPAndGLen: exports.CK_ULONG,
    ulQLen: exports.CK_ULONG,
    ulRandomLen: exports.CK_ULONG,
    pRandomA: exports.CK_BYTE_PTR,
    pPrimeP: exports.CK_BYTE_PTR,
    pBaseG: exports.CK_BYTE_PTR,
    pSubprimeQ: exports.CK_BYTE_PTR
});
exports.CK_SKIPJACK_PRIVATE_WRAP_PARAMS_PTR = Ref.refType(exports.CK_SKIPJACK_PRIVATE_WRAP_PARAMS);
/**
 * CK_SKIPJACK_RELAYX_PARAMS provides the parameters to the
 * CKM_SKIPJACK_RELAYX mechanism
 * CK_SKIPJACK_RELAYX_PARAMS is new for v2.0
 */
exports.CK_SKIPJACK_RELAYX_PARAMS = RefStruct({
    ulOldWrappedXLen: exports.CK_ULONG,
    pOldWrappedX: exports.CK_BYTE_PTR,
    ulOldPasswordLen: exports.CK_ULONG,
    pOldPassword: exports.CK_BYTE_PTR,
    ulOldPublicDataLen: exports.CK_ULONG,
    pOldPublicData: exports.CK_BYTE_PTR,
    ulOldRandomLen: exports.CK_ULONG,
    pOldRandomA: exports.CK_BYTE_PTR,
    ulNewPasswordLen: exports.CK_ULONG,
    pNewPassword: exports.CK_BYTE_PTR,
    ulNewPublicDataLen: exports.CK_ULONG,
    pNewPublicData: exports.CK_BYTE_PTR,
    ulNewRandomLen: exports.CK_ULONG,
    pNewRandomA: exports.CK_BYTE_PTR
});
exports.CK_SKIPJACK_RELAYX_PARAMS_PTR = Ref.refType(exports.CK_SKIPJACK_RELAYX_PARAMS);
exports.CK_PBE_PARAMS = RefStruct({
    pInitVector: exports.CK_BYTE_PTR,
    pPassword: exports.CK_UTF8CHAR_PTR,
    ulPasswordLen: exports.CK_ULONG,
    pSalt: exports.CK_BYTE_PTR,
    ulSaltLen: exports.CK_ULONG,
    ulIteration: exports.CK_ULONG
});
exports.CK_PBE_PARAMS_PTR = Ref.refType(exports.CK_PBE_PARAMS);
/**
 * CK_KEY_WRAP_SET_OAEP_PARAMS provides the parameters to the
 * CKM_KEY_WRAP_SET_OAEP mechanism
 * CK_KEY_WRAP_SET_OAEP_PARAMS is new for v2.0
 */
exports.CK_KEY_WRAP_SET_OAEP_PARAMS = RefStruct({
    bBC: exports.CK_BYTE,
    pX: exports.CK_BYTE_PTR,
    ulXLen: exports.CK_ULONG /* length of extra data in bytes */
});
exports.CK_KEY_WRAP_SET_OAEP_PARAMS_PTR = Ref.refType(exports.CK_KEY_WRAP_SET_OAEP_PARAMS);
exports.CK_SSL3_RANDOM_DATA = RefStruct({
    pClientRandom: exports.CK_BYTE_PTR,
    ulClientRandomLen: exports.CK_ULONG,
    pServerRandom: exports.CK_BYTE_PTR,
    ulServerRandomLen: exports.CK_ULONG
});
exports.CK_SSL3_MASTER_KEY_DERIVE_PARAMS = RefStruct({
    RandomInfo: exports.CK_SSL3_RANDOM_DATA,
    pVersion: exports.CK_VERSION_PTR
});
exports.CK_SSL3_MASTER_KEY_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_SSL3_MASTER_KEY_DERIVE_PARAMS);
exports.CK_SSL3_KEY_MAT_OUT = RefStruct({
    hClientMacSecret: exports.CK_OBJECT_HANDLE,
    hServerMacSecret: exports.CK_OBJECT_HANDLE,
    hClientKey: exports.CK_OBJECT_HANDLE,
    hServerKey: exports.CK_OBJECT_HANDLE,
    pIVClient: exports.CK_BYTE_PTR,
    pIVServer: exports.CK_BYTE_PTR
});
exports.CK_SSL3_KEY_MAT_OUT_PTR = Ref.refType(exports.CK_SSL3_KEY_MAT_OUT);
exports.CK_SSL3_KEY_MAT_PARAMS = RefStruct({
    ulMacSizeInBits: exports.CK_ULONG,
    ulKeySizeInBits: exports.CK_ULONG,
    ulIVSizeInBits: exports.CK_ULONG,
    bIsExport: exports.CK_BBOOL,
    RandomInfo: exports.CK_SSL3_RANDOM_DATA,
    pReturnedKeyMaterial: exports.CK_SSL3_KEY_MAT_OUT_PTR
});
exports.CK_SSL3_KEY_MAT_PARAMS_PTR = Ref.refType(exports.CK_SSL3_KEY_MAT_PARAMS);
/**
 * CK_TLS_PRF_PARAMS is new for version 2.20
 */
exports.CK_TLS_PRF_PARAMS = RefStruct({
    pSeed: exports.CK_BYTE_PTR,
    ulSeedLen: exports.CK_ULONG,
    pLabel: exports.CK_BYTE_PTR,
    ulLabelLen: exports.CK_ULONG,
    pOutput: exports.CK_BYTE_PTR,
    pulOutputLen: exports.CK_ULONG_PTR
});
exports.CK_TLS_PRF_PARAMS_PTR = Ref.refType(exports.CK_TLS_PRF_PARAMS);
/**
 * WTLS is new for version 2.20
 */
exports.CK_WTLS_RANDOM_DATA = RefStruct({
    pClientRandom: exports.CK_BYTE_PTR,
    ulClientRandomLen: exports.CK_ULONG,
    pServerRandom: exports.CK_BYTE_PTR,
    ulServerRandomLen: exports.CK_ULONG,
});
exports.CK_WTLS_RANDOM_DATA_PTR = Ref.refType(exports.CK_WTLS_RANDOM_DATA);
exports.CK_WTLS_MASTER_KEY_DERIVE_PARAMS = RefStruct({
    DigestMechanism: exports.CK_MECHANISM_TYPE,
    RandomInfo: exports.CK_WTLS_RANDOM_DATA,
    pVersion: exports.CK_BYTE_PTR
});
exports.CK_WTLS_MASTER_KEY_DERIVE_PARAMS_PTR = Ref.refType(exports.CK_WTLS_MASTER_KEY_DERIVE_PARAMS);
exports.CK_WTLS_PRF_PARAMS = RefStruct({
    DigestMechanism: exports.CK_MECHANISM_TYPE,
    pSeed: exports.CK_BYTE_PTR,
    ulSeedLen: exports.CK_ULONG,
    pLabel: exports.CK_BYTE_PTR,
    ulLabelLen: exports.CK_ULONG,
    pOutput: exports.CK_BYTE_PTR,
    pulOutputLen: exports.CK_ULONG_PTR
});
exports.CK_WTLS_PRF_PARAMS_PTR = Ref.refType(exports.CK_WTLS_PRF_PARAMS);
exports.CK_WTLS_KEY_MAT_OUT = RefStruct({
    hMacSecret: exports.CK_OBJECT_HANDLE,
    hKey: exports.CK_OBJECT_HANDLE,
    pIV: exports.CK_BYTE_PTR
});
exports.CK_WTLS_KEY_MAT_OUT_PTR = Ref.refType(exports.CK_WTLS_KEY_MAT_OUT);
exports.CK_WTLS_KEY_MAT_PARAMS = RefStruct({
    DigestMechanism: exports.CK_MECHANISM_TYPE,
    ulMacSizeInBits: exports.CK_ULONG,
    ulKeySizeInBits: exports.CK_ULONG,
    ulIVSizeInBits: exports.CK_ULONG,
    ulSequenceNumber: exports.CK_ULONG,
    bIsExport: exports.CK_BBOOL,
    RandomInfo: exports.CK_WTLS_RANDOM_DATA,
    pReturnedKeyMaterial: exports.CK_WTLS_KEY_MAT_OUT_PTR
});
exports.CK_WTLS_KEY_MAT_PARAMS_PTR = Ref.refType(exports.CK_WTLS_KEY_MAT_PARAMS);
/**
 * CMS is new for version 2.20
 * */
exports.CK_CMS_SIG_PARAMS = RefStruct({
    certificateHandle: exports.CK_OBJECT_HANDLE,
    pSigningMechanism: exports.CK_MECHANISM_PTR,
    pDigestMechanism: exports.CK_MECHANISM_PTR,
    pContentType: exports.CK_UTF8CHAR_PTR,
    pRequestedAttributes: exports.CK_BYTE_PTR,
    ulRequestedAttributesLen: exports.CK_ULONG,
    pRequiredAttributes: exports.CK_BYTE_PTR,
    ulRequiredAttributesLen: exports.CK_ULONG
});
exports.CK_CMS_SIG_PARAMS_PTR = Ref.refType(exports.CK_CMS_SIG_PARAMS);
exports.CK_KEY_DERIVATION_STRING_DATA = RefStruct({
    pData: exports.CK_BYTE_PTR,
    ulLen: exports.CK_ULONG
});
exports.CK_KEY_DERIVATION_STRING_DATA_PTR = Ref.refType(exports.CK_KEY_DERIVATION_STRING_DATA);
/**
 * The CK_EXTRACT_PARAMS is used for the
 * CKM_EXTRACT_KEY_FROM_KEY mechanism.  It specifies which bit
 * of the base key should be used as the first bit of the
 * derived key
 * CK_EXTRACT_PARAMS is new for v2.0
 */
exports.CK_EXTRACT_PARAMS = exports.CK_ULONG;
exports.CK_EXTRACT_PARAMS_PTR = Ref.refType(exports.CK_EXTRACT_PARAMS);
/**
 * CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE is new for v2.10.
 * CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE is used to
 * indicate the Pseudo-Random Function (PRF) used to generate
 * key bits using PKCS #5 PBKDF2.
 */
exports.CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE = exports.CK_ULONG;
exports.CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE_PTR = Ref.refType(exports.CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE);
/* The following PRFs are defined in PKCS #5 v2.0. */
exports.CKP_PKCS5_PBKD2_HMAC_SHA1 = 0x00000001;
/* CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE is new for v2.10.
 * CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE is used to indicate the
 * source of the salt value when deriving a key using PKCS #5
 * PBKDF2. */
exports.CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE = exports.CK_ULONG;
exports.CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE_PTR = Ref.refType(exports.CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE);
/* The following salt value sources are defined in PKCS #5 v2.0. */
exports.CKZ_SALT_SPECIFIED = 0x00000001;
/* CK_PKCS5_PBKD2_PARAMS is new for v2.10.
 * CK_PKCS5_PBKD2_PARAMS is a structure that provides the
 * parameters to the CKM_PKCS5_PBKD2 mechanism. */
exports.CK_PKCS5_PBKD2_PARAMS = RefStruct({
    saltSource: exports.CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE,
    pSaltSourceData: exports.CK_VOID_PTR,
    ulSaltSourceDataLen: exports.CK_ULONG,
    iterations: exports.CK_ULONG,
    prf: exports.CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE,
    pPrfData: exports.CK_VOID_PTR,
    ulPrfDataLen: exports.CK_ULONG,
    pPassword: exports.CK_UTF8CHAR_PTR,
    ulPasswordLen: exports.CK_ULONG_PTR
});
exports.CK_PKCS5_PBKD2_PARAMS_PTR = Ref.refType(exports.CK_PKCS5_PBKD2_PARAMS);
/* All CK_OTP structs are new for PKCS #11 v2.20 amendment 3 */
exports.CK_OTP_PARAM_TYPE = exports.CK_ULONG;
exports.CK_PARAM_TYPE = exports.CK_OTP_PARAM_TYPE; /* B/w compatibility */
exports.CK_OTP_PARAM = RefStruct({
    type: exports.CK_OTP_PARAM_TYPE,
    pValue: exports.CK_VOID_PTR,
    ulValueLen: exports.CK_ULONG
});
exports.CK_OTP_PARAM_PTR = Ref.refType(exports.CK_OTP_PARAM);
exports.CK_OTP_PARAMS = RefStruct({
    pParams: exports.CK_OTP_PARAM_PTR,
    ulCount: exports.CK_ULONG
});
exports.CK_OTP_PARAMS_PTR = Ref.refType(exports.CK_OTP_PARAMS);
exports.CK_OTP_SIGNATURE_INFO = RefStruct({
    pParams: exports.CK_OTP_PARAM_PTR,
    ulCount: exports.CK_ULONG
});
exports.CK_OTP_SIGNATURE_INFO_PTR = Ref.refType(exports.CK_OTP_SIGNATURE_INFO);
/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1 */
exports.CK_OTP_VALUE = 0;
exports.CK_OTP_PIN = 1;
exports.CK_OTP_CHALLENGE = 2;
exports.CK_OTP_TIME = 3;
exports.CK_OTP_COUNTER = 4;
exports.CK_OTP_FLAGS = 5;
exports.CK_OTP_OUTPUT_LENGTH = 6;
exports.CK_OTP_OUTPUT_FORMAT = 7;
/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1 */
exports.CKF_NEXT_OTP = 0x00000001;
exports.CKF_EXCLUDE_TIME = 0x00000002;
exports.CKF_EXCLUDE_COUNTER = 0x00000004;
exports.CKF_EXCLUDE_CHALLENGE = 0x00000008;
exports.CKF_EXCLUDE_PIN = 0x00000010;
exports.CKF_USER_FRIENDLY_OTP = 0x00000020;
/* CK_KIP_PARAMS is new for PKCS #11 v2.20 amendment 2 */
exports.CK_KIP_PARAMS = RefStruct({
    pMechanism: exports.CK_MECHANISM_PTR,
    hKey: exports.CK_OBJECT_HANDLE,
    pSeed: exports.CK_BYTE_PTR,
    ulSeedLen: exports.CK_ULONG
});
exports.CK_KIP_PARAMS_PTR = Ref.refType(exports.CK_KIP_PARAMS);
/**
 * CK_AES_CTR_PARAMS is new for PKCS #11 v2.20 amendment 3
 */
exports.CK_AES_CTR_PARAMS = RefStruct({
    ulCounterBits: exports.CK_ULONG,
    cb: RefArray(exports.CK_BYTE, 16)
});
exports.CK_AES_CTR_PARAMS_PTR = Ref.refType(exports.CK_AES_CTR_PARAMS);
/* CK_CAMELLIA_CTR_PARAMS is new for PKCS #11 v2.20 amendment 3 */
exports.CK_CAMELLIA_CTR_PARAMS = RefStruct({
    ulCounterBits: exports.CK_ULONG,
    cb: RefArray(exports.CK_BYTE, 16)
});
exports.CK_CAMELLIA_CTR_PARAMS_PTR = Ref.refType(exports.CK_CAMELLIA_CTR_PARAMS);
/**
 * CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS is new for PKCS #11 v2.20 amendment 3
 */
exports.CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(exports.CK_BYTE, 16),
    pData: exports.CK_BYTE_PTR,
    length: exports.CK_ULONG
});
exports.CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(exports.CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS);
/**
 * CK_ARIA_CBC_ENCRYPT_DATA_PARAMS is new for PKCS #11 v2.20 amendment 3
 */
exports.CK_ARIA_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(exports.CK_BYTE, 16),
    pData: exports.CK_BYTE_PTR,
    length: exports.CK_ULONG
});
exports.CK_ARIA_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(exports.CK_ARIA_CBC_ENCRYPT_DATA_PARAMS);
//# sourceMappingURL=pkcs11t.js.map