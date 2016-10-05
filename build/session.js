"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("./core");
var object_1 = require("./object");
var template_1 = require("./template");
var mech_1 = require("./mech");
var objects = require("./objects/common");
var common_1 = require("./crypto/common");
(function (SessionFlag) {
    SessionFlag[SessionFlag["RW_SESSION"] = 2] = "RW_SESSION";
    SessionFlag[SessionFlag["SERIAL_SESSION"] = 4] = "SERIAL_SESSION";
})(exports.SessionFlag || (exports.SessionFlag = {}));
var SessionFlag = exports.SessionFlag;
(function (UserType) {
    UserType[UserType["SO"] = 0] = "SO";
    UserType[UserType["USER"] = 1] = "USER";
    UserType[UserType["CONTEXT_SPECIFIC"] = 2] = "CONTEXT_SPECIFIC";
})(exports.UserType || (exports.UserType = {}));
var UserType = exports.UserType;
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(handle, slot, lib) {
        _super.call(this, handle, lib);
        this.slot = slot;
    }
    Session.prototype.getInfo = function () {
        var info = this.lib.C_GetSessionInfo(this.slot.handle);
        this.state = info.state;
        this.flags = info.flags;
        this.deviceError = info.deviceError;
    };
    Session.prototype.close = function () {
        this.lib.C_CloseSession(this.handle);
    };
    Session.prototype.initPin = function (pin) {
        this.lib.C_InitPIN(this.handle, pin);
    };
    Session.prototype.setPin = function (oldPin, newPin) {
        this.lib.C_SetPIN(this.handle, oldPin, newPin);
    };
    Session.prototype.getOperationState = function () {
        throw new Error("Not implemented");
    };
    Session.prototype.setOperationState = function (state, encryptionKey, authenticationKey) {
        if (encryptionKey === void 0) { encryptionKey = 0; }
        if (authenticationKey === void 0) { authenticationKey = 0; }
        throw new Error("Not implemented");
    };
    Session.prototype.login = function (pin, userType) {
        if (userType === void 0) { userType = UserType.USER; }
        this.lib.C_Login(this.handle, userType, pin);
    };
    Session.prototype.logout = function () {
        this.lib.C_Logout(this.handle);
    };
    Session.prototype.create = function (template) {
        var tmpl = template_1.Template.toPkcs11(template);
        var hObject = this.lib.C_CreateObject(this.handle, tmpl);
        return new object_1.SessionObject(hObject, this, this.lib);
    };
    Session.prototype.copy = function (object, template) {
        var tmpl = template_1.Template.toPkcs11(template);
        var hObject = this.lib.C_CopyObject(this.handle, object.handle, tmpl);
        return new object_1.SessionObject(hObject, this, this.lib);
    };
    Session.prototype.destroy = function (param) {
        if (param instanceof object_1.SessionObject) {
            this.lib.C_DestroyObject(this.handle, param.handle);
            return 1;
        }
        else {
            var objs = this.find(param || null);
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
        if (template === void 0) { template = null; }
        if (core.isFunction(template)) {
            callback = template;
            template = null;
        }
        var tmpl = template_1.Template.toPkcs11(template);
        this.lib.C_FindObjectsInit(this.handle, tmpl);
        var objects = [];
        try {
            while (true) {
                var hObject = this.lib.C_FindObjects(this.handle);
                if (!hObject)
                    break;
                if (callback && callback(new object_1.SessionObject(hObject, this, this.lib), objects.length) === false) {
                    break;
                }
                objects.push(hObject);
            }
        }
        catch (error) {
            this.lib.C_FindObjectsFinal(this.handle);
            throw (error);
        }
        this.lib.C_FindObjectsFinal(this.handle);
        return new object_1.SessionObjectCollection(objects, this, this.lib);
    };
    Session.prototype.getObject = function (handle) {
        var res;
        this.find(function (obj) {
            var compare = obj.handle.compare(handle);
            if (compare === 0) {
                res = obj;
                return false;
            }
            if (compare === 1)
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
            var pTemplate = template_1.Template.toPkcs11(template);
            if (callback) {
                this.lib.C_GenerateKey(this.handle, pMech, pTemplate, function (err, hKey) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        var obj = new object_1.SessionObject(hKey, _this, _this.lib);
                        callback(null, obj.toType());
                    }
                });
            }
            else {
                var hKey = this.lib.C_GenerateKey(this.handle, pMech, pTemplate);
                var obj = new object_1.SessionObject(hKey, this, this.lib);
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
            var pubTmpl = template_1.Template.toPkcs11(publicTemplate);
            if (privateTemplate) {
                privateTemplate.class = object_1.ObjectClass.PRIVATE_KEY;
                privateTemplate.private = true;
            }
            var prvTmpl = template_1.Template.toPkcs11(privateTemplate);
            if (callback) {
                this.lib.C_GenerateKeyPair(this.handle, pMech, pubTmpl, prvTmpl, function (err, keys) {
                    if (err)
                        callback(err, null);
                    else {
                        if (keys)
                            callback(null, {
                                publicKey: new objects.PublicKey(keys.publicKey, _this, _this.lib),
                                privateKey: new objects.PrivateKey(keys.privateKey, _this, _this.lib)
                            });
                    }
                });
            }
            else {
                var keys = this.lib.C_GenerateKeyPair(this.handle, pMech, pubTmpl, prvTmpl);
                return {
                    publicKey: new objects.PublicKey(keys.publicKey, this, this.lib),
                    privateKey: new objects.PrivateKey(keys.privateKey, this, this.lib)
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
        return new common_1.Decipher(this, alg, key, blockSize || 0, this.lib);
    };
    Session.prototype.createDigest = function (alg) {
        return new common_1.Digest(this, alg, this.lib);
    };
    Session.prototype.wrapKey = function (alg, wrappingKey, key, callback) {
        try {
            var pMech = mech_1.Mechanism.create(alg);
            var wrappedKey = new Buffer(8096);
            if (callback) {
                this.lib.C_WrapKey(this.handle, pMech, wrappingKey.handle, key.handle, wrappedKey, callback);
            }
            else {
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
    };
    Session.prototype.unwrapKey = function (alg, unwrappingKey, wrappedKey, template, callback) {
        var _this = this;
        try {
            var pMech = mech_1.Mechanism.create(alg);
            var pTemplate = template_1.Template.toPkcs11(template);
            if (callback) {
                this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, pTemplate, function (err, hKey) {
                    if (err)
                        callback(err, null);
                    else
                        callback(null, new object_1.Key(hKey, _this, _this.lib));
                });
            }
            else {
                var hKey = this.lib.C_UnwrapKey(this.handle, pMech, unwrappingKey.handle, wrappedKey, pTemplate);
                return new object_1.Key(hKey, this, this.lib);
            }
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
            var pTemplate = template_1.Template.toPkcs11(template);
            if (callback) {
                this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate, function (err, hKey) {
                    if (err)
                        callback(err, null);
                    else
                        callback(null, new object_1.SecretKey(hKey, _this, _this.lib));
                });
            }
            else {
                var hKey = this.lib.C_DeriveKey(this.handle, pMech, baseKey.handle, pTemplate);
                return new object_1.SecretKey(hKey, this, this.lib);
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
        this.lib.C_GenerateRandom(this.handle, buf);
        return buf;
    };
    return Session;
}(core.HandleObject));
exports.Session = Session;
