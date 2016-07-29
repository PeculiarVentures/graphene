import * as pkcs11 from "pkcs11js";

import * as core from "./core";
import {Module} from "./module";
import * as token from "./token";
import * as mech from "./mech";
import * as session from "./session";

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
    HW_SLOT = 4
}

export class Slot extends core.HandleObject {

    slotDescription: string;
    manufacturerID: string;
    flags: number;
    hardwareVersion: pkcs11.Version;
    firmwareVersion: pkcs11.Version;
    module: Module;

    constructor(handle: number, module: Module, lib: pkcs11.PKCS11) {
        super(handle, lib);

        this.module = module;
        this.getInfo();
    }

    /**
     * Recieve information about Slot 
     * 
     * @protected
     */
    protected getInfo(): void {
        let info = this.lib.C_GetSlotInfo(this.handle);

        this.slotDescription = info.slotDescription.trim();
        this.manufacturerID = info.manufacturerID.trim();
        this.flags = info.flags;
        this.hardwareVersion = info.hardwareVersion;
        this.firmwareVersion = info.firmwareVersion;
    }

    /**
     * Returns information about token
     * 
     * @returns {Token}
     */
    getToken(): token.Token {
        return new token.Token(this.handle, this.lib);
    }

    /**
     * returns list of `MechanismInfo`
     * 
     * @returns {MechanismCollection}
     */
    getMechanisms(): mech.MechanismCollection {
        let arr = this.lib.C_GetMechanismList(this.handle);
        return new mech.MechanismCollection(arr, this.handle, this.lib);
    }

    /**
     * initializes a token
     * 
     * @param {string} pin the SO's initial PIN
     * @returns {string}
     */
    initToken(pin: string): string {
        return this.lib.C_InitToken(this.handle, pin);
    }

    /**
     * opens a session between an application and a token in a particular slot
     * 
     * @param {SessionFlag} [flags=session.SessionFlag.SERIAL_SESSION] indicates the type of session
     * @returns {Session}
     */
    open(flags: session.SessionFlag = session.SessionFlag.SERIAL_SESSION): session.Session {
        let hSession = this.lib.C_OpenSession(this.handle, flags);
        return new session.Session(hSession, this, this.lib);
    }

    /**
     * closes all sessions an application has with a token
     */
    closeAll() {
        this.lib.C_CloseAllSessions(this.handle);
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

    module: Module;

    items(index: number): Slot {
        return new Slot(this.items_[index], this.module, this.lib);
    }

    constructor(items: Array<number>, module: Module, lib: pkcs11.PKCS11, classType: any = Slot) {
        super(items, lib, classType);

        this.module = module;
    }
}