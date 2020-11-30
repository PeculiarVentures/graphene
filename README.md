# Graphene

[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/PeculiarVentures/graphene/master/LICENSE)
![test](https://github.com/PeculiarVentures/graphene/workflows/test/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/PeculiarVentures/graphene/badge.svg?branch=master)](https://coveralls.io/github/PeculiarVentures/graphene?branch=master)
[![npm version](https://badge.fury.io/js/graphene-pk11.svg)](https://badge.fury.io/js/graphene-pk11)

[![NPM](https://nodei.co/npm/graphene-pk11.png)](https://nodei.co/npm/graphene-pk11/)

A simple layer for interacting with PKCS #11 / PKCS11 / CryptoKI for Node in TypeScript

PKCS #11 (also known as CryptoKI or PKCS11) is the standard interface for interacting with hardware crypto devices such as Smart Cards and Hardware Security Modules (HSMs). It wraps the library closely, but uses attempts to look like 'node.crypto' where it makes sense. 

It has been tested with :
- [SoftHSM2](https://www.opendnssec.org/softhsm/)
- [Thales nShield Solo+](https://www.thales-esecurity.com/products-and-services/products-and-services/hardware-security-modules/general-purpose-hsms/nshield-solo)
- [Safenet Luna HSMs](http://www.safenet-inc.com/)
- [RuToken](http://www.rutoken.ru/)


We have also created a basic [CLI](https://github.com/PeculiarVentures/graphene-cli) for interacting with PKCS#11 devices based on this library we call [graphene-cli](https://github.com/PeculiarVentures/graphene-cli).

**NOTE:** For testing purposes it may be easier to work with SoftHSM2 which is a software implementation of PKCS#11 based on OpenSSL or Botan.

```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var mod = Module.load("/usr/local/lib/softhsm/libsofthsm2.so", "SoftHSM");

mod.initialize();

var session = mod.getSlots(0).open();
session.login("password");

// Get a number of private key objects on token
console.log(session.find({class: graphene.ObjectClass.PRIVATE_KEY}).length);

session.logout();
mod.finalize();
```

## Installation

```
$ npm install graphene-pk11
```

## Documentation

[https://peculiarventures.github.io/graphene/](https://peculiarventures.github.io/graphene/)

## Using the Package

Install the package
```
$ npm install graphene-pk11 --save
```

Install TypeScript definition using [TSD](https://www.npmjs.com/package/tsd) package manager
```
$ tsd install graphene-pk11 --save
```

Load module
```javascript
// file.js
var graphene = require("graphene-pk11");
```

### Install SoftHSM2

- For OSX see the [instructions here](https://github.com/opendnssec/SoftHSMv2/blob/develop/OSX-NOTES.md)
- For linux [instructions here](https://github.com/opendnssec/SoftHSMv2/blob/develop/README.md)


## Examples
### Listing capabilities
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;
var lib = "/usr/local/lib/softhsm/libsofthsm2.so";
var mod = Module.load(lib, "SoftHSM");
mod.initialize();
// get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
    for (var i = 0; i < slots.length; i++) {
        var slot = slots.items(i);
        console.log("Slot #" + slot.handle);
        console.log("\tDescription:", slot.slotDescription);
        console.log("\tSerial:", slot.getToken().serialNumber);
        console.log("\tPassword(min/max): %d/%d", slot.getToken().minPinLen, slot.getToken().maxPinLen);
        console.log("\tIs hardware:", !!(slot.flags & graphene.SlotFlag.HW_SLOT));
        console.log("\tIs removable:", !!(slot.flags & graphene.SlotFlag.REMOVABLE_DEVICE));
        console.log("\tIs initialized:", !!(slot.flags & graphene.SlotFlag.TOKEN_PRESENT));
        console.log("\n\nMechanisms:");
        console.log("Name                       h/s/v/e/d/w/u");
        console.log("========================================");
        function b(v) {
            return v ? "+" : "-";
        }

        function s(v) {
            v = v.toString();
            for (var i_1 = v.length; i_1 < 27; i_1++) {
                v += " ";
            }
            return v;
        }

        var mechs = slot.getMechanisms();
        for (var j = 0; j < mechs.length; j++) {
            var mech = mechs.items(j);
            console.log(s(mech.name) +
                b(mech.flags & graphene.MechanismFlag.DIGEST) + "/" +
                b(mech.flags & graphene.MechanismFlag.SIGN) + "/" +
                b(mech.flags & graphene.MechanismFlag.VERIFY) + "/" +
                b(mech.flags & graphene.MechanismFlag.ENCRYPT) + "/" +
                b(mech.flags & graphene.MechanismFlag.DECRYPT) + "/" +
                b(mech.flags & graphene.MechanismFlag.WRAP) + "/" +
                b(mech.flags & graphene.MechanismFlag.UNWRAP));
        }
    }
}
mod.finalize();
```

####Output
```
Slot #0
	Description: SoftHSM slot 0
	Serial: f89e34b310e83df2
	Password(min/max): 4/255
	Is hardware: false
	Is removable: false
	Is initialized: true
Mechanisms:
Name                       h/s/v/e/d/w/u
========================================
MD5                        +/-/-/-/-/-/-
SHA_1                      +/-/-/-/-/-/-
SHA224                     +/-/-/-/-/-/-
SHA256                     +/-/-/-/-/-/-
SHA384                     +/-/-/-/-/-/-
SHA512                     +/-/-/-/-/-/-
MD5_HMAC                   -/+/+/-/-/-/-
SHA_1_HMAC                 -/+/+/-/-/-/-
SHA224_HMAC                -/+/+/-/-/-/-
SHA256_HMAC                -/+/+/-/-/-/-
SHA384_HMAC                -/+/+/-/-/-/-
SHA512_HMAC                -/+/+/-/-/-/-
RSA_PKCS_KEY_PAIR_GEN      -/-/-/-/-/-/-
RSA_PKCS                   -/+/+/+/+/+/+
RSA_X_509                  -/+/+/+/+/-/-
MD5_RSA_PKCS               -/+/+/-/-/-/-
SHA1_RSA_PKCS              -/+/+/-/-/-/-
RSA_PKCS_OAEP              -/-/-/+/+/+/+
```

### Hashing
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    var digest = session.createDigest("sha1");
    digest.update("simple text 1");
    digest.update("simple text 2");
    var hash = digest.final();
    console.log("Hash SHA1:", hash.toString("hex")); // Hash SHA1: e1dc1e52e9779cd69679b3e0af87d2e288190d34 
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();
```
### Generating keys
#### AES
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");
    
    var k = session.generateKey(graphene.KeyGenMechanism.AES, {
        "class": graphene.ObjectClass.SECRET_KEY,
        "token": false,
        "valueLen": 256 / 8,
        "keyType": graphene.KeyType.AES,
        "label": "My AES secret key",
        "private": true
    });
    
    console.log("Key.handle:", k.handle);                 // Key.handle: 2
    console.log("Key.type:", graphene.KeyType[k.type]);   // Key.type: AES
    
    session.logout();
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();
```

#### ECC
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");
    
    // generate ECDSA key pair
    var keys = session.generateKeyPair(graphene.KeyGenMechanism.ECDSA, {
        keyType: graphene.KeyType.ECDSA,
        token: false,
        verify: true,
        paramsECDSA: graphene.NamedCurve.getByName("secp192r1").value
    }, {
        keyType: graphene.KeyType.ECDSA,
        token: false,
        sign: true
    });
    console.log("Key type:", graphene.KeyType[keys.privateKey.type]);            // Key type: ECDSA
    console.log("Object's class:", graphene.ObjectClass[keys.privateKey.class]); // Object's class: PRIVATE_KEY 
    
    session.logout();
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();
```

### Exporting public key
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");
    
    // generate RSA key pair
    var keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
        keyType: graphene.KeyType.RSA,
        modulusBits: 1024,
        publicExponent: Buffer.from([3]),
        token: false,
        verify: true,
        encrypt: true,
        wrap: true
    }, {
        keyType: graphene.KeyType.RSA,
        token: false,
        sign: true,
        decrypt: true,
        unwrap: true
    });
    
    // get public key attributes
    var pubKey = keys.publicKey.getAttribute({
        modulus: null,
        publicExponent: null
    });
    
    // convert values to base64
    pubKey.modulus = pubKey.modulus.toString("base64");
    pubKey.publicExponent = pubKey.publicExponent.toString("base64");
    
    
    console.log(JSON.stringify(pubKey, null, 4));
    
    session.logout();
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();

/*
  Result
  ------------------
  
  {
      "modulus": "21HTpGsKn3lQh4fqhYkZ/NprzKZqCnUIs0Ekbg8Y0M0Er4yJ4tKVFLlaxUkym6nRBQuS2tzwSQcvuKVUNeK3k6AiPitlQs5CRc8csqL6BYMU+rme3L0w/d+1OryH/pMrDGOmkWXTrzBWoRgulXHX92jK6CcXKBeS/yUSgCLP/MM=",
      "publicExponent": "Aw=="
  }

*/
``` 

### Signing / Verifying
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");
    
    // generate RSA key pair
    var keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
        keyType: graphene.KeyType.RSA,
        modulusBits: 1024,
        publicExponent: Buffer.from([3]),
        token: false,
        verify: true,
        encrypt: true,
        wrap: true
    }, {
        keyType: graphene.KeyType.RSA,
        token: false,
        sign: true,
        decrypt: true,
        unwrap: true
    });
    
    // sign content
    var sign = session.createSign("SHA1_RSA_PKCS", keys.privateKey);
    sign.update("simple text 1");
    sign.update("simple text 2");
    var signature = sign.final();
    console.log("Signature RSA-SHA1:", signature.toString("hex")); // Signature RSA-SHA1: 6102a66dc0d97fadb5...
    
    // verify content
    var verify = session.createVerify("SHA1_RSA_PKCS", keys.publicKey);
    verify.update("simple text 1");
    verify.update("simple text 2");
    var verify_result = verify.final(signature);
    console.log("Signature RSA-SHA1 verify:", verify_result);      // Signature RSA-SHA1 verify: true
    
    session.logout();
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();
```
### Encrypting / Decrypting
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");

    // generate AES key
    var key = session.generateKey(graphene.KeyGenMechanism.AES, {
        "class": graphene.ObjectClass.SECRET_KEY,
        "token": false,
        "valueLen": 256 / 8,
        "keyType": graphene.KeyType.AES,
        "label": "My AES secret key",
        "encrypt": true,
        "decrypt": true
    });
    
    // enc algorithm
    var alg = {
        name: "AES_CBC_PAD",
        params: Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6]) // IV
    };
    var MESSAGE = "Encrypted message";
    
    // encrypting
    var cipher = session.createCipher(alg, key);
    var enc = cipher.update(MESSAGE);
    enc = Buffer.concat([enc, cipher.final()]);
    console.log("Enc:", enc.toString("hex"));           // Enc: eb21e15b896f728a4...
    
    // decrypting
    var decipher = session.createDecipher(alg, key);
    var dec = decipher.update(enc);
    var msg = Buffer.concat([dec, decipher.final()]).toString();
    console.log("Message:", msg.toString());            // Message: Encrypted message
    
    session.logout();
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();
```

### Derive key
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");

    // generate EC key
    var keys = session.generateKeyPair(graphene.KeyGenMechanism.ECDSA, {
        keyType: graphene.KeyType.ECDSA,
        token: false,
        derive: true,
        paramsECDSA: graphene.NamedCurve.getByName("secp192r1").value
    }, {
        keyType: graphene.KeyType.ECDSA,
        token: false,
        derive: true
    });
    
    // derive algorithm
    var alg = {
        name: "ECDH1_DERIVE",
        params: new graphene.EcdhParams(
            graphene.EcKdf.SHA1,
            null,
            keys.publicKey.getAttribute({pointEC: null}).pointEC)
        };
    
    // Template for derived key
    var template = {
        "class": graphene.ObjectClass.SECRET_KEY,
        "token": false,
        "keyType": graphene.KeyType.AES,
        "valueLen": 256 / 8,
        "encrypt": true,
        "decrypt": true
    }
    
    // Key derivation
    var dKey = session.deriveKey(alg, keys.privateKey, template)
    console.log("Derived key handle:", dKey.handle);
    
    session.logout();
    session.close();
}
else {
    console.error("Slot is not initialized");
}

mod.finalize();
```
### Change User's PIN
```javascript
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

try {
    var slot = mod.getSlots(0);
    if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
        var session = slot.open();
        session.login("12345", graphene.UserType.USER);
        session.setPin("12345", "new pin");
        session.logout();
        session.close();
        console.log("User's PIN was changed successfully");
    }
}
catch(e) {
    console.error(e);
}
mod.finalize();
```

### Adding x509 certificate

```javascript
const graphene = require("graphene-pk11");

const mod = graphene.Module.load("/usr/local/lib/softhsm/libsofthsm2.so", "SoftHSM");

mod.initialize();

try {
    const slot = mod.getSlots(0);
    const session = slot.open(2 | 4)
    session.login("password");

    const template = {
        class: graphene.ObjectClass.CERTIFICATE,
        certType: graphene.CertificateType.X_509,
        private: false,
        token: false,
        id: Buffer.from([1, 2, 3, 4, 5]), // Should be the same as Private/Public key has
        label: "My certificate",
        subject: Buffer.from("3034310B300906035504...", "hex"),
        value: Buffer.from("308203A830820290A003...", "hex"),
    };

    const objCert = session.create(template).toType();

    console.log("Certificate: created\n");
    console.log("Certificate info:\n===========================");
    console.log("Handle:", objCert.handle.toString("hex"));
    console.log("ID:", objCert.id.toString("hex"));
    console.log("Label:", objCert.label);
    console.log("category:", graphene.CertificateCategory[objCert.category]);
    console.log("Subject:", objCert.subject.toString("hex"));
    console.log("Value:", objCert.value.toString("hex"));
} catch (err) {
    console.error(err);
}

mod.finalize();
```

### Initializing NSS crypto library

Use `options` parameter for `Module::initialize` method.

__Type__
```ts
interface InitializationOptions {
    /**
     * NSS library parameters
     */
    libraryParameters?: string;
    /**
     * bit flags specifying options for `C_Initialize`
     * - CKF_LIBRARY_CANT_CREATE_OS_THREADS. True if application threads which are executing calls to the library
     *   may not use native operating system calls to spawn new threads; false if they may
     * - CKF_OS_LOCKING_OK. True if the library can use the native operation system threading model for locking;
     *   false otherwise
     */
    flags?: number;
}
```

__Code__
```js
const mod = Module.load("/usr/local/opt/nss/lib/libsoftokn3.dylib", "NSS");

mod.initialize({
    libraryParameters: "configdir='' certPrefix='' keyPrefix='' secmod='' flags=readOnly,noCertDB,noModDB,forceOpen,optimizeSpace",
});

// Your code here

mod.finalize();
```

## Developing
Use npm command to publish graphene-pk11 module
```
> npm run pub
```

## Suitability
At this time this solution should be considered suitable for research and experimentation, further code and security review is needed before utilization in a production application.

## Bug Reporting
Please report bugs either as pull requests or as issues in the issue tracker. Graphene has a full disclosure vulnerability policy. Please do NOT attempt to report any security vulnerability in this code privately to anybody.

## TODO
* Add tests to the library
* Add additional capabilities to CLI (device initialization, file signing, file encryption, etc)

## Related
- [PKCS #11 2.40 Specification](http://docs.oasis-open.org/pkcs11/pkcs11-curr/v2.40/pkcs11-curr-v2.40.html)
- [Many PKCS #11 Specifications](http://www.cryptsoft.com/pkcs11doc/)
- [PERL PKCS #11 binding](https://github.com/dotse/p5-crypt-pkcs11)
- [.NET PKCS #11 binding](https://github.com/jariq/Pkcs11Interop)
- [Ruby PKCS #11 binding](https://github.com/larskanis/pkcs11)
- [OCaml PKCS #11 binding](https://github.com/ANSSI-FR/caml-crush)
- [OCaml PKCS #11 CLI](https://github.com/ANSSI-FR/opkcs11-tool)
- [Go PKCS #11 binding](https://github.com/miekg/pkcs11) 
- [PKCS #11 Admin](http://www.pkcs11admin.net)
- [Node.js Foreign Function Interface](https://github.com/node-ffi/node-ffi)
- [GOST PKCS#11 constants](https://github.com/romanovskiy-k/pkcs11/blob/master/rtpkcs11t.h)
- [PKCS#11 logging proxy module](https://github.com/jariq/pkcs11-logger)
- [PKCS#11 Proxy](https://github.com/iksaif/pkcs11-proxy)
- [PKCS#11 Tests](https://github.com/google/pkcs11test)
- [OpenCryptoKi](http://sourceforge.net/projects/opencryptoki/)
- [SoftHSM](https://www.opendnssec.org/softhsm/)
- [SoftHSM2 for Windows](https://github.com/disig/SoftHSM2-for-Windows/)
- [node-pcsc](https://github.com/santigimeno/node-pcsclite)
- [PKCS#11 URIs](https://tools.ietf.org/html/rfc7512)
- [Key Length Recommendations](http://www.keylength.com/en/compare/)

