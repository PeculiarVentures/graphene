import * as defs from "./defs";

/**
 * Prints caption to stdout with underline
 * 
 * ### View:
 * ```
 * <name>
 * ===================================
 * ```
 * @param name name of caption
 */
export function print_caption(name: string) {
    console.log(`\n${name}\n${defs.CAPTION_UNDERLINE}\n`);
}

/**
 * Adds symbols to String, default symbol is white space
 * @param text Source string value
 * @param size Final size of string
 * @param padChar Padding char. Optional. Default is ' '
 * @param {string} begin=false Padding direction. Boolean value which set left o right direction. False - right padding, true - left padding. Optional. Default false
 */
export function pud(text: string, size: number, padChar = " ", begin: boolean = false) {
    let res: string, pad = "";
    if (typeof text !== "string")
        text = <any> new String(text);
    if (text.length < size) {
        for (let i = 0; i < (size - text.length); i++)
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

/**
 * Adds padding from left
 * @param text Source string value
 * @param size Final size of string
 * @param padChar Padding char. Optional. Default is ' '
 */
export function lpud(text: any, size: number, padChar?: string) {
    return pud(text, size, padChar, true);
}

/**
 * Adds padding from right
 * @param text Source string value
 * @param size Final size of string
 * @param padChar Padding char. Optional. Default is ' '
 */
export function rpud(text: any, size: number, padChar?: string) {
    return pud(text, size, padChar, false);
}

/**
 * Prints Boolean. X - true, ' ' - false
 * @param {bolean} v
 */
export function print_bool(v: number) {
    return v ? "x" : " ";
}