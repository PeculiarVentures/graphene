import * as core from "./core";
import * as pkcs11 from "./pkcs11";
import * as slot from "./slot";

export interface IVersion {
    major: number;
    minor: number;
}

export interface IModuleInfo {
    cryptokiVersion: IVersion;
    manufacturerID: string;
    flags: number;
    libraryDescription: string;
    libraryVersion: IVersion;
}

export class Module extends core.BaseObject implements IModuleInfo {

    public libFile: string = "";
    libName: string = "";

    /**
     * Cryptoki interface version
     */
    public cryptokiVersion: IVersion;

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
    public libraryVersion: IVersion;

    public constructor(lib: pkcs11.Pkcs11) {
        super(lib);
    }

    protected getInfo() {
        let $info = core.Ref.alloc(pkcs11.CK_INFO);

        let rv = this.lib.C_GetInfo($info);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetInfo");

        let info: IModuleInfo = $info.deref();
        this.cryptokiVersion = {
            major: info.cryptokiVersion.major,
            minor: info.cryptokiVersion.minor,
        };
        this.manufacturerID = new Buffer(info.manufacturerID).toString().trim();
        this.libraryDescription = new Buffer(info.libraryDescription).toString().trim();
        this.flags = info.flags;
        this.libraryVersion = {
            major: info.libraryVersion.major,
            minor: info.libraryVersion.minor,
        };
    }

    /**
     * initializes the Cryptoki library
     */
    public initialize() {
        let rv = this.lib.C_Initialize();
        if (rv) throw new core.Pkcs11Error(rv, "C_Initialize");

        this.getInfo();
    }

    /**
     * indicates that an application is done with the Cryptoki library
     */
    public finalize() {
        let rv = this.lib.C_Finalize();
        if (rv) throw new core.Pkcs11Error(rv, "C_Finalize");
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
    public getSlots(index, tokenPresent: boolean = true): any {
        if (!core.isEmpty(index) && core.isBoolean(index)) {
            tokenPresent = index;
        }

        let $len = core.Ref.alloc(pkcs11.CK_ULONG);
        let rv = this.lib.C_GetSlotList(tokenPresent, null, $len);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetSlotList");
        let arr = [],
            len = $len.deref();
        if (len) {
            let $slots = core.Ref.alloc(core.RefArray(pkcs11.CK_SLOT_ID, len));
            if (rv = this.lib.C_GetSlotList(tokenPresent, $slots, $len)) {
                throw new core.Pkcs11Error(rv, "C_GetSlotList");
            }
            arr = $slots.deref();
        }
        let col = new slot.SlotCollection(arr, this, this.lib);
        if (core.isNumber(index)) {
            return col.items(index);
        }
        return col;
    }

    /**
     * loads pkcs11 lib
     */
    static load(libFile: string, libName?: string): Module {
        let lib = new pkcs11.Pkcs11(libFile);
        try {
            lib.getFunctionList();
        }
        catch (e) {
            console.warn("Cannot get a list of PKCS11 functions with C_GetFunctionList.");
        }
        let module = new Module(lib);
        module.libFile = libFile;
        module.libName = libName || libFile;
        return module;
    }

}