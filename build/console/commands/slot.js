var defs = require("./defs");
var consoleApp = defs.consoleApp;
function print_slot(slot) {
    defs.print_module_info(consoleApp.module);
}
exports.cmdSlot = defs.commander.createCommand("slot", {
    description: "open a session to a slot and work with its contents",
    note: defs.NOTE
})
    .on("call", function () {
    this.help();
});
exports.cmdSlotList = exports.cmdSlot.createCommand("list", {
    description: "enumerates the available slots",
    note: defs.NOTE
})
    .on("call", function () {
    defs.get_slot_list();
    defs.print_caption("Slot list");
    console.log("Slot count:", consoleApp.slots.length);
    console.log();
    for (var i = 0; i < consoleApp.slots.length; i++) {
        var slot = consoleApp.slots.items(i);
        print_slot(slot);
    }
});
function print_alg_info(slot, algName) {
    var algList = slot.getMechanisms();
    var alg = null;
    for (var i = 0; i < algList.length; i++) {
        var item = algList.items(i);
        if (item.name === algName) {
            alg = item;
            break;
        }
    }
    if (!alg)
        throw new Error("Unsupported algorithm in use");
    var PADDING_1 = 25;
    defs.print_caption("Algorithm info");
    console.log("  %s%s", defs.rpud("Name:", PADDING_1), alg.name);
    console.log("  %s%s", defs.rpud("Min key size:", PADDING_1), alg.minKeySize);
    console.log("  %s%s", defs.rpud("Max key size:", PADDING_1), alg.maxKeySize);
    console.log("  %s%s", defs.rpud("Is hardware:", PADDING_1), !!(alg.flags & defs.MechanismFlag.HW));
    console.log("  %s%s", defs.rpud("Is encrypt:", PADDING_1), !!(alg.flags & defs.MechanismFlag.ENCRYPT));
    console.log("  %s%s", defs.rpud("Is decrypt:", PADDING_1), !!(alg.flags & defs.MechanismFlag.DECRYPT));
    console.log("  %s%s", defs.rpud("Is digest:", PADDING_1), !!(alg.flags & defs.MechanismFlag.DIGEST));
    console.log("  %s%s", defs.rpud("Is sign:", PADDING_1), !!(alg.flags & defs.MechanismFlag.SIGN));
    console.log("  %s%s", defs.rpud("Is sign recover:", PADDING_1), !!(alg.flags & defs.MechanismFlag.SIGN_RECOVER));
    console.log("  %s%s", defs.rpud("Is verify:", PADDING_1), !!(alg.flags & defs.MechanismFlag.VERIFY));
    console.log("  %s%s", defs.rpud("Is verify recover:", PADDING_1), !!(alg.flags & defs.MechanismFlag.VERIFY_RECOVER));
    console.log("  %s%s", defs.rpud("Is generate key:", PADDING_1), !!(alg.flags & defs.MechanismFlag.GENERATE));
    console.log("  %s%s", defs.rpud("Is generate key pair:", PADDING_1), !!(alg.flags & defs.MechanismFlag.GENERATE_KEY_PAIR));
    console.log("  %s%s", defs.rpud("Is wrap key:", PADDING_1), !!(alg.flags & defs.MechanismFlag.WRAP));
    console.log("  %s%s", defs.rpud("Is unwrap key:", PADDING_1), !!(alg.flags & defs.MechanismFlag.UNWRAP));
    console.log("  %s%s", defs.rpud("Is derive key:", PADDING_1), !!(alg.flags & defs.MechanismFlag.DERIVE));
    console.log();
}
exports.cmdSlotInfo = exports.cmdSlot.createCommand("info", {
    description: "returns information about a specific slot",
    note: defs.NOTE,
    example: "Returns an info about slot" + "\n\n" +
        "      > slot info -s 0\n\n" +
        "    Returns an info about algorithm of selected slot" + "\n\n" +
        "      > slot info -s 0 -a SHA1"
})
    .option("slot", defs.options.slot)
    .option("alg", {
    description: "Algorithm name",
})
    .on("call", function (cmd) {
    if (cmd.alg) {
        if (defs.MechanismEnum[cmd.alg] !== undefined) {
            print_alg_info(cmd.slot, cmd.alg);
        }
        else
            throw new Error("Unknown Algorithm name in use");
    }
    else {
        print_slot(cmd.slot);
    }
});
function print_slot_algs_header() {
    var TEMPLATE = "| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s |";
    console.log(TEMPLATE, defs.rpud("Algorithm name", 25), "h", "s", "v", "e", "d", "w", "u", "g", "D");
    console.log(TEMPLATE.replace(/\s/g, "-"), defs.rpud("", 25, "-"), "-", "-", "-", "-", "-", "-", "-", "-", "-");
}
function print_slot_algs_row(alg) {
    var TEMPLATE = "| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s |";
    console.log(TEMPLATE, defs.rpud(alg.name, 25), defs.print_bool(alg.flags & defs.MechanismFlag.DIGEST), defs.print_bool(alg.flags & defs.MechanismFlag.SIGN), defs.print_bool(alg.flags & defs.MechanismFlag.VERIFY), defs.print_bool(alg.flags & defs.MechanismFlag.ENCRYPT), defs.print_bool(alg.flags & defs.MechanismFlag.DECRYPT), defs.print_bool(alg.flags & defs.MechanismFlag.WRAP), defs.print_bool(alg.flags & defs.MechanismFlag.UNWRAP), defs.print_bool((alg.flags & defs.MechanismFlag.GENERATE) || (alg.flags & defs.MechanismFlag.GENERATE_KEY_PAIR)), defs.print_bool(alg.flags & defs.MechanismFlag.DERIVE));
}
exports.cmdSlotCiphers = exports.cmdSlot.createCommand("algs", {
    description: "enumerates the supported algorithms",
    note: defs.NOTE,
    example: "Returns a list of mechanisms which can be used with C_DigestInit, C_SignInit\n  and C_VerifyInit" + "\n\n" +
        "  > slot algs -s 0 -f hsv"
})
    .option("slot", defs.options.slot)
    .option("flags", {
    description: "Optional. Flags specifying mechanism capabilities. Default is 'a'" + "\n" +
        "    a - all mechanisms in PKCS11" + "\n" +
        "    h - mechanism can be used with C_DigestInit" + "\n" +
        "    s - mechanism can be used with C_SignInit" + "\n" +
        "    v - mechanism can be used with C_VerifyInit" + "\n" +
        "    e - mechanism can be used with C_EncryptInit" + "\n" +
        "    d - mechanism can be used with C_DecryptInit" + "\n" +
        "    w - mechanism can be used with C_WrapKey" + "\n" +
        "    u - mechanism can be used with C_UnwrapKey" + "\n" +
        "    g - mechanism can be used with C_GenerateKey or C_GenerateKeyPair" + "\n" +
        "    D - mechanism can be used with C_DeriveKey",
    value: "a"
})
    .on("call", function (cmd) {
    var lAlg = cmd.slot.getMechanisms();
    console.log();
    print_slot_algs_header();
    for (var i = 0; i < lAlg.length; i++) {
        var alg = lAlg.items(i);
        var f = cmd.flags;
        var d = false;
        if (!d && f.indexOf("a") >= 0)
            d = true;
        if (!d && f.indexOf("h") >= 0 && alg.flags & defs.MechanismFlag.DIGEST)
            d = true;
        if (!d && f.indexOf("s") >= 0 && alg.flags & defs.MechanismFlag.SIGN)
            d = true;
        if (!d && f.indexOf("v") >= 0 && alg.flags & defs.MechanismFlag.VERIFY)
            d = true;
        if (!d && f.indexOf("e") >= 0 && alg.flags & defs.MechanismFlag.ENCRYPT)
            d = true;
        if (!d && f.indexOf("d") >= 0 && alg.flags & defs.MechanismFlag.DECRYPT)
            d = true;
        if (!d && f.indexOf("w") >= 0 && alg.flags & defs.MechanismFlag.WRAP)
            d = true;
        if (!d && f.indexOf("u") >= 0 && alg.flags & defs.MechanismFlag.UNWRAP)
            d = true;
        if (!d && f.indexOf("g") >= 0 && (alg.flags & defs.MechanismFlag.GENERATE || alg.flags & defs.MechanismFlag.GENERATE_KEY_PAIR))
            d = true;
        if (!d)
            continue;
        print_slot_algs_row(alg);
    }
    console.log();
    console.log("%s algorithm(s) in list", lAlg.length);
    console.log();
});
exports.cmdSlotOpen = exports.cmdSlot.createCommand("open", {
    description: "open a session to a slot",
    note: defs.NOTE
})
    .option("slot", defs.options.slot)
    .option("pin", defs.options.pin)
    .on("call", function (cmd) {
    if (consoleApp.session) {
        consoleApp.session.logout();
        consoleApp.session.close();
    }
    consoleApp.session = cmd.slot.open();
    consoleApp.session.login(cmd.pin);
    console.log();
    console.log("Session is started");
    console.log();
});
exports.cmdSlotStop = exports.cmdSlot.createCommand("stop", {
    description: "close the open session",
    note: defs.NOTE
})
    .on("call", function () {
    if (consoleApp.session) {
        consoleApp.session.logout();
        consoleApp.session.close();
    }
    consoleApp.session = null;
    console.log();
    console.log("Session is stopped");
    console.log();
});
