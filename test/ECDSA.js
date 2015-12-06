var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;
var AES = pkcs11.AES;

describe("ECDSA", function () {
	var mod, slots, slot, session, key, skey;

	var MSG = "1234567890123456";
	var MSG_WRONG = MSG + "!";

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

	it("generate AES", function () {
		skey = session.generate("AES", null, { length: 128, keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"], extractable: true });
	})
	
	it("generate ECDSA secp192r1 by OID", function () {
		var _key = session.generate("ECDSA", null, { namedCurve: "1.2.840.10045.3.1.1", keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"], extractable: true });
		_key.delete();
	})
	
	it("generate ECDSA secp192r1 by name", function () {
		var _key = session.generate("ECDSA", null, { namedCurve: "secp192r1", keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"], extractable: true });
		_key.delete();
	})
	
	it("generate ECDSA secp192r1 by Buffer", function () {
		key = session.generate("ECDSA", null, { namedCurve: new Buffer("06082A8648CE3D030101", "hex"), keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"], extractable: true });
	})

	function test_sign_verify(_key, alg) {
		_key.algorithm = alg;
		var sig = _key.sign(MSG);
		assert.equal(true, _key.verify(sig, MSG), "Correct");
		assert.equal(false, _key.verify(sig, MSG_WRONG), "Wrong data");
	}

	function test_encrypt_decrypt(_key, alg) {
		_key.algorithm = alg;
		var enc = _key.encrypt(MSG);
		assert.equal(MSG, _key.decrypt(enc).toString("utf8"), "Correct");
	}

	function test_wrap_unwrap(_key, alg, _skey) {
		_key.algorithm = alg;
		var wkey = _key.wrapKey(_skey.key);
		var ukey = _key.unwrapKey(wkey, {
			"class": Enums.ObjectClass.SecretKey,
			"keyType": Enums.KeyType.AES,
			"valueLen": 128 / 8,
			"encrypt": true,
			"decrypt": true
		});
		session.destroyObject(ukey);
	}
	
	it("sign/verify SHA-1", function () {
		test_sign_verify(key, "ECDSA_SHA1");
	});
	
	it("sign/verify SHA-224", function () {
		test_sign_verify(key, "ECDSA_SHA224");
	});
	
	it("sign/verify SHA-256", function () {
		test_sign_verify(key, "ECDSA_SHA256");
	});
	
	it("sign/verify SHA-384", function () {
		test_sign_verify(key, "ECDSA_SHA384");
	});
	
	it("sign/verify SHA-512", function () {
		test_sign_verify(key, "ECDSA_SHA512");
	});

	it("delete Aes", function () {
		skey.delete();
	});
})