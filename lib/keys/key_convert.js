var common = require("../common");
var util = require("util");
var base64url = require("base64url");

var CKI = common.CKI;

var merge = require("node.extend");
var co = require("co");

var common = require("pkijs/org/pkijs/common");
var asn1js = require("asn1js");
var x509_schema = require("pkijs/org/pkijs/x509_schema");
var x509_simpl = require("pkijs/org/pkijs/x509_simpl");

var org = merge(true, asn1js, common);
org = merge(true, org, x509_schema);
org = merge(true, org, x509_simpl);
org = merge(true, org, co);

org = org.org;

common.org = org;
asn1js.org = org;
x509_schema.org = org;
x509_simpl.org = org;

function read_spki(spki) {
    var asn1Spki = org.pkijs.fromBER(spki);
    var spki_simpl = new org.pkijs.simpl.PUBLIC_KEY_INFO({ schema: asn1Spki.result });
    return spki_simpl;
}

function base64url_to_arraybuffer(b64u){
    var buf = base64url.decode(b64u, "binary");
    return new Uint8Array(buf).buffer;
}

function base64url_to_INTEGER(b64u){
    var buf = base64url_to_arraybuffer(b64u);
    return new org.pkijs.asn1.INTEGER({ value_hex: buf});
}

function RSA_spki_to_jwk(spki) {
    var spki_simpl = read_spki(spki);
    var asn1Pkey = org.pkijs.fromBER(spki_simpl.subjectPublicKey.value_block.value_hex);
    var pkey = new org.pkijs.simpl.x509.RSAPublicKey({ schema: asn1Pkey.result });

    var jwk = {
        kty: "RSA",
        e: base64url(pkey.publicExponent.value_block.value_hex),
        n: base64url(pkey.modulus.value_block.value_hex)
    }

    return jwk;
}

function RSA_jwk_to_spki(jwk) {
    var pkey_simpl = new org.pkijs.simpl.x509.RSAPublicKey();
    pkey_simpl.modulus = base64url_to_INTEGER(jwk.n);
    pkey_simpl.publicExponent = base64url_to_INTEGER(jwk.e);
    console.log(pkey_simpl);
    var pkey_simpl_encoded = pkey_simpl.toSchema().toBER(false);
    return new Uint8Array(pkey_simpl_encoded);
    
    // var spki_simpl = new org.pkijs.simpl.PUBLIC_KEY_INFO();
    // spki_simpl.algorithm = new org.pkijs.simpl.ALGORITHM_IDENTIFIER({algorithm_id: "1.2.840.113549.1.1.1"})
    // var cert_simpl_string = String.fromCharCode.apply(null, new Uint8Array(cert_simpl_encoded));
}

module.exports = {
    RSA_spki_to_jwk: RSA_spki_to_jwk,
    RSA_jwk_to_spki: RSA_jwk_to_spki
}