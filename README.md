# Graphene
A simple layer for interacting with PKCS #11 / CryptoKI libraries in NodeJS

PKCS #11 (also known as CryptoKI or PKCS11) is the standard interface for interacting with hardware crypto devices such as Smart Cards and Hardware Security Modules (HSMs). It wraps the library closely, but uses attempts to look like 'node.crypto' where it makes sense. 

It has been tested with :
- [SoftHSM](https://www.opendnssec.org/softhsm/)
- [Safenet Luna HSMs](http://www.safenet-inc.com/)
- [RuToken](http://www.rutoken.ru/)

**NOTE:** For testing purposes it may be easier to work with SoftHSM which is a software implementation of PKCS#11 based on OpenSSL or Botan.

## SoftHSM
* Install SoftHSM

    `apt-get install softhsm`

* Specify where your configuration file is

    `export SOFTHSM2_CONF=/etc/softhsm/softhsm.conf`

* Fix the configuation file to specify correct path to it's db

    `%s:/lib\/lib/lib`

* Initialize the first slot

    `softhsm2-util --init-token --slot 0 --label "My token 1"`

* The pkcs11 module you can now use can be found here:

  `/usr/lib/softhsm/libsofthsm.so`

## Examples
### Listing capabilities
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slots = mod.getSlots(true);
	for (var i in slots) {
		var slot = slots[i];
		console.log("Slot #" + (+i + 1));
		console.log("\tDescription:", slot.description);
		console.log("\tSerial:", slot.serial);
		console.log("\tNeed login:", slot.needLogin);
		console.log("\tPassword(min/max): %d/%d", slot.minPassword, slot.maxPassword);
		console.log("\tIs hardware:", slot.isHardware());
		console.log("\tIs removable:", slot.isRemovable());
		console.log("\tIs initialized:", slot.isInitialized());

		console.log("\n\nMechanisms:");
		console.log("Name                       h/s/v/e/d/w/u");
		console.log("========================================");
		function b(v) {
			return v ? '+' : '-';
		};
		function s(v) {
			v = v.toString();
			for (var i = v.length; i < 27; i++) {
				v += ' ';
			}
			return v;
		};
		var mechs = slot.mechanismList;
		for (var j in mechs) {
			var mech = mechs[j];
			console.log(
				s(mech.name) +
				b(mech.isDigest()) + '/' +
				b(mech.isSign()) + '/' +
				b(mech.isVerify()) + '/' +
				b(mech.isEncrypt()) + '/' +
				b(mech.isDecrypt()) + '/' +
				b(mech.isWrap()) + '/' +
				b(mech.isUnwrap())
				);
		}
	}
}

mod.finalize();
```

####Output
```
Slot #1
        Description: Luna UHD Slot
        Serial: 486884
        Need login: true
        Password(min/max): 7/255
        Is hardware: true
        Is removable: false
        Is initialized: true


Mechanisms:
Name                       h/s/v/e/d/w/u
=========================================
RSA_PKCS_KEY_PAIR_GEN      -/-/-/-/-/-/-
RSA_PKCS                   -/+/+/+/+/+/+
SHA1_RSA_PKCS              -/+/+/-/-/-/-
RSA_PKCS_OAEP              -/-/-/+/+/+/+
RSA_X9_31_KEY_PAIR_GEN     -/-/-/-/-/-/-
SHA1_RSA_X9_31             -/+/+/-/-/-/-
RSA_PKCS_PSS               -/+/+/-/-/-/-
SHA1_RSA_PKCS_PSS          -/+/+/-/-/-/-
DSA_KEY_PAIR_GEN           -/-/-/-/-/-/-
DSA                        -/+/+/-/-/-/-
SHA224_RSA_PKCS            -/+/+/-/-/-/-
```

### Hashing
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";
	
var mod = Module.load(lib, "SoftHSM");
mod.initialize();
	
//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[0]; //get first slot;
	if (slot.isInitialized()){
		var session = slot.session;
		session.start();
	
		var digest = session.createDigest("sha1");
		digest.update("simple text 1");
		digest.update("simple text 2");
		var hash = digest.final();
		console.log("Hash SHA1:", hash.toString("hex")); //Hash SHA1: e1dc1e52e9779cd69679b3e0af87d2e288190d34 
	
		session.stop();
	}
	else{
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```
### Generating keys
#### AES
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[1];
	if (slot.isInitialized()) {
		var session = slot.session;
		session.start(2|4); //start session in RW mode

		session.login("1234");
		
		var k = session.generateKey("AES_KEY_GEN", {
			"class": Enums.ObjectClass.SecretKey,
			"token": true,
			"sensitive": true,
			"valueLen": 32,
			"keyType": Enums.KeyType.AES,
			"label": "My AES secret key",
			"private": true
		})
		console.log("Key.handle:", k.handle);
		console.log("Key.type:", k.getType());

		session.logout();
		session.stop();
	}
	else {
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```

#### ECC
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[1];
	if (slot.isInitialized()) {
		var session = slot.session;
		session.start(2 | 4); //start session in RW mode

		session.login("1234");

		var keyPair = session.generateKeyPair(
			"EC_KEY_PAIR_GEN",
			{
				"token": true,
				"private": true,
				"verify": true,
				"wrap": false,
				"encrypt": false,
				"paramsEC": new Buffer("06082A8648CE3D030101", "hex")
			},
			{
				"token": true,
				"private": true,
				"sensitive": true,
				"decrypt": false,
				"sign": true,
				"unwrap": false,

			})
		var pubKey = keyPair.public;
		console.log("Key.handle:", pubKey.handle);
		console.log("Key.type:", Enums.KeyType.getText(pubKey.getType()));
		
		var prvKey = keyPair.private;
		console.log("Key.handle:", prvKey.handle);
		console.log("Key.type:", Enums.KeyType.getText(prvKey.getType()));

		session.logout();
		session.stop();
	}
	else {
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```

### Signing
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[1];
	if (slot.isInitialized()){
		var session = slot.session;
		session.start();
		
		session.login("1234");
		
		var objects = session.findObjects();
		
		var key = null;
		//Get first PrivateKey
		for (var i in objects){
			var object = objects[i];
			if (object.getClass() == Enums.ObjectClass.PrivateKey){
				key = object.toType(Enums.ObjectClass.PrivateKey);
				break;
			}
		}
		
		console.log("PK lable:", key.getLabel()); 			//PK lable: My key
		console.log("PK type:", Enums.KeyType.getText(key.getType()));	//PK type: RSA
		console.log("PK is Sign:", key.isSign());			//PK is Sign: true
	
		var sign = session.createSign("SHA1_RSA_PKCS", key);
		sign.update("simple text 1");
		sign.update("simple text 2");
		var signature = sign.final();
		console.log("Signature RSA-SHA1:", signature.toString("hex"));	//Signature RSA-SHA1: 6102a66dc0d97fadb5...
		
		session.logout();
		session.stop();
	}
	else{
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```
### Verifying
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[1];
	if (slot.isInitialized()){
		var session = slot.session;
		session.start();
		
		session.login("1234");
		
		var objects = session.findObjects();
		
		var key = null;
		//Get first PublicKey
		for (var i in objects){
			var object = objects[i];
			if (object.getClass() == Enums.ObjectClass.PublicKey){
				key = object.toType(Enums.ObjectClass.PublicKey);
				break;
			}
		}
		
		console.log("PubK lable:", key.getLabel()); 				//PK lable: My key
		console.log("PubK type:", Enums.KeyType.getText(key.getType()));	//PK type: RSA
		console.log("PubK is Verify:", key.isVerify());				//PK is Sign: true
	
		var verify = session.createVerify("SHA1_RSA_PKCS", key);
		verify.update("simple text 1");
		verify.update("simple text 2");
		var signature = new Buffer("6102a66dc0d97fadb53bda109b726714e0206b5a...","hex");
		var res = verify.final(signature);
		console.log("Verify RSA-SHA1:", res);					//Verify RSA-SHA1: true
		
		session.logout();
		session.stop();
	}
	else{
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```
### Encrypting
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[0]; //get slot by index
	if (slot.isInitialized()) {
		var session = slot.session;
		session.start();

		session.login("1234");

		var objects = session.findObjects();

		var key = null;
		//Get AES key
		for (var i in objects) {
			var object = objects[i];
			if (object.getClass() == Enums.ObjectClass.SecretKey) {
				var _key = object.toType(); //converts object to SecretKey 
				if (_key.getType() == Enums.KeyType.AES) {
					key = object.toType(Enums.ObjectClass.PublicKey);
					break;
				}
			}
		}

		console.log("Key lable:", key.getLabel()); 						//Key lable: test key AES
		console.log("Key type:", Enums.KeyType.getText(key.getType()));	//Key type: AES
		console.log("Key is Encrypt:", key.isEncrypt());				//Key is Encrypt: true

		var encrypt = session.createEncrypt({
			name: "AES_CBC_PAD",
			params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
		}, key);
		var encMsg = new Buffer(0);
		encMsg = Buffer.concat([encMsg, encrypt.update("simple text 1")]);
		encMsg = Buffer.concat([encMsg, encrypt.update("simple text 2")]);
		encMsg = Buffer.concat([encMsg, encrypt.final()]);
		console.log("Encrypted AES_CBC_PAD:", encMsg.toString('base64'));	
		//Encrypted AES_CBC_PAD: ByPGGo2xIcGsyRZBncjmI2nLiSAOSnmKG4U1p7LJIRM=
	
		session.logout();
		session.stop();
	}
	else {
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```
### Decrypting
```
var pkcs11 = require('pkcs11');
var Module = pkcs11.Module;
var Enums = pkcs11.Enums;

var lib = "/usr/local/lib/softhsm/libsofthsm2.so";

var mod = Module.load(lib, "SoftHSM");
mod.initialize();

//get slots
var slots = mod.getSlots(true);
if (slots.length > 0) {
	var slot = slots[0]; //get slot by index
	if (slot.isInitialized()) {
		var session = slot.session;
		session.start();

		session.login("1234");

		var objects = session.findObjects();

		var key = null;
		//Get AES key
		for (var i in objects) {
			var object = objects[i];
			if (object.getClass() == Enums.ObjectClass.SecretKey) {
				var _key = object.toType(); //converts object to SecretKey 
				if (_key.getType() == Enums.KeyType.AES) {
					key = object.toType(Enums.ObjectClass.PublicKey);
					break;
				}
			}
		}

		console.log("Key lable:", key.getLabel()); 						//Key lable: test key AES
		console.log("Key type:", Enums.KeyType.getText(key.getType()));	//Key type: AES
		console.log("Key is Encrypt:", key.isEncrypt());				//Key is Encrypt: true

		var decrypt = session.createDecrypt({
			name: "AES_CBC_PAD",
			params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
		}, key);
		var msg = new Buffer(0);
		msg = Buffer.concat([msg, decrypt.update(
			new Buffer("ByPGGo2xIcGsyRZBncjmI2nLiSAOSnmKG4U1p7LJIRM=", "base64")
			)]);
		msg = Buffer.concat([msg, decrypt.final()]);
		console.log("Decrypted AES_CBC_PAD:", msg.toString());	
		//Decrypted AES_CBC_PAD: simple text 1simple text 2

		session.logout();
		session.stop();
	}
	else {
		console.error('Slot is not initialized');
	}
}

mod.finalize();
```

## Suitability
At this time this solution should be considered suitable for research and experimentation, further code and security review is needed before utilization in a production application.

## Bug Reporting
Please report bugs either as pull requests or as issues in the issue tracker. Graphene has a full disclosure vulnerability policy. Please do NOT attempt to report any security vulnerability in this code privately to anybody.

## TODO
* Add tests to the library
* Add cli based on the library for working with pkcs#11 devices
* Benchmark performance of physical HSM device when using graphene

## Related
- [PKCS #11 2.40 Specification](http://docs.oasis-open.org/pkcs11/pkcs11-curr/v2.40/pkcs11-curr-v2.40.html)
- [Many PKCS #11 Specifications](http://www.cryptsoft.com/pkcs11doc/)
- [.NET PKCS #11 binding](https://github.com/jariq/Pkcs11Interop)
- [Ruby PKCS #11 binding](https://github.com/larskanis/pkcs11)
- [Go PKCS #11 binding](https://github.com/miekg/pkcs11) 
- [PKCS #11 Admin](http://www.pkcs11admin.net)
- [Node.js Foreign Function Interface](https://github.com/node-ffi/node-ffi)
- [GOST PKCS#11 constants](https://github.com/romanovskiy-k/pkcs11/blob/master/rtpkcs11t.h)
- [PKCS#11 Logging Shim](https://github.com/jariq/pkcs11-logger)
- [PKCS#11 Proxy](https://github.com/iksaif/pkcs11-proxy)
- [PKCS#11 Tests](https://github.com/google/pkcs11test)
- [OpenCryptoKi](http://sourceforge.net/projects/opencryptoki/)
- [SoftHSM](https://www.opendnssec.org/softhsm/)

