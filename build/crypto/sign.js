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
            var $sig = new Buffer(1024);
            var $siglen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);
            if (callback) {
                this.lib.C_SignFinal(this.session.handle, $sig, $siglen, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else if (rv)
                        callback(new core.Pkcs11Error(rv, "C_SignFinal"), null);
                    else
                        callback(null, $sig.slice(0, $siglen.deref()));
                });
            }
            else {
                var rv = this.lib.C_SignFinal(this.session.handle, $sig, $siglen);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_SignFinal");
                return $sig.slice(0, $siglen.deref());
            }
        }
        catch (e) {
            if (callback)
                callback(e, null);
        }
    };
    return Sign;
})();
exports.Sign = Sign;
