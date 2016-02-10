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
        this.getInfo();
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
        this.manufacturerID = info.manufacturerID.toString().trim();
        this.libraryDescription = info.libraryVersion.toString().trim();
        this.flags = info.flags;
        this.libraryVersion = {
            major: info.libraryVersion.major,
            minor: info.libraryVersion.minor,
        };
    };
    /**
     * initializes the Cryptoki library
     */
    Module.prototype.initialize = function () {
        var rv = this.lib.C_Initialize();
        if (rv)
            throw new core.Pkcs11Error(rv, "C_Initialize");
    };
    /**
     * indicates that an application is done with the Cryptoki library
     */
    Module.prototype.finalize = function () {
        var rv = this.lib.C_Finalize();
        if (rv)
            throw new core.Pkcs11Error(rv, "C_Finalize");
    };
    /**
     * obtains a list of slots in the system
     * @param {number} tokenPresent only slots with tokens. Default `True`
     */
    Module.prototype.getSlots = function (tokenPresent) {
        if (tokenPresent === void 0) { tokenPresent = true; }
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
        return new slot.SlotCollection(arr, this.lib);
    };
    /**
     * loads pkcs11 lib
     */
    Module.load = function (libFile, libName) {
        var lib = new pkcs11.Pkcs11(libFile);
        var module = new Module(lib);
        module.libFile = libFile;
        module.libName = libFile;
        return module;
    };
    return Module;
})(core.BaseObject);
exports.Module = Module;
//# sourceMappingURL=module.js.map