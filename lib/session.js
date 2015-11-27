var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Enums = common.Enums;
var Utils = common.Utils;
var Debug = common.Debug;

var SessionObject = require('./session_object');
var Digest = require('./digest');
var Sign = require('./sign');
var Verify = require('./verify');
var Encrypt = require('./encrypt');
var Decrypt = require('./decrypt');
var Key = require('./keys/key');

//Keys
var RSA = require('./keys/RSA/rsa');

function Session(slotInfo) {
	Object.defineProperty(this, "cki", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "handle", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "slotInfo", {
		writable: true,
		enumerable: false
	})
	this.cki = slotInfo.cki;
	this.slotInfo = slotInfo;
	this.handle = null;
}

Session.prototype.isStarted = function isStarted() {
	return !Type.isNull(this.handle);
}

Session.prototype.isLogged = function isLogged() {
	return this.logged == true;
}

Session.prototype.stop = function () {
	if (!Type.isNull(this.handle)) {
		Debug("C_CloseSession");
		var res = this.cki.C_CloseSession(this.handle);
		Utils.check_cki_res(res, "C_CloseSession");
		this.handle = null;
	}
	this.slotInfo.session = false;
}

Session.prototype.getInfo = function () {
	if (!this.isStarted()) {
		throw new Error(Utils.printf(ERROR.SESSION_NOT_STARTED));
	}
	var info = new CKI.CK_SESSION_INFO();
	Debug('C_CloseSession');
	var res = this.cki.C_GetSessionInfo(this.handle, info.ref());
	Utils.check_cki_res(res, "C_GetSessionInfo");
    return {
		slotID: info.slotID,
		state: info.state,
		flags: info.flags,
		ulDeviceError: info.ulDeviceError,
		"type": "sessionInfo"
	};
}

Session.prototype.login = function (pin, utype) {
	if (Type.isUndefined(utype)) {
		utype = CKI.CKU_USER;
	}
	if (pin && !Type.isString(pin))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "String"));

	if (!this.isStarted())
		throw new Error(Utils.printf(ERROR.SESSION_NOT_STARTED));
	pin = pin ? pin : null;
	var pinLen = pin ? pin.length : 0;
	//Loggout if session is logged
	if (this.isLogged()) {
		this.logout();
	}
	Debug('C_Login');
	var res = this.cki.C_Login(this.handle, utype, pin, pinLen);
	Utils.check_cki_res(res, "C_Login");
	this.logged = true;
}

Session.prototype.logout = function () {
	if (!this.isStarted())
		throw new Error(Utils.printf(ERROR.SESSION_NOT_STARTED));
	Debug('C_Logout');
	var res = this.cki.C_Logout(this.handle);
	Utils.check_cki_res(res, "C_Logout");
	this.logged = false;
}

Session.start = function (slotInfo, flags) {
	var session = new Session(slotInfo);
	session.start(flags);
	return session;
}

Session.prototype.start = function (flags) {
	if (Type.isNull(this.handle)) {
		if (Type.isUndefined(flags))
			flags = CKI.CKF_SERIAL_SESSION;
		var $sessionID = Ref.alloc(CKI.CK_SESSION_HANDLE);
		Debug("C_OpenSession");
		var res = this.cki.C_OpenSession(this.slotInfo.handle, flags, null, null, $sessionID);
		Utils.check_cki_res(res, "C_OpenSession");
		this.handle = Ref.deref($sessionID)
		this.slotInfo.session = this;
	}
}

Session.prototype.destroyObject = function DestroyObject(obj) {
	if (Type.isEmpty(obj))
		throw new Error(Utils.printf(ERROR.REQUIRED, 1));

	Debug("C_DestroyObject");
	var res = this.cki.C_DestroyObject(this.handle, obj.handle);
	Utils.check_cki_res(res, "C_DestroyObject");
}

