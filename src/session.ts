import * as pkcs11 from "./pkcs11";
import * as core from "./core";
import {Slot} from "./slot";
import {SessionObject, SessionObjectCollection, ObjectClass} from "./object";
import {Template, ITemplate} from "./template";
import * as mech from "./mech";
import * as objects from "./objects/common";

const ObjectArray = core.RefArray(pkcs11.CK_OBJECT_HANDLE);

export enum SessionOpenFlag {
    /**
     * session is r/w
     */
    RW_SESSION = pkcs11.CKF_RW_SESSION,
    /**
     * no parallel
     */
    SERIAL_SESSION = pkcs11.CKF_SERIAL_SESSION
}

export enum SessionFlag {
    /**
     * `True` if the session is read/write; `false` if the session is read-only
     */
    RW_SESSION = pkcs11.CKF_RW_SESSION,
    /**
     * This flag is provided for backward compatibility, and should always be set to `true`
     */
    SERIAL_SESSION = pkcs11.CKF_SERIAL_SESSION
}

export enum UserType {
    /**
     * Security Officer
     */
    SO = pkcs11.CKU_SO,
    /**
     * User
     */
    USER = pkcs11.CKU_USER,
    /**
     * Context specific
     */
    CONTEXT_SPECIFIC = pkcs11.CKU_CONTEXT_SPECIFIC
}

interface ISessionInfo {
    slotID: number;
    state: number;
    flags: number;
    ulDeviceError: number;
}

/**
 * provides information about a session
 */
export class Session extends core.HandleObject {

    constructor(handle: number, slot: Slot, lib: pkcs11.Pkcs11) {
        super(handle, lib);

        this.slot = slot;
    }

    slot: Slot;
    /**
     * the state of the session
     */
    state: number;
    /**
     * bit flags that define the type of session
     */
    flags: number;
    /**
     * an error code defined by the cryptographic device. Used for errors not covered by Cryptoki
     */
    deviceError: number;

    protected getInfo() {
        let $info = core.Ref.alloc(pkcs11.CK_SESSION_INFO);
        let rv = this.lib.C_GetSessionInfo(this.handle, $info);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetSessionInfo");

        let info: ISessionInfo = $info.deref();
        this.state = info.state;
        this.flags = info.flags;
        this.deviceError = info.ulDeviceError;
    }

