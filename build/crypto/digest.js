"use strict";
var core = require("../core");
var pkcs11 = require("../pkcs11");
var mech = require("../mech");
var Digest = (function () {
    function Digest(session, alg, lib) {
        this.session = session;
        this.lib = lib;
        this.init(alg);
    }
    Digest.prototype.init = function (alg) {
        var pMech = mech.Mechanism.create(alg);
        var rv = this.lib.C_DigestInit(this.session.handle, pMech);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_DigestInit");
    };
    Digest.prototype.update = function (data, callback) {
        try {
            data = new Buffer(data);
            if (callback) {
                this.lib.C_DigestUpdate(this.session.handle, data, data.length, function (err, rv) {
                    if (err)
                        callback(err);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_DigestUpdate"));
                    else
                        callback(null);
                });
            }
            else {
                var rv = this.lib.C_DigestUpdate(this.session.handle, data, data.length);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DigestUpdate");
            }
        }
        catch (e) {
            if (callback)
                callback(e);
            else
                throw e;
        }
    };
    Digest.prototype.final = function (callback) {
        try {
            var $digest_1 = new Buffer(1024);
            var $digestlen_1 = core.Ref.alloc(pkcs11.CK_ULONG, 1024);
            if (callback) {
                this.lib.C_DigestFinal(this.session.handle, $digest_1, $digestlen_1, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_DigestFinal"), null);
                    else
                        callback(null, $digest_1.slice(0, $digestlen_1.deref()));
                });
            }
            else {
                var rv = this.lib.C_DigestFinal(this.session.handle, $digest_1, $digestlen_1);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DigestFinal");
                return $digest_1.slice(0, $digestlen_1.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
            else
                throw e;
        }
    };
    return Digest;
}());
exports.Digest = Digest;
