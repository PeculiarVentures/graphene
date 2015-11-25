var common = require('../common');
var util = require('util');

var CKI = common.CKI;
var Enums = common.Enums;

var SessionObject = require('./session_object');

function Key(session, handle) {
	Object.defineProperty(this, "cki", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "handle", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "session", {
		writable: true,
		enumerable: false
	})
	this.session = session
	this.cki = session.cki;
	this.handle = handle;
}
util.inherits(Key, SessionObject);

//----- Key objects -----
/**
 * Type of key
 */
Key.prototype.getType = function getType() {
	return this.getNumberAttribute(CKI.CKA_KEY_TYPE);
}

/**
 * Key identifier for key (default empty)
 */
Key.prototype.getId = function getId() {
	return this.getBinaryAttribute(CKI.CKA_ID);
}

/**
 * CK_TRUE if key supports key derivation (i.e., if other keys can be derived from this one (default CK_FALSE)
 */
Key.prototype.isDerived = function isDerived() {
	return this.getBooleanAttribute(CKI.CKA_DERIVE);
}

/**
 * CK_TRUE only if key was either * generated locally (i.e., on the token) 
 * with a C_GenerateKey or C_GenerateKeyPair call * created with a C_CopyObject call 
 * as a copy of a key which had its CKA_LOCAL attribute set to CK_TRUE
 */
Key.prototype.isLocal = function isLocal() {
	return this.getBooleanAttribute(CKI.CKA_LOCAL);
}

/**
 * Start date for the key (default empty)
 */
Key.prototype.getStartDate = function getStartDate() {
	return this.getBinaryAttribute(CKI.CKA_START_DATE);
}

/**
 * End date for the key (default empty)
 */
Key.prototype.getEndDate = function getEndDate() {
	return this.getBinaryAttribute(CKI.CKA_END_DATE);
}

/**
 * Identifier of the mechanism used to generate the key material
 */
Key.prototype.getKeyGenMechanism = function getKeyGenMechanism() {
	return this.getNumberAttribute(CKI.CKA_KEY_GEN_MECHANISM);
}

/**
 * A list of mechanisms allowed to be used with this key. The number of
 * mechanisms in the array is the ulValueLen component of the attribute divided by the size
 * of CK_MECHANISM_TYPE. 
 */
Key.prototype.getAllowedMechanisms = function getAllowedMechanisms() {
	throw new Error("Not realized in this implementation");
	//var arLen = this.object.getAttribute(CKI.CKA_ALLOWED_MECHANISMS);
}

//Convertation
Key.toType = function toType(sObject, classType) {
	var res = null;
	switch (classType) {
		case Enums.ObjectClass.PrivateKey:
			res = new PrivateKey();
			break;
		case Enums.ObjectClass.PublicKey:
			res = new PublicKey();
			break;
		case Enums.ObjectClass.SecretKey:
			res = new SecretKey();
			break;
		default:
			throw new Error('This type convertation is not implemented');
	}
	res.cki = sObject.cki;
	res.handle = sObject.handle;
	res.session = sObject.session;
	return res;
}
module.exports = Key;

//Extends classes
var PrivateKey = require('./private_key');
var PublicKey = require('./public_key');
var SecretKey = require('./secret_key');
