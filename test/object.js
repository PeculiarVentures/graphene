var assert = require('assert');
var config = require("./config.json");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("Object", function () {
    var mod, session, modulus, exponent;

    before(function () {
        mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        session = mod.getSlots(config.controlValues.slot.slotIndex).open();
        session.login(config.init.pin);
        modulus = new Buffer(1024/8);
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

        var attrs = obj.getAttribute("wrap");
        assert.equal(attrs.wrap, true);
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
        assert.equal(obj.getAttribute("label").label,"new label");
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
        assert.equal(obj.getAttribute("label").label, "new label");
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

});
