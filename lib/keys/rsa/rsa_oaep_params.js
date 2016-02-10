var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function RsaOAEPParams(hashAlgs, mgf, sourceData, source){
	this.hashAlg = hashAlgs || Enums.Mechanism.SHA1;
	this.mgf = mgf || Enums.MGF1.SHA1;
    this.source = CKI.CKZ_DATA_SPECIFIED; 
    this.sourceData = sourceData || null;
}

RsaOAEPParams.prototype.toCKI = function toCKI(){
	return new CKI.CK_RSA_PKCS_OAEP_PARAMS({
		hashAlg: this.hashAlg,
		mgf: this.mgf,
		source: this.source,
		pSourceData: this.sourceData,
		ulSourceDataLen: this.sourceData ? this.sourceData.length : 0,
	})
}

module.exports = RsaOAEPParams;