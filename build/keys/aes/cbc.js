"use strict";
var core = require("../../core");
var pkcs11 = require("../../pkcs11");
var IvArray = core.RefArray(pkcs11.CK_BYTE, 16);
var AesCbcParams = (function () {
    function AesCbcParams(iv, data) {
        this.iv = iv;
        this.data = data;
    }
    AesCbcParams.prototype.toCKI = function () {
        var arIv = [];
        for (var i = 0; i < this.iv.length; i++)
            arIv.push(this.iv[i]);
        return new pkcs11.CK_AES_CBC_ENCRYPT_DATA_PARAMS({
            iv: arIv,
            pData: this.data,
            length: (this.data) ? this.data.length : 0
        })["ref.buffer"];
    };
    return AesCbcParams;
}());
exports.AesCbcParams = AesCbcParams;
