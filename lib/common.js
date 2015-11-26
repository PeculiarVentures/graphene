var Ref = require('ref');
var RefStruct = require('ref-struct');
var RefArray = require('ref-array');
var Debug = require('debug')('pkcs11');

Debug('Init pkcsf');
var cki = require('./wrap/pkcs11f');
var tools = require('./utils');
var ERROR = tools.ERROR;
var Type = tools.Type;
var Utils = tools.Utils;
var Enums = require('./enums');
var RsaOAEPParams = require('./keys/RSA/rsa_oaep_params');
var Pk11_util = require('./pk11_util')(Debug, Utils, Enums);

Debug('Concat Utils, Pk11_util')
for (var i in Pk11_util) {
	Utils[i] = Pk11_util[i];
}

module.exports = {
	Ref: Ref,
	RefStruct: RefStruct,
	RefArray: RefArray,
	Debug: Debug,
	CKI: cki,
	ERROR: ERROR,
	Type: Type,
	Utils: Utils,
	Enums: Enums,
	RSA: {
		RsaOAEPParams: RsaOAEPParams 
	}
}