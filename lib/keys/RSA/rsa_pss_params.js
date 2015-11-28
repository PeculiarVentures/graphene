var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function RsaPSSParams(hashAlgs, mgf, soltLength){
	this.hashAlg = hashAlgs || Enums.Mechanism.SHA1;
	this.mgf = mgf || Enums.MGF1.SHA1;
    this.soltLength = soltLength || 0; 
}

RsaPSSParams.prototype.toCKI = function toCKI(){
	return new CKI.CK_RSA_PKCS_PSS_PARAMS({
		hashAlg: this.hashAlg,
		mgf: this.mgf,
		sLen: this.soltLength,
	})
}

module.exports = RsaPSSParams;