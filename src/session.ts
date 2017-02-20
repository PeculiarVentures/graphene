import * as pkcs11 from "pkcs11js";

import * as core from "./core";
import { Slot } from "./slot";
import { SessionObject, SessionObjectCollection, ObjectClass, Key, SecretKey } from "./object";
import { Template, ITemplate } from "./template";
import { Mechanism, MechanismType } from "./mech";
import * as objects from "./objects/common";

import { Sign, Verify, Cipher, Decipher, Digest } from "./crypto/common";


export enum SessionFlag {
    /**
     * `True` if the session is read/write; `false` if the session is read-only
     */
    RW_SESSION = 2,
    /**
     * This flag is provided for backward compatibility, and should always be set to `true`
     */
    SERIAL_SESSION = 4
}

export enum UserType {
    /**
     * Security Officer
     */
    SO,
    /**
     * User
     */
    USER,
    /**
     * Context specific
     */
    CONTEXT_SPECIFIC
}

export interface IKeyPair {
    privateKey: objects.PrivateKey;
    publicKey: objects.PublicKey;
}

type SessionFindCallback = (obj: SessionObject, index: number) => any;

/**
 * provides information about a session
 * 
 * @export
 * @class Session
 * @extends {core.HandleObject}
 */
export class Session extends core.HandleObject {

    constructor(handle: core.Handle, slot: Slot, lib: pkcs11.PKCS11) {
        super(handle, lib);

        this.slot = slot;
        this.getInfo();
    }

    /**
     * Slot 
     * 
     * @type {Slot}
     */
    slot: Slot;
    /**
     * the state of the session
     * 
     * @type {number}
     */
    state: number;

    /**
     * bit flags that define the type of session
     * 
     * @type {number}
     */
    flags: number;

    /**
     * an error code defined by the cryptographic device. Used for errors not covered by Cryptoki 
     * 
     * @type {number}
     */
    deviceError: number;

    protected getInfo() {
        let info = this.lib.C_GetSessionInfo(this.handle);

        this.state = info.state;
        this.flags = info.flags;
        this.deviceError = info.deviceError;
    }

    /**
     * closes a session between an application and a token
     */
    close() {
        this.lib.C_CloseSession(this.handle);
    }

    /**
     * initializes the normal user's PIN
     * @param {string} pin the normal user's PIN
     */
    initPin(pin: string) {
        this.lib.C_InitPIN(this.handle, pin);
    }

    /**
     * modifies the PIN of the user who is logged in
     * @param {string} oldPin 
     * @param {string} newPin
     */
    setPin(oldPin: string, newPin: string) {
        this.lib.C_SetPIN(this.handle, oldPin, newPin);
    }

    /**
     * obtains a copy of the cryptographic operations state of a session, encoded as a string of bytes
     */
    getOperationState(): Buffer {
        throw new Error("Not implemented");
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
        throw new Error("Not implemented");
    }

    /**
     * logs a user into a token
     * @param {string} pin the user's PIN. 
     * - This standard allows PIN values to contain any valid `UTF8` character, 
     * but the token may impose subset restrictions
     * @param {} userType the user type. Default is `USER`
     */
    login(pin: string, userType: UserType = UserType.USER) {
        this.lib.C_Login(this.handle, userType, pin);
    }

    /**
     * logs a user out from a token
     */
    logout() {
        this.lib.C_Logout(this.handle);
    }

    /**
     * creates a new object
     * - Only session objects can be created during a read-only session. 
     * - Only public objects can be created unless the normal user is logged in.
     * @param {ITemplate} template the object's template
     * @returns {SessionObject}
     */
    create(template: ITemplate): SessionObject {
        let tmpl = Template.toPkcs11(template);

        let hObject = this.lib.C_CreateObject(this.handle, tmpl);

        return new SessionObject(hObject, this, this.lib);
    }

    /**
     * Copies an object, creating a new object for the copy
     * @param {SessionObject} object the copied object
     * @param {ITemplate} template template for new object
     * @returns {SessionObject}
     */
    copy(object: SessionObject, template: ITemplate): SessionObject {
        let tmpl = Template.toPkcs11(template);

        let hObject = this.lib.C_CopyObject(this.handle, object.handle, tmpl);

        return new SessionObject(hObject, this, this.lib);
    }

