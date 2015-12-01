var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;
var RSA = pkcs11.RSA;

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
		key = session.generateRsa({ modulusLength: 1024, publicExponent: 3, keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"] });
	})

	it("generate AES", function () {
		skey = session.generateAes({ length: 128, keyUsages: ["sign", "verify", "encrypt", "decrypt", "wrapKey", "unwrapKey"], extractable: true });
	})

	function test_sign_verify(RsaClass, alg) {
		var rsa = key.toType(RsaClass, alg);
		var sig = rsa.sign(MSG);
		assert.equal(true, rsa.verify(sig, MSG), "Correct");
		assert.equal(false, rsa.verify(sig, MSG_WRONG), "Wrong data");
	}

	function test_encrypt_decrypt(RsaClass, alg, _key) {
		_key = _key || key;
		var rsa = _key.toType(RsaClass, alg);
		var enc = rsa.encrypt(MSG);
		assert.equal(MSG, rsa.decrypt(enc).toString("utf8"), "Correct");
	}

	function test_wrap_unwrap(RsaClass, alg, _key) {
		_key = _key || key;
		var rsa = _key.toType(RsaClass, alg);
		var wkey = rsa.wrapKey(skey.key);
		var ukey = rsa.unwrapKey(wkey, {
			"class": Enums.ObjectClass.SecretKey,
			"keyType": Enums.KeyType.AES,
			"valueLen": 128 / 8,
			"encrypt": true,
			"decrypt": true
		});
		session.destroyObject(ukey);
	}

	it("sign/verify SHA-1", function () {
		test_sign_verify(RSA.RsaSignature, "SHA1_RSA_PKCS");
	});

	it("sign/verify SHA-224", function () {
		test_sign_verify(RSA.RsaSignature, "SHA224_RSA_PKCS");
	});

	it("sign/verify SHA-256", function () {
		test_sign_verify(RSA.RsaSignature, "SHA256_RSA_PKCS");
	});

	it("sign/verify SHA-384", function () {
		test_sign_verify(RSA.RsaSignature, "SHA384_RSA_PKCS");
	});

	it("sign/verify SHA-512", function () {
		test_sign_verify(RSA.RsaSignature, "SHA512_RSA_PKCS");
	});

	it("OAEP encrypt/decrypt default SHA-1", function () {
		test_encrypt_decrypt(RSA.RsaOAEP, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams() })
	});

	it("OAEP encrypt/decrypt SHA-1", function () {
		test_encrypt_decrypt(RSA.RsaOAEP, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1) })
	});

	it("OAEP encrypt/decrypt SHA-1 with params", function () {
		test_encrypt_decrypt(RSA.RsaOAEP, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1, new Buffer([1, 2, 3, 4, 5])) })
	});

	it("OAEP wrap/unwrap SHA-1", function () {
		test_wrap_unwrap(RSA.RsaOAEP, { name: "RSA_PKCS_OAEP", params: new RSA.RsaOAEPParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1) });
	});

	it("RSA 1.5 sign/verify", function () {
		test_sign_verify(RSA.Rsa1_5, "RSA_PKCS");
	});

	it("RSA 1.5 encrypt/decrypt", function () {
		test_encrypt_decrypt(RSA.RsaOAEP, "RSA_PKCS")
	});

	it("RSA 1.5 wrap/unwrap", function () {
		test_wrap_unwrap(RSA.RsaOAEP, "RSA_PKCS");
	});

	it("RSA PSS sign/verify SHA1", function () {
		test_sign_verify(RSA.RsaPSS, { name: "SHA1_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA1, Enums.MGF1.SHA1) });
	});

	it("RSA PSS sign/verify SHA224", function () {
		test_sign_verify(RSA.RsaPSS, { name: "SHA224_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA224, Enums.MGF1.SHA224) });
	});

	it("RSA PSS sign/verify SHA256", function () {
		test_sign_verify(RSA.RsaPSS, { name: "SHA256_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA256, Enums.MGF1.SHA256) });
	});

	it("RSA PSS sign/verify SHA384", function () {
		test_sign_verify(RSA.RsaPSS, { name: "SHA384_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA384, Enums.MGF1.SHA384) });
	});

	it("RSA PSS sign/verify SHA512", function () {
		test_sign_verify(RSA.RsaPSS, { name: "SHA512_RSA_PKCS_PSS", params: new RSA.RsaPSSParams(Enums.Mechanism.SHA512, Enums.MGF1.SHA512) });
	});

	it("AesCBC encrypt/decrypt", function () {
		test_encrypt_decrypt(
			RSA.AesCBC,
			{ name: "AES_CBC", params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) },
			skey);
	});

	it("AesCBC wrap/unwrap", function () {
		test_wrap_unwrap(
			RSA.AesCBC,
			{ name: "AES_CBC", params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) },
			skey);
	});

	it("delete RSA", function () {
		key.delete();
	});

	it("delete Aes", function () {
		skey.delete();
	});
})