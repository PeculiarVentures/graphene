/// <reference path="../typings/index.d.ts" />

var fs = require("fs");
var config = require("./config");
var execSync = require("child_process").execSync;

var npmignore = ".npmignore";

function run(cmd) {
    console.log("Run: %s", cmd);
    try {
        execSync(cmd, {
            encoding: "utf8"
        });
    }
    catch (e) {
        throw e;
    }
}

function update_version(package) {
    var v = +(/()\d+$/.exec(package.version)[0]);
    package.version = package.version.replace(/()\d+$/, ++v);
}

function read_package(path) {
    if (fs.existsSync(path)) {
        var json = fs.readFileSync(path, "utf8");
        return JSON.parse(json);
    }
    return null;
}

function save_package(package, prefix) {
    prefix = prefix || "";
    var json = JSON.stringify(package, null, 4);
    fs.writeFileSync(prefix + "package.json", json);
}

function remove_file(path) {
    console.log("Removing " + path);
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

function remove_package() {
    remove_file(config.prefix + "package.json");
}

function save_npmignore() {
    console.log("Creating .npmignore");
    config.npmignore.push(config.prefix + "package.json");
    var str = config.npmignore.join("\n");
    fs.writeFileSync(npmignore, str);
}

function remove_npmignore() {
    remove_file(npmignore);
}

module.exports = {
    run: run,
    update_version: update_version,
    read_package: read_package,
    save_package: save_package,
    remove_package: remove_package,
    save_npmignore: save_npmignore,
    remove_npmignore: remove_npmignore,
    add_bin: add_bin
}