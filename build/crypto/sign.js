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
    Sign.prototype.update = function (data) {
        data = new Buffer(data);
        var rv = this.lib.C_SignUpdate(this.session.handle, data, data.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_SignUpdate");
    };
    Sign.prototype.final = function () {
        var $sig = new Buffer(1024);
        var $siglen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);
        var rv = this.lib.C_SignFinal(this.session.handle, $sig, $siglen);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_SignFinal");
        return $sig.slice(0, $siglen.deref());
    };
    return Sign;
})();
exports.Sign = Sign;
