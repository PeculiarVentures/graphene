export * from "./pkcs11t";
import * as CKT from "./pkcs11t";
import * as FFI from "ffi";
import * as Ref from "ref";
import {CK_FUNCTIONS} from "./pkcs11f";

export const NULL_PTR = null;

export type CK_PTR = Buffer;

export class Pkcs11 {

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

    /**
     * C_Initialize initializes the Cryptoki library.
     * @param pInitArgs   if this is not NULL_PTR, it gets
     *                    cast to CK_C_INITIALIZE_ARGS_PTR
     *                    and dereferenced
     */
    C_Initialize(pInitArgs: CK_PTR = NULL_PTR): number {
        return this.lib.C_Initialize(pInitArgs);
    }

    /**
     * C_Finalize indicates that an application is done with the Cryptoki library.
     * @param pReserved   reserved. Should be NULL_PTR 
     */
    C_Finalize(pReserved: CK_PTR = NULL_PTR): number {
        return this.lib.C_Finalize(pReserved);
    }

    /**
     * C_GetInfo returns general information about Cryptoki. 
     * @param pInfo       location that receives information
     */
    C_GetInfo(pInfo: CK_PTR): number {
        return this.lib.C_GetInfo(pInfo);
    }

    /** 
     * C_GetSlotList obtains a list of slots in the system.
     * @param {boolean} tokenPresent only slots with tokens?
     * @param pSlotList receives array of slot IDs
     * @param pulCount receives number of slots
     */
    C_GetSlotList(tokenPresent: boolean, pSlotList: CK_PTR, pulCount: CK_PTR): number {
        return this.lib.C_GetSlotList(tokenPresent, pSlotList, pulCount);
    }

    /** 
     * C_GetSlotInfo obtains information about a particular slot in
     * the system.
     * @param {number} slotID the ID of the slot
     * @param {Buffer} pInfo receives the slot information 
     */
    C_GetSlotInfo(slotID: number, pInfo: CK_PTR): number {
        return this.lib.C_GetSlotInfo(slotID, pInfo);
    }

    /** 
     * C_GetTokenInfo obtains information about a particular token
     * in the system.
     * @param {number} slotID ID of the token's slot
     * @param {Buffer} pInfo receives the token information
     *  
     */
    C_GetTokenInfo(slotID: number, pInfo: Buffer): number {
        return this.lib.C_GetTokenInfo(slotID, pInfo);
    }

    /**
     * C_GetMechanismList obtains a list of mechanism types
     * supported by a token. 
     * @param {number} slotID ID of the token's slot
     * @param {number} pMechanismList gets mech. array
     * @param {number} pulCount gets # of mechs
     */
    C_GetMechanismList(slotID: number, pMechanismList: Buffer, pulCount: Buffer): number {
        return this.lib.C_GetMechanismList(slotID, pMechanismList, pulCount);
    }

    /** C_GetMechanismInfo obtains information about a particular
     * mechanism possibly supported by a token. 
     * @param {number} slotID ID of the token's slot
     * @param {number} type type of mechanism
     * @param {Buffer} pInfo receives mechanism info
     */
    C_GetMechanismInfo(slotID: number, type: number, pInfo): number {
        return this.lib.C_GetMechanismInfo(slotID, type, pInfo);
    }

    /** 
     * C_InitToken initializes a token. 
     * @param {number} slotID ID of the token's slot
     * @param {Buffer} pPin the SO's initial PIN
     * @param {number} ulPinLen length in bytes of the PIN
     * @param {number} pLabel 32-byte token label (blank padded)
     */
    C_InitToken(slotID: number, pPin: Buffer, ulPinLen: number, pLabel: Buffer): number {
        return this.lib.C_GetMechanismInfo(slotID, pPin, ulPinLen, pLabel);
    }

    /**
     * C_InitPIN initializes the normal user's PIN.
     * @param {number} hSession the session's handle 
     * @param {Buffer} pPin the normal user's PIN 
     * @param {number} ulPinLen length in bytes of the PIN
     */
    C_InitPIN(hSession: number, pPin: Buffer, ulPinLen): number {
        return this.lib.C_InitPIN(hSession, pPin, ulPinLen);
    }

