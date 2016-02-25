var pkcs11 = require("../../pkcs11");
var AesCcmParams = (function () {
    function AesCcmParams(dataLength, nonce, aad, macLength) {
        if (aad === void 0) { aad = null; }
        if (macLength === void 0) { macLength = 0; }
        this.dataLength = dataLength;
        this.nonce = nonce;
        this.aad = aad;
        this.macLength = macLength;
    }
    AesCcmParams.prototype.toCKI = function () {
        return new pkcs11.CK_GCM_PARAMS({
            ulDataLen: this.dataLength,
            pNonce: this.nonce,
            ulNonceLen: this.nonce.length,
            pAAD: this.aad,
            ulADDLen: (this.aad) ? this.aad.length : 0,
            ulMACLen: this.macLength
        })["ref.buffer"];
    };
    return AesCcmParams;
})();
exports.AesCcmParams = AesCcmParams;
