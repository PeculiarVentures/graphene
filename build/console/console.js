#!/usr/bin/env node
"use strict";
var readline = require("readline");
var defs = require("./commands/defs");
var cmdModule = require("./commands/module");
var cmdSlot = require("./commands/slot");
var cmdObject = require("./commands/object");
var cmdHash = require("./commands/hash");
var cmdTest = require("./commands/test");
cmdModule.cmdModuleLoad;
cmdModule.cmdModuleInfo;
cmdModule.cmdModuleInit;
cmdSlot.cmdSlotInfo;
cmdSlot.cmdSlotList;
cmdSlot.cmdSlotCiphers;
cmdSlot.cmdSlotOpen;
cmdSlot.cmdSlotStop;
cmdObject.cmdObject;
cmdObject.cmdObjectDelete;
cmdObject.cmdObjectInfo;
cmdObject.cmdObjectList;
cmdHash.cmdHash;
cmdTest.cmdTest;
cmdTest.cmdTestGen;
cmdTest.cmdTestSign;
cmdTest.cmdTestEnc;
global["readline"] = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
defs.commander.on("error", function (e) {
    console.log();
    console.log(e.message);
    console.log("Stack:", e.stack);
    if (e.command && e.command.print) {
        console.log();
        e.command.print("usage");
        e.command.print("commands");
        e.command.print("example");
    }
    global["readline"].prompt();
});
defs.commander.createCommand("version", "version of graphene")
    .on("call", function () {
    console.log();
    console.log("Version: 2.0.0");
    console.log();
});
defs.commander.createCommand("exit", "exit from the application")
    .on("call", function (v) {
    console.log();
    console.log("Thanks for using");
    console.log();
    global["readline"].close();
    global["readline"].prompt = function () { };
});
global["readline"].on("line", function (cmd) {
    defs.commander.parse(cmd);
    global["readline"].prompt();
});
global["readline"].prompt();
