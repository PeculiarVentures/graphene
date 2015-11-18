var common = require('./common');
var util = require('util');

var SessionObject = require("./session_object");

var CKI = common.CKI;

function DataObject() {
}
util.inherits(DataObject, SessionObject);
//----- Data objects -----
/**
 * Description of the application that manages the object (default empty)
 */
DataObject.prototype.getApplication = function getApplication() {
	return this.getStringAttribute(CKI.CKA_APPLICATION);
}

/**
 * DER-encoding of the object identifier indicating the data object type (default empty)
 */
DataObject.prototype.getObjectId = function getObjectId() {
	return this.getBinaryAttribute(CKI.CKA_OBJECT_ID);
}

/**
 * Value of the object (default empty)
 */
DataObject.prototype.getValue = function getValue() {
	return this.getBinaryAttribute(this, CKI.CKA_VALUE);
}

module.exports = DataObject;