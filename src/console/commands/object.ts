import * as defs from "./defs";
const {consoleApp, Handle} = defs;

declare let global: any;

/* ==========
   object
   ==========*/
export let cmdObject = defs.commander.createCommand("object", {
    description: "manage objects on the device",
    note: defs.NOTE_SESSION
})
    .on("call", () => {
        cmdObject.help();
    }) as defs.Command;

function print_object_info(obj: defs.Storage) {
    let TEMPLATE = "| %s | %s |";
    let COL_1 = 20;
    let COL_2 = 25;
    console.log(TEMPLATE, defs.rpud("Name", COL_1), defs.rpud("Value", COL_2));
    console.log(TEMPLATE.replace(/\s/g, "-"), defs.rpud("", COL_1, "-"), defs.rpud("", COL_2, "-"));
    console.log(TEMPLATE, defs.rpud("Handle", COL_1), defs.rpud(Handle.toString(obj.handle), COL_2));
    console.log(TEMPLATE, defs.rpud("Class", COL_1), defs.rpud(defs.ObjectClass[obj.class], COL_2));
    console.log(TEMPLATE, defs.rpud("Label", COL_1), defs.rpud(obj.label, COL_2));
    console.log(TEMPLATE, defs.rpud("Token", COL_1), defs.rpud(obj.token, COL_2));
    console.log(TEMPLATE, defs.rpud("Private", COL_1), defs.rpud(obj.private, COL_2));
    console.log(TEMPLATE, defs.rpud("Modifiable", COL_1), defs.rpud(obj.modifiable, COL_2));

    if (obj.class === defs.ObjectClass.PRIVATE_KEY) {
        let o: defs.PrivateKey = obj.toType<defs.PrivateKey>();
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
    } else if (obj.class === defs.ObjectClass.PUBLIC_KEY) {
        let o: defs.PublicKey = obj.toType<defs.PublicKey>();
        console.log(TEMPLATE, defs.rpud("ID", COL_1), defs.rpud(o.id.toString("hex"), COL_2));
        console.log(TEMPLATE, defs.rpud("Mechanism", COL_1), defs.rpud(defs.KeyGenMechanism[o.mechanism], COL_2));
        console.log(TEMPLATE, defs.rpud("Local", COL_1), defs.rpud(o.local, COL_2));
        console.log(TEMPLATE, defs.rpud("Derive", COL_1), defs.rpud(o.derive, COL_2));
        console.log(TEMPLATE, defs.rpud("Encrypt", COL_1), defs.rpud(o.encrypt, COL_2));
        console.log(TEMPLATE, defs.rpud("Verify", COL_1), defs.rpud(o.verify, COL_2));
        console.log(TEMPLATE, defs.rpud("Wrap", COL_1), defs.rpud(o.wrap, COL_2));
    } else if (obj.class === defs.ObjectClass.SECRET_KEY) {
        let o: defs.SecretKey = obj.toType<defs.SecretKey>();
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

function print_object_row(obj: defs.Storage) {
    console.log(
        "| %s | %s | %s |",
        defs.rpud(Handle.toString(obj.handle), 4),
        defs.rpud(defs.ObjectClass[obj.class], 15),
        defs.rpud(obj.label, 30));
}

export let cmdObjectList = cmdObject.createCommand("list", {
    description: "enumerates the objects in a given slot",
    note: defs.NOTE_SESSION,
    example: "> object list"
})
    .option("type", {
        description: "Type of object (key, cert)"
    })
    .on("call", function(cmd: {
        type: string;
    }) {
        defs.check_session();
        let objList = consoleApp.session.find();
        console.log();
        print_object_header();
        for (let i = 0; i < objList.length; i++) {
            let obj = objList.items(i);
            print_object_row(obj.toType<defs.Storage>());
        }
        console.log();
        console.log("%s object(s) in list", objList.length);
        console.log();
    });

export let cmdObjectTest = cmdObject.createCommand("test", {
    description: "generates test objects",
    note: defs.NOTE_SESSION,
    example: "> object test"
})
    .on("call", function(cmd: any) {
        defs.check_session();
        consoleApp.session.generateKeyPair(defs.KeyGenMechanism.RSA, {
            keyType: defs.KeyType.RSA,
            encrypt: true,
            modulusBits: 1024,
            publicExponent: new Buffer([3]),
            label: "test RSA key"
        },
            {
                keyType: defs.KeyType.RSA,
                decrypt: true,
                label: "test RSA key"
            });
    });

export let cmdObjectDelete = cmdObject.createCommand("delete", {
    description: "delete an object from a slot",
    note: defs.NOTE_SESSION,
    example: "Removes Object from Slot by object's ID 1\n      > object delete --obj 1"
})
    .option("obj", {
        description: "Identificator of object",
        isRequired: true
    })
    .on("call", function(cmd: {
        obj: string;
    }) {
        defs.check_session();
        if (cmd.obj === "all") {
            global["readline"].question("Do you really want to remove ALL objects (Y/N)?", (answer: string) => {
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
            let obj = consoleApp.session.getObject<defs.Storage>(Handle.toBuffer(cmd.obj));
            if (!obj)
                throw new Error(`Object by ID '${cmd.obj}' is not found`);
            defs.print_caption(`Object info`);
            print_object_info(obj);
            console.log();
            global["readline"].question("Do you really want to remove this object (Y/N)?", (answer: string) => {
                if (answer && answer.toLowerCase() === "y") {
                    consoleApp.session.destroy(obj!);
                    console.log();
                    console.log("Object was successfully removed");
                    console.log();
                }
                global["readline"].prompt();
            });
        }
    });

export let cmdObjectInfo = cmdObject.createCommand("info", {
    description: "returns information about a object",
    note: defs.NOTE_SESSION,
    example: "Return info about Object of Slot by ID 1\n      > object info --obj 1"
})
    .option("obj", {
        description: "Identificator of object",
        isRequired: true
    })
    .on("call", function(cmd: {
        obj: string;
    }) {
        defs.check_session();
        let obj = consoleApp.session.getObject<defs.Storage>(Handle.toBuffer(cmd.obj));
        if (!obj)
            throw new Error(`Object by ID '${cmd.obj}' is not found`);
        console.log();
        print_object_info(obj);
        console.log();
    });