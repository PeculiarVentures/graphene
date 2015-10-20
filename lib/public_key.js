var common = require('./common');
var util = require('util');

var CKI = common.CKI;

var Key = require('./key');

function PublicKey() {
}
util.inherits(PublicKey, Key);

//----- Public key objects -----
/**
 * DER-encoding of the key subject name (default empty)
 */
PublicKey.prototype.getSubject = function getSubject(){
	return this.getBinaryAttribute(CKI.CKA_SUBJECT);
}

/**
 * CK_TRUE if key supports encryption
 */
PublicKey.prototype.isEncrypt = function isEncrypt() {
	return this.getBooleanAttribute(CKI.CKA_ENCRYPT);
}

/**
 * CK_TRUE if key supports verification where the signature is an appendix to the data
 */
PublicKey.prototype.isVerify = function isVerify() {
	return this.getBooleanAttribute(CKI.CKA_VERIFY);
}

/**
 * CK_TRUE if key supports verification where the data is recovered from the signature
 */
PublicKey.prototype.isVerifyRecover = function isVerifyRecover() {
	return this.getBooleanAttribute(CKI.CKA_VERIFY_RECOVER);
}

/**
 * CK_TRUE if key supports wrapping (i.e., can be used to wrap other keys)
 */
PublicKey.prototype.isWrap = function isWrap() {
	return this.getBooleanAttribute(CKI.CKA_WRAP);
}

/**
 * The key can be trusted for the application that it was created.
 * The wrapping key can be used to wrap keys with
 * CKA_WRAP_WITH_TRUSTED set to CK_TRUE. 
 */
PublicKey.prototype.isTrusted = function isTrusted() {
	return this.getBooleanAttribute(CKI.CKA_TRUSTED);
}

/**
 * For wrapping keys. The attribute template to match against any keys
 * wrapped using this wrapping key. Keys that do not match cannot be wrapped.
 * The number of attributes in the array is the ulValueLen component of the
 * attribute divided by the size of CK_ATTRIBUTE. 
 */
PublicKey.prototype.getWrapTemplate = function getWrapTemplate() {
	//CKA_WRAP_TEMPLATE 
	throw new Error("Not realized in this implementation");
}

module.exports = PublicKey;