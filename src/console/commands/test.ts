import * as defs from "./defs";
import {Command} from "./defs";
import * as fs from "fs";
const {consoleApp} = defs;

/* ==========
   Test
   ==========*/
function gen_AES(session: defs.Session, len: number): defs.SecretKey {
    return session.generateKey(
        <any>defs.KeyGenMechanism.AES,
        {
            keyType: defs.KeyType.AES,
            token: false,
            modifiable: true,
            valueLen: (len || 128) / 8,
            sign: true,
            verify: true,
            encrypt: true,
            decrypt: true,
            wrap: true,
            unwrap: true
        });
}

function gen_RSA(session: defs.Session, size: number, exp: Buffer = new Buffer([3])): defs.IKeyPair {
    return session.generateKeyPair(
        defs.KeyGenMechanism.RSA,
        {
            keyType: defs.KeyType.RSA,
            token: false,
            modulusBits: size,
            publicExponent: exp,
            wrap: true,
            encrypt: true,
            verify: true
        },
        {
            keyType: defs.KeyType.RSA,
            token: false,
            private: true,
            sign: true,
            decrypt: true,
            unwrap: true
        });
}

function gen_ECDSA(session: defs.Session, name: string, hexOid: string) {
    let keys = session.generateKeyPair(
        defs.KeyGenMechanism.ECDSA,
        {
            keyType: defs.KeyType.ECDSA,
            token: false,
            wrap: true,
            encrypt: true,
            verify: true,
            paramsEC: new Buffer(hexOid, "hex")
        },
        {
            token: false,
            private: true,
            sign: true,
            decrypt: true,
            unwrap: true
        });
    return keys;
}

let gen: {[alg: string]: {[spec: string]: Function}} = {
    rsa: {
        "1024": gen_RSA_1024,
        "2048": gen_RSA_2048,
        "4096": gen_RSA_4096,
    },
    ecdsa: {
        "secp192r1": gen_ECDSA_secp192r1,
        "secp256r1": gen_ECDSA_secp256r1,
        "secp384r1": gen_ECDSA_secp384r1,
        "secp256k1": gen_ECDSA_secp256k1,
        "brainpoolP192r1": gen_ECDSA_brainpoolP192r1,
        "brainpoolP224r1": gen_ECDSA_brainpoolP224r1,
        "brainpoolP256r1": gen_ECDSA_brainpoolP256r1,
        "brainpoolP320r1": gen_ECDSA_brainpoolP320r1
    },
    aes: {
        "128": gen_AES_128,
        "192": gen_AES_192,
        "256": gen_AES_256,
        "cbc128": gen_AES_128,
        "cbc192": gen_AES_192,
        "cbc256": gen_AES_256,
        "gcm128": gen_AES_128,
        "gcm192": gen_AES_192,
        "gcm256": gen_AES_256,
    }
};

function gen_RSA_1024(session: defs.Session): defs.IKeyPair {
    return gen_RSA(session, 1024);
}

function gen_RSA_2048(session: defs.Session) {
    return gen_RSA(session, 2048);
}

function gen_RSA_4096(session: defs.Session) {
    return gen_RSA(session, 4096);
}

function gen_ECDSA_secp192r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-secp192r1", "06082A8648CE3D030101");
}

function gen_ECDSA_secp256r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-secp256r1", "06082A8648CE3D030107");
}

function gen_ECDSA_secp384r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-secp384r1", "06052B81040022");
}

function gen_ECDSA_secp256k1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-secp256k1", "06052B8104000A");
}

function gen_ECDSA_brainpoolP192r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-brainpoolP192r1", "06052B8104000A");
}

function gen_ECDSA_brainpoolP224r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-brainpoolP224r1", "06092B2403030208010105");
}

function gen_ECDSA_brainpoolP256r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-brainpoolP256r1", "06092B2403030208010107");
}

function gen_ECDSA_brainpoolP320r1(session: defs.Session) {
    return gen_ECDSA(session, "test ECDSA-brainpoolP320r1", "06092B2403030208010109");
}

function gen_AES_128(session: defs.Session) {
    return gen_AES(session, 128);
}
function gen_AES_192(session: defs.Session) {
    return gen_AES(session, 192);
}
function gen_AES_256(session: defs.Session) {
    return gen_AES(session, 256);
}

