import * as pkcs11 from "pkcs11js";
import * as core from "./core";
import {Session} from "./session";
import {ITemplate, Template} from "./template";

export enum ObjectClass {
    DATA = pkcs11.CKO_DATA,
    CERTIFICATE = pkcs11.CKO_CERTIFICATE,
    PUBLIC_KEY = pkcs11.CKO_PUBLIC_KEY,
    PRIVATE_KEY = pkcs11.CKO_PRIVATE_KEY,
    SECRET_KEY = pkcs11.CKO_SECRET_KEY,
    HW_FEATURE = pkcs11.CKO_HW_FEATURE,
    DOMAIN_PARAMETERS = pkcs11.CKO_DOMAIN_PARAMETERS,
    MECHANISM = pkcs11.CKO_MECHANISM,
    OTP_KEY = pkcs11.CKO_OTP_KEY
}

export class SessionObject extends core.HandleObject {

    /**
     * Session
     */
    session: Session;

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
            let obj: SessionObject = handle;
            super(obj.handle, obj.lib);
            this.session = obj.session;
        }
        else {
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
    copy(template: ITemplate): SessionObject {
        let tmpl = Template.toPkcs11(template);

        let hObject = this.lib.C_CopyObject(this.session.handle, this.handle, tmpl);

        return new SessionObject(hObject, this.session, this.lib);
    }

    /**
     * destroys an object
     */
    destroy(): void {
        this.lib.C_DestroyObject(this.session.handle, this.handle);
    }

    getAttribute(attr: string): ITemplate;
    getAttribute(attrs: ITemplate): ITemplate;
    getAttribute(attrs: any): ITemplate {
        let _attrs: ITemplate;
        if (typeof attrs === "string") {
            _attrs = {};
            (_attrs as any)[attrs] = null;
        }
        else
            _attrs = attrs;
        let tmpl = Template.toPkcs11(_attrs);

        // get size of values of attributes
        tmpl = this.lib.C_GetAttributeValue(this.session.handle, this.handle, tmpl);

        return Template.fromPkcs11(tmpl);
    }

    setAttribute(attrs: string, value: any): void;
    setAttribute(attrs: ITemplate): void;
    setAttribute(attrs: any, value?: any): void {
        if (core.isString(attrs)) {
            let tmp: ITemplate = {};
            (tmp as any)[attrs as string] = value;
            attrs = tmp;
        }
        let tmpl = Template.toPkcs11(attrs);

        this.lib.C_SetAttributeValue(this.session.handle, this.handle, tmpl);
    }

    public get(name: string): any {
        let tmpl: any = {};
        tmpl[name] = null;
        return (this.getAttribute(tmpl) as any)[name];
    }

    public set(name: string, value: any) {
        let tmpl: any = {};
        tmpl[name] = value;
        this.setAttribute(tmpl[name]);
    }

    get class(): ObjectClass {
        return this.get("class");
    }

    set class(v: ObjectClass) {
        this.set("class", v);
    }

    toType<T extends SessionObject>(): T {
        // auto detect type of object 
        let c = this.class;
        switch (c) {
            case ObjectClass.DATA:
                return <any>new objects.Data(this);
            case ObjectClass.DOMAIN_PARAMETERS:
                return <any>new objects.DomainParameters(this);
            case ObjectClass.CERTIFICATE:
                let cert = new objects.Certificate(this);
                let t = cert.type;
                switch (t) {
                    case objects.CertificateType.X_509:
                        return <any>new objects.X509Certificate(this);
                    case objects.CertificateType.WTLS:
                        return <any>new objects.WtlsCertificate(this);
                    case objects.CertificateType.X_509_ATTR_CERT:
                        return <any>new objects.AttributeCertificate(this);
                    default:
                        throw new Error(`Unknown certificate (CKC_?) type '${t}'`);
                }
            case ObjectClass.PRIVATE_KEY:
                return <any>new objects.PrivateKey(this);
            case ObjectClass.PUBLIC_KEY:
                return <any>new objects.PublicKey(this);
            case ObjectClass.SECRET_KEY:
                return <any>new objects.SecretKey(this);
            case ObjectClass.HW_FEATURE:
            case ObjectClass.OTP_KEY:
                throw new Error(`Type converter for ${ObjectClass[c]} is not implemented`);
            default:
                throw new Error(`Unknown session object (CKO_?) type '${c}'`);
        }
    }
}

export class SessionObjectCollection extends core.Collection<SessionObject> {
    session: Session;

    items(index: number): SessionObject {
        return new SessionObject(this.items_[index], this.session, this.lib);
    }

    constructor(items: Array<core.Handle>, session: Session, lib: pkcs11.PKCS11, classType: any = SessionObject) {
        super(items, lib, classType);

        this.session = session;
    }
}

// import must be here, because other class from SessioObject must be initialized
import * as objects from "./objects/common";
export * from "./objects/common";
export * from "./keys/common";