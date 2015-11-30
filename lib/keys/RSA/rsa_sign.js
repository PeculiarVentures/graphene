var util = require('util');

var KeyUtil = require('../util');
var Rsa = require('./rsa');

function RsaSignature() {
}
util.inherits(RsaSignature, Rsa);

RsaSignature.prototype.sign = function sign(data) {
  return this.session.sign(this.privateKey, this.algorithm, data);
}

RsaSignature.prototype.verify = function verify(signature, data) {
  return this.session.verify(this.publicKey, this.algorithm, signature, data);
}

var _generate = RsaSignature.prototype.generate;
RsaSignature.generate = function generate(session, algorithm, props) {
  var res = _generate(session, algorithm, props, RsaSignature);
  return res;
}

module.exports = RsaSignature