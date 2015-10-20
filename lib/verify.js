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

var MAX_SIGNATURE_LEN = 2048;

function Verify(session) {
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
		throw new Error("Verify is not initialized");
}

Verify.prototype.init = function init(algName, key) {
	if (!(key instanceof SessionObject))
		throw new TypeError(Utils.printf(ERROR.TYPE, 2, "SessionObject"))
	Debug("Verify init", algName);
	var mech = MechanismInfo.create(algName);

	Debug("C_VerifyInit");
	var res = this.cki.C_VerifyInit(this.session.handle, mech.ref(), key.handle);
	Utils.check_cki_res(res, "C_VerifyInit");
	this.isInitialized = true;
}

Verify.prototype.update = function update(data) {
	checkInit(this.isInitialized);

	if (Type.isString(data)) {
		//Wrap data to Buffer
		data = new Buffer(data);
	}
	if (!Buffer.isBuffer(data))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Buffer"));

	Debug("C_VerifyUpdate");
	var res = this.cki.C_VerifyUpdate(this.session.handle, data, data.length);
	Utils.check_cki_res(res, "C_VerifyUpdate");
}

Verify.prototype.final = function final(signature) {
	checkInit(this.isInitialized);

	Debug("C_VerifyFinal");
	var res = this.cki.C_VerifyFinal(this.session.handle, signature, signature.length);
	if (res !== Enums.CryptokiResult.SignatureInvalid)
		Utils.check_cki_res(res, "C_VerifyFinal");
	
	return res == 0;
}

module.exports = Verify;