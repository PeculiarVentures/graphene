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
    Digest.prototype.update = function (data) {
        data = new Buffer(data);
        var rv = this.lib.C_DigestUpdate(this.session.handle, data, data.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_DigestUpdate");
    };
    Digest.prototype.final = function () {
        var $digest = new Buffer(1024);
        var $digestlen = core.Ref.alloc(pkcs11.CK_ULONG, 1024);
        var rv = this.lib.C_DigestFinal(this.session.handle, $digest, $digestlen);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_DigestFinal");
        return $digest.slice(0, $digestlen.deref());
    };
    return Digest;
})();
exports.Digest = Digest;
