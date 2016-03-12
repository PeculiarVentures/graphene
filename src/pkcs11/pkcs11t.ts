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

import * as Ffi from "ffi";
import * as Ref from "ref";
import * as RefStruct from "ref-struct";
import * as RefArray from "ref-array";

export const CRYPTOKI_VERSION_MAJOR = 2;
export const CRYPTOKI_VERSION_MINOR = 20;
export const CRYPTOKI_VERSION_AMENDMENT = 3;

export const CK_TRUE = 1;
export const CK_FALSE = 0;

/** 
 * an unsigned 8-bit value 
 */
export const CK_BYTE = "byte";

/**
 * an unsigned 8-bit character 
 */
export const CK_CHAR = CK_BYTE;

/** 
 * an 8-bit UTF-8 character 
 */
export const CK_UTF8CHAR = CK_BYTE;

/** 
 * a BYTE-sized Boolean flag 
 */
export const CK_BBOOL = CK_BYTE;

/**
 * an unsigned value, at least 32 bits long 
 */
export const CK_ULONG = "ulong";

/** 
 * a signed value, the same size as a CK_ULONG 
 * CK_LONG is new for v2.0
 */
export const CK_LONG = "long";

/**
 * at least 32 bits; each bit is a Boolean flag 
 */
export const CK_FLAGS = CK_ULONG;


/** 
 * some special values for certain CK_ULONG variables 
 */
export const CK_UNAVAILABLE_INFORMATION = (~0);
export const CK_EFFECTIVELY_INFINITE = 0;


export const CK_BYTE_PTR = Ref.refType(CK_BYTE);
export const CK_CHAR_PTR = Ref.refType(CK_CHAR);
export const CK_UTF8CHAR_PTR = Ref.refType(CK_UTF8CHAR);
export const CK_ULONG_PTR = Ref.refType(CK_ULONG);
export const CK_VOID_PTR = Ref.refType("void");

/** 
 * Pointer to a CK_VOID_PTR-- i.e., pointer to pointer to void 
 */
export const CK_VOID_PTR_PTR = Ref.refType(CK_VOID_PTR);

/**
 * The following value is always invalid if used as a session
 * handle or object handle 
 */
export const CK_INVALID_HANDLE = 0;


export const CK_VERSION = RefStruct({
    major: CK_BYTE, // integer portion of version number
    minor: CK_BYTE  // 1/100ths portion of version number
});

export const CK_VERSION_PTR = Ref.refType(CK_VERSION);

export const CK_INFO = RefStruct({
    /* manufacturerID and libraryDecription have been changed from
     * CK_CHAR to CK_UTF8CHAR for v2.10 */
    cryptokiVersion: CK_VERSION,                /* Cryptoki interface ver */
    manufacturerID: RefArray(CK_UTF8CHAR, 32),  /* blank padded */
    flags: CK_FLAGS,                            /* must be zero */

    /* libraryDescription and libraryVersion are new for v2.0 */
    libraryDescription: RefArray(CK_UTF8CHAR, 32),  /* blank padded */
    libraryVersion: CK_VERSION                      /* version of library */
});

export const CK_INFO_PTR = Ref.refType(CK_INFO);

/** 
 * CK_NOTIFICATION enumerates the types of notifications that
 * Cryptoki provides to an application
 * CK_NOTIFICATION has been changed from an enum to a CK_ULONG
 * for v2.0 
 */
export const CK_NOTIFICATION = CK_ULONG;
export const CKN_SURRENDER = 0;

/**
 * The following notification is new for PKCS #11 v2.20 amendment 3 
 */
export const CKN_OTP_CHANGED = 1;


export const CK_SLOT_ID = CK_ULONG;

export const CK_SLOT_ID_PTR = Ref.refType(CK_SLOT_ID);


/** 
 * CK_SLOT_INFO provides information about a slot 
 */
export const CK_SLOT_INFO = RefStruct({
    /* slotDescription and manufacturerID have been changed from
     * CK_CHAR to CK_UTF8CHAR for v2.10 */
    slotDescription: RefArray(CK_UTF8CHAR, 64),  /* blank padded */
    manufacturerID: RefArray(CK_UTF8CHAR, 32),   /* blank padded */
    flags: CK_FLAGS,

    /* hardwareVersion and firmwareVersion are new for v2.0 */
    hardwareVersion: CK_VERSION,  /* version of hardware */
    firmwareVersion: CK_VERSION   /* version of firmware */
});

/* flags: bit flags that provide capabilities of the slot
 *      Bit Flag              Mask        Meaning
 */
export const CKF_TOKEN_PRESENT = 0x00000001;       /* a token is there */
export const CKF_REMOVABLE_DEVICE = 0x00000002;    /* removable devices*/
export const CKF_HW_SLOT = 0x00000004;             /* hardware slot */

export const CK_SLOT_INFO_PTR = Ref.refType(CK_SLOT_INFO);

/**
 * CK_TOKEN_INFO provides information about a token 
 */
export const CK_TOKEN_INFO = RefStruct({
    /* label, manufacturerID, and model have been changed from
     * CK_CHAR to CK_UTF8CHAR for v2.10 */
    label: RefArray(CK_UTF8CHAR, 32),           /* blank padded */
    manufacturerID: RefArray(CK_UTF8CHAR, 32),  /* blank padded */
    model: RefArray(CK_UTF8CHAR, 16),           /* blank padded */
    serialNumber: RefArray(CK_CHAR, 16),    /* blank padded */
    flags: CK_FLAGS,               /* see below */

    /* ulMaxSessionCount, ulSessionCount, ulMaxRwSessionCount,
     * ulRwSessionCount, ulMaxPinLen, and ulMinPinLen have all been
     * changed from CK_USHORT to CK_ULONG for v2.0 */
    ulMaxSessionCount: CK_ULONG,     /* max open sessions */
    ulSessionCount: CK_ULONG,        /* sess. now open */
    ulMaxRwSessionCount: CK_ULONG,   /* max R/W sessions */
    ulRwSessionCount: CK_ULONG,      /* R/W sess. now open */
    ulMaxPinLen: CK_ULONG,           /* in bytes */
    ulMinPinLen: CK_ULONG,           /* in bytes */
    ulTotalPublicMemory: CK_ULONG,   /* in bytes */
    ulFreePublicMemory: CK_ULONG,    /* in bytes */
    ulTotalPrivateMemory: CK_ULONG,  /* in bytes */
    ulFreePrivateMemory: CK_ULONG,   /* in bytes */

    /* hardwareVersion, firmwareVersion, and time are new for
     * v2.0 */
    hardwareVersion: CK_VERSION,       /* version of hardware */
    firmwareVersion: CK_VERSION,       /* version of firmware */
    utcTime: RefArray(CK_CHAR, 16)     /* time */
});

/* The flags parameter is defined as follows:
 *      Bit Flag                    Mask        Meaning
 */
/**
 * has random generator
 */
export const CKF_RNG = 0x00000001;
/**
 * token is write-protected
 */
export const CKF_WRITE_PROTECTED = 0x00000002;
/**
 * user must login
 */
export const CKF_LOGIN_REQUIRED = 0x00000004;
/**
 * normal user's PIN is set 
 */
export const CKF_USER_PIN_INITIALIZED = 0x00000008;

/** 
 * CKF_RESTORE_KEY_NOT_NEEDED is new for v2.0.  If it is set,
 * that means that *every* time the state of cryptographic
 * operations of a session is successfully saved, all keys
 * needed to continue those operations are stored in the state */
export const CKF_RESTORE_KEY_NOT_NEEDED = 0x00000020;

/** 
 * CKF_CLOCK_ON_TOKEN is new for v2.0.  If it is set, that means
 * that the token has some sort of clock.  The time on that
 * clock is returned in the token info structure 
 */
export const CKF_CLOCK_ON_TOKEN = 0x00000040;

/**
 * CKF_PROTECTED_AUTHENTICATION_PATH is new for v2.0.  If it is
 * set, that means that there is some way for the user to login
 * without sending a PIN through the Cryptoki library itself 
 */
export const CKF_PROTECTED_AUTHENTICATION_PATH = 0x00000100;

/** 
 * CKF_DUAL_CRYPTO_OPERATIONS is new for v2.0.  If it is true,
 * that means that a single session with the token can perform
 * dual simultaneous cryptographic operations (digest and
 * encrypt; decrypt and digest; sign and encrypt; and decrypt
 * and sign) 
 */
export const CKF_DUAL_CRYPTO_OPERATIONS = 0x00000200;

/** 
 * CKF_TOKEN_INITIALIZED if new for v2.10. If it is true, the
 * token has been initialized using C_InitializeToken or an
 * equivalent mechanism outside the scope of PKCS #11.
 * Calling C_InitializeToken when this flag is set will cause
 * the token to be reinitialized. 
 */
export const CKF_TOKEN_INITIALIZED = 0x00000400;

/** 
 * CKF_SECONDARY_AUTHENTICATION if new for v2.10. If it is
 * true, the token supports secondary authentication for
 * private key objects. This flag is deprecated in v2.11 and
 * onwards. 
 */
export const CKF_SECONDARY_AUTHENTICATION = 0x00000800;

/** 
 * CKF_USER_PIN_COUNT_LOW if new for v2.10. If it is true, an
 * incorrect user login PIN has been entered at least once
 * since the last successful authentication. 
 */
export const CKF_USER_PIN_COUNT_LOW = 0x00010000;

/** 
 * CKF_USER_PIN_FINAL_TRY if new for v2.10. If it is true,
 * supplying an incorrect user PIN will it to become locked. 
 */
export const CKF_USER_PIN_FINAL_TRY = 0x00020000;

/** 
 * CKF_USER_PIN_LOCKED if new for v2.10. If it is true, the
 * user PIN has been locked. User login to the token is not
 * possible. 
 */
export const CKF_USER_PIN_LOCKED = 0x00040000;

/**
 * CKF_USER_PIN_TO_BE_CHANGED if new for v2.10. If it is true,
 * the user PIN value is the default value set by token
 * initialization or manufacturing, or the PIN has been
 * expired by the card. 
 */
export const CKF_USER_PIN_TO_BE_CHANGED = 0x00080000;

/** 
 * CKF_SO_PIN_COUNT_LOW if new for v2.10. If it is true, an
 * incorrect SO login PIN has been entered at least once since
 * the last successful authentication. 
 */
export const CKF_SO_PIN_COUNT_LOW = 0x00100000;

/** 
 * CKF_SO_PIN_FINAL_TRY if new for v2.10. If it is true,
 * supplying an incorrect SO PIN will it to become locked. 
 */
export const CKF_SO_PIN_FINAL_TRY = 0x00200000;

/**
 * CKF_SO_PIN_LOCKED if new for v2.10. If it is true, the SO
 * PIN has been locked. SO login to the token is not possible.
 */
export const CKF_SO_PIN_LOCKED = 0x00400000;

/**
 * CKF_SO_PIN_TO_BE_CHANGED if new for v2.10. If it is true,
 * the SO PIN value is the default value set by token
 * initialization or manufacturing, or the PIN has been
 * expired by the card. 
 */
export const CKF_SO_PIN_TO_BE_CHANGED = 0x00800000;

export const CK_TOKEN_INFO_PTR = Ref.refType(CK_TOKEN_INFO);


/** 
 * CK_SESSION_HANDLE is a Cryptoki-assigned value that
 * identifies a session 
 */
export const CK_SESSION_HANDLE = CK_ULONG;

export const CK_SESSION_HANDLE_PTR = Ref.refType(CK_SESSION_HANDLE);

/**
 * CK_USER_TYPE enumerates the types of Cryptoki users
 * CK_USER_TYPE has been changed from an enum to a CK_ULONG for
 * v2.0 
 */
export const CK_USER_TYPE = CK_ULONG;
/** 
 * Security Officer 
 */
export const CKU_SO = 0;
/** 
 * Normal user 
 */
export const CKU_USER = 1;
/** 
 * Context specific (added in v2.20) 
 */
export const CKU_CONTEXT_SPECIFIC = 2;

