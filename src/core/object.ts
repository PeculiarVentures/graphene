import * as pkcs11 from "pkcs11js";

export declare type Handle = Buffer;

export class BaseObject {

  public lib: pkcs11.PKCS11;

  constructor(lib: pkcs11.PKCS11) {
    Object.defineProperty(this, "lib", {
      writable: true,
      enumerable: false,
    });
    this.lib = lib;
  }
}

export class HandleObject extends BaseObject {
  /**
   * handle to pkcs11 object
   */
  public handle: Handle;

  constructor(handle: Handle, lib: pkcs11.PKCS11) {
    super(lib);
    this.handle = handle;
  }

  protected getInfo(): void {
    // nothing
  }
}