    /**
     * removes all session objects matched to template
     * - if template is null, removes all session objects
     * - returns a number of destroied session objects
     * @param {ITemplate} template template
     */
    destroy(template: ITemplate): number;
    /**
     * @param {SessionObject} object
     */
    destroy(object: SessionObject): number;
    destroy(): number;
    destroy(param?: SessionObject | ITemplate): number {

        if (param instanceof SessionObject) {
            // destroy(object: SessionObject): number;
            this.lib.C_DestroyObject(this.handle, param.handle);
            return 1;
        }
        else {
            let objs = this.find(param || null);
            let removed = objs.length;
            for (let i = 0; i < objs.length; i++) {
                objs.items(i).destroy();
            }
            return removed;
        }
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
    find(): SessionObjectCollection;
    find(callback: SessionFindCallback): SessionObjectCollection;
    find(template?: ITemplate | null, callback?: SessionFindCallback): SessionObjectCollection;
    find(template: ITemplate | SessionFindCallback | null = null, callback?: SessionFindCallback): SessionObjectCollection {
        if (core.isFunction(template)) {
            callback = template as SessionFindCallback;
            template = null;
        }
        let tmpl = Template.toPkcs11(template);

        this.lib.C_FindObjectsInit(this.handle, tmpl);

        let objects: core.Handle[] = [];
        try {
          while (true) {
              let hObject = this.lib.C_FindObjects(this.handle);
              if (!hObject)
                  break;
              if (callback && callback(new SessionObject(hObject, this, this.lib), objects.length) === false) {
                  break;
              }
              objects.push(hObject);
              }
        } catch (error) {
              this.lib.C_FindObjectsFinal(this.handle);
              throw(error);
        }
        this.lib.C_FindObjectsFinal(this.handle);
        return new SessionObjectCollection(objects, this, this.lib);
    }

    /**
     * Returns object from session by handle
     * @param  {number} handle handle of object
     * @returns T
     */
    getObject<T extends SessionObject>(handle: core.Handle): T | null {
        let res: SessionObject | undefined;
        this.find(obj => {
            const compare = obj.handle.compare(handle);
            if (compare === 0) {
                res = obj;
                return false;
            }
            if (compare === 1) return false;
        });
        if (res)
            return res.toType<T>();
        else
            return null;
    }

    /**
     * generates a secret key or set of domain parameters, creating a new object.
     * @param mechanism generation mechanism
     * @param template template for the new key or set of domain parameters
     */
    generateKey(mechanism: MechanismType, template?: ITemplate): objects.SecretKey;
    generateKey(mechanism: MechanismType, template: ITemplate, callback: Callback<Error, objects.SecretKey>): void;
    generateKey(mechanism: MechanismType, template: ITemplate | null = null, callback?: Callback<Error, objects.SecretKey>): objects.SecretKey | void {
        try {
            let pMech = Mechanism.create(mechanism);
            // init default template params
            if (template) {
                template.class = ObjectClass.SECRET_KEY;
            }
            let pTemplate = Template.toPkcs11(template);

            if (callback) {
                this.lib.C_GenerateKey(this.handle, pMech, pTemplate, (err, hKey) => {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        // Wrap handle of kry to SecretKey
                        let obj = new SessionObject(hKey, this, this.lib);
                        callback(null, obj.toType<objects.SecretKey>());
                    }
                });
            }
            else {
                let hKey = this.lib.C_GenerateKey(this.handle, pMech, pTemplate);

                // Wrap handle of kry to SecretKey
                let obj = new SessionObject(hKey, this, this.lib);
                return obj.toType<objects.SecretKey>();
            }
        } catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    }

    generateKeyPair(mechanism: MechanismType, publicTemplate: ITemplate, privateTemplate: ITemplate): IKeyPair;
    generateKeyPair(mechanism: MechanismType, publicTemplate: ITemplate, privateTemplate: ITemplate, callback: Callback<Error, IKeyPair>): void;
    generateKeyPair(mechanism: MechanismType, publicTemplate: ITemplate, privateTemplate: ITemplate, callback?: Callback<Error, IKeyPair>): IKeyPair | void {
        try {
            let pMech = Mechanism.create(mechanism);
            // init default public key template
            if (publicTemplate) {
                publicTemplate.class = ObjectClass.PUBLIC_KEY;
            }
            let pubTmpl = Template.toPkcs11(publicTemplate);

            // init default private key template
            if (privateTemplate) {
                privateTemplate.class = ObjectClass.PRIVATE_KEY;
                privateTemplate.private = true;
            }
            let prvTmpl = Template.toPkcs11(privateTemplate);

            if (callback) {
                // async
                this.lib.C_GenerateKeyPair(
                    this.handle, pMech,
                    pubTmpl,
                    prvTmpl,
                    (err, keys) => {
                        if (err)
                            callback(err, null);
                        else {
                            if (keys)
                                callback(null, {
                                    publicKey: new objects.PublicKey(keys.publicKey, this, this.lib),
                                    privateKey: new objects.PrivateKey(keys.privateKey, this, this.lib)
                                });
                        }
                    });
            }
            else {
                // sync
                let keys = this.lib.C_GenerateKeyPair(this.handle, pMech, pubTmpl, prvTmpl);

                return {
                    publicKey: new objects.PublicKey(keys.publicKey, this, this.lib),
                    privateKey: new objects.PrivateKey(keys.privateKey, this, this.lib)
                };
            }
        } catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    }

