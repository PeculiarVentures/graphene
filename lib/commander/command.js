var Utils = require('../utils');
var Type = Utils.Type;
var util = require('util');
var EventEmitter = require('events');
var debug = require('debug')('commander');

function Command(name, desc) {
	this._options = {};
	this._commands = {};
	this._name = name;
	if (Type.isObject(desc)) {
		this._description = desc.description;
		this._note = desc.note;
		this._example = desc.example;
	}
	else
		this._description = desc || "";

	EventEmitter.call(this);
}
util.inherits(Command, EventEmitter);

Command.prototype.option = function option(ln, p) {
	p = p || {};
	var o = {};
	o.lname = ln;
	o.sname = p.alt || ln.charAt(0);
	o.description = p.description || "";
	o.type = p.type || null;
	o.value = null;
	if (!Type.isUndefined(p.value))
		o.value = p.value;
	o.isRequired = (Type.isNull(o.value) && p.isRequired == true);
	if (p.set && Type.isFunction(p.set))
		o.set = p.set;
	else
		o.set = function (v) { return v };
	this._options[o.lname] = o;
	return this;
}

function create_cmd_help(cmd) {
	if (cmd) {
		cmd._commands["?"] = new Command("?", "Returns Help");
		cmd._commands["?"].on("call", function () {
			cmd.help();
		})
	}
}

Command.prototype.command = function (name, desc) {
	var cmd = new Command(name, desc);
	create_cmd_help(cmd);
	this._commands[name] = cmd;
	return cmd;
}

Command.prototype.print = function (block) {
	switch (block) {
		case "description":
			console.log(this._description);
			console.log();
			break;
		case "usage":
			if (Object.keys(this._options).length) {
				var params = "";
				for (var i in this._options) {
					var opt = this._options[i];
					params += " --" + opt.lname
				}
				console.log("Usage: " + this._name + params);
				console.log();
				for (var i in this._options) {
					var opt = this._options[i];
					console.log("  --" + opt.lname + (opt.type ? "<" + opt.type + ">" : "") + " - " + opt.description);
				}
				console.log();
			}
			break;
		case "commands":
			/**
			 * Prints list of commands
			 * Don't print if only one command "?"
			 */
			if (Object.keys(this._commands).length > 1) {
				console.log("Commands:");
				console.log();
				for (var i in this._commands) {
					var cmd = this._commands[i];
					console.log("  " + cmd._name + " - " + cmd._description);
				}
				console.log();
			}
			break;
		case "note":
			if (this._note) {
				console.log("Note:");
				console.log("  " + this._note);
				console.log();
			}
			break;
		case "example":
			if (this._example) {
				console.log("Example:");
				console.log("  " + this._example);
				console.log();
			}
			break;
	}
}

Command.prototype.help = function () {
	console.log();
	this.print("description");
	this.print("usage");
	this.print("commands");
	this.print("note");
	this.print("example");
}

Command.parse = function Parse(cmd) {
	cmd = prepare_command(cmd);
	var arCmd = split_command(cmd);
	var o = {
		_commands: []
	};
	var _param = null;
	var fCommand = true;
	for (var i = 0; i < arCmd.length; i++) {
		var word = arCmd[i];
		var _cmd = get_command_name(word);
		if (fCommand && _cmd) {
			o._commands.push(_cmd);
			continue;
		}
		fCommand = false;
		var name = get_long_name(word) || get_short_name(word);
		if (name && (!_param || _param !== name)) {
			_param = name;
			o[name] = null;
		}
		else if (_param) {
			o[_param] = word;
		}
	}
	return o;
}

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
		if (c == " ")
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

/**
 * Splits command by SPACE, ingnore SPACE into quotes
 */
function split_command(cmd) {
	var res = [];
	var _found = false;
	var _quote = false;
	var str = "";
	for (var i = 0; i < cmd.length; i++) {
		var char = cmd.charAt(i);
		if (char !== " " || _quote) {
			if (char == "\"") {
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

function Commander() {
	this._commands = {};
	EventEmitter.call(this);
}
util.inherits(Commander, EventEmitter);

Commander.prototype.createCommand = function (name, desc) {
	var cmd = new Command(name, desc);
	create_cmd_help(cmd);
	this._commands[name] = cmd;
	return cmd;
}

Commander.prototype.parse = function parse(cmd) {
	try {
		cmd = Command.parse(cmd);
		if (cmd._commands.length) {
			var _cmd = this;
			//Find command
			for (var i in cmd._commands) {
				var item = cmd._commands[i];
				if (item in _cmd._commands) {
					_cmd = _cmd._commands[item];
					if (_cmd._name == "?") {
						_cmd.emit("call", {});
						return;
					}
				}
				else {
					var error = new Error("Unknown command in use '" + item + "'");
					error.command = _cmd;
					throw error;
				}
			}

			var opt = {};
			for (var i in _cmd._options) {
				var _prop = _cmd._options[i];
				if (_prop.sname in cmd || _prop.lname in cmd) {
					var prop = _prop.sname in cmd ? cmd[_prop.sname] : cmd[_prop.lname];
					prop = _prop.set(prop);
					if (Type.isEmpty(prop))
						prop = _prop.value;
					opt[_prop.lname] = prop;
				} else {
					if (_prop.isRequired) {
						var error = new Error("Parameter --" + _prop.lname + " is required");
						error.command = _cmd;
						throw error;
					}
					opt[_prop.lname] = _prop.value;
				}
			}
			debug("Run command '" + cmd._name + "'");
			debug('Command params:', opt);
			_cmd.emit("call", opt);
		}
		else {
			if (cmd._name)
				this.emit("error", new Error("Unknown command in use " + cmd._name));
		}
	} catch (e) {
		this.emit("error", e);
	}
}

module.exports = new Commander();