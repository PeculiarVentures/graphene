import { Key } from "./key";

/**
 * Public key objects (object class CKO_PUBLIC_KEY) hold public keys
 */
export class PublicKey extends Key {

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
   * `CK_TRUE` if key supports verification where the signature is an appendix to the data
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
   * `CK_TRUE` if key supports verification where the data is recovered from the signature
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  get verifyRecover(): boolean {
    try {
      return this.get("verifyRecover");
    } catch (err) {
      return false;
    }
  }

  set verifyRecover(v: boolean) {
    this.set("verifyRecover", v);
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
   * The key can be trusted for the application that it was created.
   * - The wrapping key can be used to wrap keys with `CKA_WRAP_WITH_TRUSTED` set to `CK_TRUE`.
   * - Can only be set to CK_TRUE by the SO user.
   */
  get trusted(): boolean {
    return this.get("trusted");
  }

  set trusted(v: boolean) {
    this.set("trusted", v);
  }

  /**
   * For wrapping keys. The attribute template to match against any keys wrapped using this wrapping key.
   * Keys that do not match cannot be wrapped.
   */
  get template() {
    throw new Error("Not implemented");
  }

  set template(v) {
    throw new Error("Not implemented");
  }

}
