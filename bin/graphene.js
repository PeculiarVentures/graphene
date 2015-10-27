#!/usr/bin/env node

var debug = require('debug')('commander');
var fs = require('fs');
var readline = require('readline');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var commander = require('../lib/commander/command');

commander.on("error", function (msg) {
  console.log("Error:", msg);
  rl.prompt();
})

/* ==========
   Module
   ==========*/
var mod;
commander.createCommand("module")
//.option("l", "list", "Prints list of connected modules", [])
  .option('i', 'init', 'Initialize module')
  .option('n', 'name', 'Name of module')
  .option('l', 'lib', 'Path to library', function (v) {
    debug("Check file exists " + v);
    if (!fs.existsSync(v))
      throw new Error('File is not found');
    return v;
  })
  .option('p', 'psw', 'Initialize module')
  .on("call", function (cmd) {
    debug("Run command 'module'");
    if ("init" in cmd) {
      debug('Command params:', cmd);
      if (!("lib" in cmd))
        throw new Error("Parameter --lib is required");
      if (!("name" in cmd))
        throw new Error("Parameter --name is required");
      mod = Module.load(cmd.lib, cmd.name);
      mod.initialize();
    }
    else {
      throw new Error("Unknown command in use");
    }
    rl.prompt();
  })

commander.createCommand("slot")
//.option("l", "list", "Prints list of connected modules", [])
  .option('l', 'list', 'Returns list of slots')
  .on("call", function (cmd) {
    debug("Run command 'slot'");
    debug('Command params:', cmd);
    if ("list" in cmd) {
      var slots = mod.getSlots();
      console.log("Slot count:", slots.length);
    }
    else {
      throw new Error("Unknown command in use");
    }
    rl.prompt();
  })

commander.createCommand("hello")
  .option("h", "help", "Description", "Default value")
  .on("call", function (v) {
    console.log("Form hello command:", v);
    rl.prompt();
  })

commander.createCommand("exit")
  .on("call", function (v) {
    console.log("Thanks for using");
    rl.close();
  })

commander.createCommand("help")
  .on("call", function (v) {
    console.log("Description of graphene console application");
    rl.prompt();
  })

rl.on("line", function (cmd) {
  commander.parse(cmd);
})
rl.prompt();