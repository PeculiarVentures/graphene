"use strict";
var core = require("../core");
var pkcs11 = require("../pkcs11");
var mech_1 = require("../mech");
var Cipher = (function () {
    function Cipher(session, alg, key, lib) {
        this.session = session;
        this.lib = lib;
        this.init(alg, key);
    }
    Cipher.prototype.init = function (alg, key) {
        var pMech = mech_1.Mechanism.create(alg);
        var rv = this.lib.C_EncryptInit(this.session.handle, pMech, key.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_EncryptInit");
    };
    Cipher.prototype.update = function (data, callback) {
        try {
            data = new Buffer(data);
            var $enc_1 = new Buffer(data.length);
            var $encLen_1 = core.Ref.alloc(pkcs11.CK_ULONG, $enc_1.length);
            if (callback) {
                this.lib.C_EncryptUpdate(this.session.handle, data, data.length, $enc_1, $encLen_1, function (err, rv) {
                    if (rv)
                        throw new core.Pkcs11Error(rv, "C_EncryptUpdate");
                    if ($enc_1.length < $encLen_1.deref())
                        callback(new Error("Encrypted data wrong data size"), null);
                    else {
                        callback(null, $enc_1.slice(0, $encLen_1.deref()));
                    }
                });
            }
            else {
                var rv = this.lib.C_EncryptUpdate(this.session.handle, data, data.length, $enc_1, $encLen_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_EncryptUpdate");
                if ($enc_1.length < $encLen_1.deref())
                    throw new Error("Encrypted data wrong data size");
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
    Cipher.prototype.final = function (callback) {
        try {
            var BUF_SIZE = 4048;
            var $enc_2 = new Buffer(BUF_SIZE);
            var $encLen_2 = core.Ref.alloc(pkcs11.CK_ULONG, BUF_SIZE);
            if (callback) {
                this.lib.C_EncryptFinal(this.session.handle, $enc_2, $encLen_2, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else {
                        if (rv)
                            callback(new core.Pkcs11Error(rv, "C_EncryptFinal"), null);
                        callback(null, $enc_2.slice(0, $encLen_2.deref()));
                    }
                });
            }
            else {
                var rv = this.lib.C_EncryptFinal(this.session.handle, $enc_2, $encLen_2);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_EncryptFinal");
                return $enc_2.slice(0, $encLen_2.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    return Cipher;
}());
exports.Cipher = Cipher;
