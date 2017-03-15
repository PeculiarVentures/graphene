import * as pkcs11 from "pkcs11js";
import * as core from "./core";

export enum TokenFlag {
    RNG = 0x00000001,
    WRITE_PROTECTED = 0x00000002,
    LOGIN_REQUIRED = 0x00000004,
    USER_PIN_INITIALIZED = 0x00000008,
    RESTORE_KEY_NOT_NEEDED = 0x00000020,
    CLOCK_ON_TOKEN = 0x00000040,
    PROTECTED_AUTHENTICATION_PATH = 0x00000100,
    DUAL_CRYPTO_OPERATIONS = 0x00000200,
    TOKEN_INITIALIZED = 0x00000400,
    SECONDARY_AUTHENTICATION = 0x00000800,
    USER_PIN_COUNT_LOW = 0x00010000,
    USER_PIN_FINAL_TRY = 0x00020000,
    USER_PIN_LOCKED = 0x00040000,
    USER_PIN_TO_BE_CHANGED = 0x00080000,
    SO_PIN_COUNT_LOW = 0x00100000,
    SO_PIN_FINAL_TRY = 0x00200000,
    SO_PIN_LOCKED = 0x00400000,
    SO_PIN_TO_BE_CHANGED = 0x00800000,
    ERROR_STATE = 0x01000000,
}

export class Token extends core.HandleObject {

    /**
     * application-defined label, assigned during token initialization.
     * - Must be padded with the blank character (' '). 
     * - Should __not__ be null-terminated.
     */
    label: string;
    /**
     * ID of the device manufacturer.
     * - Must be padded with the blank character (' '). 
     * - Should __not__ be null-terminated.
     */
    manufacturerID: string;
    /**
     * model of the device.
     * - Must be padded with the blank character (' '). 
     * - Should __not__ be null-terminated.
     */
    model: string;
    /**
     * character-string serial number of the device. 
     * - Must be padded with the blank character (' '). 
     * - Should __not__ be null-terminated.
     */
    serialNumber: string;
    /**
     * bit flags indicating capabilities and status of the device
     */
    flags: number;

    /**
     * maximum number of sessions that can be opened with the token at one time by a single application
     */
    maxSessionCount: number;
    /**
     * number of sessions that this application currently has open with the token
     */
    sessionCount: number;
    /**
     * maximum number of read/write sessions that can be opened
     * with the token at one time by a single application 
     */
    maxRwSessionCount: number;
    /**
     * number of read/write sessions that this application currently has open with the token
     */
    rwSessionCount: number;
    /**
     * maximum length in bytes of the PIN
     */
    maxPinLen: number;
    /**
     * minimum length in bytes of the PIN
     */
    minPinLen: number;
    /**
     * the total amount of memory on the token in bytes in which public objects may be stored
     */
    totalPublicMemory: number;
    /**
     * the amount of free (unused) memory on the token in bytes for public objects
     */
    freePublicMemory: number;
    /**
     * the total amount of memory on the token in bytes in which private objects may be stored
     */
    totalPrivateMemory: number;
    /**
     * the amount of free (unused) memory on the token in bytes for private objects
     */
    freePrivateMemory: number;
    /**
     * version number of hardware
     */
    hardwareVersion: pkcs11.Version;
    /**
     * version number of firmware
     */
    firmwareVersion: pkcs11.Version;
    /**
     * current time as a character-string of length 16, 
     * represented in the format YYYYMMDDhhmmssxx.
     * Null when a token does not have a clock.
     */
    utcTime: Date;

    constructor(handle: core.Handle, lib: pkcs11.PKCS11) {
        super(handle, lib);

        this.getInfo();
    }

    protected getInfo() {
        let info = this.lib.C_GetTokenInfo(this.handle);
        this.label = info.label.trim().replace(/\u0000/g, "");
        this.manufacturerID = info.manufacturerID.toString().trim().replace(/\u0000/g, "");
        this.model = info.model.trim();
        this.serialNumber = new Buffer(info.serialNumber).toString().trim().replace(/\u0000/g, "");
        this.flags = info.flags;
        this.maxSessionCount = info.maxSessionCount;
        this.sessionCount = info.sessionCount;
        this.maxRwSessionCount = info.maxRwSessionCount;
        this.rwSessionCount = info.rwSessionCount;
        this.maxPinLen = info.maxPinLen;
        this.minPinLen = info.minPinLen;
        this.totalPublicMemory = info.totalPublicMemory;
        this.freePublicMemory = info.freePublicMemory;
        this.totalPrivateMemory = info.totalPrivateMemory;
        this.freePrivateMemory = info.freePrivateMemory;
        this.hardwareVersion = info.hardwareVersion;
        this.firmwareVersion = info.firmwareVersion;
        if (info.flags & TokenFlag.CLOCK_ON_TOKEN) {
          core.dateFromString(info.utcTime);
        }
    }

}