/** 
 * CK_STATE enumerates the session states
 * CK_STATE has been changed from an enum to a CK_ULONG for
 * v2.0 
 */
export const CK_STATE = CK_ULONG;
export const CKS_RO_PUBLIC_SESSION = 0;
export const CKS_RO_USER_FUNCTIONS = 1;
export const CKS_RW_PUBLIC_SESSION = 2;
export const CKS_RW_USER_FUNCTIONS = 3;
export const CKS_RW_SO_FUNCTIONS = 4;


/**
 * CK_SESSION_INFO provides information about a session 
 */
export const CK_SESSION_INFO = RefStruct({
    slotID: CK_SLOT_ID,
    state: CK_STATE,
    flags: CK_FLAGS,          /* see below */

    /* ulDeviceError was changed from CK_USHORT to CK_ULONG for
     * v2.0 */
    ulDeviceError: CK_ULONG  /* device-dependent error code */
});

/* The flags are defined in the following table:
 *      Bit Flag                Mask        Meaning
 */
/**
 * session is r/w
 */
export const CKF_RW_SESSION = 0x00000002;
/**
 * no parallel
 */
export const CKF_SERIAL_SESSION = 0x00000004;

export const CK_SESSION_INFO_PTR = Ref.refType(CK_SESSION_INFO);


/** 
 * CK_OBJECT_HANDLE is a token-specific identifier for an
 * object
 */
export const CK_OBJECT_HANDLE = CK_ULONG;

export const CK_OBJECT_HANDLE_PTR = Ref.refType(CK_OBJECT_HANDLE);


/** CK_OBJECT_CLASS is a value that identifies the classes (or
 * types) of objects that Cryptoki recognizes.  It is defined
 * as follows:
 * CK_OBJECT_CLASS was changed from CK_USHORT to CK_ULONG for
 * v2.0 
 */
export const CK_OBJECT_CLASS = CK_ULONG;

/* The following classes of objects are defined: */
/* CKO_HW_FEATURE is new for v2.10 */
/* CKO_DOMAIN_PARAMETERS is new for v2.11 */
/* CKO_MECHANISM is new for v2.20 */
export const CKO_DATA = 0x00000000;
export const CKO_CERTIFICATE = 0x00000001;
export const CKO_PUBLIC_KEY = 0x00000002;
export const CKO_PRIVATE_KEY = 0x00000003;
export const CKO_SECRET_KEY = 0x00000004;
export const CKO_HW_FEATURE = 0x00000005;
export const CKO_DOMAIN_PARAMETERS = 0x00000006;
export const CKO_MECHANISM = 0x00000007;

/* CKO_OTP_KEY is new for PKCS #11 v2.20 amendment 1 */
export const CKO_OTP_KEY = 0x00000008;

export const CKO_VENDOR_DEFINED = 0x80000000;

export const CK_OBJECT_CLASS_PTR = Ref.refType(CK_OBJECT_CLASS);

/**
 * CK_HW_FEATURE_TYPE is new for v2.10. CK_HW_FEATURE_TYPE is a
 * value that identifies the hardware feature type of an object
 * with CK_OBJECT_CLASS equal to CKO_HW_FEATURE. 
 */
export const CK_HW_FEATURE_TYPE = CK_ULONG;

/* The following hardware feature types are defined */
/* CKH_USER_INTERFACE is new for v2.20 */
export const CKH_MONOTONIC_COUNTER = 0x00000001;
export const CKH_CLOCK = 0x00000002;
export const CKH_USER_INTERFACE = 0x00000003;
export const CKH_VENDOR_DEFINED = 0x80000000;

/**
 * CK_KEY_TYPE is a value that identifies a key type 
 * CK_KEY_TYPE was changed from CK_USHORT to CK_ULONG for v2.0 
 */
export const CK_KEY_TYPE = CK_ULONG;

/* the following key types are defined: */
export const CKK_RSA = 0x00000000;
export const CKK_DSA = 0x00000001;
export const CKK_DH = 0x00000002;

/* CKK_ECDSA and CKK_KEA are new for v2.0 */
/* CKK_ECDSA is deprecated in v2.11, CKK_EC is preferred. */
export const CKK_ECDSA = 0x00000003;
export const CKK_EC = 0x00000003;
export const CKK_X9_42_DH = 0x00000004;
export const CKK_KEA = 0x00000005;

export const CKK_GENERIC_SECRET = 0x00000010;
export const CKK_RC2 = 0x00000011;
export const CKK_RC4 = 0x00000012;
export const CKK_DES = 0x00000013;
export const CKK_DES2 = 0x00000014;
export const CKK_DES3 = 0x00000015;

/* all these key types are new for v2.0 */
export const CKK_CAST = 0x00000016;
export const CKK_CAST3 = 0x00000017;
/* CKK_CAST5 is deprecated in v2.11, CKK_CAST128 is preferred. */
export const CKK_CAST5 = 0x00000018;
export const CKK_CAST128 = 0x00000018;
export const CKK_RC5 = 0x00000019;
export const CKK_IDEA = 0x0000001A;
export const CKK_SKIPJACK = 0x0000001B;
export const CKK_BATON = 0x0000001C;
export const CKK_JUNIPER = 0x0000001D;
export const CKK_CDMF = 0x0000001E;
export const CKK_AES = 0x0000001F;

/* BlowFish and TwoFish are new for v2.20 */
export const CKK_BLOWFISH = 0x00000020;
export const CKK_TWOFISH = 0x00000021;

/* SecurID, HOTP, and ACTI are new for PKCS #11 v2.20 amendment 1 */
export const CKK_SECURID = 0x00000022;
export const CKK_HOTP = 0x00000023;
export const CKK_ACTI = 0x00000024;

/* Camellia is new for PKCS #11 v2.20 amendment 3 */
export const CKK_CAMELLIA = 0x00000025;
/* ARIA is new for PKCS #11 v2.20 amendment 3 */
export const CKK_ARIA = 0x00000026;

export const CKK_GOSTR3410 = 0x00000030;
export const CKK_GOSTR3411 = 0x00000031;
export const CKK_GOST28147 = 0x00000032;


export const CKK_VENDOR_DEFINED = 0x80000000;

/**
 * CK_CERTIFICATE_TYPE is a value that identifies a certificate type
 * CK_CERTIFICATE_TYPE was changed from CK_USHORT to CK_ULONG for v2.0 
 */
export const CK_CERTIFICATE_TYPE = CK_ULONG;

/* The following certificate types are defined: */
/* CKC_X_509_ATTR_CERT is new for v2.10 */
/* CKC_WTLS is new for v2.20 */
export const CKC_X_509 = 0x00000000;
export const CKC_X_509_ATTR_CERT = 0x00000001;
export const CKC_WTLS = 0x00000002;
export const CKC_VENDOR_DEFINED = 0x80000000;


/** 
 * CK_ATTRIBUTE_TYPE is a value that identifies an attribute type
/* CK_ATTRIBUTE_TYPE was changed from CK_USHORT to CK_ULONG for v2.0 
 */
export const CK_ATTRIBUTE_TYPE = CK_ULONG;

/* The CKF_ARRAY_ATTRIBUTE flag identifies an attribute which
   consists of an array of values. */
export const CKF_ARRAY_ATTRIBUTE = 0x40000000;

/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1
   and relates to the CKA_OTP_FORMAT attribute */
export const CK_OTP_FORMAT_DECIMAL = 0;
export const CK_OTP_FORMAT_HEXADECIMAL = 1;
export const CK_OTP_FORMAT_ALPHANUMERIC = 2;
export const CK_OTP_FORMAT_BINARY = 3;

/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1
   and relates to the CKA_OTP_..._REQUIREMENT attributes */
export const CK_OTP_PARAM_IGNORED = 0;
export const CK_OTP_PARAM_OPTIONAL = 1;
export const CK_OTP_PARAM_MANDATORY = 2;

/* The following attribute types are defined: */
export const CKA_CLASS = 0x00000000;
export const CKA_TOKEN = 0x00000001;
export const CKA_PRIVATE = 0x00000002;
export const CKA_LABEL = 0x00000003;
export const CKA_APPLICATION = 0x00000010;
export const CKA_VALUE = 0x00000011;

/* CKA_OBJECT_ID is new for v2.10 */
export const CKA_OBJECT_ID = 0x00000012;

export const CKA_CERTIFICATE_TYPE = 0x00000080;
export const CKA_ISSUER = 0x00000081;
export const CKA_SERIAL_NUMBER = 0x00000082;

/* CKA_AC_ISSUER, CKA_OWNER, and CKA_ATTR_TYPES are new
 * for v2.10 */
export const CKA_AC_ISSUER = 0x00000083;
export const CKA_OWNER = 0x00000084;
export const CKA_ATTR_TYPES = 0x00000085;

/* CKA_TRUSTED is new for v2.11 */
export const CKA_TRUSTED = 0x00000086;

/* CKA_CERTIFICATE_CATEGORY ...
 * CKA_CHECK_VALUE are new for v2.20 */
export const CKA_CERTIFICATE_CATEGORY = 0x00000087;
export const CKA_JAVA_MIDP_SECURITY_DOMAIN = 0x00000088;
export const CKA_URL = 0x00000089;
export const CKA_HASH_OF_SUBJECT_PUBLIC_KEY = 0x0000008A;
export const CKA_HASH_OF_ISSUER_PUBLIC_KEY = 0x0000008B;
export const CKA_NAME_HASH_ALGORITHM = 0x0000008C;
export const CKA_CHECK_VALUE = 0x00000090;

export const CKA_KEY_TYPE = 0x00000100;
export const CKA_SUBJECT = 0x00000101;
export const CKA_ID = 0x00000102;
export const CKA_SENSITIVE = 0x00000103;
export const CKA_ENCRYPT = 0x00000104;
export const CKA_DECRYPT = 0x00000105;
export const CKA_WRAP = 0x00000106;
export const CKA_UNWRAP = 0x00000107;
export const CKA_SIGN = 0x00000108;
export const CKA_SIGN_RECOVER = 0x00000109;
export const CKA_VERIFY = 0x0000010A;
export const CKA_VERIFY_RECOVER = 0x0000010B;
export const CKA_DERIVE = 0x0000010C;
export const CKA_START_DATE = 0x00000110;
export const CKA_END_DATE = 0x00000111;
export const CKA_MODULUS = 0x00000120;
export const CKA_MODULUS_BITS = 0x00000121;
export const CKA_PUBLIC_EXPONENT = 0x00000122;
export const CKA_PRIVATE_EXPONENT = 0x00000123;
export const CKA_PRIME_1 = 0x00000124;
export const CKA_PRIME_2 = 0x00000125;
export const CKA_EXPONENT_1 = 0x00000126;
export const CKA_EXPONENT_2 = 0x00000127;
export const CKA_COEFFICIENT = 0x00000128;
export const CKA_PRIME = 0x00000130;
export const CKA_SUBPRIME = 0x00000131;
export const CKA_BASE = 0x00000132;

/* CKA_PRIME_BITS and CKA_SUB_PRIME_BITS are new for v2.11 */
export const CKA_PRIME_BITS = 0x00000133;
export const CKA_SUBPRIME_BITS = 0x00000134;
export const CKA_SUB_PRIME_BITS = CKA_SUBPRIME_BITS;
/* (To retain backwards-compatibility) */

export const CKA_VALUE_BITS = 0x00000160;
export const CKA_VALUE_LEN = 0x00000161;

/* CKA_EXTRACTABLE, CKA_LOCAL, CKA_NEVER_EXTRACTABLE,
 * CKA_ALWAYS_SENSITIVE, CKA_MODIFIABLE, CKA_ECDSA_PARAMS,
 * and CKA_EC_POINT are new for v2.0 */
export const CKA_EXTRACTABLE = 0x00000162;
export const CKA_LOCAL = 0x00000163;
export const CKA_NEVER_EXTRACTABLE = 0x00000164;
export const CKA_ALWAYS_SENSITIVE = 0x00000165;

/* CKA_KEY_GEN_MECHANISM is new for v2.11 */
export const CKA_KEY_GEN_MECHANISM = 0x00000166;

export const CKA_MODIFIABLE = 0x00000170;

