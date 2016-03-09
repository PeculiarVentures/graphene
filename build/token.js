"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pkcs11 = require("./pkcs11");
var core = require("./core");
(function (TokenFlag) {
    TokenFlag[TokenFlag["RNG"] = pkcs11.CKF_RNG] = "RNG";
    TokenFlag[TokenFlag["WRITE_PROTECTED"] = pkcs11.CKF_WRITE_PROTECTED] = "WRITE_PROTECTED";
    TokenFlag[TokenFlag["LOGIN_REQUIRED"] = pkcs11.CKF_LOGIN_REQUIRED] = "LOGIN_REQUIRED";
    TokenFlag[TokenFlag["USER_PIN_INITIALIZED"] = pkcs11.CKF_USER_PIN_INITIALIZED] = "USER_PIN_INITIALIZED";
    TokenFlag[TokenFlag["RESTORE_KEY_NOT_NEEDED"] = pkcs11.CKF_RESTORE_KEY_NOT_NEEDED] = "RESTORE_KEY_NOT_NEEDED";
    TokenFlag[TokenFlag["CLOCK_ON_TOKEN"] = pkcs11.CKF_CLOCK_ON_TOKEN] = "CLOCK_ON_TOKEN";
    TokenFlag[TokenFlag["PROTECTED_AUTHENTICATION_PATH"] = pkcs11.CKF_PROTECTED_AUTHENTICATION_PATH] = "PROTECTED_AUTHENTICATION_PATH";
    TokenFlag[TokenFlag["DUAL_CRYPTO_OPERATIONS"] = pkcs11.CKF_DUAL_CRYPTO_OPERATIONS] = "DUAL_CRYPTO_OPERATIONS";
    TokenFlag[TokenFlag["TOKEN_INITIALIZED"] = pkcs11.CKF_TOKEN_INITIALIZED] = "TOKEN_INITIALIZED";
    TokenFlag[TokenFlag["SECONDARY_AUTHENTICATION"] = pkcs11.CKF_SECONDARY_AUTHENTICATION] = "SECONDARY_AUTHENTICATION";
    TokenFlag[TokenFlag["USER_PIN_COUNT_LOW"] = pkcs11.CKF_USER_PIN_COUNT_LOW] = "USER_PIN_COUNT_LOW";
    TokenFlag[TokenFlag["USER_PIN_FINAL_TRY"] = pkcs11.CKF_USER_PIN_FINAL_TRY] = "USER_PIN_FINAL_TRY";
    TokenFlag[TokenFlag["USER_PIN_LOCKED"] = pkcs11.CKF_USER_PIN_LOCKED] = "USER_PIN_LOCKED";
    TokenFlag[TokenFlag["USER_PIN_TO_BE_CHANGED"] = pkcs11.CKF_USER_PIN_TO_BE_CHANGED] = "USER_PIN_TO_BE_CHANGED";
    TokenFlag[TokenFlag["SO_PIN_COUNT_LOW"] = pkcs11.CKF_SO_PIN_COUNT_LOW] = "SO_PIN_COUNT_LOW";
    TokenFlag[TokenFlag["SO_PIN_FINAL_TRY"] = pkcs11.CKF_SO_PIN_FINAL_TRY] = "SO_PIN_FINAL_TRY";
    TokenFlag[TokenFlag["SO_PIN_LOCKED"] = pkcs11.CKF_SO_PIN_LOCKED] = "SO_PIN_LOCKED";
    TokenFlag[TokenFlag["SO_PIN_TO_BE_CHANGED"] = pkcs11.CKF_SO_PIN_TO_BE_CHANGED] = "SO_PIN_TO_BE_CHANGED";
})(exports.TokenFlag || (exports.TokenFlag = {}));
var TokenFlag = exports.TokenFlag;
var Token = (function (_super) {
    __extends(Token, _super);
    function Token(handle, lib) {
        _super.call(this, handle, lib);
        this.getInfo();
    }
    Token.prototype.getInfo = function () {
        var $info = core.Ref.alloc(pkcs11.CK_TOKEN_INFO);
        var rv = this.lib.C_GetTokenInfo(this.handle, $info);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetTokenInfo");
        var info = $info.deref();
        this.label = new Buffer(info.label).toString().trim();
        this.manufacturerID = new Buffer(info.manufacturerID).toString().trim();
        this.model = new Buffer(info.model).toString().trim();
        this.serialNumber = new Buffer(info.serialNumber).toString().trim();
        this.flags = info.flags;
        this.maxSessionCount = info.ulMaxSessionCount;
        this.sessionCount = info.ulSessionCount;
        this.maxRwSessionCount = info.ulMaxRwSessionCount;
        this.rwSessionCount = info.ulRwSessionCount;
        this.maxPinLen = info.ulMaxPinLen;
        this.minPinLen = info.ulMinPinLen;
        this.totalPublicMemory = info.ulTotalPublicMemory;
        this.freePublicMemory = info.ulFreePublicMemory;
        this.totalPrivateMemory = info.ulTotalPrivateMemory;
        this.freePrivateMemory = info.ulFreePrivateMemory;
        this.hardwareVersion = {
            major: info.hardwareVersion.major,
            minor: info.hardwareVersion.minor
        };
        this.firmwareVersion = {
            major: info.firmwareVersion.major,
            minor: info.firmwareVersion.minor
        };
        this.utcTime = core.dateFromString(new Buffer(info.utcTime).toString("ascii"));
    };
    return Token;
}(core.HandleObject));
exports.Token = Token;
