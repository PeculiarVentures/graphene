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
### Generating keys
### Signing
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