    /** 
     * C_SetPIN modifies the PIN of the user who is logged in. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pOldPin the old PIN 
     * @param {number} ulOldLen length of the old PIN 
     * @param {Buffer} pNewPin the new PIN 
     * @param {number} ulNewLen length of the new PIN 
     */
    C_SetPIN(hSession, pOldPin: Buffer, ulOldLen: number, pNewPin: Buffer, ulNewLen: number): number {
        return this.lib.C_SetPIN(hSession, pOldPin, ulOldLen, pNewPin, ulNewLen);
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
     */
    C_OpenSession(slotID: number, flags: number, pApplication: Buffer = NULL_PTR, Notify = NULL_PTR, phSession = NULL_PTR): number {
        return this.lib.C_OpenSession(slotID, flags, pApplication, Notify, phSession);
    }

    /**
     * C_CloseSession closes a session between an application and a token. 
     * @param {number} hSession the session's handle 
     */
    C_CloseSession(hSession: number): number {
        return this.lib.C_CloseSession(hSession);
    }

    /** 
     * C_CloseAllSessions closes all sessions with a token. 
     * @param {number} slotID ID of the token's slot
     */
    C_CloseAllSessions(slotID: number): number {
        return this.lib.C_CloseAllSessions(slotID);
    }

    /**
     * C_GetSessionInfo obtains information about the session. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pInfo receives session info 
     */
    C_GetSessionInfo(hSession: number, pInfo: Buffer): number {
        return this.lib.C_GetSessionInfo(hSession, pInfo);
    }

    /**
     * C_GetOperationState obtains the state of the cryptographic operation in a session. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pOperationState gets state
     * @param {Buffer} pulOperationStateLen gets state length
     */
    C_GetOperationState(hSession: number, pOperationState: Buffer, pulOperationStateLen: Buffer): number {
        return this.lib.C_GetOperationState(hSession, pOperationState, pulOperationStateLen);
    }

    /**
     * C_SetOperationState restores the state of the cryptographic operation in a session. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pOperationState holds state
     * @param {number} ulOperationStateLen holds holds state length
     * @param {number} hEncryptionKey en/decryption key
     * @param {number} hAuthenticationKey sign/verify key
     */
    C_SetOperationState(hSession: number, pOperationState: Buffer, ulOperationStateLen: number, hEncryptionKey, hAuthenticationKey): number {
        return this.lib.C_SetOperationState(hSession, pOperationState, ulOperationStateLen, hEncryptionKey, hAuthenticationKey);
    }

    /**
     * C_Login logs a user into a token. 
     * @param {number} hSession the session's handle 
     * @param {number} userType the user type 
     * @param {Buffer} pPin the user's PIN
     * @param {number} ulPinLen the length of the PIN
     */
    C_Login(hSession: number, userType: number, pPin: Buffer, ulPinLen: number): number {
        return this.lib.C_Login(hSession, userType, pPin, ulPinLen);
    }

    /** 
     * C_Logout logs a user out from a token. 
     * @param {number} hSession the session's handle 
     */
    C_Logout(hSession: number): number {
        return this.lib.C_Logout(hSession);
    }

    /* Object management */

    /**
     * C_CreateObject creates a new object. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pTemplate the object's template 
     * @param {number} ulCount attributes in template 
     * @param {Buffer} phObject gets new object's handle 
     */
    C_CreateObject(hSession: number, pTemplate: Buffer, ulCount: number, phObject: Buffer): number {
        return this.lib.C_CreateObject(hSession, pTemplate, ulCount, phObject);
    }

    /** 
     * C_CopyObject copies an object, creating a new object for the copy. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pTemplate template for new object 
     * @param {number} ulCount attributes in template 
     * @param {Buffer} phNewObject receives handle of copy 
     */
    C_CopyObject(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number, phNewObject: Buffer): number {
        return this.lib.C_CopyObject(hSession, hObject, pTemplate, ulCount, phNewObject);
    }

    /** 
     * C_DestroyObject destroys an object. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     */
    C_DestroyObject(hSession: number, hObject: number): number {
        return this.lib.C_DestroyObject(hSession, hObject);
    }

    /** 
     * C_GetObjectSize gets the size of an object in bytes. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pulSize receives size of object 
     */
    C_GetObjectSize(hSession: number, hObject: number, pulSize: Buffer): number {
        return this.lib.C_GetObjectSize(hSession, hObject, pulSize);
    }

    /** 
     * C_GetAttributeValue obtains the value of one or more object attributes. 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pTemplate specifies attrs; gets vals 
     * @param {number} ulCount attributes in template
     */
    C_GetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number): number {
        return this.lib.C_GetAttributeValue(hSession, hObject, pTemplate, ulCount);
    }

