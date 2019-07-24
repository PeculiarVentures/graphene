import assert from "assert";
import pkcs11 from "pkcs11js";
import * as graphene from "../src";
import config from "./config";

context("Slot", () => {

    let mod: graphene.Module;
    let slots: graphene.SlotCollection;

    before(() => {
        mod = graphene.Module.load(config.init.lib, config.init.libName);
        mod.initialize();
    });

    after(() => {
        mod.finalize();
    });

    it("getSlots with tokens", () => {
        slots = mod.getSlots(true);
        assert.equal(slots.length, config.controlValues.slotsCount, "Wrong number of slots");
    });

    it("getSlots without tokens", () => {
        slots = mod.getSlots(false);
        assert.equal(slots.length, config.controlValues.slotsCount, "Wrong number of slots");
    });

    it("slot props", () => {
        const slot = slots.items(config.controlValues.slot.slotIndex);

        // slot
        assert.notEqual(slot.flags, 0);
        assert.equal(slot.manufacturerID,
            config.controlValues.slot.token.manufacturerID);
        assert.notEqual(slot.slotDescription, "");
    });

    it("token props", () => {
        const slot = slots.items(config.controlValues.slot.slotIndex);

        // token
        const token = slot.getToken();

        assert.equal(token.flags, config.controlValues.slot.token.flags);
        assert.equal(token.label, config.controlValues.slot.token.label);
        assert.equal(token.manufacturerID, config.controlValues.slot.token.manufacturerID);
        assert.equal(token.minPinLen, config.controlValues.slot.token.minPinLen);
        if (token.flags & pkcs11.CKF_CLOCK_ON_TOKEN) {
            assert.notEqual(token.utcTime, undefined);
        } else {
            assert.equal(token.utcTime, undefined);
        }
    });

    context("mechanism", () => {

        it("create from unsupported mechanism id", () => {
            assert.throws(() => {
                graphene.Mechanism.create("UNKNOWN_ALGORITHM");
            }, (err: Error) => {
                assert.equal(err.message, "Unknown mechanism name 'UNKNOWN_ALGORITHM'");
                return true;
            });
        });

        it("collection", () => {
            const slot = slots.items(config.controlValues.slot.slotIndex);
            const mechanisms = slot.getMechanisms();
            assert.equal(!!mechanisms.length, true);

            const mech = mechanisms.items(0);

            assert.equal(mech.name, "MD5");
        });

        context("vendor", () => {
            it("json", () => {
                graphene.Mechanism.vendor("./vendor/safenet_v5_3.json");

                assert.equal((graphene.MechanismEnum as any).DES3_CBC_PAD_IPSEC, 2147483950);
            });
            it("name, value", () => {
                graphene.Mechanism.vendor("CUSTOM_ALG", 888888888);

                assert.equal((graphene.MechanismEnum as any).CUSTOM_ALG, 888888888);
            });
        });
    });

    it("close all", () => {
        const slot = slots.items(config.controlValues.slot.slotIndex);
        const session = slot.open();

        assert.equal(session.flags, graphene.SessionFlag.SERIAL_SESSION);
        slot.closeAll();

        // must throw CKR_SESSION_HANDLE_INVALID:179
        assert.throws(() => {
            session.close();
        });
    });

});
