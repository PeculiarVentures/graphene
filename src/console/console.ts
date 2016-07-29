// #!/usr/bin/env node

// module init -p ../../../safenet-config.json

import * as fs from "fs";
import * as readline from "readline";
import {CommandError} from "./lib/error";
import * as defs from "./commands/defs";

import * as cmdModule from "./commands/module";
import * as cmdSlot from "./commands/slot";
import * as cmdObject from "./commands/object";
import * as cmdHash from "./commands/hash";
import * as cmdTest from "./commands/test";

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

declare let global: any;

// Console app init
global["readline"] = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Init commander
defs.commander.on("error", (e: CommandError) => {
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


/**
 * version
 */
defs.commander.createCommand("version", "version of graphene")
    .on("call", function() {
        console.log();
        console.log(`Version: 2.0.0`);
        console.log();
    });


/* ==========
   exit
   ==========*/
defs.commander.createCommand("exit", "exit from the application")
    .on("call", function(v: any) {
        console.log();
        console.log("Thanks for using");
        console.log();
        global["readline"].close();
        global["readline"].prompt = function() { };
    });

// Read line
global["readline"].on("line", function(cmd: any) {
    defs.commander.parse(cmd);
    global["readline"].prompt();
});
global["readline"].prompt();