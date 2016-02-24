# Graphene
A simple layer for interacting with PKCS #11 / PKCS11 / CryptoKI for Node in TypeScript

PKCS #11 (also known as CryptoKI or PKCS11) is the standard interface for interacting with hardware crypto devices such as Smart Cards and Hardware Security Modules (HSMs). It wraps the library closely, but uses attempts to look like 'node.crypto' where it makes sense. 

It has been tested with :
- [SoftHSM2](https://www.opendnssec.org/softhsm/)
- [Safenet Luna HSMs](http://www.safenet-inc.com/)
- [RuToken](http://www.rutoken.ru/)

**NOTE:** For testing purposes it may be easier to work with SoftHSM2 which is a software implementation of PKCS#11 based on OpenSSL or Botan.

## SoftHSM2 (assumes Ubuntu)
* Install SoftHSM2

    `apt-get install softhsm`

* Initialize the first slot

    `softhsm2-util --init-token --slot 0 --label "My token 1"`

* The PKCS1 #11 module you can now use can be found here:

  `/usr/local/lib/softhsm/libsofthsm.so`
  
* Adjust permissions so the user your code will be able to access the PKCS #11 module:

  ```
  sudo chmod –R 755 /var/lib/softhsm
  sudo chmod –R 755 /usr/local/lib/softhsm
  chown root:softhsmusers /var/lib/softhsm
  chown root:softhsmusers /usr/local/lib/softhsm
  ```
 
  **NOTE**: This may be more generous than needed. It works out to : 0755 = User:rwx Group:r-x World:r-x. 

## Examples
### Listing capabilities
```
var graphene = require("graphene-pk11");
var Module = graphene.Module;
var lib = "/usr/local/lib/softhsm/libsofthsm2.so";
var mod = Module.load(lib, "SafeNet");
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
        ;
        function s(v) {
            v = v.toString();
            for (var i_1 = v.length; i_1 < 27; i_1++) {
                v += " ";
            }
            return v;
        }
        ;
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
```
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SafeNet");
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
```
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SafeNet");
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
```
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SafeNet");
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

### Signing / Verifying
```
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SafeNet");
mod.initialize();

var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
    var session = slot.open();
    session.login("12345");
    
    // generate RSA key pair
    var keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
        keyType: graphene.KeyType.RSA,
        modulusBits: 1024,
        publicExponent: new Buffer([3]),
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
```
var graphene = require("graphene-pk11");
var Module = graphene.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SafeNet");
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
        params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6]) // IV
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

## Suitability
At this time this solution should be considered suitable for research and experimentation, further code and security review is needed before utilization in a production application.

## Bug Reporting
Please report bugs either as pull requests or as issues in the issue tracker. Graphene has a full disclosure vulnerability policy. Please do NOT attempt to report any security vulnerability in this code privately to anybody.

## TODO
* Add tests to the library
* Add additional capabilities to CLI (device initialization, file signing, file encrption, etc)

## Related
- [PKCS #11 2.40 Specification](http://docs.oasis-open.org/pkcs11/pkcs11-curr/v2.40/pkcs11-curr-v2.40.html)
- [Many PKCS #11 Specifications](http://www.cryptsoft.com/pkcs11doc/)
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
- [SofHSM2 for Windows](https://github.com/disig/SoftHSM2-for-Windows/)
- [node-pcsc](https://github.com/santigimeno/node-pcsclite)
- [PKCS#11 URIs](https://tools.ietf.org/html/rfc7512)
- [Key Length Recommendations](http://www.keylength.com/en/compare/)

