var Ref = require('ref');

module.exports = function (Debug, Utils, Enums) {

	function str_array_format(ar) {
		var res = "";
		for (var i = 0; i < ar.length; i++) {
			res += String.fromCharCode(ar[i]);
		}
		//res = res.replace(/\u0000/g, "");
		res = res.trim();
		return res;
	}

	function version_to_string(version) {
		var res = "";
		if (version) {
			res = version.major + '.' + version.minor;
		}
		return res;
	}

	function throw_cki_error(res, fn) {
		var errDesc = Utils.printf("%1(%2)", Enums.CryptokiResult.getText(res), res);
		//Debug('%s: Error %s', fn, errDesc);
		throw new Error(Utils.printf("Error on Cryptoki function %1. Error is %2", fn, errDesc));
	}
	
	function check_cki_res(res, fn){
		if (res !== Enums.CryptokiResult.OK){
			throw_cki_error(res, fn);
		}
	}
	
	function size_of(t){
		var b = Ref.alloc(t);
		return b.length;
	}

	return {
		str_array_format: str_array_format,
		version_to_string: version_to_string,
		throw_cki_error: throw_cki_error,
		check_cki_res: check_cki_res,
		size_of: size_of
	}
	
}