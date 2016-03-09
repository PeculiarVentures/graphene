"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var key_1 = require("./key");
var PrivateKey = (function (_super) {
    __extends(PrivateKey, _super);
    function PrivateKey() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PrivateKey.prototype, "subject", {
        get: function () {
            return this.get("subject");
        },
        set: function (v) {
            this.set("subject", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "sensitive", {
        get: function () {
            return this.get("sensitive");
        },
        set: function (v) {
            this.set("sensitive", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "decrypt", {
        get: function () {
            return this.get("decrypt");
        },
        set: function (v) {
            this.set("decrypt", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "sign", {
        get: function () {
            return this.get("sign");
        },
        set: function (v) {
            this.set("sign", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "signRecover", {
        get: function () {
            return this.get("signRecover");
        },
        set: function (v) {
            this.set("signRecover", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "unwrap", {
        get: function () {
            return this.get("unwrap");
        },
        set: function (v) {
            this.set("unwrap", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "extractable", {
        get: function () {
            return this.get("extractable");
        },
        set: function (v) {
            this.set("extractable", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "alwaysSensitive", {
        get: function () {
            return this.get("alwaysSensitive   ");
        },
        set: function (v) {
            this.set("alwaysSensitive", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "neverExtractable", {
        get: function () {
            return this.get("neverExtractable");
        },
        set: function (v) {
            this.set("neverExtractable", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "wrapTrusted", {
        get: function () {
            return this.get("wrapWithTrusted");
        },
        set: function (v) {
            this.set("wrapWithTrusted", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "template", {
        get: function () {
            throw new Error("Not implemented");
        },
        set: function (v) {
            throw new Error("Not implemented");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateKey.prototype, "alwaysAuthenticate", {
        get: function () {
            return this.get("alwaysAuth");
        },
        set: function (v) {
            this.set("alwaysAuth", v);
        },
        enumerable: true,
        configurable: true
    });
    return PrivateKey;
}(key_1.Key));
exports.PrivateKey = PrivateKey;
