var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function EcdhParams(kdf, sharedData, publicData) {
	this.kdf = kdf;
	this.sharedData = sharedData || null;
	this.publicData = publicData || null;
}

EcdhParams.prototype.toCKI = function toCKI() {
	return new CKI.CK_ECDH1_DERIVE_PARAMS({
		kdf: this.kdf,
		ulSharedDataLen: (this.sharedData) ? this.sharedData.length : 0,
		pSharedData: this.sharedData,
		ulPublicDataLen: (this.publicData) ? this.publicData.length : 0,
		pPublicData: this.publicData
	})
}

module.exports = EcdhParams;