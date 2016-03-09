"use strict";
var pkcs11 = require("../../pkcs11");
var mech_1 = require("../../mech");
var mgf_1 = require("./mgf");
var RsaPssParams = (function () {
    function RsaPssParams(hashAlg, mgf, saltLen) {
        if (hashAlg === void 0) { hashAlg = mech_1.MechanismEnum.SHA1; }
        if (mgf === void 0) { mgf = mgf_1.RsaMgf.MGF1_SHA1; }
        if (saltLen === void 0) { saltLen = 0; }
        this.hashAlgorithm = hashAlg;
        this.mgf = mgf;
        this.saltLength = saltLen;
    }
    RsaPssParams.prototype.toCKI = function () {
        return new pkcs11.CK_RSA_PKCS_PSS_PARAMS({
            hashAlg: this.hashAlgorithm,
            mgf: this.mgf,
            sLen: this.saltLength,
        })["ref.buffer"];
    };
    return RsaPssParams;
}());
exports.RsaPssParams = RsaPssParams;
