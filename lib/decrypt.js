var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Utils = common.Utils;
var Enums = common.Enums;
var Debug = common.Debug;

var MechanismInfo = require('./mechanism_info');
var SessionObject = require('./session_object');

var MAX_BUFFER_LEN = 1024 * 64;
var MAX_ENCRYPT_LEN = 1024 * 64 + 1024;

function Decrypt(session) {
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

function checkInit(i) {
	if (!i)
		throw new Error("Decrypt is not initialized");
}

Decrypt.prototype.init = function init(algName, key) {
	if (!(key instanceof SessionObject))
		throw new TypeError(Utils.printf(ERROR.TYPE, 2, "SessionObject"))
	Debug("Decrypt init", algName);
	var mech = MechanismInfo.create(algName);

	Debug("C_DecryptInit");
	var res = this.cki.C_DecryptInit(this.session.handle, mech.ref(), key.handle);
	Utils.check_cki_res(res, "C_DecryptInit");
	this.isInitialized = true;
}

Decrypt.prototype.update = function update(data) {
	checkInit(this.isInitialized);

	if (Type.isString(data)) {
		//Wrap data to Buffer
		data = new Buffer(data);
	}
	if (!Buffer.isBuffer(data))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Buffer"));

	var _enc = new Buffer(MAX_ENCRYPT_LEN);
	var $encLen = new Buffer(4);
	$encLen.writeUInt32LE(MAX_ENCRYPT_LEN, 0);
	Debug("C_DecryptUpdate");
	var res = this.cki.C_DecryptUpdate(this.session.handle, data, data.length, _enc, $encLen);
	Utils.check_cki_res(res, "C_DecryptUpdate");	
		
	//get enc length
	$encLen.type = Ref.types.int;

	var encLen = Ref.deref($encLen);
	return _enc.slice(0, encLen);
}

Decrypt.prototype.final = function final() {
	checkInit(this.isInitialized);

	var _enc = new Buffer(MAX_ENCRYPT_LEN);
	var $encLen = new Buffer(4);
	$encLen.writeUInt32LE(MAX_ENCRYPT_LEN, 0);

	Debug("C_DecryptFinal");
	var res = this.cki.C_DecryptFinal(this.session.handle, _enc, $encLen);
	Utils.check_cki_res(res, "C_DecryptFinal");

	$encLen.type = Ref.types.int;

	this.isInitialized = false;
	var encLen = Ref.deref($encLen);
	return _enc.slice(0, encLen);
}

module.exports = Decrypt;