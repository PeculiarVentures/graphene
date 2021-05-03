import { Int64LE } from "int64-buffer";
import * as pkcs11 from "pkcs11js";

import * as fs from "fs";
import * as core from "./core";
import { IParams } from "./keys/params";
import { MechanismEnum } from "./mech_enum";
import type { KeyGenMechanism } from "./objects";

/**
 * Structure that describes algorithm
 */
export interface IAlgorithm {
    /**
     * The algorithm name
     */
    name: keyof typeof MechanismEnum | string | number;
    /**
     * The algorithm parameters
     */
    params: Buffer | IParams | null;
}

export type MechanismType = MechanismEnum | KeyGenMechanism | IAlgorithm | keyof typeof MechanismEnum | string;

/**
 * Bit flags specifying mechanism capabilities
 */
export enum MechanismFlag {
    /**
     * `true` if the mechanism is performed by the device; `false` if the mechanism is performed in software
     */
    HW = pkcs11.CKF_HW,
    /**
     * `true` if the mechanism can be used with encrypt function
     */
    ENCRYPT = pkcs11.CKF_ENCRYPT,
    /**
     * `true` if the mechanism can be used with decrypt function
     */
    DECRYPT = pkcs11.CKF_DECRYPT,
    /**
     * `true` if the mechanism can be used with digest function
     */
    DIGEST = pkcs11.CKF_DIGEST,
    /**
     * `true` if the mechanism can be used with sign function
     */
    SIGN = pkcs11.CKF_SIGN,
    /**
     * `true` if the mechanism can be used with sign recover function
     */
    SIGN_RECOVER = pkcs11.CKF_SIGN_RECOVER,
    /**
     * `true` if the mechanism can be used with verify function
     */
    VERIFY = pkcs11.CKF_VERIFY,
    /**
     * `true` if the mechanism can be used with verify recover function
     */
    VERIFY_RECOVER = pkcs11.CKF_VERIFY_RECOVER,
    /**
     * `true` if the mechanism can be used with geberate function
     */
    GENERATE = pkcs11.CKF_GENERATE,
    /**
     * `true` if the mechanism can be used with generate key pair function
     */
    GENERATE_KEY_PAIR = pkcs11.CKF_GENERATE_KEY_PAIR,
    /**
     * `true` if the mechanism can be used with wrap function
     */
    WRAP = pkcs11.CKF_WRAP,
    /**
     * `true` if the mechanism can be used with unwrap function
     */
    UNWRAP = pkcs11.CKF_UNWRAP,
    /**
     * `true` if the mechanism can be used with derive function
     */
    DERIVE = pkcs11.CKF_DERIVE,
}

/**
 * Represents a PKCS#11 mechanism
 */
export class Mechanism extends core.HandleObject {

    /**
     * Returns string name from {@link MechanismEnum}. For unregistered mechanism returns string `unknown`.
     * To register a custom mechanism in {@link MechanismEnum} use {@link Mechanism.vendor} static function
     */
    get name(): string {
        return MechanismEnum[this.type] || "unknown";
    }

    /**
     * Creates PKCS#11 mechanism structure from {@link MechanismType}
     * @param algorithm Mechanism type
     */
    public static create(algorithm: MechanismType): pkcs11.Mechanism {
        let res: pkcs11.Mechanism;

        let alg: IAlgorithm;
        if (core.isString(algorithm)) {
            alg = { name: algorithm as string, params: null };
        } else if (core.isNumber(algorithm)) {
            alg = { name: algorithm, params: null };
        } else {
            alg = algorithm as IAlgorithm;
        }

        let hAlg: number;
        if (core.isNumber(alg.name)) {
            hAlg = alg.name;
        } else {
            hAlg = (MechanismEnum as any)[alg.name.toUpperCase()];
            if (core.isEmpty(hAlg)) {
                throw new TypeError(`Unknown mechanism name '${alg.name}'`);
            }
        }

        let params: any = null;
        if (alg.params) {
            if ((alg.params as any).toCKI) {
                // Convert object with toCKI to Buffer
                params = (alg.params as IParams).toCKI();
            } else {
                params = alg.params;
            }
        }

        res = {
            mechanism: hAlg,
            parameter: params,
        };
        return res;
    }

