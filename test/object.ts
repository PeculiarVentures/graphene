import assert from "assert";
import pkcs11 from "pkcs11js";
import * as graphene from "../src";
import config from "./config";

context("Object", () => {
    let mod: graphene.Module;
    let session: graphene.Session;
    let modulus: Buffer;
    let exponent: Buffer;

    before(() => {
        mod = graphene.Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        const slot = mod.getSlots(config.controlValues.slot.slotIndex);
        session = slot.open(2 | 4);
        session.login(config.init.pin);
        modulus = Buffer.alloc(1024 / 8);
        modulus[127] = 1;
        exponent = Buffer.from([1, 0, 1]);
    });

    after(() => {
        session.logout();
        mod.finalize();
    });

    it("copy", () => {
        const count = session.find().length;

        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        const copy = obj.copy({
            label: "new label",
        });
        assert.strictEqual(!copy, false);
        const key = copy.toType<graphene.Key>();
        assert.strictEqual(key.label, "new label");
        assert.strictEqual(session.find().length, count + 2);
    });

    it("get attribute by name", () => {
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        const wrap = obj.getAttribute("wrap");
        assert.strictEqual(wrap, true);
    });

    it("get attribute by template", () => {
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        const attrs = obj.getAttribute({
            wrap: null,
            label: null,
        });
        assert.strictEqual(attrs.wrap, true);
        assert.strictEqual(attrs.label, "label");
    });

    it("set attribute by name", () => {
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        obj.setAttribute("label", "new label");
        assert.strictEqual(obj.getAttribute("label"), "new label");
    });

    it("set attribute by type", () => {
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        obj.set(pkcs11.CKA_LABEL, "new label");
        assert.strictEqual(obj.get(pkcs11.CKA_LABEL).toString(), "new label");
    });

    it("set attribute by template", () => {
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        obj.setAttribute({
            label: "new label",
        });
        assert.strictEqual(obj.getAttribute("label"), "new label");
    });

    it("destroy", () => {
        const count = session.find().length;
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });
        assert.strictEqual(session.find().length, count + 1);

        obj.destroy();
        assert.strictEqual(session.find().length, count);
    });

    it("size", () => {
        const obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus,
            publicExponent: exponent,
        });

        // SoftHSM doesn't return real size of object
        assert.strictEqual(obj.size > 0, true);
        obj.destroy();
    });

    it("set function", () => {
        const obj = session.create({
            class: graphene.ObjectClass.DATA,
            label: "data.set",
            objectId: Buffer.from([1]),
            token: false,
            value: Buffer.from("Hello"),
        });
        console.log(obj);

        let data = obj.toType<graphene.Data>();
        assert.strictEqual(data.value.toString(), "Hello");
        assert.strictEqual(data.token, false);
        assert.strictEqual(data.private, true);
        assert.strictEqual(data.modifiable, true);
        assert.strictEqual(data.objectId.toString("hex"), "01");

        data.label = "data.new.label";

        const objs = session.find({ label: "data.new.label" });
        assert.strictEqual(objs.length, 1);

        data = objs.items(0).toType();
        assert.strictEqual(data.label, "data.new.label");
        data.destroy();
    });

    context("custom attribute", () => {

        let object: graphene.SessionObject;
        const attrName = "label";

        before(() => {
            object = session.create({
                class: graphene.ObjectClass.DATA,
                label: "data.set",
                objectId: Buffer.from("my custom id"),
                token: false,
                value: Buffer.from("Hello"),
            });
            // change default type of attribute
            graphene.registerAttribute(attrName, pkcs11.CKA_LABEL, "buffer");
        });

        after(() => {
            object.destroy();
            // set default value for objectId
            graphene.registerAttribute(attrName, pkcs11.CKA_LABEL, "string");
        });

        it("get value", () => {
            const value = object.getAttribute(attrName);
            assert.strictEqual(Buffer.isBuffer(value), true);
        });

        it("set value", () => {
            const newValue = "new value";
            object.setAttribute(attrName, newValue);
            assert.strictEqual(Buffer.isBuffer(object.getAttribute(attrName)), true);
        });

    });

});