    createSign(alg: MechanismType, key: Key): Sign {
        return new Sign(this, alg, key, this.lib);
    }

    createVerify(alg: MechanismType, key: Key): Verify {
        return new Verify(this, alg, key, this.lib);
    }

    createCipher(alg: MechanismType, key: Key): Cipher {
        return new Cipher(this, alg, key, this.lib);
    }

    createDecipher(alg: MechanismType, key: Key, blockSize?: number): Decipher {
        return new Decipher(this, alg, key, blockSize || 0, this.lib);
    }

    createDigest(alg: MechanismType): Digest {
        return new Digest(this, alg, this.lib);
    }

    wrapKey(alg: MechanismType, wrappingKey: Key, key: Key): Buffer;
    wrapKey(alg: MechanismType, wrappingKey: Key, key: Key, callback: Callback<Error, Buffer>): void;
    wrapKey(alg: MechanismType, wrappingKey: Key, key: Key, callback?: Callback<Error, Buffer>): Buffer | void {
        try {
            let pMech = Mechanism.create(alg);
            let wrappedKey = new Buffer(8096);
            if (callback) {
                // async
                this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, wrappedKey, callback);
            }
            else {
                // sync
                wrappedKey = this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, wrappedKey);

                return wrappedKey;
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    }

    unwrapKey(alg: MechanismType, unwrappingKey: Key, wrappedKey: Buffer, template: ITemplate): Key;
    unwrapKey(alg: MechanismType, unwrappingKey: Key, wrappedKey: Buffer, template: ITemplate, callback: Callback<Error, Key>): void;
    unwrapKey(alg: MechanismType, unwrappingKey: Key, wrappedKey: Buffer, template: ITemplate, callback?: Callback<Error, Key>): Key | void {
        try {
            let pMech = Mechanism.create(alg);
            let pTemplate = Template.toPkcs11(template);

            if (callback) {
                // async
                this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, pTemplate, (err, hKey) => {
                    if (err)
                        callback(err, null);
                    else
                        callback(null, new Key(hKey, this, this.lib));
                });
            }
            else {
                // sync
                let hKey = this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, pTemplate);
                return new Key(hKey, this, this.lib);
            }

        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    }

    /**
     * derives a key from a base key, creating a new key object
     * @param {MechanismType} alg key deriv. mech
     * @param {Key} baseKey base key
     * @param {ITemplate} template new key template
     */
    deriveKey(alg: MechanismType, baseKey: Key, template: ITemplate): SecretKey;
    deriveKey(alg: MechanismType, baseKey: Key, template: ITemplate, callback: Callback<Error, Key>): void;
    deriveKey(alg: MechanismType, baseKey: Key, template: ITemplate, callback?: Callback<Error, Key>): SecretKey | void {
        try {
            let pMech = Mechanism.create(alg);
            let pTemplate = Template.toPkcs11(template);

            if (callback) {
                this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate, (err, hKey) => {
                    if (err)
                        callback(err, null);
                    else
                        callback(null, new SecretKey(hKey, this, this.lib));
                });
            }
            else {
                let hKey = this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate);

                return new SecretKey(hKey, this, this.lib);
            }
        }
        catch (e) {
            if (callback) {
                callback(e, null);
            }
            else
                throw e;
        }
    }

    /**
     * generates random data
     * @param {number} size \# of bytes to generate 
     */
    generateRandom(size: number): Buffer {
        let buf = new Buffer(size);
        this.lib.C_GenerateRandom(this.handle, buf);
        return buf;
    }

}
