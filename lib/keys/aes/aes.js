var common = require('../../common');
var util = require('util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

var KeyUtil = require('../util');
var SymmetricKey = require('../symmetric_key');

function Aes() {
}
util.inherits(Aes, SymmetricKey);

var initialize = Aes.prototype.initialize;
Aes.prototype.initialize = function (session, algorithm, key, props) {
  initialize.apply(this, arguments);
}
function check_props(props) {
  var l = props.length;
  if (!Type.isNumber(l))
    throw new TypeError("The 'value' must be a Number (128, 192 or 256)");
  if (!(l == 128 || l == 192 || l == 256))
    throw new TypeError('The "value" must be either 3 or 65537');
}

/**
 * Generates RSA key pair
 * @param session   Session         PKCS11 session
 * @param algorithm Object          Init object or alg name for PKCS11 mechanism info
 * @param props
 *     	 length			                Length in bits of modulus (128, 192 or 256)
 */
Aes.generate = function generate(session, algorithm, props) {
  props.labelPrefix = "AES";
  props.keyType = Enums.KeyType.AES;
  var _props = SymmetricKey.prepareProperties(props);
  check_props(props);
  
  //Add specific props
  this.length = props.length;
  _props.valueLen = props.length / 8;
  this.algorithm = algorithm || "AES_KEY_GEN";

  var res = SymmetricKey.generate(session, "AES_KEY_GEN", _props, Aes);
  return res;
}

module.exports = Aes;