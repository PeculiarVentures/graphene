var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pkcs11 = require("../../pkcs11");
var storage_1 = require("../storage");
(function (CertificateType) {
    CertificateType[CertificateType["X_509"] = pkcs11.CKC_X_509] = "X_509";
    CertificateType[CertificateType["X_509_ATTR_CERT"] = pkcs11.CKC_X_509_ATTR_CERT] = "X_509_ATTR_CERT";
    CertificateType[CertificateType["WTLS"] = pkcs11.CKC_WTLS] = "WTLS";
})(exports.CertificateType || (exports.CertificateType = {}));
var CertificateType = exports.CertificateType;
(function (CertificateCategory) {
    CertificateCategory[CertificateCategory["Unspecified"] = 0] = "Unspecified";
    CertificateCategory[CertificateCategory["TokenUser"] = 1] = "TokenUser";
    CertificateCategory[CertificateCategory["Authority"] = 2] = "Authority";
    CertificateCategory[CertificateCategory["OtherEntity"] = 3] = "OtherEntity";
})(exports.CertificateCategory || (exports.CertificateCategory = {}));
var CertificateCategory = exports.CertificateCategory;
var Certificate = (function (_super) {
    __extends(Certificate, _super);
    function Certificate() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Certificate.prototype, "type", {
        get: function () {
            return this.get("certType");
        },
        set: function (v) {
            this.set("certType", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Certificate.prototype, "trusted", {
        get: function () {
            return this.get("trusted");
        },
        set: function (v) {
            this.set("trusted", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Certificate.prototype, "category", {
        get: function () {
            return this.get("certCategory");
        },
        set: function (v) {
            this.set("certCategory", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Certificate.prototype, "checkValue", {
        get: function () {
            return this.get("checkValue");
        },
        set: function (v) {
            this.set("checkValue", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Certificate.prototype, "startDate", {
        get: function () {
            return this.get("startDate");
        },
        set: function (v) {
            this.set("startDate", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Certificate.prototype, "endDate", {
        get: function () {
            return this.get("endDate");
        },
        set: function (v) {
            this.set("endDate", v);
        },
        enumerable: true,
        configurable: true
    });
    return Certificate;
})(storage_1.Storage);
exports.Certificate = Certificate;
