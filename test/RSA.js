var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("RSA", function () {
	var mod, slots, slot, session, key;
	
	var MSG = "Hello world!!!";
	var MSG_WRONG = MSG+"!";

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
	
	it("sign/verify SHA-1", function () {
		var alg = "sha-1"
		var sig = key.sign(alg, MSG);
		assert.equal(true, key.verify(alg, sig, MSG), "Correct");
		assert.equal(false, key.verify(alg, sig, MSG_WRONG), "Wrong data");
	});
	
	it("sign/verify SHA-224", function () {
		var alg = "sha-224"
		var sig = key.sign(alg, MSG);
		assert.equal(true, key.verify(alg, sig, MSG), "Correct");
		assert.equal(false, key.verify(alg, sig, MSG_WRONG), "Wrong data");
	});
	
	it("sign/verify SHA-256", function () {
		var alg = "sha-256"
		var sig = key.sign(alg, MSG);
		assert.equal(true, key.verify(alg, sig, MSG), "Correct");
		assert.equal(false, key.verify(alg, sig, MSG_WRONG), "Wrong data");
	});
	
	it("sign/verify SHA-384", function () {
		var alg = "sha-384"
		var sig = key.sign(alg, MSG);
		assert.equal(true, key.verify(alg, sig, MSG), "Correct");
		assert.equal(false, key.verify(alg, sig, MSG_WRONG), "Wrong data");
	});
	
	it("sign/verify SHA-512", function () {
		var alg = "sha-512"
		var sig = key.sign(alg, MSG);
		assert.equal(true, key.verify(alg, sig, MSG), "Correct");
		assert.equal(false, key.verify(alg, sig, MSG_WRONG), "Wrong data");
	});
	
	it("OAEP encrypt/decrypt default SHA-1", function () {
		var oaep = key.toOAEP()
		var enc = oaep.encrypt(MSG);
		assert.equal(MSG, oaep.decrypt(enc).toString("urf8"), "Correct");
	});
	
	it("delete", function () {
		key.delete();
	});
})