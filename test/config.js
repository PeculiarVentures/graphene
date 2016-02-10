process.env['SOFTHSM2_CONF'] = '/etc/softhsm2.conf';

module.exports = {
	//lib: "/usr/safenet/lunaclient/lib/libCryptoki2_64.so",
	lib: "/usr/local/lib/softhsm/libsofthsm2.so",
	libName: "Luna 5",
	//pin: "FLH6-X6Gb-/CSL-YtAY",
	pin: "12345",
}