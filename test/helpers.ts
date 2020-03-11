import { Module } from "../src";

// tslint:disable:no-console

function testManufacturer(mod: Module, manufacturerID: string) {
  if (mod.manufacturerID === manufacturerID) {
    // console.warn("    \x1b[33mWARN:\x1b[0m Test is not supported for %s", manufacturerID);
    return true;
  }
  return false;
}

export function isSoftHSM(mod: Module) {
  return testManufacturer(mod, "SoftHSM");
}

export function isThalesNShield(mod: Module) {
  return testManufacturer(mod, "nCipher Corp. Ltd");
}

// tslint:enable:no-console
