var defs = require("./defs");
function print_caption(name) {
    console.log("\n" + name + "\n" + defs.CAPTION_UNDERLINE + "\n");
}
exports.print_caption = print_caption;
function pud(text, size, padChar, begin) {
    if (padChar === void 0) { padChar = " "; }
    if (begin === void 0) { begin = false; }
    var res, pad = "";
    if (typeof text !== "string")
        text = new String(text);
    if (text.length < size) {
        for (var i = 0; i < (size - text.length); i++)
            pad += padChar;
    }
    if (!begin) {
        res = text + pad;
    }
    else {
        res = pad + text;
    }
    return res;
}
exports.pud = pud;
function lpud(text, size, padChar) {
    return pud(text, size, padChar, true);
}
exports.lpud = lpud;
function rpud(text, size, padChar) {
    return pud(text, size, padChar, false);
}
exports.rpud = rpud;
function print_bool(v) {
    return v ? "x" : " ";
}
exports.print_bool = print_bool;
