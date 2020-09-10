import * as pkcs11 from "pkcs11js";

import * as core from "./core";
import { Module, SessionFlag, Session, Token, MechanismCollection } from "./";

export enum SlotFlag {
  /**
   * `True` if a token is present in the slot (e.g., a device is in the reader)
   */
  TOKEN_PRESENT = 1,
  /**
   * `True` if the reader supports removable devices
   */
  REMOVABLE_DEVICE = 2,
  /**
   * True if the slot is a hardware slot, as opposed to a software slot implementing a "soft token"
   */
  HW_SLOT = 4,
}

export class Slot extends core.HandleObject {

  public slotDescription: string;
  public manufacturerID: string;
  public flags: number;
  public hardwareVersion: pkcs11.Version;
  public firmwareVersion: pkcs11.Version;
  public module: Module;

  constructor(handle: core.Handle, module: Module, lib: pkcs11.PKCS11) {
    super(handle, lib);

    this.module = module;
    this.getInfo();
  }

  /**
   * Returns information about token
   *
   * @returns {Token}
   */
  public getToken(): Token {
    return new Token(this.handle, this.lib);
  }

  /**
   * returns list of `MechanismInfo`
   *
   * @returns {MechanismCollection}
   */
  public getMechanisms(): MechanismCollection {
    const arr = this.lib.C_GetMechanismList(this.handle);
    return new MechanismCollection(arr, this.handle, this.lib);
  }

  /**
   * initializes a token
   *
   * @param {string} pin the SO's initial PIN
   * @returns {string}
   */
  public initToken(pin: string, label = ""): string {
    return this.lib.C_InitToken(this.handle, pin, label);
  }

  /**
   * opens a session between an application and a token in a particular slot
   *
   * @param {SessionFlag} [flags=session.SessionFlag.SERIAL_SESSION] indicates the type of session
   * @returns {Session}
   */
  public open(flags: SessionFlag = SessionFlag.SERIAL_SESSION): Session {
    const hSession = this.lib.C_OpenSession(this.handle, flags);
    return new Session(hSession, this, this.lib);
  }

  /**
   * closes all sessions an application has with a token
   */
  public closeAll() {
    this.lib.C_CloseAllSessions(this.handle);
  }

  /**
   * Receive information about Slot
   *
   * @protected
   */
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
 *
 * @export
 * @class SlotCollection
 * @extends {core.Collection<Slot>}
 */
export class SlotCollection extends core.Collection<Slot> {

  public module: Module;

  constructor(items: Buffer[], module: Module, lib: pkcs11.PKCS11, classType: any = Slot) {
    super(items, lib, classType);

    this.module = module;
  }

  public items(index: number): Slot {
    return new Slot(this.innerItems[index], this.module, this.lib);
  }

}
