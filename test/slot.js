var assert = require("assert");
var config = require("./config.json");
var graphene = require("../build/graphene");
var pkcs11 = require("pkcs11js");
var Module = graphene.Module;

describe("Slot", function () {

    var mod, slots;

    before(function () {
        mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
    });

    after(function () {
        mod.finalize();
    });

    it("getSlots with tokens", function () {
        slots = mod.getSlots(true);
        assert.equal(slots.length, config.controlValues.slotsCount, "Wrong number of slots");
    });

    it("getSlots without tokens", function () {
        slots = mod.getSlots(false);
        assert.equal(slots.length, config.controlValues.slotsCount, "Wrong number of slots");
    });

    it("slot props", function () {
        var slot = slots.items(0);
		
        // slot
        assert.equal(slot.flags, 1);
        assert.equal(slot.manufacturerID,
          config.controlValues.module.manufacturerID);
        assert.notEqual(slot.slotDescription, "");
    });

    it("token props", function () {
        var slot = slots.items(0);
		
        // token
        var token = slot.getToken();

        assert.equal(token.flags, config.controlValues.token.flags);
        assert.equal(token.label, config.controlValues.token.label);
        assert.equal(token.manufacturerID, config.controlValues.token.manufacturerID);
        assert.equal(token.minPinLen, config.controlValues.token.minPinLen);
        if(token.flags & pkcs11.CKF_CLOCK_ON_TOKEN) {
          assert.notEqual(token.timeUtc, undefined);
        } else {
          assert.equal(token.timeUtc, undefined);
        }
    });

});
