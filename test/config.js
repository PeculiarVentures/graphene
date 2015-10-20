process.env['SOFTHSM2_CONF'] = '/etc/softhsm2.conf';

module.exports = {
	lib: "usr/local/lib/softhsm/libsofthsm2.so",
	libName: "SoftSHM",
	pin: "1234",
}