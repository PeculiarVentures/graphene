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

	var key;
	it("generate", function () {
		key = session.generateRSA({modulusLength: 1024, publicExponent: 3, keyUsages: ["sign", "verify"]});
	})
	
	it("sign/verify", function () {
		var sig = key.sign("sha-1", "Hello!!!");
		assert.equal(true, key.verify("sha-1", sig, "Hello!!!", "Correct"));
		assert.equal(true, key.verify("sha-1", sig, "Hello!!!1", "Wrong data"));
	});
	
	it("delete", function () {
		key.delete();
	});
})