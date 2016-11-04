import * as pkcs11 from "pkcs11js";

export interface ITemplate {
    /**
     * CKA_CLASS
     */
    class?: number | null;
    /**
     * CKA_TOKEN
     */
    token?: boolean | null;
    /**
     * CKA_PRIVATE
     */
    private?: boolean | null;
    /**
     * CKA_LABEL
     */
    label?: string | null;
    /**
     * CKA_APPLICATION
     */
    application?: string | null;
    /**
     * CKA_VALUE
     */
    value?: Buffer | null;
    /**
     * CKA_OBJECT_ID
     */
    objectId?: Buffer | null;
    /**
     * CKA_CERTIFICATE_TYPE
     */
    certType?: number;
    /**
     * CKA_ISSUER
     */
    issuer?: Buffer | null;
    /**
     * CKA_SERIAL_NUMBER
     */
    serial?: Buffer | null;
    /**
     * CKA_AC_ISSUER
     */
    issuerAC?: Buffer | null;
    /**
     * CKA_OWNER
     */
    owner?: Buffer | null;
    /**
     * CKA_ATTR_TYPES
     */
    attrTypes?: Buffer | null;
    /**
     * CKA_TRUSTED
     */
    trusted?: boolean | null;
    /**
     * CKA_CERTIFICATE_CATEGORY
     */
    certCategory?: number | null;
    /**
     * CKA_JAVA_MIDP_SECURITY_DOMAIN
     */
    javaDomain?: number | null;
    /**
     * CKA_URL
     */
    url?: string | null;
    /**
     * CKA_HASH_OF_SUBJECT_PUBLIC_KEY
     */
    ski?: Buffer | null;
    /**
     * CKA_HASH_OF_ISSUER_PUBLIC_KEY
     */
    aki?: Buffer | null;
    /**
     * CKA_NAME_HASH_ALGORITHM
     */
    digestName?: number | null;
    /**
     * CKA_CHECK_VALUE
     */
    checkValue?: Buffer | null;
    /**
     * CKA_KEY_TYPE
     */
    keyType?: number | null;
    /**
     * CKA_SUBJECT
     */
    subject?: Buffer | null;
    /**
     * CKA_ID
     */
    id?: Buffer | null;
    /**
     * CKA_SENSITIVE
     */
    sensitive?: boolean | null;
    /**
     * CKA_ENCRYPT
     */
    encrypt?: boolean | null;
    /**
     * CKA_DECRYPT
     */
    decrypt?: boolean | null;
    /**
     * CKA_WRAP
     */
    wrap?: boolean | null;
    /**
     * CKA_UNWRAP
     */
    unwrap?: boolean | null;
    /**
     * CKA_SIGN
     */
    sign?: boolean | null;
    /**
     * CKA_SIGN_RECOVER
     */
    signRecover?: boolean | null;
    /**
     * CKA_VERIFY
     */
    verify?: boolean | null;
    /**
     * CKA_VERIFY_RECOVER
     */
    verifyRecover?: boolean | null;
    /**
     * CKA_DERIVE
     */
    derive?: boolean | null;
    /**
     * CKA_START_DATE
     */
    startDate?: Date | null;
    /**
     * CKA_END_DATE
     */
    endDate?: Date | null;
    /**
     * CKA_MODULUS
     */
    modulus?: Buffer | null;
    /**
     * CKA_MODULUS_BITS
     */
    modulusBits?: number | null;
    /**
     * CKA_PUBLIC_EXPONENT
     */
    publicExponent?: Buffer | null;
    /**
     * CKA_PRIVATE_EXPONEN
     */
    privateExponent?: Buffer | null;
    /**
     * CKA_PRIME_1
     */
    prime1?: Buffer | null;
    /**
     * CKA_PRIME_2
     */
    prime2?: Buffer | null;
    /**
     * CKA_EXPONENT_1
     */
    exp1?: Buffer | null;
    /**
     * CKA_EXPONENT_2
     */
    exp2?: Buffer | null;
    /**
     * CKA_COEFFICIEN
     */
    coefficient?: Buffer | null;
    /**
     * CKA_PRIME
     */
    prime?: Buffer | null;
    /**
     * CKA_SUBPRIME
     */
    subprime?: Buffer | null;
    /**
     * CKA_BASE
     */
    base?: Buffer | null;
    /**
     * CKA_PRIME_BITS
     */
    primeBits?: number | null;
    /**
     * CKA_SUBPRIME_BITS
     */
    subprimeBits?: number | null;
    /**
     * CKA_VALUE_BITS
     */
    valueBits?: number | null;
    /**
     * CKA_VALUE_LEN
     */
    valueLen?: number | null;
    /**
     * CKA_EXTRACTABLE
     */
    extractable?: boolean | null;
    /**
     * CKA_LOCAL
     */
    local?: boolean | null;
    /**
     * CKA_NEVER_EXTRACTABLE
     */
    neverExtractable?: boolean | null;
    /**
     * CKA_ALWAYS_SENSITIVE
     */
    alwaysSensitive?: boolean | null;
    /**
     * CKA_KEY_GEN_MECHANISM
     */
    keyGenMechanism?: number | null;
    /**
     * CKA_MODIFIABLE
     */
    modifiable?: boolean | null;
    /**
     * CKA_COPYABLE
     */
    copyable?: boolean | null;
    /**
     * CKA_ECDSA_PARAMS
     */
    paramsECDSA?: Buffer | null;
    paramsEC?: Buffer | null;
    /**
     * CKA_EC_POINT
     */
    pointEC?: Buffer | null;
    /**
     * CKA_SECONDARY_AUTH
     */
    secondaryAuth?: boolean | null;
    /**
     * CKA_AUTH_PIN_FLAGS
     */
    authPinFlags?: Buffer | null;
    /**
     * CKA_ALWAYS_AUTHENTICATE
     */
    alwaysAuth?: boolean | null;
    /**
     * CKA_WRAP_WITH_TRUSTED
     */
    wrapWithTrusted?: boolean | null;
    /**
     * CKA_WRAP_TEMPLATE
     */
    wrapTemplate?: any | null;
    /**
     * CKA_UNWRAP_TEMPLATE
     */
    unwrapTemplate?: any | null;
    /**
     * CKA_OTP_FORMAT
     */
    otpFormat?: any | null;
    /**
     * CKA_OTP_LENGTH
     */
    otpLength?: any | null;
    /**
     * CKA_OTP_TIME_INTERVAL
     */
    otpTimeInterval?: any | null;
    /**
     * CKA_OTP_USER_FRIENDLY_MODE
     */
    otpUserFriendlyMode?: any | null;
    /**
     * CKA_OTP_CHALLENGE_REQUIREMENT
     */
    otpChallengeReq?: any | null;
    /**
     * CKA_OTP_TIME_REQUIREMENT
     */
    otpTimeReq?: any | null;
    /**
     * CKA_OTP_COUNTER_REQUIREMENT
     */
    otpCounterReq?: any | null;
    /**
     * CKA_OTP_PIN_REQUIREMENT
     */
    otppinReq?: any | null;
    /**
     * CKA_OTP_COUNTER
     */
    otpCounter?: any | null;
    /**
     * CKA_OTP_TIME
     */
    otpTime?: any | null;
    /**
     * CKA_OTP_USER_IDENTIFIER
     */
    otpUserId?: any | null;
    /**
     * CKA_OTP_SERVICE_IDENTIFIER
     */
    otpServiceId?: any | null;
    /**
     * CKA_OTP_SERVICE_LOGO
     */
    otpServiceLogo?: any | null;
    /**
     * CKA_OTP_SERVICE_LOGO_TYPE
     */
    otpServiceLogoType?: any | null;
    /**
     * CKA_HW_FEATURE_TYPE
     */
    hwFeatureType?: any | null;
    /**
     * CKA_RESET_ON_INIT
     */
    resetOnInit?: any | null;
    /**
     * CKA_HAS_RESET
     */
    hasReset?: any | null;
    /**
     * CKA_PIXEL_X
     */
    pixelX?: any | null;
    /**
     * CKA_PIXEL_Y
     */
    pixelY?: any | null;
    /**
     * CKA_RESOLUTION
     */
    resolution?: any | null;
    /**
     * CKA_CHAR_ROWS
     */
    charRows?: any | null;
    /**
     * CKA_CHAR_COLUMNS
     */
    charCols?: any | null;
    /**
     * CKA_COLOR
     */
    color?: any | null;
    /**
     * CKA_BITS_PER_PIXEL
     */
    bitsPerPixel?: any | null;
    /**
     * CKA_CHAR_SETS
     */
    charSets?: any | null;
    /**
     * CKA_ENCODING_METHODS
     */
    encMethod?: any | null;
    /**
     * CKA_MIME_TYPES
     */
    mimeTypes?: any | null;
    /**
     * CKA_MECHANISM_TYPE
     */
    mechanismType?: any | null;
    /**
     * CKA_REQUIRED_CMS_ATTRIBUTES
     */
    requiredCmsAttrs?: any | null;
    /**
     * CKA_DEFAULT_CMS_ATTRIBUTES
     */
    defaultCmsAttrs?: any | null;
    /**
     * CKA_SUPPORTED_CMS_ATTRIBUTES
     */
    suportedCmsAttrs?: any | null;
    /**
     * CKA_ALLOWED_MECHANISMS
     */
    allowedMechanisms?: any | null;
}

