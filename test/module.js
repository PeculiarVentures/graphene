var assert = require('assert');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;

describe("Module", function () {
	process.env['SOFTHSM2_CONF'] = '/etc/softhsm2.conf';

	it("#load", function () {
		assert.throws(function () {
			Module.load('/usr/local/lib/softhsm/libsofthsm2.so')
		}, Error);
		assert(Module.load('/usr/local/lib/softhsm/libsofthsm2.so', 'SoftHSM'));
	})
	it("#initialize/finalize", function () {
		assert.doesNotThrow(function () {
			var mod = Module.load('/usr/local/lib/softhsm/libsofthsm2.so', 'SoftHSM');
			mod.initialize();

			mod.finalize();
		}, Error)
	})

	it("#getSlots", function () {
		var mod = Module.load('/usr/local/lib/softhsm/libsofthsm2.so', 'SoftHSM');
		mod.initialize();
		
		var slots = mod.getSlots(true);
		assert.equal(4, slots.length, "Wrong number of slots");

		mod.finalize();
	});
})