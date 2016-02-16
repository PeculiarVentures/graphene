interface IInit {
    lib: string;
    libName: string;
    pin: string;
}

interface IControlValues {
    module: {
        manufactureID: string;
        libraryDescription: string;
    },
    token: {
        flags;
        label;
        manufacturerID;
        serialNumber;
        minPinLen;
    }
    slotsCount: number;
}

export let init: IInit;
export let controlValues: IControlValues;