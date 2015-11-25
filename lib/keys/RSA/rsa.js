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

RSA.prototype.delete = function Delete(){
  this.session.destroyObject(this.privateKey);
  this.session.destroyObject(this.publicKey);
}

/**
 * Generates RSA key pair
 * @param props
 *     	 modulusLength			   Length in bits of modulus
 * 		   publicExponent				 Representation of the RSA public exponent
 */
RSA.generate = function generate(session, props) {
  var _key = gen_RSA(session, props);
  var rsa = new RSA();
  Object.defineProperty(rsa, "session", {
    get: function(){
      return session;
    }
  })
  rsa.privateKey = _key.private;
  rsa.publicKey = _key.public;
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
		var _key = session.generateKeyPair("RSA_PKCS_KEY_PAIR_GEN", {
    "class": Enums.ObjectClass.PublicKey,
    "keyType": Enums.KeyType.RSA,
    "label": props.label,
    "token": props.token,
    "id": props.id,
    "sign": false,
    "verify": KeyUtil.isKeyUsage(KeyUtil.SIGN, props.keyUsages),
    "encrypt": KeyUtil.isKeyUsage(KeyUtil.ENCRYPT, props.keyUsages),
    "decrypt": false,
    "wrap": KeyUtil.isKeyUsage(KeyUtil.WRAP, props.keyUsages),
    "unwrap": true,
    "extractable": props.extractable,
    "modulusBits": props.modulusLength,
    "publicExp": props.publicExponent
		},
    {
      "class": Enums.ObjectClass.PrivateKey,
      "keyType": Enums.KeyType.RSA,
      "private": true,
      "sensitive": true,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "sign": false,
      "verify": KeyUtil.isKeyUsage(KeyUtil.VERIFY, props.keyUsages),
      "encrypt": false,
      "decrypt": KeyUtil.isKeyUsage(KeyUtil.DECRYPT, props.keyUsages),
      "wrap": false,
      "unwrap": KeyUtil.isKeyUsage(KeyUtil.UNWRAP, props.keyUsages),
      "extractable": props.extractable
    });
		return _key;
}

module.exports = RSA;