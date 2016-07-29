import * as pkcs11 from "pkcs11js";

export class BaseObject {

    protected lib: pkcs11.PKCS11;

    constructor(lib?: pkcs11.PKCS11) {
        Object.defineProperty(this, "lib", {
            writable: true,
            enumerable: false
        });
        this.lib = lib || null;
    }
}

export class HandleObject extends BaseObject {
    /**
     * handle to pkcs11 object
     */
    handle: number;

    constructor(handle: number, lib: pkcs11.PKCS11) {
        super(lib);
        this.handle = handle;
    }

    protected getInfo(): void { };
}
