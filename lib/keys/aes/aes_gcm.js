var util = require('util');

var common = require('../../common');
var Enums = common.Enums;

var KeyUtil = require('../util');
var Aes = require('./aes');

function AesGCM() {
}
util.inherits(AesGCM, Aes);

AesGCM.prototype.encrypt = function encrypt(data) {
	return this.session.encrypt(this.key, this.algorithm, data);
}

AesGCM.prototype.decrypt = function encrypt(data) {
	return this.session.decrypt(this.key, this.algorithm, data);
}

var _generate = AesGCM.prototype.generate;
AesGCM.generate = function generate(session, algorithm, props) {
	var res = _generate(session, algorithm, props, AesGCM);
	return res;
}

module.exports = AesGCM;