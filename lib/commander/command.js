var Utils = require('../utils');
var Type = Utils.Type;
var util = require('util');
var EventEmitter = require('events');
var debug = require('debug')('commander');

function Command() {
	this._options = {}

	EventEmitter.call(this);
}
util.inherits(Command, EventEmitter);

Command.prototype.command = function command(name) {
	this._name = name;
	return this;
}

Command.prototype.option = function option(sn, ln, desc, fn, val) {
	var o = {};
	o.lname = ln;
	o.sname = sn;
	o.description = desc;
	if (Type.isFunction(fn)) {
		o.fn = fn
	}
	else if (!Type.isUndefined(fn)) {
		val = fn
	}
	if (!Type.isUndefined(val))
		o.value = val;
	this._options[o.lname] = o;

	return this;
}


Command.parse = function Parse(cmd) {
	cmd = prepare_command(cmd);
	var arCmd = split_command(cmd);
	var o = {};
	var _param = null;
	for (var i = 0; i < arCmd.length; i++) {
		var word = arCmd[i];
		if (i == 0) {
			o._name = word;
			continue;
		}
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

function get_long_name(name) {
	return get_name(name, /^--(\w+)$/);
}

function get_short_name(name) {
	return get_name(name, /^-(\w+)$/);
}

function get_name(name, reg) {
	var res = null;
	if (res = reg.exec(name)) {
		res = res[1];
	}
	return res;
}

function prepare_command(cmd) {
	var res = cmd.trim();
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
	this.commands = {};
	EventEmitter.call(this);
}
util.inherits(Commander, EventEmitter);

Commander.prototype.createCommand = function (name) {
	var cmd = new Command();
	cmd.command(name);
	this.commands[name] = cmd;
	return cmd;
}

Commander.prototype.parse = function parse(cmd) {
	try {
		cmd = Command.parse(cmd);
		if (cmd._name && cmd._name in this.commands) {
			var _cmd = this.commands[cmd._name];
			var opt = {};
			for (var i in cmd) {
				var prop = cmd[i]
				for (var j in _cmd._options) {
					var _prop = _cmd._options[j];
					if (i == _prop.sname || i == _prop.lname) {
						if (_prop.fn)
							prop = _prop.fn(prop);
						if (Type.isEmpty(prop))
							prop = _prop.value;
						opt[_prop.lname] = prop;
					}
				}
			}
			debug("Run command '"+cmd._name+"'");
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