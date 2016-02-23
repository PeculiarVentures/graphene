// #!/usr/bin/env node

// module init -p ../../../graphene.json

import * as fs from "fs";
import * as readline from "readline";
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

// Console app init
global["readline"] = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Init commander
defs.commander.on("error", (e) => {
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

/* ==========
   exit
   ==========*/
defs.commander.createCommand("exit", "exit from the application")
    .on("call", function(v) {
        console.log();
        console.log("Thanks for using");
        console.log();
        global["readline"].close();
        global["readline"].prompt = function() { };
    });

// Read line
global["readline"].on("line", function(cmd) {
    defs.commander.parse(cmd);
    global["readline"].prompt();
});
global["readline"].prompt();