export function isString(v) {
    return typeof (v) === "string";
}
export function isNumber(v) {
    return typeof (v) === "number";
}
export function isBoolean(v) {
    return typeof (v) === "boolean";
}
export function isUndefined(v) {
    return typeof (v) === "undefined";
}
export function isNull(v) {
    return v === null;
}
export function isEmpty(v) {
    return isUndefined(v) || isNull(v);
}
export function isFunction(v) {
    return typeof (v) === "function";
}
export function isObject(v) {
    return typeof (v) === "object";
}
export function isArray(v) {
    return Array.isArray(v);
}
export function isFlag(v, fv) {
    return (v & fv) === fv;
}