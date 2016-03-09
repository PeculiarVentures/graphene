"use strict";
function dateFromString(text) {
    var reg = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
    var vals = reg.exec(text);
    if (!vals)
        throw new TypeError("Wrong inpot UTC string");
    return new Date(vals[1] + "-" + vals[2] + "-" + vals[3] + " " + vals[4] + ":" + vals[5] + ":" + vals[6] + ":" + vals[7]);
}
exports.dateFromString = dateFromString;
