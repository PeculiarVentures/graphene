"use strict";

var assert = require('assert');
var config = require("./config.json");
var pkcs11 = require("pkcs11js");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("Object", function () {
    var mod, session, modulus, exponent;

    before(function () {
        mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        var slot = mod.getSlots(config.controlValues.slot.slotIndex);
        session = slot.open(2 | 4);
        session.login(config.init.pin);
        modulus = new Buffer(1024 / 8);
        modulus[127] = 1;
        exponent = new Buffer([1, 0, 1]);
    });

    after(function () {
        session.logout();
        mod.finalize();
    });

    it("copy", function () {
        var count = session.find().length;

        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });

        var copy = obj.copy({
            label: "new label"
        });
        assert.equal(!copy, false);
        var key = copy.toType();
        assert.equal(key.label, "new label");
        assert.equal(session.find().length, count + 2);
    });

    it("get attribute by name", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });

        var wrap = obj.getAttribute("wrap");
        assert.equal(wrap, true);
    });

    it("get attribute by template", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });

        var attrs = obj.getAttribute({
            wrap: null,
            label: null
        });
        assert.equal(attrs.wrap, true);
        assert.equal(attrs.label, "label");
    });

    it("set attribute by name", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });

        obj.setAttribute("label", "new label");
        assert.equal(obj.getAttribute("label"), "new label");
    });

    it("set attribute by template", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });

        obj.setAttribute({
            label: "new label"
        });
        assert.equal(obj.getAttribute("label"), "new label");
    });

    it("destroy", function () {
        var count = session.find().length;
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });
        assert.equal(session.find().length, count + 1);

        obj.destroy();
        assert.equal(session.find().length, count);
    });

    it("size", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: modulus,
            publicExponent: exponent
        });

        // SoftHSM doesn't return real size of object
        assert.equal(obj.size > 0, true)
        obj.destroy();
    });

    it("set function", function () {
        var obj = session.create({
            class: graphene.ObjectClass.DATA,
            label: "data.set",
            objectId: new Buffer([1]),
            token: false,
            value: new Buffer("Hello"),
        });

        var data = obj.toType();
        assert.equal(data.value.toString(), "Hello");
        assert.equal(data.token, false);
        assert.equal(data.private, true);
        assert.equal(data.modifiable, true);
        assert.equal(data.objectId.toString("hex"), "01");

        data.label = "data.new.label";

        var objs = session.find({ label: "data.new.label" });
        assert.equal(objs.length, 1);

        data = objs.items(0).toType();
        assert.equal(data.label, "data.new.label");
        data.destroy();
    });

    context("custom attribute", () => {

        var object = null;
        var attrName = "label"

        before(() => {
            object = session.create({
                class: graphene.ObjectClass.DATA,
                label: "data.set",
                objectId: new Buffer("my custom id"),
                token: false,
                value: new Buffer("Hello"),
            });
            // change default type of attribute
            graphene.registerAttribute(attrName, pkcs11.CKA_LABEL, "buffer");
        })

        after(() => {
            object.destroy();
            // set default value for objectId
            graphene.registerAttribute(attrName, pkcs11.CKA_LABEL, "string");
        })

        it("get value", () => {
            const value = object.getAttribute(attrName);
            assert.equal(Buffer.isBuffer(value), true);
        })

        it("set value", () => {
            const newValue = "new value";
            object.setAttribute(attrName, newValue);
            assert.equal(object.getAttribute(attrName), newValue);
        })

    });

});
