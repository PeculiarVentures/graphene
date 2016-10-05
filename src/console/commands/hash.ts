import * as defs from "./defs";

/* ==========
   Hash
   ==========*/
export let cmdHash = defs.commander.createCommand("hash", {
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
    .on("call", function(cmd: any) {
        throw new Error("Not implemented");
        // defs.check_session();
        // let rs = fs.createReadStream(cmd.in);
        // let digest = consoleApp.session.createDigest(cmd.alg);
        // rs.on("data", function(chunk) {
        //     digest.update(chunk);
        // });
        // rs.on("end", function() {
        //     let hash = digest.final();
        //     console.log(hash.toString("hex"));
        // });
    }) as defs.Command;