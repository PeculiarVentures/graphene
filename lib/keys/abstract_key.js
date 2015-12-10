var common = require('../common');
var util = require('util');

var Utils = common.Utils;
var Type = common.Type;
var ERROR = common.Error;
var Debug = common.Debug;
var CKI = common.CKI;
var Enums = common.Enums;

var KeyUtil = require('./util');

function AbstractKey() {
}

AbstractKey.prototype.initialize = function (session, algorithm) {
  Object.defineProperty(this, "session", {
    get: function () {
      return session;
    }
  })
  this.algorithm = algorithm;
}

AbstractKey.prototype.delete = function Delete() { }

AbstractKey.prototype.toType = function (KeyClass, algorithm) {
};

AbstractKey.prepareProperties = function prepareProperties(props) {
  if (!Type.isObject(props))
    throw new TypeError("Parameter 1 must be Object");
  if (!("keyType" in props))
    throw new TypeError("Props must have keyType parameter");
  if (!props.label) {
    props.label = (props.labelPrefix || "AsymmetricKey") + " " + new Date().getTime();
  }
  props.id = KeyUtil.createKeyID()
  props.token = ("token" in props && props.token) ? true : false;
  if (props.extractable)
    props.extractable = true;
  else
    props.extractable = false;

  return props;
}

AbstractKey.generate = function generate(session, algorithm, props, KeyClass) {
}


module.exports = AbstractKey;