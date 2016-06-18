export * from "./pkcs11t";
import * as CKT from "./pkcs11t";
import * as core from "../core";
import * as FFI from "ffi";
import * as Ref from "ref";
import {CK_FUNCTIONS} from "./pkcs11f";

export const NULL_PTR = null;

export type CK_PTR = Buffer;

/**
 * callback function for PKCS11 functions
 */
export type Callback = (err: Error, rv: number) => void;

export class Pkcs11 {

    private functionList: any = null;
    lib: any;
    /**
     * load a library with PKCS11 interface
     * @param {string} libFile path to PKCS11 library 
     */
    constructor(libFile: string) {
        Object.defineProperty(this, "lib", {
            writable: true
        });
        (<any>this).lib = FFI.Library(libFile, <any>CK_FUNCTIONS);
    }

    protected callFunction(funcName: string, args): number {
        let func = this.functionList ? this.functionList[`CK_${funcName}`] : this.lib[funcName];
        if (typeof args[args.length - 1] === "function")
            func.async.apply(this, args);
        else
            return func.apply(this, args);
    }

    public getFunctionList(): void {
        let $funcs = Ref.alloc(CKT.CK_FUNCTION_LIST_PTR);
        let rv = this.lib.C_GetFunctionList($funcs);
        if (rv) throw new core.Pkcs11Error(rv, "C_GetFunctionList");

        this.functionList = $funcs.deref().deref();
    }

    /**
     * C_GetFunctionList obtains a pointer to the Cryptoki library's list of function pointers.
     * @param {Buffer}  ppFunctionList points to a value which will receive a pointer to the 
     *                  library's `CK_FUNCTION_LIST` structure, which in turn contains function 
     *                  pointers for all the Cryptoki API routines in the library. 
     *                  The pointer thus obtained may point into memory which is owned 
     *                  by the Cryptoki library, and which may or may not be writable. 
     *                  Whether or not this is the case, no attempt should be made to write 
     *                  to this memory.
     */
    C_GetFunctionList(ppFunctionList: CK_PTR): number;
    C_GetFunctionList(ppFunctionList: CK_PTR, callback: Callback): number;
    C_GetFunctionList(ppFunctionList: CK_PTR, callback?: Callback): number {
        return this.callFunction("C_GetFunctionList", callback ? [ppFunctionList, callback] : [ppFunctionList]);
    }

