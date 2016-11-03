"use strict";
var mech_1 = require("../../mech");
var params_1 = require("../params");
var mgf_1 = require("./mgf");
var RsaPssParams = (function () {
    function RsaPssParams(hashAlg, mgf, saltLen) {
        if (hashAlg === void 0) { hashAlg = mech_1.MechanismEnum.SHA1; }
        if (mgf === void 0) { mgf = mgf_1.RsaMgf.MGF1_SHA1; }
        if (saltLen === void 0) { saltLen = 20; }
        this.type = params_1.MechParams.RsaPSS;
        this.hashAlgorithm = hashAlg;
        this.mgf = mgf;
        this.saltLength = saltLen;
    }
    RsaPssParams.prototype.toCKI = function () {
        return {
            hashAlg: this.hashAlgorithm,
            mgf: this.mgf,
            saltLen: this.saltLength,
            type: this.type
        };
    };
    return RsaPssParams;
}());
exports.RsaPssParams = RsaPssParams;
