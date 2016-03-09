"use strict";
function isString(v) {
    return typeof (v) === "string";
}
exports.isString = isString;
function isNumber(v) {
    return typeof (v) === "number";
}
exports.isNumber = isNumber;
function isBoolean(v) {
    return typeof (v) === "boolean";
}
exports.isBoolean = isBoolean;
function isUndefined(v) {
    return typeof (v) === "undefined";
}
exports.isUndefined = isUndefined;
function isNull(v) {
    return v === null;
}
exports.isNull = isNull;
function isEmpty(v) {
    return isUndefined(v) || isNull(v);
}
exports.isEmpty = isEmpty;
function isFunction(v) {
    return typeof (v) === "function";
}
exports.isFunction = isFunction;
function isObject(v) {
    return typeof (v) === "object";
}
exports.isObject = isObject;
function isArray(v) {
    return Array.isArray(v);
}
exports.isArray = isArray;
function isFlag(v, fv) {
    return (v & fv) === fv;
}
exports.isFlag = isFlag;
