/// <reference path="./typings/type.d.ts" />

import * as pkcs11 from "pkcs11js";

import * as core from "./core";
import { Mechanism, MechanismType } from "./mech";
import { Key, ObjectClass, SecretKey, SessionObject, SessionObjectCollection } from "./object";
import * as objects from "./objects";
import { Slot } from "./";
import { ITemplate, Template } from "./template";

import { Cipher, Decipher, Digest, Sign, Verify } from "./crypto";

export enum SessionFlag {
  /**
   * `True` if the session is read/write; `false` if the session is read-only
   */
  RW_SESSION = 2,
  /**
   * This flag is provided for backward compatibility, and should always be set to `true`
   */
  SERIAL_SESSION = 4,
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
  CONTEXT_SPECIFIC,
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

  /**
   * Slot
   *
   * @type {Slot}
   */
  public slot: Slot;
  /**
   * the state of the session
   *
   * @type {number}
   */
  public state: number;

  /**
   * bit flags that define the type of session
   *
   * @type {number}
   */
  public flags: number;

  /**
   * an error code defined by the cryptographic device. Used for errors not covered by Cryptoki
   *
   * @type {number}
   */
  public deviceError: number;

  constructor(handle: core.Handle, slot: Slot, lib: pkcs11.PKCS11) {
    super(handle, lib);

    this.slot = slot;
    this.getInfo();
  }

  /**
   * closes a session between an application and a token
   */
  public close() {
    this.lib.C_CloseSession(this.handle);
  }

  /**
   * initializes the normal user's PIN
   * @param {string} pin the normal user's PIN
   */
  public initPin(pin: string) {
    this.lib.C_InitPIN(this.handle, pin);
  }

  /**
   * modifies the PIN of the user who is logged in
   * @param {string} oldPin
   * @param {string} newPin
   */
  public setPin(oldPin: string, newPin: string) {
    this.lib.C_SetPIN(this.handle, oldPin, newPin);
  }

