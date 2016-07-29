export function isString(v: any) {
    return typeof (v) === "string";
}
export function isNumber(v: any) {
    return typeof (v) === "number";
}
export function isBoolean(v: any) {
    return typeof (v) === "boolean";
}
export function isUndefined(v: any) {
    return typeof (v) === "undefined";
}
export function isNull(v: any) {
    return v === null;
}
export function isEmpty(v: any) {
    return isUndefined(v) || isNull(v);
}
export function isFunction(v: any) {
    return typeof (v) === "function";
}
export function isObject(v: any) {
    return typeof (v) === "object";
}
export function isArray(v: any) {
    return Array.isArray(v);
}
export function isFlag(v: any, fv: number) {
    return (v & fv) === fv;
}