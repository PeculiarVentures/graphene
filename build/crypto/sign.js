"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("../core");
var mech = require("../mech");
var Sign = (function (_super) {
    __extends(Sign, _super);
    function Sign(session, alg, key, lib) {
        _super.call(this, lib);
        this.session = session;
        this.init(alg, key);
    }
    Sign.prototype.init = function (alg, key) {
        var pMech = mech.Mechanism.create(alg);
        this.lib.C_SignInit(this.session.handle, pMech, key.handle);
    };
    Sign.prototype.update = function (data) {
        try {
            var _data = new Buffer(data);
            this.lib.C_SignUpdate(this.session.handle, _data);
        }
        catch (e) {
            try {
                this.final();
            }
            catch (e) { }
            throw e;
        }
    };
    Sign.prototype.final = function () {
        var sig = new Buffer(1024);
        var res = this.lib.C_SignFinal(this.session.handle, sig);
        return res;
    };
    Sign.prototype.once = function (data, cb) {
        var signature = new Buffer(1024);
        var _data = new Buffer(data);
        if (cb) {
            this.lib.C_Sign(this.session.handle, _data, signature, cb);
        }
        else
            return this.lib.C_Sign(this.session.handle, _data, signature);
    };
    return Sign;
}(core.BaseObject));
exports.Sign = Sign;
