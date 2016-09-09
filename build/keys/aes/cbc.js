"use strict";
var params_1 = require("../params");
var AesCbcParams = (function () {
    function AesCbcParams(iv, data) {
        if (data === void 0) { data = null; }
        this.type = params_1.MechParams.AesCBC;
        this.iv = iv;
        this.data = data;
    }
    AesCbcParams.prototype.toCKI = function () {
        return this.iv;
    };
    return AesCbcParams;
}());
exports.AesCbcParams = AesCbcParams;
