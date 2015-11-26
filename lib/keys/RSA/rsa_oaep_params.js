var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function RsaOAEPParams(hashAlgs, mgf, pSourceData, source){
	this.hashAlg = hashAlgs || Enums.Mechanism.SHA1_RSA_PKCS;
	this.mgf = mgf || CKI.CKG_MGF1_SHA1;
    this.source = CKI.CKZ_DATA_SPECIFIED; 
    this.sourceData = null;
}

RsaOAEPParams.prototype.toCKI = function toCKI(){
	return new CKI.CK_RSA_PKCS_OAEP_PARAMS({
		hashAlg: this.hashAlg,
		mgf: this.msg,
		source: this.source,
		pSourceData: this.pSourceData,
		ulSourceDataLen: this.pSourceData ? this.pSourceData.length : 0,
	})
}

module.exports = RsaOAEPParams;