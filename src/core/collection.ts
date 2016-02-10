import * as pkcs11 from "../pkcs11";
import * as object from "./object";

export class Collection<T extends object.HandleObject> {
    protected items_: Array<number>;
    protected classType: any;
    protected lib: pkcs11.Pkcs11;

    constructor(items: Array<number>, lib: pkcs11.Pkcs11, classType: any) {
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