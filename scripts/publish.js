var script = require("./script");
var config = require("./config");

console.log("Publish script started")
console.log("Current dir:", __dirname);

var path_package = "package.json";

var package = script.read_package(path_package);
var copy_package = Object.assign({}, package);
copy_package.scripts = Object.assign({}, package.scripts);

// remove less scripts
delete copy_package.scripts["prepublish"];
delete copy_package.scripts["prepublish"];
delete copy_package.scripts["build"];
delete copy_package.scripts["sync"];
delete copy_package.scripts["install"];

script.update_version(copy_package);
script.save_package(package, config.prefix);
try {
    script.save_package(copy_package);
    script.save_npmignore();
    script.run("npm publish");
}
catch (e) {
    script.remove_npmignore();
    script.save_package(package);
    script.remove_package(config.prefix + "package.json");
    throw e;
}

console.log("Changing package version");
var package = script.read_package(config.prefix + "package.json");
if (package) {
    script.update_version(package);
    script.save_package(package);
    console.log("New version: %s", package.version);

    script.remove_npmignore();
    script.remove_package(config.prefix + "package.json");
}

console.log("Publish finished");