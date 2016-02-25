import * as pkcs11 from "./pkcs11";
import * as core from "./core";
import * as fs from "fs";
import {Slot} from "./slot";
import * as obj from "./object";
import {MechanismEnum} from "./mech_enum";
import {IParams} from "./keys/params";
export * from "./mech_enum";

interface IMechanismInfo {
    ulMinKeySize: number;
    ulMaxKeySize: number;
    flags: number;
}

export interface IAlgorithm {
    name: string;
    params: Buffer | IParams;
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

    protected slotHandle: number;

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
        return MechanismEnum[this.handle] || "unknown";
    }

    constructor(handle: number, slotHandle: number, lib: pkcs11.Pkcs11) {
        super(handle, lib);
        this.slotHandle = slotHandle;

        this.getInfo();
    }

    protected getInfo(): void {
        let $info = core.Ref.alloc(pkcs11.CK_MECHANISM_INFO);
        let rv = this.lib.C_GetMechanismInfo(this.slotHandle, this.handle, $info);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetMechanismInfo");

        let info: IMechanismInfo = $info.deref();
        this.minKeySize = info.ulMinKeySize;
        this.maxKeySize = info.ulMaxKeySize;
        this.flags = info.flags;
    }

    static create(alg: MechanismType): Buffer;
    static create(alg) {
        let res = null;

        let _alg: IAlgorithm;
        if (core.isString(alg)) {
            _alg = { name: alg, params: null };
        }
        else if (core.isNumber(alg)) {
            _alg = { name: MechanismEnum[alg], params: null };
        }
        else {
            _alg = alg;
        }

        let hAlg = MechanismEnum[_alg.name.toUpperCase()];
        if (core.isEmpty(hAlg)) throw new TypeError(`Unknown mechanism name '${_alg.name}'`);

        let pParams = null;
        if (alg.params) {
            if (alg.params.toCKI)
                // Convert object with toCKI to Buffer
                pParams = alg.params.toCKI();
            else
                pParams = alg.params;
        }

        res = new pkcs11.CK_MECHANISM({
            mechanism: hAlg,
            pParameter: pParams,
            ulParameterLen: pParams ? pParams.length : 0
        });
        return res["ref.buffer"];
    }

    static vendor(jsonFile: string);
    static vendor(name: string, value: number);
    static vendor(name: string, value?: number) {
        let mechs: any = MechanismEnum;

        if (core.isEmpty(value)) {
            // vendor(jsonFile: string);
            let file = fs.readFileSync(name);
            let vendor = JSON.parse(file.toString());
            for (let i in vendor) {
                let new_name = `V_${i}`;
                let v = vendor[i];
                mechs[new_name] = v;
                mechs[v] = new_name;
            }
        }
        else {
            // vendor(name: string, value: number)
            let new_name = `V_${name}`;
            mechs[new_name] = value;
            mechs[value] = new_name;
        }
    }

}

export class MechanismCollection extends core.Collection<Mechanism> {
    protected slotHandle: number;

    constructor(items: Array<number>, slotHandle: number, lib: pkcs11.Pkcs11, classType = Mechanism) {
        super(items, lib, classType);

        this.slotHandle = slotHandle;
    }

    /**
     * returns item from collection by index
     * @param {number} index of element in collection `[0..n]`
     */
    items(index: number): Mechanism {
        let handle = this.items_[index];
        return new Mechanism(handle, this.slotHandle, this.lib);
    }
}