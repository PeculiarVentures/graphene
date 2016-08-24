"use strict";
var mech_1 = require("../../mech");
var mgf_1 = require("./mgf");
var params_1 = require("../params");
var RsaOaepParams = (function () {
    function RsaOaepParams(hashAlg, mgf, sourceData) {
        if (hashAlg === void 0) { hashAlg = mech_1.MechanismEnum.SHA1; }
        if (mgf === void 0) { mgf = mgf_1.RsaMgf.MGF1_SHA1; }
        if (sourceData === void 0) { sourceData = null; }
        this.source = 1;
        this.type = params_1.MechParams.RsaOAEP;
        this.hashAlgorithm = hashAlg;
        this.mgf = mgf;
        this.sourceData = sourceData || null;
    }
    RsaOaepParams.prototype.toCKI = function () {
        return {
            hashAlg: this.hashAlgorithm,
            mgf: this.mgf,
            source: this.source,
            sourceData: this.sourceData,
            type: this.type
        };
    };
    return RsaOaepParams;
}());
exports.RsaOaepParams = RsaOaepParams;
