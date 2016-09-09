"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pkcs11 = require("pkcs11js");
var core = require("./core");
var slot = require("./slot");
var Module = (function (_super) {
    __extends(Module, _super);
    function Module(lib) {
        _super.call(this, lib);
        this.libFile = "";
        this.libName = "";
    }
    Module.prototype.getInfo = function () {
        var info = this.lib.C_GetInfo();
        this.cryptokiVersion = info.cryptokiVersion;
        this.manufacturerID = info.manufacturerID.trim();
        this.libraryDescription = info.libraryDescription.trim();
        this.flags = info.flags;
        this.libraryVersion = info.libraryVersion;
    };
    Module.prototype.initialize = function () {
        this.lib.C_Initialize();
        this.getInfo();
    };
    Module.prototype.finalize = function () {
        this.lib.C_Finalize();
    };
    Module.prototype.getSlots = function (index, tokenPresent) {
        if (tokenPresent === void 0) { tokenPresent = true; }
        if (!core.isEmpty(index) && core.isBoolean(index)) {
            tokenPresent = index;
        }
        var arr = this.lib.C_GetSlotList(tokenPresent);
        var col = new slot.SlotCollection(arr, this, this.lib);
        if (core.isNumber(index)) {
            return col.items(index);
        }
        return col;
    };
    Module.load = function (libFile, libName) {
        var lib = new pkcs11.PKCS11();
        lib.load(libFile);
        var module = new Module(lib);
        module.libFile = libFile;
        module.libName = libName || libFile;
        return module;
    };
    return Module;
}(core.BaseObject));
exports.Module = Module;
