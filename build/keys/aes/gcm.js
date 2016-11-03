"use strict";
var params_1 = require("../params");
var AesGcmParams = (function () {
    function AesGcmParams(iv, aad, tagBits) {
        if (aad === void 0) { aad = new Buffer(0); }
        if (tagBits === void 0) { tagBits = 128; }
        this.type = params_1.MechParams.AesGCM;
        this.iv = iv;
        this.aad = aad;
        this.tagBits = tagBits;
    }
    AesGcmParams.prototype.toCKI = function () {
        return {
            iv: this.iv,
            ivBits: this.iv.length * 8,
            aad: this.aad,
            tagBits: this.tagBits,
            type: this.type
        };
    };
    return AesGcmParams;
}());
exports.AesGcmParams = AesGcmParams;
