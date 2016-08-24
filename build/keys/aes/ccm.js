"use strict";
var params_1 = require("../params");
var AesCcmParams = (function () {
    function AesCcmParams(dataLength, nonce, aad, macLength) {
        if (aad === void 0) { aad = null; }
        if (macLength === void 0) { macLength = 0; }
        this.type = params_1.MechParams.AesCCM;
        this.dataLength = dataLength;
        this.nonce = nonce;
        this.aad = aad;
        this.macLength = macLength;
    }
    AesCcmParams.prototype.toCKI = function () {
        return {
            aad: this.aad,
            dataLen: this.dataLength,
            macLen: this.macLength,
            nonce: this.nonce,
            type: this.type
        };
    };
    return AesCcmParams;
}());
exports.AesCcmParams = AesCcmParams;
