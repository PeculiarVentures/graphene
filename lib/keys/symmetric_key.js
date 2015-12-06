var common = require('../common');
var util = require('util');

var Utils = common.Utils;
var Type = common.Type;
var ERROR = common.Error;
var Debug = common.Debug;
var CKI = common.CKI;
var Enums = common.Enums;

var KeyUtil = require('./util');
var AbstractKey = require('./abstract_key');

function SymmetricKey() {
  this.key = null;
}
util.inherits(SymmetricKey, AbstractKey);

SymmetricKey.prototype.initialize = function (session, algorithm, key, props) {
  AbstractKey.prototype.initialize.apply(this, arguments);
  this.key = key;
}

SymmetricKey.prototype.delete = function Delete() {
  this.session.destroyObject(this.key);
}

SymmetricKey.prototype.sign = function sign(data) {
  return this.session.sign(this.key, this.algorithm, data);
}

SymmetricKey.prototype.verify = function verify(signature, data) {
  return this.session.verify(this.key, this.algorithm, signature, data);
}

SymmetricKey.prototype.encrypt = function encrypt(data) {
  return this.session.encrypt(this.key, this.algorithm, data);
}

SymmetricKey.prototype.decrypt = function encrypt(data) {
  return this.session.decrypt(this.key, this.algorithm, data);
}

SymmetricKey.prototype.wrapKey = function wrapKey(key) {
  return this.session.wrapKey(this.key, this.algorithm, key);
}

SymmetricKey.prototype.unwrapKey = function unwrapKey(data, template) {
  return this.session.unwrapKey(this.key, this.algorithm, template, data);
}

SymmetricKey.prototype.toType = function (KeyClass, algorithm) {
  var new_key = new KeyClass();
  new_key.initialize(this.session, algorithm || this.algorithm, this.key);
  return new_key;
};

SymmetricKey.prepareProperties = function prepareProperties(props) {
  AbstractKey.prepareProperties(props);

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
  var _key = session.generateKey(algorithm, props);
  var skey = new SymClass();
  skey.initialize(session, algorithm, _key, props);
  return skey;
}


module.exports = SymmetricKey;