import * as pkcs11 from "../pkcs11";

export class BaseObject {
    protected lib: pkcs11.Pkcs11;

    constructor(lib?: pkcs11.Pkcs11) {
        this.lib = lib || null;
    }
}

export class HandleObject extends BaseObject {
    /**
     * handle to pkcs11 object
     */
    handle: number;

    constructor(handle: number, lib: pkcs11.Pkcs11) {
        super(lib);
        this.handle = handle;
    }

    protected getInfo(): void { };
}
