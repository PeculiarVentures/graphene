var assert = require('assert');
var config = require("./config.json");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("ECDSA", function () {
    var mod, slot, session, signingKeys, derivationKeys, skey;

    var MSG = "1234567890123456";
    var MSG_WRONG = MSG + "!";

    function test_manufacturer(manufacturerID) {
        if (mod.manufacturerID == manufacturerID) {
            console.warn("    \x1b[33mWARN:\x1b[0m Test is not supported for %s", manufacturerID);
            return true;
        }
        return false;
    }

    function isSoftHSM() {
        return test_manufacturer("SoftHSM");
    }
    
    function isThalesNShield() {
        return test_manufacturer("nCipher Corp. Ltd");
    }

    before(function () {
        mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        slot = mod.getSlots(config.controlValues.slot.slotIndex);
        session = slot.open();
        session.login(config.init.pin);
        if (config.init.vendor) {
            graphene.Mechanism.vendor(config.init.vendor);
        }
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

    function test_generate_signing_keys(paramsEc) {
        return session.generateKeyPair(graphene.KeyGenMechanism.EC, {
            keyType: graphene.KeyType.EC,
            paramsEC: paramsEc,
            token: false,
            verify: true,
            encrypt: true,
            wrap: true,
            derive: false
        }, {
                keyType: graphene.KeyType.EC,
                token: false,
                sign: true,
                decrypt: true,
                unwrap: true,
                derive: false
            });
    }
    
    function test_generate_derivation_keys(paramsEc) {
        return session.generateKeyPair(graphene.KeyGenMechanism.EC, {
            keyType: graphene.KeyType.EC,
            paramsEC: paramsEc,
            token: false,
            verify: false,
            encrypt: true,
            wrap: false,
            derive: true
        }, {
                keyType: graphene.KeyType.EC,
                token: false,
                sign: false,
                decrypt: true,
                unwrap: true,
                derive: true
            });
    }

    it("generate ECDSA secp192r1 by OID", function () {
        test_generate_signing_keys(graphene.NamedCurve.getByOid("1.2.840.10045.3.1.1").value);
    })

    it("generate ECDSA secp256r1 signing keys by name", function () {
        signingKeys = test_generate_signing_keys(graphene.NamedCurve.getByName("secp256r1").value);
    })

    it("generate ECDSA secp192r1 by Buffer", function () {
        test_generate_signing_keys(new Buffer("06082A8648CE3D030101", "hex"));
    })
    
    it("generate ECDSA secp256r1 derivation keys by name", function () {
        derivationKeys = test_generate_derivation_keys(graphene.NamedCurve.getByName("secp256r1").value);
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
        assert.throws(function () {
          verify.final(sig)
        });
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
        var dkey = session.deriveKey(alg, _key.privateKey, template);
        assert.equal(!!dkey, true, "Empty derived key");
    }

    it("sign/verify SHA-1", function () {
        if (isSoftHSM()) return;
        test_sign_verify(signingKeys, "ECDSA_SHA1");
    });

    it("sign/verify SHA-224", function () {
        if (isSoftHSM() || isThalesNShield()) return;
        test_sign_verify(signingKeys, "ECDSA_SHA224");
    });

    it("sign/verify SHA-256", function () {
        if (isSoftHSM() || isThalesNShield()) return;
        test_sign_verify(signingKeys, "ECDSA_SHA256");
    });

    it("sign/verify SHA-384", function () {
        if (isSoftHSM() || isThalesNShield()) return;
        test_sign_verify(signingKeys, "ECDSA_SHA384");
    });

    it("sign/verify SHA-512", function () {
        if (isSoftHSM() || isThalesNShield()) return;
        test_sign_verify(signingKeys, "ECDSA_SHA512");
    });

    it("derive AES", function () {
        if (isSoftHSM()) return;
        test_derive(
            derivationKeys,
            {
                name: "ECDH1_DERIVE",
                params: new graphene.EcdhParams(
                    graphene.EcKdf.SHA1,
                    null,
                    derivationKeys.publicKey.getAttribute({ pointEC: null }).pointEC
                )
            },
            {
                "class": graphene.ObjectClass.SECRET_KEY,
                "token": false,
                "keyType": graphene.KeyType.AES,
                "valueLen": 256 / 8,
                "encrypt": true,
                "decrypt": true,
            });
    });

    it("derive AES async", function (done) {
        session.deriveKey(
            {
                name: "ECDH1_DERIVE",
                params: new graphene.EcdhParams(
                    graphene.EcKdf.NULL,
                    null,
                    derivationKeys.publicKey.getAttribute({ pointEC: null }).pointEC
                )
            },
            derivationKeys.privateKey,
            {
                "class": graphene.ObjectClass.SECRET_KEY,
                "token": false,
                "keyType": graphene.KeyType.AES,
                "valueLen": 256 / 8,
                "encrypt": true,
                "decrypt": true,
            },
            function (err, dKey) {
                assert.equal(!!dKey, true, err ? err.message : "Empty dKey");
                done();
            });
    });

})