    /**
     * C_Initialize initializes the Cryptoki library.
     * @param pInitArgs   if this is not NULL_PTR, it gets
     *                    cast to CK_C_INITIALIZE_ARGS_PTR
     *                    and dereferenced
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Initialize(pInitArgs?: CK_PTR): number;
    C_Initialize(pInitArgs: CK_PTR, callback: Callback): void;
    C_Initialize(pInitArgs: CK_PTR = NULL_PTR, callback?: Callback): number {
        return this.callFunction("C_Initialize", callback ? [pInitArgs, callback] : [pInitArgs]);
    }

    /**
     * C_Finalize indicates that an application is done with the Cryptoki library.
     * @param pReserved   reserved. Should be NULL_PTR 
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Finalize(pReserved?: CK_PTR): number;
    C_Finalize(pReserved: CK_PTR, callback: Callback): void;
    C_Finalize(pReserved: CK_PTR = NULL_PTR, callback?: Callback): number {
        return this.callFunction("C_Finalize", callback ? [pReserved, callback] : [pReserved]);
    }

    /**
     * C_GetInfo returns general information about Cryptoki. 
     * @param pInfo       location that receives information
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetInfo(pInfo: CK_PTR): number;
    C_GetInfo(pInfo: CK_PTR, callback: Callback): void;
    C_GetInfo(pInfo: CK_PTR, callback?: Callback): number {
        return this.callFunction("C_GetInfo", arguments);
    }

    /** 
     * C_GetSlotList obtains a list of slots in the system.
     * @param {boolean} tokenPresent only slots with tokens?
     * @param pSlotList receives array of slot IDs
     * @param pulCount receives number of slots
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetSlotList(tokenPresent: boolean, pSlotList: CK_PTR, pulCount: CK_PTR): number;
    C_GetSlotList(tokenPresent: boolean, pSlotList: CK_PTR, pulCount: CK_PTR, callback: Callback): void;
    C_GetSlotList(tokenPresent: boolean, pSlotList: CK_PTR, pulCount: CK_PTR): number {
        return this.callFunction("C_GetSlotList", arguments);
    }

    /** 
     * C_GetSlotInfo obtains information about a particular slot in
     * the system.
     * @param {number} slotID the ID of the slot
     * @param {Buffer} pInfo receives the slot information 
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetSlotInfo(slotID: number, pInfo: CK_PTR): number;
    C_GetSlotInfo(slotID: number, pInfo: CK_PTR, callback: Callback): void;
    C_GetSlotInfo(slotID: number, pInfo: CK_PTR, callback?: Callback): number {
        return this.callFunction("C_GetSlotInfo", arguments);
    }

    /** 
     * C_GetTokenInfo obtains information about a particular token
     * in the system.
     * @param {number} slotID ID of the token's slot
     * @param {Buffer} pInfo receives the token information
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetTokenInfo(slotID: number, pInfo: Buffer): number;
    C_GetTokenInfo(slotID: number, pInfo: Buffer, callback: Callback): void;
    C_GetTokenInfo(slotID: number, pInfo: Buffer, callback?: Callback): number {
        return this.callFunction("C_GetTokenInfo", arguments);
    }

    /**
     * C_GetMechanismList obtains a list of mechanism types
     * supported by a token. 
     * @param {number} slotID ID of the token's slot
     * @param {number} pMechanismList gets mech. array
     * @param {number} pulCount gets # of mechs
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetMechanismList(slotID: number, pMechanismList: Buffer, pulCount: Buffer): number;
    C_GetMechanismList(slotID: number, pMechanismList: Buffer, pulCount: Buffer, callback: Callback): void;
    C_GetMechanismList(slotID: number, pMechanismList: Buffer, pulCount: Buffer, callback?: Callback): number {
        return this.callFunction("C_GetMechanismList", arguments);
    }

    /** C_GetMechanismInfo obtains information about a particular
     * mechanism possibly supported by a token. 
     * @param {number} slotID ID of the token's slot
     * @param {number} type type of mechanism
     * @param {Buffer} pInfo receives mechanism info
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetMechanismInfo(slotID: number, type: number, pInfo: Buffer): number;
    C_GetMechanismInfo(slotID: number, type: number, pInfo: Buffer, callback: Callback): void;
    C_GetMechanismInfo(slotID: number, type: number, pInfo: Buffer, callback?: Callback): number {
        return this.callFunction("C_GetMechanismInfo", arguments);
    }

    /** 
     * C_InitToken initializes a token. 
     * @param {number} slotID ID of the token's slot
     * @param {Buffer} pPin the SO's initial PIN
     * @param {number} ulPinLen length in bytes of the PIN
     * @param {number} pLabel 32-byte token label (blank padded)
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_InitToken(slotID: number, pPin: Buffer, ulPinLen: number, pLabel: Buffer): number;
    C_InitToken(slotID: number, pPin: Buffer, ulPinLen: number, pLabel: Buffer, callback: Callback): void;
    C_InitToken(slotID: number, pPin: Buffer, ulPinLen: number, pLabel: Buffer, callback?: Callback): number {
        return this.callFunction("C_InitToken", arguments);
    }

    /**
     * C_InitPIN initializes the normal user's PIN.
     * @param {number} hSession the session's handle 
     * @param {Buffer} pPin the normal user's PIN 
     * @param {number} ulPinLen length in bytes of the PIN
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_InitPIN(hSession: number, pPin: Buffer, ulPinLen: number): number;
    C_InitPIN(hSession: number, pPin: Buffer, ulPinLen: number, callback: Callback): void;
    C_InitPIN(hSession: number, pPin: Buffer, ulPinLen: number, callback?: Callback): number {
        return this.callFunction("C_InitPIN", arguments);
    }

    /** 
     * C_SetPIN modifies the PIN of the user who is logged in. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pOldPin the old PIN 
     * @param {number} ulOldLen length of the old PIN 
     * @param {Buffer} pNewPin the new PIN 
     * @param {number} ulNewLen length of the new PIN 
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SetPIN(hSession, pOldPin: Buffer, ulOldLen: number, pNewPin: Buffer, ulNewLen: number): number;
    C_SetPIN(hSession, pOldPin: Buffer, ulOldLen: number, pNewPin: Buffer, ulNewLen: number, callback: Callback): void;
    C_SetPIN(hSession, pOldPin: Buffer, ulOldLen: number, pNewPin: Buffer, ulNewLen: number, callback?: Callback): number {
        return this.callFunction("C_SetPIN", arguments);
    }

    /* Session management */

