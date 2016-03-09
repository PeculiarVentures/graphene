"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var pkcs11 = require("./pkcs11");
var core = require("./core");
var fs = require("fs");
var mech_enum_1 = require("./mech_enum");
__export(require("./mech_enum"));
(function (MechanismFlag) {
    MechanismFlag[MechanismFlag["HW"] = pkcs11.CKF_HW] = "HW";
    MechanismFlag[MechanismFlag["ENCRYPT"] = pkcs11.CKF_ENCRYPT] = "ENCRYPT";
    MechanismFlag[MechanismFlag["DECRYPT"] = pkcs11.CKF_DECRYPT] = "DECRYPT";
    MechanismFlag[MechanismFlag["DIGEST"] = pkcs11.CKF_DIGEST] = "DIGEST";
    MechanismFlag[MechanismFlag["SIGN"] = pkcs11.CKF_SIGN] = "SIGN";
    MechanismFlag[MechanismFlag["SIGN_RECOVER"] = pkcs11.CKF_SIGN_RECOVER] = "SIGN_RECOVER";
    MechanismFlag[MechanismFlag["VERIFY"] = pkcs11.CKF_VERIFY] = "VERIFY";
    MechanismFlag[MechanismFlag["VERIFY_RECOVER"] = pkcs11.CKF_VERIFY_RECOVER] = "VERIFY_RECOVER";
    MechanismFlag[MechanismFlag["GENERATE"] = pkcs11.CKF_GENERATE] = "GENERATE";
    MechanismFlag[MechanismFlag["GENERATE_KEY_PAIR"] = pkcs11.CKF_GENERATE_KEY_PAIR] = "GENERATE_KEY_PAIR";
    MechanismFlag[MechanismFlag["WRAP"] = pkcs11.CKF_WRAP] = "WRAP";
    MechanismFlag[MechanismFlag["UNWRAP"] = pkcs11.CKF_UNWRAP] = "UNWRAP";
    MechanismFlag[MechanismFlag["DERIVE"] = pkcs11.CKF_DERIVE] = "DERIVE";
})(exports.MechanismFlag || (exports.MechanismFlag = {}));
var MechanismFlag = exports.MechanismFlag;
var Mechanism = (function (_super) {
    __extends(Mechanism, _super);
    function Mechanism(handle, slotHandle, lib) {
        _super.call(this, handle, lib);
        this.slotHandle = slotHandle;
        this.getInfo();
    }
    Object.defineProperty(Mechanism.prototype, "name", {
        get: function () {
            return mech_enum_1.MechanismEnum[this.handle] || "unknown";
        },
        enumerable: true,
        configurable: true
    });
    Mechanism.prototype.getInfo = function () {
        var $info = core.Ref.alloc(pkcs11.CK_MECHANISM_INFO);
        var rv = this.lib.C_GetMechanismInfo(this.slotHandle, this.handle, $info);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_GetMechanismInfo");
        var info = $info.deref();
        this.minKeySize = info.ulMinKeySize;
        this.maxKeySize = info.ulMaxKeySize;
        this.flags = info.flags;
    };
    Mechanism.create = function (alg) {
        var res = null;
        var _alg;
        if (core.isString(alg)) {
            _alg = { name: alg, params: null };
        }
        else if (core.isNumber(alg)) {
            _alg = { name: mech_enum_1.MechanismEnum[alg], params: null };
        }
        else {
            _alg = alg;
        }
        var hAlg = mech_enum_1.MechanismEnum[_alg.name.toUpperCase()];
        if (core.isEmpty(hAlg))
            throw new TypeError("Unknown mechanism name '" + _alg.name + "'");
        var pParams = null;
        if (alg.params) {
            if (alg.params.toCKI)
                pParams = alg.params.toCKI();
            else
                pParams = alg.params;
        }
        res = new pkcs11.CK_MECHANISM({
            mechanism: hAlg,
            pParameter: pParams,
            ulParameterLen: pParams ? pParams.length : 0
        });
        return res["ref.buffer"];
    };
    Mechanism.vendor = function (name, value) {
        var mechs = mech_enum_1.MechanismEnum;
        if (core.isEmpty(value)) {
            var file = fs.readFileSync(name);
            var vendor = JSON.parse(file.toString());
            for (var i in vendor) {
                var new_name = i;
                var v = vendor[i];
                mechs[new_name] = v;
                mechs[v] = new_name;
            }
        }
        else {
            var new_name = name;
            mechs[new_name] = value;
            mechs[value] = new_name;
        }
    };
    return Mechanism;
}(core.HandleObject));
exports.Mechanism = Mechanism;
var MechanismCollection = (function (_super) {
    __extends(MechanismCollection, _super);
    function MechanismCollection(items, slotHandle, lib, classType) {
        if (classType === void 0) { classType = Mechanism; }
        _super.call(this, items, lib, classType);
        this.slotHandle = slotHandle;
    }
    MechanismCollection.prototype.items = function (index) {
        var handle = this.items_[index];
        return new Mechanism(handle, this.slotHandle, this.lib);
    };
    return MechanismCollection;
}(core.Collection));
exports.MechanismCollection = MechanismCollection;
