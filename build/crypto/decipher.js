var core = require("../core");
var pkcs11 = require("../pkcs11");
var mech_1 = require("../mech");
var Decipher = (function () {
    function Decipher(session, alg, key, lib) {
        this.session = session;
        this.lib = lib;
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
            var $enc = new Buffer(data.length);
            var $encLen = core.Ref.alloc(pkcs11.CK_ULONG, $enc.length);
            if (callback) {
                this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $enc, $encLen, function (err, rv) {
                    if (rv)
                        throw new core.Pkcs11Error(rv, "C_DecryptUpdate");
                    callback(null, $enc.slice(0, $encLen.deref()));
                });
            }
            else {
                var rv = this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $enc, $encLen);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DecryptUpdate");
                return $enc.slice(0, $encLen.deref());
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
            var BUF_SIZE = 4048;
            var $dec = new Buffer(BUF_SIZE);
            var $decLen = core.Ref.alloc(pkcs11.CK_ULONG, BUF_SIZE);
            if (callback) {
                this.lib.C_DecryptFinal(this.session.handle, $dec, $decLen, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else {
                        if (rv)
                            callback(new core.Pkcs11Error(rv, "C_DecryptFinal"), null);
                        callback(null, $dec.slice(0, $decLen.deref()));
                    }
                });
            }
            else {
                var rv = this.lib.C_DecryptFinal(this.session.handle, $dec, $decLen);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_DecryptFinal");
                return $dec.slice(0, $decLen.deref());
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
})();
exports.Decipher = Decipher;