    /**
     * C_OpenSession opens a session between an application and a
     * token. 
     * @param {number} slotID ID of the token's slot
     * @param {number} flags from CK_SESSION_INFO
     * @param {Buffer} pApplication passed to callback
     * @param {Buffer} Notify callback function
     * @param {Buffer} phSession gets session handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_OpenSession(slotID: number, flags: number, pApplication?: Buffer, notify?: Buffer, phSession?: Buffer): number;
    C_OpenSession(slotID: number, flags: number, pApplication: Buffer, notify: Buffer, phSession: Buffer, callback: Callback): void;
    C_OpenSession(slotID: number, flags: number, pApplication: Buffer = NULL_PTR, notify: Buffer = NULL_PTR, phSession: Buffer = NULL_PTR, callback?: Callback): number {
        return this.callFunction("C_OpenSession", callback ? [slotID, flags, pApplication, notify, phSession, callback] : [slotID, flags, pApplication, notify, phSession]);
    }

    /**
     * C_CloseSession closes a session between an application and a token. 
     * @param {number} hSession the session's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_CloseSession(hSession: number): number;
    C_CloseSession(hSession: number, callback: Callback): void;
    C_CloseSession(hSession: number, callback?: Callback): number {
        return this.callFunction("C_CloseSession", arguments);
    }

    /** 
     * C_CloseAllSessions closes all sessions with a token. 
     * @param {number} slotID ID of the token's slot
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_CloseAllSessions(slotID: number): number;
    C_CloseAllSessions(slotID: number, callback: Callback): void;
    C_CloseAllSessions(slotID: number, callback?: Callback): number {
        return this.callFunction("C_CloseAllSessions", arguments);
    }

    /**
     * C_GetSessionInfo obtains information about the session. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pInfo receives session info
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_GetSessionInfo(hSession: number, pInfo: Buffer): number;
    C_GetSessionInfo(hSession: number, pInfo: Buffer, callback: Callback): void;
    C_GetSessionInfo(hSession: number, pInfo: Buffer, callback?: Callback): number {
        return this.callFunction("C_GetSessionInfo", arguments);
    }

    /**
     * C_GetOperationState obtains the state of the cryptographic operation in a session. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pOperationState gets state
     * @param {Buffer} pulOperationStateLen gets state length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetOperationState(hSession: number, pOperationState: Buffer, pulOperationStateLen: Buffer): number;
    C_GetOperationState(hSession: number, pOperationState: Buffer, pulOperationStateLen: Buffer, callback: Callback): void;
    C_GetOperationState(hSession: number, pOperationState: Buffer, pulOperationStateLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_GetOperationState", arguments);
    }

    /**
     * C_SetOperationState restores the state of the cryptographic operation in a session. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pOperationState holds state
     * @param {number} ulOperationStateLen holds holds state length
     * @param {number} hEncryptionKey en/decryption key
     * @param {number} hAuthenticationKey sign/verify key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SetOperationState(hSession: number, pOperationState: Buffer, ulOperationStateLen: number, hEncryptionKey: number, hAuthenticationKey: number): number;
    C_SetOperationState(hSession: number, pOperationState: Buffer, ulOperationStateLen: number, hEncryptionKey: number, hAuthenticationKey: number, callback: Callback): void;
    C_SetOperationState(hSession: number, pOperationState: Buffer, ulOperationStateLen: number, hEncryptionKey: number, hAuthenticationKey: number, callback?: Callback): number {
        return this.callFunction("C_SetOperationState", arguments);
    }

    /**
     * C_Login logs a user into a token. 
     * @param {number} hSession the session's handle 
     * @param {number} userType the user type 
     * @param {Buffer} pPin the user's PIN
     * @param {number} ulPinLen the length of the PIN
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Login(hSession: number, userType: number, pPin: Buffer, ulPinLen: number): number;
    C_Login(hSession: number, userType: number, pPin: Buffer, ulPinLen: number, callback: Callback): void;
    C_Login(hSession: number, userType: number, pPin: Buffer, ulPinLen: number, callback?: Callback): number {
        return this.callFunction("C_Login", arguments);
    }

    /** 
     * C_Logout logs a user out from a token. 
     * @param {number} hSession the session's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_Logout(hSession: number): number;
    C_Logout(hSession: number, callback: Callback): void;
    C_Logout(hSession: number, callback?: Callback): number {
        return this.callFunction("C_Logout", arguments);
    }

    /* Object management */

