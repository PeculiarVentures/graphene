var assert = require('assert');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var config = require('./config')

describe("Module", function () {
	
	it("#load", function () {
		assert.throws(function () {
			Module.load('unknown/path/name')
		}, TypeError);
		assert.throws(function () {
			Module.load('unknown/path/name',"")
		}, Error);
		assert(Module.load(config.lib, config.libName));
	})
	it("#initialize/finalize", function () {
		assert.doesNotThrow(function () {
			var mod = Module.load(config.lib, config.libName);
			mod.initialize();

			mod.finalize();
		}, Error)
	})

	it("#getSlots", function () {
		var mod = Module.load(config.lib, config.libName);
		mod.initialize();
		
		var slots = mod.getSlots(true);
		assert.equal(1, slots.length, "Wrong number of slots");

		mod.finalize();
	});
})