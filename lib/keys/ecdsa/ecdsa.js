var common = require('../../common');
var util = require('util');

var CKI = common.CKI;
var Enums = common.Enums;
var Type = common.Type;

var KeyUtil = require('../util');
var NamedCurve = require('./ecdsa_curve');
var AsymmetricKey = require('../asymmetric_key');

function Ecdsa() {
}
util.inherits(Ecdsa, AsymmetricKey);

Ecdsa.prototype.initialize = function (session, algorithm, privateKey, publicKey, props) {
  AsymmetricKey.prototype.initialize.apply(this, arguments);
}
function check_props(props) {
  if (!props.namedCurve)
    throw new TypeError('The "namedCurve" is required parameter');
  if (Type.isString(props.namedCurve))
    props.namedCurve = new Buffer(NamedCurve.getValue(props.namedCurve).value, "hex");
  if (!Buffer.isBuffer(props.namedCurve))
    throw new TypeError("Parameter 'namedCurve' must be a Buffer");
}

/**
 * Generates RSA key pair
 * @param session   Session         PKCS11 session
 * @param algorithm Object          Init object or alg name for PKCS11 mechanism info
 * @param props
 *     	 namedCurve			            EC parameters (name | OID | Buffer)
 */
Ecdsa.generate = function generate(session, algorithm, props) {
  props.labelPrefix = "ECDSA";
  props.keyType = Enums.KeyType.ECDSA;
  var _props = AsymmetricKey.prepareProperties(props);
  check_props(props);
  
  //Add specific props
  this.namedCurve = _props.publicKey.paramsEC = props.namedCurve;
  this.algorithm = algorithm || "ECDSA_KEY_PAIR_GEN";

  var res = AsymmetricKey.generate(session, "ECDSA_KEY_PAIR_GEN", _props, Ecdsa);
  return res;
}

module.exports = Ecdsa;