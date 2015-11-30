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

var RsaOAEPParams = require('./keys/RSA/rsa_oaep_params');
var RsaPSSParams = require('./keys/RSA/rsa_pss_params');
var Rsa = require('./keys/RSA/rsa');
var RsaSignature = require('./keys/RSA/rsa_sign');
var RsaPSS = require('./keys/RSA/rsa_pss');
var Rsa1_5 = require('./keys/RSA/rsa1');
var RsaOAEP = require('./keys/RSA/rsa_oaep');

exp.RSA = {
	RsaOAEPParams: RsaOAEPParams,
	RsaPSSParams: RsaPSSParams,
	Rsa: Rsa,
	Rsa1_5: Rsa1_5,
	RsaSignature: RsaSignature,
	RsaPSS: RsaPSS,
	RsaOAEP: RsaOAEP,
}