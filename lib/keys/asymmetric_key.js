var common = require('../common');
var util = require('util');

var Utils = common.Utils;
var Type = common.Type;
var ERROR = common.Error;
var Debug = common.Debug;
var CKI = common.CKI;
var Enums = common.Enums;

var AbstractKey = require('./abstract_key');
var KeyUtil = require('./util');

function AsymmetricKey() {
  this.privateKey = null;
  this.publicKey = null;
}
util.inherits(AsymmetricKey, AbstractKey);

AsymmetricKey.prototype.initialize = function (session, algorithm, privateKey, publicKey, props) {
  AbstractKey.prototype.initialize.apply(this, arguments);
  this.privateKey = privateKey;
  this.publicKey = publicKey;
}

AsymmetricKey.prototype.delete = function Delete() {
  this.session.destroyObject(this.privateKey);
  this.session.destroyObject(this.publicKey);
}

AsymmetricKey.prototype.sign = function sign(data) {
	return this.session.sign(this.privateKey, this.algorithm, data);
}

AsymmetricKey.prototype.verify = function verify(signature, data) {
	return this.session.verify(this.publicKey, this.algorithm, signature, data);
}

AsymmetricKey.prototype.encrypt = function encrypt(data) {
	return this.session.encrypt(this.publicKey, this.algorithm, data);
}

AsymmetricKey.prototype.decrypt = function encrypt(data) {
	return this.session.decrypt(this.privateKey, this.algorithm, data);
}

AsymmetricKey.prototype.wrapKey = function wrapKey(key) {
	return this.session.wrapKey(this.publicKey, this.algorithm, key);
}

AsymmetricKey.prototype.unwrapKey = function unwrapKey(data, template) {
	return this.session.unwrapKey(this.privateKey, this.algorithm, template, data);
}

AsymmetricKey.prototype.deriveKey = function deriveKey(template) {
	return this.session.deriveKey(this.algorithm, this.privateKey, template);
}

AsymmetricKey.prototype.toType = function (KeyClass, algorithm) {
  var new_key = new KeyClass();
  new_key.initialize(this.session, algorithm || this.algorithm, this.privateKey, this.publicKey);
  return new_key;
};

AsymmetricKey.prepareProperties = function prepareProperties(props) {
  AbstractKey.prepareProperties(props);  
  var gen_props = {
    publicKey: {
      "class": Enums.ObjectClass.PublicKey,
      "keyType": props.keyType,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "verify": KeyUtil.isKeyUsage(KeyUtil.VERIFY, props.keyUsages),
      "encrypt": KeyUtil.isKeyUsage(KeyUtil.ENCRYPT, props.keyUsages),
      "wrap": KeyUtil.isKeyUsage(KeyUtil.WRAP, props.keyUsages),
      "derive": KeyUtil.isKeyUsage(KeyUtil.DERIVE, props.keyUsages),
    },
    privateKey: {
      "class": Enums.ObjectClass.PrivateKey,
      "keyType": props.keyType,
      "private": true,
      "sensitive": true,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "sign": KeyUtil.isKeyUsage(KeyUtil.SIGN, props.keyUsages),
      "decrypt": KeyUtil.isKeyUsage(KeyUtil.DECRYPT, props.keyUsages),
      "unwrap": KeyUtil.isKeyUsage(KeyUtil.UNWRAP, props.keyUsages),
      "derive": KeyUtil.isKeyUsage(KeyUtil.DERIVE, props.keyUsages),
      "extractable": props.extractable
    }
  };
  return gen_props
}

AsymmetricKey.generate = function generate(session, algorithm, props, AsymClass) {
  AsymClass = AsymClass || AsymmetricKey;

  if (!props.privateKey)
    throw new TypeError("Parameter 'privateKey' is missing in props");
  if (!props.publicKey)
    throw new TypeError("Parameter 'publicKey' is missing in props");
  
  var _key = session.generateKeyPair(algorithm, props.publicKey, props.privateKey);
  var skey = new AsymClass();
  skey.initialize(session, algorithm, _key.private, _key.public, props);
  return skey;
}

module.exports = AsymmetricKey;