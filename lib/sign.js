var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Utils = common.Utils;
var Enums = common.Enums;
var Debug = common.Debug;

var SessionObject = require('./session_object');

var MAX_SIGNATURE_LEN = 2048;

function Sign(session) {
	Object.defineProperty(this, "cki", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "session", {
		writable: true,
		enumerable: false
	})
	this.session = session;
	this.cki = session.cki;
	this.isIitialized = false;
}

function getMechanismByName(algName) {
	if (!Type.isString(algName))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "String"));
	algName = algName.toUpperCase();
	if (algName in Enums.Mechanism)
		return Enums.Mechanism[algName];
	throw new Error("Unknown algorithm name in use");
}

function checkInit(i) {
	if (!i)
		throw new Error("Sign is not initialized");
}

Sign.prototype.init = function init(algName, key) {
	if (!(key instanceof SessionObject))
		throw new TypeError(Utils.printf(ERROR.TYPE, 2, "SessionObject"))
	Debug("Sign init", algName);
	var mech_type = getMechanismByName(algName);
	var mech = new CKI.CK_MECHANISM({
		mechanism: mech_type,
		pParameter: null,
		ulParameterLen: 0
	});

	Debug("C_SignInit");
	var res = this.cki.C_SignInit(this.session.handle, mech.ref(), key.handle);
	Utils.check_cki_res(res, "C_SignInit");
	this.isInitialized = true;
}

Sign.prototype.update = function update(data) {
	checkInit(this.isInitialized);

	if (Type.isString(data)) {
		//Wrap data to Buffer
		data = new Buffer(data);
	}
	if (!Buffer.isBuffer(data))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Buffer"));

	Debug("C_SignUpdate");
	var res = this.cki.C_SignUpdate(this.session.handle, data, data.length);
	Utils.check_cki_res(res, "C_SignUpdate");
}

Sign.prototype.final = function final() {
	checkInit(this.isInitialized);

	var hash = new Buffer(MAX_SIGNATURE_LEN);
	var $bufLen = new Buffer(4);
	$bufLen.writeUInt32LE(MAX_SIGNATURE_LEN, 0);

	Debug("C_SignFinal");
	var res = this.cki.C_SignFinal(this.session.handle, hash, $bufLen);
	Utils.check_cki_res(res, "C_SignFinal");

	$bufLen.type = Ref.types.int;

	this.isInitialized = false;
	var bufLen = Ref.deref($bufLen);
	return hash.slice(0, bufLen);
}

module.exports = Sign;