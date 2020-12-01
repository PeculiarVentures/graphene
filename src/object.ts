import * as pkcs11 from "pkcs11js";
import { attribute } from "./core/attribute";
import { HandleObject } from "./core/object";
import { ITemplate, Template } from "./template";
import type { Session } from "./session";

/**
 * Enumeration specifies object classes
 */
export enum ObjectClass {
  /**
   * Data object
   */
  DATA = pkcs11.CKO_DATA,
  /**
   * Certificate object
   */
  CERTIFICATE = pkcs11.CKO_CERTIFICATE,
  /**
   * Public key object
   */
  PUBLIC_KEY = pkcs11.CKO_PUBLIC_KEY,
  /**
   * Private key object
   */
  PRIVATE_KEY = pkcs11.CKO_PRIVATE_KEY,
  /**
   * Secret key object
   */
  SECRET_KEY = pkcs11.CKO_SECRET_KEY,
  /**
   * Hardware feature object
   */
  HW_FEATURE = pkcs11.CKO_HW_FEATURE,
  /**
   * This object class was created to support the storage of certain algorithm's extended parameters
   */
  DOMAIN_PARAMETERS = pkcs11.CKO_DOMAIN_PARAMETERS,
  /**
   * Mechanism object
   */
  MECHANISM = pkcs11.CKO_MECHANISM,
  OTP_KEY = pkcs11.CKO_OTP_KEY,
}

export type SessionObjectFactoryItemCallback = (obj: any, target: any) => any;

export interface SessionObjectFactoryItem {
  type: any;
  cb?: SessionObjectFactoryItemCallback;
}

/**
 * Static class that used for session objects creation
 */
export class SessionObjectFactory {
  private static items = new Map<ObjectClass, SessionObjectFactoryItem>();

  /**
   * Registers object constructor
   * @param cko Object class
   * @param type Object type
   * @param cb Callback for object creation
   */
  public static register<T>(cko: ObjectClass, type: any, cb?: SessionObjectFactoryItemCallback) {
    this.items.set(cko, {
      type,
      cb
    })
  }

  /**
   * Creates a new object from {@link SessionObject} by specified {@link ObjectClass}
   * @param cko Object class
   * @param object Session object
   * @return Created object
   */
  public static create(cko: ObjectClass, object: SessionObject): any {
    const item = this.items.get(cko);
    if (!item) {
      throw new Error("Cannot create SessionObject. Unsupported CKO type.");
    }
    const res = new item.type(object);
    if (item.cb) {
      return item.cb(res, object);
    }
    return res;
  }
}

/**
 * Represents a PKCS#11 session object
 */
export class SessionObject extends HandleObject {

  /**
   * PKCS#11 session
   */
  public session: Session;

  /**
   * Gets the size of an object in bytes
   */
  get size(): number {
    return this.lib.C_GetObjectSize(this.session.handle, this.handle);
  }

  /**
   * Creates an instance of {@link SessionObject}
   */
  constructor(object: SessionObject);
  /**
   * Creates an instance of {@link SessionObject}
   *
   * @param {number} handle ID of session object
   * @param {Session} session PKCS#11 session
   * @param {pkcs11.PKCS11} lib PKCS#11 module
   */
  constructor(handle: core.Handle, session: Session, lib: pkcs11.PKCS11);
  constructor(handle: any, session?: Session, lib?: pkcs11.PKCS11) {
    if (handle instanceof SessionObject) {
      // constructor(object: SessionObjects)
      const obj: SessionObject = handle;
      super(obj.handle, obj.lib);
      this.session = obj.session;
    } else {
      // constructor(handle: number, session: Session, lib: pkcs11.Pkcs11)
      super(handle, lib!);
      this.session = session!;
    }
  }

  /**
   * Copies an object, creating a new object for the copy
   *
   * @param template Template for the new object
   * @returns The new instance of {@link SessionObject}
   */
  public copy(template: ITemplate): SessionObject {
    const tmpl = Template.toPkcs11(template);

    const hObject = this.lib.C_CopyObject(this.session.handle, this.handle, tmpl);

    return new SessionObject(hObject, this.session, this.lib);
  }

