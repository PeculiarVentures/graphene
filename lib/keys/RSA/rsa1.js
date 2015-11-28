var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var Rsa = require('./rsa');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function Rsa1(key) {
	if (key) {
		Object.defineProperty(this, "session", {
			get: function () {
				return key.session;
			}
		})
		this.privateKey = key.privateKey;
		this.publicKey = key.publicKey;
	}
	else
		throw new Error("Rsa1.constructor: Constructor must have 1 param (rsaKey)");
}
util.inherits(Rsa1, Rsa);

Rsa1.prototype.sign = function sign(data) {
	return this.session.sign(this.privateKey, "RSA_PKCS", data);
}

Rsa1.prototype.verify = function verify(sig, data) {
	return this.session.verify(this.publicKey, "RSA_PKCS", sig, data);
}

Rsa1.prototype.encrypt = function encrypt(data) {
	return this.session.encrypt(this.publicKey, "RSA_PKCS", data);
}

Rsa1.prototype.decrypt = function encrypt(data) {
	return this.session.decrypt(this.privateKey, "RSA_PKCS", data);
}

Rsa1.prototype.wrapKey = function wrapKey(key){
	return this.session.wrapKey("RSA_PKCS", this.publicKey, key);
}

Rsa1.prototype.unwrapKey = function unwrapKey(data, template){
	template = template || {
		"class": Enums.ObjectClass.SecretKey,
		"keyType": Enums.KeyType.AES,
		"encrypt": true,
		"decrypt": true
	}
	return this.session.unwrapKey("RSA_PKCS", this.privateKey, template, data);
}

module.exports = Rsa1;