    /**
     * C_SetAttributeValue modifies the value of one or more object attributes 
     * @param {number} hSession the session's handle 
     * @param {number} hObject the object's handle 
     * @param {Buffer} pTemplate specifies attrs and values 
     * @param {number} ulCount attributes in template
     */
    C_SetAttributeValue(hSession: number, hObject: number, pTemplate: Buffer, ulCount: number): number {
        return this.lib.C_SetAttributeValue(hSession, hObject, pTemplate, ulCount);
    }

    /**
     * C_FindObjectsInit initializes a search for token and session
     * objects that match a template. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pTemplate attribute values to match 
     * @param {number} ulCount attrs in search template
     */
    C_FindObjectsInit(hSession: number, pTemplate: Buffer, ulCount: number): number {
        return this.lib.C_FindObjectsInit(hSession, pTemplate, ulCount);
    }

    /**
     * C_FindObjects continues a search for token and session
     * objects that match a template, obtaining additional object
     * handles. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} phObject gets obj. handles 
     * @param {number} ulMaxObjectCount max handles to get 
     * @param {Buffer} pulObjectCount actual # returned 
     */
    C_FindObjects(hSession: number, phObject: Buffer, ulMaxObjectCount: number, pulObjectCount: Buffer): number {
        return this.lib.C_FindObjects(hSession, phObject, ulMaxObjectCount, pulObjectCount);
    }

    /**
     * C_FindObjectsFinal finishes a search for token and session objects. 
     * @param {number} hSession the session's handle 
     */
    C_FindObjectsFinal(hSession: number): number {
        return this.lib.C_FindObjectsFinal(hSession);
    }

    /* Encryption and decryption */

    /** 
     * C_EncryptInit initializes an encryption operation. 
     * @param {number} hSession the session's handle 
     * @param {number} pMechanism the encryption mechanism 
     * @param {number} hKey handle of encryption key 
     */
    C_EncryptInit(hSession: number, pMechanism: number, hKey: number): number {
        return this.lib.C_EncryptInit(hSession, pMechanism, hKey);
    }

    /**
     * C_Encrypt encrypts single-part data. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pData the plaintext data 
     * @param {number} ulDataLen bytes of plaintext
     * @param {Buffer} pEncryptedData gets ciphertext
     * @param {Buffer} pulEncryptedDataLen gets c-text size
     */
    C_Encrypt(hSession: number, pData: Buffer, ulDataLen: number, pEncryptedData: Buffer, pulEncryptedDataLen: Buffer): number {
        return this.lib.C_Encrypt(hSession, pData, ulDataLen, pEncryptedData, pulEncryptedDataLen);
    }

