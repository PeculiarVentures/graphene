import { Int64LE } from "int64-buffer";
import * as pkcs11 from "pkcs11js";

import * as fs from "fs";
import * as core from "./core";
import { IParams } from "./keys/params";
import { MechanismEnum } from "./mech_enum";
import * as obj from "./object";
export * from "./mech_enum";

export interface IAlgorithm {
    name: string;
    params: Buffer | IParams | null;
}

export type MechanismType = MechanismEnum | obj.KeyGenMechanism | IAlgorithm | string;

export enum MechanismFlag {
    /**
     * `True` if the mechanism is performed by the device; `false` if the mechanism is performed in software
     */
    HW = pkcs11.CKF_HW,
    /**
     * `True` if the mechanism can be used with encrypt function
     */
    ENCRYPT = pkcs11.CKF_ENCRYPT,
    /**
     * `True` if the mechanism can be used with decrypt function
     */
    DECRYPT = pkcs11.CKF_DECRYPT,
    /**
     * `True` if the mechanism can be used with digest function
     */
    DIGEST = pkcs11.CKF_DIGEST,
    /**
     * `True` if the mechanism can be used with sign function
     */
    SIGN = pkcs11.CKF_SIGN,
    /**
     * `True` if the mechanism can be used with sign recover function
     */
    SIGN_RECOVER = pkcs11.CKF_SIGN_RECOVER,
    /**
     * `True` if the mechanism can be used with verify function
     */
    VERIFY = pkcs11.CKF_VERIFY,
    /**
     * `True` if the mechanism can be used with verify recover function
     */
    VERIFY_RECOVER = pkcs11.CKF_VERIFY_RECOVER,
    /**
     * `True` if the mechanism can be used with geberate function
     */
    GENERATE = pkcs11.CKF_GENERATE,
    /**
     * `True` if the mechanism can be used with generate key pair function
     */
    GENERATE_KEY_PAIR = pkcs11.CKF_GENERATE_KEY_PAIR,
    /**
     * `True` if the mechanism can be used with wrap function
     */
    WRAP = pkcs11.CKF_WRAP,
    /**
     * `True` if the mechanism can be used with unwrap function
     */
    UNWRAP = pkcs11.CKF_UNWRAP,
    /**
     * `True` if the mechanism can be used with derive function
     */
    DERIVE = pkcs11.CKF_DERIVE,
}

export class Mechanism extends core.HandleObject {

    /**
     * returns string name from MechanismEnum
     */
    get name(): string {
        return MechanismEnum[this.type] || "unknown";
    }

    public static create(algorithm: MechanismType): pkcs11.Mechanism {
        let res: pkcs11.Mechanism;

        let alg: IAlgorithm;
        if (core.isString(algorithm)) {
            alg = { name: algorithm as string, params: null };
        } else if (core.isNumber(algorithm)) {
            alg = { name: MechanismEnum[algorithm as number], params: null };
        } else {
            alg = algorithm as IAlgorithm;
        }

        const hAlg = (MechanismEnum as any)[alg.name.toUpperCase()];
        if (core.isEmpty(hAlg)) { throw new TypeError(`Unknown mechanism name '${alg.name}'`); }

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

    public static vendor(jsonFile: string): void;
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

    public type: MechanismEnum;

    /**
     * the minimum size of the key for the mechanism
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    public minKeySize: number;

    /**
     * the maximum size of the key for the mechanism
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    public maxKeySize: number;

    /**
     * bit flag specifying mechanism capabilities
     */
    public flags: number;

    protected slotHandle: core.Handle;

    constructor(type: number, handle: pkcs11.Handle, slotHandle: core.Handle, lib: pkcs11.PKCS11) {
        super(handle, lib);
        this.type = type;
        this.slotHandle = slotHandle;

        this.getInfo();
    }

    protected getInfo(): void {
        const info = this.lib.C_GetMechanismInfo(this.slotHandle, this.type);

        this.minKeySize = info.minKeySize;
        this.maxKeySize = info.maxKeySize;
        this.flags = info.flags;
    }

}

export class MechanismCollection extends core.Collection<Mechanism> {
    protected slotHandle: core.Handle;

    constructor(items: number[], slotHandle: core.Handle, lib: pkcs11.PKCS11, classType = Mechanism) {
        super(items, lib, classType);

        this.slotHandle = slotHandle;
    }

    /**
     * Returns item from collection by index
     * @param {number} index index of an element in the collection `[0..n]`
     */
    public items(index: number): Mechanism {
        const type = this.items_[index];
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
