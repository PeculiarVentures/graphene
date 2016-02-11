export * from "./core/object";
export * from "./core/error";
export * from "./core/collection";
export * from "./core/type";

import * as ref from "ref";
import * as refStruct from "ref-struct";
import * as refArray from "ref-array";

export const Ref = ref;
export const RefStruct = refStruct;
export const RefArray = refArray;