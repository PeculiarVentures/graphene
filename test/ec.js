var assert = require('assert');
var config = require("./config.json");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("ECDSA", function () {
	var mod, slot, session, keys, skey;

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

	it("generate AES", function () {
		skey = session.generateKey(graphene.KeyGenMechanism.AES, {
            keyType: graphene.KeyType.AES,
            valueLen: 256 / 8
        });
	})
    
    function test_generate(paramsEc){
        return session.generateKeyPair(graphene.KeyGenMechanism.EC, {
            keyType: graphene.KeyType.EC,
            paramsEC: paramsEc,
            token: false,
            verify: true,
            encrypt: true,
            wrap: true
        }, {
                keyType: graphene.KeyType.EC,
                token: false,
                sign: true,
                decrypt: true,
                unwrap: true
            });
    }

	it("generate ECDSA secp192r1 by OID", function () {
		test_generate(graphene.NamedCurve.getByOid("1.2.840.10045.3.1.1"));
	})

	it("generate ECDSA secp256r1 by name", function () {
		keys = test_generate(graphene.NamedCurve.getByName("secp256r1"));
	})

	it("generate ECDSA secp192r1 by Buffer", function () {
		test_generate(new Buffer("06082A8648CE3D030101", "hex"));
	})

	function test_sign_verify(_key, alg) {
        var sign = session.createSign(alg, _key.privateKey);
        sign.update(MSG);
        var sig = sign.final();
        var verify = session.createVerify(alg, _key.publicKey);
        verify.update(MSG);
        assert.equal(verify.final(sig), true, "Correct");
        verify = session.createVerify(alg, _key.publicKey);
        verify.update(MSG_WRONG);
        assert.equal(verify.final(sig), false, "Wrong data");
    }

    function test_encrypt_decrypt(_key, alg) {
        var cipher = session.createCipher(alg, _key.publicKey);
        var enc = cipher.update(MSG);
        enc = Buffer.concat([enc, cipher.final()]);
        var decipher = session.createDecipher(alg, _key.privateKey);
        var dec = decipher.update(enc);
        assert.equal(Buffer.concat([dec, decipher.final()]).toString(), MSG, "Correct");
    }

	function test_derive(_key, alg, template) {
		var dkey = session.deriveKey(alg, _key.privateKey, template).toType();
		assert.equal(!!dkey, true, "Empty derived key");
	}

	it("sign/verify SHA-1", function () {
		test_sign_verify(keys, "ECDSA_SHA1");
	});

	it("sign/verify SHA-224", function () {
		test_sign_verify(keys, "ECDSA_SHA224");
	});

	it("sign/verify SHA-256", function () {
		test_sign_verify(keys, "ECDSA_SHA256");
	});

	it("sign/verify SHA-384", function () {
		test_sign_verify(keys, "ECDSA_SHA384");
	});

	it("sign/verify SHA-512", function () {
		test_sign_verify(keys, "ECDSA_SHA512");
	});

	it("derive AES", function () {		
		test_derive(
			keys,
			{
				name: "ECDH1_DERIVE",
				params: new graphene.EcdhParams(
					graphene.EcKdf.SHA224,
					null,
					keys.publicKey.pointEC
				)},
			{
				"class": graphene.ObjectClass.SECRET_KEY,
				"token": false,
				"keyType": graphene.KeyType.AES,
				"valueLen": 192 / 8,
				"encrypt": true,
				"decrypt": true
			});
	});
    
})