    /**
     * C_CreateObject creates a new object. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pTemplate the object's template 
     * @param {number} ulCount attributes in template 
     * @param {Buffer} phObject gets new object's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_CreateObject(hSession: number, pTemplate: Buffer, ulCount: number, phObject: Buffer): number;
    C_CreateObject(hSession: number, pTemplate: Buffer, ulCount: number, phObject: Buffer, callback: Callback): void;
    C_CreateObject(hSession: number, pTemplate: Buffer, ulCount: number, phObject: Buffer, callback?: Callback): number {
        return this.callFunction("C_CreateObject", arguments);
    }

    /** 
     * C_CopyObject copies an object, creating a new object for the copy. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pTemplate template for new object 
     * @param {number} ulCount attributes in template 
     * @param {Buffer} phNewObject receives handle of copy
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_CopyObject(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, phNewObject: Buffer): number;
    C_CopyObject(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, phNewObject: Buffer, callback: Callback): void;
    C_CopyObject(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, phNewObject: Buffer, callback?: Callback): number {
        return this.callFunction("C_CopyObject", arguments);
    }

    /** 
     * C_DestroyObject destroys an object. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_DestroyObject(hSession: number, hObject: number): number;
    C_DestroyObject(hSession: number, hObject: number, callback: Callback): void;
    C_DestroyObject(hSession: number, hObject: number, callback?: Callback): number {
        return this.callFunction("C_DestroyObject", arguments);
    }

    /** 
     * C_GetObjectSize gets the size of an object in bytes. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pulSize receives size of object
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_GetObjectSize(hSession: number, hObject: number, pulSize: Buffer): number;
    C_GetObjectSize(hSession: number, hObject: number, pulSize: Buffer, callback: Callback): void;
    C_GetObjectSize(hSession: number, hObject: number, pulSize: Buffer, callback?: Callback): number {
        return this.callFunction("C_GetObjectSize", arguments);
    }

    /** 
     * C_GetAttributeValue obtains the value of one or more object attributes. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pTemplate specifies attrs; gets vals 
     * @param {number} ulCount attributes in template
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number): number;
    C_GetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, callback: Callback): void;
    C_GetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, callback?: Callback): number {
        return this.callFunction("C_GetAttributeValue", arguments);
    }

    /**
     * C_SetAttributeValue modifies the value of one or more object attributes 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pTemplate specifies attrs and values 
     * @param {number} ulCount attributes in template
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number): number;
    C_SetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, callback: Callback): void;
    C_SetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, callback?: Callback): number {
        return this.callFunction("C_SetAttributeValue", arguments);
    }

    /**
     * C_FindObjectsInit initializes a search for token and session
     * objects that match a template. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pTemplate attribute values to match 
     * @param {number} ulCount attrs in search template
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_FindObjectsInit(hSession: number, pTemplate: Buffer, ulCount: number): number;
    C_FindObjectsInit(hSession: number, pTemplate: Buffer, ulCount: number, callback: Callback): void;
    C_FindObjectsInit(hSession: number, pTemplate: Buffer, ulCount: number, callback?: Callback): number {
        return this.callFunction("C_FindObjectsInit", arguments);
    }

    /**
     * C_FindObjects continues a search for token and session
     * objects that match a template, obtaining additional object
     * handles. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} phObject gets obj. handles 
     * @param {number} ulMaxObjectCount max handles to get 
     * @param {Buffer} pulObjectCount actual # returned
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_FindObjects(hSession: number, phObject: Buffer, ulMaxObjectCount: number, pulObjectCount: Buffer): number;
    C_FindObjects(hSession: number, phObject: Buffer, ulMaxObjectCount: number, pulObjectCount: Buffer, callback: Callback): void;
    C_FindObjects(hSession: number, phObject: Buffer, ulMaxObjectCount: number, pulObjectCount: Buffer, callback?: Callback): number {
        return this.callFunction("C_FindObjects", arguments);
    }

    /**
     * C_FindObjectsFinal finishes a search for token and session objects. 
     * @param {number} hSession the session's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_FindObjectsFinal(hSession: number): number;
    C_FindObjectsFinal(hSession: number, callback: Callback): void;
    C_FindObjectsFinal(hSession: number, callback?: Callback): number {
        return this.callFunction("C_FindObjectsFinal", arguments);
    }

    /* Encryption and decryption */

    /** 
     * C_EncryptInit initializes an encryption operation. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pMechanism the encryption mechanism 
     * @param {number} hKey handle of encryption key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_EncryptInit(hSession: number, pMechanism: Buffer, hKey: number): number;
    C_EncryptInit(hSession: number, pMechanism: Buffer, hKey: number, callback: Callback): void;
    C_EncryptInit(hSession: number, pMechanism: Buffer, hKey: number, callback?: Callback): number {
        return this.callFunction("C_EncryptInit", arguments);
    }

    /**
     * C_Encrypt encrypts single-part data. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pData the plaintext data 
     * @param {number} ulDataLen bytes of plaintext
     * @param {Buffer} pEncryptedData gets ciphertext
     * @param {Buffer} pulEncryptedDataLen gets c-text size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Encrypt(hSession: number, pData: Buffer, ulDataLen: number, pEncryptedData: Buffer, pulEncryptedDataLen: Buffer): number;
    C_Encrypt(hSession: number, pData: Buffer, ulDataLen: number, pEncryptedData: Buffer, pulEncryptedDataLen: Buffer, callback: Callback): void;
    C_Encrypt(hSession: number, pData: Buffer, ulDataLen: number, pEncryptedData: Buffer, pulEncryptedDataLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_Encrypt", arguments);
    }

    /** 
     * C_EncryptUpdate continues a multiple-part encryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext data len
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_EncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer): number;
    C_EncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer, callback: Callback): void;
    C_EncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_EncryptUpdate", arguments);
    }

    /** 
     * C_EncryptFinal finishes a multiple-part encryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pLastEncryptedPart last c-text
     * @param {Buffer} pulLastEncryptedPartLen gets last size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_EncryptFinal(hSession: number, pLastEncryptedPart: Buffer, pulLastEncryptedPartLen: Buffer): number;
    C_EncryptFinal(hSession: number, pLastEncryptedPart: Buffer, pulLastEncryptedPartLen: Buffer, callback: Callback): void;
    C_EncryptFinal(hSession: number, pLastEncryptedPart: Buffer, pulLastEncryptedPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_EncryptFinal", arguments);
    }

    /** 
     * C_DecryptInit initializes a decryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the decryption mechanism 
     * @param {number} hKey handle of decryption key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DecryptInit(hSession: number, pMechanism: Buffer, hKey: number);
    C_DecryptInit(hSession: number, pMechanism: Buffer, hKey: number, callback: Callback): void;
    C_DecryptInit(hSession: number, pMechanism: Buffer, hKey: number, callback?: Callback): number {
        return this.callFunction("C_DecryptInit", arguments);
    }

    /** 
     * C_Decrypt decrypts encrypted data in a single part. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedData ciphertext
     * @param {number} ulEncryptedDataLen ciphertext length
     * @param {Buffer} pData gets plaintext
     * @param {number} pulDataLen gets p-text size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Decrypt(hSession: number, pEncryptedData: Buffer, ulEncryptedDataLen: number, pData: Buffer, pulDataLen: Buffer): number;
    C_Decrypt(hSession: number, pEncryptedData: Buffer, ulEncryptedDataLen: number, pData: Buffer, pulDataLen: Buffer, callback: Callback): void;
    C_Decrypt(hSession: number, pEncryptedData: Buffer, ulEncryptedDataLen: number, pData: Buffer, pulDataLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_Decrypt", arguments);
    }

    /**
     * C_DecryptUpdate continues a multiple-part decryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart encrypted data
     * @param {number} ulEncryptedPartLen input length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen p-text size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DecryptUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer): number;
    C_DecryptUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer, callback: Callback): void;
    C_DecryptUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_DecryptUpdate", arguments);
    }

    /**
     * C_DecryptFinal finishes a multiple-part decryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pLastPart gets plaintext
     * @param {Buffer} pulLastPartLen p-text size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DecryptFinal(hSession: number, pLastPart: Buffer, pulLastPartLen: Buffer): number;
    C_DecryptFinal(hSession: number, pLastPart: Buffer, pulLastPartLen: Buffer, callback: Callback): void;
    C_DecryptFinal(hSession: number, pLastPart: Buffer, pulLastPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_DecryptFinal", arguments);
    }

    /* Message digesting */