const TYPE_NUMBER = "number";
const TYPE_BOOL = "boolen";
const TYPE_STRING = "string";
const TYPE_BUFFER = "buffer";
const TYPE_DATE = "date";

let attribute = {
    /* The following attribute types are defined: */
    class: { v: pkcs11.CKA_CLASS, t: TYPE_NUMBER },
    token: { v: pkcs11.CKA_TOKEN, t: TYPE_BOOL },
    private: { v: pkcs11.CKA_PRIVATE, t: TYPE_BOOL },
    label: { v: pkcs11.CKA_LABEL, t: TYPE_STRING },
    application: { v: pkcs11.CKA_APPLICATION, t: TYPE_STRING },
    value: { v: pkcs11.CKA_VALUE, t: TYPE_BUFFER },

    /* CKA_OBJECT_ID is new for v2.10 */
    objectId: { v: pkcs11.CKA_OBJECT_ID, t: TYPE_BUFFER },

    certType: { v: pkcs11.CKA_CERTIFICATE_TYPE, t: TYPE_NUMBER },
    issuer: { v: pkcs11.CKA_ISSUER, t: TYPE_BUFFER },
    serial: { v: pkcs11.CKA_SERIAL_NUMBER, t: TYPE_BUFFER },

	/* CKA_AC_ISSUER, CKA_OWNER, and CKA_ATTR_TYPES are new
	 * for v2.10 */
    issuerAC: { v: pkcs11.CKA_AC_ISSUER, t: TYPE_BUFFER },
    owner: { v: pkcs11.CKA_OWNER, t: TYPE_BUFFER },
    attrTypes: { v: pkcs11.CKA_ATTR_TYPES, t: TYPE_BUFFER },

    /* CKA_TRUSTED is new for v2.11 */
    trusted: { v: pkcs11.CKA_TRUSTED, t: TYPE_BOOL },

	/* CKA_CERTIFICATE_CATEGORY ...
	 * CKA_CHECK_VALUE are new for v2.20 */
    certCategory: { v: pkcs11.CKA_CERTIFICATE_CATEGORY, t: TYPE_NUMBER },
    javaDomain: { v: pkcs11.CKA_JAVA_MIDP_SECURITY_DOMAIN, t: TYPE_NUMBER },
    url: { v: pkcs11.CKA_URL, t: TYPE_STRING },
    ski: { v: pkcs11.CKA_HASH_OF_SUBJECT_PUBLIC_KEY, t: TYPE_BUFFER },
    aki: { v: pkcs11.CKA_HASH_OF_ISSUER_PUBLIC_KEY, t: TYPE_BUFFER },
    // digestName: { v: pkcs11.CKA_NAME_HASH_ALGORITHM, t: TYPE_NUMBER },
    checkValue: { v: pkcs11.CKA_CHECK_VALUE, t: TYPE_BUFFER },

    keyType: { v: pkcs11.CKA_KEY_TYPE, t: TYPE_NUMBER },
    subject: { v: pkcs11.CKA_SUBJECT, t: TYPE_BUFFER },
    id: { v: pkcs11.CKA_ID, t: TYPE_BUFFER },
    sensitive: { v: pkcs11.CKA_SENSITIVE, t: TYPE_BOOL },
    encrypt: { v: pkcs11.CKA_ENCRYPT, t: TYPE_BOOL },
    decrypt: { v: pkcs11.CKA_DECRYPT, t: TYPE_BOOL },
    wrap: { v: pkcs11.CKA_WRAP, t: TYPE_BOOL },
    unwrap: { v: pkcs11.CKA_UNWRAP, t: TYPE_BOOL },
    sign: { v: pkcs11.CKA_SIGN, t: TYPE_BOOL },
    signRecover: { v: pkcs11.CKA_SIGN_RECOVER, t: TYPE_BOOL },
    verify: { v: pkcs11.CKA_VERIFY, t: TYPE_BOOL },
    verifyRecover: { v: pkcs11.CKA_VERIFY_RECOVER, t: TYPE_BOOL },
    derive: { v: pkcs11.CKA_DERIVE, t: TYPE_BOOL },
    startDate: { v: pkcs11.CKA_START_DATE, t: TYPE_DATE },
    endDate: { v: pkcs11.CKA_END_DATE, t: TYPE_DATE },
    modulus: { v: pkcs11.CKA_MODULUS, t: TYPE_BUFFER },
    modulusBits: { v: pkcs11.CKA_MODULUS_BITS, t: TYPE_NUMBER },
    publicExponent: { v: pkcs11.CKA_PUBLIC_EXPONENT, t: TYPE_BUFFER },
    privateExponent: { v: pkcs11.CKA_PRIVATE_EXPONENT, t: TYPE_BUFFER },
    prime1: { v: pkcs11.CKA_PRIME_1, t: TYPE_BUFFER },
    prime2: { v: pkcs11.CKA_PRIME_2, t: TYPE_BUFFER },
    exp1: { v: pkcs11.CKA_EXPONENT_1, t: TYPE_BUFFER },
    exp2: { v: pkcs11.CKA_EXPONENT_2, t: TYPE_BUFFER },
    coefficient: { v: pkcs11.CKA_COEFFICIENT, t: TYPE_BUFFER },
    prime: { v: pkcs11.CKA_PRIME, t: TYPE_BUFFER },
    subprime: { v: pkcs11.CKA_SUBPRIME, t: TYPE_BUFFER },
    base: { v: pkcs11.CKA_BASE, t: TYPE_BUFFER },

    /* CKA_PRIME_BITS and CKA_SUB_PRIME_BITS are new for v2.11 */
    primeBits: { v: pkcs11.CKA_PRIME_BITS, t: TYPE_NUMBER },
    subprimeBits: { v: pkcs11.CKA_SUBPRIME_BITS, t: TYPE_NUMBER },
    /* (To retain backwards-compatibility) */

    valueBits: { v: pkcs11.CKA_VALUE_BITS, t: TYPE_NUMBER },
    valueLen: { v: pkcs11.CKA_VALUE_LEN, t: TYPE_NUMBER },

	/* CKA_EXTRACTABLE, CKA_LOCAL, CKA_NEVER_EXTRACTABLE,
	 * CKA_ALWAYS_SENSITIVE, CKA_MODIFIABLE, CKA_ECDSA_PARAMS,
	 * and CKA_EC_POINT are new for v2.0 */
    extractable: { v: pkcs11.CKA_EXTRACTABLE, t: TYPE_BOOL },
    local: { v: pkcs11.CKA_LOCAL, t: TYPE_BOOL },
    neverExtractable: { v: pkcs11.CKA_NEVER_EXTRACTABLE, t: TYPE_BOOL },
    alwaysSensitive: { v: pkcs11.CKA_ALWAYS_SENSITIVE, t: TYPE_BOOL },

    /* CKA_KEY_GEN_MECHANISM is new for v2.11 */
    keyGenMechanism: { v: pkcs11.CKA_KEY_GEN_MECHANISM, t: TYPE_NUMBER },

    modifiable: { v: pkcs11.CKA_MODIFIABLE, t: TYPE_BOOL },

	/* CKA_ECDSA_PARAMS is deprecated in v2.11,
	 * CKA_EC_PARAMS is preferred. */
    paramsECDSA: { v: pkcs11.CKA_ECDSA_PARAMS, t: TYPE_BUFFER },
    paramsEC: { v: pkcs11.CKA_EC_PARAMS, t: TYPE_BUFFER },

    pointEC: { v: pkcs11.CKA_EC_POINT, t: TYPE_BUFFER },

	/* CKA_SECONDARY_AUTH, CKA_AUTH_PIN_FLAGS,
	 * are new for v2.10. Deprecated in v2.11 and onwards. */
    secondaryAuth: { v: pkcs11.CKA_SECONDARY_AUTH, t: TYPE_BOOL },
    authPinFlags: { v: pkcs11.CKA_AUTH_PIN_FLAGS, t: TYPE_BUFFER },

	/* CKA_ALWAYS_AUTHENTICATE ...
	 * CKA_UNWRAP_TEMPLATE are new for v2.20 */
    alwaysAuth: pkcs11.CKA_ALWAYS_AUTHENTICATE,

    wrapWithTrusted: pkcs11.CKA_WRAP_WITH_TRUSTED,
    wrapTemplate: pkcs11.CKA_WRAP_TEMPLATE,
    unwrapTemplate: pkcs11.CKA_UNWRAP_TEMPLATE,

    /* CKA_OTP... atttributes are new for PKCS #11 v2.20 amendment 3. */
    otpFormat: pkcs11.CKA_OTP_FORMAT,
    otpLength: pkcs11.CKA_OTP_LENGTH,
    otpTimeInterval: pkcs11.CKA_OTP_TIME_INTERVAL,
    otpUserFriendlyMode: pkcs11.CKA_OTP_USER_FRIENDLY_MODE,
    otpChallengeReq: pkcs11.CKA_OTP_CHALLENGE_REQUIREMENT,
    otpTimeReq: pkcs11.CKA_OTP_TIME_REQUIREMENT,
    otpCounterReq: pkcs11.CKA_OTP_COUNTER_REQUIREMENT,
    otppinReq: pkcs11.CKA_OTP_PIN_REQUIREMENT,
    otpCounter: pkcs11.CKA_OTP_COUNTER,
    otpTime: pkcs11.CKA_OTP_TIME,
    OtpUserId: pkcs11.CKA_OTP_USER_IDENTIFIER,
    otpServiceId: pkcs11.CKA_OTP_SERVICE_IDENTIFIER,
    otpServiceLogo: pkcs11.CKA_OTP_SERVICE_LOGO,
    otpServiceLogoType: pkcs11.CKA_OTP_SERVICE_LOGO_TYPE,


	/* CKA_HW_FEATURE_TYPE, CKA_RESET_ON_INIT, and CKA_HAS_RESET
	 * are new for v2.10 */
    hwFeatureType: pkcs11.CKA_HW_FEATURE_TYPE,
    resetOnInit: pkcs11.CKA_RESET_ON_INIT,
    hasReset: pkcs11.CKA_HAS_RESET,

    /* The following attributes are new for v2.20 */
    pixelX: pkcs11.CKA_PIXEL_X,
    pixelY: pkcs11.CKA_PIXEL_Y,
    resolution: pkcs11.CKA_RESOLUTION,
    charRows: pkcs11.CKA_CHAR_ROWS,
    charCols: pkcs11.CKA_CHAR_COLUMNS,
    color: pkcs11.CKA_COLOR,
    bitsPerPixel: pkcs11.CKA_BITS_PER_PIXEL,
    charSets: pkcs11.CKA_CHAR_SETS,
    encMethod: pkcs11.CKA_ENCODING_METHODS,
    mimeTypes: pkcs11.CKA_MIME_TYPES,
    mechanismType: pkcs11.CKA_MECHANISM_TYPE,
    requiredCmsAttrs: pkcs11.CKA_REQUIRED_CMS_ATTRIBUTES,
    defaultCmsAttrs: pkcs11.CKA_DEFAULT_CMS_ATTRIBUTES,
    suportedCmsAttrs: pkcs11.CKA_SUPPORTED_CMS_ATTRIBUTES,
    allowedMechanisms: pkcs11.CKA_ALLOWED_MECHANISMS
};

