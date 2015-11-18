var common = require('./common');
var util = require('util');

var CKI = common.CKI;

var Certificate = require("./cert");

function X509CertificateAttribute() {
}
util.inherits(X509CertificateAttribute, Certificate);

//----- X.509 attribute certificate objects -----
/**
 * DER-encoding of the attribute certificate's subject field. This is distinct from the
 * CKA_SUBJECT attribute contained in CKC_X_509 certificates because the ASN.1 
 * syntax and encoding are different.
 */
X509CertificateAttribute.prototype.getOwner = function getOwner(){
	return this.getBinaryAttribute(CKI.CKA_OWNER);
};

/**
 * DER-encoding of the attribute certificate's issuer field. This is distinct from the
 * CKA_ISSUER attribute contained in CKC_X_509 certificates because the ASN.1
 * syntax and encoding are different. (default empty) 
 */
X509CertificateAttribute.prototype.getIssuer = function getIssuer(){
	return this.getBinaryAttribute(CKI.CKA_AC_ISSUER);
};

/**
 * DER-encoding of the certificate serial number (default empty)
 */
X509CertificateAttribute.prototype.getSerialNumber = function getSerialNumber() {
	return this.getBinaryAttribute(CKI.CKA_SERIAL_NUMBER);
}

/**
 * DER-encoding of the attribute certificate
 */
X509CertificateAttribute.prototype.getValue = function getValue() {
	return this.getBinaryAttribute(CKI.CKA_VALUE);
}

/**
 * DER-encoding of a sequence of object identifier values corresponding to the attribute
 * types contained in the certificate. When present, this field offers an opportunity for
 * applications to search for a particular attribute certificate without fetching and parsing the
 * certificate itself. (default empty) 
 */
X509CertificateAttribute.prototype.getAttributeTypes = function getAttributeTypes(){
	return this.getBinaryAttribute(CKI.CKA_ATTR_TYPES);
};


module.exports = X509CertificateAttribute;