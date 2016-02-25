var pkcs11 = require("../../pkcs11");
var EcdhParams = (function () {
    function EcdhParams(kdf, sharedData, publicData) {
        if (sharedData === void 0) { sharedData = null; }
        if (publicData === void 0) { publicData = null; }
        this.kdf = kdf;
        this.sharedData = sharedData;
        this.publicData = publicData;
    }
    EcdhParams.prototype.toCKI = function () {
        return new pkcs11.CK_ECDH1_DERIVE_PARAMS({
            kdf: this.kdf,
            ulSharedDataLen: (this.sharedData) ? this.sharedData.length : 0,
            pSharedData: this.sharedData,
            ulPublicDataLen: (this.publicData) ? this.publicData.length : 0,
            pPublicData: this.publicData
        })["ref.buffer"];
    };
    return EcdhParams;
})();
exports.EcdhParams = EcdhParams;
