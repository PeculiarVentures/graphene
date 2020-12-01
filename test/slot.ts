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
        assert.strictEqual(slots.length, config.controlValues.slotsCount, "Wrong number of slots");
    });

    it("getSlots without tokens", () => {
        slots = mod.getSlots(false);
        assert.strictEqual(slots.length, config.controlValues.slotsCount, "Wrong number of slots");
    });

    it("for..of slots", () => {
        const slots = mod.getSlots();
        for (const slot of slots) {
            assert(slot.handle);
        }
    });

    it("slot props", () => {
        const slot = slots.items(config.controlValues.slot.slotIndex);

        // slot
        assert.notStrictEqual(slot.flags, 0);
        assert.strictEqual(slot.manufacturerID,
            config.controlValues.slot.token.manufacturerID);
        assert.notStrictEqual(slot.slotDescription, "");
    });

    it("token props", () => {
        const slot = slots.items(config.controlValues.slot.slotIndex);

        // token
        const token = slot.getToken();

        assert.strictEqual(token.flags, config.controlValues.slot.token.flags);
        assert.strictEqual(token.label, config.controlValues.slot.token.label);
        assert.strictEqual(token.manufacturerID, config.controlValues.slot.token.manufacturerID);
        assert.strictEqual(token.minPinLen, config.controlValues.slot.token.minPinLen);
        if (token.flags & pkcs11.CKF_CLOCK_ON_TOKEN) {
            assert.notStrictEqual(token.utcTime, null);
        } else {
            assert.strictEqual(token.utcTime, null);
        }
    });

    context("mechanism", () => {

        it("create from unsupported mechanism id", () => {
            assert.throws(() => {
                graphene.Mechanism.create("UNKNOWN_ALGORITHM");
            }, (err: Error) => {
                assert.strictEqual(err.message, "Unknown mechanism name 'UNKNOWN_ALGORITHM'");
                return true;
            });
        });

        context("collection", () => {
            it("items", () => {
                const slot = slots.items(config.controlValues.slot.slotIndex);
                const mechanisms = slot.getMechanisms();
                assert.strictEqual(!!mechanisms.length, true);

                const mech = mechanisms.items(0);

                assert.strictEqual(!!mech.name, true);
            });
            it("tryGetItem", () => {
                const slot = slots.items(config.controlValues.slot.slotIndex);
                const mechanisms = slot.getMechanisms();

                const mech = mechanisms.tryGetItem(99999);

                assert.strictEqual(mech, null);
            });
            it("for..of mechanisms", () => {
                const slot = slots.items(config.controlValues.slot.slotIndex);
                const mechanisms = slot.getMechanisms();
                for (const mech of mechanisms) {
                    assert(mech.handle);
                }
            });
        });

        context("vendor", () => {
            it("json", () => {
                graphene.Mechanism.vendor("./vendor/safenet_v5_3.json");

                assert.strictEqual((graphene.MechanismEnum as any).DES3_CBC_PAD_IPSEC, 2147483950);
            });
            it("name, value", () => {
                graphene.Mechanism.vendor("CUSTOM_ALG", 888888888);

                assert.strictEqual((graphene.MechanismEnum as any).CUSTOM_ALG, 888888888);
            });
        });
    });

    it("close all", () => {
        const slot = slots.items(config.controlValues.slot.slotIndex);
        const session = slot.open();

        assert.strictEqual(session.flags, graphene.SessionFlag.SERIAL_SESSION);
        slot.closeAll();

        // must throw CKR_SESSION_HANDLE_INVALID:179
        assert.throws(() => {
            session.close();
        });
    });

});
