var common = require('../common');
var util = require('util');

var CKI = common.CKI;
var Enums = common.Enums;
var Types = common.Type;

var KEY_ID_SIZE = 10;

module.exports = {
	VERIFY: "verify",
	SIGN: "sign",
	ENCRYPT: "encrypt",
	DECRYPT: "decrypt",
	WRAP: "wrapKey",
	UNWRAP: "unwrapKey",
	DERIVE: "deriveKey",
	/**
	 * Generates ID for key
	 * @prop size Size of generated identificator. Default value is 10
	 */
	createKeyID: function createKeyID(size) {
		size = size || KEY_ID_SIZE;
		var res = new Buffer(size);
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < size; i++)
			res[i] = possible.charCodeAt(Math.floor(Math.random() * possible.length));

		return res;
	},
	isKeyUsage: function isKeyUsage(keyUsage, arKeyUsage){
		return (arKeyUsage.indexOf(keyUsage)>-1);
	}
}