import * as fs from "fs";
import * as graphene from "../../graphene";
export * from "../../graphene";
export {Mechanism} from "../../mech";
export {commander, Command} from "../lib/commander";
export * from "./print";
import * as print from "./print";
export * from "../lib/timer";
export * from "../../core";

// Constants
export const CAPTION_UNDERLINE = "==============================";

export const MODULE_NOTE = "all commands require you to first load the PKCS #11 module";
export const MODULE_EXAMPLE = "> module load -l {/path/to/pkcs11/lib/name.so} -n {LibName}";

export const NOTE = MODULE_NOTE + "\n\n    Example:\n\n      " + MODULE_EXAMPLE;
export const NOTE_SESSION = "all commands require you to first load the PKCS #11 module and log in." + "\n\n" +
    "    Example:" + "\n\n" +
    "      " + MODULE_EXAMPLE + "\n" +
    "      > slot open --slot 0 --pin {YourPIN}";

export const ERROR_MODULE_NOT_INITIALIZED = "Module is not initialized\n\n" +
    "Note:\n" +
    "  " + MODULE_NOTE + "\n\n" +
    "Example:\n" +
    "  " + MODULE_EXAMPLE;

export interface IConsoleApplication {
    module: graphene.Module;
    slots: graphene.SlotCollection;
    session: graphene.Session;
}

export const consoleApp: IConsoleApplication = {
    module: null,
    session: null,
    slots: null
};

/**
 * Checks module was initialized
 */
export function check_module() {
    if (!consoleApp.module)
        throw new Error(ERROR_MODULE_NOT_INITIALIZED);
}

/**
 * Checks input file path. Throw exception if file is not exist
 */
export function check_file(v: string): string {
    if (!fs.existsSync(v) || !fs.statSync(v).isFile())
        throw new Error(`File is not found`);
    return v;
}

/**
 * Global options
 */
export const options = {
    slot: {
        description: "Slot index in Module",
        set: (v: any) => {
            check_module();
            if (!consoleApp.slots)
                get_slot_list();
            let slot = consoleApp.slots.items(v);
            if (!slot)
                throw new Error("Can not find Slot by index '" + v + "'");
            return <any>slot;
        },
        isRequired: true
    },
    pin: {
        description: "The PIN for the slot",
        type: "pin"
    }
};

export function get_slot_list() {
    check_module();
    consoleApp.slots = consoleApp.module.getSlots(true); // with token present
}

export function check_session() {
    if (!(consoleApp.session)) {
        let error = new Error("Session is not opened" + "\n\n" +
            "  " + NOTE_SESSION);
        throw error;
    }
}

export function print_module_info(mod: graphene.Module) {
    print.print_caption("Module info");
    console.log(`  Library: ${mod.libFile}`);
    console.log(`  Name: ${mod.libName}`);
    console.log(`  Cryptoki version: ${mod.cryptokiVersion.major}.${mod.cryptokiVersion.minor}`);
    console.log();
}

export function print_slot_info(slot: graphene.Slot) {
    print.print_caption("Slot info");
    console.log(`  Description: ${slot.slotDescription}`);
    console.log(`  Manufacturer ID: ${slot.manufacturerID}`);
    console.log(`  Firm version: ${slot.firmwareVersion.major}.${slot.firmwareVersion.minor}`);
    console.log(`  Hardware version: ${slot.hardwareVersion.major}.${slot.hardwareVersion.minor}`);
    console.log(`  Flags:`);
    console.log(`      HW: ${!!(slot.flags & graphene.SlotFlag.HW_SLOT)}`);
    console.log(`      Removable device: ${!!(slot.flags & graphene.SlotFlag.REMOVABLE_DEVICE)}`);
    console.log(`      Token present: ${!!(slot.flags & graphene.SlotFlag.TOKEN_PRESENT)}`);
    if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
        console.log(`  Token:`);
        const token = slot.getToken();
        console.log(`      Label: ${token.label}`);
        console.log(`      Manufacturer ID: ${token.manufacturerID}`);
        console.log(`      Model: ${token.model}`);
        console.log(`      Serial number: ${token.serialNumber}`);
        console.log(`      Max PIN length: ${token.maxPinLen}`);
        console.log(`      Min PIN length: ${token.minPinLen}`);
        console.log(`      Max session count: ${token.maxSessionCount}`);
        console.log(`      Session count: ${token.sessionCount}`);
        console.log(`      Max RW session count: ${token.maxRwSessionCount}`);
        console.log(`      RW session count: ${token.rwSessionCount}`);
        console.log(`      Total private memory: ${token.totalPrivateMemory}`);
        console.log(`      Free private memory: ${token.freePrivateMemory}`);
        console.log(`      Total public memory: ${token.totalPublicMemory}`);
        console.log(`      Free public memory: ${token.freePublicMemory}`);
        console.log(`      Firm version: ${slot.firmwareVersion.major}.${slot.firmwareVersion.minor}`);
        console.log(`      Hardware version: ${slot.hardwareVersion.major}.${slot.hardwareVersion.minor}`);
        console.log(`      Flags:`);
        console.log(`          Initialized: ${!!(token.flags & graphene.TokenFlag.TOKEN_INITIALIZED)}`);
        console.log(`          Logged in: ${!!(token.flags & graphene.TokenFlag.USER_PIN_INITIALIZED)}`);
    }
    console.log();
}