var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Enums = common.Enums;
var Utils = common.Utils;
var Debug = common.Debug;

function MechanismInfo(slotInfo, t) {
	Object.defineProperty(this, "cki", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "handle", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "slot", {
		writable: true,
		enumerable: false
	})
	this.slot = slotInfo;
	this.cki = this.slot.cki;
	this.handle = +t.toString();
	this.name = getName(this.handle);
	this.getInfo();
}

function getName(t) {
	if (Enums.Mechanism.hasValue(t)) {
		return Enums.Mechanism.getText(t)
	}
	return String(t);
}

MechanismInfo.prototype.getInfo = function () {
	var info = new CKI.CK_MECHANISM_INFO();
	Debug("C_GetMechanismInfo");
	var res = this.cki.C_GetMechanismInfo(this.slot.handle, this.handle, info.ref());
	Utils.check_cki_res(res, "C_GetMechanismInfo");
	this.minKeySize = info.ulMinKeySize;
	this.maxKeySize = info.ulMaxKeySize;
	this.flags = info.flags;
    return {
		ulMinKeySize: info.ulMinKeySize,
		ulMaxKeySize: info.ulMaxKeySize,
		flags: info.flags,
		"type": "mechanismInfo"
	};
}

/**
 * True if the mechanism is performed by the device; false if the mechanism is performed in software
 */
MechanismInfo.prototype.isHardware = function isHardware() {
	return Type.isFlag(this.flags, CKI.CKF_HW);
}

/**
 * True if the mechanism can be used with C_EncryptInit
 */
MechanismInfo.prototype.isEncrypt = function isEncrypt() {
	return Type.isFlag(this.flags, CKI.CKF_ENCRYPT);
}

/**
 * True if the mechanism can be used with C_DecryptInit
 */
MechanismInfo.prototype.isDecrypt = function isDecrypt() {
	return Type.isFlag(this.flags, CKI.CKF_DECRYPT);
}

/**
 * True if the mechanism can be used with C_DigestInit
 */
MechanismInfo.prototype.isDigest = function isDigest() {
	return Type.isFlag(this.flags, CKI.CKF_DIGEST);
}

/**
 * True if the mechanism can be used with C_SignInit
 */
MechanismInfo.prototype.isSign = function isSign() {
	return Type.isFlag(this.flags, CKI.CKF_SIGN);
}

/**
 * True if the mechanism can be used with C_SignRecoverInit
 */
MechanismInfo.prototype.isSignRecover = function isSignRecover() {
	return Type.isFlag(this.flags, CKI.CKF_SIGN_RECOVER);
}

/**
 * True if the mechanism can be used with C_VerifyInit
 */
MechanismInfo.prototype.isVerify = function isVerify() {
	return Type.isFlag(this.flags, CKI.CKF_VERIFY);
}

/**
 * True if the mechanism can be used with C_VerifyRecoverInit
 */
MechanismInfo.prototype.isVerifyRecover = function isVerifyRecover() {
	return Type.isFlag(this.flags, CKI.CKF_VERIFY_RECOVER);
}

/**
 * True if the mechanism can be used with C_GenerateKey
 */
MechanismInfo.prototype.isGenerateKey = function isGenerateKey() {
	return Type.isFlag(this.flags, CKI.CKF_GENERATE);
}

/**
 * True if the mechanism can be used with C_GenerateKeyPair
 */
MechanismInfo.prototype.isGenerateKeyPair = function isGenerateKeyPair() {
	return Type.isFlag(this.flags, CKI.CKF_GENERATE_KEY_PAIR);
}

/**
 * True if the mechanism can be used with C_WrapKey
 */
MechanismInfo.prototype.isWrap = function isWrap() {
	return Type.isFlag(this.flags, CKI.CKF_WRAP);
}

/**
 * True if the mechanism can be used with C_UnwrapKey
 */
MechanismInfo.prototype.isUnwrap = function isUnwrap() {
	return Type.isFlag(this.flags, CKI.CKF_UNWRAP);
}

/**
 * True if the mechanism can be used with C_DeriveKey
 */
MechanismInfo.prototype.isDerive = function isDerive() {
	return Type.isFlag(this.flags, CKI.CKF_DERIVE);
}

/**
 * True if there is an extension to the flags; false if no extensions. Must be false for this version.
 */
MechanismInfo.prototype.isExtension = function isExtension() {
	return Type.isFlag(this.flags, CKI.CKF_EXTENSION);
}

function getMechanismByName(algName) {
	if (!Type.isString(algName))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "String"));
	algName = algName.toUpperCase();
	if (algName in Enums.Mechanism)
		return Enums.Mechanism[algName];
	throw new Error("Unknown algorithm name in use");
}

MechanismInfo.create = function create(alg) {
	var res = null;
	if (Type.isEmpty(alg))
		throw new TypeError(Utils.printf(ERROR.REQUIRED, 1));

	if (Type.isString(alg)) {
		alg = { name: alg, params: null };
	}

	if (!Type.isObject(alg))
		throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Object"));

	if (!alg.name)
		throw new TypeError(Utils.printf("Parameter %1 must have attribute name", 1));

	var hAlg = getMechanismByName(alg.name);
	
	var pParams = null;
	if (alg.params){
		if (alg.params.toCKI)
			//Convert object with toCKI to Buffer
			pParams = alg.params.toCKI().ref();
		else
			pParams = alg.params;
	}

	res = new CKI.CK_MECHANISM({
		mechanism: hAlg,
		pParameter: pParams,
		ulParameterLen: pParams ? pParams.length : 0
	});
	return res;
}

module.exports = MechanismInfo;