    /** 
     * C_DigestInit initializes a message-digesting operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the digesting mechanism
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DigestInit(hSession: number, pMechanism: Buffer): number;
    C_DigestInit(hSession: number, pMechanism: Buffer, callback: Callback): void;
    C_DigestInit(hSession: number, pMechanism: Buffer, callback?: Callback): number {
        return this.callFunction("C_DigestInit", arguments);
    }

    /** 
     * C_Digest digests data in a single part. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pData data to be digested
     * @param {number} ulDataLen bytes of data to digest
     * @param {Buffer} pDigest gets the message digest
     * @param {Buffer} pulDigestLen gets digest length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Digest(hSession: number, pData: Buffer, ulDataLen: number, pDigest: Buffer, pulDigestLen: Buffer): number;
    C_Digest(hSession: number, pData: Buffer, ulDataLen: number, pDigest: Buffer, pulDigestLen: Buffer, callback: Callback): void;
    C_Digest(hSession: number, pData: Buffer, ulDataLen: number, pDigest: Buffer, pulDigestLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_Digest", arguments);
    }

    /** 
     * C_DigestUpdate continues a multiple-part message-digesting operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart data to be digested
     * @param {number} ulPartLen bytes of data to be digested
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DigestUpdate(hSession: number, pPart: Buffer, ulPartLen: number): number;
    C_DigestUpdate(hSession: number, pPart: Buffer, ulPartLen: number, callback: Callback): void;
    C_DigestUpdate(hSession: number, pPart: Buffer, ulPartLen: number, callback?: Callback): number {
        return this.callFunction("C_DigestUpdate", arguments);
    }

    /** 
     * C_DigestKey continues a multi-part message-digesting operation, 
     * by digesting the value of a secret key as part of
     * the data already digested.
     * @param {number} hSession the session's handle
     * @param {number} hKey secret key to digest
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DigestKey(hSession: number, hKey: number): number;
    C_DigestKey(hSession: number, hKey: number, callback: Callback): void;
    C_DigestKey(hSession: number, hKey: number, callback?: Callback): number {
        return this.callFunction("C_DigestKey", arguments);
    }

    /**
     * C_DigestFinal finishes a multiple-part message-digesting
     * operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pDigest gets the message digest
     * @param {Buffer} pulDigestLen gets byte count of digest
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DigestFinal(hSession: number, pDigest: Buffer, pulDigestLen: Buffer): number;
    C_DigestFinal(hSession: number, pDigest: Buffer, pulDigestLen: Buffer, callback: Callback): void;
    C_DigestFinal(hSession: number, pDigest: Buffer, pulDigestLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_DigestFinal", arguments);
    }

    /* Signing and MACing */

