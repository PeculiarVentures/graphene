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

var MAX_BUFFER_LEN = 200;
var MAX_ENCRYPT_LEN = 256;

function Encrypt(session) {
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
		throw new Error("Encrypt is not initialized");
}

Encrypt.prototype.init = function init(algName, key) {
	if (!(key instanceof SessionObject))
		throw new TypeError(Utils.printf(ERROR.TYPE, 2, "SessionObject"))
	Debug("Encrypt init", algName);
	var mech = MechanismInfo.create(algName);

	Debug("C_EncryptInit");
	var res = this.cki.C_EncryptInit(this.session.handle, mech.ref(), key.handle);
	Utils.check_cki_res(res, "C_EncryptInit");
	this.isInitialized = true;
}

Encrypt.prototype.update = function update(data) {
	checkInit(this.isInitialized);

	if (Type.isString(data)) {
		//Wrap data to Buffer
		data = new Buffer(data);
	}
	if (!Buffer.isBuffer(data))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Buffer"));

	if (data.length > MAX_BUFFER_LEN) {
		//Slit data to blocks
		var _encBuf = new Buffer(0);
		for (var i = 0; i <= data.length; i + MAX_BUFFER_LEN) {
			var _data = data.split(i, i + MAX_BUFFER_LEN);
			_encBuf = Buffer.concat([
				_encBuf,
				this.update(_data)
			]);
		}
		return _encBuf;
	}
	else {
		var _enc = new Buffer(MAX_ENCRYPT_LEN);
		var $encLen = new Buffer(4);
		$encLen.writeUInt32LE(MAX_ENCRYPT_LEN, 0);
		Debug("C_EncryptUpdate");
		var res = this.cki.C_EncryptUpdate(this.session.handle, data, data.length, _enc, $encLen);
		Utils.check_cki_res(res, "C_EncryptUpdate");	
		
		//get enc length
		$encLen.type = Ref.types.int;

		var encLen = Ref.deref($encLen);
		return _enc.slice(0, encLen);
	}
}

Encrypt.prototype.final = function final() {
	checkInit(this.isInitialized);

	var _enc = new Buffer(MAX_ENCRYPT_LEN);
	var $encLen = new Buffer(4);
	$encLen.writeUInt32LE(MAX_ENCRYPT_LEN, 0);

	Debug("C_EncryptFinal");
	var res = this.cki.C_EncryptFinal(this.session.handle, _enc, $encLen);
	Utils.check_cki_res(res, "C_EncryptFinal");

	$encLen.type = Ref.types.int;

	this.isInitialized = false;
	var encLen = Ref.deref($encLen);
	return _enc.slice(0, encLen);
}

module.exports = Encrypt;