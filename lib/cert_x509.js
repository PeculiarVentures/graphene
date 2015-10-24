var common = require('./common');
var util = require('util');

var CKI = common.CKI;

var Certificate = require("./cert");

function X509Certificate() {
}
util.inherits(X509Certificate, Certificate);

//----- X.509 public key certificate objects -----
/**
 * DER-encoding of the certificate subject name
 */
X509Certificate.prototype.getSubject = function getSubject(){
	return this.getBinaryAttribute(CKI.CKA_SUBJECT);
};

/**
 * DER-encoding of the certificate issuer name (default empty)
 */
X509Certificate.prototype.getIssuer = function getIssuer(){
	return this.getBinaryAttribute(CKI.CKA_ISSUER);
};

/**
 * DER-encoding of the certificate serial number (default empty)
 */
X509Certificate.prototype.getSerialNumber = function getSerialNumber() {
	return this.getBinaryAttribute(CKI.CKA_SERIAL_NUMBER);
}

/**
 * Key identifier for public/private key pair (default empty)
 */
X509Certificate.prototype.getId = function getId(){
	return this.getBinaryAttribute(CKI.CKA_ID);
};

/**
 * BER-encoding of the certificate
 */
X509Certificate.prototype.getValue = function getValue() {
	return this.getBinaryAttribute(CKI.CKA_VALUE);
}

/**
 * If not empty this attribute gives the URL where the complete
 * certificate can be obtained (default empty) 
 */
X509Certificate.prototype.getUrl = function getCertificateUrl() {
	return this.getUtf8Attribute(CKI.CKA_URL);
}

/**
 * SHA-1 hash of the subject public key (default empty)
 */
X509Certificate.prototype.getSubjectPublicKeyHash = function getSubjectPublicKeyHash() {
	return this.getBinaryAttribute(CKI.CKA_HASH_OF_SUBJECT_PUBLIC_KEY);
}

/**
 * SHA-1 hash of the issuer public key (default empty)
 */
X509Certificate.prototype.getIssuerPublicKeyHash = function getIssuerKeyHash() {
	return this.getBinaryAttribute(CKI.CKA_HASH_OF_ISSUER_PUBLIC_KEY);
}

/**
 * Java MIDP security domain: 
 * 0 = unspecified (default value), 
 * 1 = manufacturer, 
 * 2 = operator, 
 * 3 = third party 
 */
X509Certificate.prototype.getJavaMIDP = function getJavaMIDP() {
	return this.getNumberAttribute(CKI.CKA_JAVA_MIDP_SECURITY_DOMAIN);
}

module.exports = X509Certificate;