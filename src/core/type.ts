/**
 * Returns `true` if incoming data is string, otherwise `false`
 * @param v Tested value
 */
export function isString(v: any): v is string {
  return typeof (v) === "string";
}

/**
 * Returns `true` if incoming data is number, otherwise `false`
 * @param v Tested value
 */
export function isNumber(v: any): v is number {
  return typeof (v) === "number";
}

/**
 * Returns `true` if incoming data is boolean, otherwise `false`
 * @param v Tested value
 */
export function isBoolean(v: any): v is boolean {
  return typeof (v) === "boolean";
}

/**
 * Returns `true` if incoming data is undefined, otherwise `false`
 * @param v Tested value
 */
export function isUndefined(v: any): v is undefined {
  return typeof (v) === "undefined";
}

/**
 * Returns `true` if incoming data is null, otherwise `false`
 * @param v Tested value
 */
export function isNull(v: any): v is null {
  return v === null;
}

/**
 * Returns `true` if incoming data is empty (undefined or null), otherwise `false`
 * @param v Tested value
 */
export function isEmpty(v: any): v is null | undefined {
  return isUndefined(v) || isNull(v);
}

/**
 * Returns `true` if incoming data is Function, otherwise `false`
 * @param v Tested value
 */
export function isFunction(v: any): v is (...args: any[]) => any {
  return typeof (v) === "function";
}

/**
 * Returns `true` if incoming data is Object, otherwise `false`
 * @param v Tested value
 */
export function isObject(v: any): v is object {
  return typeof (v) === "object";
}

/**
 * Returns `true` if incoming data is Array, otherwise `false`
 * @param v Tested value
 */
export function isArray(v: any): v is any[] {
  return Array.isArray(v);
}

/**
 * Returns `true` if bit is enabled in flag value, otherwise `false`
 * @param v Flag
 * @param fv Bit value
 */
export function isFlag(v: number, fv: number) {
  return (v & fv) === fv;
}

/**
 * Removes padded ends from the string
 * @param text Formatted string
 */
export function removePadding(text: string) {
  return text.replace(/\0.*/g, "").trim();
}