Session.prototype.findObjects = function () {
	if (!this.isStarted())
		throw new Error(Utils.printf(ERROR.SESSION_NOT_STARTED));
	var hSession = this.handle;
	//CK_OBJECT_HANDLE hObject;
	//CK_ULONG ulObjectCount;
	var $hObject = Ref.alloc(CKI.CK_OBJECT_HANDLE);
	var $pulCount = Ref.alloc(CKI.CK_ULONG);
	//CK_RV rv;
	
	Debug("C_FindObjectsInit");
	var res = this.cki.C_FindObjectsInit(hSession, null, 0);
	Utils.check_cki_res(res, "C_FindObjectsInit");
	var objects = [];
	while (1) {
		Debug("C_FindObjects");
		res = this.cki.C_FindObjects(hSession, $hObject, 1, $pulCount);
		Utils.check_cki_res(res, "C_FindObjects");
		var pulCount = Ref.deref($pulCount);
		var hObject = Ref.deref($hObject);
		if (res !== 0 || pulCount == 0)
			break;
		objects.push(new SessionObject(this, hObject));
	}

	Debug("C_FindObjectsFinal");
	res = this.cki.C_FindObjectsFinal(hSession);
	Utils.check_cki_res(res, "C_FindObjectsInit");
	return objects;
}

Session.prototype.createDigest = function createDigest(algName) {
	var digest = new Digest(this);
	digest.init(algName);
	return digest;
}

Session.prototype.createSign = function createSign(algName, key) {

	var sign = new Sign(this);
	sign.init(algName, key);
	return sign;
}

Session.prototype.createVerify = function createVerify(algName, key) {
	var verify = new Verify(this);
	verify.init(algName, key);
	return verify;
}

Session.prototype.createEncrypt = function createEncrypt(algName, key) {
	var encrypt = new Encrypt(this);
	encrypt.init(algName, key);
	return encrypt;
}

Session.prototype.createDecrypt = function createDecrypt(algName, key) {
	var decrypt = new Decrypt(this);
	decrypt.init(algName, key);
	return decrypt;
}

/* Random number generation */

function _random(fnName, hSession, buf, len) {
	if (!buf)
		buf = new Buffer(len);
	Debug(fnName);
	var res = this.cki[fnName](this.handle, buf, buf.length);
	Utils.check_cki_res(res, fnName);
	return buf;
}

/**
 * Mixes additional seed material into the token's random number generator
 */
Session.prototype.seedRandom = function SeedRandom(buf) {
	return _random.call(this, "C_SeedRandom", this.handle, buf, buf.length);
};

/**
 * Generates random or pseudo-random data
 */
Session.prototype.generateRandom = function GenerateRandom(len) {
	return _random.call(this, "C_GenerateRandom", this.handle, null, len);
};

function getMechanismByName(algName) {
	if (!Type.isString(algName))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "String"));
	algName = algName.toUpperCase();
	if (algName in Enums.Mechanism)
		return Enums.Mechanism[algName];
	throw new Error("Unknown algorithm name in use");
}

/* Key management */
Session.prototype.generateKey = function GenerateKey(algName, obj) {
	var mech_type = getMechanismByName(algName);
	var mech = new CKI.CK_MECHANISM({
		mechanism: mech_type,
		pParameter: null,
		ulParameterLen: 0
	});

	var buf = object_to_template(obj);
	var bufLen = Object.keys(obj).length;

	var $hObject = Ref.alloc(CKI.CK_ULONG);

	Debug('C_GenerateKey');
	var res = this.cki.C_GenerateKey(this.handle, mech.ref(), buf, bufLen, $hObject);
	Utils.check_cki_res(res, 'C_GenerateKey');

	var hObject = Ref.deref($hObject);
	return new Key(this, hObject);
}