    /**
     * Adds a vendor mechanisms to {@link MechanismEnum} from the specified file
     * @param jsonFile Path to JSON file with vendor mechanisms
     */
    public static vendor(jsonFile: string): void;
    /**
     * Adds a vendor mechanism to {@link MechanismEnum}
     * @param name Mechanism name
     * @param value Mechanism value
     */
    public static vendor(name: string, value: number): void;
    public static vendor(name: string, value?: number): void {
        const mechs: any = MechanismEnum;

        if (core.isEmpty(value)) {
            // vendor(jsonFile: string);
            const file = fs.readFileSync(name);
            const vendor = JSON.parse(file.toString());
            for (const i in vendor) {
                const newName = i;
                const v = vendor[i];
                mechs[newName] = v;
                mechs[v] = newName;
            }
        } else {
            // vendor(name: string, value: number)
            const newName = name;
            mechs[newName] = value;
            mechs[value as any] = newName;
        }
    }

    /**
     * The mechanism type number
     */
    public type: MechanismEnum;

    /**
     * The minimum size of the key for the mechanism
     *
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    public minKeySize: number;

    /**
     * The maximum size of the key for the mechanism
     *
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    public maxKeySize: number;

    /**
     * Bit flag specifying mechanism capabilities
     */
    public flags: number;

    /**
     * The ID of the token’s slot
     */
    protected slotHandle: core.Handle;

    /**
     * Initializes the mechanism structure
     * @param type The type of mechanism
     * @param handle The ID of mechanism
     * @param slotHandle The ID of the token’s slot
     * @param lib PKCS#11 module
     */
    constructor(type: number, handle: pkcs11.Handle, slotHandle: core.Handle, lib: pkcs11.PKCS11) {
        super(handle, lib);
        this.type = type;
        this.slotHandle = slotHandle;

        this.getInfo();
    }

    /**
     * Retrieves information about mechanism and fills object fields
     */
    protected getInfo(): void {
        const info = this.lib.C_GetMechanismInfo(this.slotHandle, this.type);

        this.minKeySize = info.minKeySize;
        this.maxKeySize = info.maxKeySize;
        this.flags = info.flags;
    }

}

/**
 * Represents a collection of PKCS#11 mechanisms
 */
export class MechanismCollection extends core.Collection<Mechanism> {
    /**
     * The ID of token's slot
     */
    protected slotHandle: core.Handle;

    /**
     * Initialize a new instance of mechanism collection
     * @param items The list of mechanism types
     * @param slotHandle The ID of token's slot
     * @param lib PKCS#11 module
     */
    constructor(items: number[], slotHandle: core.Handle, lib: pkcs11.PKCS11) {
        super(items, lib, Mechanism);

        this.slotHandle = slotHandle;
    }

    /**
     * Returns item from collection by index
     * @param {number} index index of an element in the collection `[0..n]`
     */
    public items(index: number): Mechanism {
        const type = this.innerItems[index];
        // convert type to buffer
        const handle = new Int64LE(type).toBuffer();
        return new Mechanism(type, handle, this.slotHandle, this.lib);
    }

    /**
     * Tries to get Mechanism. Returns `null` if it's impossible to get mechanism
     * @param index index of an element in the collection `[0..n]`
     */
    public tryGetItem(index: number): Mechanism | null {
        // Some providers throw CKR_MECHANISM_INVALID on `C_GetMechanismInfo` method
        // https://github.com/PeculiarVentures/node-webcrypto-p11/issues/55
        try {
            return this.items(index);
        } catch {
            return null;
        }
    }
}
