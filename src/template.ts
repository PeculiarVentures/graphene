import * as pkcs11 from "./pkcs11";
import * as core from "./core";

let AttributeArray = core.RefArray(pkcs11.CK_ATTRIBUTE);

export interface ITemplate {
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
    url?: string;
    /**
     * CKA_HASH_OF_SUBJECT_PUBLIC_KEY
     */
    ski?: Buffer;
    /**
     * CKA_HASH_OF_ISSUER_PUBLIC_KEY
     */
    aki?: Buffer;
    /**
     * CKA_NAME_HASH_ALGORITHM
     */
    digestName?: number;
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
    copyable?: boolean;
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
    javaDomain: { v: pkcs11.CKA_JAVA_MIDP_SECURITY_DOMAIN, t: "ulong" },
    url: { v: pkcs11.CKA_URL, t: "string" },
    ski: { v: pkcs11.CKA_HASH_OF_SUBJECT_PUBLIC_KEY, t: "buffer" },
    aki: { v: pkcs11.CKA_HASH_OF_ISSUER_PUBLIC_KEY, t: "buffer" },
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

/**
 * converts name of attribute to id
 * @param {string} name name of attribute
 */
function n2i(name) {
    let attr = attribute[name];
    if (attr && "v" in attr)
        return attr.v;
    throw new Error("Unsupported attribute name '" + name + "'");
}

/**
 * converts id of attribute to name
 * @param {number} cka id of attribute
 */
function i2n(cka) {
    console.log("cka", cka);
    for (let i in attribute) {
        let attr = attribute[i];
        if (attr && "v" in attr && attr.v === cka)
            return i;
    }
    throw new Error("Unsupported attribute ID '" + cka + "'");
}

export class Attribute {

    protected $value: Buffer;
    type: number;
    name: string;
    convertType: string;

    get length(): number {
        return (this.$value === null) ? 0 : this.$value.length;
    }

    get value(): any {
        switch (this.convertType) {
            case "ulong":
                return this.$value[`readUInt${this.$value.length * 8}LE`](0);
            case "bool":
                return this.$value[0] === 1;
            case "utf8":
                // for $value = null, return 0-length Buffer
                return new Buffer(<any>this.$value || 0).toString("utf8");
            case "buffer":
                // for $value = null, return 0-length Buffer
                return new Buffer(<any>this.$value || 0);
            default:
                throw new Error(`Uknown convertType in use '${this.convertType}'`);
        }
    }

    set value(v: any) {
        if (v === null)
            this.$value = null;
        else {
            switch (this.convertType) {
                case "ulong":
                    this.$value = core.Ref.alloc(pkcs11.CK_ULONG, v);
                    break;
                case "bool":
                    this.$value = core.Ref.alloc(pkcs11.CK_BBOOL, v);
                    break;
                case "utf8":
                    this.$value = new Buffer(v, "utf8");
                    break;
                case "buffer":
                    this.$value = v;
                    break;
                default:
                    throw new Error(`Uknown convertType in use '${this.convertType}'`);
            }
        }
    }

    constructor(type: number, value?: any);
    constructor(type: string, value?: any);
    constructor(type, value: any = null) {
        if (core.isString(type)) {
            this.name = type;
            this.type = n2i(type);
        }
        else {
            this.type = type;
            this.name = i2n(type);
        }
        this.convertType = attribute[this.name].t;
        this.value = value;
    }

    get() {
        return pkcs11.CK_ATTRIBUTE({
            type: this.type,
            pValue: this.$value,
            ulValueLen: !this.$value ? 0 : this.$value.length
        });
    }

    set(template: any) {
        if ("type" in template && "pValue" in template && "ulValueLen" in template) {
            if (this.type !== template.type) throw new Error(`Wrong type value '${template.type}', must be '${this.type}'`);
            if (template.ulValueLen !== 0 && !this.$value) {
                // current attr value is init (null)
                this.$value = new Buffer(template.ulValueLen);
            }
        }
        else {
            throw new TypeError(`Parameter 1 is not template`);
        }
    }

}

export class Template {

    protected attrs: Attribute[] = [];

    get length(): number {
        return this.attrs.length;
    }

    constructor(template: string);
    constructor(template: ITemplate);
    constructor(template) {
        let _template: ITemplate = {};
        if (core.isString(template))
            _template[template] = null;
        else
            _template = template;
        for (let key in _template) {
            this.attrs.push(new Attribute(key, _template[key]));
        }
    }

    set(v: any): Template {
        let array = AttributeArray(v);
        for (let i in this.attrs) {
            let attr = this.attrs[i];
            this.attrs[i].set(array[i]);
        }
        return this;
    }

    ref(): Buffer {
        let attrs = [];
        for (let i in this.attrs) {
            attrs.push(this.attrs[i].get());
        }
        return this.attrs.length ? AttributeArray(attrs).buffer : null;
    }

    serialize(): any {
        let res = {};
        for (let i in this.attrs) {
            let attr = this.attrs[i];
            res[attr.name] = attr.value;
        }
        return res;
    }

}