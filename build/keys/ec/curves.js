"use strict";
var namedCurves = [
    { name: "secp160r1", oid: "1.3.132.0.8", value: new Buffer("06052b81040008", "hex"), size: 160 },
    { name: "secp192r1", oid: "1.2.840.10045.3.1.1", value: new Buffer("06082A8648CE3D030101", "hex"), size: 192 },
    { name: "secp256r1", oid: "1.2.840.10045.3.1.7", value: new Buffer("06082A8648CE3D030107", "hex"), size: 256 },
    { name: "secp384r1", oid: "1.3.132.0.34", value: new Buffer("06052B81040022", "hex"), size: 384 },
    { name: "secp521r1", oid: "1.3.132.0.35", value: new Buffer("06052B81040023", "hex"), size: 521 },
    { name: "prime192r1", oid: "1.2.840.10045.3.1.1", value: new Buffer("06082A8648CE3D030101", "hex"), size: 192 },
    { name: "prime256v1", oid: "1.2.840.10045.3.1.7", value: new Buffer("06082A8648CE3D030107", "hex"), size: 256 },
    { name: "prime384v1", oid: "1.3.132.0.34", value: new Buffer("06052B81040022", "hex"), size: 384 },
    { name: "ansiX9p192r1", oid: "1.2.840.10045.3.1.1", value: new Buffer("06082A8648CE3D030101", "hex"), size: 192 },
    { name: "ansiX9p256r1", oid: "1.2.840.10045.3.1.7", value: new Buffer("06082A8648CE3D030107", "hex"), size: 256 },
    { name: "ansiX9p384r1", oid: "1.3.132.0.34", value: new Buffer("06052B81040022", "hex"), size: 384 },
    { name: "brainpoolP192r1", oid: "1.3.36.3.3.2.8.1.1.3", value: new Buffer("06092B2403030208010103", "hex"), size: 192 },
    { name: "brainpoolP224r1", oid: "1.3.36.3.3.2.8.1.1.5", value: new Buffer("06092B2403030208010105", "hex"), size: 224 },
    { name: "brainpoolP256r1", oid: "1.3.36.3.3.2.8.1.1.7", value: new Buffer("06092B2403030208010107", "hex"), size: 256 }
];
var NamedCurve = (function () {
    function NamedCurve() {
    }
    NamedCurve.getByName = function (name) {
        for (var i in namedCurves) {
            var nc = namedCurves[i];
            if (nc.name === name)
                return nc;
        }
        throw new Error("Can not find named curve by name '" + name + "'");
    };
    NamedCurve.getByOid = function (oid) {
        for (var i in namedCurves) {
            var nc = namedCurves[i];
            if (nc.oid === oid)
                return nc;
        }
        throw new Error("Can not find named curve by oid '" + oid + "'");
    };
    return NamedCurve;
}());
exports.NamedCurve = NamedCurve;
