import * as assert from "assert";
import * as graphene from "../src";
import { IAlgorithm, MechanismType } from "../src/mech";
import config from "./config";
import { isSoftHSM, isThalesNShield } from "./helpers";

context("AES", () => {
  let mod: graphene.Module;
  let slot: graphene.Slot;
  let session: graphene.Session;
  let secretKey: graphene.Key;

  const MSG = "1234567890123456";

  before(() => {
    mod = graphene.Module.load(config.init.lib, config.init.libName);
    mod.initialize();
    slot = mod.getSlots(config.controlValues.slot.slotIndex);
    session = slot.open();
    session.login(config.init.pin);
    if (config.init.vendor) {
      graphene.Mechanism.vendor(config.init.vendor);
    }

    secretKey = session.generateKey(graphene.KeyGenMechanism.AES, {
      keyType: graphene.KeyType.AES,
      valueLen: 192 / 8,
      encrypt: true,
      decrypt: true,
      sign: true,
      verify: true,
      wrap: true,
      unwrap: true,
      derive: true,
      token: false,
    });
  });

  after(() => {
    if (session) {
      session.logout();
    }
    mod.finalize();
  });

  function testGenerate(size: number) {
    return session.generateKey(graphene.KeyGenMechanism.AES, {
      keyType: graphene.KeyType.AES,
      valueLen: size / 8,
      encrypt: true,
      decrypt: true,
      sign: true,
      verify: true,
      wrap: true,
      unwrap: true,
      derive: true,
      token: false,
    });
  }

  it("generate AES 128", () => {
    testGenerate(128);
  });

  it("generate AES 192", () => {
    testGenerate(192);
  });

  it("generate AES 256", () => {
    testGenerate(256);
  });

  function testEncryptDecrypt(key: graphene.Key, alg: MechanismType) {
    const cipher = session.createCipher(alg, key);
    let enc = cipher.update(MSG);
    enc = Buffer.concat([enc, cipher.final()]);
    const decipher = session.createDecipher(alg, key, enc.length);
    const dec = decipher.update(enc);
    assert.strictEqual(Buffer.concat([dec, decipher.final()]).toString(), MSG, "Correct");
  }

  function testWrapUnwrap(key: graphene.Key, alg: MechanismType, sKey: graphene.Key) {
    const wKey = session.wrapKey(alg, key, sKey);
    const uKey = session.unwrapKey(alg, key, wKey, {
      class: graphene.ObjectClass.SECRET_KEY,
      keyType: graphene.KeyType.AES,
      token: false,
      valueLen: 256 / 8,
      encrypt: true,
      decrypt: true,
    });
    assert.strictEqual(!!uKey.handle, true);
  }

  it("AesCBC encrypt/decrypt", () => {
    testEncryptDecrypt(
      secretKey,
      { name: "AES_CBC", params: Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) });
  });

  it("AesCBC wrap/unwrap", () => {
    if (isSoftHSM(mod)) { return; }
    testWrapUnwrap(
      secretKey,
      { name: "AES_CBC", params: Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) },
      secretKey);
  });

  it("AesCBC derive", () => {
    const derivedKey = session.deriveKey(
      {
        name: "AES_CBC_ENCRYPT_DATA",
        params: new graphene.AesCbcEncryptDataParams(
          Buffer.from("1234567890abcdef"),
          Buffer.from("12345678901234567890123456789012"),
        ),
      },
      secretKey,
      {
        class: graphene.ObjectClass.SECRET_KEY,
        keyType: graphene.KeyType.AES,
        private: false,
        encrypt: true,
        decrypt: true,
        sensitive: false,
        extractable: true,
        valueLen: 32,
      },
    );

    assert.strictEqual(!!derivedKey, true);
  });

  it("AesCBCPad encrypt/decrypt", () => {
    testEncryptDecrypt(
      secretKey,
      { name: "AES_CBC_PAD", params: Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) });
  });

  it("AesGCM encrypt/decrypt default", () => {
    if (isThalesNShield(mod)) { return; }

    let params = new graphene.AesGcmParams(Buffer.from("123456789012"));
    if (isSoftHSM(mod)) {
      params = new graphene.AesGcm240Params(Buffer.from("123456789012"));
    }
    testEncryptDecrypt(
      secretKey,
      { name: "AES_GCM", params });
  });

  it("AesGCM encrypt/decrypt with additionalData", () => {
    if (isThalesNShield(mod)) { return; }

    let params = new graphene.AesGcmParams(Buffer.from("123456789012"), Buffer.from("additional data"));
    if (isSoftHSM(mod)) {
      params = new graphene.AesGcm240Params(Buffer.from("123456789012"), Buffer.from("additional data"));
    }
    testEncryptDecrypt(
      secretKey,
      {
        name: "AES_GCM",
        params,
      });
  });

});
