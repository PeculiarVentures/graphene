var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cert_1 = require("./cert");
var WtlsCertificate = (function (_super) {
    __extends(WtlsCertificate, _super);
    function WtlsCertificate() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(WtlsCertificate.prototype, "subject", {
        get: function () {
            return this.get("subject");
        },
        set: function (v) {
            this.set("subject", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "issuer", {
        get: function () {
            return this.get("issuer");
        },
        set: function (v) {
            this.set("issuer", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "id", {
        get: function () {
            return this.get("id");
        },
        set: function (v) {
            this.set("id", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "value", {
        get: function () {
            return this.get("value");
        },
        set: function (v) {
            this.set("value", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "url", {
        get: function () {
            return this.get("url");
        },
        set: function (v) {
            this.set("url", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "serialNumber", {
        get: function () {
            return this.get("serial");
        },
        set: function (v) {
            this.set("serial", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "subjetcKeyIdentifier", {
        get: function () {
            return this.get("ski");
        },
        set: function (v) {
            this.set("ski", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WtlsCertificate.prototype, "authorityKeyIdentifier", {
        get: function () {
            return this.get("aki");
        },
        set: function (v) {
            this.set("aki", v);
        },
        enumerable: true,
        configurable: true
    });
    return WtlsCertificate;
})(cert_1.Certificate);
exports.WtlsCertificate = WtlsCertificate;
