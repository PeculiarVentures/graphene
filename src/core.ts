export * from "./core/object";
export * from "./core/error";
export * from "./core/collection";
export * from "./core/type";
export * from "./core/utc";

export declare type CryptoData = string | Buffer;

export function removePadding(text: string) {
  return text.replace(/\0.*/g, "").trim();
}

export function getPKCS11ErrorCode(error: Error) {
  const regex = /^\w+:(\d+)/i;
  const res = regex.exec(error.message);
  if (res) {
    return parseInt(res[1], 10);
  }
  return -1;
}
