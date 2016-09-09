"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("../core");
var mech_1 = require("../mech");
var Cipher = (function (_super) {
    __extends(Cipher, _super);
    function Cipher(session, alg, key, lib) {
        _super.call(this, lib);
        this.session = session;
        this.init(alg, key);
    }
    Cipher.prototype.init = function (alg, key) {
        var pMech = mech_1.Mechanism.create(alg);
        this.lib.C_EncryptInit(this.session.handle, pMech, key.handle);
    };
    Cipher.prototype.update = function (data) {
        try {
            data = new Buffer(data);
            var enc = new Buffer(data.length + 1024);
            var res = this.lib.C_EncryptUpdate(this.session.handle, data, enc);
            return res;
        }
        catch (e) {
            try {
                this.final();
            }
            catch (e) { }
            throw e;
        }
    };
    Cipher.prototype.final = function () {
        var BUF_SIZE = 4048;
        var enc = new Buffer(BUF_SIZE);
        var res = this.lib.C_EncryptFinal(this.session.handle, enc);
        return res;
    };
    Cipher.prototype.once = function (data, enc, cb) {
        var _data = new Buffer(data);
        if (cb) {
            this.lib.C_Encrypt(this.session.handle, _data, enc, cb);
        }
        else
            return this.lib.C_Encrypt(this.session.handle, _data, enc);
    };
    return Cipher;
}(core.BaseObject));
exports.Cipher = Cipher;
