#!/usr/bin/env node


var debug = require('debug')('commander');
var fs = require('fs');
var readline = require('readline');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var CAPTION_UNDERLINE = "==============================";

var ERROR_MODULE_NOT_INITIALIZED = "Moduele is not initialized";
var ERROR_SLOTS_NOT_INITIALIZED = "Slots are not initialized"

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var commander = require('../lib/commander/command');

commander.on("error", function (e) {
  console.log("Error:", e.message);
  debug(e.stack);
  rl.prompt();
})

/* ==========
   Helpers
   ==========*/
function print_caption(name) {
  console.log(name);
  console.log(CAPTION_UNDERLINE);
}

function check_module() {
  if (!mod)
    throw new Error(ERROR_MODULE_NOT_INITIALIZED);
}

function check_file(v) {
  debug("Check file exists " + v);
  if (!fs.existsSync(v) || !fs.statSync(v).isFile())
    throw new Error('File is not found');
  return v;
}

/* ==========
   Module
   ==========*/
var mod;
commander.createCommand("module")
//.option("l", "list", "Prints list of connected modules", [])
  .option('init', 'init', 'Initialize module')
  .option('n', 'name', 'Name of module')
  .option('l', 'lib', 'Path to library', check_file)
  .option('i', 'info', 'Returns info about Module')
  .on("call", function (cmd) {
    /* ===== init ===== */
    if ("init" in cmd) {
      debug("Run sub command 'init'");
      if (!("lib" in cmd))
        throw new Error("Parameter --lib is required");
      if (!("name" in cmd))
        throw new Error("Parameter --name is required");
      mod = Module.load(cmd.lib, cmd.name);
      mod.initialize();
    }
    /* ===== info ===== */
    else if ("info" in cmd) {
      debug("Run sub command 'info'");
      check_module();
      print_caption("Module info");
      console.log("\tLibrary:", mod.lib);
      console.log("\tName:", mod.name);
      console.log("\tDescription:", mod.description);
      console.log("\tCryptoki version:", mod.cryptokiVersion);
    }
    else {
      throw new Error("Unknown command in use");
    }
    rl.prompt();
  })

function print_slot(slot) {
  print_caption("Slot info");
  console.log("\tNumber:", slot.number);
  console.log("\tDescription:", slot.description);
  console.log("\tIs hardware:", slot.isHardware());
  console.log("\tIs removable:", slot.isRemovable());
  console.log("\tIs accessible:", slot.isAccessible());
  console.log("\tIs initialized:", slot.isInitialized());
}

function check_slots() {
  if (!slots)
    throw new Error(ERROR_SLOTS_NOT_INITIALIZED);
}

function get_slot_list() {
  check_module();
  slots = mod.getSlots(true); //with token present
}

function get_slot(cmd) {
  check_module();
  if (!("number" in cmd))
    throw new Error("Parameter --number is required");
  if (!slots)
    get_slot_list();
  var slot = slots[cmd.number];
  if (!slot)
    throw new Error("Unknown --number value");
  return slot;
}

function get_session(cmd) {
  var slot = get_slot(cmd);
  if (!("pin" in cmd))
    throw new Error("Parameter --pin is required");
  var session = slot.session;
  session.start();
  session.login(cmd.pin);
  return session;
}

