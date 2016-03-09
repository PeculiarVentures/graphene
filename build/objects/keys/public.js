"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var key_1 = require("./key");
var PublicKey = (function (_super) {
    __extends(PublicKey, _super);
    function PublicKey() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PublicKey.prototype, "subject", {
        get: function () {
            return this.get("subject");
        },
        set: function (v) {
            this.set("subject", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKey.prototype, "encrypt", {
        get: function () {
            return this.get("encrypt");
        },
        set: function (v) {
            this.set("encrypt", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKey.prototype, "verify", {
        get: function () {
            return this.get("verify");
        },
        set: function (v) {
            this.set("verify", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKey.prototype, "verifyRecover", {
        get: function () {
            return this.get("verifyRecover");
        },
        set: function (v) {
            this.set("verifyRecover", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKey.prototype, "wrap", {
        get: function () {
            return this.get("wrap");
        },
        set: function (v) {
            this.set("wrap", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKey.prototype, "trusted", {
        get: function () {
            return this.get("trusted");
        },
        set: function (v) {
            this.set("trusted", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKey.prototype, "template", {
        get: function () {
            throw new Error("Not implemented");
        },
        set: function (v) {
            throw new Error("Not implemented");
        },
        enumerable: true,
        configurable: true
    });
    return PublicKey;
}(key_1.Key));
exports.PublicKey = PublicKey;
