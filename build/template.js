"use strict";
var pkcs11 = require("pkcs11js");
var TYPE_NUMBER = "number";
var TYPE_BOOL = "boolen";
var TYPE_STRING = "string";
var TYPE_BUFFER = "buffer";
var TYPE_DATE = "date";
var attribute = {
    class: { v: pkcs11.CKA_CLASS, t: TYPE_NUMBER },
    token: { v: pkcs11.CKA_TOKEN, t: TYPE_BOOL },
    private: { v: pkcs11.CKA_PRIVATE, t: TYPE_BOOL },
    label: { v: pkcs11.CKA_LABEL, t: TYPE_STRING },
    application: { v: pkcs11.CKA_APPLICATION, t: TYPE_STRING },
    value: { v: pkcs11.CKA_VALUE, t: TYPE_BUFFER },
    objectId: { v: pkcs11.CKA_OBJECT_ID, t: TYPE_BUFFER },
    certType: { v: pkcs11.CKA_CERTIFICATE_TYPE, t: TYPE_NUMBER },
    issuer: { v: pkcs11.CKA_ISSUER, t: TYPE_BUFFER },
    serial: { v: pkcs11.CKA_SERIAL_NUMBER, t: TYPE_BUFFER },
    issuerAC: { v: pkcs11.CKA_AC_ISSUER, t: TYPE_BUFFER },
    owner: { v: pkcs11.CKA_OWNER, t: TYPE_BUFFER },
    attrTypes: { v: pkcs11.CKA_ATTR_TYPES, t: TYPE_BUFFER },
    trusted: { v: pkcs11.CKA_TRUSTED, t: TYPE_BOOL },
    certCategory: { v: pkcs11.CKA_CERTIFICATE_CATEGORY, t: TYPE_NUMBER },
    javaDomain: { v: pkcs11.CKA_JAVA_MIDP_SECURITY_DOMAIN, t: TYPE_NUMBER },
    url: { v: pkcs11.CKA_URL, t: TYPE_STRING },
    ski: { v: pkcs11.CKA_HASH_OF_SUBJECT_PUBLIC_KEY, t: TYPE_BUFFER },
    aki: { v: pkcs11.CKA_HASH_OF_ISSUER_PUBLIC_KEY, t: TYPE_BUFFER },
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
    primeBits: { v: pkcs11.CKA_PRIME_BITS, t: TYPE_NUMBER },
    subprimeBits: { v: pkcs11.CKA_SUBPRIME_BITS, t: TYPE_NUMBER },
    valueBits: { v: pkcs11.CKA_VALUE_BITS, t: TYPE_NUMBER },
    valueLen: { v: pkcs11.CKA_VALUE_LEN, t: TYPE_NUMBER },
    extractable: { v: pkcs11.CKA_EXTRACTABLE, t: TYPE_BOOL },
    local: { v: pkcs11.CKA_LOCAL, t: TYPE_BOOL },
    neverExtractable: { v: pkcs11.CKA_NEVER_EXTRACTABLE, t: TYPE_BOOL },
    alwaysSensitive: { v: pkcs11.CKA_ALWAYS_SENSITIVE, t: TYPE_BOOL },
    keyGenMechanism: { v: pkcs11.CKA_KEY_GEN_MECHANISM, t: TYPE_NUMBER },
    modifiable: { v: pkcs11.CKA_MODIFIABLE, t: TYPE_BOOL },
    paramsECDSA: { v: pkcs11.CKA_ECDSA_PARAMS, t: TYPE_BUFFER },
    paramsEC: { v: pkcs11.CKA_EC_PARAMS, t: TYPE_BUFFER },
    pointEC: { v: pkcs11.CKA_EC_POINT, t: TYPE_BUFFER },
    secondaryAuth: { v: pkcs11.CKA_SECONDARY_AUTH, t: TYPE_BOOL },
    authPinFlags: { v: pkcs11.CKA_AUTH_PIN_FLAGS, t: TYPE_BUFFER },
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
    for (var i in attribute) {
        var attr = attribute[i];
        if (attr && "v" in attr && attr.v === cka)
            return i;
    }
    throw new Error("Unsupported attribute ID '" + cka + "'");
}
function b2v(type, value) {
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
            throw new Error("Uknown type in use '" + type + "'");
    }
}
var Template = (function () {
    function Template() {
    }
    Template.toPkcs11 = function (tmpl) {
        var res = [];
        for (var key in tmpl) {
            res.push({
                type: n2i(key),
                value: tmpl[key]
            });
        }
        return res;
    };
    Template.fromPkcs11 = function (tmpl) {
        var res = {};
        for (var i in tmpl) {
            var attr = tmpl[i];
            var name_1 = i2n(attr.type);
            var type = attribute[name_1].t;
            if (type === void 0)
                throw new Error("Can not get type for attribute '" + name_1 + "'");
            res[i2n(attr.type)] = b2v(type, attr.value);
        }
        return res;
    };
    return Template;
}());
exports.Template = Template;
