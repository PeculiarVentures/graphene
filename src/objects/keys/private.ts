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
  get subject(): Buffer {
    return this.get("subject");
  }

  set subject(v: Buffer) {
    this.set("subject", v);
  }

  /**
   * `CK_TRUE` if key is sensitive
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Attribute cannot be changed once set to CK_TRUE. It becomes a read only attribute.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get sensitive(): boolean {
    return this.get("sensitive");
  }

  set sensitive(v: boolean) {
    this.set("sensitive", v);
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
   * `CK_TRUE` if key supports signatures where the signature is an appendix to the data
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
   * `CK_TRUE` if key supports signatures where the data can be recovered from the signature
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get signRecover(): boolean {
    try {
      return this.get("signRecover");
    } catch (err) {
      return false;
    }
  }

  set signRecover(v: boolean) {
    this.set("signRecover", v);
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

  get alwaysAuthenticate(): boolean {
    return this.get("alwaysAuth");
  }
  set alwaysAuthenticate(v: boolean) {
    this.set("alwaysAuth", v);
  }

}
