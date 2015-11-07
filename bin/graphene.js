#!/usr/bin/env node


var debug = require('debug')('commander');
var fs = require('fs');
var readline = require('readline');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var CAPTION_UNDERLINE = "==============================";

var ERROR_MODULE_NOT_INITIALIZED = "Module is not initialized";
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
/**
 * Prints caption to stdout with underline
 * 
 * View:
 * <name>
 * ===================================
 */
function print_caption(name) {
  console.log(name);
  console.log(CAPTION_UNDERLINE);
}

/**
 * Checks module was initialized
 */
function check_module() {
  if (!mod)
    throw new Error(ERROR_MODULE_NOT_INITIALIZED);
}

/**
 * Checks input file path. Throw exception if file is not exist
 */
function check_file(v) {
  debug("Check file exists " + v);
  if (!fs.existsSync(v) || !fs.statSync(v).isFile())
    throw new Error('File is not found');
  return v;
}

var COLUMN_SIZE = 30;

/**
 * Adds symbols to String, default symbol is white space
 * @param s Source string value
 * @param size Final size of string
 * @param c Padding char. Optional. Default is ' '
 * @param d Padding direction. Boolean value which set left o right direction. False - right padding, true - left padding. Optional. Default false
 */
function pud(s, size, c, d) {
  if (!c) c = " ";
  var res, pad = "";
  if (s.length < size) {
    for (var i = 0; i < (size - s.length); i++)
      pad += c;
  }
  if (!d) {
    res = s + pad;
  }
  else {
    res = pad + s;
  }
  return res;
}

/**
 * Adds padding from left
 */
function lpud(s, size, c) {
  return pud(s, size, c, true);
}

/**
 * Adds padding from right
 */
function rpud(s, size, c) {
  return pud(s, size, c, false);
}
/**
 * Prints Boolean. X - true, ' ' - false
 */
function print_bool(v) {
  return v ? 'x' : ' ';
}

/**
 * Class Timer.
 */
function Timer() {
  this.beginAt = null;
  this.endAt = null;
  this.time = 0;
}

/**
 * Starts timer
 */
Timer.prototype.start = function start() {
  if (!this.beginAt)
    this.beginAt = new Date();
}

/**
 * Stops timer
 */
Timer.prototype.stop = function stop() {
  if (this.beginAt && !this.endAt) {
    this.endAt = new Date();
    this.time = this.endAt.getTime() - this.beginAt.getTime()
  }
}

/* ==========
   Module
   ==========*/
var mod;
commander.createCommand("module")
//.option("l", "list", "Prints list of connected modules", [])
  .option('h', 'help', 'Returns Help description')
  .option('init', 'init', 'Initialize module')
  .option('n', 'name', 'Name of module')
  .option('l', 'lib', 'Path to library', check_file)
  .option('i', 'info', 'Returns info about Module')
  .on("call", function (cmd) {
    /* ===== init ===== */
    if ("init" in cmd) {
      debug("Run sub command 'init'");
      if ('help' in cmd) {
        console.log(this._options.init.description);
        console.log("module --init --lib|-l <String> --name|-n <String>");
        console.log("\t--lib|-l <String> - " + this._options.lib.description);
        console.log("\t--name|-n <String> - " + this._options.name.description);
        return;
      }
      if (!("lib" in cmd))
        throw new Error("Parameter --lib is required");
      if (!("name" in cmd))
        throw new Error("Parameter --name is required");
      mod = Module.load(cmd.lib, cmd.name);
      mod.initialize();
    }
    /* ===== info ===== */
    else if ("info" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.info.description);
        console.log("module --info|-i");
        return;
      }
      debug("Run sub command 'info'");
      check_module();
      print_caption("Module info");
      console.log("\tLibrary:", mod.lib);
      console.log("\tName:", mod.name);
      console.log("\tDescription:", mod.description);
      console.log("\tCryptoki version:", mod.cryptokiVersion);
      /* ===== help ===== */
    } else if ('help' in cmd) {
      console.log("Module command description");
      console.log();
      console.log("Commands:");
      console.log("\tinit - " + this._options.init.description);
      console.log("\tinfo - " + this._options.info.description);
      return;
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
  if (!("slot" in cmd))
    throw new Error("Parameter --slot is required");
  if (!slots)
    get_slot_list();
  var slot = slots[cmd.slot];
  if (!slot)
    throw new Error("Unknown --slot value");
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
  .option('s', 'slot', 'Returns slot by number')
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
        console.log("slot --list");
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
        console.log(this._options.info.description);
        console.log("slot --info --slot|-s <Number>");
        console.log("\t--slot|-s <Number> - " + this._options.slot.description);
        return;
      }
      var slot = get_slot(cmd)
      print_slot(slot);
    }
    else if ("hashes" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.hashes.description);
        console.log("slot --hashes --slot|-s <Number>");
        console.log("\t--slot|-s <Number> - " + this._options.slot.description);
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
        console.log("slot --ciphers --slot|-s <Number>");
        console.log("\t--slot|-s <Number> - " + this._options.slot.description);
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
        console.log("slot --algs --slot|-s <Number>");
        console.log("\t--slot|-s <Number> - " + this._options.slot.description);
        return;
      }
      var slot = get_slot(cmd)
      var lAlg = slot.mechanismList;

      print_caption("List of the supported algoriphms");
      console.log("\t" + pud("Algoriphm name", COLUMN_SIZE) + "h s v e d w u g");
      console.log("\t" + pud("", COLUMN_SIZE + 15, "-"));
      for (var i in lAlg) {
        var alg = lAlg[i];
        var s = pud(alg.name, COLUMN_SIZE);
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
    else if ('help' in cmd) {
      console.log("Slot command description");
      console.log();
      console.log("Commands:");
      console.log("\tlist - " + this._options.list.description);
      console.log("\tinfo - " + this._options.info.description);
      console.log("\talgs - " + this._options.algs.description);
      console.log("\thashes - " + this._options.hashes.description);
      console.log("\tciphers - " + this._options.ciphers.description);
      return;
    }
    else {
      throw new Error("Unknown command in use");
    }
    rl.prompt();
  })

