var common = require('../../common');
var util = require('util');
var KeyUtil = require('../util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

function RSA() {
  this.privateKey;
  this.publicKey;
}

RSA.prototype.delete = function Delete() {
  this.session.destroyObject(this.privateKey);
  this.session.destroyObject(this.publicKey);
}

var HASH_ALGS = ["SHA-1", "SHA-224", "SHA-256", "SHA-384", "SHA-512"]

function hash_pk11(algName) {
  if (!Type.isString(algName))
    throw TypeError("Parameter 1 must be String");
  algName = algName.toUpperCase();
  switch (algName) {
    case "SHA-1":
      algName = "SHA1_RSA_PKCS";
      break;
    case "SHA-224":
      algName = "SHA224_RSA_PKCS";
      break;
    case "SHA-256":
      algName = "SHA256_RSA_PKCS";
      break;
    case "SHA-384":
      algName = "SHA384_RSA_PKCS";
      break;
    case "SHA-512":
      algName = "SHA512_RSA_PKCS";
      break;
  }
  return algName;
}

RSA.prototype.sign = function sign(algName, data) {
  return this.session.sign(this.privateKey, hash_pk11(algName), data);
}

RSA.prototype.verify = function verify(algName, signature, data) {
  return this.session.verify(this.publicKey, hash_pk11(algName), signature, data);
}

/**
 * Generates RSA key pair
 * @param props
 *     	 modulusLength			   Length in bits of modulus
 * 		   publicExponent				 Representation of the RSA public exponent
 */
RSA.generate = function generate(session, props) {
  check_gen_props(props);
  var _key = gen_RSA(session, props);
  var rsa = new RSA();
  Object.defineProperty(rsa, "session", {
    get: function () {
      return session;
    }
  })
  rsa.privateKey = _key.private.toType();
  rsa.publicKey = _key.public.toType();
  return rsa;
}

function check_gen_props(props) {
  if (!Type.isObject(props))
    throw new TypeError("Parameter 1 must be Object");
  if (!props.label) {
    props.label = "RSA " + new Date().getTime();
  }
  props.id = KeyUtil.createKeyID()
  props.token = true;
  if (props.extractable)
    props.extractable = true;
  else
    props.extractable = false;

  if (props.publicExponent == 3)
    props.publicExponent = new Buffer([3]);
  else if (props.publicExponent == 65537)
    props.publicExponent = new Buffer([1, 0, 1]);
  else
    throw new TypeError('The "publicExponent" must be either 3 or 65537');
}

function gen_RSA(session, props) {
  var gen_props = {
    publicKey: {
      "class": Enums.ObjectClass.PublicKey,
      "keyType": Enums.KeyType.RSA,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "verify": KeyUtil.isKeyUsage(KeyUtil.VERIFY, props.keyUsages),
      "encrypt": KeyUtil.isKeyUsage(KeyUtil.ENCRYPT, props.keyUsages),
      "wrap": KeyUtil.isKeyUsage(KeyUtil.WRAP, props.keyUsages),
      "modulusBits": props.modulusLength,
      "publicExp": props.publicExponent
    },
    privateKey: {
      "class": Enums.ObjectClass.PrivateKey,
      "keyType": Enums.KeyType.RSA,
      "private": true,
      "sensitive": true,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "sign": KeyUtil.isKeyUsage(KeyUtil.SIGN, props.keyUsages),
      "decrypt": KeyUtil.isKeyUsage(KeyUtil.DECRYPT, props.keyUsages),
      "unwrap": KeyUtil.isKeyUsage(KeyUtil.UNWRAP, props.keyUsages),
      "extractable": props.extractable
    }
  };
  var _key = session.generateKeyPair("RSA_PKCS_KEY_PAIR_GEN", gen_props.publicKey, gen_props.privateKey);
		return _key;
}

RSA.prototype.toOAEP = function toOAEP(params){
  return new RsaOAEP(this, params);
}

RSA.prototype.toPSS = function toPSS(alg){
  return new RsaPSS(this, alg);
}

RSA.prototype.toRSA1 = function toRSA1(){
  return new Rsa1(this);
}

module.exports = RSA;

var RsaOAEP = require("./rsa_oaep");
var RsaOAEPParams = require("./rsa_oaep_params");
var Rsa1 = require("./rsa1");
var RsaPSS = require("./rsa_pss");
var RsaPSSParams = require("./rsa_pss_params");