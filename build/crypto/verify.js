"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("../core");
var mech_1 = require("../mech");
var Verify = (function (_super) {
    __extends(Verify, _super);
    function Verify(session, alg, key, lib) {
        _super.call(this, lib);
        this.session = session;
        this.init(alg, key);
    }
    Verify.prototype.init = function (alg, key) {
        var pMech = mech_1.Mechanism.create(alg);
        this.lib.C_VerifyInit(this.session.handle, pMech, key.handle);
    };
    Verify.prototype.update = function (data) {
        try {
            var _data = new Buffer(data);
            this.lib.C_VerifyUpdate(this.session.handle, _data);
        }
        catch (e) {
            try {
                this.final(new Buffer(0));
            }
            catch (e) { }
            throw e;
        }
    };
    Verify.prototype.final = function (signature) {
        var res = this.lib.C_VerifyFinal(this.session.handle, signature);
        return res;
    };
    Verify.prototype.once = function (data, signature, cb) {
        var _data = new Buffer(data);
        if (cb) {
            this.lib.C_Verify(this.session.handle, _data, signature, cb);
        }
        else
            return this.lib.C_Verify(this.session.handle, _data, signature);
    };
    return Verify;
}(core.BaseObject));
exports.Verify = Verify;