/* CKA_ECDSA_PARAMS is deprecated in v2.11,
 * CKA_EC_PARAMS is preferred. */
export const CKA_ECDSA_PARAMS = 0x00000180;
export const CKA_EC_PARAMS = 0x00000180;

export const CKA_EC_POINT = 0x00000181;

/* CKA_SECONDARY_AUTH, CKA_AUTH_PIN_FLAGS,
 * are new for v2.10. Deprecated in v2.11 and onwards. */
export const CKA_SECONDARY_AUTH = 0x00000200;
export const CKA_AUTH_PIN_FLAGS = 0x00000201;

/* CKA_ALWAYS_AUTHENTICATE ...
 * CKA_UNWRAP_TEMPLATE are new for v2.20 */
export const CKA_ALWAYS_AUTHENTICATE = 0x00000202;

export const CKA_WRAP_WITH_TRUSTED = 0x00000210;
export const CKA_WRAP_TEMPLATE = (CKF_ARRAY_ATTRIBUTE | 0x00000211);
export const CKA_UNWRAP_TEMPLATE = (CKF_ARRAY_ATTRIBUTE | 0x00000212);

/* CKA_OTP... atttributes are new for PKCS #11 v2.20 amendment 3. */
export const CKA_OTP_FORMAT = 0x00000220;
export const CKA_OTP_LENGTH = 0x00000221;
export const CKA_OTP_TIME_INTERVAL = 0x00000222;
export const CKA_OTP_USER_FRIENDLY_MODE = 0x00000223;
export const CKA_OTP_CHALLENGE_REQUIREMENT = 0x00000224;
export const CKA_OTP_TIME_REQUIREMENT = 0x00000225;
export const CKA_OTP_COUNTER_REQUIREMENT = 0x00000226;
export const CKA_OTP_PIN_REQUIREMENT = 0x00000227;
export const CKA_OTP_COUNTER = 0x0000022E;
export const CKA_OTP_TIME = 0x0000022F;
export const CKA_OTP_USER_IDENTIFIER = 0x0000022A;
export const CKA_OTP_SERVICE_IDENTIFIER = 0x0000022B;
export const CKA_OTP_SERVICE_LOGO = 0x0000022C;
export const CKA_OTP_SERVICE_LOGO_TYPE = 0x0000022D;


/* CKA_HW_FEATURE_TYPE, CKA_RESET_ON_INIT, and CKA_HAS_RESET
 * are new for v2.10 */
export const CKA_HW_FEATURE_TYPE = 0x00000300;
export const CKA_RESET_ON_INIT = 0x00000301;
export const CKA_HAS_RESET = 0x00000302;

/* The following attributes are new for v2.20 */
export const CKA_PIXEL_X = 0x00000400;
export const CKA_PIXEL_Y = 0x00000401;
export const CKA_RESOLUTION = 0x00000402;
export const CKA_CHAR_ROWS = 0x00000403;
export const CKA_CHAR_COLUMNS = 0x00000404;
export const CKA_COLOR = 0x00000405;
export const CKA_BITS_PER_PIXEL = 0x00000406;
export const CKA_CHAR_SETS = 0x00000480;
export const CKA_ENCODING_METHODS = 0x00000481;
export const CKA_MIME_TYPES = 0x00000482;
export const CKA_MECHANISM_TYPE = 0x00000500;
export const CKA_REQUIRED_CMS_ATTRIBUTES = 0x00000501;
export const CKA_DEFAULT_CMS_ATTRIBUTES = 0x00000502;
export const CKA_SUPPORTED_CMS_ATTRIBUTES = 0x00000503;
export const CKA_ALLOWED_MECHANISMS = (CKF_ARRAY_ATTRIBUTE | 0x00000600);

export const CKA_VENDOR_DEFINED = 0x80000000;

/**
 * CK_ATTRIBUTE is a structure that includes the type, length
 * and value of an attribute 
 */
export const CK_ATTRIBUTE = RefStruct({
    type: CK_ATTRIBUTE_TYPE,
    pValue: CK_VOID_PTR,

    /* ulValueLen went from CK_USHORT to CK_ULONG for v2.0 */
    ulValueLen: CK_ULONG  /* in bytes */
});

export const CK_ATTRIBUTE_PTR = Ref.refType(CK_ATTRIBUTE);


/**
 * CK_DATE is a structure that defines a date 
 */
export const CK_DATE = RefStruct({
    year: RefArray(CK_CHAR, 4),   /* the year ("1900" - "9999") */
    month: RefArray(CK_CHAR, 2),  /* the month ("01" - "12") */
    day: RefArray(CK_CHAR, 2)     /* the day   ("01" - "31") */
});

/**
 * CK_MECHANISM_TYPE is a value that identifies a mechanism type
 * CK_MECHANISM_TYPE was changed from CK_USHORT to CK_ULONG for v2.0
 */
export const CK_MECHANISM_TYPE = CK_ULONG;

/* the following mechanism types are defined: */
export const CKM_RSA_PKCS_KEY_PAIR_GEN = 0x00000000;
export const CKM_RSA_PKCS = 0x00000001;
export const CKM_RSA_9796 = 0x00000002;
export const CKM_RSA_X_509 = 0x00000003;

/* CKM_MD2_RSA_PKCS, CKM_MD5_RSA_PKCS, and CKM_SHA1_RSA_PKCS
 * are new for v2.0.  They are mechanisms which hash and sign */
export const CKM_MD2_RSA_PKCS = 0x00000004;
export const CKM_MD5_RSA_PKCS = 0x00000005;
export const CKM_SHA1_RSA_PKCS = 0x00000006;

/* CKM_RIPEMD128_RSA_PKCS, CKM_RIPEMD160_RSA_PKCS, and
 * CKM_RSA_PKCS_OAEP are new for v2.10 */
export const CKM_RIPEMD128_RSA_PKCS = 0x00000007;
export const CKM_RIPEMD160_RSA_PKCS = 0x00000008;
export const CKM_RSA_PKCS_OAEP = 0x00000009;

/* CKM_RSA_X9_31_KEY_PAIR_GEN, CKM_RSA_X9_31, CKM_SHA1_RSA_X9_31,
 * CKM_RSA_PKCS_PSS, and CKM_SHA1_RSA_PKCS_PSS are new for v2.11 */
export const CKM_RSA_X9_31_KEY_PAIR_GEN = 0x0000000A;
export const CKM_RSA_X9_31 = 0x0000000B;
export const CKM_SHA1_RSA_X9_31 = 0x0000000C;
export const CKM_RSA_PKCS_PSS = 0x0000000D;
export const CKM_SHA1_RSA_PKCS_PSS = 0x0000000E;

export const CKM_DSA_KEY_PAIR_GEN = 0x00000010;
export const CKM_DSA = 0x00000011;
export const CKM_DSA_SHA1 = 0x00000012;
export const CKM_DSA_SHA224 = 0x00000013;
export const CKM_DSA_SHA256 = 0x00000014;
export const CKM_DSA_SHA384 = 0x00000015;
export const CKM_DSA_SHA512 = 0x00000016;
export const CKM_DH_PKCS_KEY_PAIR_GEN = 0x00000020;
export const CKM_DH_PKCS_DERIVE = 0x00000021;

/* CKM_X9_42_DH_KEY_PAIR_GEN, CKM_X9_42_DH_DERIVE,
 * CKM_X9_42_DH_HYBRID_DERIVE, and CKM_X9_42_MQV_DERIVE are new for
 * v2.11 */
export const CKM_X9_42_DH_KEY_PAIR_GEN = 0x00000030;
export const CKM_X9_42_DH_DERIVE = 0x00000031;
export const CKM_X9_42_DH_HYBRID_DERIVE = 0x00000032;
export const CKM_X9_42_MQV_DERIVE = 0x00000033;

/* CKM_SHA256/384/512 are new for v2.20 */
export const CKM_SHA256_RSA_PKCS = 0x00000040;
export const CKM_SHA384_RSA_PKCS = 0x00000041;
export const CKM_SHA512_RSA_PKCS = 0x00000042;
export const CKM_SHA256_RSA_PKCS_PSS = 0x00000043;
export const CKM_SHA384_RSA_PKCS_PSS = 0x00000044;
export const CKM_SHA512_RSA_PKCS_PSS = 0x00000045;

/* SHA-224 RSA mechanisms are new for PKCS #11 v2.20 amendment 3 */
export const CKM_SHA224_RSA_PKCS = 0x00000046;
export const CKM_SHA224_RSA_PKCS_PSS = 0x00000047;

export const CKM_RC2_KEY_GEN = 0x00000100;
export const CKM_RC2_ECB = 0x00000101;
export const CKM_RC2_CBC = 0x00000102;
export const CKM_RC2_MAC = 0x00000103;

/* CKM_RC2_MAC_GENERAL and CKM_RC2_CBC_PAD are new for v2.0 */
export const CKM_RC2_MAC_GENERAL = 0x00000104;
export const CKM_RC2_CBC_PAD = 0x00000105;

export const CKM_RC4_KEY_GEN = 0x00000110;
export const CKM_RC4 = 0x00000111;
export const CKM_DES_KEY_GEN = 0x00000120;
export const CKM_DES_ECB = 0x00000121;
export const CKM_DES_CBC = 0x00000122;
export const CKM_DES_MAC = 0x00000123;

/* CKM_DES_MAC_GENERAL and CKM_DES_CBC_PAD are new for v2.0 */
export const CKM_DES_MAC_GENERAL = 0x00000124;
export const CKM_DES_CBC_PAD = 0x00000125;

export const CKM_DES2_KEY_GEN = 0x00000130;
export const CKM_DES3_KEY_GEN = 0x00000131;
export const CKM_DES3_ECB = 0x00000132;
export const CKM_DES3_CBC = 0x00000133;
export const CKM_DES3_MAC = 0x00000134;

/* CKM_DES3_MAC_GENERAL, CKM_DES3_CBC_PAD, CKM_CDMF_KEY_GEN,
 * CKM_CDMF_ECB, CKM_CDMF_CBC, CKM_CDMF_MAC,
 * CKM_CDMF_MAC_GENERAL, and CKM_CDMF_CBC_PAD are new for v2.0 */
export const CKM_DES3_MAC_GENERAL = 0x00000135;
export const CKM_DES3_CBC_PAD = 0x00000136;
export const CKM_CDMF_KEY_GEN = 0x00000140;
export const CKM_CDMF_ECB = 0x00000141;
export const CKM_CDMF_CBC = 0x00000142;
export const CKM_CDMF_MAC = 0x00000143;
export const CKM_CDMF_MAC_GENERAL = 0x00000144;
export const CKM_CDMF_CBC_PAD = 0x00000145;

/* the following four DES mechanisms are new for v2.20 */
export const CKM_DES_OFB64 = 0x00000150;
export const CKM_DES_OFB8 = 0x00000151;
export const CKM_DES_CFB64 = 0x00000152;
export const CKM_DES_CFB8 = 0x00000153;

export const CKM_MD2 = 0x00000200;

/* CKM_MD2_HMAC and CKM_MD2_HMAC_GENERAL are new for v2.0 */
export const CKM_MD2_HMAC = 0x00000201;
export const CKM_MD2_HMAC_GENERAL = 0x00000202;

export const CKM_MD5 = 0x00000210;

/* CKM_MD5_HMAC and CKM_MD5_HMAC_GENERAL are new for v2.0 */
export const CKM_MD5_HMAC = 0x00000211;
export const CKM_MD5_HMAC_GENERAL = 0x00000212;

export const CKM_SHA_1 = 0x00000220;

/* CKM_SHA_1_HMAC and CKM_SHA_1_HMAC_GENERAL are new for v2.0 */
export const CKM_SHA_1_HMAC = 0x00000221;
export const CKM_SHA_1_HMAC_GENERAL = 0x00000222;

/* CKM_RIPEMD128, CKM_RIPEMD128_HMAC,
 * CKM_RIPEMD128_HMAC_GENERAL, CKM_RIPEMD160, CKM_RIPEMD160_HMAC,
 * and CKM_RIPEMD160_HMAC_GENERAL are new for v2.10 */
