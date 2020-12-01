import { attribute } from "../../core";
import { Key } from "./key";

/**
 * Secret key objects (object class `CKO_SECRET_KEY`) hold secret keys.
 */
export class SecretKey extends Key {

  /**
   * `true` if key is sensitive
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Attribute cannot be changed once set to `true`. It becomes a read only attribute.
   */
  @attribute("sensitive")
  public sensitive: boolean;

  /**
   * `true` if key supports encryption
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("encrypt", false)
  public encrypt: boolean;

  /**
   * `true` if key supports decryption
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("decrypt", false)
  public decrypt: boolean;

  /**
   * `true` if key supports verification (i.e., of authentication codes)
   * where the signature is an appendix to the data
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("verify", false)
  public verify: boolean;

  /**
   * 	`true` if key supports signatures (i.e., authentication codes) where the signature is an appendix to the data
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("sign")
  public sign: boolean;

  /**
   * `true` if key supports wrapping (i.e., can be used to wrap other keys)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("wrap", false)
  public wrap: boolean;

  /**
   * `true` if key supports unwrapping (i.e., can be used to unwrap other keys)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("unwrap", false)
  public unwrap: boolean;

  /**
   * `true` if key is extractable and can be wrapped
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Attribute cannot be changed once set to `false`. It becomes a read only attribute.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("extractable")
  public extractable: boolean;

  /**
   * `true` if key has always had the `CKA_SENSITIVE` attribute set to `true`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  @attribute("alwaysSensitive")
  public alwaysSensitive: boolean;
  /**
   * `true` if key has never had the `CKA_EXTRACTABLE` attribute set to `true`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  @attribute("neverExtractable")
  public neverExtractable: boolean;

  /**
   * Key checksum
   */
  @attribute("checkValue")
  public checkValue: Buffer;
  /**
   * `true` if the key can only be wrapped with a wrapping key
   * that has `CKA_TRUSTED` set to `true`. Default is `false`.
   * - Attribute cannot be changed once set to `true`. It becomes a read only attribute.
   */
  @attribute("wrapWithTrusted")
  public wrapTrusted: boolean;

  /**
   * The wrapping key can be used to wrap keys with `CKA_WRAP_WITH_TRUSTED` set to `true`.
   * - Can only be set to CK_TRUE by the SO user.
   */
  @attribute("trusted")
  public trusted: boolean;

  /**
   * For wrapping keys.
   * The attribute template to match against any keys wrapped using this wrapping key.
   * Keys that do not match cannot be wrapped.
   */
  get wrapTemplate() {
    throw new Error("Not implemented");
  }

  set wrapTemplate(v) {
    throw new Error("Not implemented");
  }

  /**
   * For wrapping keys.
   * The attribute template to apply to any keys unwrapped using this wrapping key.
   * Any user supplied template is applied after this template as if the object has already been created.
   */
  get unwrapTemplate() {
    throw new Error("Not implemented");
  }

  set unwrapTemplate(v) {
    throw new Error("Not implemented");
  }

}
