"use strict";
var pkcs11 = require("../../pkcs11");
var mech_1 = require("../../mech");
var mgf_1 = require("./mgf");
var RsaOaepParams = (function () {
    function RsaOaepParams(hashAlg, mgf, sourceData) {
        if (hashAlg === void 0) { hashAlg = mech_1.MechanismEnum.SHA1; }
        if (mgf === void 0) { mgf = mgf_1.RsaMgf.MGF1_SHA1; }
        if (sourceData === void 0) { sourceData = null; }
        this.source = pkcs11.CKZ_DATA_SPECIFIED;
        this.hashAlgorithm = hashAlg;
        this.mgf = mgf;
        this.sourceData = sourceData || null;
    }
    RsaOaepParams.prototype.toCKI = function () {
        return new pkcs11.CK_RSA_PKCS_OAEP_PARAMS({
            hashAlg: this.hashAlgorithm,
            mgf: this.mgf,
            source: this.source,
            pSourceData: this.sourceData,
            ulSourceDataLen: this.sourceData ? this.sourceData.length : 0,
        })["ref.buffer"];
    };
    return RsaOaepParams;
}());
exports.RsaOaepParams = RsaOaepParams;