  /**
   * obtains a copy of the cryptographic operations state of a session, encoded as a string of bytes
   */
  public getOperationState(): Buffer {
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
  public setOperationState(state: Buffer, encryptionKey: number = 0, authenticationKey: number = 0) {
    throw new Error("Not implemented");
  }

  /**
   * logs a user into a token
   * @param {string} pin the user's PIN.
   * - This standard allows PIN values to contain any valid `UTF8` character,
   * but the token may impose subset restrictions
   * @param {} userType the user type. Default is `USER`
   */
  public login(pin: string, userType: UserType = UserType.USER) {
    this.lib.C_Login(this.handle, userType, pin);
  }

  /**
   * logs a user out from a token
   */
  public logout() {
    this.lib.C_Logout(this.handle);
  }

  /**
   * creates a new object
   * - Only session objects can be created during a read-only session.
   * - Only public objects can be created unless the normal user is logged in.
   * @param {ITemplate} template the object's template
   * @returns {SessionObject}
   */
  public create(template: ITemplate): SessionObject {
    const tmpl = Template.toPkcs11(template);

    const hObject = this.lib.C_CreateObject(this.handle, tmpl);

    return new SessionObject(hObject, this, this.lib);
  }

  /**
   * Copies an object, creating a new object for the copy
   * @param {SessionObject} object the copied object
   * @param {ITemplate} template template for new object
   * @returns {SessionObject}
   */
  public copy(object: SessionObject, template: ITemplate): SessionObject {
    const tmpl = Template.toPkcs11(template);

    const hObject = this.lib.C_CopyObject(this.handle, object.handle, tmpl);

    return new SessionObject(hObject, this, this.lib);
  }

  /**
   * removes all session objects matched to template
   * - if template is null, removes all session objects
   * - returns a number of destroyed session objects
   * @param {ITemplate} template template
   */
  public destroy(template: ITemplate): number;
  /**
   * @param {SessionObject} object
   */
  public destroy(object: SessionObject): number;
  public destroy(): number;
  public destroy(param?: SessionObject | ITemplate): number {

    if (param instanceof SessionObject) {
      // destroy(object: SessionObject): number;
      this.lib.C_DestroyObject(this.handle, param.handle);
      return 1;
    } else {
      const objs = this.find(param || null);
      const removed = objs.length;
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
  public clear(): number {
    return this.destroy();
  }

  /**
   * returns a collection of session objects mached to template
   * @param template template
   * @param callback optional callback function wich is called for each founded object
   * - if callback function returns false, it breaks find function.
   */
  public find(): SessionObjectCollection;
  public find(callback: SessionFindCallback): SessionObjectCollection;
  public find(template?: ITemplate | null, callback?: SessionFindCallback): SessionObjectCollection;
  public find(
    template: ITemplate | SessionFindCallback | null = null,
    callback?: SessionFindCallback,
  ): SessionObjectCollection {
    if (core.isFunction(template)) {
      callback = template as SessionFindCallback;
      template = null;
    }
    const tmpl = Template.toPkcs11(template);

    this.lib.C_FindObjectsInit(this.handle, tmpl);

    const handles: core.Handle[] = [];
    try {
      while (true) {
        const hObject = this.lib.C_FindObjects(this.handle);
        if (!hObject) {
          break;
        }
        if (callback && callback(new SessionObject(hObject, this, this.lib), handles.length) === false) {
          break;
        }
        handles.push(hObject);
      }
    } catch (error) {
      this.lib.C_FindObjectsFinal(this.handle);
      throw (error);
    }
    this.lib.C_FindObjectsFinal(this.handle);
    return new SessionObjectCollection(handles, this, this.lib);
  }

  /**
   * Returns object from session by handle
   * @param  {number} handle handle of object
   * @returns T
   */
  public getObject<T extends SessionObject>(handle: core.Handle): T | null {
    let res: SessionObject | undefined;
    this.find((obj) => {
      const compare = obj.handle.compare(handle);
      if (compare === 0) {
        res = obj;
        return false;
      }
    });
    if (res) {
      return res.toType<T>();
    } else {
      return null;
    }
  }

  /**
   * generates a secret key or set of domain parameters, creating a new object.
   * @param mechanism generation mechanism
   * @param template template for the new key or set of domain parameters
   */
  public generateKey(mechanism: MechanismType, template?: ITemplate): objects.SecretKey;
  public generateKey(mechanism: MechanismType, template: ITemplate, callback: Callback<Error, objects.SecretKey>): void;
  public generateKey(
    mechanism: MechanismType,
    template: ITemplate | null = null,
    callback?: Callback<Error, objects.SecretKey>,
  ): objects.SecretKey | void {
    try {
      const pMech = Mechanism.create(mechanism);
      // init default template params
      if (template) {
        template.class = ObjectClass.SECRET_KEY;
      }
      const pTemplate = Template.toPkcs11(template);

      if (callback) {
        this.lib.C_GenerateKey(this.handle, pMech, pTemplate, (err, hKey) => {
          if (err) {
            callback(err, null);
          } else {
            // Wrap handle of kry to SecretKey
            const obj = new SessionObject(hKey, this, this.lib);
            callback(null, obj.toType<objects.SecretKey>());
          }
        });
      } else {
        const hKey = this.lib.C_GenerateKey(this.handle, pMech, pTemplate);

        // Wrap handle of kry to SecretKey
        const obj = new SessionObject(hKey, this, this.lib);
        return obj.toType<objects.SecretKey>();
      }
    } catch (e) {
      if (callback) {
        callback(e, null);
      } else {
        throw e;
      }
    }
  }

  public generateKeyPair(mechanism: MechanismType, publicTemplate: ITemplate, privateTemplate: ITemplate): IKeyPair;
  public generateKeyPair(
    mechanism: MechanismType,
    publicTemplate: ITemplate,
    privateTemplate: ITemplate,
    callback: Callback<Error, IKeyPair>,
  ): void;
  public generateKeyPair(
    mechanism: MechanismType,
    publicTemplate: ITemplate,
    privateTemplate: ITemplate,
    callback?: Callback<Error, IKeyPair>,
  ): IKeyPair | void {
    try {
      const pMech = Mechanism.create(mechanism);
      // init default public key template
      if (publicTemplate) {
        publicTemplate.class = ObjectClass.PUBLIC_KEY;
      }
      const pubTmpl = Template.toPkcs11(publicTemplate);

      // init default private key template
      if (privateTemplate) {
        privateTemplate.class = ObjectClass.PRIVATE_KEY;
        privateTemplate.private = true;
      }
      const prvTmpl = Template.toPkcs11(privateTemplate);

      if (callback) {
        // async
        this.lib.C_GenerateKeyPair(
          this.handle, pMech,
          pubTmpl,
          prvTmpl,
          (err, keys) => {
            if (err) {
              callback(err, null);
            } else {
              if (keys) {
                callback(null, {
                  publicKey: new objects.PublicKey(keys.publicKey, this, this.lib),
                  privateKey: new objects.PrivateKey(keys.privateKey, this, this.lib),
                });
              }
            }
          });
      } else {
        // sync
        const keys = this.lib.C_GenerateKeyPair(this.handle, pMech, pubTmpl, prvTmpl);

        return {
          publicKey: new objects.PublicKey(keys.publicKey, this, this.lib),
          privateKey: new objects.PrivateKey(keys.privateKey, this, this.lib),
        };
      }
    } catch (e) {
      if (callback) {
        callback(e, null);
      } else {
        throw e;
      }
    }
  }

  public createSign(alg: MechanismType, key: Key): Sign {
    return new Sign(this, alg, key, this.lib);
  }

  public createVerify(alg: MechanismType, key: Key): Verify {
    return new Verify(this, alg, key, this.lib);
  }

  public createCipher(alg: MechanismType, key: Key): Cipher {
    return new Cipher(this, alg, key, this.lib);
  }

  public createDecipher(alg: MechanismType, key: Key, blockSize?: number): Decipher {
    return new Decipher(this, alg, key, blockSize || 0, this.lib);
  }

  public createDigest(alg: MechanismType): Digest {
    return new Digest(this, alg, this.lib);
  }

  public wrapKey(alg: MechanismType, wrappingKey: Key, key: Key): Buffer;
  public wrapKey(alg: MechanismType, wrappingKey: Key, key: Key, callback: Callback<Error, Buffer>): void;
  public wrapKey(alg: MechanismType, wrappingKey: Key, key: Key, callback?: Callback<Error, Buffer>): Buffer | void {
    try {
      const pMech = Mechanism.create(alg);
      let wrappedKey = Buffer.alloc(8096);
      if (callback) {
        // async
        this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, wrappedKey, callback);
      } else {
        // sync
        wrappedKey = this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, wrappedKey);

        return wrappedKey;
      }
    } catch (e) {
      if (callback) {
        callback(e, null);
      } else {
        throw e;
      }
    }
  }

  public unwrapKey(alg: MechanismType, unwrappingKey: Key, wrappedKey: Buffer, template: ITemplate): Key;
  public unwrapKey(
    alg: MechanismType,
    unwrappingKey: Key,
    wrappedKey: Buffer,
    template: ITemplate,
    callback: Callback<Error, Key>,
  ): void;
  public unwrapKey(
    alg: MechanismType,
    unwrappingKey: Key,
    wrappedKey: Buffer,
    template: ITemplate,
    callback?: Callback<Error, Key>,
  ): Key | void {
    try {
      const pMech = Mechanism.create(alg);
      const pTemplate = Template.toPkcs11(template);

      if (callback) {
        // async
        this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, pTemplate, (err, hKey) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, new Key(hKey, this, this.lib));
          }
        });
      } else {
        // sync
        const hKey = this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, pTemplate);
        return new Key(hKey, this, this.lib);
      }

    } catch (e) {
      if (callback) {
        callback(e, null);
      } else {
        throw e;
      }
    }
  }

  /**
   * derives a key from a base key, creating a new key object
   * @param {MechanismType} alg key deriv. mech
   * @param {Key} baseKey base key
   * @param {ITemplate} template new key template
   */
  public deriveKey(alg: MechanismType, baseKey: Key, template: ITemplate): SecretKey;
  public deriveKey(alg: MechanismType, baseKey: Key, template: ITemplate, callback: Callback<Error, Key>): void;
  public deriveKey(
    alg: MechanismType,
    baseKey: Key,
    template: ITemplate,
    callback?: Callback<Error, Key>,
  ): SecretKey | void {
    try {
      const pMech = Mechanism.create(alg);
      const pTemplate = Template.toPkcs11(template);

      if (callback) {
        this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate, (err, hKey) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, new SecretKey(hKey, this, this.lib));
          }
        });
      } else {
        const hKey = this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate);

        return new SecretKey(hKey, this, this.lib);
      }
    } catch (e) {
      if (callback) {
        callback(e, null);
      } else {
        throw e;
      }
    }
  }

  /**
   * generates random data
   * @param {number} size \# of bytes to generate
   */
  public generateRandom(size: number): Buffer {
    const buf = Buffer.alloc(size);
    this.lib.C_GenerateRandom(this.handle, buf);
    return buf;
  }

  protected getInfo() {
    const info = this.lib.C_GetSessionInfo(this.handle);

    this.state = info.state;
    this.flags = info.flags;
    this.deviceError = info.deviceError;
  }

}
