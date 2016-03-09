"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var key_1 = require("./key");
var SecretKey = (function (_super) {
    __extends(SecretKey, _super);
    function SecretKey() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SecretKey.prototype, "sensitive", {
        get: function () {
            return this.get("sensitive");
        },
        set: function (v) {
            this.set("sensitive", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "encrypt", {
        get: function () {
            return this.get("encrypt");
        },
        set: function (v) {
            this.set("encrypt", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "decrypt", {
        get: function () {
            return this.get("decrypt");
        },
        set: function (v) {
            this.set("decrypt", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "verify", {
        get: function () {
            return this.get("verify");
        },
        set: function (v) {
            this.set("verify", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "sign", {
        get: function () {
            return this.get("sign");
        },
        set: function (v) {
            this.set("sign", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "wrap", {
        get: function () {
            return this.get("wrap");
        },
        set: function (v) {
            this.set("wrap", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "unwrap", {
        get: function () {
            return this.get("unwrap");
        },
        set: function (v) {
            this.set("unwrap", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "extractable", {
        get: function () {
            return this.get("extractable");
        },
        set: function (v) {
            this.set("extractable", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "alwaysSensitive", {
        get: function () {
            return this.get("alwaysSensitive   ");
        },
        set: function (v) {
            this.set("alwaysSensitive", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "neverExtractable", {
        get: function () {
            return this.get("neverExtractable");
        },
        set: function (v) {
            this.set("neverExtractable", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "checkValue", {
        get: function () {
            return this.get("checkValue");
        },
        set: function (v) {
            this.set("checkValue", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "wrapTrusted", {
        get: function () {
            return this.get("wrapWithTrusted");
        },
        set: function (v) {
            this.set("wrapWithTrusted", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "trusted", {
        get: function () {
            return this.get("trusted");
        },
        set: function (v) {
            this.set("trusted", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "wrapTemplate", {
        get: function () {
            throw new Error("Not implemented");
        },
        set: function (v) {
            throw new Error("Not implemented");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecretKey.prototype, "unwrapTemplate", {
        get: function () {
            throw new Error("Not implemented");
        },
        set: function (v) {
            throw new Error("Not implemented");
        },
        enumerable: true,
        configurable: true
    });
    return SecretKey;
}(key_1.Key));
exports.SecretKey = SecretKey;
