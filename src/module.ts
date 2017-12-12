import * as pkcs11 from "pkcs11js";
import * as core from "./core";
import * as slot from "./slot";

export class Module extends core.BaseObject {

    public libFile: string = "";
    libName: string = "";

    /**
     * Cryptoki interface version
     */
    public cryptokiVersion: pkcs11.Version;

    /**
     * blank padded manufacturer ID
     */
    public manufacturerID: string;

    /**
     * must be zero
     */
    public flags: number;

    /**
     * blank padded library description
     */
    public libraryDescription: string;

    /**
     * version of library
     */
    public libraryVersion: pkcs11.Version;

    public constructor(lib: pkcs11.PKCS11) {
        super(lib);
    }

    protected getInfo() {
        let info = this.lib.C_GetInfo();

        this.cryptokiVersion = info.cryptokiVersion;
        this.manufacturerID = core.removePadding(info.manufacturerID);
        this.libraryDescription = core.removePadding(info.libraryDescription);
        this.flags = info.flags;
        this.libraryVersion = info.libraryVersion;
    }

    /**
     * initializes the Cryptoki library
     */
    public initialize() {
        this.lib.C_Initialize();

        this.getInfo();
    }

    /**
     * indicates that an application is done with the Cryptoki library
     */
    public finalize() {
        this.lib.C_Finalize();
    }

    /**
     * obtains a list of slots in the system
     * @param {number} index index of an element in collection
     * @param {number} tokenPresent only slots with tokens. Default `True`
     */
    public getSlots(index: number, tokenPresent?: boolean): slot.Slot;
    /**
     * @param {number} tokenPresent only slots with tokens. Default `True`
     */
    public getSlots(tokenPresent?: boolean): slot.SlotCollection;
    public getSlots(index: any, tokenPresent: boolean = true): any {
        if (!core.isEmpty(index) && core.isBoolean(index)) {
            tokenPresent = index;
        }

        let arr = this.lib.C_GetSlotList(tokenPresent);
        let col = new slot.SlotCollection(arr, this, this.lib);
        if (core.isNumber(index)) {
            return col.items(index);
        }
        return col;
    }

    /**
     * closes PKCS#11 library
     */
    public close() {
        this.lib.close();
    }

    /**
     * loads pkcs11 lib
     * @param libFile path to PKCS11 library
     * @param libName name of PKCS11 library
     */
    static load(libFile: string, libName?: string): Module {
        let lib = new pkcs11.PKCS11();
        lib.load(libFile);

        let module = new Module(lib);
        module.libFile = libFile;
        module.libName = libName || libFile;
        return module;
    }

}