let BUF_SIZE_DEFAULT = 1024;
let BUF_SIZE = 1024;
let BUF_STEP = BUF_SIZE;
let BUF = new Buffer(BUF_STEP);

function test_sign_operation(session: defs.Session, buf: Buffer, key: defs.IKeyPair | defs.Key, algName: string) {
    let sig = session.createSign(algName, (<any>key).privateKey || key);
    for (let i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
        sig.update(buf);
    }
    let res = sig.final();
    return res;
}

function test_verify_operation(session: defs.Session, buf: Buffer, key: defs.IKeyPair | defs.Key, algName: string, sig: Buffer) {
    let verify = session.createVerify(algName, (<any>key).publicKey || key);
    for (let i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
        verify.update(buf);
    }
    let res = verify.final(sig);
    return res;
}

function test_encrypt_operation(session: defs.Session, buf: Buffer, key: defs.IKeyPair | defs.Key, alg: defs.MechanismType) {
    let enc = session.createCipher(alg, (<any>key).publicKey || key);
    let msg = new Buffer(0);
    for (let i = 1; i <= BUF_SIZE; i = i + BUF_STEP) {
        msg = Buffer.concat([msg, enc.update(buf)]);
    }
    msg = Buffer.concat([msg, enc.final()]);
    return msg;
}

function test_decrypt_operation(session: defs.Session, key: defs.IKeyPair | defs.Key, alg: defs.MechanismType, message: Buffer) {
    let decMsg = new Buffer(0);
    let dec = session.createDecipher(alg, (<any>key).privateKey || key);
    decMsg = Buffer.concat([decMsg, dec.update(message)]);
    decMsg = Buffer.concat([decMsg, dec.final()]);
    return decMsg;
}

function test_sign(session: defs.Session, cmd: any, prefix: string, postfix: string, signAlg: string) {
    try {
        let alg = prefix + "-" + postfix;
        if (cmd.alg === "all" || cmd.alg === prefix || cmd.alg === alg) {
            let tGen = new defs.Timer();
            tGen.start();
            let key = gen[prefix][postfix](session);
            tGen.stop();
            // create buffer
            let buf = new Buffer(BUF_SIZE);
            let t1 = new defs.Timer();
            let sig: Buffer = null;
            /**
             * TODO: We need to determine why the first call to the device is so much slower, 
             * it may be the FFI initialization. For now we will exclude this one call from results.
             */
            test_sign_operation(session, buf, key, signAlg);
            t1.start();
            for (let i = 0; i < cmd.it; i++)
                sig = test_sign_operation(session, buf, key, signAlg);
            t1.stop();

            let t2 = new defs.Timer();
            t2.start();
            for (let i = 0; i < cmd.it; i++) {
                test_verify_operation(session, buf, key, signAlg, sig);
            }
            t2.stop();

            let r1 = Math.round((t1.time / cmd.it) * 1000) / 1000 + "ms";
            let r2 = Math.round((t2.time / cmd.it) * 1000) / 1000 + "ms";
            let rs1 = Math.round((1000 / (t1.time / cmd.it)) * 1000) / 1000;
            let rs2 = Math.round((1000 / (t2.time / cmd.it)) * 1000) / 1000;
            print_test_sign_row(alg, r1, r2, rs1, rs2);
        }
        return true;
    }
    catch (e) {
        // debug("%s-%s\n  %s", prefix, postfix, e.message);
    }
    return false;
}

function test_enc(session: defs.Session, cmd: any, prefix: string, postfix: string, encAlg: any) {
    try {
        let alg = prefix + "-" + postfix;
        if (cmd.alg === "all" || cmd.alg === prefix || cmd.alg === alg) {
            let tGen = new defs.Timer();
            tGen.start();
            let key = gen[prefix][postfix](session);
            tGen.stop();
            // debug("Key generation:", alg.toUpperCase(), tGen.time + "ms");
            try {
                let t1 = new defs.Timer();
                // create buffer
                let buf = new Buffer(BUF_SIZE);
                let enc: Buffer = null;
                /**
                 * TODO: We need to determine why the first call to the device is so much slower, 
                 * it may be the FFI initialization. For now we will exclude this one call from results.
                 */
                test_encrypt_operation(session, buf, key, encAlg);
                t1.start();
                for (let i = 0; i < cmd.it; i++)
                    enc = test_encrypt_operation(session, buf, key, encAlg);
                t1.stop();

                let t2 = new defs.Timer();
                t2.start();
                let msg: Buffer = null;
                for (let i = 0; i < cmd.it; i++) {
                    msg = test_decrypt_operation(session, key, encAlg, enc);
                }
                t2.stop();

                let r1 = Math.round((t1.time / cmd.it) * 1000) / 1000 + "ms";
                let r2 = Math.round((t2.time / cmd.it) * 1000) / 1000 + "ms";
                let rs1 = Math.round((1000 / (t1.time / cmd.it)) * 1000) / 1000;
                let rs2 = Math.round((1000 / (t2.time / cmd.it)) * 1000) / 1000;
                print_test_sign_row(alg, r1, r2, rs1, rs2);
            } catch (e) {
                throw e;
            }
        }
        return true;
    }
    catch (e) {
        // debug("%s-%s\n  %s", prefix, postfix, e.message);
        // debug(e.stack);
    }
    return false;
}

