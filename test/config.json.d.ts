interface IInit {
    lib: string;
    libName: string;
    pin: string;
    vendor?: string;
}

interface IControlValues {
    module: {
        manufactureID: string;
        libraryDescription: string;
    };
    slot: {
        slotIndex: number;
        token: {
            flags: number;
            label: string;
            manufacturerID: string;
            serialNumber: string;
            minPinLen: number;
        };
        mechanisms: number;
    };
    slotsCount: number;
}

export let init: IInit;
export let controlValues: IControlValues;