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
            var $enc = new Buffer(data.length);
            var $encLen = core.Ref.alloc(pkcs11.CK_ULONG, $enc.length);
            if (callback) {
                this.lib.C_EncryptUpdate(this.session.handle, data, data.length, $enc, $encLen, function (err, rv) {
                    if (rv)
                        throw new core.Pkcs11Error(rv, "C_EncryptUpdate");
                    if ($enc.length < $encLen.deref())
                        callback(new Error("Encrypted data wrong data size"), null);
                    else {
                        callback(null, $enc.slice(0, $encLen.deref()));
                    }
                });
            }
            else {
                var rv = this.lib.C_EncryptUpdate(this.session.handle, data, data.length, $enc, $encLen);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_EncryptUpdate");
                if ($enc.length < $encLen.deref())
                    throw new Error("Encrypted data wrong data size");
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
    Cipher.prototype.final = function (callback) {
        try {
            var BUF_SIZE = 4048;
            var $enc = new Buffer(BUF_SIZE);
            var $encLen = core.Ref.alloc(pkcs11.CK_ULONG, BUF_SIZE);
            if (callback) {
                this.lib.C_EncryptFinal(this.session.handle, $enc, $encLen, function (err, rv) {
                    if (err)
                        callback(err, null);
                    else {
                        if (rv)
                            callback(new core.Pkcs11Error(rv, "C_EncryptFinal"), null);
                        callback(null, $enc.slice(0, $encLen.deref()));
                    }
                });
            }
            else {
                var rv = this.lib.C_EncryptFinal(this.session.handle, $enc, $encLen);
                if (rv)
                    throw new core.Pkcs11Error(rv, "C_EncryptFinal");
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
    return Cipher;
})();
exports.Cipher = Cipher;
