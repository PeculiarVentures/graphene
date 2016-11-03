"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("../core");
var mech = require("../mech");
var Digest = (function (_super) {
    __extends(Digest, _super);
    function Digest(session, alg, lib) {
        _super.call(this, lib);
        this.session = session;
        this.init(alg);
    }
    Digest.prototype.init = function (alg) {
        var pMech = mech.Mechanism.create(alg);
        this.lib.C_DigestInit(this.session.handle, pMech);
    };
    Digest.prototype.update = function (data) {
        try {
            var _data = new Buffer(data);
            this.lib.C_DigestUpdate(this.session.handle, _data);
        }
        catch (e) {
            try {
                this.final();
            }
            catch (e) { }
            throw e;
        }
    };
    Digest.prototype.final = function () {
        var digest = new Buffer(1024);
        var res = this.lib.C_DigestFinal(this.session.handle, digest);
        return res;
    };
    Digest.prototype.once = function (data, cb) {
        var digest = new Buffer(1024);
        var _data = new Buffer(data);
        if (cb) {
            this.lib.C_Digest(this.session.handle, _data, digest, cb);
        }
        else
            return this.lib.C_Digest(this.session.handle, _data, digest);
    };
    return Digest;
}(core.BaseObject));
exports.Digest = Digest;
