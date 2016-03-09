"use strict";
var defs = require("./defs");
var consoleApp = defs.consoleApp;
exports.cmdHash = defs.commander.createCommand("hash", {
    description: "compute a hash for a given file",
    note: defs.NOTE_SESSION
})
    .option("alg", {
    description: "the algorithm to hash the file with. Default SHA1." + "\n\n" +
        defs.pud(" ", 14) + "to get list of supported algoriphms use command" + "\n\n" +
        defs.pud(" ", 16) + "> slot algs -s {num} -f h" + "\n",
    value: "sha1"
})
    .option("in", {
    description: "the file to hash",
    set: defs.check_file,
    isRequired: true
})
    .on("call", function (cmd) {
    throw new Error("Not implemented");
});
