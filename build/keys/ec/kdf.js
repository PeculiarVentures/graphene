var pkcs11 = require("../../pkcs11");
(function (EcKdf) {
    EcKdf[EcKdf["NULL"] = pkcs11.CKD_NULL] = "NULL";
    EcKdf[EcKdf["SHA1"] = pkcs11.CKD_SHA1_KDF] = "SHA1";
    EcKdf[EcKdf["SHA224"] = pkcs11.CKD_SHA224_KDF] = "SHA224";
    EcKdf[EcKdf["SHA256"] = pkcs11.CKD_SHA256_KDF] = "SHA256";
    EcKdf[EcKdf["SHA384"] = pkcs11.CKD_SHA384_KDF] = "SHA384";
    EcKdf[EcKdf["SHA512"] = pkcs11.CKD_SHA512_KDF] = "SHA512";
})(exports.EcKdf || (exports.EcKdf = {}));
var EcKdf = exports.EcKdf;
