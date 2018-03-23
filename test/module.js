var assert = require('assert');
var os = require('os');
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

    context("NSS", () => {
        const libPathNSS = os.platform() === "darwin" ?  "/usr/local/opt/nss/lib/libsoftokn3.dylib" : "/usr/lib/x86_64-linux-gnu/nss/libsoftokn3.so";

        it("Initialize", () => {
            const mod = Module.load(libPathNSS, "NSS");
            mod.initialize({
                libraryParameters: "configdir='' certPrefix='' keyPrefix='' secmod='' flags=readOnly,noCertDB,noModDB,forceOpen,optimizeSpace",
            });

            const slot = mod.getSlots(1, true);
            const session = slot.open();

            const rnd = session.generateRandom(20);
            assert.equal(!!rnd, true);
            assert.equal(rnd.length, 20);

            mod.finalize();
        });

    });
});