    /**
     * C_SignInit initializes a signature (private key encryption)
     * operation, where the signature is (will be) an appendix to
     * the data, and plaintext cannot be recovered from the signature.
     * @param {number} hSession the session's handle 
     * @param {Buffer} pMechanism the signature mechanism 
     * @param {number} hKey handle of signature key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SignInit(hSession: number, pMechanism: Buffer, hKey: number): number;
    C_SignInit(hSession: number, pMechanism: Buffer, hKey: number, callback: Callback): void;
    C_SignInit(hSession: number, pMechanism: Buffer, hKey: number, callback?: Callback): number {
        return this.callFunction("C_SignInit", arguments);
    }

    /**
     * C_Sign signs (encrypts with private key) data in a single
     * part, where the signature is (will be) an appendix to the
     * data, and plaintext cannot be recovered from the signature. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pData the data to sign
     * @param {number} ulDataLen count of bytes to sign
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Sign(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer): number;
    C_Sign(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer, callback: Callback): void;
    C_Sign(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_Sign", arguments);
    }

    /**
     * C_SignUpdate continues a multiple-part signature operation,
     * where the signature is (will be) an appendix to the data, 
     * and plaintext cannot be recovered from the signature. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pPart the data to sign 
     * @param {number} ulPartLen count of bytes to sign
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_SignUpdate(hSession: number, pPart: Buffer, ulPartLen: Buffer): number;
    C_SignUpdate(hSession: number, pPart: Buffer, ulPartLen: Buffer, callback: Callback): void;
    C_SignUpdate(hSession: number, pPart: Buffer, ulPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_SignUpdate", arguments);
    }

    /**
     * C_SignFinal finishes a multiple-part signature operation, 
     * returning the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SignFinal(hSession: number, pSignature: Buffer, pulSignatureLen: Buffer): number;
    C_SignFinal(hSession: number, pSignature: Buffer, pulSignatureLen: Buffer, callback: Callback): void;
    C_SignFinal(hSession: number, pSignature: Buffer, pulSignatureLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_SignFinal", arguments);
    }

    /**
     * C_SignRecoverInit initializes a signature operation, where
     * the data can be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the signature mechanism 
     * @param {number} hKey handle of the signature key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SignRecoverInit(hSession: number, pMechanism: Buffer, hKey: number): number;
    C_SignRecoverInit(hSession: number, pMechanism: Buffer, hKey: number, callback: Callback): void;
    C_SignRecoverInit(hSession: number, pMechanism: Buffer, hKey: number, callback?: Callback): number {
        return this.callFunction("C_SignRecoverInit", arguments);
    }

    /**
     * C_SignRecover signs data in a single operation, where the
     * data can be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pData the data to sign
     * @param {number} ulDataLen count of bytes to sign
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SignRecover(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer): number;
    C_SignRecover(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer, callback: Callback): void;
    C_SignRecover(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_SignRecover", arguments);
    }

    /* Verifying signatures and MACs */

    /**
     * C_VerifyInit initializes a verification operation, where the
     * signature is an appendix to the data, and plaintext cannot
     * cannot be recovered from the signature (e.g. DSA). 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the verification mechanism 
     * @param {number} hKey verification key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_VerifyInit(hSession: number, pMechanism: Buffer, hKey: number): number;
    C_VerifyInit(hSession: number, pMechanism: Buffer, hKey: number, callback: Callback): void;
    C_VerifyInit(hSession: number, pMechanism: Buffer, hKey: number, callback?: Callback): number {
        return this.callFunction("C_VerifyInit", arguments);
    }

    /**
     * C_Verify verifies a signature in a single-part operation, 
     * where the signature is an appendix to the data, and plaintext
     * cannot be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pData signed data
     * @param {number} ulDataLen length of signed data
     * @param {Buffer} pSignature signature
     * @param {number} ulSignatureLen signature length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_Verify(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, ulSignatureLen: Buffer): number;
    C_Verify(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, ulSignatureLen: Buffer, callback: Callback): void;
    C_Verify(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, ulSignatureLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_Verify", arguments);
    }

    /**
     * C_VerifyUpdate continues a multiple-part verification
     * operation, where the signature is an appendix to the data, 
     * and plaintext cannot be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart signed data
     * @param {number} ulPartLen length of signed data
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_VerifyUpdate(hSession: number, pPart: Buffer, ulPartLen: number): number;
    C_VerifyUpdate(hSession: number, pPart: Buffer, ulPartLen: number, callback: Callback): void;
    C_VerifyUpdate(hSession: number, pPart: Buffer, ulPartLen: number, callback?: Callback): number {
        return this.callFunction("C_VerifyUpdate", arguments);
    }

    /**
     * C_VerifyFinal finishes a multiple-part verification
     * operation, checking the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature signature to verify
     * @param {number} ulSignatureLen signature length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_VerifyFinal(hSession: number, pSignature: Buffer, ulSignatureLen: number): number;
    C_VerifyFinal(hSession: number, pSignature: Buffer, ulSignatureLen: number, callback: Callback): void;
    C_VerifyFinal(hSession: number, pSignature: Buffer, ulSignatureLen: number, callback?: Callback): number {
        return this.callFunction("C_VerifyFinal", arguments);
    }

    /**
     * C_VerifyRecoverInit initializes a signature verification
     * operation, where the data is recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the verification mechanism
     * @param {number} hKey verification key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_VerifyRecoverInit(hSession: number, pMechanism: Buffer, hKey: number): number;
    C_VerifyRecoverInit(hSession: number, pMechanism: Buffer, hKey: number, callback: Callback): void;
    C_VerifyRecoverInit(hSession: number, pMechanism: Buffer, hKey: number, callback?: Callback): number {
        return this.callFunction("C_VerifyRecoverInit", arguments);
    }

    /**
     * C_VerifyRecover verifies a signature in a single-part
     * operation, where the data is recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature signature to verify
     * @param {number} ulSignatureLen signature length
     * @param {Buffer} pData gets signed data
     * @param {Buffer} pulDataLen gets signed data len
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_VerifyRecover(hSession: number, pSignature: Buffer, ulSignatureLen: number, pData: Buffer, pulDataLen: Buffer): number;
    C_VerifyRecover(hSession: number, pSignature: Buffer, ulSignatureLen: number, pData: Buffer, pulDataLen: Buffer, callback: Callback): void;
    C_VerifyRecover(hSession: number, pSignature: Buffer, ulSignatureLen: number, pData: Buffer, pulDataLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_VerifyRecovers", arguments);
    }

    /* Dual-function cryptographic operations */