  /**
   * Destroys an object
   */
  public destroy(): void {
    this.lib.C_DestroyObject(this.session.handle, this.handle);
  }

  /**
   * Returns attribute value
   * @param type Attribute type
   * @returns Attribute value in Buffer format
   */
  public getAttribute(type: number): Buffer;
  /**
   * Returns attribute value
   * @param name Attribute name. See {@link ITemplate}
   * @returns Attribute value. Depends on the attribute name
   */
  public getAttribute(name: string): any;
  /**
   * Returns a list of attributes
   * @param attrs The list of attributes for receiving
   * @returns The list of attributes
   */
  public getAttribute(attrs: ITemplate): ITemplate;
  public getAttribute(param: any): any {
    if (core.isNumber(param)) {
      // number
      return this.lib.C_GetAttributeValue(this.session.handle, this.handle, [
        { type: param },
      ])[0].value;
    } else if (core.isString(param)) {
      // string
      const res = this.lib.C_GetAttributeValue(
        this.session.handle,
        this.handle,
        Template.toPkcs11({ [param]: null }));

      return Template.fromPkcs11(res)[param];
    }
    // template

    // get size of values of attributes
    const res = this.lib.C_GetAttributeValue(this.session.handle, this.handle, Template.toPkcs11(param));

    return Template.fromPkcs11(res);
  }

  /**
   * Sets attribute value
   * @param type Attribute type
   * @param value Attribute value
   */
  public setAttribute(type: number, value: number | boolean | string | Buffer): void;
  /**
   * Sets attribute value
   * @param name Attribute name. See {@link ITemplate}
   * @param value Attribute value. Depends on attribute name
   */
  public setAttribute(name: string, value: any): void;
  /**
   * Sets attributes from the list of attributes
   * @param attrs The list of attributes
   */
  public setAttribute(attrs: ITemplate): void;
  public setAttribute(param: any, value?: any): void {
    let tmpl: pkcs11.Template = [];
    if (core.isNumber(param)) {
      // type: number
      tmpl.push({ type: param, value });
    } else if (core.isString(param)) {
      // name: string, value: any
      tmpl = Template.toPkcs11({ [param]: value });
    } else {
      // attrs: ITemplate
      tmpl = Template.toPkcs11(param);
    }

    this.lib.C_SetAttributeValue(this.session.handle, this.handle, tmpl);
  }

  /**
   * Alias for {@link getAttribute}
   */
  public get(type: number): Buffer;
  public get(name: string): any;
  public get(param: any): any {
    return this.getAttribute(param as any);
  }

  /**
   * Alias for {@link setAttribute}
   */
  public set(type: number, value: number | boolean | string | Buffer): void;
  public set(name: string, value: any): void;
  public set(param: any, value: any) {
    this.setAttribute(param, value);
  }

  /**
   * Object class (type)
   */
  @attribute("class")
  class: ObjectClass;

  public toType<T extends SessionObject>(): T {
    return SessionObjectFactory.create(this.class, this);
  }

  protected getInfo(): void {
    // nothing
  }
}

import * as core from "./core";

/**
 * Represents the collection of {@link SessionObject}
 */
export class SessionObjectCollection extends core.Collection<SessionObject> {
  public session: Session;

  /**
   * Creates a new instance of {@link SessionObjectCollection}
   * @param items The kist of {@link SessionObject} handles
   * @param session PKCS#11 session
   * @param lib PKCS#11 module
   */
  constructor(items: core.Handle[], session: Session, lib: pkcs11.PKCS11) {
    super(items, lib, SessionObject);

    this.session = session;
  }

  /**
   * Returns item from collection by index
   * @param {number} index Index of element in the collection `[0..n]`
   */
  public items(index: number): SessionObject {
    return new SessionObject(this.innerItems[index], this.session, this.lib);
  }
}
