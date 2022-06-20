import * as pkcs11 from "pkcs11js";
import * as core from "./core";
import { prepareError } from "./error";
import { Slot, SlotCollection } from "./slot";

/**
 * Represents the PKCS#11 module
 */
export class Module extends core.BaseObject {

  /**
   * Loads PKCS#11 library
   * @param libFile The path to PKCS#11 library
   * @param libName The name of PKCS#11 library
   * @returns The new instance of {@link Module}
   */
  public static load(libFile: string, libName?: string): Module {
    const lib = new pkcs11.PKCS11();
    lib.load(libFile);

    const module = new Module(lib);
    module.libFile = libFile;
    module.libName = libName || libFile;
    return module;
  }

  /**
   * Path to PKCS#11 library
   */
  public libFile: string = "";
  /**
   * Name of PKCS#11 module
   */
  public libName: string = "";

  /**
   * Cryptoki interface version
   */
  public cryptokiVersion: pkcs11.Version;

  /**
   * blank padded manufacturer ID
   */
  public manufacturerID: string;

  /**
   * Bit flags reserved for future versions. Must be zero for this version
   */
  public flags: number;

  /**
   * Library description
   */
  public libraryDescription: string;

  /**
   * Cryptoki library version number
   */
  public libraryVersion: pkcs11.Version;

  /**
   * Initialize a new instance of {@link Module}
   * @param lib PKCS#11 module
   */
  public constructor(lib: pkcs11.PKCS11) {
    super(lib);
  }

  /**
   * Initializes the Cryptoki library
   * @param options Initialization options
   */
  public initialize(options?: pkcs11.InitializationOptions) {
    try {
      this.lib.C_Initialize(options);
    } catch (e) {
      const error = prepareError(e);
      if (!/CKR_CRYPTOKI_ALREADY_INITIALIZED/.test(error.message)) {
        throw error;
      }
    }

    this.getInfo();
  }

  /**
   * Indicates that an application is done with the Cryptoki library
   */
  public finalize() {
    this.lib.C_Finalize();
  }

  /**
   * obtains a list of slots in the system
   * @param {number} index index of an element in collection
   * @param {number} tokenPresent only slots with tokens. Default `True`
   */
  public getSlots(index: number, tokenPresent?: boolean): Slot;
  /**
   * @param {number} tokenPresent only slots with tokens. Default `True`
   */
  public getSlots(tokenPresent?: boolean): SlotCollection;
  public getSlots(index: any, tokenPresent: boolean = true): any {
    if (!core.isEmpty(index) && core.isBoolean(index)) {
      tokenPresent = index;
    }

    const arr = this.lib.C_GetSlotList(tokenPresent);
    const col = new SlotCollection(arr, this, this.lib);
    if (core.isNumber(index)) {
      return col.items(index);
    }
    return col;
  }

  /**
   * Closes PKCS#11 library
   */
  public close() {
    this.lib.close();
  }

  /**
   * Retrieves information about module and fills object fields
   */
  protected getInfo() {
    const info = this.lib.C_GetInfo();

    this.cryptokiVersion = info.cryptokiVersion;
    this.manufacturerID = core.removePadding(info.manufacturerID);
    this.libraryDescription = core.removePadding(info.libraryDescription);
    this.flags = info.flags;
    this.libraryVersion = info.libraryVersion;
  }

}
