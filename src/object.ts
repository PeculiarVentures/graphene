import * as pkcs11 from "./pkcs11";
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
     */
    get size(): number {
        let $size = core.Ref.alloc(pkcs11.CK_ULONG);

        let rv = this.lib.C_GetObjectSize(this.session.handle, this.handle, $size);
        if (rv) throw new core.Pkcs11Error(rv, "C_CopyObject");

        return $size.deref();
    }

    constructor(object: SessionObject);
    constructor(handle: number, session: Session, lib: pkcs11.Pkcs11);
    constructor(handle, session?: Session, lib?: pkcs11.Pkcs11) {
        if (handle instanceof SessionObject) {
            // constructor(object: SessionObjects)
            let obj: SessionObject = handle;
            super(obj.handle, obj.lib);
            this.session = obj.session;
        }
        else {
            // constructor(handle: number, session: Session, lib: pkcs11.Pkcs11)
            super(handle, lib);
            this.session = session;
        }

    }

    /**
     * copies an object, creating a new object for the copy
     * @param {ITemplate} template template for the new object
     */
    copy(template: ITemplate): SessionObject {
        let tmpl = new Template(template);

        let $newObject = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);

        let rv = this.lib.C_CopyObject(this.session.handle, this.handle, tmpl.ref(), tmpl.length, $newObject);
        if (rv) throw new core.Pkcs11Error(rv, "C_CopyObject");

        return new SessionObject($newObject.deref(), this.session, this.lib);
    }

    /**
     * destroys an object
     */
    destroy(): void {
        let rv = this.lib.C_DestroyObject(this.session.handle, this.handle);
        if (rv) throw new core.Pkcs11Error(rv, "C_DestroyObject");
    }

    getAttribute(attr: string): ITemplate;
    getAttribute(attrs: ITemplate): ITemplate;
    getAttribute(attrs: any): ITemplate {
        let tmpl = new Template(attrs);

        // get size of values of attributes
        let $tmpl = tmpl.ref();
        let rv = this.lib.C_GetAttributeValue(this.session.handle, this.handle, $tmpl, tmpl.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetAttributeValue");

        $tmpl = tmpl.set($tmpl).ref();
        // get values to resized attributes
        rv = this.lib.C_GetAttributeValue(this.session.handle, this.handle, $tmpl, tmpl.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetAttributeValue");

        let o = tmpl.set($tmpl).serialize();
        return o;
    }

    setAttribute(attrs: string, value: any);
    setAttribute(attrs: ITemplate);
    setAttribute(attrs, value?) {
        if (core.isString(attrs)){
            let tmp = {};
            tmp[attrs] = value;
            attrs = tmp;
        }
        let tmpl = new Template(attrs);

        // get size of values of attributes
        let $tmpl = tmpl.ref();
        let rv = this.lib.C_SetAttributeValue(this.session.handle, this.handle, $tmpl, tmpl.length);
        if (rv) throw new core.Pkcs11Error(rv, "C_SetAttributeValue");
        return this;
    }

    protected get(name: string): any {
        let tmpl: any = {};
        tmpl[name] = null;
        return this.getAttribute(tmpl)[name];
    }

    protected set(name: string, value: any) {
        let tmpl: any = {};
        tmpl[name] = value;
        this.setAttribute(tmpl)[name];
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

    constructor(items: Array<number>, session: Session, lib: pkcs11.Pkcs11, classType: any = SessionObject) {
        super(items, lib, classType);

        this.session = session;
    }
}

// import must be here, because other class from SessioObject must be initialized
import * as objects from "./objects/common";
export * from "./objects/common";