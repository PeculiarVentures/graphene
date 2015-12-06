var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;
var AES = pkcs11.AES;

describe("AES", function () {
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

	it("AesCBC encrypt/decrypt", function () {
		test_encrypt_decrypt(
			skey,
			{ name: "AES_CBC", params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) });
	});

	it("AesCBC wrap/unwrap", function () {
		test_wrap_unwrap(
			skey,
			{ name: "AES_CBC", params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) },
			skey);
	});

	it("AesCBCPad encrypt/decrypt", function () {
		test_encrypt_decrypt(
			skey,
			{ name: "AES_CBC_PAD", params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) });
	});

	it("AesGCM encrypt/decrypt default", function () {
		test_encrypt_decrypt(
			skey,
			{ name: "AES_GCM", params: new AES.AesGCMParams(new Buffer("123456789012"), null) });
	});

	it("AesGCM encrypt/decrypt with additionalData", function () {
		test_encrypt_decrypt(
			skey,
			{ name: "AES_GCM", params: new AES.AesGCMParams(new Buffer("123456789012"), new Buffer('data for alg')) });
	});

	it("delete Aes", function () {
		skey.delete();
	});
})