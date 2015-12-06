var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;
var RSA = pkcs11.RSA;
var AES = pkcs11.AES;

describe("RSA", function () {
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

	var key;
	it("generate RSA", function () {
		key = session.generate("RSA", null, { modulusLength: 1024, publicExponent: 3, keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"] });
	})

	it("generate AES", function () {
		skey = session.generate("AES", null, { length: 128, keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"], extractable: true });
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
		test_sign_verify(key, "SHA1_RSA_PKCS");
	});

	it("sign/verify SHA-224", function () {
		test_sign_verify(key, "SHA224_RSA_PKCS");
	});

	it("sign/verify SHA-256", function () {
		test_sign_verify(key, "SHA256_RSA_PKCS");
	});

	it("sign/verify SHA-384", function () {
		test_sign_verify(key, "SHA384_RSA_PKCS");
	});

	it("sign/verify SHA-512", function () {
		test_sign_verify(key, "SHA512_RSA_PKCS");
	});

	it("OAEP encrypt/decrypt default SHA-1", function () {
		test_encrypt_decrypt(key, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams() })
	});

	it("OAEP encrypt/decrypt SHA-1", function () {
		test_encrypt_decrypt(key, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1) })
	});

	it("OAEP encrypt/decrypt SHA-1 with params", function () {
		test_encrypt_decrypt(key, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1, new Buffer([1, 2, 3, 4, 5])) })
	});

	it("OAEP wrap/unwrap SHA-1", function () {
		test_wrap_unwrap(key, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1) }, skey);
	});

	it("RSA 1.5 sign/verify", function () {
		test_sign_verify(key, "RSA_PKCS");
	});

	it("RSA 1.5 encrypt/decrypt", function () {
		test_encrypt_decrypt(key, "RSA_PKCS")
	});

	it("RSA 1.5 wrap/unwrap", function () {
		test_wrap_unwrap(key, "RSA_PKCS", skey);
	});

	it("RSA PSS sign/verify SHA1", function () {
		test_sign_verify(key, { name: "SHA1_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1) });
	});

	it("RSA PSS sign/verify SHA224", function () {
		test_sign_verify(key, { name: "SHA224_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA224, Enums.MGF1.SHA224) });
	});

	it("RSA PSS sign/verify SHA256", function () {
		test_sign_verify(key, { name: "SHA256_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA256, Enums.MGF1.SHA256) });
	});

	it("RSA PSS sign/verify SHA384", function () {
		test_sign_verify(key, { name: "SHA384_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA384, Enums.MGF1.SHA384) });
	});

	it("RSA PSS sign/verify SHA512", function () {
		test_sign_verify(key, { name: "SHA512_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA512, Enums.MGF1.SHA512) });
	});

	it("delete RSA", function () {
		key.delete();
	});

	it("delete Aes", function () {
		skey.delete();
	});
})