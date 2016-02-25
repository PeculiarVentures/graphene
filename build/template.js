var pkcs11 = require("./pkcs11");
var core = require("./core");
var AttributeArray = core.RefArray(pkcs11.CK_ATTRIBUTE);
var attribute = {
    class: { v: pkcs11.CKA_CLASS, t: "ulong" },
    token: { v: pkcs11.CKA_TOKEN, t: "bool" },
    private: { v: pkcs11.CKA_PRIVATE, t: "bool" },
    label: { v: pkcs11.CKA_LABEL, t: "utf8" },
    application: { v: pkcs11.CKA_APPLICATION, t: "utf8" },
    value: { v: pkcs11.CKA_VALUE, t: "buffer" },
    objectId: { v: pkcs11.CKA_OBJECT_ID, t: "buffer" },
    certType: { v: pkcs11.CKA_CERTIFICATE_TYPE, t: "ulong" },
    issuer: { v: pkcs11.CKA_ISSUER, t: "buffer" },
    serial: { v: pkcs11.CKA_SERIAL_NUMBER, t: "buffer" },
    issuerAC: { v: pkcs11.CKA_AC_ISSUER, t: "buffer" },
    owner: { v: pkcs11.CKA_OWNER, t: "buffer" },
    attrTypes: { v: pkcs11.CKA_ATTR_TYPES, t: "buffer" },
    trusted: { v: pkcs11.CKA_TRUSTED, t: "bool" },
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
    primeBits: { v: pkcs11.CKA_PRIME_BITS, t: "ulong" },
    subprimeBits: { v: pkcs11.CKA_SUBPRIME_BITS, t: "ulong" },
    valueBits: { v: pkcs11.CKA_VALUE_BITS, t: "ulong" },
    valueLen: { v: pkcs11.CKA_VALUE_LEN, t: "ulong" },
    extractable: { v: pkcs11.CKA_EXTRACTABLE, t: "bool" },
    local: { v: pkcs11.CKA_LOCAL, t: "bool" },
    neverExtractable: { v: pkcs11.CKA_NEVER_EXTRACTABLE, t: "bool" },
    alwaysSensitive: { v: pkcs11.CKA_ALWAYS_SENSITIVE, t: "bool" },
    keyGenMechanism: { v: pkcs11.CKA_KEY_GEN_MECHANISM, t: "ulong" },
    modifiable: { v: pkcs11.CKA_MODIFIABLE, t: "bool" },
    paramsECDSA: { v: pkcs11.CKA_ECDSA_PARAMS, t: "buffer" },
    paramsEC: { v: pkcs11.CKA_EC_PARAMS, t: "buffer" },
    pointEC: { v: pkcs11.CKA_EC_POINT, t: "buffer" },
    secondaryAuth: { v: pkcs11.CKA_SECONDARY_AUTH, t: "bool" },
    authPinFlags: { v: pkcs11.CKA_AUTH_PIN_FLAGS, t: "buffer" },
    alwaysAuth: pkcs11.CKA_ALWAYS_AUTHENTICATE,
    wrapWithTrusted: pkcs11.CKA_WRAP_WITH_TRUSTED,
    wrapTemplate: pkcs11.CKA_WRAP_TEMPLATE,
    unwrapTemplate: pkcs11.CKA_UNWRAP_TEMPLATE,
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
    hwFeatureType: pkcs11.CKA_HW_FEATURE_TYPE,
    resetOnInit: pkcs11.CKA_RESET_ON_INIT,
    hasReset: pkcs11.CKA_HAS_RESET,
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
function n2i(name) {
    var attr = attribute[name];
    if (attr && "v" in attr)
        return attr.v;
    throw new Error("Unsupported attribute name '" + name + "'");
}
function i2n(cka) {
    console.log("cka", cka);
    for (var i in attribute) {
        var attr = attribute[i];
        if (attr && "v" in attr && attr.v === cka)
            return i;
    }
    throw new Error("Unsupported attribute ID '" + cka + "'");
}
var Attribute = (function () {
    function Attribute(type, value) {
        if (value === void 0) { value = null; }
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
    Object.defineProperty(Attribute.prototype, "length", {
        get: function () {
            return (this.$value === null) ? 0 : this.$value.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "value", {
        get: function () {
            switch (this.convertType) {
                case "ulong":
                    return this.$value[("readUInt" + this.$value.length * 8 + "LE")](0);
                case "bool":
                    return this.$value[0] === 1;
                case "utf8":
                    return new Buffer(this.$value || 0).toString("utf8");
                case "buffer":
                    return new Buffer(this.$value || 0);
                default:
                    throw new Error("Uknown convertType in use '" + this.convertType + "'");
            }
        },
        set: function (v) {
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
                        throw new Error("Uknown convertType in use '" + this.convertType + "'");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Attribute.prototype.get = function () {
        return pkcs11.CK_ATTRIBUTE({
            type: this.type,
            pValue: this.$value,
            ulValueLen: !this.$value ? 0 : this.$value.length
        });
    };
    Attribute.prototype.set = function (template) {
        if ("type" in template && "pValue" in template && "ulValueLen" in template) {
            if (this.type !== template.type)
                throw new Error("Wrong type value '" + template.type + "', must be '" + this.type + "'");
            if (template.ulValueLen !== 0 && !this.$value) {
                this.$value = new Buffer(template.ulValueLen);
            }
        }
        else {
            throw new TypeError("Parameter 1 is not template");
        }
    };
    return Attribute;
})();
exports.Attribute = Attribute;
var Template = (function () {
    function Template(template) {
        this.attrs = [];
        var _template = {};
        if (core.isString(template))
            _template[template] = null;
        else
            _template = template;
        for (var key in _template) {
            this.attrs.push(new Attribute(key, _template[key]));
        }
    }
    Object.defineProperty(Template.prototype, "length", {
        get: function () {
            return this.attrs.length;
        },
        enumerable: true,
        configurable: true
    });
    Template.prototype.set = function (v) {
        var array = AttributeArray(v);
        for (var i in this.attrs) {
            var attr = this.attrs[i];
            this.attrs[i].set(array[i]);
        }
        return this;
    };
    Template.prototype.ref = function () {
        var attrs = [];
        for (var i in this.attrs) {
            attrs.push(this.attrs[i].get());
        }
        return this.attrs.length ? AttributeArray(attrs).buffer : null;
    };
    Template.prototype.serialize = function () {
        var res = {};
        for (var i in this.attrs) {
            var attr = this.attrs[i];
            res[attr.name] = attr.value;
        }
        return res;
    };
    return Template;
})();
exports.Template = Template;
