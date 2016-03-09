"use strict";
var pkcs11 = require("../../pkcs11");
(function (RsaMgf) {
    RsaMgf[RsaMgf["MGF1_SHA1"] = pkcs11.CKG_MGF1_SHA1] = "MGF1_SHA1";
    RsaMgf[RsaMgf["MGF1_SHA224"] = pkcs11.CKG_MGF1_SHA224] = "MGF1_SHA224";
    RsaMgf[RsaMgf["MGF1_SHA256"] = pkcs11.CKG_MGF1_SHA256] = "MGF1_SHA256";
    RsaMgf[RsaMgf["MGF1_SHA384"] = pkcs11.CKG_MGF1_SHA384] = "MGF1_SHA384";
    RsaMgf[RsaMgf["MGF1_SHA512"] = pkcs11.CKG_MGF1_SHA512] = "MGF1_SHA512";
})(exports.RsaMgf || (exports.RsaMgf = {}));
var RsaMgf = exports.RsaMgf;
