"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("./core");
(function (TokenFlag) {
    TokenFlag[TokenFlag["RNG"] = 1] = "RNG";
    TokenFlag[TokenFlag["WRITE_PROTECTED"] = 2] = "WRITE_PROTECTED";
    TokenFlag[TokenFlag["LOGIN_REQUIRED"] = 4] = "LOGIN_REQUIRED";
    TokenFlag[TokenFlag["USER_PIN_INITIALIZED"] = 8] = "USER_PIN_INITIALIZED";
    TokenFlag[TokenFlag["RESTORE_KEY_NOT_NEEDED"] = 32] = "RESTORE_KEY_NOT_NEEDED";
    TokenFlag[TokenFlag["CLOCK_ON_TOKEN"] = 64] = "CLOCK_ON_TOKEN";
    TokenFlag[TokenFlag["PROTECTED_AUTHENTICATION_PATH"] = 256] = "PROTECTED_AUTHENTICATION_PATH";
    TokenFlag[TokenFlag["DUAL_CRYPTO_OPERATIONS"] = 512] = "DUAL_CRYPTO_OPERATIONS";
    TokenFlag[TokenFlag["TOKEN_INITIALIZED"] = 1024] = "TOKEN_INITIALIZED";
    TokenFlag[TokenFlag["SECONDARY_AUTHENTICATION"] = 2048] = "SECONDARY_AUTHENTICATION";
    TokenFlag[TokenFlag["USER_PIN_COUNT_LOW"] = 65536] = "USER_PIN_COUNT_LOW";
    TokenFlag[TokenFlag["USER_PIN_FINAL_TRY"] = 131072] = "USER_PIN_FINAL_TRY";
    TokenFlag[TokenFlag["USER_PIN_LOCKED"] = 262144] = "USER_PIN_LOCKED";
    TokenFlag[TokenFlag["USER_PIN_TO_BE_CHANGED"] = 524288] = "USER_PIN_TO_BE_CHANGED";
    TokenFlag[TokenFlag["SO_PIN_COUNT_LOW"] = 1048576] = "SO_PIN_COUNT_LOW";
    TokenFlag[TokenFlag["SO_PIN_FINAL_TRY"] = 2097152] = "SO_PIN_FINAL_TRY";
    TokenFlag[TokenFlag["SO_PIN_LOCKED"] = 4194304] = "SO_PIN_LOCKED";
    TokenFlag[TokenFlag["SO_PIN_TO_BE_CHANGED"] = 8388608] = "SO_PIN_TO_BE_CHANGED";
    TokenFlag[TokenFlag["ERROR_STATE"] = 16777216] = "ERROR_STATE";
})(exports.TokenFlag || (exports.TokenFlag = {}));
var TokenFlag = exports.TokenFlag;
var Token = (function (_super) {
    __extends(Token, _super);
    function Token(handle, lib) {
        _super.call(this, handle, lib);
        this.getInfo();
    }
    Token.prototype.getInfo = function () {
        var info = this.lib.C_GetTokenInfo(this.handle);
        this.label = info.label.trim();
        this.manufacturerID = info.manufacturerID.toString().trim();
        this.model = info.model.trim();
        this.serialNumber = new Buffer(info.serialNumber).toString().trim();
        this.flags = info.flags;
        this.maxSessionCount = info.maxSessionCount;
        this.sessionCount = info.sessionCount;
        this.maxRwSessionCount = info.maxRwSessionCount;
        this.rwSessionCount = info.rwSessionCount;
        this.maxPinLen = info.maxPinLen;
        this.minPinLen = info.minPinLen;
        this.totalPublicMemory = info.totalPublicMemory;
        this.freePublicMemory = info.freePublicMemory;
        this.totalPrivateMemory = info.totalPrivateMemory;
        this.freePrivateMemory = info.freePrivateMemory;
        this.hardwareVersion = info.hardwareVersion;
        this.firmwareVersion = info.firmwareVersion;
        if (info.flags & TokenFlag.CLOCK_ON_TOKEN) {
            core.dateFromString(info.utcTime);
        }
    };
    return Token;
}(core.HandleObject));
exports.Token = Token;
