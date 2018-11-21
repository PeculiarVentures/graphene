import { Key } from "./key";

/**
 * Secret key objects (object class `CKO_SECRET_KEY`) hold secret keys.
 */
export class SecretKey extends Key {

  /**
   * `CK_TRUE` if key is sensitive
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Attribute cannot be changed once set to `CK_TRUE`. It becomes a read only attribute.
   */
  get sensitive(): boolean {
    return this.get("sensitive");
  }

  set sensitive(v: boolean) {
    this.set("sensitive", v);
  }

  /**
   * `CK_TRUE` if key supports encryption
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get encrypt(): boolean {
    try {
      return this.get("encrypt");
    } catch (err) {
      return false;
    }
  }

  set encrypt(v: boolean) {
    this.set("encrypt", v);
  }

  /**
   * `CK_TRUE` if key supports decryption
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get decrypt(): boolean {
    try {
      return this.get("decrypt");
    } catch (err) {
      return false;
    }
  }

  set decrypt(v: boolean) {
    this.set("decrypt", v);
  }

  /**
   * `CK_TRUE` if key supports verification (i.e., of authentication codes)
   * where the signature is an appendix to the data
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get verify(): boolean {
    try {
      return this.get("verify");
    } catch (err) {
      return false;
    }
  }

  set verify(v: boolean) {
    this.set("verify", v);
  }

  /**
   * 	`CK_TRUE` if key supports signatures (i.e., authentication codes) where the signature is an appendix to the data
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get sign(): boolean {
    try {
      return this.get("sign");
    } catch (err) {
      return false;
    }
  }

  set sign(v: boolean) {
    this.set("sign", v);
  }

  /**
   * `CK_TRUE` if key supports wrapping (i.e., can be used to wrap other keys)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get wrap(): boolean {
    try {
      return this.get("wrap");
    } catch (err) {
      return false;
    }
  }

  set wrap(v: boolean) {
    this.set("wrap", v);
  }

  /**
   * `CK_TRUE` if key supports unwrapping (i.e., can be used to unwrap other keys)
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get unwrap(): boolean {
    try {
      return this.get("unwrap");
    } catch (err) {
      return false;
    }
  }

  set unwrap(v: boolean) {
    this.set("unwrap", v);
  }

  /**
   * `CK_TRUE` if key is extractable and can be wrapped
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Attribute cannot be changed once set to `CK_FALSE`. It becomes a read only attribute.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get extractable(): boolean {
    return this.get("extractable");
  }

  set extractable(v: boolean) {
    this.set("extractable", v);
  }

  /**
   * `CK_TRUE` if key has always had the `CKA_SENSITIVE` attribute set to `CK_TRUE`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  get alwaysSensitive(): boolean {
    return this.get("alwaysSensitive   ");
  }

  set alwaysSensitive(v: boolean) {
    this.set("alwaysSensitive", v);
  }

  /**
   * `CK_TRUE` if key has never had the `CKA_EXTRACTABLE` attribute set to `CK_TRUE`
   * - Must not be specified when object is created with `C_CreateObject`.
   * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
   * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
   */
  get neverExtractable(): boolean {
    return this.get("neverExtractable");
  }

  set neverExtractable(v: boolean) {
    this.set("neverExtractable", v);
  }

  /**
   * Key checksum
   */
  get checkValue(): Buffer {
    return this.get("checkValue");
  }

  set checkValue(v: Buffer) {
    this.set("checkValue", v);
  }

  /**
   * `CK_TRUE` if the key can only be wrapped with a wrapping key
   * that has `CKA_TRUSTED` set to `CK_TRUE`. Default is `CK_FALSE`.
   * - Attribute cannot be changed once set to `CK_TRUE`. It becomes a read only attribute.
   */
  get wrapTrusted(): boolean {
    return this.get("wrapWithTrusted");
  }

  set wrapTrusted(v: boolean) {
    this.set("wrapWithTrusted", v);
  }

  /**
   * The wrapping key can be used to wrap keys with `CKA_WRAP_WITH_TRUSTED` set to `CK_TRUE`.
   * - Can only be set to CK_TRUE by the SO user.
   */
  get trusted(): boolean {
    return this.get("trusted");
  }

  set trusted(v: boolean) {
    this.set("trusted", v);
  }

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