var slots = null;
commander.createCommand("slot")
//.option("l", "list", "Prints list of connected modules", [])
  .option('l', 'list', 'Returns list of slots')
  .option('n', 'number', 'Returns slot by number')
  .option('i', 'info', 'Returns info about slot')
  .option('hs', 'hashes', 'Returns an array with the names of the supported hash algorithms')
  .option('cs', 'ciphers', 'Returns an array with the names of the supported ciphers')
  .option('as', 'algs', 'Returns an array with the names of the supported algoriphms')
  .option('p', 'pin', 'PIN of session')
  .option('h', 'help', 'Returns Help description')
  .on("call", function (cmd) {
    if ("list" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.list.description);
        return;
      }
      get_slot_list();
      print_caption("Slot list");
      console.log("Slot count:", slots.length);
      console.log();
      for (var i in slots) {
        var slot = slots[i];
        print_slot(slot);
      }
    }
    else if ("info" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.hashes.description);
        return;
      }
      var slot = get_slot(cmd)
      print_slot(slot);
    }
    else if ("hashes" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.hashes.description);
        return;
      }
      var slot = get_slot(cmd)
      var lDigest = slot.getHashes();
      print_caption("List of the supported hashes");
      for (var i in lDigest) {
        console.log("\t" + lDigest[i]);
      }
    }
    else if ("ciphers" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.ciphers.description);
        return;
      }
      var slot = get_slot(cmd)
      var lCiphers = slot.getCiphers();
      print_caption("List of the supported ciphers");
      for (var i in lCiphers) {
        console.log("\t" + lCiphers[i]);
      }
    }
    else if ("algs" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.algs.description);
        console.log("slot --algs --number|-n <Number>");
        console.log("\t--number|-n number of Slot.");
        return;
      }
      var slot = get_slot(cmd)
      var lAlg = slot.mechanismList;
      //Adds symbols to String, default symbol is white space
      function add_padding(s, size, c) {
        if (!c) c = " ";
        var res = s;
        if (s.length < size) {
          for (var i = s.length; i <= size; i++) {
            res += c;
          }
        }
        return res;
      }
      function print_bool(v) {
        return v ? 'x' : ' ';
      }
      print_caption("List of the supported algoriphms");
      var COLUMN_SIZE = 30;
      console.log("\t" + add_padding("Algoriphm name", COLUMN_SIZE) + "h s v e d w u g");
      console.log("\t" + add_padding("", COLUMN_SIZE + 15, "-"));
      for (var i in lAlg) {
        var alg = lAlg[i];
        var s = add_padding(alg.name, COLUMN_SIZE);
        s += print_bool(alg.isDigest()) + " ";
        s += print_bool(alg.isSign()) + " ";
        s += print_bool(alg.isVerify()) + " ";
        s += print_bool(alg.isEncrypt()) + " ";
        s += print_bool(alg.isDecrypt()) + " ";
        s += print_bool(alg.isWrap()) + " ";
        s += print_bool(alg.isUnwrap()) + " ";
        s += print_bool(alg.isGenerate() || alg.isGenerateKeyPair());
        console.log("\t" + s);
      }
    }
    else {
      throw new Error("Unknown command in use");
    }
    rl.prompt();
  })

commander.createCommand("hash")
  .option('help', 'h', 'Returns Help description')
  .option('a', 'alg', 'Algorith name')
  .option('n', 'number', 'Returns slot by number')
  .option('p', 'pin', 'PIN of slot')
  .option('in', 'in', 'Path to input file', check_file)
  .on("call", function (cmd) {
    if (!("in" in cmd))
      throw new Error("Parameter --alg is required");
    if (!("alg" in cmd))
      cmd.alg = 'sha1';
    var rs = fs.createReadStream(cmd.in);
    var session = get_session(cmd);
    var digest = session.createDigest(cmd.alg);
    rs.on('data', function (chunk) {
      digest.update(chunk);
    })
    rs.on('end', function () {
      var hash = digest.final();
      console.log(hash.toString('hex'));
      session.logout();
      session.stop();
      rl.prompt();
    });
  })

function gen_AES(session) {
		var _key = session.generateKey("AES_KEY_GEN", {
    "class": Enums.ObjectClass.SecretKey,
    "keyType": Enums.KeyType.AES,
    "valueLen": 32,
    "label": "test key AES",
    "private": true,
    "sensitive": true,
    "token": true,
    "encrypt": true,
    "decrypt": true,
    "wrap": true,
    "unwrap": true,
    "extractable": false,
		})
		return _key;
}

var BUF_SIZE = 1024;
var BUF_STEP = 8;
var BUF = new Buffer(BUF_STEP);

function test_encrypt(session, key, algName) {
  var enc = session.createEncrypt(algName, key);
  var msg = new Buffer(0);
  var buf = new Buffer(BUF_STEP);
  for (var i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
		  msg = Buffer.concat([msg, enc.update(buf)]);
  }
  msg = Buffer.concat([msg, enc.final()]);
}

commander.createCommand("test")
  .option('help', 'h', 'Returns Help description')
  // .option('a', 'alg', 'Algorith name')
  .option('p', 'pin', 'PIN of slot')
  .option('n', 'number', 'Returns slot by number', function (v) {
    var res = +v;
    if (!Number.isInteger(res))
      throw new TypeError("Parameter --num must be number");
    if (res <= 0)
      throw new TypeError("Parameter --num must be more then 0");
    return res;
  })
  .option('p', 'pin', 'PIN of slot')
  .on("call", function (cmd) {
    // if (!("in" in cmd))
    //   throw new Error("Parameter --alg is required");
    if (!("alg" in cmd))
      cmd.alg = '';
    if (!("num" in cmd))
      cmd.num = 1;
    console.time("Key generation");
    var key = gen_AES();
    console.timeEnd("Key generation");
    console.time("Encryption");
    var session = get_session(cmd);
    for (var i = 0; i < cmd.num; i++)
      test_encrypt(session, key, {
        name: "AES_CBC_PAD",
        params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
      });
      console.timeEnd("Encryption");
  })

commander.createCommand("exit")
  .on("call", function (v) {
    if (mod)
      mod.finalize();
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