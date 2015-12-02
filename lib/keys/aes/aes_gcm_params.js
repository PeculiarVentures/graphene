var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function AesGCMParams(iv, additionalData, tagLength) {
	this.iv = iv;
	this.additionalData = additionalData || null;
	if (!check_tag_length(tagLength))
		throw new TypeError("Parameter 'tagLength' has wrong value. Can be 32, 64, 96, 104, 112, 120 or 128 (default)");
    this.tagLength = tagLength || 128;
}

function check_tag_length(value) {
	switch (value) {
		case 32:
		case 64:
		case 96:
		case 104:
		case 112:
		case 120:
		case 128:
			return true;
		default:
			return false;
	}
}

AesGCMParams.prototype.toCKI = function toCKI() {
	return new CKI.CK_GCM_PARAMS({
		pIv: this.iv,
		ulIvLen: this.iv.length,
		ulIvBits: this.iv.length * 8,
		pAAD: this.additionalData,
		ulAADLen: (this.additionalData) ? this.additionalData.length : 0,
		ulTagBits: this.tagLength
	})
}

module.exports = AesGCMParams;