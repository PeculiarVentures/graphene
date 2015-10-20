var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("ECDSA", function () {
	var mod, slots, slot, session, keys;

	before(function () {
		mod = Module.load(config.lib, config.libName);
		mod.initialize();
		slots = mod.getSlots();
		slot = slots[0];
		assert(slot.isInitialized(), 'slot must be initialized');
		session = slot.session;
		session.start(2 | 4);
		session.login(config.pin);

		keys = getKeys();
		if (!keys)
			keys = generateKeys();
	})

	function getKeys() {
		var _keys;
		var objects = session.findObjects();
		for (var i in objects) {
			var obj = objects[i];
			if (obj.getClass() == Enums.ObjectClass.PrivateKey || obj.getClass() == Enums.ObjectClass.PublicKey) {
				var key = obj.toType();
				if (key.getType() == Enums.KeyType.ECDSA) {
					if (!_keys) _keys = {};
					if (key.getClass() == Enums.ObjectClass.PrivateKey)
						_keys.private = key;
					else
						_keys.public = key;
					if (_keys.private && _keys.public)
						return _keys;
				}
			}
		}
		return null
	}

	function generateKeys() {
		var _keys = session.generateKeyPair("ECDSA_KEY_PAIR_GEN", {
			"token": true,
			"keyType": Enums.KeyType.ECDSA,
			"label": "test key ECDSA",
			"private": true,
			"verify": true,
			"wrap": false,
			"encrypt": false,
			"paramsEC": new Buffer("06082A8648CE3D030101", "hex")
		}, {
				"token": true,
				"private": true,
				"keyType": Enums.KeyType.ECDSA,
				"label": "test key ECDSA",
				"sensitive": true,
				"decrypt": false,
				"sign": true,
				"unwrap": false,

			})
		return _keys;
	}

	after(function () {
		if (session) {
			session.logout();
			session.stop();
		}
		mod.finalize();
	})

	function sign(algName) {
		var sign = session.createSign(algName, keys.private);
		sign.update("secret word");
		return sign.final();
	}

	function verify(algName, sig) {
		var verify = session.createVerify(algName, keys.public);
		verify.update("secret word");
		return verify.final(sig);
	}

	function testSignVerify(algName) {
		var sig = sign(algName);
		assert(sig.length, "Signature " + algName + " can not be null");
		var res = verify(algName, sig);
		assert(res, "Signature is not valid");
	}

	it("#sign/verify SHA1", function () {
		testSignVerify("ECDSA_SHA1");
	})

	it("#sign/verify SHA224", function () {
		testSignVerify("ECDSA_SHA224");
	})
	it("#sign/verify SHA256", function () {
		testSignVerify("ECDSA_SHA256");
	})
	it("#sign/verify SHA384", function () {
		testSignVerify("ECDSA_SHA384");
	})
	it("#sign/verify SHA512", function () {
		testSignVerify("ECDSA_SHA512");
	})
})
