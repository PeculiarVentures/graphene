import * as pkcs11 from "./pkcs11";
import * as core from "./core";
import {IVersion} from "./module";

export enum TokenFlag{
    RNG = pkcs11.CKF_RNG,
    WRITE_PROTECTED = pkcs11.CKF_WRITE_PROTECTED,
    LOGIN_REQUIRED=pkcs11.CKF_LOGIN_REQUIRED,
    USER_PIN_INITIALIZED=pkcs11.CKF_USER_PIN_INITIALIZED,
    RESTORE_KEY_NOT_NEEDED = pkcs11.CKF_RESTORE_KEY_NOT_NEEDED,
    CLOCK_ON_TOKEN = pkcs11.CKF_CLOCK_ON_TOKEN,
    PROTECTED_AUTHENTICATION_PATH = pkcs11.CKF_PROTECTED_AUTHENTICATION_PATH,
    DUAL_CRYPTO_OPERATIONS = pkcs11.CKF_DUAL_CRYPTO_OPERATIONS,
    TOKEN_INITIALIZED = pkcs11.CKF_TOKEN_INITIALIZED,
    SECONDARY_AUTHENTICATION = pkcs11.CKF_SECONDARY_AUTHENTICATION,
    USER_PIN_COUNT_LOW = pkcs11.CKF_USER_PIN_COUNT_LOW,
    USER_PIN_FINAL_TRY = pkcs11.CKF_USER_PIN_FINAL_TRY,
    USER_PIN_LOCKED = pkcs11.CKF_USER_PIN_LOCKED,
    USER_PIN_TO_BE_CHANGED = pkcs11.CKF_USER_PIN_TO_BE_CHANGED,
    SO_PIN_COUNT_LOW = pkcs11.CKF_SO_PIN_COUNT_LOW,
    SO_PIN_FINAL_TRY = pkcs11.CKF_SO_PIN_FINAL_TRY,
    SO_PIN_LOCKED = pkcs11.CKF_SO_PIN_LOCKED,
    SO_PIN_TO_BE_CHANGED = pkcs11.CKF_SO_PIN_TO_BE_CHANGED
}

interface ITokenInfo {
    label: Buffer;
    manufacturerID: Buffer;
    model: Buffer;
    serialNumber: Buffer;
    flags: TokenFlag;

    ulMaxSessionCount: number;
    ulSessionCount: number;
    ulMaxRwSessionCount: number;
    ulRwSessionCount: number;
    ulMaxPinLen: number;
    ulMinPinLen: number;
    ulTotalPublicMemory: number;
    ulFreePublicMemory: number;
    ulTotalPrivateMemory: number;
    ulFreePrivateMemory: number;

    hardwareVersion: IVersion;
    firmwareVersion: IVersion;
    utcTime: Buffer;
}

export class Token extends core.HandleObject {

    label: string;
    manufacturerID: string;
    model: string;
    serialNumber: string;
    flags: TokenFlag;

    maxSessionCount: number;
    sessionCount: number;
    maxRwSessionCount: number;
    rwSessionCount: number;
    maxPinLen: number;
    minPinLen: number;
    totalPublicMemory: number;
    freePublicMemory: number;
    totalPrivateMemory: number;
    freePrivateMemory: number;

    hardwareVersion: IVersion;
    firmwareVersion: IVersion;
    utcTime: string;

    protected getInfo() {
        let $info = core.Ref.alloc(pkcs11.CK_TOKEN_INFO);
        let rv = this.lib.C_GetTokenInfo(this.handle, $info)
        if (rv) throw new core.Pkcs11Error(rv, "C_GetTokenInfo");

        let info: ITokenInfo = $info.deref();
        this.label = info.label.toString().trim();
        this.manufacturerID = info.manufacturerID.toString().trim();
        this.model = info.model.toString().trim();
        this.serialNumber = info.serialNumber.toString().trim();
        this.flags = info.flags;
        this.maxSessionCount = info.ulMaxSessionCount;
        this.sessionCount = info.ulSessionCount;
        this.maxRwSessionCount = info.ulMaxRwSessionCount;
        this.rwSessionCount = info.ulRwSessionCount;
        this.maxPinLen = info.ulMaxPinLen;
        this.minPinLen = info.ulMinPinLen;
        this.totalPublicMemory = info.ulTotalPublicMemory;
        this.freePublicMemory = info.ulFreePublicMemory;
        this.totalPrivateMemory = info.ulTotalPrivateMemory;
        this.freePrivateMemory = info.ulFreePrivateMemory;

        this.hardwareVersion = {
            major: info.hardwareVersion.major,
            minor: info.hardwareVersion.minor
        };
        this.firmwareVersion = {
            major: info.firmwareVersion.major,
            minor: info.firmwareVersion.minor
        }
        this.utcTime = info.utcTime.toString("ascii");
    }

}