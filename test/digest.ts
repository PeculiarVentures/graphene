import * as assert from "assert";
import * as graphene from "../src";
import config from "./config";

context("Digest", () => {

  let mod: graphene.Module;
  let slot: graphene.Slot;

  before(() => {
    mod = graphene.Module.load(config.init.lib, config.init.libName);
    mod.initialize();
    slot = mod.getSlots(true).items(config.controlValues.slot.slotIndex);
  });

  after(() => {
    slot.closeAll();
    mod.finalize();
  });

  it("SHA", () => {
    const session = slot.open();
    const digest = session.createDigest({ name: "SHA1", params: null });

    digest.update("some data");
    const md = digest.final();
    assert.equal(md.toString("hex"), "baf34551fecb48acc3da868eb85e1b6dac9de356");
  });

  context("once", () => {

    it("sync", () => {
      const session = slot.open();
      const digest = session.createDigest({ name: "SHA1", params: null });

      const md = digest.once("some data");
      assert.equal(md.toString("hex"), "baf34551fecb48acc3da868eb85e1b6dac9de356");
    });

    it("async", (done) => {
      const session = slot.open();
      const digest = session.createDigest({ name: "SHA1", params: null });

      digest.once("some data", (err, md) => {
        assert.equal(md.toString("hex"), "baf34551fecb48acc3da868eb85e1b6dac9de356");
        done();
      });
    });
  });

});
