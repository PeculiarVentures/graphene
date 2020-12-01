import * as pkcs11 from "pkcs11js";

import * as core from "./core";
import { Module, SessionFlag, Session, Token, MechanismCollection } from "./";
import { removePadding } from "./core";

/**
 * Enumeration specifies slot flags
 */
export enum SlotFlag {
  /**
   * `true` if a token is present in the slot (e.g., a device is in the reader)
   */
  TOKEN_PRESENT = 1,
  /**
   * `true` if the reader supports removable devices
   */
  REMOVABLE_DEVICE = 2,
  /**
   * `true` if the slot is a hardware slot, as opposed to a software slot implementing a "soft token"
   */
  HW_SLOT = 4,
}

/**
 * Represents PKCS#11 slot
 */
export class Slot extends core.HandleObject {
  /**
   * Character-string description of the slot
   */
  public slotDescription: string;

  /**
   * ID of the slot manufacturer
   */
  public manufacturerID: string;

  /**
   * Bits flags that provide capabilities of the slot
   */
  public flags: SlotFlag;

  /**
   * Version number of the slot's hardware
   */
  public hardwareVersion: pkcs11.Version;

  /**
   * Version number of the slot's firmware
   */
  public firmwareVersion: pkcs11.Version;

  /**
   * PKCS#11 module
   */
  public module: Module;

  /**
   * Creates a new instance of {@link Slot}
   * @param handle ID of token's slot
   * @param module PKCS#11 module
   * @param lib  PKCS#11 library
   */
  constructor(handle: core.Handle, module: Module, lib: pkcs11.PKCS11) {
    super(handle, lib);

    this.module = module;
    this.getInfo();
  }

  /**
   * Returns information about token
   * @returns PKCS#11 token structure
   */
  public getToken(): Token {
    return new Token(this.handle, this.lib);
  }

  /**
   * Obtains a list of mechanism types supported by a token
   * @returns The list of  {@link Mechanism}
   */
  public getMechanisms(): MechanismCollection {
    const arr = this.lib.C_GetMechanismList(this.handle);
    return new MechanismCollection(arr, this.handle, this.lib);
  }

  /**
   * Initializes a token
   * @param pin the SO's initial PIN
   * @param label token label
   * @returns Token label
   */
  public initToken(pin: string, label = ""): string {
    const res = this.lib.C_InitToken(this.handle, pin, label);
    return removePadding(res);
  }

  /**
   * Opens a session between an application and a token in a particular slot
   *
   * @param flags Indicates the type of session
   * @returns Opened session
   */
  public open(flags: SessionFlag = SessionFlag.SERIAL_SESSION): Session {
    const hSession = this.lib.C_OpenSession(this.handle, flags);
    return new Session(hSession, this, this.lib);
  }

  /**
   * Closes all sessions an application has with a token
   */
  public closeAll() {
    this.lib.C_CloseAllSessions(this.handle);
  }

  protected getInfo(): void {
    const info = this.lib.C_GetSlotInfo(this.handle);

    this.slotDescription = core.removePadding(info.slotDescription);
    this.manufacturerID = core.removePadding(info.manufacturerID);
    this.flags = info.flags;
    this.hardwareVersion = info.hardwareVersion;
    this.firmwareVersion = info.firmwareVersion;
  }
}

/**
 * Collection of slots
 */
export class SlotCollection extends core.Collection<Slot> {

  /**
   * PKCS#11 module
   */
  public module: Module;

  /**
   * Creates a new instance of {@link SlotCollection}
   * @param items The kist of slot handles
   * @param module PKCS#11 module
   * @param lib PKCS#11 library
   */
  constructor(items: Buffer[], module: Module, lib: pkcs11.PKCS11) {
    super(items, lib, Slot);

    this.module = module;
  }

  public items(index: number): Slot {
    return new Slot(this.innerItems[index], this.module, this.lib);
  }

}
