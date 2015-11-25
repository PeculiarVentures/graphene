var common = require('../common');
var util = require('util');

var CKI = common.CKI;
var Enums = common.Enums;

function KeyPair(){
	
}

KeyPair.generate = generate;

module.exports = KeyPair;