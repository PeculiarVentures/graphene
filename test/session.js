var assert = require('assert');
var config = require('./config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

describe("Session", function () {
	var mod, slot, session;
	
	before(function(){
		mod = Module.load(config.lib, config.libName);
		mod.initialize();
		slot = mod.getSlots()[0];
		session = slot.session
		session.start(Enums.SessionFlags.Serial);
		session.login(config.pin);
	})
	
	after(function(){
		session.stop();
		mod.finalize();
	})
	
	it("#findObjects default", function () {
		var objs = session.findObjects();
		assert.equal(objs.length, 3, "Wrong number of objects in session");
	})
})
