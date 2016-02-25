var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cert_1 = require("./cert");
var AttributeCertificate = (function (_super) {
    __extends(AttributeCertificate, _super);
    function AttributeCertificate() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(AttributeCertificate.prototype, "owner", {
        get: function () {
            return this.get("owner");
        },
        set: function (v) {
            this.set("owner", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeCertificate.prototype, "issuer", {
        get: function () {
            return this.get("issuerAC");
        },
        set: function (v) {
            this.set("issuerAC", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeCertificate.prototype, "serialNumber", {
        get: function () {
            return this.get("serial");
        },
        set: function (v) {
            this.set("serial", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeCertificate.prototype, "types", {
        get: function () {
            return this.get("attrTypes");
        },
        set: function (v) {
            this.set("attrTypes", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeCertificate.prototype, "value", {
        get: function () {
            return this.get("value");
        },
        set: function (v) {
            this.set("value", v);
        },
        enumerable: true,
        configurable: true
    });
    return AttributeCertificate;
})(cert_1.Certificate);
exports.AttributeCertificate = AttributeCertificate;
