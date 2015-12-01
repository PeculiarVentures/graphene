var util = require('util');

var common = require('../../common');
var Enums = common.Enums;

var KeyUtil = require('../util');
var Aes = require('./aes');

function AesCBC() {
}
util.inherits(AesCBC, Aes);

AesCBC.prototype.encrypt = function encrypt(data) {
	return this.session.encrypt(this.key, this.algorithm, data);
}

AesCBC.prototype.decrypt = function encrypt(data) {
	return this.session.decrypt(this.key, this.algorithm, data);
}

AesCBC.prototype.wrapKey = function wrapKey(key) {
	return this.session.wrapKey(this.algorithm, this.key, key);
}

AesCBC.prototype.unwrapKey = function unwrapKey(data, template) {
	template = template || {
		"class": Enums.ObjectClass.SecretKey,
		"keyType": Enums.KeyType.AES,
		"encrypt": true,
		"decrypt": true
	}
	return this.session.unwrapKey(this.algorithm, this.key, template, data);
}

var _generate = AesCBC.prototype.generate;
AesCBC.generate = function generate(session, algorithm, props) {
	var res = _generate(session, algorithm, props, AesCBC);
	return res;
}

module.exports = AesCBC;