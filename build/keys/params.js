"use strict";
(function (MechParams) {
    MechParams[MechParams["AesCBC"] = 1] = "AesCBC";
    MechParams[MechParams["AesCCM"] = 2] = "AesCCM";
    MechParams[MechParams["AesGCM"] = 3] = "AesGCM";
    MechParams[MechParams["RsaOAEP"] = 4] = "RsaOAEP";
    MechParams[MechParams["RsaPSS"] = 5] = "RsaPSS";
    MechParams[MechParams["EcDH"] = 6] = "EcDH";
})(exports.MechParams || (exports.MechParams = {}));
var MechParams = exports.MechParams;