    /**
     * C_DigestEncryptUpdate continues a multiple-part digesting
     * and encryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext length
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DigestEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer): number;
    C_DigestEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer, callback: Callback): void;
    C_DigestEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_DigestEncryptUpdate", arguments);
    }

    /**
     * C_DecryptDigestUpdate continues a multiple-part decryption and
     * digesting operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart ciphertext
     * @param {number} ulEncryptedPartLen ciphertext length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen gets plaintext len
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DecryptDigestUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer): number;
    C_DecryptDigestUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer, callback: Callback): void;
    C_DecryptDigestUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_DecryptDigestUpdate", arguments);
    }

    /**
     * C_SignEncryptUpdate continues a multiple-part signing and
     * encryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext length
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SignEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer): number;
    C_SignEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer, callback: Callback): void;
    C_SignEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_SignEncryptUpdate", arguments);
    }

    /**
     * C_DecryptVerifyUpdate continues a multiple-part decryption and
     * verify operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart ciphertext
     * @param {number} ulEncryptedPartLen ciphertext length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen gets p-text length
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DecryptVerifyUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer): number;
    C_DecryptVerifyUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer, callback: Callback): void;
    C_DecryptVerifyUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_DecryptVerifyUpdate", arguments);
    }

    /* Key management */

    /**
     * C_GenerateKey generates a secret key, creating a new key object.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key generation mech.
     * @param {Buffer} pTemplate template for new key
     * @param {number} ulCount # of attrs in template
     * @param {Buffer} phKey gets handle of new key
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GenerateKey(hSession: number, pMechanism: Buffer, pTemplate: Buffer, ulCount: number, phKey: Buffer): number;
    C_GenerateKey(hSession: number, pMechanism: Buffer, pTemplate: Buffer, ulCount: number, phKey: Buffer, callback: Callback);
    C_GenerateKey(hSession: number, pMechanism: Buffer, pTemplate: Buffer, ulCount: number, phKey: Buffer, callback?: Callback): number {
        return this.callFunction("C_GenerateKey", arguments);
    }

    /**
     * C_GenerateKeyPair generates a public-key/private-key pair, 
     * creating new key objects. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key-gen mech.
     * @param {Buffer} pPublicKeyTemplate template for public key
     * @param {number} ulPublicKeyAttributeCount public attrs
     * @param {Buffer} pPrivateKeyTemplate template for private key
     * @param {number} ulPrivateKeyAttributeCount private attrs
     * @param {Buffer} phPublicKey gets public key handle 
     * @param {Buffer} phPrivateKey gets private key handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value 
     */
    C_GenerateKeyPair(hSession: number, pMechanism: Buffer, pPublicKeyTemplate: Buffer, ulPublicKeyAttributeCount: number, pPrivateKeyTemplate: Buffer, ulPrivateKeyAttributeCount: number, phPublicKey: Buffer, phPrivateKey: Buffer): number;
    C_GenerateKeyPair(hSession: number, pMechanism: Buffer, pPublicKeyTemplate: Buffer, ulPublicKeyAttributeCount: number, pPrivateKeyTemplate: Buffer, ulPrivateKeyAttributeCount: number, phPublicKey: Buffer, phPrivateKey: Buffer, callback: Callback): void;
    C_GenerateKeyPair(hSession: number, pMechanism: Buffer, pPublicKeyTemplate: Buffer, ulPublicKeyAttributeCount: number, pPrivateKeyTemplate: Buffer, ulPrivateKeyAttributeCount: number, phPublicKey: Buffer, phPrivateKey: Buffer, callback?: Callback): number {
        return this.callFunction("C_GenerateKeyPair", arguments);
    }

