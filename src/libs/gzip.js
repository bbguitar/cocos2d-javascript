/**
 * Thin wrapper around JXG's GZip utils
 */

var JXG = require('JXGUtil');

exports.unzip = function(input) {
	return (new JXG.Util.Unzip(input)).unzip()[0][0]
};
exports.unzipBase64 = function(input) {
	return (new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(input))).unzip()[0][0]
};
exports.unzipBase64AsArray = function(input, bytes) {
	var bytes = bytes || 1;

	var dec = this.unzipBase64(input),
		ar = [], i, j, len;
	for (i = 0, len = dec.length/bytes; i < len; i++){
		ar[i] = 0;
		for (j = bytes-1; j >= 0; --j){
			ar[i] += dec.charCodeAt((i *bytes) +j) << j;
		}
	}
	return ar;
};
exports.unzipAsArray = function (input, bytes) {
	var bytes = bytes || 1;

	var dec = this.unzip(input),
		ar = [], i, j, len;
	for (i = 0, len = dec.length/bytes; i < len; i++){
		ar[i] = 0;
		for (j = bytes-1; j >= 0; --j){
			ar[i] += dec.charCodeAt((i *bytes) +j) << j;
		}
	}
	return ar;
};

