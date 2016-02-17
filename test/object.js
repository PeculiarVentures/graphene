var assert = require('assert');
var config = require("./config.json");
var graphene = require("../build/graphene");

var Module = graphene.Module;

describe("Session", function () {
    var mod, session;

    before(function () {
        mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        session = mod.getSlots(0).open();
        session.login(config.init.pin);
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
            modulus: new Buffer([1, 0, 1]),
            publicExponent: new Buffer(1024)
        });

        var copy = obj.copy({
            wrap: false
        });
        assert.equal(!copy, false);
        var key = copy.toType();
        assert.equal(key.wrap, false);
        assert.equal(session.find().length, count + 2);
    });

    it("get attribute by name", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: new Buffer([1, 0, 1]),
            publicExponent: new Buffer(1024)
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
            modulus: new Buffer([1, 0, 1]),
            publicExponent: new Buffer(1024)
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
            modulus: new Buffer([1, 0, 1]),
            publicExponent: new Buffer(1024)
        });

        obj.setAttribute("wrap", false);
        assert.equal(obj.getAttribute("wrap").wrap, false);
    });

    it("set attribute by template", function () {
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: new Buffer([1, 0, 1]),
            publicExponent: new Buffer(1024)
        });

        obj.setAttribute({
            wrap: false,
            label: "new label"
        });
        assert.equal(obj.getAttribute("wrap").wrap, false);
        assert.equal(obj.getAttribute("label").label, "new label");
    });

    it("destroy", function () {
        var count = session.find().length;
        var obj = session.create({
            class: graphene.ObjectClass.PUBLIC_KEY,
            label: "label",
            keyType: graphene.KeyType.RSA,
            wrap: true,
            modulus: new Buffer([1, 0, 1]),
            publicExponent: new Buffer(1024)
        });
        assert.equal(session.find().length, count + 1);
        
        obj.destroy();
        assert.equal(session.find().length, count);
    });

});