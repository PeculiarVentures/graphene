var Ref = require('ref');
var RefStruct = require('ref-struct');
var RefArray = require('ref-array');
var Debug = require('debug')('pkcs11');

Debug('Init pkcs');
var cki = require('./wrap/pkcs11f');
var tools = require('./utils');
var ERROR = tools.ERROR;
var Type = tools.Type;
var Utils = tools.Utils;
var Enums = require('./enums');

var Pk11_util = require('./pk11_util')(Debug, Utils, Enums);

Debug('Concat Utils, Pk11_util')
for (var i in Pk11_util) {
	Utils[i] = Pk11_util[i];
}

var exp = {
	Ref: Ref,
	RefStruct: RefStruct,
	RefArray: RefArray,
	Debug: Debug,
	CKI: cki,
	ERROR: ERROR,
	Type: Type,
	Utils: Utils,
	Enums: Enums
}

module.exports = exp;

var RsaOAEPParams = require('./keys/rsa/rsa_oaep_params');
var RsaPSSParams = require('./keys/rsa/rsa_pss_params');
var Rsa = require('./keys/rsa/rsa');
var RsaSignature = require('./keys/rsa/rsa_sign');
var RsaPSS = require('./keys/rsa/rsa_pss');
var Rsa1_5 = require('./keys/rsa/rsa1');
var RsaOAEP = require('./keys/rsa/rsa_oaep');

var Aes = require('./keys/aes/aes');
var AesCBC = require('./keys/aes/aes_cbc');
var AesGCM = require('./keys/aes/aes_gcm');
var AesGCMParams = require('./keys/aes/aes_gcm_params');

exp.RSA = {
	RsaOAEPParams: RsaOAEPParams,
	RsaPSSParams: RsaPSSParams,
	Rsa: Rsa,
	Rsa1_5: Rsa1_5,
	RsaSignature: RsaSignature,
	RsaPSS: RsaPSS,
	RsaOAEP: RsaOAEP,
}
exp.AES = {
	Aes: Aes,
	AesCBC: AesCBC,
	AesGCM: AesGCM,
	AesGCMParams: AesGCMParams
}