var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("RSA", function () {
	var mod, slots, slot, session, key;

	before(function () {
		mod = Module.load(config.lib, config.libName);
		mod.initialize();
		slots = mod.getSlots();
		slot = slots[0];
		assert(slot.isInitialized(), 'slot must be initialized');
		session = slot.session;
		session.start(2 | 4);
		session.login(config.pin);
	})

	after(function () {
		if (session) {
			session.logout();
			session.stop();
		}
		mod.finalize();
	})

	it("generate", function () {
		var key = session.generateRSA({modulusLength: 1024, publicExponent: 3, keyUsages: ["sign", "verify"]});
	})
})