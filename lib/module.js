var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Utils = common.Utils;
var Debug = common.Debug;

var SlotInfo = require('./slot_info');
var fs = require('fs');

ERROR.SESSION_NOT_STARTED = "Session is not started";
ERROR.CRYPTOKI_FUNCTION = "Error on Cryptoki function '%1'. Error code is %2";

function Module(c, name) {
	this.cki = c;
	this.name = name;
	this.isInitialized = false;
}

Module.load = function load(lib, name) {
	Debug('Module load library');
	if (!Type.isString(lib)) throw new TypeError(Utils.printf(ERROR.TYPE, 1, 'String'));
	if (!Type.isString(name)) throw new TypeError(Utils.printf(ERROR.TYPE, 2, 'String'));

	if (!fs.existsSync(lib)) throw new Error(Utils.printf('File "%1" is not found', lib));

	Debug('Module.lib: %s', lib);
	Debug('Module.name: %s', name);

	var c = CKI.Cryptoki(lib);
	var mod = new Module(c, name);
	mod.lib = lib;
	return mod;
}

Module.prototype.initialize = function initialize() {
	if (!this.isInitialized) {
		Debug("C_Initialize");
		var res = this.cki.C_Initialize(null)
		Utils.check_cki_res(res, "C_Initialize");
		this.isInitialized = true;
		this.getInfo();
	}
}

Module.prototype.finalize = function () {
	if (this.isInitialized) {
		Debug("C_Finalize");
		var res = this.cki.C_Finalize(null)
		Utils.check_cki_res(res, "C_Finalize");
		this.isInitialized = false;
	}
}

Module.prototype.getInfo = function () {
	var info = new CKI.CK_INFO();
	Debug("C_GetInfo");
	var res = this.cki.C_GetInfo(info.ref());
	Utils.check_cki_res(res, "C_GetInfo");
	var obj = {
		cryptokiVersion: Utils.version_to_string(info.cryptokiVersion),
		libraryVersion: Utils.version_to_string(info.libraryVersion),
		manufacturerID: Utils.str_array_format(info.manufacturerID),
		libraryDescription: Utils.str_array_format(info.libraryDescription),
		flags: info.flags,
		"type": "module"
	}
	this.cryptokiVersion = obj.cryptokiVersion;
	this.libraryVersion = obj.libraryVersion;
	this.description = obj.libraryDescription;
	this.manufacturerID = obj.manufacturerID
	return obj;
}

Module.prototype.getSlots = function (tokenPresent) {
	Debug('Present token', tokenPresent);
	if (Type.isUndefined(tokenPresent)) tokenPresent = false;
	var $pulCount = Ref.alloc(CKI.CK_ULONG);
	Debug("C_GetSlotList");
	var res = this.cki.C_GetSlotList(tokenPresent, null, $pulCount);
	Utils.check_cki_res(res, "C_GetSlotList");
	var pulCount = Ref.deref($pulCount);
	Debug('Slots in module', pulCount);
	Debug("C_GetSlotList.length: %d", pulCount);
	var arSlotID = Ref.alloc(RefArray(CKI.CK_SLOT_ID, pulCount));
	Debug("C_GetSlotList");
	res = this.cki.C_GetSlotList(tokenPresent, arSlotID, $pulCount);
	Utils.check_cki_res(res, "C_GetSlotList");
	arSlotID = Ref.deref(arSlotID);
	var arSlotInfo = [];
	for (var i = 0; i < pulCount; i++) {
		arSlotInfo.push(new SlotInfo(this.cki, arSlotID[i]));
	}
	return arSlotInfo;
}

module.exports = Module;