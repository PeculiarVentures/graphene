import * as pkcs11 from "pkcs11js";

export interface ITemplate {
  [key: string]: any;
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
   * CKA_PRIVATE_EXPONENT
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
   * CKA_COEFFICIENT
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
  otpPinReq?: any | null;
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
  supportedCmsAttrs?: any | null;
  /**
   * CKA_ALLOWED_MECHANISMS
   */
  allowedMechanisms?: any | null;
}

const TYPE_NUMBER = "number";
const TYPE_BOOL = "boolean";
const TYPE_STRING = "string";
const TYPE_BUFFER = "buffer";
const TYPE_DATE = "date";

export type AttributeItemType = "number" | "boolean" | "string" | "buffer" | "date";

interface IAttributeItem {
  /**
   * Value of Attribute type (CKA_...)
   */
  v: number;
  /**
   * Type of Attribute
   */
  t: AttributeItemType;
}

interface IAttributeItems {
  [key: string]: IAttributeItem;
}

const attribute: IAttributeItems = {
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
  alwaysAuth: { v: pkcs11.CKA_ALWAYS_AUTHENTICATE, t: TYPE_BUFFER },

  wrapWithTrusted: { v: pkcs11.CKA_WRAP_WITH_TRUSTED, t: TYPE_BUFFER },
  wrapTemplate: { v: pkcs11.CKA_WRAP_TEMPLATE, t: TYPE_BUFFER },
  unwrapTemplate: { v: pkcs11.CKA_UNWRAP_TEMPLATE, t: TYPE_BUFFER },

  /* CKA_OTP... attributes are new for PKCS #11 v2.20 amendment 3. */
  otpFormat: { v: pkcs11.CKA_OTP_FORMAT, t: TYPE_BUFFER },
  otpLength: { v: pkcs11.CKA_OTP_LENGTH, t: TYPE_BUFFER },
  otpTimeInterval: { v: pkcs11.CKA_OTP_TIME_INTERVAL, t: TYPE_BUFFER },
  otpUserFriendlyMode: { v: pkcs11.CKA_OTP_USER_FRIENDLY_MODE, t: TYPE_BUFFER },
  otpChallengeReq: { v: pkcs11.CKA_OTP_CHALLENGE_REQUIREMENT, t: TYPE_BUFFER },
  otpTimeReq: { v: pkcs11.CKA_OTP_TIME_REQUIREMENT, t: TYPE_BUFFER },
  otpCounterReq: { v: pkcs11.CKA_OTP_COUNTER_REQUIREMENT, t: TYPE_BUFFER },
  otpPinReq: { v: pkcs11.CKA_OTP_PIN_REQUIREMENT, t: TYPE_BUFFER },
  otpCounter: { v: pkcs11.CKA_OTP_COUNTER, t: TYPE_BUFFER },
  otpTime: { v: pkcs11.CKA_OTP_TIME, t: TYPE_BUFFER },
  OtpUserId: { v: pkcs11.CKA_OTP_USER_IDENTIFIER, t: TYPE_BUFFER },
  otpServiceId: { v: pkcs11.CKA_OTP_SERVICE_IDENTIFIER, t: TYPE_BUFFER },
  otpServiceLogo: { v: pkcs11.CKA_OTP_SERVICE_LOGO, t: TYPE_BUFFER },
  otpServiceLogoType: { v: pkcs11.CKA_OTP_SERVICE_LOGO_TYPE, t: TYPE_BUFFER },

  /* CKA_HW_FEATURE_TYPE, CKA_RESET_ON_INIT, and CKA_HAS_RESET
 * are new for v2.10 */
  hwFeatureType: { v: pkcs11.CKA_HW_FEATURE_TYPE, t: TYPE_BUFFER },
  resetOnInit: { v: pkcs11.CKA_RESET_ON_INIT, t: TYPE_BUFFER },
  hasReset: { v: pkcs11.CKA_HAS_RESET, t: TYPE_BUFFER },

  /* The following attributes are new for v2.20 */
  pixelX: { v: pkcs11.CKA_PIXEL_X, t: TYPE_BUFFER },
  pixelY: { v: pkcs11.CKA_PIXEL_Y, t: TYPE_BUFFER },
  resolution: { v: pkcs11.CKA_RESOLUTION, t: TYPE_BUFFER },
  charRows: { v: pkcs11.CKA_CHAR_ROWS, t: TYPE_BUFFER },
  charCols: { v: pkcs11.CKA_CHAR_COLUMNS, t: TYPE_BUFFER },
  color: { v: pkcs11.CKA_COLOR, t: TYPE_BUFFER },
  bitsPerPixel: { v: pkcs11.CKA_BITS_PER_PIXEL, t: TYPE_BUFFER },
  charSets: { v: pkcs11.CKA_CHAR_SETS, t: TYPE_BUFFER },
  encMethod: { v: pkcs11.CKA_ENCODING_METHODS, t: TYPE_BUFFER },
  mimeTypes: { v: pkcs11.CKA_MIME_TYPES, t: TYPE_BUFFER },
  mechanismType: { v: pkcs11.CKA_MECHANISM_TYPE, t: TYPE_BUFFER },
  requiredCmsAttrs: { v: pkcs11.CKA_REQUIRED_CMS_ATTRIBUTES, t: TYPE_BUFFER },
  defaultCmsAttrs: { v: pkcs11.CKA_DEFAULT_CMS_ATTRIBUTES, t: TYPE_BUFFER },
  supportedCmsAttrs: { v: pkcs11.CKA_SUPPORTED_CMS_ATTRIBUTES, t: TYPE_BUFFER },
  allowedMechanisms: { v: pkcs11.CKA_ALLOWED_MECHANISMS, t: TYPE_BUFFER },
};

/**
 * converts name of attribute to id
 * @param {string} name name of attribute
 */
function n2i(name: string) {
  const attr = (attribute as any)[name];
  if (attr !== void 0 && "v" in attr) {
    return attr.v;
  }
  throw new Error(`Unsupported attribute name '${name}'. Use 'registerAttribute' to add custom attribute.`);
}

/**
 * converts id of attribute to name
 * @param {number} cka id of attribute
 */
function i2n(cka: number) {
  for (const i in attribute) {
    const attr = (attribute as any)[i];
    if (attr && "v" in attr && attr.v === cka) {
      return i;
    }
  }
  throw new Error(`Unsupported attribute ID '${cka}'. Use 'registerAttribute' to add custom attribute.`);
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
      throw new Error(`Unknown type in use '${type}'`);
  }
}

export class Template {

  public static toPkcs11(tmpl: ITemplate | null) {
    const res: pkcs11.Template = [];
    if (tmpl) {
      for (const key in tmpl) {
        res.push({
          type: n2i(key),
          value: (tmpl as any)[key],
        });
      }
    }
    return res;
  }

  public static fromPkcs11(tmpl: pkcs11.Template) {
    const res: ITemplate = {};
    for (const i in tmpl) {
      const attr = tmpl[i];
      const name = i2n(attr.type);
      const type = (attribute as any)[name].t;
      if (type === void 0) {
        throw new Error(`Can not get type for attribute '${name}'.`);
      }
      (res as any)[i2n(attr.type)] = b2v(type, attr.value as Buffer);
    }
    return res;
  }
}

/**
 * Registers new attribute
 * @param {string}              name        name of attribute
 * @param {number}              value       PKCS#11 number value of attribute
 * @param {AttributeItemType}   type        string name of type
 */
export function registerAttribute(name: string, value: number, type: AttributeItemType) {
  attribute[name] = { v: value, t: type };
}
