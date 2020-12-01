import * as pkcs11 from "pkcs11js";
import { enumerable } from "./enumerable";

/**
 * ID of PKCS#11 object
 */
export declare type Handle = Buffer;


/**
 * Base class for all PKCS#11 objects
 */
export class BaseObject {

  /**
   * PKCS#11 module
   */
  @enumerable(false)
  public lib: pkcs11.PKCS11;

  /**
   * Initialize a new instance of PKCS#11 object
   * @param lib PKCS#11 module
   */
  constructor(lib: pkcs11.PKCS11) {
    this.lib = lib;
  }
}

/**
 * Base class for all PKCS#11 objects with IDs
 */
export abstract class HandleObject extends BaseObject {
  /**
   * ID of PKCS#11 object
   */
  public handle: Handle;

  /**
   * Initialize a new instance of object
   * @param handle ID of PKCS#11 object
   * @param lib PKCS#11 module
   */
  constructor(handle: Handle, lib: pkcs11.PKCS11) {
    super(lib);
    this.handle = handle;
  }

  /**
   * Retrieves information about PKCS#11 object and fills fields
   */
  protected abstract getInfo(): void;
}

/**
 * Constructor declaration of {@link HandleObject}
 */
export type HandleObjectConstructor<T extends HandleObject> = new (handle: pkcs11.Handle, lib: pkcs11.PKCS11) => T
