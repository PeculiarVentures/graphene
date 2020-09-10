import * as assert from "assert";
import * as graphene from "../src";
import { MechanismType } from "../src/mech";
import { ITemplate } from "../src/template";
import config from "./config";
import { isSoftHSM, isThalesNShield } from "./helpers";

context("ECDSA", () => {
  let mod: graphene.Module;
  let slot: graphene.Slot;
  let session: graphene.Session;
  let signingKeys: graphene.IKeyPair;
  let derivationKeys: graphene.IKeyPair;

  const MSG = "1234567890123456";
  const MSG_WRONG = MSG + "!";

  before(() => {
    mod = graphene.Module.load(config.init.lib, config.init.libName);
    mod.initialize();
    slot = mod.getSlots(config.controlValues.slot.slotIndex);
    session = slot.open();
    session.login(config.init.pin);
    if (config.init.vendor) {
      graphene.Mechanism.vendor(config.init.vendor);
    }
    signingKeys = testGenerateSigningKeys(graphene.NamedCurve.getByName("secp256r1").value);
  });

  after(() => {
    if (session) {
      session.logout();
    }
    mod.finalize();
  });

  function testGenerateSigningKeys(paramsEc: Buffer) {
    return session.generateKeyPair(graphene.KeyGenMechanism.EC, {
      keyType: graphene.KeyType.EC,
      paramsEC: paramsEc,
      token: false,
      verify: true,
      encrypt: true,
      wrap: true,
      derive: false,
    }, {
      keyType: graphene.KeyType.EC,
      token: false,
      sign: true,
      decrypt: true,
      unwrap: true,
      derive: false,
    });
  }

  function testGenerateDerivationKeys(paramsEc: Buffer) {
    return session.generateKeyPair(graphene.KeyGenMechanism.EC, {
      keyType: graphene.KeyType.EC,
      paramsEC: paramsEc,
      token: false,
      verify: false,
      encrypt: true,
      wrap: false,
      derive: true,
    }, {
      keyType: graphene.KeyType.EC,
      token: false,
      sign: false,
      decrypt: true,
      unwrap: true,
      derive: true,
    });
  }

  it("generate ECDSA secp192r1 by OID", () => {
    testGenerateSigningKeys(graphene.NamedCurve.getByOid("1.2.840.10045.3.1.1").value);
  });

  it("generate ECDSA secp256r1 signing keys by name", () => {
    testGenerateSigningKeys(graphene.NamedCurve.getByName("secp256r1").value);
  });

  it("generate ECDSA secp256k1 signing keys by name", () => {
    testGenerateSigningKeys(graphene.NamedCurve.getByName("secp256k1").value);
  });

  it("generate ECDSA secp192r1 by Buffer", () => {
    testGenerateSigningKeys(Buffer.from("06082A8648CE3D030101", "hex"));
  });

  it("generate ECDSA secp256r1 derivation keys by name", () => {
    derivationKeys = testGenerateDerivationKeys(graphene.NamedCurve.getByName("secp256r1").value);
  });

  function testSignVerify(key: graphene.IKeyPair, alg: MechanismType) {
    const sign = session.createSign(alg, key.privateKey);
    sign.update(MSG);
    const sig = sign.final();
    let verify = session.createVerify(alg, key.publicKey);
    verify.update(MSG);
    assert.strictEqual(verify.final(sig), true, "Correct");
    verify = session.createVerify(alg, key.publicKey);
    verify.update(MSG_WRONG);
    assert.throws(() => {
      verify.final(sig);
    });
  }

  function testDerive(keys: graphene.IKeyPair, alg: MechanismType, template: ITemplate) {
    const dKey = session.deriveKey(alg, keys.privateKey, template);
    assert.strictEqual(!!dKey, true, "Empty derived key");
  }

  it("sign/verify ECDSA P-256", () => {
    const digest = Buffer.from("1234567890abcdf");
    const sign = session.createSign("ECDSA", signingKeys.privateKey);
    const sig = sign.once(digest);
    let verify = session.createVerify("ECDSA", signingKeys.publicKey);
    assert.strictEqual(verify.once(digest, sig), true, "Correct");
    verify = session.createVerify("ECDSA", signingKeys.publicKey);
    assert.strictEqual(verify.once(Buffer.from("1234567890abcd0"), sig), false);
  });

  it("sign/verify ECDSA K-256", () => {
    const digest = Buffer.from("1234567890abcdf");
    const keys = testGenerateSigningKeys(graphene.NamedCurve.getByName("secp256k1").value);
    const sign = session.createSign("ECDSA", keys.privateKey);
    const sig = sign.once(digest);
    let verify = session.createVerify("ECDSA", keys.publicKey);
    assert.strictEqual(verify.once(digest, sig), true, "Correct");
    verify = session.createVerify("ECDSA", keys.publicKey);
    assert.strictEqual(verify.once(Buffer.from("1234567890abcd0"), sig), false);
  });

  it("sign/verify SHA-1", function() {
    if (isSoftHSM(mod)) {
      this.skip();
    }
    testSignVerify(signingKeys, "ECDSA_SHA1");
  });

  it("sign/verify SHA-224", function() {
    if (isSoftHSM(mod) || isThalesNShield(mod)) {
      this.skip();
    }
    testSignVerify(signingKeys, "ECDSA_SHA224");
  });

  it("sign/verify SHA-256", function() {
    if (isSoftHSM(mod) || isThalesNShield(mod)) {
      this.skip();
    }
    testSignVerify(signingKeys, "ECDSA_SHA256");
  });

  it("sign/verify SHA-384", function() {
    if (isSoftHSM(mod) || isThalesNShield(mod)) {
      this.skip();
    }
    testSignVerify(signingKeys, "ECDSA_SHA384");
  });

  it("sign/verify SHA-512", function() {
    if (isSoftHSM(mod) || isThalesNShield(mod)) {
      this.skip();
    }
    testSignVerify(signingKeys, "ECDSA_SHA512");
  });

  it("derive AES", () => {
    testDerive(
      derivationKeys,
      {
        name: "ECDH1_DERIVE",
        params: new graphene.EcdhParams(
          graphene.EcKdf.NULL,
          null,
          derivationKeys.publicKey.getAttribute({ pointEC: null }).pointEC,
        ),
      },
      {
        class: graphene.ObjectClass.SECRET_KEY,
        token: false,
        keyType: graphene.KeyType.AES,
        valueLen: 256 / 8,
        encrypt: true,
        decrypt: true,
      });
  });

  it("derive AES async", (done) => {
    session.deriveKey(
      {
        name: "ECDH1_DERIVE",
        params: new graphene.EcdhParams(
          graphene.EcKdf.NULL,
          null,
          derivationKeys.publicKey.getAttribute({ pointEC: null }).pointEC,
        ),
      },
      derivationKeys.privateKey,
      {
        class: graphene.ObjectClass.SECRET_KEY,
        token: false,
        keyType: graphene.KeyType.AES,
        valueLen: 256 / 8,
        encrypt: true,
        decrypt: true,
      },
      (err, dKey) => {
        assert.strictEqual(!!dKey, true, err ? err.message : "Empty dKey");
        done();
      });
  });

});
