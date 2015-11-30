var util = require('util');

var common = require('../../common');
var Enums = common.Enums;

var KeyUtil = require('../util');
var Rsa = require('./rsa');

function RsaOAEP() {
}
util.inherits(RsaOAEP, Rsa);

RsaOAEP.prototype.encrypt = function encrypt(data) {
	return this.session.encrypt(this.publicKey, this.algorithm, data);
}

RsaOAEP.prototype.decrypt = function encrypt(data) {
	return this.session.decrypt(this.privateKey, this.algorithm, data);
}

RsaOAEP.prototype.wrapKey = function wrapKey(key) {
	return this.session.wrapKey(this.algorithm, this.publicKey, key);
}

RsaOAEP.prototype.unwrapKey = function unwrapKey(data, template) {
	template = template || {
		"class": Enums.ObjectClass.SecretKey,
		"keyType": Enums.KeyType.AES,
		"encrypt": true,
		"decrypt": true
	}
	return this.session.unwrapKey(this.algorithm, this.privateKey, template, data);
}

var _generate = RsaOAEP.prototype.generate;
RsaOAEP.generate = function generate(session, algorithm, props) {
	var res = _generate(session, algorithm, props, RsaOAEP);
	return res;
}

module.export = RsaOAEP;