function print_test_sign_header() {
    console.log("| %s | %s | %s | %s | %s |", defs.rpud("Algorithm", 25), defs.lpud("Sign", 8), defs.lpud("Verify", 8), defs.lpud("Sign/s", 9), defs.lpud("Verify/s", 9));
    console.log("|%s|%s:|%s:|%s:|%s:|", defs.rpud("", 27, "-"), defs.rpud("", 9, "-"), defs.rpud("", 9, "-"), defs.rpud("", 10, "-"), defs.rpud("", 10, "-"));
}

function print_test_enc_header() {
    console.log("| %s | %s | %s | %s | %s |", defs.rpud("Algorithm", 25), defs.lpud("Encrypt", 8), defs.lpud("Decrypt", 8), defs.lpud("Encrypt/s", 9), defs.lpud("Decrypt/s", 9));
    console.log("|%s|%s:|%s:|%s-:|%s-:|", defs.rpud("", 27, "-"), defs.rpud("", 9, "-"), defs.rpud("", 9, "-"), defs.rpud("", 9, "-"), defs.rpud("", 9, "-"));
}

function print_test_sign_row(alg: string, t1: string, t2: string, ts1: number, ts2: number) {
    console.log("| %s | %s | %s | %s | %s |", defs.rpud(alg.toUpperCase(), 25), defs.lpud(t1, 8), defs.lpud(t2, 8), defs.lpud(ts1, 9), defs.lpud(ts2, 9));
}

export let cmdTest = defs.commander.createCommand("test", {
    description: "benchmark device performance for common algorithms",
    note: defs.NOTE_SESSION
})
    .on("call", function(cmd: any) {
        this.help();
    }) as defs.Command;

function check_sign_algs(alg: string) {
    let list = ["all", "rsa", "rsa-1024", "rsa-2048", "rsa-4096", "ecdsa", "ecdsa-secp192r1", "ecdsa-secp256r1", "ecdsa-secp384r1", "ecdsa-secp256k1",
        "ecdsa-brainpoolP192r1", "ecdsa-brainpoolP224r1", "ecdsa-brainpoolP256r1", "ecdsa-brainpoolP320r1"];
    return list.indexOf(alg) !== -1;
}
function check_enc_algs(alg: string) {
    let list = ["all", "aes", "aes-cbc128", "aes-cbc192", "aes-cbc256", "aes-gcm128", "aes-gcm192", "aes-gcm256"];
    return list.indexOf(alg) !== -1;
}

function check_gen_algs(alg: string) {
    return check_sign_algs(alg) || ["aes", "aes-128", "aes-192", "aes-256"].indexOf(alg) !== -1;
}

function generate_iv(session: defs.Session, block_size: number) {
    let iv = session.generateRandom(block_size);
    if (iv.length !== block_size)
        throw new Error("IV has different size from block_size");
    return iv;
}

function build_gcm_params(iv: Buffer) {
    return new defs.AesGcmParams(iv);
}

/**
 * enc
 */
