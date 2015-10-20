var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Utils = common.Utils;
var Debug = common.Debug;

var Session = require('./session');
var MechanismInfo = require('./mechanism_info');

function SlotInfo(_cki, slotID) {
	Object.defineProperty(this, "cki", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "handle", {
		writable: true,
		enumerable: false
	})
	this.cki = _cki;
	this.handle = slotID;

	Object.defineProperty(this, "tokenInfo", {
		get: function () {
			return this.getTokenInfo();
		}
	})

	var session = null;
	Object.defineProperty(this, "session", {
		get: function () {
			if (Type.isNull(session)) {
				session = new Session(this);
			}
			return session;
		}
	})

	var mechanismList = null;
	Object.defineProperty(this, "mechanismList", {
		get: function () {
			if (Type.isNull(mechanismList)) {
				var $pulCount = Ref.alloc(CKI.CK_ULONG);
				Debug('C_GetMechanismList');
				var res = this.cki.C_GetMechanismList(this.handle, null, $pulCount);
				Utils.check_cki_res(res, "C_GetMechanismList");
				var pulCount = Ref.deref($pulCount);
				var arMech = Ref.alloc(RefArray(CKI.CK_MECHANISM_TYPE, pulCount));
				Debug('C_GetMechanismList');
				this.cki.C_GetMechanismList(this.handle, arMech, $pulCount);
				Utils.check_cki_res(res, "C_GetMechanismList");
				arMech = Ref.deref(arMech);
				mechanismList = [];
				for (var i = 0; i < pulCount; i++) {
					var mech = arMech[i];
					var mi = new MechanismInfo(this, mech);
					Debug("Mechanism:", mi.name);
					mechanismList.push(mi);
				}
			}
			return mechanismList;
		}
	})

	function init() {
		var info = this.getInfo();
		this.description = info.slotDescription;
		this.flags = info.flags;
		this.manufacturerID = info.manufacturerID;
		this.hardwareVersion = info.hardwareVersion;
		this.firmwareVersion = info.firmwareVersion;
		
		if (this.isAccessible()){
			this.getTokenInfo();
		}
	}

	init.apply(this, arguments);
}

SlotInfo.prototype.getInfo = function () {
	var si = new CKI.CK_SLOT_INFO();
	Debug("C_GetSlotInfo");
	var res = this.cki.C_GetSlotInfo(this.handle, si.ref());
	Utils.check_cki_res(res, "C_GetSlotInfo");
	return {
		slotDescription: Utils.str_array_format(si.slotDescription),
		manufacturerID: Utils.str_array_format(si.manufacturerID),
		flags: si.flags,
		hardwareVersion: Utils.version_to_string(si.hardwareVersion),
		firmwareVersion: Utils.version_to_string(si.firmwareVersion),
		"type": "slotInfo"
	}
}

SlotInfo.prototype.getTokenInfo = function () {
	if (!this.isAccessible())
		throw new Error("Token is not accessible by the user");
	var ti = new CKI.CK_TOKEN_INFO();
	Debug("C_GetTokenInfo");
	var res = this.cki.C_GetTokenInfo(this.handle, ti.ref());
	Utils.check_cki_res(res, "C_GetTokenInfo");
	var token = {
		label: Utils.str_array_format(ti.label),
		manufacturerID: Utils.str_array_format(ti.manufacturerID),
		model: Utils.str_array_format(ti.model),
		serialNumber: Utils.str_array_format(ti.serialNumber),
		flags: ti.flags,
		ulMaxSessionCount: ti.ulMaxSessionCount,
		ulSessionCount: ti.ulSessionCount,
		ulMaxRwSessionCount: ti.ulMaxRwSessionCount,
		ulRwSessionCount: ti.ulRwSessionCount,
		ulMaxPinLen: ti.ulMaxPinLen,
		ulMinPinLen: ti.ulMinPinLen,
		ulTotalPublicMemory: ti.ulTotalPublicMemory,
		ulFreePublicMemory: ti.ulFreePublicMemory,
		ulTotalPrivateMemory: ti.ulTotalPrivateMemory,
		hardwareVersion: Utils.version_to_string(ti.hardwareVersion),
		firmwareVersion: Utils.version_to_string(ti.firmwareVersion),
		utcTime: Utils.str_array_format(ti.utcTime),
		"type": "tokenInfo"
	}
	/* set the slot flags to the current token values */
	this.needLogin = Type.isFlag(token.flags, CKI.CKF_LOGIN_REQUIRED);
	this.readOnly = Type.isFlag(token.flags, CKI.CKF_WRITE_PROTECTED);
	this.hasRandom = Type.isFlag(token.flags, CKI.CKF_RNG);
	this.protectedAuthPath = Type.isFlag(token.flags, CKI.protectedAuthPath);
	this.name = token.label;
	this.minPassword = token.ulMinPinLen;
	this.maxPassword = token.ulMaxPinLen;
	this.serial = token.serialNumber;
	
	return token;
}

/**
 * Retrieves a Boolean value that indicates whether the slot is a removable device. 
 * If true, the slot is a removable device.
 */
SlotInfo.prototype.isRemovable = function () {
	return Type.isFlag(this.flags, Type.CKF_REMOVABLE_DEVICE);
}

/**
 * Retrieves a Boolean value that indicates whether the slot is accessible by the user. 
 * If true, the user can access the slot.
 */
SlotInfo.prototype.isHardware = function () {
	return Type.isFlag(this.flags, CKI.CKF_HW_SLOT);
}

/**
 * Retrieves a Boolean value that indicates whether the slot is a hardware device. 
 * If true, the slot is a hardware device.
 */
SlotInfo.prototype.isAccessible = function () {
	return Type.isFlag(this.flags, CKI.CKF_TOKEN_PRESENT);
}

SlotInfo.prototype.isInitialized = function () {
	return Type.isFlag(this.getTokenInfo().flags, CKI.CKF_TOKEN_INITIALIZED);
}

SlotInfo.prototype.getHashes = function(){
	var list = this.mechanismList;
	var res = [];
	for (var i in list){
		var alg = list[i];
		if (alg.isDigest()){
			res.push(alg.name);
		}
	}
	return res;
}

module.exports = SlotInfo;