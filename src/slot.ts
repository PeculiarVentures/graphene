import * as pkcs11 from "./pkcs11";
import * as core from "./core";
import {IVersion} from "./module";
import * as token from "./token";

export interface ISlotInfo {
    slotDescription: string;
    manufacturerID: string;
    flags: SlotFlag;
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
    flags: SlotFlag;
    hardwareVersion: IVersion;
    firmwareVersion: IVersion;

    protected getInfo(): void {
        let $info = core.Ref.alloc(pkcs11.CK_SLOT_INFO);
        let rv = this.lib.C_GetSlotInfo(this.handle, $info);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetSlotInfo");

        let info: ISlotInfo = $info.deref();
        this.slotDescription = info.slotDescription.toString().trim();
        this.manufacturerID = info.manufacturerID.toString().trim();
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
}

export class SlotCollection extends core.Collection<Slot>{
    constructor(items: Array<number>, lib: pkcs11.Pkcs11, classType: any = Slot) {
        super(items, lib, classType);
    }
}