export let cmdTestEnc = cmdTest.createCommand("enc", {
    description: "test encryption and decryption performance" + "\n\n" +
    defs.pud("", 10) + "    Supported algorithms:\n" +
    defs.pud("", 10) + "      aes, aes-cbc128, aes-cbc192, aes-cbc256" + "\n" +
    defs.pud("", 10) + "      aes-gcm128, aes-gcm192, aes-gcm256" + "\n",
    note: defs.NOTE_SESSION,
    example: "> test enc --alg aes -it 100"
})
    .option("buf", {
        description: "Buffer size (bytes)",
        set: function(v: string) {
            let _v = +v;
            if (!_v)
                throw new TypeError("Parameter --buf must be Number (min 1024)");
            return _v;
        },
        value: BUF_SIZE_DEFAULT
    })
    .option("it", {
        description: "Sets number of iterations. Default 1",
        set: function(v: string) {
            let res = +v;
            if (!defs.isNumber(res))
                throw new TypeError("Parameter --it must be number");
            if (res <= 0)
                throw new TypeError("Parameter --it must be more then 0");
            return res;
        },
        value: 1
    })
    .option("alg", {
        description: "Algorithm name",
        isRequired: true
    })
    .on("call", function(cmd: any) {
        defs.check_session();
        if (!check_enc_algs(cmd.alg)) {
            let error = new Error("No such algorithm");
            throw error;
        }
        console.log();
        print_test_enc_header();
        let AES_CBC_PARAMS = {
            name: "AES_CBC_PAD",
            params: new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
        };
        let AES_GCM_PARAMS = {
            name: "AES_GCM",
            params: build_gcm_params(generate_iv(consoleApp.session, 16))
        };
        test_enc(consoleApp.session, cmd, "aes", "cbc128", AES_CBC_PARAMS);
        test_enc(consoleApp.session, cmd, "aes", "cbc192", AES_CBC_PARAMS);
        test_enc(consoleApp.session, cmd, "aes", "cbc256", AES_CBC_PARAMS);
        test_enc(consoleApp.session, cmd, "aes", "gcm128", AES_GCM_PARAMS);
        test_enc(consoleApp.session, cmd, "aes", "gcm192", AES_GCM_PARAMS);
        test_enc(consoleApp.session, cmd, "aes", "gcm256", AES_GCM_PARAMS);
        console.log();
    });

/**
 * sign
 */
export let cmdTestSign = cmdTest.createCommand("sign", {
    description: "test sign and verification performance" + "\n\n" +
    defs.pud("", 10) + "    Supported algorithms:\n" +
    defs.pud("", 10) + "      rsa, rsa-1024, rsa-2048, rsa-4096" + "\n" +
    defs.pud("", 10) + "      ecdsa, ecdsa-secp192r1, ecdsa-secp256r1, ecdsa-secp384r1," + "\n" +
    defs.pud("", 10) + "      ecdsa-secp256k1, ecdsa-brainpoolP192r1, ecdsa-brainpoolP224r1," + "\n" +
    defs.pud("", 10) + "      ecdsa-brainpoolP256r1, ecdsa-brainpoolP320r1" + "\n",
    note: defs.NOTE_SESSION,
    example: "> test sign --alg rsa-1024 --it 60"
})
    .option("buf", {
        description: "Buffer size (bytes)",
        set: function(v: string) {
            let _v = +v;
            if (!_v)
                throw new TypeError("Parameter --buf must be Number (min 1024)");
            return _v;
        },
        value: BUF_SIZE_DEFAULT
    })
    .option("it", {
        description: "Sets number of iterations. Default 1",
        set: function(v: string) {
            let res = +v;
            if (!defs.isNumber(res))
                throw new TypeError("Parameter --it must be number");
            if (res <= 0)
                throw new TypeError("Parameter --it must be more then 0");
            return res;
        },
        value: 1
    })
    .option("alg", {
        description: "Algorithm name",
        isRequired: true
    })
    .on("call", function(cmd: any) {
        defs.check_session();
        if (!check_sign_algs(cmd.alg)) {
            let error = new Error("No such algorithm");
            throw error;
        }
        console.log();
        print_test_sign_header();
        test_sign(consoleApp.session, cmd, "rsa", "1024", "SHA1_RSA_PKCS");
        test_sign(consoleApp.session, cmd, "rsa", "2048", "SHA1_RSA_PKCS");
        test_sign(consoleApp.session, cmd, "rsa", "4096", "SHA1_RSA_PKCS");
        test_sign(consoleApp.session, cmd, "ecdsa", "secp192r1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "secp256r1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "secp384r1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "secp256k1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "brainpoolP192r1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "brainpoolP224r1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "brainpoolP256r1", "ECDSA_SHA256");
        test_sign(consoleApp.session, cmd, "ecdsa", "brainpoolP320r1", "ECDSA_SHA256");
        console.log();
    });

