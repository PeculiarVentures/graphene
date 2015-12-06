var common = require('../../common');
var util = require('util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

var KeyUtil = require('../util');
var AsymmetricKey = require('../asymmetric_key');

function Rsa() {
}
util.inherits(Rsa, AsymmetricKey);

Rsa.prototype.initialize = function (session, algorithm, privateKey, publicKey, props) {
  AsymmetricKey.prototype.initialize.apply(this, arguments);
}
function check_props(props) {
  if (props.publicExponent == 3)
    props.publicExponent = new Buffer([3]);
  else if (props.publicExponent == 65537)
    props.publicExponent = new Buffer([1, 0, 1]);
  else
    throw new TypeError('The "publicExponent" must be either 3 or 65537');
}

/**
 * Generates RSA key pair
 * @param session   Session         PKCS11 session
 * @param algorithm Object          Init object or alg name for PKCS11 mechanism info
 * @param props
 *     	 modulusLength			        Length in bits of modulus
 * 		   publicExponent				      Representation of the RSA public exponent
 */
Rsa.generate = function generate(session, algorithm, props) {
  props.labelPrefix = "RSA";
  props.keyType = Enums.KeyType.RSA;
  var _props = AsymmetricKey.prepareProperties(props);
  check_props(props);
  
  //Add specific props
  this.modulusLength = _props.publicKey.modulusBits = props.modulusLength;
  this.publicExponent = _props.publicKey.publicExp = props.publicExponent;
  this.algorithm = algorithm || "RSA_PKCS_KEY_PAIR_GEN";

  var res = AsymmetricKey.generate(session, "RSA_PKCS_KEY_PAIR_GEN", _props, Rsa);
  return res;
}

module.exports = Rsa;