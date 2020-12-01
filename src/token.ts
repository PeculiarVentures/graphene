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

/**
 * Represents PKCS#11 token structure
 */
export class Token extends core.HandleObject {

  /**
   * Application-defined label, assigned during token initialization
   */
  public label: string;

  /**
   * ID of the device manufacturer
   */
  public manufacturerID: string;

  /**
   * Model of the device
   */
  public model: string;

  /**
   * Character-string serial number of the device.
   */
  public serialNumber: string;

  /**
   * Bit flags indicating capabilities and status of the device
   */
  public flags: TokenFlag;

  /**
   * Maximum number of sessions that can be opened with the token at one time by a single application
   */
  public maxSessionCount: number;

  /**
   * Number of sessions that this application currently has open with the token
   */
  public sessionCount: number;

  /**
   * maximum number of read/write sessions that can be opened
   * with the token at one time by a single application
   */
  public maxRwSessionCount: number;

  /**
   * Number of read/write sessions that this application currently has open with the token
   */
  public rwSessionCount: number;

  /**
   * Maximum length in bytes of the PIN
   */
  public maxPinLen: number;

  /**
   * Minimum length in bytes of the PIN
   */
  public minPinLen: number;

  /**
   * The total amount of memory on the token in bytes in which public objects may be stored
   */
  public totalPublicMemory: number;

  /**
   * The amount of free (unused) memory on the token in bytes for public objects
   */
  public freePublicMemory: number;

  /**
   * The total amount of memory on the token in bytes in which private objects may be stored
   */
  public totalPrivateMemory: number;

  /**
   * The amount of free (unused) memory on the token in bytes for private objects
   */
  public freePrivateMemory: number;

  /**
   * Version number of hardware
   */
  public hardwareVersion: pkcs11.Version;

  /**
   * Version number of firmware
   */
  public firmwareVersion: pkcs11.Version;

  /**
   * Current time. Null when a token does not have a clock.
   */
  public utcTime: Date | null;

  constructor(handle: core.Handle, lib: pkcs11.PKCS11) {
    super(handle, lib);

    this.getInfo();
  }

  protected getInfo() {
    const info = this.lib.C_GetTokenInfo(this.handle);
    this.label = core.removePadding(info.label);
    this.manufacturerID = core.removePadding(info.manufacturerID);
    this.model = core.removePadding(info.model);
    this.serialNumber = core.removePadding(Buffer.from(info.serialNumber).toString());
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
    this.utcTime = info.flags & TokenFlag.CLOCK_ON_TOKEN
      ? core.dateFromString(info.utcTime)
      : null;
  }

}
