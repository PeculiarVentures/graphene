import os from "os";

let lib = "/usr/local/lib/softhsm/libsofthsm2.so";
switch (os.platform()) {
    case "darwin": // macOS
        lib = "/usr/local/lib/softhsm/libsofthsm2.so";
        break;
    case "linux":
        lib = "/usr/lib/softhsm/libsofthsm2.so";
        break;
    case "win32": // Windows
        lib = "C:\\SoftHSM2\\lib\\softhsm2-x64.dll";
        break;
}
export default {
    init: {
        lib,
        libName: "SoftHSM",
        pin: "12345",
        vendor: "",
    },
    controlValues: {
        module: {
            manufacturerID: "SoftHSM",
            libraryDescription: "Implementation of PKCS11",
        },
        slot: {
            slotIndex: 0,
            token: {
                flags: 1069,
                label: "My slot 0",
                manufacturerID: "SoftHSM project",
                serialNumber: "1a918b5db0a83cb1",
                minPinLen: 4,
            },
        },
        slotsCount: 2,
    },
};
