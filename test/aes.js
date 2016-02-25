var assert = require('assert');
var config = require("./config.json");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("AES", function () {
	var mod, slot, session, skey;

	var MSG = "1234567890123456";
	var MSG_WRONG = MSG + "!";

	before(function () {
		mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        slot = mod.getSlots(0);
        session = slot.open();
        session.login(config.init.pin);
	})

	after(function () {
		if (session)
            session.logout();
        mod.finalize();
	})
    
    function test_generate(size){
       return session.generateKey(graphene.KeyGenMechanism.AES, {
            keyType: graphene.KeyType.AES,
            valueLen: size / 8,
            encrypt: true,
            decrypt: true,
            sign: true,
            verify: true,
            wrap: true,
            unwrap: true,
            token: false
        }); 
    }

	it("generate AES 128", function () {
	   test_generate(128);
	})
    
	it("generate AES 256", function () {
	   skey = test_generate(256);
	})
    
	it("generate AES 512", function () {
	   test_generate(512);
	})

	function test_sign_verify(_key, alg) {
		var sign = session.createSign(alg, _key);
        sign.update(MSG);
        var sig = sign.final();
        var verify = session.createVerify(alg, _key);
        verify.update(MSG);
        assert.equal(verify.final(sig), true, "Correct");
        verify = session.createVerify(alg, _key);
        verify.update(MSG_WRONG);
        assert.equal(verify.final(sig), false, "Wrong data");
	}

	function test_encrypt_decrypt(_key, alg) {
		var cipher = session.createCipher(alg, _key);
        var enc = cipher.update(MSG);
        enc = Buffer.concat([enc, cipher.final()]);
        var decipher = session.createDecipher(alg, _key);
        var dec = decipher.update(enc);
        assert.equal(Buffer.concat([dec, decipher.final()]).toString(), MSG, "Correct");
	}

	function test_wrap_unwrap(_key, alg, _skey) {
		var wkey = session.wrapKey(alg, _key, _skey);
        var ukey = session.unwrapKey(alg, _key, wkey, {
            "class": graphene.ObjectClass.SECRET_KEY,
            "keyType": graphene.KeyType.AES,
            "token": false,
            "valueLen": 256 / 8,
            "encrypt": true,
            "decrypt": true
        });
        assert.equal(!!ukey.handle, true);
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
			{ name: "V_AES_GCM", params: new graphene.AesGcmParams(new Buffer("123456789012")) });
	});

	it("AesGCM encrypt/decrypt with additionalData", function () {
		test_encrypt_decrypt(
			skey,
			{ name: "V_AES_GCM", params: new graphene.AesGcmParams(new Buffer("123456789012"), new Buffer("additional data")) });
	});
    
})