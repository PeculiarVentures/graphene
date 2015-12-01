var common = require('../common');
var util = require('util');

var Utils = common.Utils;
var Type = common.Type;
var ERROR = common.Error;
var Debug = common.Debug;
var CKI = common.CKI;
var Enums = common.Enums;

var KeyUtil = require('./util');

function SymmetricKey() {
  this.key;
}

SymmetricKey.prototype.initialize = function (session, algorithm, key, props) {
  this.session = session;
  this.key = key;
  this.algorithm = algorithm;
}

SymmetricKey.prototype.delete = function Delete() {
  this.session.destroyObject(this.key);
}

SymmetricKey.prepareProperties = function prepareProperties(props) {
  if (!Type.isObject(props))
    throw new TypeError("Parameter 1 must be Object");
  if (!("keyType" in props))
    throw new TypeError("Props must have keyType parameter");
  if (!props.label) {
    props.label = (props.labelPrefix || "AsymmetricKey") + " " + new Date().getTime();
  }
  props.id = KeyUtil.createKeyID()
  props.token = true;
  if (props.extractable)
    props.extractable = true;
  else
    props.extractable = false;

  var gen_props = {
      "class": Enums.ObjectClass.SecretKey,
      "keyType": props.keyType,
      "sensitive": true,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "extractable": props.extractable,
      "encrypt": KeyUtil.isKeyUsage(KeyUtil.ENCRYPT, props.keyUsages),
      "decrypt": KeyUtil.isKeyUsage(KeyUtil.DECRYPT, props.keyUsages),
      "sign": KeyUtil.isKeyUsage(KeyUtil.SIGN, props.keyUsages),
      "verify": KeyUtil.isKeyUsage(KeyUtil.VERIFY, props.keyUsages),
      "wrap": KeyUtil.isKeyUsage(KeyUtil.WRAP, props.keyUsages),
      "unwrap": KeyUtil.isKeyUsage(KeyUtil.UNWRAP, props.keyUsages)
  };
  return gen_props
}

SymmetricKey.generate = function generate(session, algorithm, props, SymClass) {
  SymClass = SymClass || SymmetricKey;

  if (!props.privateKey)
    throw new TypeError("Parameter 'privateKey' is missing in props");
  if (!props.publicKey)
    throw new TypeError("Parameter 'publicKey' is missing in props");
  
  var _key = session.generateKey(algorithm, props.publicKey, props.privateKey);
  var skey = new SymClass();
  skey.initialize(session, algorithm, _key, props);
  return skey;
}

SymmetricKey.prototype.toType = function (KeyClass, algorithm) {
  var new_key = new KeyClass();
  new_key.initialize(this.session, algorithm || this.algorithm, this.key);
  return new_key;
};

module.exports = SymmetricKey;