/**
 * converts name of attribute to id
 * @param {string} name name of attribute
 */
function n2i(name: string) {
    let attr = (attribute as any)[name];
    if (attr && "v" in attr)
        return attr.v;
    throw new Error(`Unsupported attribute name '${name}'`);
}

/**
 * converts id of attribute to name
 * @param {number} cka id of attribute
 */
function i2n(cka: number) {
    for (let i in attribute) {
        let attr = (attribute as any)[i];
        if (attr && "v" in attr && attr.v === cka)
            return i;
    }
    throw new Error(`Unsupported attribute ID '${cka}'`);
}

/**
 * Convert buffer to value
 * 
 * @param {Buffer} value
 * @returns {*}
 */
function b2v(type: string, value: Buffer): any {
    switch (type) {
        case TYPE_NUMBER:
            return value.readUInt32LE(0);
        case TYPE_BOOL:
            return value[0] === 1;
        case TYPE_STRING:
            return value.toString();
        case TYPE_BUFFER:
            return value;
        default:
            throw new Error(`Uknown type in use '${type}'`);
    }
}

export class Template {

    static toPkcs11(tmpl: ITemplate | null) {
        let res: pkcs11.Template = [];
        if (tmpl)
            for (let key in tmpl) {
                res.push({
                    type: n2i(key),
                    value: (tmpl as any)[key]
                });
            }
        return res;
    }

    static fromPkcs11(tmpl: pkcs11.Template) {
        let res: ITemplate = {};
        for (let i in tmpl) {
            let attr = tmpl[i];
            let name = i2n(attr.type);
            let type = (attribute as any)[name].t;
            if (type === void 0)
                throw new Error(`Can not get type for attribute '${name}'`);
            (res as any)[i2n(attr.type)] = b2v(type, attr.value as Buffer);
        }
        return res;
    }
}
