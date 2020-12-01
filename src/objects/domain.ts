import { attribute } from "../core";
import * as keys from "./keys";
import { Storage } from "./storage";

/**
 * Domain parameter object (object class `CKO_DOMAIN_PARAMETERS`) holds public domain parameters
 */
export class DomainParameters extends Storage {

  /**
   * Type of key the domain parameters can be used to generate.
   */
  @attribute("keyType")
  public keyType: keys.KeyType;

  /**
   * `true` only if domain parameters were either * generated locally (i.e., on the token)
   * with a `C_GenerateKey` * created with a `C_CopyObject` call as a copy of domain parameters
   * which had its `CKA_LOCAL` attribute set to `true`
   */
  @attribute("local")
  public local: boolean;

}
