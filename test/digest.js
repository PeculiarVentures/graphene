var assert = require("assert");
var config = require("./config.json");
var graphene = require("../build/graphene");
var pkcs11 = require("pkcs11js");

var Module = graphene.Module;

describe("Digest", () => {

    var mod, slot;

    before(function () {
        mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        slot = mod.getSlots(true).items(config.controlValues.slot.slotIndex);
    });

    after(function () {
        slot.closeAll();
        mod.finalize();
    });

    it("SHA", () => {
        var session = slot.open();
        var digest = session.createDigest({ name: "SHA1" });

        digest.update("some data");
        var md = digest.final();
        assert.equal(md.toString("hex"), "baf34551fecb48acc3da868eb85e1b6dac9de356");
    });

    context("once", () => {

        it("sync", () => {
            var session = slot.open();
            var digest = session.createDigest({ name: "SHA1" });

            var md = digest.once("some data");
            assert.equal(md.toString("hex"), "baf34551fecb48acc3da868eb85e1b6dac9de356");
        });

        it("async", (done) => {
            var session = slot.open();
            var digest = session.createDigest({ name: "SHA1" });

            digest.once("some data", (err, md) => {
                assert.equal(md.toString("hex"), "baf34551fecb48acc3da868eb85e1b6dac9de356");
                done();
            });
        });
    });


});