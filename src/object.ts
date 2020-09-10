import * as pkcs11 from "pkcs11js";
import { ITemplate, Template } from "./template";
import { HandleObject } from "./core/object";
import type { Session } from "./session";

export enum ObjectClass {
  DATA = pkcs11.CKO_DATA,
  CERTIFICATE = pkcs11.CKO_CERTIFICATE,
  PUBLIC_KEY = pkcs11.CKO_PUBLIC_KEY,
  PRIVATE_KEY = pkcs11.CKO_PRIVATE_KEY,
  SECRET_KEY = pkcs11.CKO_SECRET_KEY,
  HW_FEATURE = pkcs11.CKO_HW_FEATURE,
  DOMAIN_PARAMETERS = pkcs11.CKO_DOMAIN_PARAMETERS,
  MECHANISM = pkcs11.CKO_MECHANISM,
  OTP_KEY = pkcs11.CKO_OTP_KEY,
}

export type SessionObjectFactoryItemCallback = (obj: any, target: any) => any;

export interface SessionObjectFactoryItem {
  type: any;
  cb?: SessionObjectFactoryItemCallback;
}

export class SessionObjectFactory {
  private static items = new Map<ObjectClass, SessionObjectFactoryItem>();

  public static register<T>(cko: ObjectClass, type: any, cb?: SessionObjectFactoryItemCallback) {
    this.items.set(cko, {
      type,
      cb
    })
  }

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

export class SessionObject extends HandleObject {

  /**
   * Session
   */
  public session: Session;

  /**
   * gets the size of an object in bytes
   *
   * @readonly
   * @type {number}
   */
  get size(): number {
    return this.lib.C_GetObjectSize(this.session.handle, this.handle);
  }

  /**
   * Creates an instance of SessionObject.
   *
   * @param {SessionObject} object
   */
  constructor(object: SessionObject);
  /**
   * Creates an instance of SessionObject.
   *
   * @param {number} handle
   * @param {Session} session
   * @param {pkcs11.PKCS11} lib
   */
  constructor(handle: core.Handle, session: Session, lib: pkcs11.PKCS11);
  constructor(handle: SessionObject);
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
   * copies an object, creating a new object for the copy
   *
   * @param {ITemplate} template template for the new object
   * @returns {SessionObject}
   */
  public copy(template: ITemplate): SessionObject {
    const tmpl = Template.toPkcs11(template);

    const hObject = this.lib.C_CopyObject(this.session.handle, this.handle, tmpl);

    return new SessionObject(hObject, this.session, this.lib);
  }

  /**
   * destroys an object
   */
  public destroy(): void {
    this.lib.C_DestroyObject(this.session.handle, this.handle);
  }

  public getAttribute(type: number): Buffer;
  public getAttribute(name: string): any;
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

  public setAttribute(type: number, value: number | boolean | string | Buffer): void;
  public setAttribute(name: string, value: any): void;
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

  public get(type: number): Buffer;
  public get(name: string): any;
  public get(param: any): any {
    return this.getAttribute(param as any);
  }

  public set(type: number, value: number | boolean | string | Buffer): void;
  public set(name: string, value: any): void;
  public set(param: any, value: any) {
    this.setAttribute(param, value);
  }

  get class(): ObjectClass {
    return this.get("class");
  }

  set class(v: ObjectClass) {
    this.set("class", v);
  }

  public toType<T extends SessionObject>(): T {
    return SessionObjectFactory.create(this.class, this);
  }
}

import * as core from "./core";

export class SessionObjectCollection extends core.Collection<SessionObject> {
  public session: Session;

  constructor(items: core.Handle[], session: Session, lib: pkcs11.PKCS11, classType: any = SessionObject) {
    super(items, lib, classType);

    this.session = session;
  }

  public items(index: number): SessionObject {
    return new SessionObject(this.innerItems[index], this.session, this.lib);
  }
}
