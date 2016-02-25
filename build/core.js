function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./core/object"));
__export(require("./core/error"));
__export(require("./core/collection"));
__export(require("./core/type"));
__export(require("./core/utc"));
var ref = require("ref");
var refStruct = require("ref-struct");
var refArray = require("ref-array");
exports.Ref = ref;
exports.RefStruct = refStruct;
exports.RefArray = refArray;
