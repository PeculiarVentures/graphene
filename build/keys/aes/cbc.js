"use strict";
var params_1 = require("../params");
var AesCbcParams = (function () {
    function AesCbcParams(iv, data) {
        if (data === void 0) { data = new Buffer(0); }
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
