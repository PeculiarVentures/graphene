"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var pkcs11 = require("pkcs11js");
var core = require("./core");
var template_1 = require("./template");
(function (ObjectClass) {
    ObjectClass[ObjectClass["DATA"] = pkcs11.CKO_DATA] = "DATA";
    ObjectClass[ObjectClass["CERTIFICATE"] = pkcs11.CKO_CERTIFICATE] = "CERTIFICATE";
    ObjectClass[ObjectClass["PUBLIC_KEY"] = pkcs11.CKO_PUBLIC_KEY] = "PUBLIC_KEY";
    ObjectClass[ObjectClass["PRIVATE_KEY"] = pkcs11.CKO_PRIVATE_KEY] = "PRIVATE_KEY";
    ObjectClass[ObjectClass["SECRET_KEY"] = pkcs11.CKO_SECRET_KEY] = "SECRET_KEY";
    ObjectClass[ObjectClass["HW_FEATURE"] = pkcs11.CKO_HW_FEATURE] = "HW_FEATURE";
    ObjectClass[ObjectClass["DOMAIN_PARAMETERS"] = pkcs11.CKO_DOMAIN_PARAMETERS] = "DOMAIN_PARAMETERS";
    ObjectClass[ObjectClass["MECHANISM"] = pkcs11.CKO_MECHANISM] = "MECHANISM";
    ObjectClass[ObjectClass["OTP_KEY"] = pkcs11.CKO_OTP_KEY] = "OTP_KEY";
})(exports.ObjectClass || (exports.ObjectClass = {}));
var ObjectClass = exports.ObjectClass;
var SessionObject = (function (_super) {
    __extends(SessionObject, _super);
    function SessionObject(handle, session, lib) {
        if (handle instanceof SessionObject) {
            var obj = handle;
            _super.call(this, obj.handle, obj.lib);
            this.session = obj.session;
        }
        else {
            _super.call(this, handle, lib);
            this.session = session;
        }
    }
    Object.defineProperty(SessionObject.prototype, "size", {
        get: function () {
            return this.lib.C_GetObjectSize(this.session.handle, this.handle);
        },
        enumerable: true,
        configurable: true
    });
    SessionObject.prototype.copy = function (template) {
        var tmpl = template_1.Template.toPkcs11(template);
        var hObject = this.lib.C_CopyObject(this.session.handle, this.handle, tmpl);
        return new SessionObject(hObject, this.session, this.lib);
    };
    SessionObject.prototype.destroy = function () {
        this.lib.C_DestroyObject(this.session.handle, this.handle);
    };
    SessionObject.prototype.getAttribute = function (attrs) {
        var _attrs;
        if (typeof attrs === "string") {
            _attrs = {};
            _attrs[attrs] = null;
        }
        else
            _attrs = attrs;
        var tmpl = template_1.Template.toPkcs11(_attrs);
        tmpl = this.lib.C_GetAttributeValue(this.session.handle, this.handle, tmpl);
        return template_1.Template.fromPkcs11(tmpl);
    };
    SessionObject.prototype.setAttribute = function (attrs, value) {
        if (core.isString(attrs)) {
            var tmp = {};
            tmp[attrs] = value;
            attrs = tmp;
        }
        var tmpl = template_1.Template.toPkcs11(attrs);
        this.lib.C_SetAttributeValue(this.session.handle, this.handle, tmpl);
    };
    SessionObject.prototype.get = function (name) {
        var tmpl = {};
        tmpl[name] = null;
        return this.getAttribute(tmpl)[name];
    };
    SessionObject.prototype.set = function (name, value) {
        var tmpl = {};
        tmpl[name] = value;
        this.setAttribute(tmpl[name]);
    };
    Object.defineProperty(SessionObject.prototype, "class", {
        get: function () {
            return this.get("class");
        },
        set: function (v) {
            this.set("class", v);
        },
        enumerable: true,
        configurable: true
    });
    SessionObject.prototype.toType = function () {
        var c = this.class;
        switch (c) {
            case ObjectClass.DATA:
                return new objects.Data(this);
            case ObjectClass.DOMAIN_PARAMETERS:
                return new objects.DomainParameters(this);
            case ObjectClass.CERTIFICATE:
                var cert = new objects.Certificate(this);
                var t = cert.type;
                switch (t) {
                    case objects.CertificateType.X_509:
                        return new objects.X509Certificate(this);
                    case objects.CertificateType.WTLS:
                        return new objects.WtlsCertificate(this);
                    case objects.CertificateType.X_509_ATTR_CERT:
                        return new objects.AttributeCertificate(this);
                    default:
                        throw new Error("Unknown certificate (CKC_?) type '" + t + "'");
                }
            case ObjectClass.PRIVATE_KEY:
                return new objects.PrivateKey(this);
            case ObjectClass.PUBLIC_KEY:
                return new objects.PublicKey(this);
            case ObjectClass.SECRET_KEY:
                return new objects.SecretKey(this);
            case ObjectClass.HW_FEATURE:
            case ObjectClass.OTP_KEY:
                throw new Error("Type converter for " + ObjectClass[c] + " is not implemented");
            default:
                throw new Error("Unknown session object (CKO_?) type '" + c + "'");
        }
    };
    return SessionObject;
}(core.HandleObject));
exports.SessionObject = SessionObject;
var SessionObjectCollection = (function (_super) {
    __extends(SessionObjectCollection, _super);
    function SessionObjectCollection(items, session, lib, classType) {
        if (classType === void 0) { classType = SessionObject; }
        _super.call(this, items, lib, classType);
        this.session = session;
    }
    SessionObjectCollection.prototype.items = function (index) {
        return new SessionObject(this.items_[index], this.session, this.lib);
    };
    return SessionObjectCollection;
}(core.Collection));
exports.SessionObjectCollection = SessionObjectCollection;
var objects = require("./objects/common");
__export(require("./objects/common"));
__export(require("./keys/common"));
