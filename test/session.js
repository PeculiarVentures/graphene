var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("Session", function () {
	var mod, slots;
	
	before(function(){
		mod = Module.load(config.lib, config.libName);
		mod.initialize();
		slots = mod.getSlots();
	})
	
	after(function(){
		mod.finalize();
	})
	
	it("#start", function () {
		
	})
})
