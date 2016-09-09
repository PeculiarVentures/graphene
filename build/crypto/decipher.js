"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("../core");
var mech_1 = require("../mech");
var DEFAULT_BLOCK_SIZE = 256 >> 3;
var Decipher = (function (_super) {
    __extends(Decipher, _super);
    function Decipher(session, alg, key, blockSize, lib) {
        _super.call(this, lib);
        this.blockSize = DEFAULT_BLOCK_SIZE;
        this.session = session;
        this.blockSize = blockSize || DEFAULT_BLOCK_SIZE;
        this.init(alg, key);
    }
    Decipher.prototype.init = function (alg, key) {
        var pMech = mech_1.Mechanism.create(alg);
        this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
    };
    Decipher.prototype.update = function (data) {
        try {
            var len = Math.ceil(data.length / this.blockSize) * this.blockSize;
            var dec = new Buffer(len);
            var res = this.lib.C_DecryptUpdate(this.session.handle, data, dec);
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
    Decipher.prototype.final = function () {
        var dec = new Buffer(this.blockSize);
        var res = this.lib.C_DecryptFinal(this.session.handle, dec);
        return res;
    };
    Decipher.prototype.once = function (data, dec, cb) {
        if (cb) {
            this.lib.C_Decrypt(this.session.handle, data, dec, cb);
        }
        else
            return this.lib.C_Decrypt(this.session.handle, data, dec);
    };
    return Decipher;
}(core.BaseObject));
exports.Decipher = Decipher;
