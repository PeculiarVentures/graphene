"use strict";
var defs = require("./defs");
var consoleApp = defs.consoleApp, Handle = defs.Handle;
exports.cmdObject = defs.commander.createCommand("object", {
    description: "manage objects on the device",
    note: defs.NOTE_SESSION
})
    .on("call", function () {
    exports.cmdObject.help();
});
function print_object_info(obj) {
    var TEMPLATE = "| %s | %s |";
    var COL_1 = 20;
    var COL_2 = 25;
    console.log(TEMPLATE, defs.rpud("Name", COL_1), defs.rpud("Value", COL_2));
    console.log(TEMPLATE.replace(/\s/g, "-"), defs.rpud("", COL_1, "-"), defs.rpud("", COL_2, "-"));
    console.log(TEMPLATE, defs.rpud("Handle", COL_1), defs.rpud(Handle.toString(obj.handle), COL_2));
    console.log(TEMPLATE, defs.rpud("Class", COL_1), defs.rpud(defs.ObjectClass[obj.class], COL_2));
    console.log(TEMPLATE, defs.rpud("Label", COL_1), defs.rpud(obj.label, COL_2));
    console.log(TEMPLATE, defs.rpud("Token", COL_1), defs.rpud(obj.token, COL_2));
    console.log(TEMPLATE, defs.rpud("Private", COL_1), defs.rpud(obj.private, COL_2));
    console.log(TEMPLATE, defs.rpud("Modifiable", COL_1), defs.rpud(obj.modifiable, COL_2));
    if (obj.class === defs.ObjectClass.PRIVATE_KEY) {
        var o = obj.toType();
        console.log(TEMPLATE, defs.rpud("ID", COL_1), defs.rpud(o.id.toString("hex"), COL_2));
        console.log(TEMPLATE, defs.rpud("Mechanism", COL_1), defs.rpud(defs.KeyGenMechanism[o.mechanism], COL_2));
        console.log(TEMPLATE, defs.rpud("Local", COL_1), defs.rpud(o.local, COL_2));
        console.log(TEMPLATE, defs.rpud("Sensitive", COL_1), defs.rpud(o.sensitive, COL_2));
        console.log(TEMPLATE, defs.rpud("Extractable", COL_1), defs.rpud(o.extractable, COL_2));
        console.log(TEMPLATE, defs.rpud("Derive", COL_1), defs.rpud(o.derive, COL_2));
        console.log(TEMPLATE, defs.rpud("Decrypt", COL_1), defs.rpud(o.decrypt, COL_2));
        console.log(TEMPLATE, defs.rpud("Sign", COL_1), defs.rpud(o.sign, COL_2));
        console.log(TEMPLATE, defs.rpud("Sign recover", COL_1), defs.rpud(o.signRecover, COL_2));
        console.log(TEMPLATE, defs.rpud("Unwrap", COL_1), defs.rpud(o.unwrap, COL_2));
    }
    else if (obj.class === defs.ObjectClass.PUBLIC_KEY) {
        var o = obj.toType();
        console.log(TEMPLATE, defs.rpud("ID", COL_1), defs.rpud(o.id.toString("hex"), COL_2));
        console.log(TEMPLATE, defs.rpud("Mechanism", COL_1), defs.rpud(defs.KeyGenMechanism[o.mechanism], COL_2));
        console.log(TEMPLATE, defs.rpud("Local", COL_1), defs.rpud(o.local, COL_2));
        console.log(TEMPLATE, defs.rpud("Derive", COL_1), defs.rpud(o.derive, COL_2));
        console.log(TEMPLATE, defs.rpud("Encrypt", COL_1), defs.rpud(o.encrypt, COL_2));
        console.log(TEMPLATE, defs.rpud("Verify", COL_1), defs.rpud(o.verify, COL_2));
        console.log(TEMPLATE, defs.rpud("Wrap", COL_1), defs.rpud(o.wrap, COL_2));
    }
    else if (obj.class === defs.ObjectClass.SECRET_KEY) {
        var o = obj.toType();
        console.log(TEMPLATE, defs.rpud("ID", COL_1), defs.rpud(o.id.toString("hex"), COL_2));
        console.log(TEMPLATE, defs.rpud("Mechanism", COL_1), defs.rpud(defs.KeyGenMechanism[o.mechanism], COL_2));
        console.log(TEMPLATE, defs.rpud("Local", COL_1), defs.rpud(o.local, COL_2));
        console.log(TEMPLATE, defs.rpud("Sensitive", COL_1), defs.rpud(o.sensitive, COL_2));
        console.log(TEMPLATE, defs.rpud("Extractable", COL_1), defs.rpud(o.extractable, COL_2));
        console.log(TEMPLATE, defs.rpud("Derive", COL_1), defs.rpud(o.derive, COL_2));
        console.log(TEMPLATE, defs.rpud("Encrypt", COL_1), defs.rpud(o.encrypt, COL_2));
        console.log(TEMPLATE, defs.rpud("Decrypt", COL_1), defs.rpud(o.decrypt, COL_2));
        console.log(TEMPLATE, defs.rpud("Sign", COL_1), defs.rpud(o.sign, COL_2));
        console.log(TEMPLATE, defs.rpud("Verify", COL_1), defs.rpud(o.verify, COL_2));
        console.log(TEMPLATE, defs.rpud("Unwrap", COL_1), defs.rpud(o.unwrap, COL_2));
        console.log(TEMPLATE, defs.rpud("Wrap", COL_1), defs.rpud(o.wrap, COL_2));
    }
}
function print_object_header() {
    console.log("| %s | %s | %s |", defs.rpud("ID", 4), defs.rpud("Class", 15), defs.rpud("Label", 30));
    console.log("|%s|%s|%s|", defs.rpud("", 6, "-"), defs.rpud("", 17, "-"), defs.rpud("", 32, "-"));
}
function print_object_row(obj) {
    console.log("| %s | %s | %s |", defs.rpud(Handle.toString(obj.handle), 4), defs.rpud(defs.ObjectClass[obj.class], 15), defs.rpud(obj.label, 30));
}
exports.cmdObjectList = exports.cmdObject.createCommand("list", {
    description: "enumerates the objects in a given slot",
    note: defs.NOTE_SESSION,
    example: "> object list"
})
    .option("type", {
    description: "Type of object (key, cert)"
})
    .on("call", function (cmd) {
    defs.check_session();
    var objList = consoleApp.session.find();
    console.log();
    print_object_header();
    for (var i = 0; i < objList.length; i++) {
        var obj = objList.items(i);
        print_object_row(obj.toType());
    }
    console.log();
    console.log("%s object(s) in list", objList.length);
    console.log();
});
exports.cmdObjectTest = exports.cmdObject.createCommand("test", {
    description: "generates test objects",
    note: defs.NOTE_SESSION,
    example: "> object test"
})
    .on("call", function (cmd) {
    defs.check_session();
    consoleApp.session.generateKeyPair(defs.KeyGenMechanism.RSA, {
        keyType: defs.KeyType.RSA,
        encrypt: true,
        modulusBits: 1024,
        publicExponent: new Buffer([3]),
        label: "test RSA key"
    }, {
        keyType: defs.KeyType.RSA,
        decrypt: true,
        label: "test RSA key"
    });
});
exports.cmdObjectDelete = exports.cmdObject.createCommand("delete", {
    description: "delete an object from a slot",
    note: defs.NOTE_SESSION,
    example: "Removes Object from Slot by object's ID 1\n      > object delete --obj 1"
})
    .option("obj", {
    description: "Identificator of object",
    isRequired: true
})
    .on("call", function (cmd) {
    defs.check_session();
    if (cmd.obj === "all") {
        global["readline"].question("Do you really want to remove ALL objects (Y/N)?", function (answer) {
            if (answer && answer.toLowerCase() === "y") {
                consoleApp.session.destroy();
                console.log();
                console.log("All Objects were successfully removed");
                console.log();
            }
            global["readline"].prompt();
        });
    }
    else {
        var obj_1 = consoleApp.session.getObject(Handle.toBuffer(cmd.obj));
        if (!obj_1)
            throw new Error("Object by ID '" + cmd.obj + "' is not found");
        defs.print_caption("Object info");
        print_object_info(obj_1);
        console.log();
        global["readline"].question("Do you really want to remove this object (Y/N)?", function (answer) {
            if (answer && answer.toLowerCase() === "y") {
                consoleApp.session.destroy(obj_1);
                console.log();
                console.log("Object was successfully removed");
                console.log();
            }
            global["readline"].prompt();
        });
    }
});
exports.cmdObjectInfo = exports.cmdObject.createCommand("info", {
    description: "returns information about a object",
    note: defs.NOTE_SESSION,
    example: "Return info about Object of Slot by ID 1\n      > object info --obj 1"
})
    .option("obj", {
    description: "Identificator of object",
    isRequired: true
})
    .on("call", function (cmd) {
    defs.check_session();
    var obj = consoleApp.session.getObject(Handle.toBuffer(cmd.obj));
    if (!obj)
        throw new Error("Object by ID '" + cmd.obj + "' is not found");
    console.log();
    print_object_info(obj);
    console.log();
});
