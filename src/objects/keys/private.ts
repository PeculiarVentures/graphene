import { attribute } from "../../core";
import { Key } from "./key";

/**
 * Private key objects (object class `CKO_PRIVATE_KEY`) hold private keys
 */
export class PrivateKey extends Key {

  /**
   * DER-encoding of the key subject name (default empty)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   */
  @attribute("subject")
  public subject: Buffer;

  /**
   * `true` if key is sensitive
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Attribute cannot be changed once set to CK_TRUE. It becomes a read only attribute.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("sensitive")
  public sensitive: boolean;

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
   * `true` if key supports signatures where the signature is an appendix to the data
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("sign", false)
  public sign: boolean;

  /**
   * `true` if key supports signatures where the data can be recovered from the signature
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("signRecover", false)
  public signRecover: boolean;

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
  @attribute("extractable", false)
  public extractable: boolean;

  /**
   * `true` if key has always had the `CKA_SENSITIVE` attribute set to `true`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  @attribute("alwaysSensitive", false)
  public alwaysSensitive: boolean;

  /**
   * `true` if key has never had the `CKA_EXTRACTABLE` attribute set to `true`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  @attribute("neverExtractable", false)
  public neverExtractable: boolean;

  /**
   * `true` if the key can only be wrapped with a wrapping key
   * that has `CKA_TRUSTED` set to `true`. Default is `false`.
   * - Attribute cannot be changed once set to `true`. It becomes a read only attribute.
   */
  @attribute("wrapWithTrusted", false)
  public wrapTrusted: boolean;

  /**
   * For wrapping keys. The attribute template to apply to any keys unwrapped
   * using this wrapping key. Any user supplied template is applied after this template
   * as if the object has already been created.
   */
  get template() {
    throw new Error("Not implemented");
  }

  set template(v) {
    throw new Error("Not implemented");
  }

  /**
   * if `true`, the user has to supply the PIN for each use (sign or decrypt) with the key.
   * Default is `false`
   */
  @attribute("alwaysAuth", false)
  public alwaysAuthenticate: boolean;
}
