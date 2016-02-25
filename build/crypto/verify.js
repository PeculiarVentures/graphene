var core = require("../core");
var pkcs11 = require("../pkcs11");
var mech_1 = require("../mech");
var Verify = (function () {
    function Verify(session, alg, key, lib) {
        this.session = session;
        this.lib = lib;
        this.init(alg, key);
    }
    Verify.prototype.init = function (alg, key) {
        var pMech = mech_1.Mechanism.create(alg);
        var rv = this.lib.C_VerifyInit(this.session.handle, pMech, key.handle);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_VerifyInit");
    };
    Verify.prototype.update = function (data) {
        data = new Buffer(data);
        var rv = this.lib.C_VerifyUpdate(this.session.handle, data, data.length);
        if (rv)
            throw new core.Pkcs11Error(rv, "C_VerifyUpdate");
    };
    Verify.prototype.final = function (signature) {
        var rv = this.lib.C_VerifyFinal(this.session.handle, signature, signature.length);
        return rv === pkcs11.CKR_OK;
    };
    return Verify;
})();
exports.Verify = Verify;
