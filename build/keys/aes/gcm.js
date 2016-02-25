var pkcs11 = require("../../pkcs11");
var AesGcmParams = (function () {
    function AesGcmParams(iv, aad, tagBits) {
        if (aad === void 0) { aad = null; }
        if (tagBits === void 0) { tagBits = 128; }
        this.iv = iv;
        this.aad = aad;
        this.tagBits = tagBits;
    }
    AesGcmParams.prototype.toCKI = function () {
        return new pkcs11.CK_GCM_PARAMS({
            pIv: this.iv,
            ulIvLen: this.iv.length,
            ulIvBits: this.iv.length * 8,
            pAAD: this.aad,
            ulADDLen: (this.aad) ? this.aad.length : 0,
            ulTagBits: this.tagBits
        })["ref.buffer"];
    };
    return AesGcmParams;
})();
exports.AesGcmParams = AesGcmParams;
