var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require("../storage");
var pkcs11 = require("../../pkcs11");
(function (KeyType) {
    KeyType[KeyType["RSA"] = pkcs11.CKK_RSA] = "RSA";
    KeyType[KeyType["DSA"] = pkcs11.CKK_DSA] = "DSA";
    KeyType[KeyType["DH"] = pkcs11.CKK_DH] = "DH";
    KeyType[KeyType["ECDSA"] = pkcs11.CKK_ECDSA] = "ECDSA";
    KeyType[KeyType["EC"] = pkcs11.CKK_EC] = "EC";
    KeyType[KeyType["X9_42_DH"] = pkcs11.CKK_X9_42_DH] = "X9_42_DH";
    KeyType[KeyType["KEA"] = pkcs11.CKK_KEA] = "KEA";
    KeyType[KeyType["GENERIC_SECRET"] = pkcs11.CKK_GENERIC_SECRET] = "GENERIC_SECRET";
    KeyType[KeyType["RC2"] = pkcs11.CKK_RC2] = "RC2";
    KeyType[KeyType["RC4"] = pkcs11.CKK_RC4] = "RC4";
    KeyType[KeyType["DES"] = pkcs11.CKK_DES] = "DES";
    KeyType[KeyType["DES2"] = pkcs11.CKK_DES2] = "DES2";
    KeyType[KeyType["DES3"] = pkcs11.CKK_DES3] = "DES3";
    KeyType[KeyType["CAST"] = pkcs11.CKK_CAST] = "CAST";
    KeyType[KeyType["CAST3"] = pkcs11.CKK_CAST3] = "CAST3";
    KeyType[KeyType["CAST5"] = pkcs11.CKK_CAST5] = "CAST5";
    KeyType[KeyType["CAST128"] = pkcs11.CKK_CAST128] = "CAST128";
    KeyType[KeyType["RC5"] = pkcs11.CKK_RC5] = "RC5";
    KeyType[KeyType["IDEA"] = pkcs11.CKK_IDEA] = "IDEA";
    KeyType[KeyType["SKIPJACK"] = pkcs11.CKK_SKIPJACK] = "SKIPJACK";
    KeyType[KeyType["BATON"] = pkcs11.CKK_BATON] = "BATON";
    KeyType[KeyType["JUNIPER"] = pkcs11.CKK_JUNIPER] = "JUNIPER";
    KeyType[KeyType["CDMF"] = pkcs11.CKK_CDMF] = "CDMF";
    KeyType[KeyType["AES"] = pkcs11.CKK_AES] = "AES";
    KeyType[KeyType["GOSTR3410"] = pkcs11.CKK_GOSTR3410] = "GOSTR3410";
    KeyType[KeyType["GOSTR3411"] = pkcs11.CKK_GOSTR3411] = "GOSTR3411";
    KeyType[KeyType["GOST28147"] = pkcs11.CKK_GOST28147] = "GOST28147";
    KeyType[KeyType["BLOWFISH"] = pkcs11.CKK_BLOWFISH] = "BLOWFISH";
    KeyType[KeyType["TWOFISH"] = pkcs11.CKK_TWOFISH] = "TWOFISH";
    KeyType[KeyType["SECURID"] = pkcs11.CKK_SECURID] = "SECURID";
    KeyType[KeyType["HOTP"] = pkcs11.CKK_HOTP] = "HOTP";
    KeyType[KeyType["ACTI"] = pkcs11.CKK_ACTI] = "ACTI";
    KeyType[KeyType["CAMELLIA"] = pkcs11.CKK_CAMELLIA] = "CAMELLIA";
    KeyType[KeyType["ARIA"] = pkcs11.CKK_ARIA] = "ARIA";
})(exports.KeyType || (exports.KeyType = {}));
var KeyType = exports.KeyType;
(function (KeyGenMechanism) {
    KeyGenMechanism[KeyGenMechanism["AES"] = pkcs11.CKM_AES_KEY_GEN] = "AES";
    KeyGenMechanism[KeyGenMechanism["RSA"] = pkcs11.CKM_RSA_PKCS_KEY_PAIR_GEN] = "RSA";
    KeyGenMechanism[KeyGenMechanism["RSA_X9_31"] = pkcs11.CKM_RSA_X9_31_KEY_PAIR_GEN] = "RSA_X9_31";
    KeyGenMechanism[KeyGenMechanism["DSA"] = pkcs11.CKM_DSA_KEY_PAIR_GEN] = "DSA";
    KeyGenMechanism[KeyGenMechanism["DH_PKCS"] = pkcs11.CKM_DH_PKCS_KEY_PAIR_GEN] = "DH_PKCS";
    KeyGenMechanism[KeyGenMechanism["DH_X9_42"] = pkcs11.CKM_X9_42_DH_KEY_PAIR_GEN] = "DH_X9_42";
    KeyGenMechanism[KeyGenMechanism["GOSTR3410"] = pkcs11.CKM_GOSTR3410_KEY_PAIR_GEN] = "GOSTR3410";
    KeyGenMechanism[KeyGenMechanism["GOST28147"] = pkcs11.CKM_GOST28147_KEY_GEN] = "GOST28147";
    KeyGenMechanism[KeyGenMechanism["RC2"] = pkcs11.CKM_RC2_KEY_GEN] = "RC2";
    KeyGenMechanism[KeyGenMechanism["RC4"] = pkcs11.CKM_RC4_KEY_GEN] = "RC4";
    KeyGenMechanism[KeyGenMechanism["DES"] = pkcs11.CKM_DES_KEY_GEN] = "DES";
    KeyGenMechanism[KeyGenMechanism["DES2"] = pkcs11.CKM_DES2_KEY_GEN] = "DES2";
    KeyGenMechanism[KeyGenMechanism["SECURID"] = pkcs11.CKM_SECURID_KEY_GEN] = "SECURID";
    KeyGenMechanism[KeyGenMechanism["ACTI"] = pkcs11.CKM_ACTI_KEY_GEN] = "ACTI";
    KeyGenMechanism[KeyGenMechanism["CAST"] = pkcs11.CKM_CAST_KEY_GEN] = "CAST";
    KeyGenMechanism[KeyGenMechanism["CAST3"] = pkcs11.CKM_CAST3_KEY_GEN] = "CAST3";
    KeyGenMechanism[KeyGenMechanism["CAST5"] = pkcs11.CKM_CAST5_KEY_GEN] = "CAST5";
    KeyGenMechanism[KeyGenMechanism["CAST128"] = pkcs11.CKM_CAST128_KEY_GEN] = "CAST128";
    KeyGenMechanism[KeyGenMechanism["RC5"] = pkcs11.CKM_RC5_KEY_GEN] = "RC5";
    KeyGenMechanism[KeyGenMechanism["IDEA"] = pkcs11.CKM_IDEA_KEY_GEN] = "IDEA";
    KeyGenMechanism[KeyGenMechanism["GENERIC_SECRET"] = pkcs11.CKM_GENERIC_SECRET_KEY_GEN] = "GENERIC_SECRET";
    KeyGenMechanism[KeyGenMechanism["SSL3_PRE_MASTER"] = pkcs11.CKM_SSL3_PRE_MASTER_KEY_GEN] = "SSL3_PRE_MASTER";
    KeyGenMechanism[KeyGenMechanism["CAMELLIA"] = pkcs11.CKM_CAMELLIA_KEY_GEN] = "CAMELLIA";
    KeyGenMechanism[KeyGenMechanism["ARIA"] = pkcs11.CKM_ARIA_KEY_GEN] = "ARIA";
    KeyGenMechanism[KeyGenMechanism["SKIPJACK"] = pkcs11.CKM_SKIPJACK_KEY_GEN] = "SKIPJACK";
    KeyGenMechanism[KeyGenMechanism["KEA"] = pkcs11.CKM_KEA_KEY_PAIR_GEN] = "KEA";
    KeyGenMechanism[KeyGenMechanism["BATON"] = pkcs11.CKM_BATON_KEY_GEN] = "BATON";
    KeyGenMechanism[KeyGenMechanism["ECDSA"] = pkcs11.CKM_ECDSA_KEY_PAIR_GEN] = "ECDSA";
    KeyGenMechanism[KeyGenMechanism["EC"] = pkcs11.CKM_EC_KEY_PAIR_GEN] = "EC";
    KeyGenMechanism[KeyGenMechanism["JUNIPER"] = pkcs11.CKM_JUNIPER_KEY_GEN] = "JUNIPER";
    KeyGenMechanism[KeyGenMechanism["TWOFISH"] = pkcs11.CKM_TWOFISH_KEY_GEN] = "TWOFISH";
})(exports.KeyGenMechanism || (exports.KeyGenMechanism = {}));
var KeyGenMechanism = exports.KeyGenMechanism;
var Key = (function (_super) {
    __extends(Key, _super);
    function Key() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Key.prototype, "type", {
        get: function () {
            return this.get("keyType");
        },
        set: function (v) {
            this.set("keyType", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "id", {
        get: function () {
            return this.get("id");
        },
        set: function (v) {
            this.set("id", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "startDate", {
        get: function () {
            return this.get("startDate");
        },
        set: function (v) {
            this.set("startDate", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "endDate", {
        get: function () {
            return this.get("endDate");
        },
        set: function (v) {
            this.set("endDate", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "derive", {
        get: function () {
            return this.get("derive");
        },
        set: function (v) {
            this.set("derive", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "local", {
        get: function () {
            return this.get("local");
        },
        set: function (v) {
            this.set("local", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "mechanism", {
        get: function () {
            return this.get("keyGenMechanism");
        },
        set: function (v) {
            this.set("keyGenMechanism", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "allowedMechanisms", {
        get: function () {
            throw "Not implemented";
        },
        set: function (v) {
            throw "Not implemented";
        },
        enumerable: true,
        configurable: true
    });
    return Key;
})(storage_1.Storage);
exports.Key = Key;
