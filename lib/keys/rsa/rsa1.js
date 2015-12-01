var util = require('util');

var common = require('../../common');
var Enums = common.Enums;

var KeyUtil = require('../util');
var Rsa = require('./rsa');

function Rsa1_5() {
}
util.inherits(Rsa1_5, Rsa);

Rsa1_5.prototype.sign = function sign(data) {
	return this.session.sign(this.privateKey, this.algorithm, data);
}

Rsa1_5.prototype.verify = function verify(signature, data) {
	return this.session.verify(this.publicKey, this.algorithm, signature, data);
}

Rsa1_5.prototype.encrypt = function encrypt(data) {
	return this.session.encrypt(this.publicKey, this.algorithm, data);
}

Rsa1_5.prototype.decrypt = function encrypt(data) {
	return this.session.decrypt(this.privateKey, this.algorithm, data);
}

Rsa1_5.prototype.wrapKey = function wrapKey(key) {
	return this.session.wrapKey(this.algorithm, this.publicKey, key);
}

Rsa1_5.prototype.unwrapKey = function unwrapKey(data, template) {
	template = template || {
		"class": Enums.ObjectClass.SecretKey,
		"keyType": Enums.KeyType.AES,
		"encrypt": true,
		"decrypt": true
	}
	return this.session.unwrapKey(this.algorithm, this.privateKey, template, data);
}

var _generate = Rsa1_5.prototype.generate;
Rsa1_5.generate = function generate(session, algorithm, props) {
	if (algorithm != "RSA_PKCS")
		throw new TypeError("Algorithm must be 'RSA_PKCS'");
	var res = _generate(session, algorithm, props, Rsa1_5);

	return res;
}

module.exports = Rsa1_5;