var common = require('../../common');
var util = require('util');

var Utils = common.Utils;
var Type = common.Type;
var ERROR = common.Error;
var Debug = common.Debug;
var CKI = common.CKI;
var Enums = common.Enums;

var KeyUtil = require('../util');

function AsymmetricKey() {
  this.privateKey;
  this.publicKey;
}

AsymmetricKey.protitype.initialize = function (session, algorithm, privateKey, publicKey, props) {
  if (!(session instanceof CKI.Session))
    throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Session"));
  this.privateKey = privateKey;
  this.publicKey = publicKey;
  this.algorithm = algorithm;
}

AsymmetricKey.prototype.delete = function Delete() {
  this.session.destroyObject(this.privateKey);
  this.session.destroyObject(this.publicKey);
}

AsymmetricKey.prepareProperties = function prepareProperties(props) {
  if (!Type.isObject(props))
    throw new TypeError("Parameter 1 must be Object");
  if (!props.keyType)
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
    publicKey: {
      "class": Enums.ObjectClass.PublicKey,
      "keyType": props.keyType,
      "label": props.label,
      "token": props.token,
      "id": props.id,
      "verify": KeyUtil.isKeyUsage(KeyUtil.VERIFY, props.keyUsages),
      "encrypt": KeyUtil.isKeyUsage(KeyUtil.ENCRYPT, props.keyUsages),
      "wrap": KeyUtil.isKeyUsage(KeyUtil.WRAP, props.keyUsages),
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
      "extractable": props.extractable
    }
  };
  return gen_props
}

AsymmetricKey.generate = function generate(session, algorithm, props, Sym_class) {
  if (!(session instanceof CKI.Session))
    throw new TypeError(Utils.printf(ERROR.TYPE, 1, "Session"));
    
  Sym_class = Sym_class || AsymmetricKey;

  if (!props.privateKey)
    throw new TypeError("Parameter 'privateKey' is missing in props");
  if (!props.publicKey)
    throw new TypeError("Parameter 'publicKey' is missing in props");
  
  var _key = session.generateKeyPair(algorithm, props.publicKey, props.privateKey);
  var skey = new Sym_class();
  skey.initialize(session, algorithm, _key.private, _key.public, props);
  return _key;
}

AsymmetricKey.prototype.toType = function (KeyClass, algorithm) {
  var new_key = new KeyClass();
  new_key.initialize(this.session, algorithm || this.algorithm, this.privateKey, this.publicKey);
  return new_key;
};

module.exports = AsymmetricKey;