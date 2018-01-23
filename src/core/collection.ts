import * as pkcs11 from "pkcs11js";
import * as object from "./object";

export class Collection<T extends object.HandleObject> extends object.BaseObject {
    protected items_: Array<any>;
    protected classType: any;

    constructor(items: Array<any>, lib: pkcs11.PKCS11, classType: any) {
        super(lib);
        this.items_ = items;
        this.lib = lib;
        this.classType = classType;
    }

    /**
     * returns length of collection
     */
    public get length(): number {
        return this.items_.length;
    }

    /**
     * returns item from collection by index
     * @param {number} index of element in collection `[0..n]`
     */
    public items(index: number): T {
        let handle = this.items_[index];
        return new this.classType(handle, this.lib);
    }

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param obj       The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    public indexOf(obj: T, fromIndex: number = 0) {
        if (obj.lib.libPath === obj.lib.libPath) {
            for (let i = fromIndex; i < this.items_.length; i++) {
                const item = this.items(i);
                if (item.handle.equals(obj.handle)) {
                    return i;
                }
            }
        }
        return -1;
    }
}