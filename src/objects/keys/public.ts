import { attribute } from "../../core";
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
  @attribute("subject")
  public subject: Buffer;

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
   * `true` if key supports verification where the signature is an appendix to the data
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("verify", false)
  public verify: boolean;

  /**
   * `true` if key supports verification where the data is recovered from the signature
   * - May be modified after object is created with a `C_SetAttributeValue` call,
   * or in the process of copying object with a `C_CopyObject` call.
   * However, it is possible that a particular token may not permit modification of the attribute
   * during the course of a `C_CopyObject` call.
   * - Default value is token-specific, and may depend on the values of other attributes.
   */
  @attribute("verifyRecover", false)
  public verifyRecover: boolean;

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
   * The key can be trusted for the application that it was created.
   * - The wrapping key can be used to wrap keys with `CKA_WRAP_WITH_TRUSTED` set to `true`.
   * - Can only be set to CK_TRUE by the SO user.
   */
  @attribute("trusted", false)
  public trusted: boolean;

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
