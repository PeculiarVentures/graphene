import { attribute } from "../core";
import { Storage } from "./storage";

/**
 * Data objects (object class `CKO_DATA`) hold information defined by an application.
 * Other than providing access to it, Cryptoki does not attach any special meaning to a data object
 */
export class Data extends Storage {
  /**
   * Description of the application that manages the object (default empty)
   */
  @attribute("application")
  public application: string;

  /**
   * DER-encoding of the object identifier indicating the data object type (default empty)
   */
  @attribute("objectId")
  public objectId: Buffer;

  /**
   * Value of the object (default empty)
   */
  @attribute("value")
  public value: Buffer;

}
