"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("./core");
var pkcs11 = require("./pkcs11");
var slot = require("./slot");
var Module = (function (_super) {
    __extends(Module, _super);
    function Module(lib) {
        _super.call(this, lib);
        this.libFile = "";
        this.libName = "";
    }
    Module.prototype.getInfo = function () {
        var $info = core.Ref.alloc(pkcs11.CK_INFO);
        var rv = this.lib.C_GetInfo($info);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetInfo");
        var info = $info.deref();
        this.cryptokiVersion = {
            major: info.cryptokiVersion.major,
            minor: info.cryptokiVersion.minor,
        };
        this.manufacturerID = new Buffer(info.manufacturerID).toString().trim();
        this.libraryDescription = new Buffer(info.libraryDescription).toString().trim();
        this.flags = info.flags;
        this.libraryVersion = {
            major: info.libraryVersion.major,
            minor: info.libraryVersion.minor,
        };
    };
    Module.prototype.initialize = function () {
        var rv = this.lib.C_Initialize();
        if (rv)
            throw new core.Pkcs11Error(rv, "C_Initialize");
        this.getInfo();
    };
    Module.prototype.finalize = function () {
        var rv = this.lib.C_Finalize();
        if (rv)
            throw new core.Pkcs11Error(rv, "C_Finalize");
    };
    Module.prototype.getSlots = function (index, tokenPresent) {
        if (tokenPresent === void 0) { tokenPresent = true; }
        if (!core.isEmpty(index) && core.isBoolean(index)) {
            tokenPresent = index;
        }
        var $len = core.Ref.alloc(pkcs11.CK_ULONG);
        var rv = this.lib.C_GetSlotList(tokenPresent, null, $len);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetSlotList");
        var arr = [], len = $len.deref();
        if (len) {
            var $slots = core.Ref.alloc(core.RefArray(pkcs11.CK_SLOT_ID, len));
            if (rv = this.lib.C_GetSlotList(tokenPresent, $slots, $len)) {
                throw new core.Pkcs11Error(rv, "C_GetSlotList");
            }
            arr = $slots.deref();
        }
        var col = new slot.SlotCollection(arr, this, this.lib);
        if (core.isNumber(index)) {
            return col.items(index);
        }
        return col;
    };
    Module.load = function (libFile, libName) {
        var lib = new pkcs11.Pkcs11(libFile);
        try {
            lib.getFunctionList();
        }
        catch (e) {
            console.warn("Cannot get a list of PKCS11 functions with C_GetFunctionList.");
        }
        var module = new Module(lib);
        module.libFile = libFile;
        module.libName = libName || libFile;
        return module;
    };
    return Module;
}(core.BaseObject));
exports.Module = Module;
