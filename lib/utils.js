//-----Type----
var Type = {};

function isString(v) {
	return typeof (v) === "string";
}
function isNumber(v) {
	return typeof (v) === "number";
}
function isBoolean(v) {
	return typeof (v) === "boolean";
}
function isUndefined(v) {
	return typeof (v) === "undefined";
}
function isNull(v) {
	return v === null;
}
function isEmpty(v) {
	return isUndefined(v) || isNull(v);
}
function isFunction(v) {
	return typeof (v) === "function";
}
function isObject(v) {
	return typeof (v) === "object";
}
function isArray(v) {
	return Array.isArray(v);
}
function isFlag(v, fv) {
	return (v & fv) === fv;
}

Type.isString = isString;
Type.isNumber = isNumber;
Type.isBoolean = isBoolean;
Type.isBool = isBoolean;
Type.isUndefined = isUndefined;
Type.isNull = isNull;
Type.isEmpty = isEmpty;
Type.isObject = isObject;
Type.isArray = isArray;
Type.isFunction = isFunction;
Type.isFlag = isFlag;

//-----Utils----

var Utils = {};

function printf(s) {
	if (isEmpty(s)) throw new Error(printf(ERROR.REQUIRED, 1));
	if (!isString(s)) throw new TypeError(printf(ERROR.ERROR_TYPE, 1, "String"));
	for (var i = 1; i < arguments.length; i++) {
		var reg = new RegExp('(\%' + i + ')', 'g');
		s = s.replace(reg, arguments[i]);
	}
	return s;
}

Utils.printf = printf;

Utils.trim = function trim(s) {
	var res = "";
	var fSpace = true;
	for (var i = 0; i <= s.length; i++) {
		var c = s.charAt(i);
		if (c == " ")
			if (fSpace)
				continue;
			else
				fSpace = true;
		else
			fSpace = false;
		res += c;
	}
	var rtrim = /(\s+)$/;
	res = res.replace(rtrim, "");
	return res;
}

//-----Error----

var ERROR = {}
ERROR.TYPE = "Parameter %1 must be %2";
ERROR.REQUIRED = "Parameter %1 is required";

var exp = {
	ERROR: ERROR,
	Utils: Utils,
	Type: Type
}

module.exports = exp;