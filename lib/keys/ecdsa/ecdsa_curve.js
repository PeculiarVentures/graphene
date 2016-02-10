var common = require('../../common');

var Type = common.Type;

var namedCurves = [
	{ name: "secp192r1", oid: "1.2.840.10045.3.1.1", value: "06082A8648CE3D030101", size: 192 },
	{ name: "secp256r1", oid: "1.2.840.10045.3.1.7", value: "06082A8648CE3D030107", size: 256 },
	{ name: "secp384r1", oid: "1.3.132.0.34", value: "06052B81040022", size: 384 },
	{ name: "secp521r1", oid: "1.3.132.0.35", value: "06052B81040023", size: 521 },
	{ name: "prime192r1", oid: "1.2.840.10045.3.1.1", value: "06082A8648CE3D030101", size: 192 },
	{ name: "prime256v1", oid: "1.2.840.10045.3.1.7", value: "06082A8648CE3D030107", size: 256 },
	{ name: "prime384v1", oid: "1.3.132.0.34", value: "06052B81040022", size: 384 },
	{ name: "ansiX9p192r1", oid: "1.2.840.10045.3.1.1", value: "06082A8648CE3D030101", size: 192 },
	{ name: "ansiX9p256r1", oid: "1.2.840.10045.3.1.7", value: "06082A8648CE3D030107", size: 256 },
	{ name: "ansiX9p384r1", oid: "1.3.132.0.34", value: "06052B81040022", size: 384 },
	{ name: "brainpoolP192r1", oid: "1.3.36.3.3.2.8.1.1.3", value: "06092B2403030208010103", size: 192 },
	{ name: "brainpoolP224r1", oid: "1.3.36.3.3.2.8.1.1.5", value: "06092B2403030208010105", size: 224 },
	{ name: "brainpoolP256r1", oid: "1.3.36.3.3.2.8.1.1.7", value: "06092B2403030208010107", size: 256 }
]

function isOID(str) {
	var reg = /^(0|1|2)(\.\d+)+$/;
	return reg.test(str);
}

function isHEX(str) {
	var reg = /^([a-z0-9])+$/i;
	return reg.test(str);
}

function getOID(oid) {
	var res = null;
	for (var i in namedCurves) {
		var item = namedCurves[i];
		if (item.oid === oid) {
			res = item;
			break;
		}
	}
	return res
}

function getName(name) {
	var res = null;
	for (var i in namedCurves) {
		var item = namedCurves[i];
		if (item.name === name) {
			res = item;
			break;
		}
	}
	return res
}

function getHEX(hex) {
	var res = null;
    var _hex = hex.toLowerCase();
	for (var i in namedCurves) {
		var item = namedCurves[i];
		if (item.value.toLocaleLowerCase() === _hex) {
			res = item;
			break;
		}
	}
	return res
}

var NamedCurves = {
	getValue: function (v) {
		var obj = null;
		if (isOID(v)) {
			obj = getOID(v);
			if (!obj)
				throw new Error("Can not find 'namedCurve' by OID value '" + v + "'");
		}
        else if(isHEX(v)){
            obj = getHEX(v);
			if (!obj)
				throw new Error("Can not find 'namedCurve' by HEX value '" + v + "'");
        }
		else {
			var _v = v.toLowerCase();
			obj = getName(_v);
			if (!obj)
				throw new Error("Can not find 'namedCurve' by name '" + v + "'");
		}
		return obj;
	}
}

module.exports = NamedCurves;