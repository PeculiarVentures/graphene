# Graphene
A simple layer for interacting with PKCS#11 / CryptoKI libraries in NodeJS

PKCS#11 (also known as CryptoKI) is the standard interface for interacting with hardware crypto devices such as Smart Cards and Hardware Security Modules (HSMs). It wraps the library closely, but uses attempts to look like 'node.crypto' where it makes sense. 

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
### Decrypting

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

