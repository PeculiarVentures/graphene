import * as pkcs11 from "./pkcs11";
import * as core from "./core";

export interface IAttribute {
    /**
     * CKA_CLASS
     */
    class?: number;
    /**
     * CKA_TOKEN
     */
    token?: boolean;
    /**
     * CKA_PRIVATE
     */
    private?: boolean;
    /**
     * CKA_LABEL
     */
    label?: string;
    /**
     * CKA_APPLICATION
     */
    application?: string;
    /**
     * CKA_VALUE
     */
    value?: Buffer;
    /**
     * CKA_OBJECT_ID
     */
    objectId?: Buffer;
    /**
     * CKA_CERTIFICATE_TYPE
     */
    certType?: number;
    /**
     * CKA_ISSUER
     */
    issuer?: Buffer;
    /**
     * CKA_SERIAL_NUMBER
     */
    serial?: Buffer;
    /**
     * CKA_AC_ISSUER
     */
    issuerAC?: Buffer;
    /**
     * CKA_OWNER
     */
    owner?: Buffer;
    /**
     * CKA_ATTR_TYPES
     */
    attrTypes?: Buffer;
    /**
     * CKA_TRUSTED
     */
    trusted?: boolean;
    /**
     * CKA_CERTIFICATE_CATEGORY
     */
    certCategory?: number;
    /**
     * CKA_JAVA_MIDP_SECURITY_DOMAIN
     */
    javaDomain?: number;
    /**
     * CKA_URL
     */
    url?: number;
    /**
     * CKA_HASH_OF_SUBJECT_PUBLIC_KEY
     */
    spki?: Buffer;
    /**
     * CKA_HASH_OF_ISSUER_PUBLIC_KEY
     */
    ipki?: Buffer;
    /**
     * CKA_NAME_HASH_ALGORITHM
     */
    digestName: number;
    /**
     * CKA_CHECK_VALUE
     */
    checkValue?: Buffer;
    /**
     * CKA_KEY_TYPE
     */
    keyType?: number;
    /**
     * CKA_SUBJECT
     */
    subject?: Buffer;
    /**
     * CKA_ID
     */
    id?: Buffer;
    /**
     * CKA_SENSITIVE
     */
    sensitive?: boolean;
    /**
     * CKA_ENCRYPT
     */
    encrypt?: boolean;
    /**
     * CKA_DECRYPT
     */
    decrypt?: boolean;
    /**
     * CKA_WRAP
     */
    wrap?: boolean;
    /**
     * CKA_UNWRAP
     */
    unwrap?: boolean;
    /**
     * CKA_SIGN
     */
    sign?: boolean;
    /**
     * CKA_SIGN_RECOVER
     */
    signRecover?: boolean;
    /**
     * CKA_VERIFY
     */
    verify?: boolean;
    /**
     * CKA_VERIFY_RECOVER
     */
    verifyRecover?: boolean;
    /**
     * CKA_DERIVE
     */
    derive?: boolean;
    /**
     * CKA_START_DATE
     */
    startDate?: Date;
    /**
     * CKA_END_DATE
     */
    endDate?: Date;
    /**
     * CKA_MODULUS
     */
    modulus?: Buffer;
    /**
     * CKA_MODULUS_BITS
     */
    modulusBits?: number;
    /**
     * CKA_PUBLIC_EXPONENT
     */
    publicExponent?: Buffer;
    /**
     * CKA_PRIVATE_EXPONEN
     */
    privateExponent?: Buffer;
    /**
     * CKA_PRIME_1
     */
    prime1?: Buffer;
    /**
     * CKA_PRIME_2
     */
    prime2?: Buffer;
    /**
     * CKA_EXPONENT_1
     */
    exp1?: Buffer;
    /**
     * CKA_EXPONENT_2
     */
    exp2?: Buffer;
    /**
     * CKA_COEFFICIEN
     */
    coefficient?: Buffer;
    /**
     * CKA_PRIME
     */
    prime?: Buffer;
    /**
     * CKA_SUBPRIME
     */
    subprime?: Buffer;
    /**
     * CKA_BASE
     */
    base?: Buffer;
    /**
     * CKA_PRIME_BITS
     */
    primeBits?: number;
    /**
     * CKA_SUBPRIME_BITS
     */
    subprimeBits?: number;
    /**
     * CKA_VALUE_BITS
     */
    valueBits?: number;
    /**
     * CKA_VALUE_LEN
     */
    valueLen?: number;
    /**
     * CKA_EXTRACTABLE
     */
    extractable?: boolean;
    /**
     * CKA_LOCAL
     */
    local?: boolean;
    /**
     * CKA_NEVER_EXTRACTABLE
     */
    neverExtractable?: boolean;
    /**
     * CKA_ALWAYS_SENSITIVE
     */
    alwaysSensitive?: boolean;
    /**
     * CKA_KEY_GEN_MECHANISM
     */
    keyGenMechanism?: number;
    /**
     * CKA_MODIFIABLE
     */
    modifiable?: boolean;
    /**
     * CKA_COPYABLE
     */
    copyable: boolean;
    /**
     * CKA_ECDSA_PARAMS
     */
    paramsECDSA?: Buffer;
    paramsEC?: Buffer;
    /**
     * CKA_EC_POINT
     */
    pointEC?: Buffer;
    /**
     * CKA_SECONDARY_AUTH
     */
    secondaryAuth?: boolean;
    /**
     * CKA_AUTH_PIN_FLAGS
     */
    authPinFlags?: Buffer;
    /**
     * CKA_ALWAYS_AUTHENTICATE
     */
    alwaysAuth?: boolean;
    /**
     * CKA_WRAP_WITH_TRUSTED
     */
    wrapWithTrusted?: boolean;
    /**
     * CKA_WRAP_TEMPLATE
     */
    wrapTemplate?: any;
    /**
     * CKA_UNWRAP_TEMPLATE
     */
    unwrapTemplate?: any;
    /**
     * CKA_OTP_FORMAT
     */
    otpFormat?: any;
    /**
     * CKA_OTP_LENGTH
     */
    otpLength?: any;
    /**
     * CKA_OTP_TIME_INTERVAL
     */
    otpTimeInterval?: any;
    /**
     * CKA_OTP_USER_FRIENDLY_MODE
     */
    otpUserFriendlyMode?: any;
    /**
     * CKA_OTP_CHALLENGE_REQUIREMENT
     */
    otpChallengeReq?: any;
    /**
     * CKA_OTP_TIME_REQUIREMENT
     */
    otpTimeReq?: any;
    /**
     * CKA_OTP_COUNTER_REQUIREMENT
     */
    otpCounterReq?: any;
    /**
     * CKA_OTP_PIN_REQUIREMENT
     */
    otppinReq?: any;
    /**
     * CKA_OTP_COUNTER
     */
    otpCounter?: any;
    /**
     * CKA_OTP_TIME
     */
    otpTime?: any;
    /**
     * CKA_OTP_USER_IDENTIFIER
     */
    OtpUserId?: any;
    /**
     * CKA_OTP_SERVICE_IDENTIFIER
     */
    otpServiceId?: any;
    /**
     * CKA_OTP_SERVICE_LOGO
     */
    otpServiceLogo?: any;
    /**
     * CKA_OTP_SERVICE_LOGO_TYPE
     */
    otpServiceLogoType?: any;
    /**
     * CKA_HW_FEATURE_TYPE
     */
    hwFeatureType?: any;
    /**
     * CKA_RESET_ON_INIT
     */
    resetOnInit?: any;
    /**
     * CKA_HAS_RESET
     */
    hasReset?: any;
    /**
     * CKA_PIXEL_X
     */
    pixelX?: any;
    /**
     * CKA_PIXEL_Y
     */
    pixelY?: any;
    /**
     * CKA_RESOLUTION
     */
    resolution?: any;
    /**
     * CKA_CHAR_ROWS
     */
    charRows?: any;
    /**
     * CKA_CHAR_COLUMNS
     */
    charCols?: any;
    /**
     * CKA_COLOR
     */
    color?: any;
    /**
     * CKA_BITS_PER_PIXEL
     */
    bitsPerPixel?: any;
    /**
     * CKA_CHAR_SETS
     */
    charSets?: any;
    /**
     * CKA_ENCODING_METHODS
     */
    encMethod?: any;
    /**
     * CKA_MIME_TYPES
     */
    mimeTypes?: any;
    /**
     * CKA_MECHANISM_TYPE
     */
    mechanismType?: any;
    /**
     * CKA_REQUIRED_CMS_ATTRIBUTES
     */
    requiredCmsAttrs?: any;
    /**
     * CKA_DEFAULT_CMS_ATTRIBUTES
     */
    defaultCmsAttrs?: any;
    /**
     * CKA_SUPPORTED_CMS_ATTRIBUTES
     */
    suportedCmsAttrs?: any;
    /**
     * CKA_ALLOWED_MECHANISMS
     */
    allowedMechanisms?: any;
}

