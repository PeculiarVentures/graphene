var common = require('./common');
var util = require('util');

var SessionObject = require('./session_object');


var CKI = common.CKI;

function Certificate() {
}
util.inherits(Certificate, SessionObject);

//----- Certificate -----

/**
 * Type of certificate
 */
Certificate.prototype.getType = function getCertificateType() {
	return this.getNumberAttribute(CKI.CKA_CERTIFICATE_TYPE);
}

/**
 * The certificate can be trusted for the application that it was created.
 */
Certificate.prototype.isTrusted = function isTrusted() {
	return this.getBooleanAttribute(CKI.CKA_TRUSTED);
}

/**
 * Categorization of the certificate:0 = unspecified (default value), 
 * 1 = token user, 2 = authority, 3 = other entity
 */
Certificate.prototype.getCategory = function getCategory() {
	return this.getNumberAttribute(CKI.CKA_CERTIFICATE_CATEGORY);
}

/**
 * Checksum
 */
Certificate.prototype.getCheckValue = function getCheckValue() {
	return this.getBinaryAttribute(CKI.CKA_CHECK_VALUE);
}

/**
 * Start date for the certificate (default empty)
 */
Certificate.prototype.getStartDate = function getStartDate() {
	return this.getBinaryAttribute(CKI.CKA_START_DATE);
}

/**
 * End date for the certificate (default empty)
 */
Certificate.prototype.getEndDate = function getEndDate() {
	return this.getBinaryAttribute(CKI.CKA_END_DATE);
}

module.exports = Certificate;