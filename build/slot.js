"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pkcs11 = require("./pkcs11");
var core = require("./core");
var token = require("./token");
var mech = require("./mech");
var session = require("./session");
(function (SlotFlag) {
    SlotFlag[SlotFlag["TOKEN_PRESENT"] = pkcs11.CKF_TOKEN_PRESENT] = "TOKEN_PRESENT";
    SlotFlag[SlotFlag["REMOVABLE_DEVICE"] = pkcs11.CKF_REMOVABLE_DEVICE] = "REMOVABLE_DEVICE";
    SlotFlag[SlotFlag["HW_SLOT"] = pkcs11.CKF_HW_SLOT] = "HW_SLOT";
})(exports.SlotFlag || (exports.SlotFlag = {}));
var SlotFlag = exports.SlotFlag;
var Slot = (function (_super) {
    __extends(Slot, _super);
    function Slot(handle, module, lib) {
        _super.call(this, handle, lib);
        this.module = module;
        this.getInfo();
    }
    Slot.prototype.getInfo = function () {
        var $info = core.Ref.alloc(pkcs11.CK_SLOT_INFO);
        var rv = this.lib.C_GetSlotInfo(this.handle, $info);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetSlotInfo");
        var info = $info.deref();
        this.slotDescription = new Buffer(info.slotDescription).toString().trim();
        this.manufacturerID = new Buffer(info.manufacturerID).toString().trim();
        this.flags = info.flags;
        this.hardwareVersion = {
            major: info.hardwareVersion.major,
            minor: info.hardwareVersion.minor
        };
        this.firmwareVersion = {
            major: info.firmwareVersion.major,
            minor: info.firmwareVersion.minor
        };
    };
    Slot.prototype.getToken = function () {
        return new token.Token(this.handle, this.lib);
    };
    Slot.prototype.getMechanisms = function () {
        var $len = core.Ref.alloc(pkcs11.CK_ULONG);
        var rv = this.lib.C_GetMechanismList(this.handle, null, $len);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetMechanismList");
        var arr = [], len = $len.deref();
        if (len) {
            var $mechs = core.Ref.alloc(core.RefArray(pkcs11.CK_MECHANISM_TYPE, len));
            if (rv = this.lib.C_GetMechanismList(this.handle, $mechs, $len)) {
                throw new core.Pkcs11Error(rv, "C_GetMechanismList");
            }
            arr = $mechs.deref();
        }
        return new mech.MechanismCollection(arr, this.handle, this.lib);
    };
    Slot.prototype.initToken = function (pin, label) {
        var bufPin = new Buffer(pin, "utf8");
        var bufLable = new Buffer(32);
        bufLable.write(label);
        var rv = this.lib.C_InitToken(this.handle, bufPin, bufPin.length, bufLable);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_InitToken");
    };
    Slot.prototype.open = function (flags) {
        if (flags === void 0) { flags = session.SessionOpenFlag.SERIAL_SESSION; }
        var $hSession = core.Ref.alloc(pkcs11.CK_SESSION_HANDLE);
        var rv = this.lib.C_OpenSession(this.handle, flags, null, null, $hSession);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_OpenSession");
        return new session.Session($hSession.deref(), this, this.lib);
    };
    Slot.prototype.closeAll = function () {
        var rv = this.lib.C_CloseAllSessions(this.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_CloseAllSessions");
    };
    return Slot;
}(core.HandleObject));
exports.Slot = Slot;
var SlotCollection = (function (_super) {
    __extends(SlotCollection, _super);
    function SlotCollection(items, module, lib, classType) {
        if (classType === void 0) { classType = Slot; }
        _super.call(this, items, lib, classType);
        this.module = module;
    }
    SlotCollection.prototype.items = function (index) {
        return new Slot(this.items_[index], this.module, this.lib);
    };
    return SlotCollection;
}(core.Collection));
exports.SlotCollection = SlotCollection;
