"use strict";
var params_1 = require("../params");
var EcdhParams = (function () {
    function EcdhParams(kdf, sharedData, publicData) {
        if (sharedData === void 0) { sharedData = new Buffer(0); }
        if (publicData === void 0) { publicData = new Buffer(0); }
        this.type = params_1.MechParams.EcDH;
        this.kdf = kdf;
        this.sharedData = sharedData;
        this.publicData = publicData;
    }
    EcdhParams.prototype.toCKI = function () {
        return this;
    };
    return EcdhParams;
}());
exports.EcdhParams = EcdhParams;