commander.createCommand("hash")
  .option('h', 'help', 'Returns Help description')
  .option('a', 'alg', 'Algorith name')
  .option('s', 'slot', 'Returns slot by number')
  .option('p', 'pin', 'PIN of slot')
  .option('in', 'in', 'Path to input file', check_file)
  .on("call", function (cmd) {
    if ('help' in cmd) {
      console.log("Hash command description");
      console.log("hash --slot|-s <Number> --pin|-p <String> --in <String> [--alg|-a <String> = sha1]");
      console.log("\t--slot|-s <Number> - " + this._options.slot.description);
      console.log("\t--pin|-p <String> - " + this._options.pin.description);
      console.log("\t--in <String> - " + this._options.in.description);
      console.log("\t--alg|-a <String> - Optional. Default SHA1. " + this._options.alg.description);
      return;
    }
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

function gen_RSA(session, size, exp) {
  size = size || 1024;
  exp = exp || new Buffer([3]);
		var _key = session.generateKeyPair("RSA_PKCS_KEY_PAIR_GEN", {
    "class": Enums.ObjectClass.PublicKey,
    "keyType": Enums.KeyType.RSA,
    "label": "test key RSA " + size + " exp " + exp,
    //"private": true,
    //"sensitive": true,
    "token": true,
    //"id": new Buffer("1"),
    //"sign": true,
    "verify": true,
    //"encrypt": true,
    //"decrypt": true,
    //"wrap": true,
    //"unwrap": true,
    //"extractable": false,
    "modulusBits": size,
    "publicExp": exp
		},
    {
      "class": Enums.ObjectClass.PrivateKey,
      "keyType": Enums.KeyType.RSA,
      "label": "test key RSA " + size + " exp " + exp,
      "private": true,
      "sensitive": true,
      "token": true,
      //"id": new Buffer("1"),
      "sign": true,
      //"verify": true,
      //"encrypt": true,
      //"decrypt": true,
      //"wrap": true,
      //"unwrap": true,
      "extractable": false
    })
		return _key;
}

var gen = {
  rsa: {
    "1024": gen_RSA_1024,
    "2048": gen_RSA_2048,
    "4096": gen_RSA_4096,
  }
}

function gen_RSA_1024(session) {
  return gen_RSA(session, 1024);
}

function gen_RSA_2048(session) {
  return gen_RSA(session, 2048);
}

function gen_RSA_4096(session) {
  return gen_RSA(session, 4096);
}

var BUF_SIZE_DEFAULT = 1024;
var BUF_SIZE = 1024;
var BUF_STEP = BUF_SIZE;
var BUF = new Buffer(BUF_STEP);

function test_encrypt(session, key, algName) {
  var enc = session.createEncrypt(algName, key);
  var msg = new Buffer(0);
  var buf = new Buffer(BUF_STEP);
  for (var i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
		  //enc.update(buf);
		  msg = Buffer.concat([msg, enc.update(buf)]);
  }
  msg = Buffer.concat([msg, enc.final()]);
  //enc.final();
}

function test_sign(session, key, algName) {
  var buf = new Buffer(BUF_SIZE);
  var sig = session.createSign(algName, key.private);
  for (var i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
		  sig.update(buf);
  }
  var res = sig.final();
  return res;
}

function test_verify(session, key, algName, sig) {
  var buf = new Buffer(BUF_SIZE);
  var verify = session.createVerify(algName, key.public);
  for (var i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
		  verify.update(buf);
  }
  var res = verify.final(sig);
  return res;
}

function test_sign_rsa(session, cmd, size) {
  var alg = "rsa-" + size;
  if (cmd.alg == "rsa" || cmd.alg == alg) {
    var tGen = new Timer();
    tGen.start();
    var key = gen.rsa[size](session);
    tGen.stop();
    debug("Key generation:", alg.toUpperCase(), tGen.time + "ms");
    var t1 = new Timer();
    var sig = null;
    t1.start();
    for (var i = 0; i < cmd.it; i++)
      sig = test_sign(session, key, "SHA1_RSA_PKCS");
    t1.stop();

    var t2 = new Timer();
    t2.start();
    for (var i = 0; i < cmd.it; i++) {
      test_verify(session, key, "SHA1_RSA_PKCS", sig);
    }
    t2.stop();

    var r1 = Math.round((t1.time / cmd.it) * 1000) / 1000 + "ms";
    var r2 = Math.round((t2.time / cmd.it) * 1000) / 1000 + "ms";
    print_test_sign_row(alg, r1, r2);
  }
}

function print_test_sign_header() {
  console.log(rpud("Algorithm", 30), lpud("Sign", 10), lpud("Verify", 10))
  console.log(rpud("", 52, "="));
}

function print_test_sign_row(alg, t1, t2) {
  console.log(rpud(alg.toUpperCase(), 30), lpud(t1, 10), lpud(t2, 10))
}

commander.createCommand("test")
  .option('h', 'help', 'Returns Help description')
  .option('a', 'alg', 'Algorith name')
  .option('b', 'buf', 'Buffer size (bytes)', function (v) {
    var _v = +v;
    if (!_v)
      throw new TypeError("Parameter --buf must be Number (min 1024)")
    return _v;
  })
  .option('sign', 'sign', 'Runs speed test for sign and verify PKCS11 functions')
  .option('enc', 'enc', 'encrypt function')
  .option('p', 'pin', 'PIN of slot')
  .option('s', 'slot', 'Returns slot by number')
  .option('it', 'it', 'Sets number of iterations. Default 1', function (v) {
    var res = +v;
    if (!Number.isInteger(res))
      throw new TypeError("Parameter --it must be number");
    if (res <= 0)
      throw new TypeError("Parameter --it must be more then 0");
    return res;
  })
  .option('p', 'pin', 'PIN of slot')
  .on("call", function (cmd) {
    if ("enc" in cmd) {
      if ('help' in cmd) {
        console.log("No help description yet");
      }
      if (!("alg" in cmd))
        cmd.alg = '';
      if (!("buf" in cmd))
        BUF_SIZE = BUF_SIZE_DEFAULT;
      else
        BUF_SIZE = cmd.buf;
      var session = get_session(cmd);
      console.time("Key generation");
      var key = gen_AES(session);
      console.timeEnd("Key generation");
      console.time("Encryption");
      for (var i = 0; i < cmd.it; i++)
        test_encrypt(session, key, {
          name: "AES_CBC_PAD",
          params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
        });
      console.timeEnd("Encryption");
    } else if ("sign" in cmd) {
      if ('help' in cmd) {
        console.log(this._options.sign.description);
        console.log("slot --sign --slot|-s <Number> --pin|-p <String> --it <Numner> --alg|-a <String>");
        console.log("\t--slot|-s <Number> - " + this._options.slot.description);
        console.log("\t--pin|-p <String> - " + this._options.pin.description);
        console.log("\t--it <Number> - " + this._options.it.description);
        console.log("\t--alg|-a <String> - " + this._options.alg.description);
        console.log("\t\tAlgorithms in use:");
        console.log("\t\trsa, rsa-1024, rsa-2048, rsa-4096");
        console.log("");
        console.log("Example:");
        console.log('test --sign --slot 0 --pin "your pin" --it 100 --alg rsa-1024');
        // console.log("");
        // console.log("Output:");
        // console.log("Algorithm                            Sign     Verify");
        // console.log("====================================================");
        // console.log("RSA-1024                            6.7ms      2.7ms");
        return;
      }
      if (!("alg" in cmd))
        cmd.alg = '';
      if (!("buf" in cmd))
        BUF_SIZE = BUF_SIZE_DEFAULT;
      else
        BUF_SIZE = cmd.buf;
      var session = get_session(cmd);
      print_test_sign_header();
      test_sign_rsa(session, cmd, "1024");
      test_sign_rsa(session, cmd, "2048");
      test_sign_rsa(session, cmd, "4096");
    } else if ('help' in cmd) {
      console.log("Starts speed tests for PKCS11 module");
      console.log();
      console.log("Commands:");
      console.log("\tenc - " + this._options.enc.description);
      console.log("\tsign - " + this._options.sign.description);
      return;
    }
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
    console.log();
    console.log("Commands:");
    console.log("\tmodule");
    console.log("\tslot");
    console.log("\thash");
    console.log("\ttest");
    console.log("\texit");
    rl.prompt();
  })

rl.on("line", function (cmd) {
  commander.parse(cmd);
})
rl.prompt();