export const CKM_RIPEMD128 = 0x00000230;
export const CKM_RIPEMD128_HMAC = 0x00000231;
export const CKM_RIPEMD128_HMAC_GENERAL = 0x00000232;
export const CKM_RIPEMD160 = 0x00000240;
export const CKM_RIPEMD160_HMAC = 0x00000241;
export const CKM_RIPEMD160_HMAC_GENERAL = 0x00000242;

/* CKM_SHA256/384/512 are new for v2.20 */
export const CKM_SHA256 = 0x00000250;
export const CKM_SHA256_HMAC = 0x00000251;
export const CKM_SHA256_HMAC_GENERAL = 0x00000252;

/* SHA-224 is new for PKCS #11 v2.20 amendment 3 */
export const CKM_SHA224 = 0x00000255;
export const CKM_SHA224_HMAC = 0x00000256;
export const CKM_SHA224_HMAC_GENERAL = 0x00000257;

export const CKM_SHA384 = 0x00000260;
export const CKM_SHA384_HMAC = 0x00000261;
export const CKM_SHA384_HMAC_GENERAL = 0x00000262;
export const CKM_SHA512 = 0x00000270;
export const CKM_SHA512_HMAC = 0x00000271;
export const CKM_SHA512_HMAC_GENERAL = 0x00000272;

/* SecurID is new for PKCS #11 v2.20 amendment 1 */
export const CKM_SECURID_KEY_GEN = 0x00000280;
export const CKM_SECURID = 0x00000282;

/* HOTP is new for PKCS #11 v2.20 amendment 1 */
export const CKM_HOTP_KEY_GEN = 0x00000290;
export const CKM_HOTP = 0x00000291;

/* ACTI is new for PKCS #11 v2.20 amendment 1 */
export const CKM_ACTI = 0x000002A0;
export const CKM_ACTI_KEY_GEN = 0x000002A1;

/* All of the following mechanisms are new for v2.0 */
/* Note that CAST128 and CAST5 are the same algorithm */
export const CKM_CAST_KEY_GEN = 0x00000300;
export const CKM_CAST_ECB = 0x00000301;
export const CKM_CAST_CBC = 0x00000302;
export const CKM_CAST_MAC = 0x00000303;
export const CKM_CAST_MAC_GENERAL = 0x00000304;
export const CKM_CAST_CBC_PAD = 0x00000305;
export const CKM_CAST3_KEY_GEN = 0x00000310;
export const CKM_CAST3_ECB = 0x00000311;
export const CKM_CAST3_CBC = 0x00000312;
export const CKM_CAST3_MAC = 0x00000313;
export const CKM_CAST3_MAC_GENERAL = 0x00000314;
export const CKM_CAST3_CBC_PAD = 0x00000315;
export const CKM_CAST5_KEY_GEN = 0x00000320;
export const CKM_CAST128_KEY_GEN = 0x00000320;
export const CKM_CAST5_ECB = 0x00000321;
export const CKM_CAST128_ECB = 0x00000321;
export const CKM_CAST5_CBC = 0x00000322;
export const CKM_CAST128_CBC = 0x00000322;
export const CKM_CAST5_MAC = 0x00000323;
export const CKM_CAST128_MAC = 0x00000323;
export const CKM_CAST5_MAC_GENERAL = 0x00000324;
export const CKM_CAST128_MAC_GENERAL = 0x00000324;
export const CKM_CAST5_CBC_PAD = 0x00000325;
export const CKM_CAST128_CBC_PAD = 0x00000325;
export const CKM_RC5_KEY_GEN = 0x00000330;
export const CKM_RC5_ECB = 0x00000331;
export const CKM_RC5_CBC = 0x00000332;
export const CKM_RC5_MAC = 0x00000333;
export const CKM_RC5_MAC_GENERAL = 0x00000334;
export const CKM_RC5_CBC_PAD = 0x00000335;
export const CKM_IDEA_KEY_GEN = 0x00000340;
export const CKM_IDEA_ECB = 0x00000341;
export const CKM_IDEA_CBC = 0x00000342;
export const CKM_IDEA_MAC = 0x00000343;
export const CKM_IDEA_MAC_GENERAL = 0x00000344;
export const CKM_IDEA_CBC_PAD = 0x00000345;
export const CKM_GENERIC_SECRET_KEY_GEN = 0x00000350;
export const CKM_CONCATENATE_BASE_AND_KEY = 0x00000360;
export const CKM_CONCATENATE_BASE_AND_DATA = 0x00000362;
export const CKM_CONCATENATE_DATA_AND_BASE = 0x00000363;
export const CKM_XOR_BASE_AND_DATA = 0x00000364;
export const CKM_EXTRACT_KEY_FROM_KEY = 0x00000365;
export const CKM_SSL3_PRE_MASTER_KEY_GEN = 0x00000370;
export const CKM_SSL3_MASTER_KEY_DERIVE = 0x00000371;
export const CKM_SSL3_KEY_AND_MAC_DERIVE = 0x00000372;

/* CKM_SSL3_MASTER_KEY_DERIVE_DH, CKM_TLS_PRE_MASTER_KEY_GEN,
 * CKM_TLS_MASTER_KEY_DERIVE, CKM_TLS_KEY_AND_MAC_DERIVE, and
 * CKM_TLS_MASTER_KEY_DERIVE_DH are new for v2.11 */
export const CKM_SSL3_MASTER_KEY_DERIVE_DH = 0x00000373;
export const CKM_TLS_PRE_MASTER_KEY_GEN = 0x00000374;
export const CKM_TLS_MASTER_KEY_DERIVE = 0x00000375;
export const CKM_TLS_KEY_AND_MAC_DERIVE = 0x00000376;
export const CKM_TLS_MASTER_KEY_DERIVE_DH = 0x00000377;

/* CKM_TLS_PRF is new for v2.20 */
export const CKM_TLS_PRF = 0x00000378;

export const CKM_SSL3_MD5_MAC = 0x00000380;
export const CKM_SSL3_SHA1_MAC = 0x00000381;
export const CKM_MD5_KEY_DERIVATION = 0x00000390;
export const CKM_MD2_KEY_DERIVATION = 0x00000391;
export const CKM_SHA1_KEY_DERIVATION = 0x00000392;

/* CKM_SHA256/384/512 are new for v2.20 */
export const CKM_SHA256_KEY_DERIVATION = 0x00000393;
export const CKM_SHA384_KEY_DERIVATION = 0x00000394;
export const CKM_SHA512_KEY_DERIVATION = 0x00000395;

/* SHA-224 key derivation is new for PKCS #11 v2.20 amendment 3 */
export const CKM_SHA224_KEY_DERIVATION = 0x00000396;

export const CKM_PBE_MD2_DES_CBC = 0x000003A0;
export const CKM_PBE_MD5_DES_CBC = 0x000003A1;
export const CKM_PBE_MD5_CAST_CBC = 0x000003A2;
export const CKM_PBE_MD5_CAST3_CBC = 0x000003A3;
export const CKM_PBE_MD5_CAST5_CBC = 0x000003A4;
export const CKM_PBE_MD5_CAST128_CBC = 0x000003A4;
export const CKM_PBE_SHA1_CAST5_CBC = 0x000003A5;
export const CKM_PBE_SHA1_CAST128_CBC = 0x000003A5;
export const CKM_PBE_SHA1_RC4_128 = 0x000003A6;
export const CKM_PBE_SHA1_RC4_40 = 0x000003A7;
export const CKM_PBE_SHA1_DES3_EDE_CBC = 0x000003A8;
export const CKM_PBE_SHA1_DES2_EDE_CBC = 0x000003A9;
export const CKM_PBE_SHA1_RC2_128_CBC = 0x000003AA;
export const CKM_PBE_SHA1_RC2_40_CBC = 0x000003AB;

/* CKM_PKCS5_PBKD2 is new for v2.10 */
export const CKM_PKCS5_PBKD2 = 0x000003B0;

export const CKM_PBA_SHA1_WITH_SHA1_HMAC = 0x000003C0;

/* WTLS mechanisms are new for v2.20 */
export const CKM_WTLS_PRE_MASTER_KEY_GEN = 0x000003D0;
export const CKM_WTLS_MASTER_KEY_DERIVE = 0x000003D1;
export const CKM_WTLS_MASTER_KEY_DERIVE_DH_ECC = 0x000003D2;
export const CKM_WTLS_PRF = 0x000003D3;
export const CKM_WTLS_SERVER_KEY_AND_MAC_DERIVE = 0x000003D4;
export const CKM_WTLS_CLIENT_KEY_AND_MAC_DERIVE = 0x000003D5;

export const CKM_KEY_WRAP_LYNKS = 0x00000400;
export const CKM_KEY_WRAP_SET_OAEP = 0x00000401;

/* CKM_CMS_SIG is new for v2.20 */
export const CKM_CMS_SIG = 0x00000500;

/* CKM_KIP mechanisms are new for PKCS #11 v2.20 amendment 2 */
export const CKM_KIP_DERIVE = 0x00000510;
export const CKM_KIP_WRAP = 0x00000511;
export const CKM_KIP_MAC = 0x00000512;

/* Camellia is new for PKCS #11 v2.20 amendment 3 */
export const CKM_CAMELLIA_KEY_GEN = 0x00000550;
export const CKM_CAMELLIA_ECB = 0x00000551;
export const CKM_CAMELLIA_CBC = 0x00000552;
export const CKM_CAMELLIA_MAC = 0x00000553;
export const CKM_CAMELLIA_MAC_GENERAL = 0x00000554;
export const CKM_CAMELLIA_CBC_PAD = 0x00000555;
export const CKM_CAMELLIA_ECB_ENCRYPT_DATA = 0x00000556;
export const CKM_CAMELLIA_CBC_ENCRYPT_DATA = 0x00000557;
export const CKM_CAMELLIA_CTR = 0x00000558;

/* ARIA is new for PKCS #11 v2.20 amendment 3 */
export const CKM_ARIA_KEY_GEN = 0x00000560;
export const CKM_ARIA_ECB = 0x00000561;
export const CKM_ARIA_CBC = 0x00000562;
export const CKM_ARIA_MAC = 0x00000563;
export const CKM_ARIA_MAC_GENERAL = 0x00000564;
export const CKM_ARIA_CBC_PAD = 0x00000565;
export const CKM_ARIA_ECB_ENCRYPT_DATA = 0x00000566;
export const CKM_ARIA_CBC_ENCRYPT_DATA = 0x00000567;

/* Fortezza mechanisms */
export const CKM_SKIPJACK_KEY_GEN = 0x00001000;
export const CKM_SKIPJACK_ECB64 = 0x00001001;
export const CKM_SKIPJACK_CBC64 = 0x00001002;
export const CKM_SKIPJACK_OFB64 = 0x00001003;
export const CKM_SKIPJACK_CFB64 = 0x00001004;
export const CKM_SKIPJACK_CFB32 = 0x00001005;
export const CKM_SKIPJACK_CFB16 = 0x00001006;
export const CKM_SKIPJACK_CFB8 = 0x00001007;
export const CKM_SKIPJACK_WRAP = 0x00001008;
export const CKM_SKIPJACK_PRIVATE_WRAP = 0x00001009;
export const CKM_SKIPJACK_RELAYX = 0x0000100a;
export const CKM_KEA_KEY_PAIR_GEN = 0x00001010;
export const CKM_KEA_KEY_DERIVE = 0x00001011;
export const CKM_FORTEZZA_TIMESTAMP = 0x00001020;
export const CKM_BATON_KEY_GEN = 0x00001030;
export const CKM_BATON_ECB128 = 0x00001031;
export const CKM_BATON_ECB96 = 0x00001032;
export const CKM_BATON_CBC128 = 0x00001033;
export const CKM_BATON_COUNTER = 0x00001034;
export const CKM_BATON_SHUFFLE = 0x00001035;
export const CKM_BATON_WRAP = 0x00001036;

/* CKM_ECDSA_KEY_PAIR_GEN is deprecated in v2.11,
 * CKM_EC_KEY_PAIR_GEN is preferred */
