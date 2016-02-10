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
var key_convert = require('./keys/key_convert');

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
	Enums: Enums,
    KeyConvert: key_convert
}

module.exports = exp;

var RsaOAEPParams = require('./keys/rsa/rsa_oaep_params');
var RsaPSSParams = require('./keys/rsa/rsa_pss_params');
var Rsa = require('./keys/rsa/rsa');

var Aes = require('./keys/aes/aes');
var AesGCMParams = require('./keys/aes/aes_gcm_params');

var Ecdsa = require('./keys/ecdsa/ecdsa');
var EcdhParams = require('./keys/ecdsa/ecdh_params');

exp.RSA = {
	Rsa: Rsa,
	RsaOAEPParams: RsaOAEPParams,
	RsaPSSParams: RsaPSSParams
}
exp.AES = {
	Aes: Aes,
	AesGCMParams: AesGCMParams
}
exp.ECDSA = {
	Ecdsa: Ecdsa,
	EcdhParams: EcdhParams
}