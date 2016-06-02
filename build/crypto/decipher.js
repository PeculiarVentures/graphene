"use strict";
var core = require("../core");
var pkcs11 = require("../pkcs11");
var mech_1 = require("../mech");
var DEFAULT_BLOCK_SIZE = 256 >> 3;
var Decipher = (function () {
    function Decipher(session, alg, key, blockSize, lib) {
        this.blockSize = DEFAULT_BLOCK_SIZE;
        this.session = session;
        this.lib = lib;
        this.blockSize = blockSize || DEFAULT_BLOCK_SIZE;
        this.init(alg, key);
    }
    Decipher.prototype.init = function (alg, key) {
        var pMech = mech_1.Mechanism.create(alg);
        var rv = this.lib.C_DecryptInit(this.session.handle, pMech, key.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_DecryptInit");
    };
    Decipher.prototype.update = function (data, callback) {
        try {
            data = new Buffer(data);
            var len = Math.ceil(data.length / this.blockSize) * this.blockSize;
            var $enc_1 = new Buffer(len);
            var $encLen_1 = core.Ref.alloc(pkcs11.CK_ULONG, $enc_1.length);
            if (callback) {
                this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $enc_1, $encLen_1, function (err, rv) {
                    if (rv)
                        throw new core.Pkcs11Error(rv, "C_DecryptUpdate");
                    callback(null, $enc_1.slice(0, $encLen_1.deref()));
                });
            }
            else {
                var rv = this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $enc_1, $encLen_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DecryptUpdate");
                return $enc_1.slice(0, $encLen_1.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    Decipher.prototype.final = function (callback) {
        try {
            var $dec_1 = new Buffer(this.blockSize);
            var $decLen_1 = core.Ref.alloc(pkcs11.CK_ULONG, this.blockSize);
            if (callback) {
                this.lib.C_DecryptFinal(this.session.handle, $dec_1, $decLen_1, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else {
                        if (rv)
                            callback(new core.Pkcs11Error(rv, "C_DecryptFinal"), null);
                        callback(null, $dec_1.slice(0, $decLen_1.deref()));
                    }
                });
            }
            else {
                var rv = this.lib.C_DecryptFinal(this.session.handle, $dec_1, $decLen_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DecryptFinal");
                return $dec_1.slice(0, $decLen_1.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    return Decipher;
}());
exports.Decipher = Decipher;