    /**
     * C_WrapKey wraps (i.e., encrypts) a key. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the wrapping mechanism
     * @param {number} hWrappingKey wrapping key
     * @param {number} hKey key to be wrapped
     * @param {Buffer} pWrappedKey gets wrapped key
     * @param {Buffer} pulWrappedKeyLen gets wrapped key size
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_WrapKey(hSession: number, pMechanism: Buffer, hWrappingKey: number, hKey: number, pWrappedKey: Buffer, pulWrappedKeyLen: Buffer): number;
    C_WrapKey(hSession: number, pMechanism: Buffer, hWrappingKey: number, hKey: number, pWrappedKey: Buffer, pulWrappedKeyLen: Buffer, callback: Callback): void;
    C_WrapKey(hSession: number, pMechanism: Buffer, hWrappingKey: number, hKey: number, pWrappedKey: Buffer, pulWrappedKeyLen: Buffer, callback?: Callback): number {
        return this.callFunction("C_WrapKey", arguments);
    }

    /**
     * C_UnwrapKey unwraps (decrypts) a wrapped key, creating a new
     * key object. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism unwrapping mech.
     * @param {Buffer} pWrappedKey the wrapped key
     * @param {number} ulWrappedKeyLen wrapped key len
     * @param {Buffer} pTemplate new key template
     * @param {number} ulAttributeCount template length
     * @param {Buffer} pTemplate new key template
     * @param {number} ulAttributeCount template length
     * @param {Buffer} phKey gets new handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_UnwrapKey(hSession: number, pMechanism: Buffer, hUnwrappingKey: number, pWrappedKey: Buffer, ulWrappedKeyLen: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer): number;
    C_UnwrapKey(hSession: number, pMechanism: Buffer, hUnwrappingKey: number, pWrappedKey: Buffer, ulWrappedKeyLen: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer, callback: Callback): void;
    C_UnwrapKey(hSession: number, pMechanism: Buffer, hUnwrappingKey: number, pWrappedKey: Buffer, ulWrappedKeyLen: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer, callback?: Callback): number {
        return this.callFunction("C_UnwrapKey", arguments);
    }

    /**
     * C_DeriveKey derives a key from a base key, creating a new key object. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key deriv. mech.
     * @param {number} hBaseKey base key
     * @param {Buffer} pTemplate new key template
     * @param {number} ulAttributeCount template length
     * @param {Buffer} phKey gets new handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_DeriveKey(hSession: number, pMechanism: Buffer, hBaseKey: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer): number;
    C_DeriveKey(hSession: number, pMechanism: Buffer, hBaseKey: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer, callback: Callback): void;
    C_DeriveKey(hSession: number, pMechanism: Buffer, hBaseKey: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer, callback?: Callback): number {
        return this.callFunction("C_DeriveKey", arguments);
    }

    /* Random number generation */

    /**
     * C_SeedRandom mixes additional seed material into the token's
     * random number generator. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSeed the seed material
     * @param {number} ulSeedLen length of seed material
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_SeedRandom(hSession: number, pSeed: Buffer, ulSeedLen: number): number;
    C_SeedRandom(hSession: number, pSeed: Buffer, ulSeedLen: number, callback: Callback): void;
    C_SeedRandom(hSession: number, pSeed: Buffer, ulSeedLen: number, callback?: Callback): number {
        return this.callFunction("C_SeedRandom", arguments);
    }

    /**
     * C_GenerateRandom generates random data. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pRandomData receives the random data
     * @param {number} ulRandomLen # of bytes to generate
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GenerateRandom(hSession: number, pRandomData: Buffer, ulRandomLen: number): number;
    C_GenerateRandom(hSession: number, pRandomData: Buffer, ulRandomLen: number, callback: Callback): void;
    C_GenerateRandom(hSession: number, pRandomData: Buffer, ulRandomLen: number, callback?: Callback): number {
        return this.callFunction("C_GenerateRandom", arguments);
    }

    /* Parallel function management */

    /**
     * C_GetFunctionStatus is a legacy function; it obtains an
     * updated status of a function running in parallel with an
     * application. 
     * @param {number} hSession the session's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_GetFunctionStatus(hSession: number): number;
    C_GetFunctionStatus(hSession: number, callback: Callback): void;
    C_GetFunctionStatus(hSession: number, callback?: Callback): number {
        return this.callFunction("C_GetFunctionStatus", arguments);
    }

    /**
     * C_CancelFunction is a legacy function; it cancels a function
     * running in parallel. 
     * @param {number} hSession the session's handle
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_CancelFunction(hSession: number): number;
    C_CancelFunction(hSession: number, callback: Callback): void;
    C_CancelFunction(hSession: number, callback?: Callback): number {
        return this.callFunction("C_CancelFunction", arguments);
    }

    /* Functions added in for Cryptoki Version 2.01 or later */

    /**
     * C_WaitForSlotEvent waits for a slot event (token insertion,
     * removal, etc.) to occur. 
     * @param {number} flags blocking/nonblocking flag
     * @param {Buffer} pSlot location that receives the slot ID
     * @param {Buffer} pRserved reserved.  Should be NULL_PTR
     * @param {Callback} callback callback function with PKCS11 result value
     * @returns void PKCS11 result value
     */
    C_WaitForSlotEvent(flags: number, pSlot: Buffer, pRserved: Buffer): number;
    C_WaitForSlotEvent(flags: number, pSlot: Buffer, pRserved: Buffer, callback: Callback): number;
    C_WaitForSlotEvent(flags: number, pSlot: Buffer, pRserved: Buffer = NULL_PTR, callback?: Callback): number {
        return this.callFunction("C_WaitForSlotEvent", arguments);
    }

} 