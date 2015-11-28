var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var Rsa = require('./rsa');
var RsaPSSParams = require('./rsa_pss_params');
var MechanismInfo = require('../../mechanism_info');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function RsaPSS(key, alg) {
	if (key) {
		Object.defineProperty(this, "session", {
			get: function () {
				return key.session;
			}
		})
		this.privateKey = key.privateKey;
		this.publicKey = key.publicKey;
		this.algorithm = alg || {name: "SHA1_RSA_PKCS_PSS", params: new RsaPSSParams()};
	}
	else
		throw new Error("RsaPSS.constructor: Constructor must have 2 params (rsaKey, alg)");
}
util.inherits(RsaPSS, Rsa);

RsaPSS.prototype.sign = function sign(data) {
	return this.session.sign(this.privateKey, this.algorithm, data);
}

RsaPSS.prototype.verify = function verify(sig, data) {
	return this.session.verify(this.publicKey, this.algorithm, sig, data);
}

module.exports = RsaPSS;