interface IAttributeTemplate {
    v: any;
    t: string;
}

let attribute = {
    /* The following attribute types are defined: */
    class: { v: pkcs11.CKA_CLASS, t: "ulong" },
    token: { v: pkcs11.CKA_TOKEN, t: "bool" },
    private: { v: pkcs11.CKA_PRIVATE, t: "bool" },
    label: { v: pkcs11.CKA_LABEL, t: "utf8" },
    application: { v: pkcs11.CKA_APPLICATION, t: "utf8" },
    value: { v: pkcs11.CKA_VALUE, t: "buffer" },

    /* CKA_OBJECT_ID is new for v2.10 */
    objectId: { v: pkcs11.CKA_OBJECT_ID, t: "buffer" },

    certType: { v: pkcs11.CKA_CERTIFICATE_TYPE, t: "ulong" },
    issuer: { v: pkcs11.CKA_ISSUER, t: "buffer" },
    serial: { v: pkcs11.CKA_SERIAL_NUMBER, t: "buffer" },

	/* CKA_AC_ISSUER, CKA_OWNER, and CKA_ATTR_TYPES are new
	 * for v2.10 */
    issuerAC: { v: pkcs11.CKA_AC_ISSUER, t: "buffer" },
    owner: { v: pkcs11.CKA_OWNER, t: "buffer" },
    attrTypes: { v: pkcs11.CKA_ATTR_TYPES, t: "buffer" },

    /* CKA_TRUSTED is new for v2.11 */
    trusted: { v: pkcs11.CKA_TRUSTED, t: "bool" },

	/* CKA_CERTIFICATE_CATEGORY ...
	 * CKA_CHECK_VALUE are new for v2.20 */
    certCategory: { v: pkcs11.CKA_CERTIFICATE_CATEGORY, t: "ulong" },
    javaDomain: { v: pkcs11.CKA_CERTIFICATE_CATEGORY, t: "ulong" },
    url: { v: pkcs11.CKA_URL, t: "ulong" },
    spki: { v: pkcs11.CKA_HASH_OF_SUBJECT_PUBLIC_KEY, t: "buffer" },
    ipki: { v: pkcs11.CKA_HASH_OF_ISSUER_PUBLIC_KEY, t: "buffer" },
    digestName: { v: pkcs11.CKA_NAME_HASH_ALGORITHM, t: "ulong" },
    checkValue: { v: pkcs11.CKA_CHECK_VALUE, t: "buffer" },

    keyType: { v: pkcs11.CKA_KEY_TYPE, t: "ulong" },
    subject: { v: pkcs11.CKA_SUBJECT, t: "buffer" },
    id: { v: pkcs11.CKA_ID, t: "buffer" },
    sensitive: { v: pkcs11.CKA_SENSITIVE, t: "bool" },
    encrypt: { v: pkcs11.CKA_ENCRYPT, t: "bool" },
    decrypt: { v: pkcs11.CKA_DECRYPT, t: "bool" },
    wrap: { v: pkcs11.CKA_WRAP, t: "bool" },
    unwrap: { v: pkcs11.CKA_UNWRAP, t: "bool" },
    sign: { v: pkcs11.CKA_SIGN, t: "bool" },
    signRecover: { v: pkcs11.CKA_SIGN_RECOVER, t: "bool" },
    verify: { v: pkcs11.CKA_VERIFY, t: "bool" },
    verifyRecover: { v: pkcs11.CKA_VERIFY_RECOVER, t: "bool" },
    derive: { v: pkcs11.CKA_DERIVE, t: "bool" },
    startDate: { v: pkcs11.CKA_START_DATE, t: "date" },
    endDate: { v: pkcs11.CKA_END_DATE, t: "date" },
    modulus: { v: pkcs11.CKA_MODULUS, t: "buffer" },
    modulusBits: { v: pkcs11.CKA_MODULUS_BITS, t: "ulong" },
    publicExponent: { v: pkcs11.CKA_PUBLIC_EXPONENT, t: "buffer" },
    privateExponent: { v: pkcs11.CKA_PRIVATE_EXPONENT, t: "buffer" },
    prime1: { v: pkcs11.CKA_PRIME_1, t: "buffer" },
    prime2: { v: pkcs11.CKA_PRIME_2, t: "buffer" },
    exp1: { v: pkcs11.CKA_EXPONENT_1, t: "buffer" },
    exp2: { v: pkcs11.CKA_EXPONENT_2, t: "buffer" },
    coefficient: { v: pkcs11.CKA_COEFFICIENT, t: "buffer" },
    prime: { v: pkcs11.CKA_PRIME, t: "buffer" },
    subprime: { v: pkcs11.CKA_SUBPRIME, t: "buffer" },
    base: { v: pkcs11.CKA_BASE, t: "buffer" },

    /* CKA_PRIME_BITS and CKA_SUB_PRIME_BITS are new for v2.11 */
    primeBits: { v: pkcs11.CKA_PRIME_BITS, t: "ulong" },
    subprimeBits: { v: pkcs11.CKA_SUBPRIME_BITS, t: "ulong" },
    /* (To retain backwards-compatibility) */

    valueBits: { v: pkcs11.CKA_VALUE_BITS, t: "ulong" },
    valueLen: { v: pkcs11.CKA_VALUE_LEN, t: "ulong" },

	/* CKA_EXTRACTABLE, CKA_LOCAL, CKA_NEVER_EXTRACTABLE,
	 * CKA_ALWAYS_SENSITIVE, CKA_MODIFIABLE, CKA_ECDSA_PARAMS,
	 * and CKA_EC_POINT are new for v2.0 */
    extractable: { v: pkcs11.CKA_EXTRACTABLE, t: "bool" },
    local: { v: pkcs11.CKA_LOCAL, t: "bool" },
    neverExtractable: { v: pkcs11.CKA_NEVER_EXTRACTABLE, t: "bool" },
    alwaysSensitive: { v: pkcs11.CKA_ALWAYS_SENSITIVE, t: "bool" },

    /* CKA_KEY_GEN_MECHANISM is new for v2.11 */
    keyGenMechanism: { v: pkcs11.CKA_KEY_GEN_MECHANISM, t: "ulong" },

    modifiable: { v: pkcs11.CKA_MODIFIABLE, t: "bool" },

	/* CKA_ECDSA_PARAMS is deprecated in v2.11,
	 * CKA_EC_PARAMS is preferred. */
    paramsECDSA: { v: pkcs11.CKA_ECDSA_PARAMS, t: "buffer" },
    paramsEC: { v: pkcs11.CKA_EC_PARAMS, t: "buffer" },

    pointEC: { v: pkcs11.CKA_EC_POINT, t: "buffer" },

	/* CKA_SECONDARY_AUTH, CKA_AUTH_PIN_FLAGS,
	 * are new for v2.10. Deprecated in v2.11 and onwards. */
    secondaryAuth: { v: pkcs11.CKA_SECONDARY_AUTH, t: "bool" },
    authPinFlags: { v: pkcs11.CKA_AUTH_PIN_FLAGS, t: "buffer" },

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

export class Template {
    static convert(attrs: IAttribute): Buffer {
        let tpl = [];
        for (let i in attrs) {
            let at = attribute[i];
            if (at) {
                if (at && at.t) {
                    let val = prepare_value(i, at, attrs[i]);
                    let attr = attribute_create(at.v, val, val.length);
                    tpl.push(attr);
                }
                else
                    throw new TypeError(`'${i}' attribute is not supported'`);
            }
            else
                throw new Error(`'${i}' attribute is not founded'`);
        }
        if (!tpl.length)
            throw new Error("Template hasn't got any attributes");
        return Buffer.concat(tpl);
    }
}

function attribute_create(t: string, v: any, l: number): Buffer {
    return (new pkcs11.CK_ATTRIBUTE({ type: t, pValue: v, ulValueLen: l })).ref();
}

function prepare_value(attrName: string, attrTmpl: IAttributeTemplate, value: any) {
    let buf;
    switch (attrTmpl.t) {
        case "ulong":
            if (!core.isNumber(value))
                throw new TypeError(`Template: Parameter 3 must be a Number`);
            let size = core.Ref.types.ulong.size;
            buf = new Buffer(size);
            if (size === 8)
                buf.writeUInt64LE(value, 0);
            else
                buf.writeUInt32LE(value, 0);
            break;
        case "bool":
            buf = new Buffer([value == 1]);
            break;
        case "utf8":
            if (!core.isString(value))
                throw new TypeError(`Template: Parameter 3 must be a String`);
            buf = new Buffer(value, "utf8");
            break;
        case "buffer":
            if (!Buffer.isBuffer(value))
                throw new TypeError(`Template: Parameter 3 must be a Buffer`);
            buf = value;
            break;
        case "date":
            throw new Error("Not supported in this implementation");
            break;
        default:
            throw new TypeError(`Unknown type '${attrTmpl.t}' in enum Attribute value '${attrName}'.`);
    }
    return buf;
}