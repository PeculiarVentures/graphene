"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("./core");
var token = require("./token");
var mech = require("./mech");
var session = require("./session");
(function (SlotFlag) {
    SlotFlag[SlotFlag["TOKEN_PRESENT"] = 1] = "TOKEN_PRESENT";
    SlotFlag[SlotFlag["REMOVABLE_DEVICE"] = 2] = "REMOVABLE_DEVICE";
    SlotFlag[SlotFlag["HW_SLOT"] = 4] = "HW_SLOT";
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
        var info = this.lib.C_GetSlotInfo(this.handle);
        this.slotDescription = info.slotDescription.trim();
        this.manufacturerID = info.manufacturerID.trim();
        this.flags = info.flags;
        this.hardwareVersion = info.hardwareVersion;
        this.firmwareVersion = info.firmwareVersion;
    };
    Slot.prototype.getToken = function () {
        return new token.Token(this.handle, this.lib);
    };
    Slot.prototype.getMechanisms = function () {
        var arr = this.lib.C_GetMechanismList(this.handle);
        return new mech.MechanismCollection(arr, this.handle, this.lib);
    };
    Slot.prototype.initToken = function (pin) {
        return this.lib.C_InitToken(this.handle, pin);
    };
    Slot.prototype.open = function (flags) {
        if (flags === void 0) { flags = session.SessionFlag.SERIAL_SESSION; }
        var hSession = this.lib.C_OpenSession(this.handle, flags);
        return new session.Session(hSession, this, this.lib);
    };
    Slot.prototype.closeAll = function () {
        this.lib.C_CloseAllSessions(this.handle);
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