    /** 
     * C_EncryptUpdate continues a multiple-part encryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext data len
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text size
     */
    C_EncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen): number {
        return this.lib.C_EncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen);
    }

    /** 
     * C_EncryptFinal finishes a multiple-part encryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pLastEncryptedPart last c-text
     * @param {Buffer} pulLastEncryptedPartLen gets last size
     */
    C_EncryptFinal(hSession: number, pLastEncryptedPart: Buffer, pulLastEncryptedPartLen: Buffer) {
        return this.lib.C_EncryptFinal(hSession, pLastEncryptedPart, pulLastEncryptedPartLen);
    }

    /** 
     * C_DecryptInit initializes a decryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the decryption mechanism 
     * @param {number} hKey handle of decryption key
     */
    C_DecryptInit(hSession: number, pMechanism: Buffer, hKey: number) {
        return this.lib.C_DecryptInit(hSession, pMechanism, hKey);
    }

    /** 
     * C_Decrypt decrypts encrypted data in a single part. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedData ciphertext
     * @param {number} ulEncryptedDataLen ciphertext length
     * @param {Buffer} pData gets plaintext
     * @param {number} pulDataLen gets p-text size
     */
    C_Decrypt(hSession: number, pEncryptedData: Buffer, ulEncryptedDataLen: number, pData: Buffer, pulDataLen: Buffer): number {
        return this.lib.C_Decrypt(hSession, pEncryptedData, ulEncryptedDataLen, pData, pulDataLen);
    }

    /**
     * C_DecryptUpdate continues a multiple-part decryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart encrypted data
     * @param {number} ulEncryptedPartLen input length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen p-text size
     */
    C_DecryptUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer): number {
        return this.lib.C_DecryptUpdate(hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen);
    }

    /**
     * C_DecryptFinal finishes a multiple-part decryption operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pLastPart gets plaintext
     * @param {Buffer} pulLastPartLen p-text size
     */
    C_DecryptFinal(hSession: number, pLastPart: Buffer, pulLastPartLen: Buffer): number {
        return this.lib.C_DecryptFinal(hSession, pLastPart, pulLastPartLen);
    }

    /* Message digesting */

    /** 
     * C_DigestInit initializes a message-digesting operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the digesting mechanism
     */
    C_DigestInit(hSession: number, pMechanism: Buffer): number {
        return this.lib.C_DigestInit(hSession, pMechanism);
    }

    /** 
     * C_Digest digests data in a single part. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pData data to be digested
     * @param {number} ulDataLen bytes of data to digest
     * @param {Buffer} pDigest gets the message digest
     * @param {Buffer} pulDigestLen gets digest length
     */
    C_Digest(hSession: number, pData: Buffer, ulDataLen: number, pDigest: Buffer, pulDigestLen: Buffer): number {
        return this.lib.C_Digest(hSession, pData, ulDataLen, pDigest, pulDigestLen);
    }

    /** 
     * C_DigestUpdate continues a multiple-part message-digesting operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart data to be digested
     * @param {number} ulPartLen bytes of data to be digested
     */
    C_DigestUpdate(hSession: number, pPart: Buffer, ulPartLen: number): number {
        return this.lib.C_DigestUpdate(hSession, pPart, ulPartLen);
    }

    /** 
     * C_DigestKey continues a multi-part message-digesting operation, 
     * by digesting the value of a secret key as part of
     * the data already digested.
     * @param {number} hSession the session's handle
     * @param {number} hKey secret key to digest
     */
    C_DigestKey(hSession: number, hKey: number): number {
        return this.lib.C_DigestKey(hSession, hKey);
    }

    /**
     * C_DigestFinal finishes a multiple-part message-digesting
     * operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pDigest gets the message digest
     * @param {Buffer} pulDigestLen gets byte count of digest
     */
    C_DigestFinal(hSession: number, pDigest: Buffer, pulDigestLen: Buffer): number {
        return this.lib.C_DigestFinal(hSession, pDigest, pulDigestLen);
    }

    /* Signing and MACing */

    /**
     * C_SignInit initializes a signature (private key encryption)
     * operation, where the signature is (will be) an appendix to
     * the data, and plaintext cannot be recovered from the signature.
     * @param {number} hSession the session's handle 
     * @param {Buffer} pMechanism the signature mechanism 
     * @param {number} hKey handle of signature key
     */
    C_SignInit(hSession: number, pMechanism: Buffer, hKey: number): number {
        return this.lib.C_SignInit(hSession, pMechanism, hKey);
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
     */
    C_Sign(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer): number {
        return this.lib.C_Sign(hSession, pData, ulDataLen, pSignature, pulSignatureLen);
    }

    /**
     * C_SignUpdate continues a multiple-part signature operation,
     * where the signature is (will be) an appendix to the data, 
     * and plaintext cannot be recovered from the signature. 
     * @param {number} hSession the session's handle 
     * @param {Buffer} pPart the data to sign 
     * @param {number} ulPartLen count of bytes to sign 
     */
    C_SignUpdate(hSession: number, pPart: Buffer, ulPartLen: Buffer): number {
        return this.lib.C_SignUpdate(hSession, pPart, ulPartLen);
    }

    /**
     * C_SignFinal finishes a multiple-part signature operation, 
     * returning the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     */
    C_SignFinal(hSession: number, pSignature: Buffer, pulSignatureLen: Buffer): number {
        return this.lib.C_SignFinal(hSession, pSignature, pulSignatureLen);
    }

    /**
     * C_SignRecoverInit initializes a signature operation, where
     * the data can be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the signature mechanism 
     * @param {number} hKey handle of the signature key
     */
    C_SignRecoverInit(hSession: number, pMechanism: Buffer, hKey: number): number {
        return this.lib.C_SignRecoverInit(hSession, pMechanism, hKey);
    }

    /**
     * C_SignRecover signs data in a single operation, where the
     * data can be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pData the data to sign
     * @param {number} ulDataLen count of bytes to sign
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     */
    C_SignRecover(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, pulSignatureLen: Buffer): number {
        return this.lib.C_SignRecover(hSession, pData, ulDataLen, pSignature, pulSignatureLen);
    }

    /* Verifying signatures and MACs */

    /**
     * C_VerifyInit initializes a verification operation, where the
     * signature is an appendix to the data, and plaintext cannot
     * cannot be recovered from the signature (e.g. DSA). 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the verification mechanism 
     * @param {number} hKey verification key 
     */
    C_VerifyInit(hSession: number, pMechanism: Buffer, hKey: number): number {
        return this.lib.C_VerifyInit(hSession, pMechanism, hKey);
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
     */
    C_Verify(hSession: number, pData: Buffer, ulDataLen: number, pSignature: Buffer, ulSignatureLen: Buffer): number {
        return this.lib.C_Verify(hSession, pData, ulDataLen, pSignature, ulSignatureLen);
    }

    /**
     * C_VerifyUpdate continues a multiple-part verification
     * operation, where the signature is an appendix to the data, 
     * and plaintext cannot be recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart signed data
     * @param {number} ulPartLen length of signed data
     */
    C_VerifyUpdate(hSession: number, pPart: Buffer, ulPartLen: number): number {
        return this.lib.C_VerifyUpdate(hSession, pPart, ulPartLen);
    }


    /**
     * C_VerifyFinal finishes a multiple-part verification
     * operation, checking the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature signature to verify
     * @param {number} ulSignatureLen signature length
     */
    C_VerifyFinal(hSession: number, pSignature: Buffer, ulSignatureLen: number): number {
        return this.lib.C_VerifyFinal(hSession, pSignature, ulSignatureLen);
    }


    /**
     * C_VerifyRecoverInit initializes a signature verification
     * operation, where the data is recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the verification mechanism
     * @param {number} hKey verification key
     */
    C_VerifyRecoverInit(hSession: number, pMechanism: Buffer, hKey: number): number {
        return this.lib.C_VerifyRecoverInit(hSession, pMechanism, hKey);
    }


    /**
     * C_VerifyRecover verifies a signature in a single-part
     * operation, where the data is recovered from the signature. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature signature to verify
     * @param {number} ulSignatureLen signature length
     * @param {Buffer} pData gets signed data
     * @param {Buffer} pulDataLen gets signed data len
     */
    C_VerifyRecover(hSession: number, pSignature: Buffer, ulSignatureLen: number, pData: Buffer, pulDataLen: Buffer): number {
        return this.lib.C_VerifyRecover(hSession, pSignature, ulSignatureLen, pData, pulDataLen);
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
     */
    C_DigestEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer): number {
        return this.lib.C_DigestEncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen);
    }

    /**
     * C_DecryptDigestUpdate continues a multiple-part decryption and
     * digesting operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart ciphertext
     * @param {number} ulEncryptedPartLen ciphertext length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen gets plaintext len
     */
    C_DecryptDigestUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer): number {
        return this.lib.C_DecryptDigestUpdate(hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen);
    }

    /**
     * C_SignEncryptUpdate continues a multiple-part signing and
     * encryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext length
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text length
     */
    C_SignEncryptUpdate(hSession: number, pPart: Buffer, ulPartLen: number, pEncryptedPart: Buffer, pulEncryptedPartLen: Buffer): number {
        return this.lib.C_SignEncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen);
    }

    /**
     * C_DecryptVerifyUpdate continues a multiple-part decryption and
     * verify operation. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart ciphertext
     * @param {number} ulEncryptedPartLen ciphertext length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen gets p-text length
     */
    C_DecryptVerifyUpdate(hSession: number, pEncryptedPart: Buffer, ulEncryptedPartLen: number, pPart: Buffer, pulPartLen: Buffer): number {
        return this.lib.C_DecryptVerifyUpdate(hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen);
    }

    /* Key management */

    /**
     * C_GenerateKey generates a secret key, creating a new key object.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key generation mech.
     * @param {Buffer} pTemplate template for new key
     * @param {number} ulCount # of attrs in template
     * @param {Buffer} phKey gets handle of new key
     */
    C_GenerateKey(hSession: number, pMechanism: Buffer, pTemplate: Buffer, ulCount: number, phKey: Buffer): number {
        return this.lib.C_GenerateKey(hSession, pMechanism, pTemplate, ulCount, phKey);
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
     */
    C_GenerateKeyPair(hSession: number, pMechanism: Buffer, pPublicKeyTemplate: Buffer, ulPublicKeyAttributeCount: number, pPrivateKeyTemplate: Buffer, ulPrivateKeyAttributeCount: number, phPublicKey: Buffer, phPrivateKey: Buffer): number {
        return this.lib.C_GenerateKeyPair(hSession, pMechanism, pPublicKeyTemplate, ulPublicKeyAttributeCount, pPrivateKeyTemplate, ulPrivateKeyAttributeCount, phPublicKey, phPrivateKey);
    }

    /**
     * C_WrapKey wraps (i.e., encrypts) a key. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the wrapping mechanism
     * @param {number} hWrappingKey wrapping key
     * @param {number} hKey key to be wrapped
     * @param {Buffer} pWrappedKey gets wrapped key
     * @param {Buffer} pulWrappedKeyLen gets wrapped key size
     */
    C_WrapKey(hSession: number, pMechanism: Buffer, hWrappingKey: number, hKey: number, pWrappedKey: Buffer, pulWrappedKeyLen: Buffer): number {
        return this.lib.C_WrapKey(hSession, pMechanism, hWrappingKey, hKey, pWrappedKey, pulWrappedKeyLen);
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
     */
    C_UnwrapKey(hSession: number, pMechanism: Buffer, hUnwrappingKey: number, pWrappedKey: Buffer, ulWrappedKeyLen: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer): number {
        return this.lib.C_UnwrapKey(hSession, pMechanism, hUnwrappingKey, pWrappedKey, ulWrappedKeyLen, pTemplate, ulAttributeCount, phKey);
    }

    /**
     * C_DeriveKey derives a key from a base key, creating a new key object. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key deriv. mech.
     * @param {number} hBaseKey base key
     * @param {Buffer} pTemplate new key template
     * @param {number} ulAttributeCount template length
     * @param {Buffer} phKey gets new handle
     */
    C_DeriveKey(hSession: number, pMechanism: Buffer, hBaseKey: number, pTemplate: Buffer, ulAttributeCount: number, phKey: Buffer): number {
        return this.lib.C_DeriveKey(hSession, pMechanism, hBaseKey, pTemplate, ulAttributeCount, phKey);
    }

    /* Random number generation */

    /**
     * C_SeedRandom mixes additional seed material into the token's
     * random number generator. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pSeed the seed material
     * @param {number} ulSeedLen length of seed material
     */
    C_SeedRandom(hSession: number, pSeed: Buffer, ulSeedLen: number): number {
        return this.lib.C_SeedRandom(hSession, pSeed, ulSeedLen);
    }

    /**
     * C_GenerateRandom generates random data. 
     * @param {number} hSession the session's handle
     * @param {Buffer} pRandomData receives the random data
     * @param {number} ulRandomLen # of bytes to generate
     */
    C_GenerateRandom(hSession: number, pRandomData: Buffer, ulRandomLen: number): number {
        return this.lib.C_GenerateRandom(hSession, pRandomData, ulRandomLen);
    }

    /* Parallel function management */

    /**
     * C_GetFunctionStatus is a legacy function; it obtains an
     * updated status of a function running in parallel with an
     * application. 
     * @param {number} hSession the session's handle
     */
    C_GetFunctionStatus(hSession: number): number {
        return this.lib.C_GetFunctionStatus(hSession);
    }

    /**
     * C_CancelFunction is a legacy function; it cancels a function
     * running in parallel. 
     * @param {number} hSession the session's handle
     */
    C_CancelFunction(hSession: number): number {
        return this.lib.C_CancelFunction(hSession);
    }

    /* Functions added in for Cryptoki Version 2.01 or later */

    /**
     * C_WaitForSlotEvent waits for a slot event (token insertion,
     * removal, etc.) to occur. 
     * @param {number} flags blocking/nonblocking flag
     * @param {Buffer} pSlot location that receives the slot ID
     * @param {Buffer} pRserved reserved.  Should be NULL_PTR
     */
    C_WaitForSlotEvent(flags: number, pSlot: Buffer, pRserved: Buffer = NULL_PTR): number {
        return this.lib.C_WaitForSlotEvent(flags, pSlot, pRserved);
    }

} 