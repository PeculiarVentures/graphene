import * as pkcs11 from "pkcs11js";
import * as core from "./core";
import * as fs from "fs";
import * as obj from "./object";
import {MechanismEnum} from "./mech_enum";
import {IParams} from "./keys/params";
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

    protected slotHandle: core.Handle;

    public type: MechanismEnum;

    /**
     * the minimum size of the key for the mechanism
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    minKeySize: number;

    /**
     * the maximum size of the key for the mechanism
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    maxKeySize: number;

    /**
     * bit flag specifying mechanism capabilities
     */
    flags: number;

    /**
     * returns string name from MechanismEnum
     */
    get name(): string {
        return MechanismEnum[this.type] || "unknown";
    }

    constructor(type: number, handle: pkcs11.Handle, slotHandle: core.Handle, lib: pkcs11.PKCS11) {
        super(handle, lib);
        this.type = type;
        this.slotHandle = slotHandle;

        this.getInfo();
    }

    protected getInfo(): void {
        let info =  this.lib.C_GetMechanismInfo(this.slotHandle, this.type);

        this.minKeySize = info.minKeySize;
        this.maxKeySize = info.maxKeySize;
        this.flags = info.flags;
    }

    static create(alg: MechanismType): pkcs11.Mechanism {
        let res: pkcs11.Mechanism;

        let _alg: IAlgorithm;
        if (core.isString(alg)) {
            _alg = { name: alg as string, params: null };
        }
        else if (core.isNumber(alg)) {
            _alg = { name: MechanismEnum[alg as number], params: null };
        }
        else {
            _alg = alg as IAlgorithm;
        }

        let hAlg = (MechanismEnum as any)[_alg.name.toUpperCase()];
        if (core.isEmpty(hAlg)) throw new TypeError(`Unknown mechanism name '${_alg.name}'`);

        let params: any = null;
        if (_alg.params) {
            if ((_alg.params as IParams).toCKI)
                // Convert object with toCKI to Buffer
                params = (_alg.params as IParams).toCKI();
            else
                params = _alg.params;
        }

        res = {
            mechanism: hAlg,
            parameter: params
        };
        return res;
    }

    static vendor(jsonFile: string): void;
    static vendor(name: string, value: number): void;
    static vendor(name: string, value?: number): void {
        let mechs: any = MechanismEnum;

        if (core.isEmpty(value)) {
            // vendor(jsonFile: string);
            let file = fs.readFileSync(name);
            let vendor = JSON.parse(file.toString());
            for (let i in vendor) {
                let new_name = i;
                let v = vendor[i];
                mechs[new_name] = v;
                mechs[v] = new_name;
            }
        }
        else {
            // vendor(name: string, value: number)
            let new_name = name;
            mechs[new_name] = value;
            mechs[value as any] = new_name;
        }
    }

}

export class MechanismCollection extends core.Collection<Mechanism> {
    protected slotHandle: core.Handle;

    constructor(items: Array<number>, slotHandle: core.Handle, lib: pkcs11.PKCS11, classType = Mechanism) {
        super(items, lib, classType);

        this.slotHandle = slotHandle;
    }

    /**
     * returns item from collection by index
     * @param {number} index of element in collection `[0..n]`
     */
    items(index: number): Mechanism {
        const type = this.items_[index];
        // convert type to buffer
        const handle = new Buffer(8);
        handle.fill(0);
        handle.writeInt32LE(type, 0);
        return new Mechanism(type, handle, this.slotHandle, this.lib);
    }
}