export const CKM_ECDSA_KEY_PAIR_GEN = 0x00001040;
export const CKM_EC_KEY_PAIR_GEN = 0x00001040;

export const CKM_ECDSA = 0x00001041;
export const CKM_ECDSA_SHA1 = 0x00001042;
export const CKM_ECDSA_SHA224 = 0x000001043;
export const CKM_ECDSA_SHA256 = 0x000001044;
export const CKM_ECDSA_SHA384 = 0x000001045;
export const CKM_ECDSA_SHA512 = 0x000001046;

/* CKM_ECDH1_DERIVE, CKM_ECDH1_COFACTOR_DERIVE, and CKM_ECMQV_DERIVE
 * are new for v2.11 */
export const CKM_ECDH1_DERIVE = 0x00001050;
export const CKM_ECDH1_COFACTOR_DERIVE = 0x00001051;
export const CKM_ECMQV_DERIVE = 0x00001052;

export const CKM_JUNIPER_KEY_GEN = 0x00001060;
export const CKM_JUNIPER_ECB128 = 0x00001061;
export const CKM_JUNIPER_CBC128 = 0x00001062;
export const CKM_JUNIPER_COUNTER = 0x00001063;
export const CKM_JUNIPER_SHUFFLE = 0x00001064;
export const CKM_JUNIPER_WRAP = 0x00001065;
export const CKM_FASTHASH = 0x00001070;

/* CKM_AES_KEY_GEN, CKM_AES_ECB, CKM_AES_CBC, CKM_AES_MAC,
 * CKM_AES_MAC_GENERAL, CKM_AES_CBC_PAD, CKM_DSA_PARAMETER_GEN,
 * CKM_DH_PKCS_PARAMETER_GEN, and CKM_X9_42_DH_PARAMETER_GEN are
 * new for v2.11 */
export const CKM_AES_KEY_GEN = 0x00001080;
export const CKM_AES_ECB = 0x00001081;
export const CKM_AES_CBC = 0x00001082;
export const CKM_AES_MAC = 0x00001083;
export const CKM_AES_MAC_GENERAL = 0x00001084;
export const CKM_AES_CBC_PAD = 0x00001085;
export const CKM_AES_CMAC = 0x0000108A;
export const CKM_AES_CMAC_GENERAL = 0x0000108B;

/* AES counter mode is new for PKCS #11 v2.20 amendment 3 */
export const CKM_AES_CTR = 0x00001086;

/* BlowFish and TwoFish are new for v2.20 */
export const CKM_BLOWFISH_KEY_GEN = 0x00001090;
export const CKM_BLOWFISH_CBC = 0x00001091;
export const CKM_TWOFISH_KEY_GEN = 0x00001092;
export const CKM_TWOFISH_CBC = 0x00001093;

export const CKM_AES_GCM = 0x00001087;
export const CKM_AES_CCM = 0x00001088;
export const CKM_AES_KEY_WRAP = 0x00001090;
export const CKM_AES_KEY_WRAP_PAD = 0x00001091;

/* CKM_xxx_ENCRYPT_DATA mechanisms are new for v2.20 */
export const CKM_DES_ECB_ENCRYPT_DATA = 0x00001100;
export const CKM_DES_CBC_ENCRYPT_DATA = 0x00001101;
export const CKM_DES3_ECB_ENCRYPT_DATA = 0x00001102;
export const CKM_DES3_CBC_ENCRYPT_DATA = 0x00001103;
export const CKM_AES_ECB_ENCRYPT_DATA = 0x00001104;
export const CKM_AES_CBC_ENCRYPT_DATA = 0x00001105;

export const CKM_GOSTR3410_KEY_PAIR_GEN = 0x00001200;
export const CKM_GOSTR3410 = 0x00001201;
export const CKM_GOSTR3410_WITH_GOSTR3411 = 0x00001202;
export const CKM_GOSTR3410_KEY_WRAP = 0x00001203;
export const CKM_GOSTR3410_DERIVE = 0x00001204;
export const CKM_GOSTR3411 = 0x00001210;
export const CKM_GOSTR3411_HMAC = 0x00001211;
export const CKM_GOST28147_KEY_GEN = 0x00001220;
export const CKM_GOST28147_ECB = 0x00001221;
export const CKM_GOST28147 = 0x00001222;
export const CKM_GOST28147_MAC = 0x00001223;
export const CKM_GOST28147_KEY_WRAP = 0x00001224;

export const CKM_DSA_PARAMETER_GEN = 0x00002000;
export const CKM_DH_PKCS_PARAMETER_GEN = 0x00002001;
export const CKM_X9_42_DH_PARAMETER_GEN = 0x00002002;

export const CKM_VENDOR_DEFINED = 0x80000000;

export const CK_MECHANISM_TYPE_PTR = Ref.refType(CK_MECHANISM_TYPE);

/** 
 * CK_MECHANISM is a structure that specifies a particular mechanism  
 */
export const CK_MECHANISM = RefStruct({
    mechanism: CK_MECHANISM_TYPE,
    pParameter: CK_VOID_PTR,

    /* ulParameterLen was changed from CK_USHORT to CK_ULONG for
     * v2.0 */
    ulParameterLen: CK_ULONG,  /* in bytes */
});

export const CK_MECHANISM_PTR = Ref.refType(CK_MECHANISM);


/**
 * CK_MECHANISM_INFO provides information about a particular mechanism 
 */
export const CK_MECHANISM_INFO = RefStruct({
    ulMinKeySize: CK_ULONG,
    ulMaxKeySize: CK_ULONG,
    flags: CK_FLAGS
});

/* The flags are defined as follows:
 *      Bit Flag               Mask        Meaning */
export const CKF_HW = 0x00000001;  /* performed by HW */

/* The flags CKF_ENCRYPT, CKF_DECRYPT, CKF_DIGEST, CKF_SIGN,
 * CKG_SIGN_RECOVER, CKF_VERIFY, CKF_VERIFY_RECOVER,
 * CKF_GENERATE, CKF_GENERATE_KEY_PAIR, CKF_WRAP, CKF_UNWRAP,
 * and CKF_DERIVE are new for v2.0.  They specify whether or not
 * a mechanism can be used for a particular task */
export const CKF_ENCRYPT = 0x00000100;
export const CKF_DECRYPT = 0x00000200;
export const CKF_DIGEST = 0x00000400;
export const CKF_SIGN = 0x00000800;
export const CKF_SIGN_RECOVER = 0x00001000;
export const CKF_VERIFY = 0x00002000;
export const CKF_VERIFY_RECOVER = 0x00004000;
export const CKF_GENERATE = 0x00008000;
export const CKF_GENERATE_KEY_PAIR = 0x00010000;
export const CKF_WRAP = 0x00020000;
export const CKF_UNWRAP = 0x00040000;
export const CKF_DERIVE = 0x00080000;

/* CKF_EC_F_P, CKF_EC_F_2M, CKF_EC_ECPARAMETERS, CKF_EC_NAMEDCURVE,
 * CKF_EC_UNCOMPRESS, and CKF_EC_COMPRESS are new for v2.11. They
 * describe a token's EC capabilities not available in mechanism
 * information. */
export const CKF_EC_F_P = 0x00100000;
export const CKF_EC_F_2M = 0x00200000;
export const CKF_EC_ECPARAMETERS = 0x00400000;
export const CKF_EC_NAMEDCURVE = 0x00800000;
export const CKF_EC_UNCOMPRESS = 0x01000000;
export const CKF_EC_COMPRESS = 0x02000000;

export const CKF_EXTENSION = 0x80000000; /* FALSE for this version */

export const CK_MECHANISM_INFO_PTR = Ref.refType(CK_MECHANISM_INFO);


/* CK_RV is a value that identifies the return value of a
 * Cryptoki function */
/* CK_RV was changed from CK_USHORT to CK_ULONG for v2.0 */
export const CK_RV = CK_ULONG;

export const CKR_OK = 0x00000000;
export const CKR_CANCEL = 0x00000001;
export const CKR_HOST_MEMORY = 0x00000002;
export const CKR_SLOT_ID_INVALID = 0x00000003;

/* CKR_FLAGS_INVALID was removed for v2.0 */

/* CKR_GENERAL_ERROR and CKR_FUNCTION_FAILED are new for v2.0 */
export const CKR_GENERAL_ERROR = 0x00000005;
export const CKR_FUNCTION_FAILED = 0x00000006;

/* CKR_ARGUMENTS_BAD, CKR_NO_EVENT, CKR_NEED_TO_CREATE_THREADS,
 * and CKR_CANT_LOCK are new for v2.01 */
export const CKR_ARGUMENTS_BAD = 0x00000007;
export const CKR_NO_EVENT = 0x00000008;
export const CKR_NEED_TO_CREATE_THREADS = 0x00000009;
export const CKR_CANT_LOCK = 0x0000000A;

export const CKR_ATTRIBUTE_READ_ONLY = 0x00000010;
export const CKR_ATTRIBUTE_SENSITIVE = 0x00000011;
export const CKR_ATTRIBUTE_TYPE_INVALID = 0x00000012;
export const CKR_ATTRIBUTE_VALUE_INVALID = 0x00000013;
export const CKR_DATA_INVALID = 0x00000020;
export const CKR_DATA_LEN_RANGE = 0x00000021;
export const CKR_DEVICE_ERROR = 0x00000030;
export const CKR_DEVICE_MEMORY = 0x00000031;
export const CKR_DEVICE_REMOVED = 0x00000032;
export const CKR_ENCRYPTED_DATA_INVALID = 0x00000040;
export const CKR_ENCRYPTED_DATA_LEN_RANGE = 0x00000041;
export const CKR_FUNCTION_CANCELED = 0x00000050;
export const CKR_FUNCTION_NOT_PARALLEL = 0x00000051;

/* CKR_FUNCTION_NOT_SUPPORTED is new for v2.0 */
export const CKR_FUNCTION_NOT_SUPPORTED = 0x00000054;

export const CKR_KEY_HANDLE_INVALID = 0x00000060;

/* CKR_KEY_SENSITIVE was removed for v2.0 */

export const CKR_KEY_SIZE_RANGE = 0x00000062;
export const CKR_KEY_TYPE_INCONSISTENT = 0x00000063;

/* CKR_KEY_NOT_NEEDED, CKR_KEY_CHANGED, CKR_KEY_NEEDED,
 * CKR_KEY_INDIGESTIBLE, CKR_KEY_FUNCTION_NOT_PERMITTED,
 * CKR_KEY_NOT_WRAPPABLE, and CKR_KEY_UNEXTRACTABLE are new for
 * v2.0 */
export const CKR_KEY_NOT_NEEDED = 0x00000064;
export const CKR_KEY_CHANGED = 0x00000065;
export const CKR_KEY_NEEDED = 0x00000066;
export const CKR_KEY_INDIGESTIBLE = 0x00000067;
export const CKR_KEY_FUNCTION_NOT_PERMITTED = 0x00000068;
export const CKR_KEY_NOT_WRAPPABLE = 0x00000069;
export const CKR_KEY_UNEXTRACTABLE = 0x0000006A;

export const CKR_MECHANISM_INVALID = 0x00000070;
export const CKR_MECHANISM_PARAM_INVALID = 0x00000071;

/* CKR_OBJECT_CLASS_INCONSISTENT and CKR_OBJECT_CLASS_INVALID
 * were removed for v2.0 */
export const CKR_OBJECT_HANDLE_INVALID = 0x00000082;
export const CKR_OPERATION_ACTIVE = 0x00000090;
export const CKR_OPERATION_NOT_INITIALIZED = 0x00000091;
export const CKR_PIN_INCORRECT = 0x000000A0;
export const CKR_PIN_INVALID = 0x000000A1;
export const CKR_PIN_LEN_RANGE = 0x000000A2;

/* CKR_PIN_EXPIRED and CKR_PIN_LOCKED are new for v2.0 */
export const CKR_PIN_EXPIRED = 0x000000A3;
export const CKR_PIN_LOCKED = 0x000000A4;

