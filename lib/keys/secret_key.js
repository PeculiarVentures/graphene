var common = require('../common');
var util = require('util');

var CKI = common.CKI;

var Key = require('./key');

function SecretKey() {
}
util.inherits(SecretKey, Key);

//----- Secret Key -----

/**
 * CK_TRUE if object is sensitive (default CK_FALSE)
 */
SecretKey.prototype.isSensitive = function isSensitive() {
	return this.getBooleanAttribute(CKI.CKA_SENSITIVE);
}

/**
 * CK_TRUE if key supports decryption
 */
SecretKey.prototype.isDecrypt = function isDecrypt() {
	return this.getBooleanAttribute(CKI.CKA_DECRYPT);
}

/**
 * CK_TRUE if key supports encryption
 */
SecretKey.prototype.isEncrypt = function isEncrypt() {
	return this.getBooleanAttribute(CKI.CKA_ENCRYPT);
}

/**
 * CK_TRUE if key supports signatures where the signature is an appendix to the data
 */
SecretKey.prototype.isSign = function isSign() {
	return this.getBooleanAttribute(CKI.CKA_SIGN);
}

/**
 * CK_TRUE if key supports verification (i.e., of authentication codes) where the signature is an appendix to the data
 */
SecretKey.prototype.isVerify = function isVerify() {
	return this.getBooleanAttribute(CKI.CKA_VERIFY);
}

/**
 * CK_TRUE if key supports wrapping (i.e., can be used to wrap other keys)
 */
SecretKey.prototype.isWrap = function isWrap() {
	return this.getBooleanAttribute(CKI.CKA_WRAP);
}

/**
 * CK_TRUE if key supports unwrapping (i.e., can be used to unwrap other keys)
 */
SecretKey.prototype.isUnwrap = function isUnwrap() {
	return this.getBooleanAttribute(CKI.CKA_UNWRAP);
}

/**
 * CK_TRUE if key is extractable and can be wrapped
 */
SecretKey.prototype.isExtractable = function isExtractable() {
	return this.getBooleanAttribute(CKI.CKA_EXTRACTABLE);
}	

/**
 * CK_TRUE if key has always had the CKA_SENSITIVE attribute set to CK_TRUE
 */
SecretKey.prototype.isAlwaysSensitive = function isAlwaysSensitive() {
	return this.getBooleanAttribute(CKI.CKA_ALWAYS_SENSITIVE);
}

/**
 * CK_TRUE if key has never had the CKA_EXTRACTABLE attribute set to CK_TRUE
 */
SecretKey.prototype.isNeverExtractable = function isNeverExtractable() {
	return this.getBooleanAttribute(CKI.CKA_NEVER_EXTRACTABLE);
}

/**
 * Key checksum
 */
SecretKey.prototype.getCheckValue = function getCheckValue() {
	var attrType = CKI.CKA_CHECK_VALUE;
	var attrLen = this.getAttribute(attrType);
	if (attrLen){
		var res = this.getAttribute(attrType, attrLen);
		return res;
	}
	else
		return null;
}

/**
 * CK_TRUE if the key can only be wrapped with a wrapping key that has CKA_TRUSTED set to CK_TRUE. 
 * Default is CK_FALSE.
 */
SecretKey.prototype.isWrapWithTrusted = function isWrapWithTrusted() {
	return this.getBooleanAttribute(CKI.CKA_WRAP_WITH_TRUSTED);
}

/**
 * For wrapping keys. The attribute template to apply to
 * any keys unwrapped using this wrapping key. Any user
 * supplied template is applied after this template as if the
 * object has already been created. The number of
 * attributes in the array is the ulValueLen component of the
 * attribute divided by the size of CK_ATTRIBUTE. 
 */
SecretKey.prototype.getUnwrapTemplate = function getUnwrapTemplate() {
	//CKA_UNWRAP_TEMPLATE 
	throw new Error("Not realized in this implementation");
}

/**
 * For wrapping keys. The attribute template to match against any keys wrapped using this wrapping key. 
 * Keys that do not match cannot be wrapped. The number of attributes in the array is the ulValueLen component 
 * of the attribute divided by the size of CK_ATTRIBUTE
 */
SecretKey.prototype.getWrapTemplate = function getWrapTemplate() {
	//CKA_WRAP_TEMPLATE 
	throw new Error("Not realized in this implementation");
}

module.exports = SecretKey;