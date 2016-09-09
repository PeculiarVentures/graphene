"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cert_1 = require("./cert");
(function (JavaMIDP) {
    JavaMIDP[JavaMIDP["Unspecified"] = 0] = "Unspecified";
    JavaMIDP[JavaMIDP["Manufacturer"] = 1] = "Manufacturer";
    JavaMIDP[JavaMIDP["Operator"] = 2] = "Operator";
    JavaMIDP[JavaMIDP["ThirdParty"] = 3] = "ThirdParty";
})(exports.JavaMIDP || (exports.JavaMIDP = {}));
var JavaMIDP = exports.JavaMIDP;
var X509Certificate = (function (_super) {
    __extends(X509Certificate, _super);
    function X509Certificate() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(X509Certificate.prototype, "subject", {
        get: function () {
            return this.get("subject");
        },
        set: function (v) {
            this.set("subject", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "id", {
        get: function () {
            return this.get("id");
        },
        set: function (v) {
            this.set("id", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "issuer", {
        get: function () {
            return this.get("issuer");
        },
        set: function (v) {
            this.set("issuer", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "serialNumber", {
        get: function () {
            return this.get("serial").toString("hex");
        },
        set: function (v) {
            this.set("serial", new Buffer(v, "hex"));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "value", {
        get: function () {
            return this.get("value");
        },
        set: function (v) {
            this.set("value", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "url", {
        get: function () {
            return this.get("url");
        },
        set: function (v) {
            this.set("url", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "subjetcKeyIdentifier", {
        get: function () {
            return this.get("ski");
        },
        set: function (v) {
            this.set("ski", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "authorityKeyIdentifier", {
        get: function () {
            return this.get("aki");
        },
        set: function (v) {
            this.set("aki", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(X509Certificate.prototype, "java", {
        get: function () {
            return this.get("javaDomain");
        },
        set: function (v) {
            this.set("javaDomain", v);
        },
        enumerable: true,
        configurable: true
    });
    return X509Certificate;
}(cert_1.Certificate));
exports.X509Certificate = X509Certificate;
