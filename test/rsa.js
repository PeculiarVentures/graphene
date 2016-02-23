var assert = require('assert');
var config = require("./config.json");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("RSA", function () {
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

    it("generate RSA", function () {
        keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
            keyType: graphene.KeyType.RSA,
            modulusBits: 1024,
            publicExponent: new Buffer([3]),
            token: false,
            verify: true,
            encrypt: true,
            wrap: true
        }, {
                keyType: graphene.KeyType.RSA,
                token: false,
                sign: true,
                decrypt: true,
                unwrap: true
            });
    })

    it("generate AES", function () {
        skey = session.generateKey(graphene.KeyGenMechanism.AES, {
            keyType: graphene.KeyType.AES,
            valueLen: 256 / 8
        });
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

    function test_wrap_unwrap(_key, alg, _skey) {
        var wkey = session.wrapKey(alg, _key.publicKey, _skey);
        var ukey = session.unwrapKey(alg, _key.privateKey, wkey, {
            "class": graphene.ObjectClass.SECRET_KEY,
            "keyType": graphene.KeyType.AES,
            "token": false,
            "valueLen": 256 / 8,
            "encrypt": true,
            "decrypt": true
        });
        assert.equal(!!ukey.handle, true);
    }

    it("sign/verify SHA-1", function () {
        test_sign_verify(keys, "SHA1_RSA_PKCS");
    });

    it("sign/verify SHA-224", function () {
        test_sign_verify(keys, "SHA224_RSA_PKCS");
    });

    it("sign/verify SHA-256", function () {
        test_sign_verify(keys, "SHA256_RSA_PKCS");
    });

    it("sign/verify SHA-384", function () {
        test_sign_verify(keys, "SHA384_RSA_PKCS");
    });

    it("sign/verify SHA-512", function () {
        test_sign_verify(keys, "SHA512_RSA_PKCS");
    });

    it("OAEP encrypt/decrypt default SHA-1", function () {
        test_encrypt_decrypt(keys, { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams() })
    });

    it("OAEP encrypt/decrypt SHA-1", function () {
        test_encrypt_decrypt(keys, { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams(graphene.MechanismEnum.SHA1, graphene.RsaMgf.MGF1_SHA1) })
    });

    it("OAEP encrypt/decrypt SHA-1 with params", function () {
        test_encrypt_decrypt(keys, { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams(graphene.MechanismEnum.SHA1, graphene.RsaMgf.MGF1_SHA1, new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])) })
    });

    it("OAEP wrap/unwrap SHA-1", function () {
        test_wrap_unwrap(keys, { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams() }, skey);
    });

    it("RSA 1.5 sign/verify", function () {
        test_sign_verify(keys, "RSA_PKCS");
    });

    it("RSA 1.5 encrypt/decrypt", function () {
        test_encrypt_decrypt(keys, "RSA_PKCS")
    });

    it("RSA 1.5 wrap/unwrap", function () {
        test_wrap_unwrap(keys, "RSA_PKCS", skey);
    });

    it("RSA PSS sign/verify default", function () {
        test_sign_verify(keys, { name: "SHA1_RSA_PKCS_PSS", params: new graphene.RsaPssParams() });
    });

    it("RSA PSS sign/verify SHA1", function () {
        test_sign_verify(keys, { name: "SHA1_RSA_PKCS_PSS", params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA1, graphene.RsaMgf.MGF1_SHA1) });
    });

    it("RSA PSS sign/verify SHA224", function () {
        test_sign_verify(keys, { name: "SHA224_RSA_PKCS_PSS", params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA224, graphene.RsaMgf.MGF1_SHA224) });
    });

    it("RSA PSS sign/verify SHA256", function () {
        test_sign_verify(keys, { name: "SHA256_RSA_PKCS_PSS", params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA256, graphene.RsaMgf.MGF1_SHA256) });
    });

    it("RSA PSS sign/verify SHA384", function () {
        test_sign_verify(keys, { name: "SHA384_RSA_PKCS_PSS", params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA384, graphene.RsaMgf.MGF1_SHA384) });
    });

    it("RSA PSS sign/verify SHA512", function () {
        test_sign_verify(keys, { name: "SHA512_RSA_PKCS_PSS", params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA512, graphene.RsaMgf.MGF1_SHA512) });
    });

})