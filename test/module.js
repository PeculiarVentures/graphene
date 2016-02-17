var assert = require('assert');
var config = require('./config.json');
var graphene = require('../build/graphene');

var Module = graphene.Module;

describe("Module", function () {

    it("load", function () {
        assert.throws(function () {
            Module.load("unknown/path/name");
        }, Error);
        assert.throws(function () {
            Module.load("unknown/path/name", "");
        }, Error);
        assert(Module.load(config.init.lib, config.init.libName));
    });
    
    it("initialize/finalize", function () {
        assert.doesNotThrow(function () {
            var mod = Module.load(config.init.lib, config.init.libName);
            mod.initialize();

            mod.finalize();
        }, Error);
    });

    it("getSlots", function () {
        var mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();

        var slots = mod.getSlots(true);
        assert.equal(slots.length, config.controlValues.slotsCount, "Wrong number of slots");

        mod.finalize();
    });
    
    it("props", function () {
        var mod = Module.load(config.init.lib, config.init.libName);
        mod.initialize();
        
        assert.equal(mod.libFile, config.init.lib, "Wrong libFile");
        assert.equal(mod.libName, config.init.libName, "Wrong libName");
        assert.equal(mod.flags, 0, "Wrong flags");
        assert.equal(mod.manufacturerID, config.controlValues.module.manufacturerID, "Wrong manufacturerID");
        assert.equal(mod.libraryDescription, config.controlValues.module.libraryDescription, "Wrong libraryDescription");                       
        
        mod.finalize();
    });
});