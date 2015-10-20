var common = require('./common');

var Ref = common.Ref;
var RefArray = common.RefArray;
var CKI = common.CKI;
var ERROR = common.ERROR;
var Type = common.Type;
var Utils = common.Utils;
var Enums = common.Enums;
var Debug = common.Debug;

var MechanismInfo = require("./mechanism_info");

var MAX_HASH_LEN = 2048;

function Digest(session){
	Object.defineProperty(this, "cki", {
		writable: true,
		enumerable: false
	})
	Object.defineProperty(this, "session", {
		writable: true,
		enumerable: false
	})
	this.session = session;
	this.cki = session.cki;
	this.isIitialized = false;
}

function checkInit(i){
	if (!i)
		throw new Error("Digest is not initialized");
}

Digest.prototype.init = function init(algName){
	Debug("Digest init", algName);
	var mech = MechanismInfo.create(algName);
	
	Debug("C_DigestInit");
	var res = this.cki.C_DigestInit(this.session.handle, mech.ref());
	Utils.check_cki_res(res, "C_DigestInit");
	this.isInitialized = true;	
}

Digest.prototype.update = function update(data){
	checkInit(this.isInitialized);
	
	if (Type.isString(data)){
		//Wrap data to Buffer
		data = new Buffer(data);
	}
	if (!Buffer.isBuffer(data))
		throw new TypeError(Utils.printf(ERROR.TYPE,1,"Buffer"));
	
	Debug("C_DigestUpdate");
	var res = this.cki.C_DigestUpdate(this.session.handle, data, data.length);
	Utils.check_cki_res(res, "C_DigestUpdate");
}

Digest.prototype.final = function final(){
	checkInit(this.isInitialized);
	
	var hash = new Buffer(MAX_HASH_LEN);
	var $bufLen = new Buffer(4);
	$bufLen.writeUInt32LE(MAX_HASH_LEN,0);
	
	Debug("C_DigestFinal");
	var res = this.cki.C_DigestFinal(this.session.handle, hash, $bufLen);
	Utils.check_cki_res(res, "C_DigestFinal");
	
	$bufLen.type = Ref.types.int;
	
	this.isInitialized = false;
	var bufLen = Ref.deref($bufLen);
	return hash.slice(0, bufLen);
}

module.exports = Digest;