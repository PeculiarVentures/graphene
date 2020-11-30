export * from "./core/object";
export * from "./core/error";
export * from "./core/collection";
export * from "./core/type";
export * from "./core/utc";

export declare type CryptoData = string | Buffer;

export function removePadding(text: string) {
  return text.replace(/\0.*/g, "").trim();
}