Session.prototype.generateKeyPair = function GenerateKeyPair(algName, pukParams, prkParams) {
	var mech_type = getMechanismByName(algName);
	var mech = new CKI.CK_MECHANISM({
		mechanism: mech_type,
		pParameter: null,
		ulParameterLen: 0
	});

	//public key template
	var bufPuk = object_to_template(pukParams);
	var bufPukLen = Object.keys(pukParams).length;
	
	//private key template
	var bufPrk = object_to_template(prkParams);
	var bufPrkLen = Object.keys(prkParams).length;

	var $hPuk = Ref.alloc(CKI.CK_ULONG);
	var $hPrk = Ref.alloc(CKI.CK_ULONG);

	Debug('C_GenerateKeyPair');
	var res = this.cki.C_GenerateKeyPair(this.handle, mech.ref(), bufPuk, bufPukLen, bufPrk, bufPrkLen, $hPuk, $hPrk);
	Utils.check_cki_res(res, 'C_GenerateKeyPair');

	var hPuk = Ref.deref($hPuk);
	var hPrk = Ref.deref($hPrk);
	return {
		"public": new Key(this, hPuk),
		"private": new Key(this, hPrk)
	}
}

function attribute_create(t, v, l) {
	return (new CKI.CK_ATTRIBUTE({ type: t, pValue: v, ulValueLen: l })).ref()
}

function object_to_template(obj) {
	if (!Type.isObject(obj))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Object"));
	var tpl = [];
	for (var i in obj) {
		var at = Enums.Attribute[i];
		if (at) {
			if (!Type.isEmpty(at.v) && at.t) {
				var val = prepare_value_in(i, at, obj[i]);
				var attr = attribute_create(at.v, val, val.length);
				tpl.push(attr);
			}
			else
				throw new TypeError(Utils.printf('"%1" attribute is not supported', i));
		}
		else
			throw new Error(Utils.printf('"%1" attribute is not founded', i));
	}
	if (!tpl.length)
		throw new Error('Template hasn\'t got any attributes');
	return Buffer.concat(tpl);
}

function prepare_value_in(an, at, v) {
	var buf;
	switch (at.t) {
		case "ulong":
			if (!Type.isNumber(v))
				throw new TypeError(Utils.printf(ERROR.TYPE, 3, "Number"));
			var s = Utils.size_of(at.t);
			buf = new Buffer(s);
			if (s == 8)
				buf.writeUInt64LE(v, 0);
			else
				buf.writeUInt32LE(v, 0);
			break;
		case "bool":
			buf = new Buffer([v == 1]);
			break;
		case "utf8":
			if (!Type.isString(v))
				throw new TypeError(Utils.printf(ERROR.TYPE, 3, "String"));
			buf = new Buffer(v, 'utf8');
			break;
		case "array":
			if (!Buffer.isBuffer(v))
				throw new TypeError(Utils.printf(ERROR.TYPE, 3, "Buffer"));
			buf = v;
			break;
		case "date":
			throw new Error('Not supported in this implementation');
			break;
		default:
			throw new TypeError(Utils.printf("Unknown type '%1' in enum Attribute value '%2'.", at.t, an));
	}
	return buf;
}

//Crypto operations
/**
 * Creates signature for data
 */
Session.prototype.sign = function sign(key, alg, data) {
	var signer = this.createSign(alg, key);
	signer.update(data);
	return signer.final();
}

/**
 * Verifies signature for data
 */
Session.prototype.verify = function verify(key, alg, signature, data) {
	var verifier = this.createVerify(alg, key);
	verifier.update(data);
	return verifier.final(signature);
}

/**
 * Encrypt data
 */
Session.prototype.encrypt = function encrypt(key, alg, data) {
	var cipher = this.createEncrypt(alg, key);
	var msg = new Buffer(0);
	msg = Buffer.concat([msg, cipher.update(data)]);
	msg = Buffer.concat([msg, cipher.final()]);
	return msg;
}

/**
 * Decrypt data
 */
Session.prototype.decrypt = function decrypt(key, alg, data) {
	var decipher = this.createDecrypt(alg, key);
	var msg = new Buffer(0);
	msg = Buffer.concat([msg, decipher.update(data)]);
	msg = Buffer.concat([msg, decipher.final()]);
	return msg;
}

Session.prototype.generateRSA = function generateRSA(props) {
	return RSA.generate(this, props);
}

module.exports = Session;