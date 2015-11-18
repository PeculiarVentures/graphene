var assert = require('assert');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("Slot", function () {
	var mod, slots;
	
	before(function(){
		var lib = "/usr/local/lib/softhsm/libsofthsm2.so";
		process.env['SOFTHSM2_CONF'] = '/etc/softhsm2.conf';
		mod = Module.load(lib, "SoftHSM");
		mod.initialize();
		slots = mod.getSlots();
	})
	
	after(function(){
		mod.finalize();
	})
	
	it("#info", function () {
		var slot = slots[0];
		assert.equal(false, slot.isHardware());
		assert.equal(false, slot.isRemovable());
		assert.equal(true, slot.isAccessible());
		assert.equal(true, slot.isInitialized());
		
		var slotNotInit = slots[3];
		assert.equal(false, slotNotInit.isInitialized());
	})

	it("#second()", function () {
		assert.equal(1, 1, "Error on assert");
		//assert(false, "Error on assert 1");
	})
})

var graphene = require("graphene");
graphene.Enum