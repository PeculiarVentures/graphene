import * as pkcs11 from "./pkcs11";
import * as core from "./core";
import {IVersion} from "./module";
import * as token from "./token";
import * as mech from "./mech";
import * as session from "./session";

export interface ISlotInfo {
    slotDescription: string;
    manufacturerID: string;
    flags: number;
    hardwareVersion: IVersion;
    firmwareVersion: IVersion;
}

export enum SlotFlag {
    /**
     * `True` if a token is present in the slot (e.g., a device is in the reader)
     */
    TOKEN_PRESENT = pkcs11.CKF_TOKEN_PRESENT,
    /**
     * `True` if the reader supports removable devices
     */
    REMOVABLE_DEVICE = pkcs11.CKF_REMOVABLE_DEVICE,
    /**
     * True if the slot is a hardware slot, as opposed to a software slot implementing a "soft token"
     */
    HW_SLOT = pkcs11.CKF_HW_SLOT
}

export class Slot extends core.HandleObject implements ISlotInfo {

    slotDescription: string;
    manufacturerID: string;
    flags: number;
    hardwareVersion: IVersion;
    firmwareVersion: IVersion;

    constructor(handle: number, lib: pkcs11.Pkcs11) {
        super(handle, lib);

        this.getInfo();
    }

    protected getInfo(): void {
        let $info = core.Ref.alloc(pkcs11.CK_SLOT_INFO);
        let rv = this.lib.C_GetSlotInfo(this.handle, $info);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetSlotInfo");

        let info: ISlotInfo = $info.deref();
        this.slotDescription = new Buffer(info.slotDescription).toString().trim();
        this.manufacturerID = new Buffer(info.manufacturerID).toString().trim();
        this.flags = info.flags;
        this.hardwareVersion = {
            major: info.hardwareVersion.major,
            minor: info.hardwareVersion.minor
        };
        this.firmwareVersion = {
            major: info.firmwareVersion.major,
            minor: info.firmwareVersion.minor
        };
    }

    getToken(): token.Token {
        return new token.Token(this.handle, this.lib);
    }

    getMechanisms(): mech.MechanismCollection {
        let $len = core.Ref.alloc(pkcs11.CK_ULONG);
        let rv = this.lib.C_GetMechanismList(this.handle, null, $len);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetMechanismList");
        let arr = [],
            len = $len.deref();
        if (len) {
            let $mechs = core.Ref.alloc(core.RefArray(pkcs11.CK_MECHANISM_TYPE, len));
            if (rv = this.lib.C_GetMechanismList(this.handle, $mechs, $len)) {
                throw new core.Pkcs11Error(rv, "C_GetMechanismList");
            }
            arr = $mechs.deref();
        }
        return new mech.MechanismCollection(arr, this.handle, this.lib);
    }

    /**
     * initializes a token
     * @param {string} pin the SO's initial PIN
     * @param {string} label label of the token
     */
    initToken(pin: string, label: string) {
        let bufPin = new Buffer(pin, "utf8");
        let bufLable = new Buffer(32);
        bufLable.write(label);
        let rv = this.lib.C_InitToken(this.handle, bufPin, bufPin.length, bufLable);
        if (rv) throw new core.Pkcs11Error(rv, "C_InitToken");
    }

    /**
     * initializes the normal user's PIN
     * @param {string} pin the normal user's PIN
     */
    initPin(pin: string) {
        let bufPin = new Buffer(pin, "utf8");
        let rv = this.lib.C_InitPIN(this.handle, bufPin, bufPin.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_InitPIN");
    }

    /**
     * modifies the PIN of the user who is logged in
     * @param {string} oldPin 
     * @param {string} newPin
     */
    setPin(oldPin: string, newPin: string) {
        let bufOldPin = new Buffer(oldPin, "utf8");
        let bufNewPin = new Buffer(newPin, "utf8");
        let rv = this.lib.C_SetPIN(this.handle, bufOldPin, bufOldPin.length, bufNewPin, bufNewPin.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_SetPIN");
    }

    /**
     * opens a session between an application and a token in a particular slot
     * @parsm flags indicates the type of session
     */
    open(flags: number): session.Session {
        let $hSession = core.Ref.alloc(pkcs11.CK_SESSION_HANDLE);
        let rv = this.lib.C_OpenSession(this.handle, flags, null, null, $hSession);
        if (rv) throw new core.Pkcs11Error(rv, "C_OpenSession");
        return new session.Session($hSession.deref(), this, this.lib);
    }

    /**
     * closes all sessions an application has with a token
     */
    closeAll() {
        let rv = this.lib.C_CloseAllSessions(this.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_CloseAllSessions");
    }
}

export class SlotCollection extends core.Collection<Slot> {
    constructor(items: Array<number>, lib: pkcs11.Pkcs11, classType: any = Slot) {
        super(items, lib, classType);
    }
}