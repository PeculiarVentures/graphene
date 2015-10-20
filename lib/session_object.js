var common = require('./common');
var util = require('util');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Utils = common.Utils;
var Enums = common.Enums;
var Debug = common.Debug;

function SessionObject(session, handle) {
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
	this.type = "SessionObject";
	
	this.toType = function toType(classType){
		if (Type.isEmpty(classType))
			classType = this.getClass();
		return SessionObject.toType(this, classType);
	}
}

SessionObject.prototype.getAttribute = function getAttribute(atrType, len) {
	var hSession = this.session.handle;
	var hObject = this.handle;

	return _getAttribute(this.cki, hSession, hObject, atrType, len);
}

SessionObject.prototype.getBooleanAttribute = function getBooleanAttribute(attrType) {
	return _getBooleanAttribute(this, attrType);
}

SessionObject.prototype.getNumberAttribute = function getNumberAttribute(attrType) {
	return _getNumberAttribute(this, attrType);
}

SessionObject.prototype.getBinaryAttribute = function getBinaryAttribute(attrType) {
	return _getBinaryAttribute(this, attrType);
}

function _getAttribute(cki, hSession, hObject, atrType, len) {
	Debug("Attribute type: %d", atrType);
	var $value = null;

	if (!len)
		len = 0;
	else
		$value = new Buffer(len);

	var tpl = new CKI.CK_ATTRIBUTE({
		"type": atrType,
		pValue: $value,
		ulValueLen: len
	});

	Debug('C_GetAttributeValue');
	var res = cki.C_GetAttributeValue(hSession, hObject, tpl.ref(), 1);
	Utils.check_cki_res(res, "C_GetAttributeValue");
	Debug('Attribute.langth: %d', tpl.ulValueLen);

	var r = tpl.ulValueLen;
	if ($value) {
		r = $value.slice(0, tpl.ulValueLen)
	}
	return r;
}

function _getBooleanAttribute(obj, attrType) {
	var res = obj.getAttribute(attrType, 1);
	return res[0] == 1;
}

function _getBinaryAttribute(obj, attrType) {
	var attrLen = obj.getAttribute(attrType);
	var res = obj.getAttribute(attrType, attrLen);
	return res;
}

function _getNumberAttribute(obj, attrType) {
	var buf = _getBinaryAttribute(obj, attrType);
	var res = 0;
	switch (buf.length) {
		case 4:
			res = buf.readInt32LE();
			break;
		case 8:
			res = buf.readInt64LE();
			break;
	}
	return res;
}

/**
 * Object class (type)
 */
SessionObject.prototype.getClass = function getClass() {
	return _getNumberAttribute(this, CKI.CKA_CLASS);
}

//----- Common Storage Object Attributes -----

/**
 * CK_TRUE if object is a token object; CK_FALSE if object is a session object. Default is CK_FALSE.
 */
SessionObject.prototype.isToken = function isToken() {
	return _getBooleanAttribute(this, CKI.CKA_TOKEN);
}

/**
 * CK_TRUE if object is a private object; CK_FALSE if object is a public object. 
 * Default value is token-specific, and may depend on the values of other attributes of the object.
 */
SessionObject.prototype.isPrivate = function isPrivate() {
	return _getBooleanAttribute(this, CKI.CKA_PRIVATE);
}

/**
 * CK_TRUE if object can be modified Default is CK_TRUE.
 */
SessionObject.prototype.isModifiable = function isModifiable() {
	return _getBooleanAttribute(this, CKI.CKA_PRIVATE);
}

/**
 * Description of the object (default empty).
 */
SessionObject.prototype.getLabel = function getLabel() {
	return  _getBinaryAttribute(this, CKI.CKA_LABEL).toString('utf8');
}

//Convertation
SessionObject.toType = function toType(sObject, classType) {
	var res = null;
	switch (classType) {
		case Enums.ObjectClass.Data:
			res = new DataObject();
			break;
		case Enums.ObjectClass.Certificate:
			res = new Certificate();
			break;
		case Enums.ObjectClass.PrivateKey:
		case Enums.ObjectClass.PublicKey:
		case Enums.ObjectClass.SecretKey:
			res = Key.toType(sObject, classType);
			break;
		default:
			throw new Error('This type convertation is not implemented');
	}
	res.cki = sObject.cki;
	res.handle = sObject.handle;
	res.session = sObject.session;
	
	return res;
}

module.exports = SessionObject;

var DataObject = require('./data');
var Key = require('./key');
var Certificate = require('./cert');