var util = require('util');

var KeyUtil = require('../util');
var Rsa = require('./rsa');

function RsaPSS() {
}
util.inherits(RsaPSS, Rsa);

RsaPSS.prototype.sign = function sign(data) {
  return this.session.sign(this.privateKey, this.algorithm, data);
}

RsaPSS.prototype.verify = function verify(signature, data) {
  return this.session.verify(this.publicKey, this.algorithm, signature, data);
}

var _generate = RsaPSS.prototype.generate;
RsaPSS.generate = function generate(session, algorithm, props) {
  var res = _generate(session, algorithm, props, RsaPSS);
  return res;
}

module.export = RsaPSS