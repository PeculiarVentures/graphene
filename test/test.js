"use strict"
// Manual test

var config = require('../test/config');
var pkcs11 = require('../lib');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;
var RSA = pkcs11.RSA;

const PKCS11_LOG = "pkcs11.log";
const PKCS11_DEBUG = false;

let lib = config.lib;
if (PKCS11_DEBUG) {
	var fs = require('fs');
	if (fs.existsSync(PKCS11_LOG))
		fs.unlinkSync(PKCS11_LOG);
    process.env['PKCS11_LOGGER_LIBRARY_PATH'] = lib;
    process.env['PKCS11_LOGGER_LOG_FILE_PATH'] = PKCS11_LOG;
    process.env['PKCS11_LOGGER_FLAGS'] = 0;
	lib = "../../pkcs11-logger-x64.dll";
}

var mod = Module.load(lib, config.libName);
mod.initialize();
var slots = mod.getSlots();
var slot = slots[0];
if (!slot.isInitialized()) {
    throw new Error("PKCS11 module is not initialized");
}
var session = slot.session;
session.start(2 | 4);
session.login(config.pin);

/*
var objects = session.findObjects();

console.info("Find RSA public key");
var pkey;
for (var i in objects){
    var obj = objects[i];
    
    //console.log("%d -", +i+1, Enums.ObjectClass.getText(obj.getClass()));
    if (obj.getClass() === Enums.ObjectClass.PrivateKey){
        var key = obj.toType(Enums.ObjectClass.PrivateKey);
        if (key.getType() == Enums.KeyType.RSA && key.isExtractable()){
            console.log("Mechanism:", key.getLabel());
            console.log("index:", i);
            pkey = key;
            break;
        }
    }
}
*/
function generateRsa() {
    var gen_props = {
        publicKey: {
            "class": Enums.ObjectClass.PublicKey,
            "keyType": Enums.KeyType.RSA,
            "label": "My label",
            "token": false,
            "verify": true,
            "encrypt": true,
            "wrap": true,
            "derive": true,
            "modulusBits": 1024,
            "publicExp": new Buffer([1, 0, 1])
        },
        privateKey: {
            "class": Enums.ObjectClass.PrivateKey,
            "keyType": Enums.KeyType.RSA,
            "private": true,
            "sensitive": false,
            "label": "My label",
            "token": false,
            "sign": true,
            "decrypt": true,
            "unwrap": true,
            "derive": true,
            "extractable": true
        }
    };

    var keypair = session.generateKeyPair("RSA_PKCS_KEY_PAIR_GEN", gen_props.publicKey, gen_props.privateKey);
    return keypair;
}

function generateEc() {
    var gen_props = {
        publicKey: {
            "class": Enums.ObjectClass.PublicKey,
            "keyType": Enums.KeyType.EC,
            "label": "My label",
            "token": false,
            "verify": true,
            "encrypt": true,
            "wrap": true,
            "derive": true,
            "paramsEC": new Buffer("06082A8648CE3D030107", "hex")
        },
        privateKey: {
            "class": Enums.ObjectClass.PrivateKey,
            "keyType": Enums.KeyType.EC,
            "private": true,
            "sensitive": false,
            "label": "My label",
            "token": false,
            "sign": true,
            "decrypt": true,
            "unwrap": true,
            "derive": true,
            "extractable": true
        }
    };

    var keypair = session.generateKeyPair("ECDSA_KEY_PAIR_GEN", gen_props.publicKey, gen_props.privateKey);
    return keypair;
}

function generateAes() {
    var gen_props = {
        "class": Enums.ObjectClass.SecretKey,
        "keyType": Enums.KeyType.AES,
        "id": new Buffer("NewId"),
        "sensitive": false,
        "label": "My label",
        "token": false,
        "extractable": true,
        "encrypt": true,
        "decrypt": true,
        "sign": true,
        "verify": true,
        "wrap": true,
        "unwrap": true,
        "valueLen": 256 / 8
    };

    var key = session.generateKey("AES_KEY_GEN", gen_props);
    return key;
}

console.log(mod.getInfo());

var key = generateAes();
var pkey = key.toType(Enums.ObjectClass.SecretKey);


console.log("local:", pkey.isLocal());
console.log("extractable:", pkey.isExtractable());
console.log("sensitive:", pkey.isSensitive());

console.log(session.export(key, "secret", ["sign"]));