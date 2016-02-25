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
    Decipher.prototype.update = function (data) {
        data = new Buffer(data);
        var $dec = new Buffer(data.length);
        var $declen = core.Ref.alloc(pkcs11.CK_ULONG, $dec.length);
        var rv = this.lib.C_DecryptUpdate(this.session.handle, data, data.length, $dec, $declen);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_DecryptUpdate");
        if ($dec.length < $declen.deref())
            throw new Error("Encrypted data wrong data size");
        return $dec.slice(0, $declen.deref());
    };
    Decipher.prototype.final = function () {
        var BUF_SIZE = 4048;
        var $dec = new Buffer(BUF_SIZE);
        var $declen = core.Ref.alloc(pkcs11.CK_ULONG, BUF_SIZE);
        var rv = this.lib.C_DecryptFinal(this.session.handle, $dec, $declen);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_DecryptFinal");
        return $dec.slice(0, $declen.deref());
    };
    return Decipher;
})();
exports.Decipher = Decipher;
