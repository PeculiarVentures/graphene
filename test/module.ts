import assert from "assert";
import os from "os";
import * as graphene from "../src";
import config from "./config";

const Module = graphene.Module;

context("Module", () => {

  it("load", () => {
    assert.throws(() => {
      Module.load("unknown/path/name");
    }, Error);
    assert.throws(() => {
      Module.load("unknown/path/name", "");
    }, Error);
    assert(Module.load(config.init.lib, config.init.libName));
  });

  it("initialize/finalize", () => {
    assert.doesNotThrow(() => {
      const mod = Module.load(config.init.lib, config.init.libName);
      mod.initialize();

      mod.finalize();
    }, Error);
  });

  it("getSlots", () => {
    const mod = Module.load(config.init.lib, config.init.libName);
    mod.initialize();

    const slots = mod.getSlots(true);
    const slotLength = slots.length;
    mod.finalize();

    assert.strictEqual(slotLength, config.controlValues.slotsCount, "Wrong number of slots");
  });

  it("props", () => {
    const mod = Module.load(config.init.lib, config.init.libName);
    mod.initialize();

    assert.strictEqual(mod.libFile, config.init.lib, "Wrong libFile");
    assert.strictEqual(mod.libName, config.init.libName, "Wrong libName");
    assert.strictEqual(mod.flags, 0, "Wrong flags");
    assert.strictEqual(mod.manufacturerID, config.controlValues.module.manufacturerID, "Wrong manufacturerID");
    assert.strictEqual(mod.libraryDescription, config.controlValues.module.libraryDescription, "Wrong libraryDescription");

    mod.finalize();
  });

  context("NSS", () => {
    const libPathNSS = os.platform() === "darwin"
      ? "/usr/local/opt/nss/lib/libsoftokn3.dylib"
      : "/usr/lib/x86_64-linux-gnu/nss/libsoftokn3.so";

    it("Initialize", () => {
      const mod = Module.load(libPathNSS, "NSS");
      mod.initialize({
        // tslint:disable-next-line:max-line-length
        libraryParameters: "configdir='' certPrefix='' keyPrefix='' secmod='' flags=readOnly,noCertDB,noModDB,forceOpen,optimizeSpace",
      });

      const slot = mod.getSlots(1, true);
      const session = slot.open();

      const rnd = session.generateRandom(20);
      assert.strictEqual(!!rnd, true);
      assert.strictEqual(rnd.length, 20);

      mod.finalize();
    });

  });
});
