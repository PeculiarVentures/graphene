import * as pkcs11 from "pkcs11js";
import * as object from "./object";

export class Collection<T extends object.HandleObject> extends object.BaseObject {
    protected items_: Array<number>;
    protected classType: any;

    constructor(items: Array<number>, lib: pkcs11.PKCS11, classType: any) {
        super(lib);
        this.items_ = items;
        this.lib = lib;
        this.classType = classType;
    }

    /**
     * returns length of collection
     */
    get length(): number {
        return this.items_.length;
    }

    /**
     * returns item from collection by index
     * @param {number} index of element in collection `[0..n]`
     */
    items(index: number): T {
        let handle = this.items_[index];
        return new this.classType(handle, this.lib);
    }
}