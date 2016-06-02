"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pkcs11 = require("./pkcs11");
var core = require("./core");
var object_1 = require("./object");
var template_1 = require("./template");
var mech_1 = require("./mech");
var objects = require("./objects/common");
var common_1 = require("./crypto/common");
var ObjectArray = core.RefArray(pkcs11.CK_OBJECT_HANDLE);
(function (SessionOpenFlag) {
    SessionOpenFlag[SessionOpenFlag["RW_SESSION"] = pkcs11.CKF_RW_SESSION] = "RW_SESSION";
    SessionOpenFlag[SessionOpenFlag["SERIAL_SESSION"] = pkcs11.CKF_SERIAL_SESSION] = "SERIAL_SESSION";
})(exports.SessionOpenFlag || (exports.SessionOpenFlag = {}));
var SessionOpenFlag = exports.SessionOpenFlag;
(function (SessionFlag) {
    SessionFlag[SessionFlag["RW_SESSION"] = pkcs11.CKF_RW_SESSION] = "RW_SESSION";
    SessionFlag[SessionFlag["SERIAL_SESSION"] = pkcs11.CKF_SERIAL_SESSION] = "SERIAL_SESSION";
})(exports.SessionFlag || (exports.SessionFlag = {}));
var SessionFlag = exports.SessionFlag;
(function (UserType) {
    UserType[UserType["SO"] = pkcs11.CKU_SO] = "SO";
    UserType[UserType["USER"] = pkcs11.CKU_USER] = "USER";
    UserType[UserType["CONTEXT_SPECIFIC"] = pkcs11.CKU_CONTEXT_SPECIFIC] = "CONTEXT_SPECIFIC";
})(exports.UserType || (exports.UserType = {}));
var UserType = exports.UserType;
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(handle, slot, lib) {
        _super.call(this, handle, lib);
        this.slot = slot;
    }
    Session.prototype.getInfo = function () {
        var $info = core.Ref.alloc(pkcs11.CK_SESSION_INFO);
        var rv = this.lib.C_GetSessionInfo(this.handle, $info);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetSessionInfo");
        var info = $info.deref();
        this.state = info.state;
        this.flags = info.flags;
        this.deviceError = info.ulDeviceError;
    };
    Session.prototype.close = function () {
        var rv = this.lib.C_CloseSession(this.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_CloseSession");
    };
    Session.prototype.initPin = function (pin) {
        var bufPin = new Buffer(pin, "utf8");
        var rv = this.lib.C_InitPIN(this.handle, bufPin, bufPin.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_InitPIN");
    };
    Session.prototype.setPin = function (oldPin, newPin) {
        var bufOldPin = new Buffer(oldPin, "utf8");
        var bufNewPin = new Buffer(newPin, "utf8");
        var rv = this.lib.C_SetPIN(this.handle, bufOldPin, bufOldPin.length, bufNewPin, bufNewPin.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_SetPIN");
    };
    Session.prototype.getOperationState = function () {
        var $len = core.Ref.alloc(pkcs11.CK_ULONG);
        var rv = this.lib.C_GetOperationState(this.handle, null, $len);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetOperationState");
        var buf = new Buffer($len.deref());
        rv = this.lib.C_GetOperationState(this.handle, buf, $len);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetOperationState");
        return buf;
    };
    Session.prototype.setOperationState = function (state, encryptionKey, authenticationKey) {
        if (encryptionKey === void 0) { encryptionKey = 0; }
        if (authenticationKey === void 0) { authenticationKey = 0; }
        var rv = this.lib.C_SetOperationState(this.handle, state, state.length, encryptionKey, authenticationKey);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetOperationState");
    };
    Session.prototype.login = function (pin, userType) {
        if (userType === void 0) { userType = UserType.USER; }
        var bufPin = new Buffer(pin, "utf8");
        var rv = this.lib.C_Login(this.handle, userType, bufPin, bufPin.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_Login");
    };
    Session.prototype.logout = function () {
        var rv = this.lib.C_Logout(this.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_Logout");
    };
    Session.prototype.create = function (template) {
        var tmpl = new template_1.Template(template);
        var $obj = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);
        var rv = this.lib.C_CreateObject(this.handle, tmpl.ref(), tmpl.length, $obj);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_CreateObject");
        return new object_1.SessionObject($obj.deref(), this, this.lib);
    };
    Session.prototype.copy = function (object, template) {
        var tmpl = new template_1.Template(template);
        var $obj = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);
        var rv = this.lib.C_CopyObject(this.handle, object.handle, tmpl.ref(), tmpl.length, $obj);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_CopyObject");
        return new object_1.SessionObject($obj.deref(), this, this.lib);
    };
    Session.prototype.destroy = function (param) {
        if (param instanceof object_1.SessionObject) {
            var rv = this.lib.C_DestroyObject(this.handle, param.handle);
            if (rv)
                throw new core.Pkcs11Error(rv, "C_DestroyObject");
            return 1;
        }
        else {
            var objs = this.find(param);
            var removed = objs.length;
            for (var i = 0; i < objs.length; i++) {
                objs.items(i).destroy();
            }
            return removed;
        }
    };
    Session.prototype.clear = function () {
        return this.destroy();
    };
    Session.prototype.find = function (template, callback) {
        if (core.isFunction(template)) {
            callback = template;
            template = null;
        }
        var tmpl = new template_1.Template(template);
        var rv = this.lib.C_FindObjectsInit(this.handle, tmpl.ref(), tmpl.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_FindObjectsInit");
        var $objects = new ObjectArray(1);
        var $objlen = core.Ref.alloc(pkcs11.CK_ULONG);
        var objects = [];
        while (true) {
            rv = this.lib.C_FindObjects(this.handle, $objects.buffer, 1, $objlen);
            if (rv !== pkcs11.CKR_OK || $objlen.deref() === 0)
                break;
            var hObject = $objects[0];
            if (callback && callback(new object_1.SessionObject(hObject, this, this.lib)) === false) {
                break;
            }
            objects.push(hObject);
        }
        rv = this.lib.C_FindObjectsFinal(this.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_FindObjectsFinal");
        return new object_1.SessionObjectCollection(objects, this, this.lib);
    };
    Session.prototype.getObject = function (handle) {
        var res = null;
        this.find(null, function (obj) {
            if (obj.handle === handle) {
                res = obj;
                return false;
            }
            if (obj.handle > handle)
                return false;
        });
        if (res)
            return res.toType();
        else
            return null;
    };
    Session.prototype.generateKey = function (mechanism, template, callback) {
        var _this = this;
        if (template === void 0) { template = null; }
        try {
            var pMech = mech_1.Mechanism.create(mechanism);
            if (template) {
                template.class = object_1.ObjectClass.SECRET_KEY;
            }
            var pTemplate = new template_1.Template(template);
            var hKey_1 = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);
            if (callback) {
                this.lib.C_GenerateKey(this.handle, pMech, pTemplate.ref(), pTemplate.length, hKey_1, function (err, rv) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        if (rv)
                            callback(new core.Pkcs11Error(rv, "C_GenerateKey"), null);
                        else {
                            var obj = new object_1.SessionObject(hKey_1.deref(), _this, _this.lib);
                            callback(null, obj.toType());
                        }
                    }
                });
            }
            else {
                var rv = this.lib.C_GenerateKey(this.handle, pMech, pTemplate.ref(), pTemplate.length, hKey_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_GenerateKey");
                var obj = new object_1.SessionObject(hKey_1.deref(), this, this.lib);
                return obj.toType();
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    Session.prototype.generateKeyPair = function (mechanism, publicTemplate, privateTemplate, callback) {
        var _this = this;
        try {
            var pMech = mech_1.Mechanism.create(mechanism);
            if (publicTemplate) {
                publicTemplate.class = object_1.ObjectClass.PUBLIC_KEY;
            }
            var pubTmpl = new template_1.Template(publicTemplate);
            var hPubKey_1 = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);
            if (privateTemplate) {
                privateTemplate.class = object_1.ObjectClass.PRIVATE_KEY;
                privateTemplate.private = true;
            }
            var prvTmpl = new template_1.Template(privateTemplate);
            var hPrvKey_1 = core.Ref.alloc(pkcs11.CK_OBJECT_HANDLE);
            if (callback) {
                this.lib.C_GenerateKeyPair(this.handle, pMech, pubTmpl.ref(), pubTmpl.length, prvTmpl.ref(), prvTmpl.length, hPubKey_1, hPrvKey_1, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else {
                        if (rv)
                            callback(new core.Pkcs11Error(rv, "C_GenerateKeyPair"), null);
                        else
                            callback(null, {
                                publicKey: new objects.PublicKey(hPubKey_1.deref(), _this, _this.lib),
                                privateKey: new objects.PrivateKey(hPrvKey_1.deref(), _this, _this.lib)
                            });
                    }
                });
            }
            else {
                var rv = this.lib.C_GenerateKeyPair(this.handle, pMech, pubTmpl.ref(), pubTmpl.length, prvTmpl.ref(), prvTmpl.length, hPubKey_1, hPrvKey_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_GenerateKeyPair");
                return {
                    publicKey: new objects.PublicKey(hPubKey_1.deref(), this, this.lib),
                    privateKey: new objects.PrivateKey(hPrvKey_1.deref(), this, this.lib)
                };
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    Session.prototype.createSign = function (alg, key) {
        return new common_1.Sign(this, alg, key, this.lib);
    };
    Session.prototype.createVerify = function (alg, key) {
        return new common_1.Verify(this, alg, key, this.lib);
    };
    Session.prototype.createCipher = function (alg, key) {
        return new common_1.Cipher(this, alg, key, this.lib);
    };
    Session.prototype.createDecipher = function (alg, key, blockSize) {
        return new common_1.Decipher(this, alg, key, blockSize, this.lib);
    };
    Session.prototype.createDigest = function (alg) {
        return new common_1.Digest(this, alg, this.lib);
    };
    Session.prototype.wrapKey = function (alg, wrappingKey, key, callback) {
        try {
            var pMech = mech_1.Mechanism.create(alg);
            var pWrappedKey_1 = new Buffer(4048);
            var pWrappedKeyLen_1 = core.Ref.alloc(pkcs11.CK_ULONG, pWrappedKey_1.length);
            if (callback) {
                this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, pWrappedKey_1, pWrappedKeyLen_1, function (err, rv) {
                    if (rv)
                        callback(new core.Pkcs11Error(rv, "C_WrapKey"), null);
                    else
                        callback(null, pWrappedKey_1.slice(0, pWrappedKeyLen_1.deref()));
                });
            }
            else {
                var rv = this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, pWrappedKey_1, pWrappedKeyLen_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_WrapKey");
                return pWrappedKey_1.slice(0, pWrappedKeyLen_1.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    Session.prototype.unwrapKey = function (alg, unwrappingKey, wrappedKey, template, callback) {
        var _this = this;
        try {
            var pMech = mech_1.Mechanism.create(alg);
            var pTemplate = new template_1.Template(template);
            var phKey_1 = core.Ref.alloc(pkcs11.CK_ULONG);
            if (callback) {
                this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, wrappedKey.length, pTemplate.ref(), pTemplate.length, phKey_1, function (err, rv) {
                    if (rv)
                        callback(new core.Pkcs11Error(rv, "C_UnwrapKey"), null);
                    else
                        callback(null, new object_1.Key(phKey_1.deref(), _this, _this.lib));
                });
            }
            else {
                var rv = this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, wrappedKey.length, pTemplate.ref(), pTemplate.length, phKey_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_UnwrapKey");
            }
            return new object_1.Key(phKey_1.deref(), this, this.lib);
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    Session.prototype.deriveKey = function (alg, baseKey, template, callback) {
        var _this = this;
        try {
            var pMech = mech_1.Mechanism.create(alg);
            var pTemplate = new template_1.Template(template);
            var phKey_2 = core.Ref.alloc(pkcs11.CK_ULONG);
            if (callback) {
                this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate.ref(), pTemplate.length, phKey_2, function (err, rv) {
                    if (rv)
                        callback(new core.Pkcs11Error(rv, "C_DeriveKey"), null);
                    else
                        callback(null, new object_1.SecretKey(phKey_2.deref(), _this, _this.lib));
                });
            }
            else {
                var rv = this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate.ref(), pTemplate.length, phKey_2);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DeriveKey");
                return new object_1.SecretKey(phKey_2.deref(), this, this.lib);
            }
        }
        catch (e) {
            if (callback) {
                callback(e, null);
            }
            else
                throw e;
        }
    };
    Session.prototype.generateRandom = function (size) {
        var buf = new Buffer(size);
        var rv = this.lib.C_GenerateRandom(this.handle, buf, buf.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GenerateRandom");
        return buf;
    };
    return Session;
}(core.HandleObject));
exports.Session = Session;
