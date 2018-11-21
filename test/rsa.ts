import assert from "assert";
import * as graphene from "../src";
import { MechanismType } from "../src/mech";
import config from "./config";
import { isSoftHSM, isThalesNShield } from "./helpers";

context("RSA", () => {
  let mod: graphene.Module;
  let slot: graphene.Slot;
  let session: graphene.Session;
  let keyPair: graphene.IKeyPair;
  let secretKey: graphene.Key;

  const MSG = "1234567890123456";
  const MSG_WRONG = MSG + "!";

  before(() => {
    mod = graphene.Module.load(config.init.lib, config.init.libName);
    mod.initialize();
    slot = mod.getSlots(config.controlValues.slot.slotIndex);
    session = slot.open();
    session.login(config.init.pin);
  });

  after(() => {
    if (session) {
      session.logout();
    }
    mod.finalize();
  });

  it("generate RSA", () => {
    keyPair = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
      keyType: graphene.KeyType.RSA,
      modulusBits: 2048,
      publicExponent: Buffer.from([3]),
      token: false,
      verify: true,
      encrypt: true,
      wrap: true,
    }, {
        keyType: graphene.KeyType.RSA,
        token: false,
        sign: true,
        decrypt: true,
        unwrap: true,
      });
  });

  it("generate AES", () => {
    secretKey = session.generateKey(graphene.KeyGenMechanism.AES, {
      keyType: graphene.KeyType.AES,
      valueLen: 256 / 8,
      extractable: true,
      token: false,
      encrypt: true,
    });
  });

  function testSignVerify(keys: graphene.IKeyPair, alg: MechanismType) {
    const sign = session.createSign(alg, keys.privateKey);
    const sig = sign.once(MSG);
    let verify = session.createVerify(alg, keys.publicKey);
    assert.equal(verify.once(MSG, sig), true, "Correct");
    verify = session.createVerify(alg, keys.publicKey);
    assert.equal(verify.once(MSG_WRONG, sig), false);
  }

  function testEncryptDecrypt(keys: graphene.IKeyPair, alg: MechanismType) {
    const encrypted = new Buffer(4096);
    const decrypted = new Buffer(4096);
    const cipher = session.createCipher(alg, keys.publicKey);
    const enc = cipher.once(MSG, encrypted);
    const decipher = session.createDecipher(alg, keys.privateKey);
    const dec = decipher.once(enc, decrypted);
    assert.equal(dec.toString(), MSG, "Correct");
  }

  function testWrapUnwrap(keys: graphene.IKeyPair, alg: MechanismType, sKey: graphene.Key) {
    const wKey = session.wrapKey(alg, keys.publicKey, sKey);
    const uKey = session.unwrapKey(alg, keys.privateKey, wKey, {
      class: graphene.ObjectClass.SECRET_KEY,
      keyType: graphene.KeyType.AES,
      extractable: true,
      token: false,
      encrypt: true,
      decrypt: true,
    });
    assert.equal(!!uKey.handle, true);
  }

  it("sign/verify SHA-1", () => {
    testSignVerify(keyPair, "SHA1_RSA_PKCS");
  });

  it("sign/verify SHA-1 once", () => {
    const sig = session.createSign("SHA1_RSA_PKCS", keyPair.privateKey).once(MSG);
    session.createVerify("SHA1_RSA_PKCS", keyPair.publicKey).once(MSG, sig);
  });

  it("sign/verify SHA-1 once async", (done) => {
    session.createSign("SHA1_RSA_PKCS", keyPair.privateKey).once(MSG, (err, sig) => {
      assert.equal(!!err, false, err ? err.message : "Error");
      session.createVerify("SHA1_RSA_PKCS", keyPair.publicKey).once(MSG, sig, (err) => {
        assert.equal(!!err, false, err ? err.message : "Error");
        done();
      });
    });
  });

  it("sign/verify SHA-224", () => {
    if (isThalesNShield(mod)) { return; }
    testSignVerify(keyPair, "SHA224_RSA_PKCS");
  });

  it("sign/verify SHA-256", () => {
    if (isThalesNShield(mod)) { return; }
    testSignVerify(keyPair, "SHA256_RSA_PKCS");
  });

  it("sign/verify SHA-384", () => {
    if (isThalesNShield(mod)) { return; }
    testSignVerify(keyPair, "SHA384_RSA_PKCS");
  });

  it("sign/verify SHA-512", () => {
    if (isThalesNShield(mod)) { return; }
    testSignVerify(keyPair, "SHA512_RSA_PKCS");
  });

  it("OAEP encrypt/decrypt default SHA-1", () => {
    testEncryptDecrypt(keyPair, { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams() });
  });

  it("OAEP encrypt/decrypt SHA-1", () => {
    testEncryptDecrypt(keyPair, {
      name: "RSA_PKCS_OAEP",
      params: new graphene.RsaOaepParams(graphene.MechanismEnum.SHA1, graphene.RsaMgf.MGF1_SHA1),
    });
  });

  it("OAEP encrypt/decrypt SHA-1 with params", () => {
    if (isSoftHSM(mod)) { return; }
    testEncryptDecrypt(keyPair, {
      name: "RSA_PKCS_OAEP",
      params: new graphene.RsaOaepParams(
        graphene.MechanismEnum.SHA1,
        graphene.RsaMgf.MGF1_SHA1,
        Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
      ),
    });
  });

  it("OAEP wrap/unwrap SHA-1", () => {
    testWrapUnwrap(keyPair, { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams() }, secretKey);
  });

  it("OAEP wrap/unwrap SHA-1 async", (done) => {
    const alg = { name: "RSA_PKCS_OAEP", params: new graphene.RsaOaepParams() };
    session.wrapKey(alg, keyPair.publicKey, secretKey, (err, wKey) => {
      assert.equal(!!err, false, err ? err.message : "Error");
      session.unwrapKey(
        alg,
        keyPair.privateKey,
        wKey!,
        {
          class: graphene.ObjectClass.SECRET_KEY,
          keyType: graphene.KeyType.AES,
          extractable: true,
          token: false,
          encrypt: true,
          decrypt: true,
        },
        (err, uKey) => {
          assert.equal(!!err, false, err ? err.message : "Error");
          assert.equal(!!uKey!.handle, true);
          done();
        });

    });
  });

  it("RSA 1.5 sign/verify", () => {
    testSignVerify(keyPair, "RSA_PKCS");
  });

  it("RSA 1.5 encrypt/decrypt", () => {
    testEncryptDecrypt(keyPair, "RSA_PKCS");
  });

  it("RSA 1.5 wrap/unwrap", () => {
    testWrapUnwrap(keyPair, "RSA_PKCS", secretKey);
  });

  it("RSA PSS sign/verify default", () => {
    testSignVerify(keyPair, {
      name: "SHA1_RSA_PKCS_PSS",
      params: new graphene.RsaPssParams(),
    });
  });

  it("RSA PSS sign/verify SHA1", () => {
    testSignVerify(keyPair, {
      name: "SHA1_RSA_PKCS_PSS",
      params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA1, graphene.RsaMgf.MGF1_SHA1, 20),
    });
  });

  it("RSA PSS sign/verify SHA224", () => {
    testSignVerify(keyPair, {
      name: "SHA224_RSA_PKCS_PSS",
      params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA224, graphene.RsaMgf.MGF1_SHA224, 28),
    });
  });

  it("RSA PSS sign/verify SHA256", () => {
    testSignVerify(keyPair, {
      name: "SHA256_RSA_PKCS_PSS",
      params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA256, graphene.RsaMgf.MGF1_SHA256, 32),
    });
  });

  it("RSA PSS sign/verify SHA384", () => {
    testSignVerify(keyPair, {
      name: "SHA384_RSA_PKCS_PSS",
      params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA384, graphene.RsaMgf.MGF1_SHA384, 48),
    });
  });

  it("RSA PSS sign/verify SHA512", () => {
    testSignVerify(keyPair, {
      name: "SHA512_RSA_PKCS_PSS",
      params: new graphene.RsaPssParams(graphene.MechanismEnum.SHA512, graphene.RsaMgf.MGF1_SHA512, 64),
    });
  });

});