export const CKR_SESSION_CLOSED = 0x000000B0;
export const CKR_SESSION_COUNT = 0x000000B1;
export const CKR_SESSION_HANDLE_INVALID = 0x000000B3;
export const CKR_SESSION_PARALLEL_NOT_SUPPORTED = 0x000000B4;
export const CKR_SESSION_READ_ONLY = 0x000000B5;
export const CKR_SESSION_EXISTS = 0x000000B6;

/* CKR_SESSION_READ_ONLY_EXISTS and
 * CKR_SESSION_READ_WRITE_SO_EXISTS are new for v2.0 */
export const CKR_SESSION_READ_ONLY_EXISTS = 0x000000B7;
export const CKR_SESSION_READ_WRITE_SO_EXISTS = 0x000000B8;

export const CKR_SIGNATURE_INVALID = 0x000000C0;
export const CKR_SIGNATURE_LEN_RANGE = 0x000000C1;
export const CKR_TEMPLATE_INCOMPLETE = 0x000000D0;
export const CKR_TEMPLATE_INCONSISTENT = 0x000000D1;
export const CKR_TOKEN_NOT_PRESENT = 0x000000E0;
export const CKR_TOKEN_NOT_RECOGNIZED = 0x000000E1;
export const CKR_TOKEN_WRITE_PROTECTED = 0x000000E2;
export const CKR_UNWRAPPING_KEY_HANDLE_INVALID = 0x000000F0;
export const CKR_UNWRAPPING_KEY_SIZE_RANGE = 0x000000F1;
export const CKR_UNWRAPPING_KEY_TYPE_INCONSISTENT = 0x000000F2;
export const CKR_USER_ALREADY_LOGGED_IN = 0x00000100;
export const CKR_USER_NOT_LOGGED_IN = 0x00000101;
export const CKR_USER_PIN_NOT_INITIALIZED = 0x00000102;
export const CKR_USER_TYPE_INVALID = 0x00000103;

/* CKR_USER_ANOTHER_ALREADY_LOGGED_IN and CKR_USER_TOO_MANY_TYPES
 * are new to v2.01 */
export const CKR_USER_ANOTHER_ALREADY_LOGGED_IN = 0x00000104;
export const CKR_USER_TOO_MANY_TYPES = 0x00000105;

export const CKR_WRAPPED_KEY_INVALID = 0x00000110;
export const CKR_WRAPPED_KEY_LEN_RANGE = 0x00000112;
export const CKR_WRAPPING_KEY_HANDLE_INVALID = 0x00000113;
export const CKR_WRAPPING_KEY_SIZE_RANGE = 0x00000114;
export const CKR_WRAPPING_KEY_TYPE_INCONSISTENT = 0x00000115;
export const CKR_RANDOM_SEED_NOT_SUPPORTED = 0x00000120;

/* These are new to v2.0 */
export const CKR_RANDOM_NO_RNG = 0x00000121;

/* These are new to v2.11 */
export const CKR_DOMAIN_PARAMS_INVALID = 0x00000130;

/* These are new to v2.0 */
export const CKR_BUFFER_TOO_SMALL = 0x00000150;
export const CKR_SAVED_STATE_INVALID = 0x00000160;
export const CKR_INFORMATION_SENSITIVE = 0x00000170;
export const CKR_STATE_UNSAVEABLE = 0x00000180;

/* These are new to v2.01 */
export const CKR_CRYPTOKI_NOT_INITIALIZED = 0x00000190;
export const CKR_CRYPTOKI_ALREADY_INITIALIZED = 0x00000191;
export const CKR_MUTEX_BAD = 0x000001A0;
export const CKR_MUTEX_NOT_LOCKED = 0x000001A1;

/* The following return values are new for PKCS #11 v2.20 amendment 3 */
export const CKR_NEW_PIN_MODE = 0x000001B0;
export const CKR_NEXT_OTP = 0x000001B1;

/* This is new to v2.20 */
export const CKR_FUNCTION_REJECTED = 0x00000200;

export const CKR_VENDOR_DEFINED = 0x80000000;

/**
 * CK_NOTIFY is an application callback that processes events 
 */
export const CK_NOTIFY = Ffi.Function(CK_RV, [
    CK_SESSION_HANDLE,     /* the session's handle */
    CK_NOTIFICATION,
    CK_VOID_PTR            /* passed to C_OpenSession */
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
export const CK_CREATEMUTEX = Ffi.Function(CK_RV, [
    CK_VOID_PTR_PTR  /* location to receive ptr to mutex */
]);


/**
 * CK_DESTROYMUTEX is an application callback for destroying a
 * mutex object 
 */
export const CK_DESTROYMUTEX = Ffi.Function(CK_RV, [
    CK_VOID_PTR  /* pointer to mutex */
]);


/** 
 * CK_LOCKMUTEX is an application callback for locking a mutex 
 */
export const CK_LOCKMUTEX = Ffi.Function(CK_RV, [
    CK_VOID_PTR  /* pointer to mutex */
]);


/**
 * CK_UNLOCKMUTEX is an application callback for unlocking a
 * mutex
 */
export const CK_UNLOCKMUTEX = Ffi.Function(CK_RV, [
    CK_VOID_PTR  /* pointer to mutex */
]);


/**
 * CK_C_INITIALIZE_ARGS provides the optional arguments to
 * C_Initialize 
 */
export const CK_C_INITIALIZE_ARGS = RefStruct({
    CreateMutex: CK_CREATEMUTEX,
    DestroyMutex: CK_DESTROYMUTEX,
    LockMutex: CK_LOCKMUTEX,
    UnlockMutex: CK_UNLOCKMUTEX,
    flags: CK_FLAGS,
    pReserved: CK_VOID_PTR
});

/* flags: bit flags that provide capabilities of the slot
 *      Bit Flag                           Mask       Meaning
 */
export const CKF_LIBRARY_CANT_CREATE_OS_THREADS = 0x00000001;
export const CKF_OS_LOCKING_OK = 0x00000002;

export const CK_C_INITIALIZE_ARGS_PTR = Ref.refType(CK_C_INITIALIZE_ARGS);


/* additional flags for parameters to functions */

/**
 * CKF_DONT_BLOCK is for the function C_WaitForSlotEvent 
 */
export const CKF_DONT_BLOCK = 1;

/**
 * CK_RSA_PKCS_OAEP_MGF_TYPE is new for v2.10.
 * CK_RSA_PKCS_OAEP_MGF_TYPE  is used to indicate the Message
 * Generation Function (MGF) applied to a message block when
 * formatting a message block for the PKCS #1 OAEP encryption
 * scheme. 
 */
export const CK_RSA_PKCS_MGF_TYPE = CK_ULONG;

export const CK_RSA_PKCS_MGF_TYPE_PTR = Ref.refType(CK_RSA_PKCS_MGF_TYPE);

/* The following MGFs are defined */
/* CKG_MGF1_SHA256, CKG_MGF1_SHA384, and CKG_MGF1_SHA512
 * are new for v2.20 */
export const CKG_MGF1_SHA1 = 0x00000001;
export const CKG_MGF1_SHA256 = 0x00000002;
export const CKG_MGF1_SHA384 = 0x00000003;
export const CKG_MGF1_SHA512 = 0x00000004;
/* SHA-224 is new for PKCS #11 v2.20 amendment 3 */
export const CKG_MGF1_SHA224 = 0x00000005;

/**
 * CK_RSA_PKCS_OAEP_SOURCE_TYPE is new for v2.10.
 * CK_RSA_PKCS_OAEP_SOURCE_TYPE  is used to indicate the source
 * of the encoding parameter when formatting a message block
 * for the PKCS #1 OAEP encryption scheme. 
 */
export const CK_RSA_PKCS_OAEP_SOURCE_TYPE = CK_ULONG;

export const CK_RSA_PKCS_OAEP_SOURCE_TYPE_PTR = Ref.refType(CK_RSA_PKCS_OAEP_SOURCE_TYPE);

/* The following encoding parameter sources are defined */
export const CKZ_DATA_SPECIFIED = 0x00000001;

/**
 * CK_RSA_PKCS_OAEP_PARAMS is new for v2.10.
 * CK_RSA_PKCS_OAEP_PARAMS provides the parameters to the
 * CKM_RSA_PKCS_OAEP mechanism. 
 */
export const CK_RSA_PKCS_OAEP_PARAMS = RefStruct({
    hashAlg: CK_MECHANISM_TYPE,
    mgf: CK_RSA_PKCS_MGF_TYPE,
    source: CK_RSA_PKCS_OAEP_SOURCE_TYPE,
    pSourceData: CK_VOID_PTR,
    ulSourceDataLen: CK_ULONG
});

export const CK_RSA_PKCS_OAEP_PARAMS_PTR = Ref.refType(CK_RSA_PKCS_OAEP_PARAMS);

/**
 * CK_RSA_PKCS_PSS_PARAMS is new for v2.11.
 * CK_RSA_PKCS_PSS_PARAMS provides the parameters to the
 * CKM_RSA_PKCS_PSS mechanism(s). 
 */
export const CK_RSA_PKCS_PSS_PARAMS = RefStruct({
    hashAlg: CK_MECHANISM_TYPE,
    mgf: CK_RSA_PKCS_MGF_TYPE,
    sLen: CK_ULONG
});

export const CK_RSA_PKCS_PSS_PARAMS_PTR = Ref.refType(CK_RSA_PKCS_PSS_PARAMS);

/* CK_EC_KDF_TYPE is new for v2.11. */
export const CK_EC_KDF_TYPE = CK_ULONG;

/* The following EC Key Derivation Functions are defined */
export const CKD_NULL = 0x00000001;
export const CKD_SHA1_KDF = 0x00000002;
export const CKD_SHA224_KDF = 0x00000003;
export const CKD_SHA256_KDF = 0x00000004;
export const CKD_SHA384_KDF = 0x00000005;
export const CKD_SHA512_KDF = 0x00000006;

/**
 * CK_ECDH1_DERIVE_PARAMS is new for v2.11.
 * CK_ECDH1_DERIVE_PARAMS provides the parameters to the
 * CKM_ECDH1_DERIVE and CKM_ECDH1_COFACTOR_DERIVE mechanisms,
 * where each party contributes one key pair.
 */
export const CK_ECDH1_DERIVE_PARAMS = RefStruct({
    kdf: CK_EC_KDF_TYPE,
    ulSharedDataLen: CK_ULONG,
    pSharedData: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR
});

export const CK_ECDH1_DERIVE_PARAMS_PTR = Ref.refType(CK_ECDH1_DERIVE_PARAMS);


/**
 * CK_ECDH2_DERIVE_PARAMS is new for v2.11.
 * CK_ECDH2_DERIVE_PARAMS provides the parameters to the
 * CKM_ECMQV_DERIVE mechanism, where each party contributes two key pairs. 
 */
export const CK_ECDH2_DERIVE_PARAMS = RefStruct({
    kdf: CK_EC_KDF_TYPE,
    ulSharedDataLen: CK_ULONG,
    pSharedData: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR,
    ulPrivateDataLen: CK_ULONG,
    hPrivateData: CK_OBJECT_HANDLE,
    ulPublicDataLen2: CK_ULONG,
    pPublicData2: CK_BYTE_PTR
});

export const CK_ECDH2_DERIVE_PARAMS_PTR = Ref.refType(CK_ECDH2_DERIVE_PARAMS);

export const CK_ECMQV_DERIVE_PARAMS = RefStruct({
    kdf: CK_EC_KDF_TYPE,
    ulSharedDataLen: CK_ULONG,
    pSharedData: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR,
    ulPrivateDataLen: CK_ULONG,
    hPrivateData: CK_OBJECT_HANDLE,
    ulPublicDataLen2: CK_ULONG,
    pPublicData2: CK_BYTE_PTR,
    publicKey: CK_OBJECT_HANDLE
});

export const CK_ECMQV_DERIVE_PARAMS_PTR = Ref.refType(CK_ECMQV_DERIVE_PARAMS);

/* export consts and defines for the CKM_X9_42_DH_KEY_PAIR_GEN and the
 * CKM_X9_42_DH_PARAMETER_GEN mechanisms (new for PKCS #11 v2.11) */
export const CK_X9_42_DH_KDF_TYPE = CK_ULONG;
export const CK_X9_42_DH_KDF_TYPE_PTR = Ref.refType(CK_X9_42_DH_KDF_TYPE);

/* The following X9.42 DH key derivation functions are defined
   (besides CKD_NULL already defined : */
export const CKD_SHA1_KDF_ASN1 = 0x00000003;
export const CKD_SHA1_KDF_CONCATENATE = 0x00000004;

/**
 * CK_X9_42_DH1_DERIVE_PARAMS is new for v2.11.
 * CK_X9_42_DH1_DERIVE_PARAMS provides the parameters to the
 * CKM_X9_42_DH_DERIVE key derivation mechanism, where each party
 * contributes one key pair 
 */
export const CK_X9_42_DH1_DERIVE_PARAMS = RefStruct({
    kdf: CK_X9_42_DH_KDF_TYPE,
    ulOtherInfoLen: CK_ULONG,
    pOtherInfo: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR
});

export const CK_X9_42_DH1_DERIVE_PARAMS_PTR = Ref.refType(CK_X9_42_DH1_DERIVE_PARAMS);

/**
 * CK_X9_42_DH2_DERIVE_PARAMS is new for v2.11.
 * CK_X9_42_DH2_DERIVE_PARAMS provides the parameters to the
 * CKM_X9_42_DH_HYBRID_DERIVE and CKM_X9_42_MQV_DERIVE key derivation
 * mechanisms, where each party contributes two key pairs 
 */
export const CK_X9_42_DH2_DERIVE_PARAMS = RefStruct({
    kdf: CK_X9_42_DH_KDF_TYPE,
    ulOtherInfoLen: CK_ULONG,
    pOtherInfo: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR,
    ulPrivateDataLen: CK_ULONG,
    hPrivateData: CK_OBJECT_HANDLE,
    ulPublicDataLen2: CK_ULONG,
    pPublicData2: CK_BYTE_PTR
});

export const CK_X9_42_DH2_DERIVE_PARAMS_PTR = Ref.refType(CK_X9_42_DH2_DERIVE_PARAMS);

export const CK_X9_42_MQV_DERIVE_PARAMS = RefStruct({
    kdf: CK_X9_42_DH_KDF_TYPE,
    ulOtherInfoLen: CK_ULONG,
    pOtherInfo: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR,
    ulPrivateDataLen: CK_ULONG,
    hPrivateData: CK_OBJECT_HANDLE,
    ulPublicDataLen2: CK_ULONG,
    pPublicData2: CK_BYTE_PTR,
    publicKey: CK_OBJECT_HANDLE
});

export const CK_X9_42_MQV_DERIVE_PARAMS_PTR = Ref.refType(CK_X9_42_MQV_DERIVE_PARAMS);

/**
 * CK_KEA_DERIVE_PARAMS provides the parameters to the
 * CKM_KEA_DERIVE mechanism
 * CK_KEA_DERIVE_PARAMS is new for v2.0 
 */
export const CK_KEA_DERIVE_PARAMS = RefStruct({
    isSender: CK_BBOOL,
    ulRandomLen: CK_ULONG,
    pRandomA: CK_BYTE_PTR,
    pRandomB: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR
});

export const CK_KEA_DERIVE_PARAMS_PTR = RefStruct(CK_KEA_DERIVE_PARAMS);

/**
 * CK_RC2_PARAMS provides the parameters to the CKM_RC2_ECB and
 * CKM_RC2_MAC mechanisms.  An instance of CK_RC2_PARAMS just
 * holds the effective keysize 
 */
export const CK_RC2_PARAMS = CK_ULONG;

export const CK_RC2_PARAMS_PTR = Ref.refType(CK_RC2_PARAMS);

/**
 * CK_RC2_CBC_PARAMS provides the parameters to the CKM_RC2_CBC mechanism 
 */
export const CK_RC2_CBC_PARAMS = RefStruct({
    /* ulEffectiveBits was changed from CK_USHORT to CK_ULONG for
     * v2.0 */
    ulEffectiveBits: CK_ULONG,  /* effective bits (1-1024) */

    iv: RefArray(CK_BYTE, 8)    /* IV for CBC mode */
});

export const CK_RC2_CBC_PARAMS_PTR = Ref.refType(CK_RC2_CBC_PARAMS);


/**
 * CK_RC2_MAC_GENERAL_PARAMS provides the parameters for the
 * CKM_RC2_MAC_GENERAL mechanism
 * CK_RC2_MAC_GENERAL_PARAMS is new for v2.0 
 */
export const CK_RC2_MAC_GENERAL_PARAMS = RefStruct({
    ulEffectiveBits: CK_ULONG,  /* effective bits (1-1024) */
    ulMacLength: CK_ULONG       /* Length of MAC in bytes */
});

export const CK_RC2_MAC_GENERAL_PARAMS_PTR = Ref.refType(CK_RC2_MAC_GENERAL_PARAMS);


/**
 * CK_RC5_PARAMS provides the parameters to the CKM_RC5_ECB and
 * CKM_RC5_MAC mechanisms
 * CK_RC5_PARAMS is new for v2.0 
 */
export const CK_RC5_PARAMS = RefStruct({
    ulWordsize: CK_ULONG,  /* wordsize in bits */
    ulRounds: CK_ULONG     /* number of rounds */
});

export const CK_RC5_PARAMS_PTR = Ref.refType(CK_RC5_PARAMS);


/**
 * CK_RC5_CBC_PARAMS provides the parameters to the CKM_RC5_CBC mechanism
 * CK_RC5_CBC_PARAMS is new for v2.0 
 */
export const CK_RC5_CBC_PARAMS = RefStruct({
    ulWordsize: CK_ULONG,  /* wordsize in bits */
    ulRounds: CK_ULONG,    /* number of rounds */
    pIv: CK_BYTE_PTR,      /* pointer to IV */
    ulIvLen: CK_ULONG      /* length of IV in bytes */
});

export const CK_RC5_CBC_PARAMS_PTR = Ref.refType(CK_RC5_CBC_PARAMS);


/**
 * CK_RC5_MAC_GENERAL_PARAMS provides the parameters for the
 * CKM_RC5_MAC_GENERAL mechanism
 * CK_RC5_MAC_GENERAL_PARAMS is new for v2.0 
 */
export const CK_RC5_MAC_GENERAL_PARAMS = RefStruct({
    ulWordsize: CK_ULONG,   /* wordsize in bits */
    ulRounds: CK_ULONG,     /* number of rounds */
    ulMacLength: CK_ULONG   /* Length of MAC in bytes */
});

export const CK_RC5_MAC_GENERAL_PARAMS_PTR = Ref.refType(CK_RC5_MAC_GENERAL_PARAMS);


/**
 * CK_MAC_GENERAL_PARAMS provides the parameters to most block
 * ciphers' MAC_GENERAL mechanisms.  Its value is the length of
 * the MAC 
 * CK_MAC_GENERAL_PARAMS is new for v2.0 
 */
export const CK_MAC_GENERAL_PARAMS = CK_ULONG;

export const CK_MAC_GENERAL_PARAMS_PTR = Ref.refType(CK_MAC_GENERAL_PARAMS);

/* CK_DES/AES_ECB/CBC_ENCRYPT_DATA_PARAMS are new for v2.20 */
export const CK_DES_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(CK_BYTE, 8),
    pData: CK_BYTE_PTR,
    length: CK_ULONG
});

