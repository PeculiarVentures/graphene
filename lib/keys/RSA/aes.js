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

var _toType = SymmetricKey.prototype.toType;
Aes.prototype.toType = function (AesClass, algorithm) {
  var aes = _toType.call(this, AesClass || Aes, algorithm);
  aes.length = this.length;
  return aes;
};

var _generate = SymmetricKey.generate;
/**
 * Generates RSA key pair
 * @param session   Session         PKCS11 session
 * @param algorithm Object          Init object or alg name for PKCS11 mechanism info
 * @param props
 *     	 length			                Length in bits of modulus (128, 192 or 256)
 */
Aes.generate = function generate(session, algorithm, props, AesKey) {
  props.labelPrefix = "AES";
  props.keyType = Enums.KeyType.AES;
  var _props = SymmetricKey.prepareProperties(props);
  check_props(props);
  
  //Add specific props
  this.length = props.length;
  _props.valueLen = this.length / 8;
  this.algorithm = algorithm || "CKM_AES_KEY_GEN";

  AesKey = AesKey || Aes;
  var res = _generate(session, "CKM_AES_KEY_GEN", _props, AesKey);
  return res;
}

module.exports = Aes;