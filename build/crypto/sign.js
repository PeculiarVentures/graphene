"use strict";
var core = require("../core");
var pkcs11 = require("../pkcs11");
var mech = require("../mech");
var Sign = (function () {
    function Sign(session, alg, key, lib) {
        this.session = session;
        this.lib = lib;
        this.init(alg, key);
    }
    Sign.prototype.init = function (alg, key) {
        var pMech = mech.Mechanism.create(alg);
        var rv = this.lib.C_SignInit(this.session.handle, pMech, key.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_SignInit");
    };
    Sign.prototype.update = function (data, callback) {
        try {
            data = new Buffer(data);
            if (callback) {
                this.lib.C_SignUpdate(this.session.handle, data, data.length, function (err, rv) {
                    if (err)
                        callback(err);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_SignUpdate"));
                    else
                        callback(null);
                });
            }
            else {
                var rv = this.lib.C_SignUpdate(this.session.handle, data, data.length);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_SignUpdate");
            }
        }
        catch (e) {
            if (callback)
                callback(e);
            else
                throw e;
        }
    };
    Sign.prototype.final = function (callback) {
        try {
            var $sig_1 = new Buffer(1024);
            var $siglen_1 = core.Ref.alloc(pkcs11.CK_ULONG, 1024);
            if (callback) {
                this.lib.C_SignFinal(this.session.handle, $sig_1, $siglen_1, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_SignFinal"), null);
                    else
                        callback(null, $sig_1.slice(0, $siglen_1.deref()));
                });
            }
            else {
                var rv = this.lib.C_SignFinal(this.session.handle, $sig_1, $siglen_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_SignFinal");
                return $sig_1.slice(0, $siglen_1.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
        }
    };
    return Sign;
}());
exports.Sign = Sign;