export const CK_DES_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(CK_DES_CBC_ENCRYPT_DATA_PARAMS);

export const CK_AES_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(CK_BYTE, 16),
    pData: CK_BYTE_PTR,
    length: CK_ULONG
});

export const CK_AES_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(CK_AES_CBC_ENCRYPT_DATA_PARAMS);

/**
 * CK_SKIPJACK_PRIVATE_WRAP_PARAMS provides the parameters to the
 * CKM_SKIPJACK_PRIVATE_WRAP mechanism
 * CK_SKIPJACK_PRIVATE_WRAP_PARAMS is new for v2.0
 */
export const CK_SKIPJACK_PRIVATE_WRAP_PARAMS = RefStruct({
    ulPasswordLen: CK_ULONG,
    pPassword: CK_BYTE_PTR,
    ulPublicDataLen: CK_ULONG,
    pPublicData: CK_BYTE_PTR,
    ulPAndGLen: CK_ULONG,
    ulQLen: CK_ULONG,
    ulRandomLen: CK_ULONG,
    pRandomA: CK_BYTE_PTR,
    pPrimeP: CK_BYTE_PTR,
    pBaseG: CK_BYTE_PTR,
    pSubprimeQ: CK_BYTE_PTR
});

export const CK_SKIPJACK_PRIVATE_WRAP_PARAMS_PTR = Ref.refType(CK_SKIPJACK_PRIVATE_WRAP_PARAMS);


/**
 * CK_SKIPJACK_RELAYX_PARAMS provides the parameters to the
 * CKM_SKIPJACK_RELAYX mechanism
 * CK_SKIPJACK_RELAYX_PARAMS is new for v2.0
 */
export const CK_SKIPJACK_RELAYX_PARAMS = RefStruct({
    ulOldWrappedXLen: CK_ULONG,
    pOldWrappedX: CK_BYTE_PTR,
    ulOldPasswordLen: CK_ULONG,
    pOldPassword: CK_BYTE_PTR,
    ulOldPublicDataLen: CK_ULONG,
    pOldPublicData: CK_BYTE_PTR,
    ulOldRandomLen: CK_ULONG,
    pOldRandomA: CK_BYTE_PTR,
    ulNewPasswordLen: CK_ULONG,
    pNewPassword: CK_BYTE_PTR,
    ulNewPublicDataLen: CK_ULONG,
    pNewPublicData: CK_BYTE_PTR,
    ulNewRandomLen: CK_ULONG,
    pNewRandomA: CK_BYTE_PTR
});

export const CK_SKIPJACK_RELAYX_PARAMS_PTR = Ref.refType(CK_SKIPJACK_RELAYX_PARAMS);


export const CK_PBE_PARAMS = RefStruct({
    pInitVector: CK_BYTE_PTR,
    pPassword: CK_UTF8CHAR_PTR,
    ulPasswordLen: CK_ULONG,
    pSalt: CK_BYTE_PTR,
    ulSaltLen: CK_ULONG,
    ulIteration: CK_ULONG
});

export const CK_PBE_PARAMS_PTR = Ref.refType(CK_PBE_PARAMS);


/**
 * CK_KEY_WRAP_SET_OAEP_PARAMS provides the parameters to the
 * CKM_KEY_WRAP_SET_OAEP mechanism
 * CK_KEY_WRAP_SET_OAEP_PARAMS is new for v2.0 
 */
export const CK_KEY_WRAP_SET_OAEP_PARAMS = RefStruct({
    bBC: CK_BYTE,         /* block contents byte */
    pX: CK_BYTE_PTR,      /* extra data */
    ulXLen: CK_ULONG      /* length of extra data in bytes */
});

export const CK_KEY_WRAP_SET_OAEP_PARAMS_PTR = Ref.refType(CK_KEY_WRAP_SET_OAEP_PARAMS);


export const CK_SSL3_RANDOM_DATA = RefStruct({
    pClientRandom: CK_BYTE_PTR,
    ulClientRandomLen: CK_ULONG,
    pServerRandom: CK_BYTE_PTR,
    ulServerRandomLen: CK_ULONG
});


export const CK_SSL3_MASTER_KEY_DERIVE_PARAMS = RefStruct({
    RandomInfo: CK_SSL3_RANDOM_DATA,
    pVersion: CK_VERSION_PTR
});

export const CK_SSL3_MASTER_KEY_DERIVE_PARAMS_PTR = Ref.refType(CK_SSL3_MASTER_KEY_DERIVE_PARAMS);


export const CK_SSL3_KEY_MAT_OUT = RefStruct({
    hClientMacSecret: CK_OBJECT_HANDLE,
    hServerMacSecret: CK_OBJECT_HANDLE,
    hClientKey: CK_OBJECT_HANDLE,
    hServerKey: CK_OBJECT_HANDLE,
    pIVClient: CK_BYTE_PTR,
    pIVServer: CK_BYTE_PTR
});

