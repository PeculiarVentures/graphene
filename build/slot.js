var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pkcs11 = require("./pkcs11");
var core = require("./core");
var token = require("./token");
(function (SlotFlag) {
    /**
     * `True` if a token is present in the slot (e.g., a device is in the reader)
     */
    SlotFlag[SlotFlag["TOKEN_PRESENT"] = pkcs11.CKF_TOKEN_PRESENT] = "TOKEN_PRESENT";
    /**
     * `True` if the reader supports removable devices
     */
    SlotFlag[SlotFlag["REMOVABLE_DEVICE"] = pkcs11.CKF_REMOVABLE_DEVICE] = "REMOVABLE_DEVICE";
    /**
     * True if the slot is a hardware slot, as opposed to a software slot implementing a "soft token"
     */
    SlotFlag[SlotFlag["HW_SLOT"] = pkcs11.CKF_HW_SLOT] = "HW_SLOT";
})(exports.SlotFlag || (exports.SlotFlag = {}));
var SlotFlag = exports.SlotFlag;
var Slot = (function (_super) {
    __extends(Slot, _super);
    function Slot() {
        _super.apply(this, arguments);
    }
    Slot.prototype.getInfo = function () {
        var $info = core.Ref.alloc(pkcs11.CK_SLOT_INFO);
        var rv = this.lib.C_GetSlotInfo(this.handle, $info);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetSlotInfo");
        var info = $info.deref();
        this.slotDescription = info.slotDescription.toString().trim();
        this.manufacturerID = info.manufacturerID.toString().trim();
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
    return Slot;
})(core.HandleObject);
exports.Slot = Slot;
var SlotCollection = (function (_super) {
    __extends(SlotCollection, _super);
    function SlotCollection(items, lib, classType) {
        if (classType === void 0) { classType = Slot; }
        _super.call(this, items, lib, classType);
    }
    return SlotCollection;
})(core.Collection);
exports.SlotCollection = SlotCollection;
//# sourceMappingURL=slot.js.map