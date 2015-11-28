var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;
var RSA = pkcs11.RSA;

describe("RSA", function () {
	var mod, slots, slot, session, key, skey;

	var MSG = "Hello world!!!";
	var MSG_WRONG = MSG + "!";

	function generateKey() {
		var _key = session.generateKey("AES_KEY_GEN",{
			"class": Enums.ObjectClass.SecretKey,
			"keyType": Enums.KeyType.AES,
			"valueLen": 32,
			"label": "test key AES",
			"private": true,
			"sensitive": true,
			"token": true,
			"encrypt": true,
			"decrypt": true,
			"wrap": true,
			"unwrap": true,
			"extractable": true,
		});
		return _key;
	}

	before(function () {
		mod = Module.load(config.lib, config.libName);
		mod.initialize();
		slots = mod.getSlots();
		slot = slots[0];
		assert(slot.isInitialized(), 'slot must be initialized');
		session = slot.session;
		session.start(2 | 4);
		session.login(config.pin);
		skey = generateKey();
	})

	after(function () {
		if (session) {
			session.destroyObject(skey);
			session.logout();
			session.stop();
		}
		mod.finalize();
	})

	var key;
	it("generate", function () {
		key = session.generateRSA({ modulusLength: 1024, publicExponent: 3, keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"] });
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
		assert.equal(MSG, oaep.decrypt(enc).toString("utf8"), "Correct");
	});

	it("OAEP encrypt/decrypt SHA-1", function () {
		var oaep = key.toOAEP(new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1));
		var enc = oaep.encrypt(MSG);
		assert.equal(MSG, oaep.decrypt(enc).toString("utf8"), "Correct");
	});

	it("OAEP encrypt/decrypt SHA-1 with params", function () {
		var oaep = key.toOAEP(new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1, new Buffer([1, 2, 3, 4, 5])));
		var enc = oaep.encrypt(MSG);
		assert.equal(MSG, oaep.decrypt(enc).toString("utf8"), "Correct");
	});

	it("OAEP wrap/unwrap SHA-1", function () {
		var oaep = key.toOAEP();
		var wkey = oaep.wrapKey(skey);
		var ukey = oaep.unwrapKey(wkey);
		session.destroyObject(ukey);
		//assert.equal(MSG, oaep.decrypt(enc).toString("utf8"), "Correct");
	});
	
	it("RSA 1.5 sign/verify", function () {
		var rsa1 = key.toRSA1();
		var sig = rsa1.sign(MSG);
		assert.equal(true, rsa1.verify(sig, MSG), "Correct");
		assert.equal(false, rsa1.verify(sig, MSG_WRONG), "Wrong data");
	});
	
	it("RSA 1.5 encrypt/decrypt", function () {
		var rsa1 = key.toRSA1();
		var enc = rsa1.encrypt(MSG);
		assert.equal(MSG, rsa1.decrypt(enc).toString("utf8"), "Correct");
	});
	
	it("RSA 1.5 wrap/unwrap", function () {
		var rsa1 = key.toRSA1();
		var wkey = rsa1.wrapKey(skey);
		var ukey = rsa1.unwrapKey(wkey);
		session.destroyObject(ukey);
	});
	
	it("RSA PSS sign/verify SHA1 default", function () {
		var pss = key.toPSS();
		var sig = pss.sign(MSG);
		assert.equal(true, pss.verify(sig, MSG), "Correct");
		assert.equal(false, pss.verify(sig, MSG_WRONG), "Wrong data");
	});
	
	it("RSA PSS sign/verify SHA1", function () {
		var pss = key.toPSS({name: "SHA1_RSA_PKCS_PSS", params: new RSA.RsaPSSParams()});
		var sig = pss.sign(MSG);
		assert.equal(true, pss.verify(sig, MSG), "Correct");
		assert.equal(false, pss.verify(sig, MSG_WRONG), "Wrong data");
	});
	
	it("RSA PSS sign/verify SHA256", function () {
		var pss = key.toPSS({name: "SHA256_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA256, Enums.MGF1.SHA256, 0)});
		var sig = pss.sign(MSG);
		assert.equal(true, pss.verify(sig, MSG), "Correct");
		assert.equal(false, pss.verify(sig, MSG_WRONG), "Wrong data");
	});

	it("delete", function () {
		key.delete();
	});
})