import * as core from "../../core";
import {CommandError, ICommand} from "./error";
import {EventEmitter} from "events";

export interface IDescription {
    description?: string;
    note?: string;
    example?: string;
}

export interface IOptionParam {
    shortName?: string;
    type?: string;
    description?: string;
    isRequired?: boolean;
    value?: any;
    set?: (value: any) => any;
}

export interface IOption extends IOptionParam {
    longName: string;
}

export interface IOptionArray {
    [name: string]: IOption;
}

export interface ICommandArray {
    [name: string]: Command;
}

export class Command extends EventEmitter implements IDescription, ICommand {

    options: IOptionArray = {};
    commands: ICommandArray = {};
    name: string;
    description: string;
    note: string;
    example: string;

    constructor(name: string, desc: string | IDescription) {
        super();
        this.name = name;

        if (core.isObject(desc)) {
            let _desc = desc as IDescription;
            this.description = _desc.description;
            this.note = _desc.note;
            this.example = _desc.example;
        }
        else
            this.description = desc as string || "";
    }

    option(longName: string, param: IOptionParam) {
        let o: IOption = {
            longName: longName,
            shortName: param.shortName || longName.charAt(0),
            description: param.description || "",
            type: param.type || null,
            value: param.value,
            isRequired: (core.isEmpty(param.value) && param.isRequired === true),
            set: param.set || ((v) => { return v; })
        };
        this.options[o.longName] = o;
        return this;
    }

    help() {
        console.log();
        this.print("description");
        this.print("usage");
        this.print("commands");
        this.print("note");
        this.print("example");
    }

    createCommand(name: string, desc: IDescription): Command;
    createCommand(name: string, desc: string): Command;
    createCommand(name: string, desc: string | IDescription): Command {
        let cmd = new Command(name, desc);
        cmd.createCommandHelp();
        this.commands[name] = cmd;
        return cmd;
    }

    createCommandHelp() {
        let that = this;
        let cmd = new Command("?", "output usage information");
        cmd.on("call", () => {
            that.help();
        });

        this.commands["?"] = cmd;
    }

    print(block: string) {
        switch (block) {
            case "description":
                if (this.description) {
                    console.log("  " + this.description);
                    console.log();
                }
                break;
            case "usage":
                if (Object.keys(this.options).length) {
                    let params = "";
                    for (let i in this.options) {
                        let opt = this.options[i];
                        params += " --" + opt.longName;
                    }
                    console.log("  Usage: " + this.name + params);
                    console.log();
                    for (let i in this.options) {
                        let opt = this.options[i];
                        console.log("    --" + pud(opt.longName + (opt.type ? "<" + opt.type + ">" : ""), 8) + opt.description);
                    }
                    console.log();
                }
                break;
            case "commands":
                /**
                 * Prints list of commands
                 * Don't print if only one command "?"
                 */
                if (Object.keys(this.commands).length > 1) {
                    console.log("  Commands:");
                    console.log();
                    for (let i in this.commands) {
                        let cmd = this.commands[i];
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
    }

    static parse(cmd: string) {
        cmd = prepare_command(cmd);
        let arCmd = split_command(cmd);
        let o: any = {
            commands: []
        };
        let _param: string = null;
        let fCommand = true;
        for (let i = 0; i < arCmd.length; i++) {
            let word = arCmd[i];
            let _cmd = get_command_name(word);
            if (fCommand && _cmd) {
                o.commands.push(_cmd);
                continue;
            }
            fCommand = false;
            let name = get_long_name(word) || get_short_name(word);
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
}


function get_command_name(name: string) {
    return get_name(name, /^(\w[\w-]*|\?)$/i);
}

function get_long_name(name: string) {
    return get_name(name, /^--(\w[\w-]*|\?)$/i);
}

function get_short_name(name: string) {
    return get_name(name, /^-(\w[\w-]*|\?)$/i);
}

function get_name(name: string, reg: RegExp) {
    let res: string[] = null;
    if (res = reg.exec(name)) {
        return res[1];
    }
    return null;
}

function prepare_command(cmd: string) {
    let res = trim_str(cmd);
    return res;
}

function trim_str(s: string) {
    let res = "";
    let fSpace = true;
    for (let i = 0; i <= s.length; i++) {
        let c = s.charAt(i);
        if (c === " ")
            if (fSpace)
                continue;
            else
                fSpace = true;
        else
            fSpace = false;
        res += c;
    }
    let rtrim = /(\s+)$/;
    res = res.replace(rtrim, "");
    return res;
}

/**
 * Splits command by SPACE, ingnore SPACE into quotes
 */
function split_command(cmd: string) {
    let res: string[] = [];
    let _found = false;
    let _quote = false;
    let str = "";
    for (let i = 0; i < cmd.length; i++) {
        let char = cmd.charAt(i);
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

export class Commander extends EventEmitter implements ICommand {
    commands: ICommandArray = {};
    options: IOptionArray = {};
    name: string;

    createCommand(name: string, desc: IDescription): Command;
    createCommand(name: string, desc: string): Command;
    createCommand(name: string, desc: any): Command {
        let cmd = new Command(name, desc);
        cmd.createCommandHelp();
        this.commands[name] = cmd;
        return cmd;
    }

    print(s: string) {
    }

    parse(cmd: string) {
        try {
            let command = Command.parse(cmd);
            if (command.commands.length) {
                let that = this;
                // Find command
                for (let i in command.commands) {
                    let item = command.commands[i];
                    if (item in that.commands) {
                        that = <any>that.commands[item];
                        if (that.name === "?") {
                            that.emit("call", {});
                            return;
                        }
                    }
                    else {
                        throw new CommandError(that, `Unknown command in use '${item}'`);
                    }
                }

                let opt: {[longName: string]: string} = {};
                for (let i in that.options) {
                    let _prop = that.options[i];
                    if (_prop.shortName in command || _prop.longName in command) {
                        let prop = _prop.shortName in command ? command[_prop.shortName] : command[_prop.longName];
                        prop = _prop.set(prop);
                        if (core.isEmpty(prop))
                            prop = _prop.value;
                        opt[_prop.longName] = prop;
                    } else {
                        if (_prop.isRequired) {
                            throw new CommandError(that, `Parameter --${_prop.longName} is required`);
                        }
                        opt[_prop.longName] = _prop.value;
                    }
                }
                that.emit("call", opt);
            }
            else {
                if (command["name"])
                    this.emit("error", new Error(`Unknown command in use '${command["name"]}'`));
            }
        } catch (e) {
            this.emit("error", e);
        }
    }
}

/**
 * formats text with paddings
 * @param  {string} text
 * @param  {number} size
 * @param  {string=""} spaceChar
 * @param  {boolean=false} end if true - puts padding chars to the end, else to the begin
 */
function pud(text: string, size: number, spaceChar: string = " ", end: boolean = false) {
    if (!spaceChar) spaceChar = " ";
    let res: string, pad = "";
    if (text.length < size) {
        for (let i = 0; i < (size - text.length); i++)
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

export let commander = new Commander(); 