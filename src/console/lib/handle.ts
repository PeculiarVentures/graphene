
export class Handle {

    /**
     * Converts PKCS11 Handle to string 
     * 
     * @static
     * @param {Buffer} buffer
     * @returns {string}
     */
    static toString(buffer: Buffer): string {
        let buf = new Buffer(8);
        buf.fill(0);
        for (let i = 0; i < buffer.length; i++)
            buf[i] = buffer[i];
        return buffer_to_hex(revert_buffer(buf));
    }

    /**
     * Converts hex value to PKCS11 Handle  
     * 
     * @static
     * @param {string} hex
     * @returns {Buffer}
     */
    static toBuffer(hex: string): Buffer {
        return revert_buffer(new Buffer(prepare_hex(hex), "hex"));
    }
}

/**
 * Adds 0 if hex value has odd length
 * 
 * @param {string} hex
 * @returns
 */
function prepare_hex(hex: string) {
    let res = hex;
    while (res.length < 16) {
        res = "0" + res;
    }
    return res;
}

/**
 * Reverts Buffer
 * 
 * @param {Buffer} buffer
 * @returns
 */
function revert_buffer(buffer: Buffer) {
    if (buffer.length > 8)
        throw new TypeError("Wrong Buffer size");
    let b = new Buffer(8);
    b.fill(0);
    for (let i = 0; i < buffer.length; i++) {
        b[buffer.length - 1 - i] = buffer[i];
    }
    return b;
}

/**
 * Converts Buffer to string and cut all 0s from the begining 
 * 
 * @param {Buffer} buffer
 * @returns
 */
function buffer_to_hex(buffer: Buffer) {
    return buffer.toString("hex").replace(/^0*/, "");
}