import assert from "assert";
import * as graphene from "../src";
import { MechanismType } from "../src/mech";
import config from "./config";
import { isThalesNShield } from "./helpers";

const TEST_MESSAGE = "Test message for crypto operations";

context("Session", () => {
  let mod: graphene.Module;
  let slot: graphene.Slot;
  let session: graphene.Session;

  before(() => {
    mod = graphene.Module.load(config.init.lib, config.init.libName);
    mod.initialize();
    slot = mod.getSlots(config.controlValues.slot.slotIndex);
  });

  after(() => {
    if (session) {
      session.logout();
    }
    mod.finalize();
    mod.close();
  });

  it("login/logout", () => {
    const session = slot.open();
    assert.throws(() => {
      session.login("WrongPin");
    }, Error);
    session.login(config.init.pin);
    session.logout();
    session.close();
  });

  function changePIN(session: graphene.Session, userType: graphene.UserType, oldPIN: string, newPIN: string) {
    session.login(oldPIN, userType);
    session.setPin(oldPIN, newPIN);
    session.logout();
  }

  it("changing PIN for User", () => {
    const session = slot.open(2 | 4);
    try {
      const oldPIN = config.init.pin;
      const newPIN = "54321";
      assert.strictEqual(graphene.UserType.USER, 1);
      changePIN(session, graphene.UserType.USER, oldPIN, newPIN);
      changePIN(session, graphene.UserType.USER, newPIN, oldPIN);
    } catch (e) {
      session.close();
      throw e;
    }
    session.close();
  }).timeout(60000);

  it("changing PIN for SO", () => {
    const session = slot.open(2 | 4);
    try {
      const oldPIN = config.init.pin;
      const newPIN = "54321";
      assert.strictEqual(graphene.UserType.SO, 0);
      changePIN(session, graphene.UserType.SO, oldPIN, newPIN);
      changePIN(session, graphene.UserType.SO, newPIN, oldPIN);
    } catch (e) {
      session.close();
      throw e;
    }
    session.close();
  }).timeout(60000);

  it("create", () => {
    // create new session for current test
    session = slot.open(2 | 4);
    session.login(config.init.pin);
    const modulus = Buffer.alloc(128);
    modulus[127] = 1;
    let objects = session.find();
    assert.strictEqual(objects.length, 0, "Wrong init objects length");

    session.create({
      class: graphene.ObjectClass.PUBLIC_KEY,
      keyType: graphene.KeyType.RSA,
      wrap: true,
      modulus,
      publicExponent: Buffer.from([1, 0, 1]),
    });

    const obj = session.create({
      class: graphene.ObjectClass.DATA,
      application: "application",
      label: "My label",
      value: Buffer.from("value"),
    });

    const data = obj.toType<graphene.Data>();
    assert.strictEqual(data.application, "application");
    assert.strictEqual(data.label.toString(), "My label");
    assert.strictEqual(data.value.toString(), "value");
    assert.strictEqual(data.class, 0);

    objects = session.find();
    assert.strictEqual(objects.length, 2, "Wrong objects length");
  });

  it("copy", () => {

    session.clear();
    let objects = session.find();
    assert.strictEqual(objects.length, 0, "Wrong init objects length");

    const obj = session.generateKey("AES_KEY_GEN", {
      keyType: graphene.KeyType.AES,
      label: "label",
      valueLen: 256 / 8,
      extractable: false,
      sensitive: false,
      encrypt: true,
      private: true,
    });

    // test objects length
    objects = session.find();
    assert.strictEqual(objects.length, 1, "Wrong objects length");

    session.copy(
      obj,
      {
        label: "copy of key",
      },
    );

    // test objects length
    objects = session.find();
    assert.strictEqual(objects.length, 2, "Wrong objects length");
  });

  it("find", () => {
    function templateGenerator(label: string, value: string) {
      if (isThalesNShield(mod)) {
        return {
          class: graphene.ObjectClass.DATA,
          application: "testFind",
          label,
          value: Buffer.from(value),
        };
      } else {
        return {
          class: graphene.ObjectClass.DATA,
          application: "testFind",
          objectId: Buffer.from(label),
          value: Buffer.from(value),
        };
      }
    }

    const count = session.find().length;

    session.create(templateGenerator("first", "1"));
    session.create(templateGenerator("second", "2"));
    session.create(templateGenerator("third", "3"));

    assert.strictEqual(session.find().length, count + 3);
    const objects = session.find({
      application: "testFind",
    });
    assert.strictEqual(objects.length, 3);
    assert.strictEqual(objects.items(0).toType<graphene.Data>().value.toString(), "1");
    assert.strictEqual(objects.items(1).toType<graphene.Data>().value.toString(), "2");
    assert.strictEqual(objects.items(2).toType<graphene.Data>().value.toString(), "3");
  });

  it("destroy by template", () => {
    const count = session.find().length;

    session.create({
      class: graphene.ObjectClass.DATA,
      label: "destroy",
      application: "application",
      value: Buffer.from("1"),
    });
    session.create({
      class: graphene.ObjectClass.DATA,
      label: "destroy",
      application: "application",
      value: Buffer.from("2"),
    });

    assert.strictEqual(session.find().length, count + 2);

    session.destroy({ label: "destroy" });

    assert.strictEqual(session.find().length, count);

  });

  it("destroy by object", () => {
    const count = session.find().length;

    const obj = session.create({
      class: graphene.ObjectClass.DATA,
      label: "destroy",
      application: "application",
      value: Buffer.from("first"),
    });
    session.create({
      class: graphene.ObjectClass.DATA,
      label: "destroy",
      application: "application",
      value: Buffer.from("second"),
    });

    assert.strictEqual(session.find().length, count + 2);

    session.destroy(obj);

    assert.strictEqual(session.find().length, count + 1);

  });

  it("clear", () => {
    assert.strictEqual(session.find().length !== 0, true);

    session.clear();

    assert.strictEqual(session.find().length === 0, true);

  });

  it("generate key AES", () => {
    const keylen = 256 / 8;
    const key = session.generateKey("AES_KEY_GEN", {
      keyType: graphene.KeyType.AES,
      label: "label",
      valueLen: keylen,
      extractable: true,
      encrypt: true,
    });
    if (!isThalesNShield(mod)) {
      assert.strictEqual(!key.checkValue, false);
    }
    assert.strictEqual(key.encrypt, true);
    assert.strictEqual(key.getAttribute("value").length, keylen);
  });

  it("generate key pair RSA", () => {
    const keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
      keyType: graphene.KeyType.RSA,
      encrypt: true,
      modulusBits: 1024,
      publicExponent: Buffer.from([3]),
    },
      {
        keyType: graphene.KeyType.RSA,
        decrypt: true,
      });
    assert.strictEqual(!keys, false);
    assert.strictEqual(keys.publicKey.class, graphene.ObjectClass.PUBLIC_KEY);
    assert.strictEqual(keys.privateKey.class, graphene.ObjectClass.PRIVATE_KEY);
  });

  it("getObject wrong handle", () => {
    assert.strictEqual(!session.getObject(Buffer.from([0xff, 0xff])), true);
  });

  it("getObject", () => {
    let obj: graphene.SessionObject;
    session.find((o) => {
      obj = o;
      return false; // exit on first element
    });
    assert.strictEqual(!session.getObject(obj!.handle), false);
  });

  function testSign(alg: MechanismType, key1: graphene.Key, key2: graphene.Key) {
    const sign = session.createSign(alg, key1);
    sign.update(TEST_MESSAGE);
    sign.update(TEST_MESSAGE);
    const signature = sign.final();
    assert.strictEqual(!!signature.length, true);

    const verify = session.createVerify(alg, key2);
    verify.update(TEST_MESSAGE);
    verify.update(TEST_MESSAGE);
    assert.strictEqual(verify.final(signature), true);
  }

  it("sign/verify RSA", () => {
    const keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
      keyType: graphene.KeyType.RSA,
      verify: true,
      modulusBits: 1024,
      publicExponent: Buffer.from([3]),
    },
      {
        keyType: graphene.KeyType.RSA,
        sign: true,
      });

    testSign(graphene.MechanismEnum.SHA1_RSA_PKCS, keys.privateKey, keys.publicKey);
  });

});