function test_gen(session: defs.Session, cmd: any, prefix: string, postfix: string) {
    try {
        let alg = prefix + "-" + postfix;
        if (cmd.alg === "all" || cmd.alg === prefix || cmd.alg === alg) {
            let time = 0;
            for (let i = 0; i < cmd.it; i++) {
                let tGen = new defs.Timer();
                tGen.start();
                let key = gen[prefix][postfix](session);
                tGen.stop();
                time += tGen.time;
            }
            let t1 = Math.round((time / cmd.it) * 1000) / 1000 + "ms";
            let t2 = Math.round((1000 / (time / cmd.it)) * 1000) / 1000;
            print_test_gen_row(alg, t1, t2);
            return true;
        }
        return false;
    }
    catch (e) {
        // debug("%s-%s\n  %s", prefix, postfix, e.message);
    }
    return false;
}

function print_test_gen_header() {
    let TEMPLATE = "| %s | %s | %s |";
    console.log(TEMPLATE, defs.rpud("Algorithm", 25), defs.lpud("Generate", 8), defs.lpud("Generate/s", 10));
    console.log("|-%s-|-%s:|-%s:|".replace(/\s/g, "-"), defs.rpud("", 25, "-"), defs.lpud("", 8, "-"), defs.lpud("", 10, "-"));
}

function print_test_gen_row(alg: string, t1: string, t2: number) {
    let TEMPLATE = "| %s | %s | %s |";
    console.log(TEMPLATE, defs.rpud(alg.toUpperCase(), 25), defs.lpud(t1, 8), defs.lpud(t2, 10));
}

/**
 * gen
 */
export let cmdTestGen = cmdTest.createCommand("gen", {
    description: "test key generation performance" + "\n\n" +
    defs.pud("", 10) + "    Supported algorithms:\n" +
    defs.pud("", 10) + "      rsa, rsa-1024, rsa-2048, rsa-4096" + "\n" +
    defs.pud("", 10) + "      ecdsa, ecdsa-secp192r1, ecdsa-secp256r1, ecdsa-secp384r1," + "\n" +
    defs.pud("", 10) + "      ecdsa-secp256k1, ecdsa-brainpoolP192r1, ecdsa-brainpoolP224r1," + "\n" +
    defs.pud("", 10) + "      ecdsa-brainpoolP256r1, ecdsa-brainpoolP320r1" + "\n" +
    defs.pud("", 10) + "      aes, aes-cbc128, aes-cbc192, aes-cbc256",
    note: defs.NOTE_SESSION,
    example: "> test gen --alg rsa-1024 --it 2"
})
    .option("it", {
        description: "Sets number of iterations. Default 1",
        set: function(v: string) {
            let res = +v;
            if (!defs.isNumber(res))
                throw new TypeError("Parameter --it must be number");
            if (res <= 0)
                throw new TypeError("Parameter --it must be more then 0");
            return res;
        },
        value: 1
    })
    .option("alg", {
        description: "Algorithm name",
        isRequired: true
    })
    .on("call", function(cmd: any) {
        defs.check_session();
        if (!check_gen_algs(cmd.alg)) {
            let error = new Error("No such algorithm");
            throw error;
        }
        console.log();
        print_test_gen_header();

        // sign
        test_gen(consoleApp.session, cmd, "rsa", "1024");
        test_gen(consoleApp.session, cmd, "rsa", "2048");
        test_gen(consoleApp.session, cmd, "rsa", "4096");
        test_gen(consoleApp.session, cmd, "ecdsa", "secp192r1");
        test_gen(consoleApp.session, cmd, "ecdsa", "secp256r1");
        test_gen(consoleApp.session, cmd, "ecdsa", "secp384r1");
        test_gen(consoleApp.session, cmd, "ecdsa", "secp256k1");
        test_gen(consoleApp.session, cmd, "ecdsa", "brainpoolP192r1");
        test_gen(consoleApp.session, cmd, "ecdsa", "brainpoolP224r1");
        test_gen(consoleApp.session, cmd, "ecdsa", "brainpoolP256r1");
        test_gen(consoleApp.session, cmd, "ecdsa", "brainpoolP320r1");

        // enc
        test_gen(consoleApp.session, cmd, "aes", "128");
        test_gen(consoleApp.session, cmd, "aes", "192");
        test_gen(consoleApp.session, cmd, "aes", "256");
        console.log();
    }) as defs.Command;
