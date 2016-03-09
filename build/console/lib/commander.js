"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core = require("../../core");
var events_1 = require("events");
var CommandError = (function (_super) {
    __extends(CommandError, _super);
    function CommandError(command, message) {
        _super.call(this);
        this.message = "CommandError: " + message;
        this.command = command;
        this.stack = (new Error(this.message)).stack;
    }
    return CommandError;
}(Error));
exports.CommandError = CommandError;
var Command = (function (_super) {
    __extends(Command, _super);
    function Command(name, desc) {
        _super.call(this);
        this.options = {};
        this.commands = {};
        this.name = name;
        if (core.isObject(desc)) {
            this.description = desc.description;
            this.note = desc.note;
            this.example = desc.example;
        }
        else
            this.description = desc || "";
    }
    Command.prototype.option = function (longName, param) {
        var o = {
            longName: longName,
            shortName: param.shortName || longName.charAt(0),
            description: param.description || "",
            type: param.type || null,
            value: param.value,
            isRequired: (core.isEmpty(param.value) && param.isRequired === true),
            set: param.set || (function (v) { return v; })
        };
        this.options[o.longName] = o;
        return this;
    };
    Command.prototype.help = function () {
        console.log();
        this.print("description");
        this.print("usage");
        this.print("commands");
        this.print("note");
        this.print("example");
    };
    Command.prototype.createCommand = function (name, desc) {
        var cmd = new Command(name, desc);
        cmd.createCommandHelp();
        this.commands[name] = cmd;
        return cmd;
    };
    Command.prototype.createCommandHelp = function () {
        var that = this;
        var cmd = new Command("?", "output usage information");
        cmd.on("call", function () {
            that.help();
        });
        this.commands["?"] = cmd;
    };
    Command.prototype.print = function (block) {
        switch (block) {
            case "description":
                if (this.description) {
                    console.log("  " + this.description);
                    console.log();
                }
                break;
            case "usage":
                if (Object.keys(this.options).length) {
                    var params = "";
                    for (var i in this.options) {
                        var opt = this.options[i];
                        params += " --" + opt.longName;
                    }
                    console.log("  Usage: " + this.name + params);
                    console.log();
                    for (var i in this.options) {
                        var opt = this.options[i];
                        console.log("    --" + pud(opt.longName + (opt.type ? "<" + opt.type + ">" : ""), 8) + opt.description);
                    }
                    console.log();
                }
                break;
            case "commands":
                if (Object.keys(this.commands).length > 1) {
                    console.log("  Commands:");
                    console.log();
                    for (var i in this.commands) {
                        var cmd = this.commands[i];
                        console.log("    " + pud(cmd.name, 10) + cmd.description);
                    }
                    console.log();
                }
                break;
            case "note":
                if (this.note) {
                    console.log("  Note:");
                    console.log();
                    console.log("    " + this.note);
                    console.log();
                }
                break;
            case "example":
                if (this.example) {
                    console.log("  Example:");
                    console.log();
                    console.log("    " + this.example);
                    console.log();
                }
                break;
        }
    };
    Command.parse = function (cmd) {
        cmd = prepare_command(cmd);
        var arCmd = split_command(cmd);
        var o = {
            commands: []
        };
        var _param = null;
        var fCommand = true;
        for (var i = 0; i < arCmd.length; i++) {
            var word = arCmd[i];
            var _cmd = get_command_name(word);
            if (fCommand && _cmd) {
                o.commands.push(_cmd);
                continue;
            }
            fCommand = false;
            var name_1 = get_long_name(word) || get_short_name(word);
            if (name_1 && (!_param || _param !== name_1)) {
                _param = name_1;
                o[name_1] = null;
            }
            else if (_param) {
                o[_param] = word;
            }
        }
        return o;
    };
    return Command;
}(events_1.EventEmitter));
exports.Command = Command;
function get_command_name(name) {
    return get_name(name, /^(\w[\w-]*|\?)$/i);
}
function get_long_name(name) {
    return get_name(name, /^--(\w[\w-]*|\?)$/i);
}
function get_short_name(name) {
    return get_name(name, /^-(\w[\w-]*|\?)$/i);
}
function get_name(name, reg) {
    var res = null;
    if (res = reg.exec(name)) {
        res = res[1];
    }
    return res;
}
function prepare_command(cmd) {
    var res = trim_str(cmd);
    return res;
}
function trim_str(s) {
    var res = "";
    var fSpace = true;
    for (var i = 0; i <= s.length; i++) {
        var c = s.charAt(i);
        if (c === " ")
            if (fSpace)
                continue;
            else
                fSpace = true;
        else
            fSpace = false;
        res += c;
    }
    var rtrim = /(\s+)$/;
    res = res.replace(rtrim, "");
    return res;
}
function split_command(cmd) {
    var res = [];
    var _found = false;
    var _quote = false;
    var str = "";
    for (var i = 0; i < cmd.length; i++) {
        var char = cmd.charAt(i);
        if (char !== " " || _quote) {
            if (char === "\"") {
                _quote = !_quote;
                continue;
            }
            _found = true;
            str += char;
        }
        else {
            res.push(str);
            _found = false;
            str = "";
        }
    }
    if (str)
        res.push(str);
    return res;
}
var Commander = (function (_super) {
    __extends(Commander, _super);
    function Commander() {
        _super.apply(this, arguments);
        this.commands = {};
        this.options = {};
    }
    Commander.prototype.createCommand = function (name, desc) {
        var cmd = new Command(name, desc);
        cmd.createCommandHelp();
        this.commands[name] = cmd;
        return cmd;
    };
    Commander.prototype.parse = function (cmd) {
        try {
            var command = Command.parse(cmd);
            if (command.commands.length) {
                var that = this;
                for (var i in command.commands) {
                    var item = command.commands[i];
                    if (item in that.commands) {
                        that = that.commands[item];
                        if (that.name === "?") {
                            that.emit("call", {});
                            return;
                        }
                    }
                    else {
                        throw new CommandError(that, "Unknown command in use '" + item + "'");
                    }
                }
                var opt = {};
                for (var i in that.options) {
                    var _prop = that.options[i];
                    if (_prop.shortName in command || _prop.longName in command) {
                        var prop = _prop.shortName in command ? command[_prop.shortName] : command[_prop.longName];
                        prop = _prop.set(prop);
                        if (core.isEmpty(prop))
                            prop = _prop.value;
                        opt[_prop.longName] = prop;
                    }
                    else {
                        if (_prop.isRequired) {
                            throw new CommandError(that, "Parameter --" + _prop.longName + " is required");
                        }
                        opt[_prop.longName] = _prop.value;
                    }
                }
                that.emit("call", opt);
            }
            else {
                if (command["name"])
                    this.emit("error", new Error("Unknown command in use '" + command["name"] + "'"));
            }
        }
        catch (e) {
            this.emit("error", e);
        }
    };
    return Commander;
}(events_1.EventEmitter));
exports.Commander = Commander;
function pud(text, size, spaceChar, end) {
    if (spaceChar === void 0) { spaceChar = " "; }
    if (end === void 0) { end = false; }
    if (!spaceChar)
        spaceChar = " ";
    var res, pad = "";
    if (text.length < size) {
        for (var i = 0; i < (size - text.length); i++)
            pad += spaceChar;
    }
    if (!end) {
        res = text + pad;
    }
    else {
        res = pad + text;
    }
    return res;
}
exports.commander = new Commander();
