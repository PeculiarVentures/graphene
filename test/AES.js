var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("AES", function () {
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

		key = getKey();
		if (!key)
			key = generateKey();
	})

	function getKey() {
		var objects = session.findObjects();
		for (var i in objects) {
			var obj = objects[i];
			if (obj.getClass() == Enums.ObjectClass.SecretKey) {
				var key = obj.toType();
				if (key.getType() == Enums.KeyType.AES) {
					return key;
				}
			}
		}
		return null
	}

	function generateKey() {
		var _key = session.generateKey("AES_KEY_GEN", {
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
			"extractable": false,
		})
		return _key;
	}

	after(function () {
		if (session) {
			session.logout();
			session.stop();
		}
		mod.finalize();
	})

	function encrypt(algName) {
		var enc = session.createEncrypt(algName, key);
		var msg = new Buffer(0);
		msg = Buffer.concat([msg, enc.update("secret word!")]);
		msg = Buffer.concat([msg, enc.update("secret word!")]);
		return msg = Buffer.concat([msg, enc.final()]);
	}

	function decrypt(algName, encMsg) {
		var dec = session.createDecrypt(algName, key);
		var msg = new Buffer(0);
		msg = Buffer.concat([msg, dec.update(encMsg)]);
		return msg = Buffer.concat([msg, dec.final()]);;
	}

	function testDecryptEncrypt(algName) {
		var msg = encrypt(algName);
		assert(msg.length, "Encrypted message by " + algName + " can not be null");
		var res = decrypt(algName, msg);
		assert.equal("secret word!secret word!", res.toString(), "Decrypted message is not valid");
	}

	it("#encrypt/decrypt AES_CBC_PAD", function () {
		testDecryptEncrypt({
			name: "AES_CBC_PAD",
			params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
		});
	})
})