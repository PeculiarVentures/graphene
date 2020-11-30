export function isString(v: any): v is string {
  return typeof (v) === "string";
}
export function isNumber(v: any): v is number {
  return typeof (v) === "number";
}
export function isBoolean(v: any): v is boolean {
  return typeof (v) === "boolean";
}
export function isUndefined(v: any): v is undefined {
  return typeof (v) === "undefined";
}
export function isNull(v: any): v is null {
  return v === null;
}
export function isEmpty(v: any): v is null | undefined {
  return isUndefined(v) || isNull(v);
}
export function isFunction(v: any): v is (...args: any[]) => any {
  return typeof (v) === "function";
}
export function isObject(v: any): v is object {
  return typeof (v) === "object";
}
export function isArray(v: any): v is any[] {
  return Array.isArray(v);
}
export function isFlag(v: any, fv: number) {
  return (v & fv) === fv;
}
export function removePadding(text: string) {
  return text.replace(/\0.*/g, "").trim();
}