export const CK_SSL3_KEY_MAT_OUT_PTR = Ref.refType(CK_SSL3_KEY_MAT_OUT);


export const CK_SSL3_KEY_MAT_PARAMS = RefStruct({
    ulMacSizeInBits: CK_ULONG,
    ulKeySizeInBits: CK_ULONG,
    ulIVSizeInBits: CK_ULONG,
    bIsExport: CK_BBOOL,
    RandomInfo: CK_SSL3_RANDOM_DATA,
    pReturnedKeyMaterial: CK_SSL3_KEY_MAT_OUT_PTR
});

export const CK_SSL3_KEY_MAT_PARAMS_PTR = Ref.refType(CK_SSL3_KEY_MAT_PARAMS);

/**
 * CK_TLS_PRF_PARAMS is new for version 2.20 
 */
export const CK_TLS_PRF_PARAMS = RefStruct({
    pSeed: CK_BYTE_PTR,
    ulSeedLen: CK_ULONG,
    pLabel: CK_BYTE_PTR,
    ulLabelLen: CK_ULONG,
    pOutput: CK_BYTE_PTR,
    pulOutputLen: CK_ULONG_PTR
});

export const CK_TLS_PRF_PARAMS_PTR = Ref.refType(CK_TLS_PRF_PARAMS);

/**
 * WTLS is new for version 2.20 
 */
export const CK_WTLS_RANDOM_DATA = RefStruct({
    pClientRandom: CK_BYTE_PTR,
    ulClientRandomLen: CK_ULONG,
    pServerRandom: CK_BYTE_PTR,
    ulServerRandomLen: CK_ULONG,
});

export const CK_WTLS_RANDOM_DATA_PTR = Ref.refType(CK_WTLS_RANDOM_DATA);

export const CK_WTLS_MASTER_KEY_DERIVE_PARAMS = RefStruct({
    DigestMechanism: CK_MECHANISM_TYPE,
    RandomInfo: CK_WTLS_RANDOM_DATA,
    pVersion: CK_BYTE_PTR
});

export const CK_WTLS_MASTER_KEY_DERIVE_PARAMS_PTR = Ref.refType(CK_WTLS_MASTER_KEY_DERIVE_PARAMS);

export const CK_WTLS_PRF_PARAMS = RefStruct({
    DigestMechanism: CK_MECHANISM_TYPE,
    pSeed: CK_BYTE_PTR,
    ulSeedLen: CK_ULONG,
    pLabel: CK_BYTE_PTR,
    ulLabelLen: CK_ULONG,
    pOutput: CK_BYTE_PTR,
    pulOutputLen: CK_ULONG_PTR
});

export const CK_WTLS_PRF_PARAMS_PTR = Ref.refType(CK_WTLS_PRF_PARAMS);

export const CK_WTLS_KEY_MAT_OUT = RefStruct({
    hMacSecret: CK_OBJECT_HANDLE,
    hKey: CK_OBJECT_HANDLE,
    pIV: CK_BYTE_PTR
});

export const CK_WTLS_KEY_MAT_OUT_PTR = Ref.refType(CK_WTLS_KEY_MAT_OUT);

export const CK_WTLS_KEY_MAT_PARAMS = RefStruct({
    DigestMechanism: CK_MECHANISM_TYPE,
    ulMacSizeInBits: CK_ULONG,
    ulKeySizeInBits: CK_ULONG,
    ulIVSizeInBits: CK_ULONG,
    ulSequenceNumber: CK_ULONG,
    bIsExport: CK_BBOOL,
    RandomInfo: CK_WTLS_RANDOM_DATA,
    pReturnedKeyMaterial: CK_WTLS_KEY_MAT_OUT_PTR
});

export const CK_WTLS_KEY_MAT_PARAMS_PTR = Ref.refType(CK_WTLS_KEY_MAT_PARAMS);

/** 
 * CMS is new for version 2.20 
 * */
export const CK_CMS_SIG_PARAMS = RefStruct({
    certificateHandle: CK_OBJECT_HANDLE,
    pSigningMechanism: CK_MECHANISM_PTR,
    pDigestMechanism: CK_MECHANISM_PTR,
    pContentType: CK_UTF8CHAR_PTR,
    pRequestedAttributes: CK_BYTE_PTR,
    ulRequestedAttributesLen: CK_ULONG,
    pRequiredAttributes: CK_BYTE_PTR,
    ulRequiredAttributesLen: CK_ULONG
});

export const CK_CMS_SIG_PARAMS_PTR = Ref.refType(CK_CMS_SIG_PARAMS);

export const CK_KEY_DERIVATION_STRING_DATA = RefStruct({
    pData: CK_BYTE_PTR,
    ulLen: CK_ULONG
});

export const CK_KEY_DERIVATION_STRING_DATA_PTR = Ref.refType(CK_KEY_DERIVATION_STRING_DATA);


/** 
 * The CK_EXTRACT_PARAMS is used for the
 * CKM_EXTRACT_KEY_FROM_KEY mechanism.  It specifies which bit
 * of the base key should be used as the first bit of the
 * derived key
 * CK_EXTRACT_PARAMS is new for v2.0
 */
export const CK_EXTRACT_PARAMS = CK_ULONG;

export const CK_EXTRACT_PARAMS_PTR = Ref.refType(CK_EXTRACT_PARAMS);

/**
 * CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE is new for v2.10.
 * CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE is used to
 * indicate the Pseudo-Random Function (PRF) used to generate
 * key bits using PKCS #5 PBKDF2. 
 */
export const CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE = CK_ULONG;

export const CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE_PTR = Ref.refType(CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE);

/* The following PRFs are defined in PKCS #5 v2.0. */
export const CKP_PKCS5_PBKD2_HMAC_SHA1 = 0x00000001;


/* CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE is new for v2.10.
 * CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE is used to indicate the
 * source of the salt value when deriving a key using PKCS #5
 * PBKDF2. */
export const CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE = CK_ULONG;

export const CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE_PTR = Ref.refType(CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE);

/* The following salt value sources are defined in PKCS #5 v2.0. */
export const CKZ_SALT_SPECIFIED = 0x00000001;

/* CK_PKCS5_PBKD2_PARAMS is new for v2.10.
 * CK_PKCS5_PBKD2_PARAMS is a structure that provides the
 * parameters to the CKM_PKCS5_PBKD2 mechanism. */
export const CK_PKCS5_PBKD2_PARAMS = RefStruct({
    saltSource: CK_PKCS5_PBKDF2_SALT_SOURCE_TYPE,
    pSaltSourceData: CK_VOID_PTR,
    ulSaltSourceDataLen: CK_ULONG,
    iterations: CK_ULONG,
    prf: CK_PKCS5_PBKD2_PSEUDO_RANDOM_FUNCTION_TYPE,
    pPrfData: CK_VOID_PTR,
    ulPrfDataLen: CK_ULONG,
    pPassword: CK_UTF8CHAR_PTR,
    ulPasswordLen: CK_ULONG_PTR
});

export const CK_PKCS5_PBKD2_PARAMS_PTR = Ref.refType(CK_PKCS5_PBKD2_PARAMS);

/* All CK_OTP structs are new for PKCS #11 v2.20 amendment 3 */

export const CK_OTP_PARAM_TYPE = CK_ULONG;
export const CK_PARAM_TYPE = CK_OTP_PARAM_TYPE; /* B/w compatibility */

export const CK_OTP_PARAM = RefStruct({
    type: CK_OTP_PARAM_TYPE,
    pValue: CK_VOID_PTR,
    ulValueLen: CK_ULONG
});

export const CK_OTP_PARAM_PTR = Ref.refType(CK_OTP_PARAM);

export const CK_OTP_PARAMS = RefStruct({
    pParams: CK_OTP_PARAM_PTR,
    ulCount: CK_ULONG
});

export const CK_OTP_PARAMS_PTR = Ref.refType(CK_OTP_PARAMS);

export const CK_OTP_SIGNATURE_INFO = RefStruct({
    pParams: CK_OTP_PARAM_PTR,
    ulCount: CK_ULONG
});

export const CK_OTP_SIGNATURE_INFO_PTR = Ref.refType(CK_OTP_SIGNATURE_INFO);

/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1 */
export const CK_OTP_VALUE = 0;
export const CK_OTP_PIN = 1;
export const CK_OTP_CHALLENGE = 2;
export const CK_OTP_TIME = 3;
export const CK_OTP_COUNTER = 4;
export const CK_OTP_FLAGS = 5;
export const CK_OTP_OUTPUT_LENGTH = 6;
export const CK_OTP_OUTPUT_FORMAT = 7;

/* The following OTP-related defines are new for PKCS #11 v2.20 amendment 1 */
export const CKF_NEXT_OTP = 0x00000001;
export const CKF_EXCLUDE_TIME = 0x00000002;
export const CKF_EXCLUDE_COUNTER = 0x00000004;
export const CKF_EXCLUDE_CHALLENGE = 0x00000008;
export const CKF_EXCLUDE_PIN = 0x00000010;
export const CKF_USER_FRIENDLY_OTP = 0x00000020;

/* CK_KIP_PARAMS is new for PKCS #11 v2.20 amendment 2 */
export const CK_KIP_PARAMS = RefStruct({
    pMechanism: CK_MECHANISM_PTR,
    hKey: CK_OBJECT_HANDLE,
    pSeed: CK_BYTE_PTR,
    ulSeedLen: CK_ULONG
});

export const CK_KIP_PARAMS_PTR = Ref.refType(CK_KIP_PARAMS);

/** 
 * CK_AES_CTR_PARAMS is new for PKCS #11 v2.20 amendment 3 
 */
export const CK_AES_CTR_PARAMS = RefStruct({
    ulCounterBits: CK_ULONG,
    cb: RefArray(CK_BYTE, 16)
});

export const CK_AES_CTR_PARAMS_PTR = Ref.refType(CK_AES_CTR_PARAMS);

export const CK_GCM_PARAMS = RefStruct({
    pIv: CK_BYTE_PTR,
    ulIvLen: CK_ULONG,
    ulIvBits: CK_ULONG,
    pAAD: CK_BYTE_PTR,
    ulADDLen: CK_ULONG,
    ulTagBits: CK_ULONG
});

export const CK_GCM_PARAMS_PTR = Ref.refType(CK_GCM_PARAMS);

export const CK_CCM_PARAMS = RefStruct({
    ulDataLen: CK_ULONG,        /*plaintext or ciphertext */
    pNonce: CK_BYTE_PTR,
    ulNonceLen: CK_ULONG,
    pAAD: CK_BYTE_PTR,
    ulADDLen: CK_ULONG,
    ulMACLen: CK_ULONG
});

export const CK_CCM_PARAMS_PTR = Ref.refType(CK_CCM_PARAMS);

/* CK_CAMELLIA_CTR_PARAMS is new for PKCS #11 v2.20 amendment 3 */
export const CK_CAMELLIA_CTR_PARAMS = RefStruct({
    ulCounterBits: CK_ULONG,
    cb: RefArray(CK_BYTE, 16)
});

export const CK_CAMELLIA_CTR_PARAMS_PTR = Ref.refType(CK_CAMELLIA_CTR_PARAMS);

/**
 * CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS is new for PKCS #11 v2.20 amendment 3 
 */
export const CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(CK_BYTE, 16),
    pData: CK_BYTE_PTR,
    length: CK_ULONG
});

export const CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(CK_CAMELLIA_CBC_ENCRYPT_DATA_PARAMS);

/**
 * CK_ARIA_CBC_ENCRYPT_DATA_PARAMS is new for PKCS #11 v2.20 amendment 3 
 */
export const CK_ARIA_CBC_ENCRYPT_DATA_PARAMS = RefStruct({
    iv: RefArray(CK_BYTE, 16),
    pData: CK_BYTE_PTR,
    length: CK_ULONG
});

export const CK_ARIA_CBC_ENCRYPT_DATA_PARAMS_PTR = Ref.refType(CK_ARIA_CBC_ENCRYPT_DATA_PARAMS);