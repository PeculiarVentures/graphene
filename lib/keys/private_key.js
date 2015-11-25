var common = require('../common');
var util = require('util');

var CKI = common.CKI;

var Key = require('./key');

function PrivateKey() {
}
util.inherits(PrivateKey, Key);

//----- Private Key -----
/**
 * DER-encoding of the key subject name (default empty)
 */
PrivateKey.prototype.getSubject = function getSubject(){
	return this.getBinaryAttribute(CKI.CKA_SUBJECT);
}

/**
 * CK_TRUE if key is sensitive
 */
PrivateKey.prototype.isSensitive = function isSensitive() {
	return this.getBooleanAttribute(CKI.CKA_SENSITIVE);
}

/**
 * CK_TRUE if key supports decryption
 */
PrivateKey.prototype.isDecrypt = function isDecrypt() {
	return this.getBooleanAttribute(CKI.CKA_DECRYPT);
}

/**
 * CK_TRUE if key supports signatures where the signature is an appendix to the data
 */
PrivateKey.prototype.isSign = function isSign() {
	return this.getBooleanAttribute(CKI.CKA_SIGN);
}

/**
 * CK_TRUE if key supports signatures where the data can be recovered from the signature
 */
PrivateKey.prototype.isSignRecover = function isSignRecover() {
	return this.getBooleanAttribute(CKI.CKA_SIGN_RECOVER);
}

/**
 * CK_TRUE if key supports unwrapping (i.e., can be used to unwrap other keys)
 */
PrivateKey.prototype.isUnwrap = function isUnwrap() {
	return this.getBooleanAttribute(CKI.CKA_UNWRAP);
}

/**
 * CK_TRUE if key is extractable and can be wrapped
 */
PrivateKey.prototype.isExtractable = function isExtractable() {
	return this.getBooleanAttribute(CKI.CKA_EXTRACTABLE);
}	

/**
 * CK_TRUE if key has always had the CKA_SENSITIVE attribute set to CK_TRUE
 */
PrivateKey.prototype.isAlwaysSensitive = function isAlwaysSensitive() {
	return this.getBooleanAttribute(CKI.CKA_ALWAYS_SENSITIVE);
}

/**
 * CK_TRUE if key has never had the CKA_EXTRACTABLE attribute set to CK_TRUE
 */
PrivateKey.prototype.isNeverExtractable = function isNeverExtractable() {
	return this.getBooleanAttribute(CKI.CKA_NEVER_EXTRACTABLE);
}

/**
 * CK_TRUE if the key can only be wrapped with a wrapping key that has CKA_TRUSTED set to CK_TRUE. Default is CK_FALSE.
 */
PrivateKey.prototype.isWrapWithTrusted = function isWrapWithTrusted() {
	return this.getBooleanAttribute(CKI.CKA_WRAP_WITH_TRUSTED);
}

/**
 * If CK_TRUE, the user has to supply the PIN for each use (sign or decrypt) with the key. Default is CK_FALSE.
 */
PrivateKey.prototype.isAlwaysAuthenticate = function isAlwaysAuthenticate() {
	return this.getBooleanAttribute(CKI.CKA_ALWAYS_AUTHENTICATE);
}

/**
 * For wrapping keys. The attribute template to apply to
 * any keys unwrapped using this wrapping key. Any user
 * supplied template is applied after this template as if the
 * object has already been created. The number of
 * attributes in the array is the ulValueLen component of the
 * attribute divided by the size of CK_ATTRIBUTE. 
 */
PrivateKey.prototype.getUnwrapTemplate = function getUnwrapTemplate() {
	//CKA_UNWRAP_TEMPLATE 
	throw new Error("Not realized in this implementation");
}

module.exports = PrivateKey;