import * as pkcs11 from "pkcs11js";
import * as object from "./object";

export abstract class Collection<T extends object.HandleObject> extends object.BaseObject implements Iterable<T> {
  // tslint:disable-next-line:variable-name
  protected innerItems: any[];
  protected classType: new (handle: pkcs11.Handle, lib: pkcs11.PKCS11) => T;

  constructor(items: any[], lib: pkcs11.PKCS11, classType: any) {
    super(lib);
    this.innerItems = items;
    this.lib = lib;
    this.classType = classType;
  }

  /**
   * returns length of collection
   */
  public get length(): number {
    return this.innerItems.length;
  }

  /**
   * returns item from collection by index
   * @param {number} index of element in collection `[0..n]`
   */
  public items(index: number): T {
    const handle = this.innerItems[index];
    return new this.classType(handle, this.lib);
  }

  /**
   * Returns the index of the first occurrence of a value in an array.
   * @param obj       The value to locate in the array.
   * @param fromIndex The array index at which to begin the search.
   * If fromIndex is omitted, the search starts at index 0.
   */
  public indexOf(obj: T, fromIndex: number = 0) {
    if (obj.lib.libPath === obj.lib.libPath) {
      for (let i = fromIndex; i < this.innerItems.length; i++) {
        const item = this.items(i);
        if (item.handle.equals(obj.handle)) {
          return i;
        }
      }
    }
    return -1;
  }

  [Symbol.iterator]() {
    let pointer = 0;
    const _this = this;

    return {
      next(): IteratorResult<T> {
        if (pointer < _this.innerItems.length) {
          return {
            done: false,
            value: _this.items(pointer++)
          }
        } else {
          return {
            done: true,
            value: null
          }
        }
      }
    }
  }

}