    /**
     * closes a session between an application and a token
     */
    close() {
        let rv = this.lib.C_CloseSession(this.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_CloseSession");
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
     * obtains a copy of the cryptographic operations state of a session, encoded as a string of bytes
     */
    getOperationState(): Buffer {
        let $len = core.Ref.alloc(pkcs11.CK_ULONG);
        let rv = this.lib.C_GetOperationState(this.handle, null, $len);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetOperationState");
        let buf = new Buffer($len.deref());
        rv = this.lib.C_GetOperationState(this.handle, buf, $len);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetOperationState");
        return buf;
    }

    /**
     * restores the cryptographic operations state of a session 
     * from a string of bytes obtained with getOperationState
     * @param {Buffer} state the saved state
     * @param {number} encryptionKey holds key which will be used for an ongoing encryption 
     * or decryption operation in the restored session 
     * (or 0 if no encryption or decryption key is needed, 
     * either because no such operation is ongoing in the stored session 
     * or because all the necessary key information is present in the saved state)
     * @param {number} authenticationKey holds a handle to the key which will be used for an ongoing signature, 
     * MACing, or verification operation in the restored session 
     * (or 0 if no such key is needed, either because no such operation is ongoing in the stored session 
     * or because all the necessary key information is present in the saved state) 
     */
    setOperationState(state: Buffer, encryptionKey: number = 0, authenticationKey: number = 0) {
        // let $len = core.Ref.alloc(pkcs11.CK_ULONG);
        let rv = this.lib.C_SetOperationState(this.handle, state, state.length, encryptionKey, authenticationKey);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetOperationState");
    }

    /**
     * logs a user into a token
     * @param {string} pin the user's PIN. 
     * - This standard allows PIN values to contain any valid `UTF8` character, 
     * but the token may impose subset restrictions
     * @param {} userType the user type. Default is `USER`
     */
    login(pin: string, userType: UserType = UserType.USER) {
        let bufPin = new Buffer(pin, "utf8");
        let rv = this.lib.C_Login(this.handle, userType, bufPin, bufPin.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_Login");
    }

    /**
     * logs a user out from a token
     */
    logout() {
        let rv = this.lib.C_Logout(this.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_Logout");
    }

    /**
     * creates a new object
     * - Only session objects can be created during a read-only session. 
     * - Only public objects can be created unless the normal user is logged in.
     * @param {ITemplate} template the object's template
     */
    create(template: ITemplate): SessionObject {
        let tmpl = new Template(template);
        let $obj = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);

        let rv = this.lib.C_CreateObject(this.handle, tmpl.ref(), tmpl.length, $obj);
        if (rv) throw new core.Pkcs11Error(rv, "C_CreateObject");

        return new SessionObject($obj.deref(), this, this.lib);
    }

    /**
     * removes all session objects matched to template
     * - if template is null, removes all session objects
     * - returns a number of destroied session objects
     * @param template template
     * 
     */
    destroy(template?: ITemplate): number {
        let objs = this.find(template);
        let removed = objs.length;
        for (let i = 0; i < objs.length; i++) {
            objs.items(i).destroy();
        }
        return removed;
    }
    
    /**
     * removes all session objects
     * - returns a number of destroied session objects
     */
    clear(): number {
        return this.destroy();
    }

    /**
     * returns a collection of session objects mached to template
     * @param template template
     * @param callback optional callback function wich is called for each founded object
     * - if callback function returns false, it breaks find function.
     */
    find(template: ITemplate, callback?: (obj: SessionObject) => boolean): SessionObjectCollection {
        let tmpl = new Template(template);

        let rv = this.lib.C_FindObjectsInit(this.handle, tmpl.ref(), tmpl.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_FindObjectsInit");

        let $objects = new ObjectArray(1);
        let $objlen = core.Ref.alloc(pkcs11.CK_ULONG);
        let objects: number[] = [];

        while (true) {
            rv = this.lib.C_FindObjects(this.handle, $objects.buffer, 1, $objlen);
            if (rv !== pkcs11.CKR_OK || $objlen.deref() === 0)
                break;
            let hObject: number = <any>$objects[0];
            if (callback && callback(new SessionObject(hObject, this, this.lib)) === false) {
                break;
            }
            objects.push(hObject);
        }

        rv = this.lib.C_FindObjectsFinal(this.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_FindObjectsFinal");

        return new SessionObjectCollection(objects, this, this.lib);
    }

    /**
     * generates a secret key or set of domain parameters, creating a new object.
     * @param mechanism generation mechanism
     * @param template template for the new key or set of domain parameters
     */
    generateKey(mechanism: string, template?: ITemplate): objects.SecretKey;
    generateKey(mechanism: mech.IAlgorithm, template?: ITemplate): objects.SecretKey;
    generateKey(mechanism, template: ITemplate = null): objects.SecretKey {
        let pMech = mech.Mechanism.create(mechanism);
        // init default template params
        if (template){
            template.class = ObjectClass.SECRET_KEY
        }
        let pTemplate = new Template(template);
        let hKey = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);
        
        // console.log(this.handle, pMech , pTemplate.ref(), pTemplate.length, hKey);
        let rv = this.lib.C_GenerateKey(this.handle, pMech["ref.buffer"] , pTemplate.ref(), pTemplate.length, hKey);
        if (rv) throw new core.Pkcs11Error(rv, "C_GenerateKey");
        
        let obj = new SessionObject(hKey.deref(), this, this.lib);
        return obj.toType<objects.SecretKey>();
    }
}