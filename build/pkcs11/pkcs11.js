function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./pkcs11t"));
var FFI = require("ffi");
var pkcs11f_1 = require("./pkcs11f");
exports.NULL_PTR = null;
var Pkcs11 = (function () {
    /**
     * load a library with PKCS11 interface
     * @param {string} libFile path to PKCS11 library
     */
    function Pkcs11(libFile) {
        Object.defineProperty(this, "lib", {
            writable: true
        });
        this.lib = FFI.Library(libFile, pkcs11f_1.CK_FUNCTIONS);
    }
    /**
     * C_Initialize initializes the Cryptoki library.
     * @param pInitArgs   if this is not NULL_PTR, it gets
     *                    cast to CK_C_INITIALIZE_ARGS_PTR
     *                    and dereferenced
     */
    Pkcs11.prototype.C_Initialize = function (pInitArgs) {
        if (pInitArgs === void 0) { pInitArgs = exports.NULL_PTR; }
        return this.lib.C_Initialize(pInitArgs);
    };
    /**
     * C_Finalize indicates that an application is done with the Cryptoki library.
     * @param pReserved   reserved. Should be NULL_PTR
     */
    Pkcs11.prototype.C_Finalize = function (pReserved) {
        if (pReserved === void 0) { pReserved = exports.NULL_PTR; }
        return this.lib.C_Finalize(pReserved);
    };
    /**
     * C_GetInfo returns general information about Cryptoki.
     * @param pInfo       location that receives information
     */
    Pkcs11.prototype.C_GetInfo = function (pInfo) {
        return this.lib.C_GetInfo(pInfo);
    };
    /**
     * C_GetSlotList obtains a list of slots in the system.
     * @param {boolean} tokenPresent only slots with tokens?
     * @param pSlotList receives array of slot IDs
     * @param pulCount receives number of slots
     */
    Pkcs11.prototype.C_GetSlotList = function (tokenPresent, pSlotList, pulCount) {
        return this.lib.C_GetSlotList(tokenPresent, pSlotList, pulCount);
    };
    /**
     * C_GetSlotInfo obtains information about a particular slot in
     * the system.
     * @param {number} slotID the ID of the slot
     * @param {Buffer} pInfo receives the slot information
     */
    Pkcs11.prototype.C_GetSlotInfo = function (slotID, pInfo) {
        return this.lib.C_GetSlotInfo(slotID, pInfo);
    };
    /**
     * C_GetTokenInfo obtains information about a particular token
     * in the system.
     * @param {number} slotID ID of the token's slot
     * @param {Buffer} pInfo receives the token information
     *
     */
    Pkcs11.prototype.C_GetTokenInfo = function (slotID, pInfo) {
        return this.lib.C_GetTokenInfo(slotID, pInfo);
    };
    /**
     * C_GetMechanismList obtains a list of mechanism types
     * supported by a token.
     * @param {number} slotID ID of the token's slot
     * @param {number} pMechanismList gets mech. array
     * @param {number} pulCount gets # of mechs
     */
    Pkcs11.prototype.C_GetMechanismList = function (slotID, pMechanismList, pulCount) {
        return this.lib.C_GetMechanismList(slotID, pMechanismList, pulCount);
    };
    /** C_GetMechanismInfo obtains information about a particular
     * mechanism possibly supported by a token.
     * @param {number} slotID ID of the token's slot
     * @param {number} type type of mechanism
     * @param {Buffer} pInfo receives mechanism info
     */
    Pkcs11.prototype.C_GetMechanismInfo = function (slotID, type, pInfo) {
        return this.lib.C_GetMechanismInfo(slotID, type, pInfo);
    };
    /**
     * C_InitToken initializes a token.
     * @param {number} slotID ID of the token's slot
     * @param {Buffer} pPin the SO's initial PIN
     * @param {number} ulPinLen length in bytes of the PIN
     * @param {number} pLabel 32-byte token label (blank padded)
     */
    Pkcs11.prototype.C_InitToken = function (slotID, pPin, ulPinLen, pLabel) {
        return this.lib.C_GetMechanismInfo(slotID, pPin, ulPinLen, pLabel);
    };
    /**
     * C_InitPIN initializes the normal user's PIN.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPin the normal user's PIN
     * @param {number} ulPinLen length in bytes of the PIN
     */
    Pkcs11.prototype.C_InitPIN = function (hSession, pPin, ulPinLen) {
        return this.lib.C_InitPIN(hSession, pPin, ulPinLen);
    };
    /**
     * C_SetPIN modifies the PIN of the user who is logged in.
     * @param {number} hSession the session's handle
     * @param {Buffer} pOldPin the old PIN
     * @param {number} ulOldLen length of the old PIN
     * @param {Buffer} pNewPin the new PIN
     * @param {number} ulNewLen length of the new PIN
     */
    Pkcs11.prototype.C_SetPIN = function (hSession, pOldPin, ulOldLen, pNewPin, ulNewLen) {
        return this.lib.C_SetPIN(hSession, pOldPin, ulOldLen, pNewPin, ulNewLen);
    };
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
    Pkcs11.prototype.C_OpenSession = function (slotID, flags, pApplication, Notify, phSession) {
        if (pApplication === void 0) { pApplication = exports.NULL_PTR; }
        if (Notify === void 0) { Notify = exports.NULL_PTR; }
        if (phSession === void 0) { phSession = exports.NULL_PTR; }
        return this.lib.C_OpenSession(slotID, flags, pApplication, Notify, phSession);
    };
    /**
     * C_CloseSession closes a session between an application and a token.
     * @param {number} hSession the session's handle
     */
    Pkcs11.prototype.C_CloseSession = function (hSession) {
        return this.lib.C_CloseSession(hSession);
    };
    /**
     * C_CloseAllSessions closes all sessions with a token.
     * @param {number} slotID ID of the token's slot
     */
    Pkcs11.prototype.C_CloseAllSessions = function (slotID) {
        return this.lib.C_CloseAllSessions(slotID);
    };
    /**
     * C_GetSessionInfo obtains information about the session.
     * @param {number} hSession the session's handle
     * @param {Buffer} pInfo receives session info
     */
    Pkcs11.prototype.C_GetSessionInfo = function (hSession, pInfo) {
        return this.lib.C_GetSessionInfo(hSession, pInfo);
    };
    /**
     * C_GetOperationState obtains the state of the cryptographic operation in a session.
     * @param {number} hSession the session's handle
     * @param {Buffer} pOperationState gets state
     * @param {Buffer} pulOperationStateLen gets state length
     */
    Pkcs11.prototype.C_GetOperationState = function (hSession, pOperationState, pulOperationStateLen) {
        return this.lib.C_GetOperationState(hSession, pOperationState, pulOperationStateLen);
    };
    /**
     * C_SetOperationState restores the state of the cryptographic operation in a session.
     * @param {number} hSession the session's handle
     * @param {Buffer} pOperationState holds state
     * @param {number} ulOperationStateLen holds holds state length
     * @param {number} hEncryptionKey en/decryption key
     * @param {number} hAuthenticationKey sign/verify key
     */
    Pkcs11.prototype.C_SetOperationState = function (hSession, pOperationState, ulOperationStateLen, hEncryptionKey, hAuthenticationKey) {
        return this.lib.C_SetOperationState(hSession, pOperationState, ulOperationStateLen, hEncryptionKey, hAuthenticationKey);
    };
    /**
     * C_Login logs a user into a token.
     * @param {number} hSession the session's handle
     * @param {number} userType the user type
     * @param {Buffer} pPin the user's PIN
     * @param {number} ulPinLen the length of the PIN
     */
    Pkcs11.prototype.C_Login = function (hSession, userType, pPin, ulPinLen) {
        return this.lib.C_Login(hSession, userType, pPin, ulPinLen);
    };
    /**
     * C_Logout logs a user out from a token.
     * @param {number} hSession the session's handle
     */
    Pkcs11.prototype.C_Logout = function (hSession) {
        return this.lib.C_Logout(hSession);
    };
    /* Object management */
    /**
     * C_CreateObject creates a new object.
     * @param {number} hSession the session's handle
     * @param {Buffer} pTemplate the object's template
     * @param {number} ulCount attributes in template
     * @param {Buffer} phObject gets new object's handle
     */
    Pkcs11.prototype.C_CreateObject = function (hSession, pTemplate, ulCount, phObject) {
        return this.lib.C_CreateObject(hSession, pTemplate, ulCount, phObject);
    };
    /**
     * C_CopyObject copies an object, creating a new object for the copy.
     * @param {number} hSession the session's handle
     * @param {number} hObject the object's handle
     * @param {Buffer} pTemplate template for new object
     * @param {number} ulCount attributes in template
     * @param {Buffer} phNewObject receives handle of copy
     */
    Pkcs11.prototype.C_CopyObject = function (hSession, hObject, pTemplate, ulCount, phNewObject) {
        return this.lib.C_CopyObject(hSession, hObject, pTemplate, ulCount, phNewObject);
    };
    /**
     * C_DestroyObject destroys an object.
     * @param {number} hSession the session's handle
     * @param {number} hObject the object's handle
     */
    Pkcs11.prototype.C_DestroyObject = function (hSession, hObject) {
        return this.lib.C_DestroyObject(hSession, hObject);
    };
    /**
     * C_GetObjectSize gets the size of an object in bytes.
     * @param {number} hSession the session's handle
     * @param {number} hObject the object's handle
     * @param {Buffer} pulSize receives size of object
     */
    Pkcs11.prototype.C_GetObjectSize = function (hSession, hObject, pulSize) {
        return this.lib.C_GetObjectSize(hSession, hObject, pulSize);
    };
    /**
     * C_GetAttributeValue obtains the value of one or more object attributes.
     * @param {number} hSession the session's handle
     * @param {number} hObject the object's handle
     * @param {Buffer} pTemplate specifies attrs; gets vals
     * @param {number} ulCount attributes in template
     */
    Pkcs11.prototype.C_GetAttributeValue = function (hSession, hObject, pTemplate, ulCount) {
        return this.lib.C_GetAttributeValue(hSession, hObject, pTemplate, ulCount);
    };
    /**
     * C_SetAttributeValue modifies the value of one or more object attributes
     * @param {number} hSession the session's handle
     * @param {number} hObject the object's handle
     * @param {Buffer} pTemplate specifies attrs and values
     * @param {number} ulCount attributes in template
     */
    Pkcs11.prototype.C_SetAttributeValue = function (hSession, hObject, pTemplate, ulCount) {
        return this.lib.C_SetAttributeValue(hSession, hObject, pTemplate, ulCount);
    };
    /**
     * C_FindObjectsInit initializes a search for token and session
     * objects that match a template.
     * @param {number} hSession the session's handle
     * @param {Buffer} pTemplate attribute values to match
     * @param {number} ulCount attrs in search template
     */
    Pkcs11.prototype.C_FindObjectsInit = function (hSession, pTemplate, ulCount) {
        return this.lib.C_FindObjectsInit(hSession, pTemplate, ulCount);
    };
    /**
     * C_FindObjects continues a search for token and session
     * objects that match a template, obtaining additional object
     * handles.
     * @param {number} hSession the session's handle
     * @param {Buffer} phObject gets obj. handles
     * @param {number} ulMaxObjectCount max handles to get
     * @param {Buffer} pulObjectCount actual # returned
     */
    Pkcs11.prototype.C_FindObjects = function (hSession, phObject, ulMaxObjectCount, pulObjectCount) {
        return this.lib.C_FindObjects(hSession, phObject, ulMaxObjectCount, pulObjectCount);
    };
    /**
     * C_FindObjectsFinal finishes a search for token and session objects.
     * @param {number} hSession the session's handle
     */
    Pkcs11.prototype.C_FindObjectsFinal = function (hSession) {
        return this.lib.C_FindObjectsFinal(hSession);
    };
    /* Encryption and decryption */
    /**
     * C_EncryptInit initializes an encryption operation.
     * @param {number} hSession the session's handle
     * @param {number} pMechanism the encryption mechanism
     * @param {number} hKey handle of encryption key
     */
    Pkcs11.prototype.C_EncryptInit = function (hSession, pMechanism, hKey) {
        return this.lib.C_EncryptInit(hSession, pMechanism, hKey);
    };
    /**
     * C_Encrypt encrypts single-part data.
     * @param {number} hSession the session's handle
     * @param {Buffer} pData the plaintext data
     * @param {number} ulDataLen bytes of plaintext
     * @param {Buffer} pEncryptedData gets ciphertext
     * @param {Buffer} pulEncryptedDataLen gets c-text size
     */
    Pkcs11.prototype.C_Encrypt = function (hSession, pData, ulDataLen, pEncryptedData, pulEncryptedDataLen) {
        return this.lib.C_Encrypt(hSession, pData, ulDataLen, pEncryptedData, pulEncryptedDataLen);
    };
    /**
     * C_EncryptUpdate continues a multiple-part encryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext data len
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text size
     */
    Pkcs11.prototype.C_EncryptUpdate = function (hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen) {
        return this.lib.C_EncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen);
    };
    /**
     * C_EncryptFinal finishes a multiple-part encryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pLastEncryptedPart last c-text
     * @param {Buffer} pulLastEncryptedPartLen gets last size
     */
    Pkcs11.prototype.C_EncryptFinal = function (hSession, pLastEncryptedPart, pulLastEncryptedPartLen) {
        return this.lib.C_EncryptFinal(hSession, pLastEncryptedPart, pulLastEncryptedPartLen);
    };
    /**
     * C_DecryptInit initializes a decryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the decryption mechanism
     * @param {number} hKey handle of decryption key
     */
    Pkcs11.prototype.C_DecryptInit = function (hSession, pMechanism, hKey) {
        return this.lib.C_DecryptInit(hSession, pMechanism, hKey);
    };
    /**
     * C_Decrypt decrypts encrypted data in a single part.
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedData ciphertext
     * @param {number} ulEncryptedDataLen ciphertext length
     * @param {Buffer} pData gets plaintext
     * @param {number} pulDataLen gets p-text size
     */
    Pkcs11.prototype.C_Decrypt = function (hSession, pEncryptedData, ulEncryptedDataLen, pData, pulDataLen) {
        return this.lib.C_Decrypt(hSession, pEncryptedData, ulEncryptedDataLen, pData, pulDataLen);
    };
    /**
     * C_DecryptUpdate continues a multiple-part decryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart encrypted data
     * @param {number} ulEncryptedPartLen input length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen p-text size
     */
    Pkcs11.prototype.C_DecryptUpdate = function (hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen) {
        return this.lib.C_DecryptUpdate(hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen);
    };
    /**
     * C_DecryptFinal finishes a multiple-part decryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pLastPart gets plaintext
     * @param {Buffer} pulLastPartLen p-text size
     */
    Pkcs11.prototype.C_DecryptFinal = function (hSession, pLastPart, pulLastPartLen) {
        return this.lib.C_DecryptFinal(hSession, pLastPart, pulLastPartLen);
    };
    /* Message digesting */
    /**
     * C_DigestInit initializes a message-digesting operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the digesting mechanism
     */
    Pkcs11.prototype.C_DigestInit = function (hSession, pMechanism) {
        return this.lib.C_DigestInit(hSession, pMechanism);
    };
    /**
     * C_Digest digests data in a single part.
     * @param {number} hSession the session's handle
     * @param {Buffer} pData data to be digested
     * @param {number} ulDataLen bytes of data to digest
     * @param {Buffer} pDigest gets the message digest
     * @param {Buffer} pulDigestLen gets digest length
     */
    Pkcs11.prototype.C_Digest = function (hSession, pData, ulDataLen, pDigest, pulDigestLen) {
        return this.lib.C_Digest(hSession, pData, ulDataLen, pDigest, pulDigestLen);
    };
    /**
     * C_DigestUpdate continues a multiple-part message-digesting operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart data to be digested
     * @param {number} ulPartLen bytes of data to be digested
     */
    Pkcs11.prototype.C_DigestUpdate = function (hSession, pPart, ulPartLen) {
        return this.lib.C_DigestUpdate(hSession, pPart, ulPartLen);
    };
    /**
     * C_DigestKey continues a multi-part message-digesting operation,
     * by digesting the value of a secret key as part of
     * the data already digested.
     * @param {number} hSession the session's handle
     * @param {number} hKey secret key to digest
     */
    Pkcs11.prototype.C_DigestKey = function (hSession, hKey) {
        return this.lib.C_DigestKey(hSession, hKey);
    };
    /**
     * C_DigestFinal finishes a multiple-part message-digesting
     * operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pDigest gets the message digest
     * @param {Buffer} pulDigestLen gets byte count of digest
     */
    Pkcs11.prototype.C_DigestFinal = function (hSession, pDigest, pulDigestLen) {
        return this.lib.C_DigestFinal(hSession, pDigest, pulDigestLen);
    };
    /* Signing and MACing */
    /**
     * C_SignInit initializes a signature (private key encryption)
     * operation, where the signature is (will be) an appendix to
     * the data, and plaintext cannot be recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the signature mechanism
     * @param {number} hKey handle of signature key
     */
    Pkcs11.prototype.C_SignInit = function (hSession, pMechanism, hKey) {
        return this.lib.C_SignInit(hSession, pMechanism, hKey);
    };
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
    Pkcs11.prototype.C_Sign = function (hSession, pData, ulDataLen, pSignature, pulSignatureLen) {
        return this.lib.C_Sign(hSession, pData, ulDataLen, pSignature, pulSignatureLen);
    };
    /**
     * C_SignUpdate continues a multiple-part signature operation,
     * where the signature is (will be) an appendix to the data,
     * and plaintext cannot be recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the data to sign
     * @param {number} ulPartLen count of bytes to sign
     */
    Pkcs11.prototype.C_SignUpdate = function (hSession, pPart, ulPartLen) {
        return this.lib.C_SignUpdate(hSession, pPart, ulPartLen);
    };
    /**
     * C_SignFinal finishes a multiple-part signature operation,
     * returning the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     */
    Pkcs11.prototype.C_SignFinal = function (hSession, pSignature, pulSignatureLen) {
        return this.lib.C_SignFinal(hSession, pSignature, pulSignatureLen);
    };
    /**
     * C_SignRecoverInit initializes a signature operation, where
     * the data can be recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the signature mechanism
     * @param {number} hKey handle of the signature key
     */
    Pkcs11.prototype.C_SignRecoverInit = function (hSession, pMechanism, hKey) {
        return this.lib.C_SignRecoverInit(hSession, pMechanism, hKey);
    };
    /**
     * C_SignRecover signs data in a single operation, where the
     * data can be recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pData the data to sign
     * @param {number} ulDataLen count of bytes to sign
     * @param {Buffer} pSignature gets the signature
     * @param {Buffer} pulSignatureLen gets signature length
     */
    Pkcs11.prototype.C_SignRecover = function (hSession, pData, ulDataLen, pSignature, pulSignatureLen) {
        return this.lib.C_SignRecover(hSession, pData, ulDataLen, pSignature, pulSignatureLen);
    };
    /* Verifying signatures and MACs */
    /**
     * C_VerifyInit initializes a verification operation, where the
     * signature is an appendix to the data, and plaintext cannot
     * cannot be recovered from the signature (e.g. DSA).
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the verification mechanism
     * @param {number} hKey verification key
     */
    Pkcs11.prototype.C_VerifyInit = function (hSession, pMechanism, hKey) {
        return this.lib.C_VerifyInit(hSession, pMechanism, hKey);
    };
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
    Pkcs11.prototype.C_Verify = function (hSession, pData, ulDataLen, pSignature, ulSignatureLen) {
        return this.lib.C_Verify(hSession, pData, ulDataLen, pSignature, ulSignatureLen);
    };
    /**
     * C_VerifyUpdate continues a multiple-part verification
     * operation, where the signature is an appendix to the data,
     * and plaintext cannot be recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart signed data
     * @param {number} ulPartLen length of signed data
     */
    Pkcs11.prototype.C_VerifyUpdate = function (hSession, pPart, ulPartLen) {
        return this.lib.C_VerifyUpdate(hSession, pPart, ulPartLen);
    };
    /**
     * C_VerifyFinal finishes a multiple-part verification
     * operation, checking the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature signature to verify
     * @param {number} ulSignatureLen signature length
     */
    Pkcs11.prototype.C_VerifyFinal = function (hSession, pSignature, ulSignatureLen) {
        return this.lib.C_VerifyFinal(hSession, pSignature, ulSignatureLen);
    };
    /**
     * C_VerifyRecoverInit initializes a signature verification
     * operation, where the data is recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the verification mechanism
     * @param {number} hKey verification key
     */
    Pkcs11.prototype.C_VerifyRecoverInit = function (hSession, pMechanism, hKey) {
        return this.lib.C_VerifyRecoverInit(hSession, pMechanism, hKey);
    };
    /**
     * C_VerifyRecover verifies a signature in a single-part
     * operation, where the data is recovered from the signature.
     * @param {number} hSession the session's handle
     * @param {Buffer} pSignature signature to verify
     * @param {number} ulSignatureLen signature length
     * @param {Buffer} pData gets signed data
     * @param {Buffer} pulDataLen gets signed data len
     */
    Pkcs11.prototype.C_VerifyRecover = function (hSession, pSignature, ulSignatureLen, pData, pulDataLen) {
        return this.lib.C_VerifyRecover(hSession, pSignature, ulSignatureLen, pData, pulDataLen);
    };
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
    Pkcs11.prototype.C_DigestEncryptUpdate = function (hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen) {
        return this.lib.C_DigestEncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen);
    };
    /**
     * C_DecryptDigestUpdate continues a multiple-part decryption and
     * digesting operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart ciphertext
     * @param {number} ulEncryptedPartLen ciphertext length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen gets plaintext len
     */
    Pkcs11.prototype.C_DecryptDigestUpdate = function (hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen) {
        return this.lib.C_DecryptDigestUpdate(hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen);
    };
    /**
     * C_SignEncryptUpdate continues a multiple-part signing and
     * encryption operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pPart the plaintext data
     * @param {number} ulPartLen plaintext length
     * @param {Buffer} pEncryptedPart gets ciphertext
     * @param {Buffer} pulEncryptedPartLen gets c-text length
     */
    Pkcs11.prototype.C_SignEncryptUpdate = function (hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen) {
        return this.lib.C_SignEncryptUpdate(hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen);
    };
    /**
     * C_DecryptVerifyUpdate continues a multiple-part decryption and
     * verify operation.
     * @param {number} hSession the session's handle
     * @param {Buffer} pEncryptedPart ciphertext
     * @param {number} ulEncryptedPartLen ciphertext length
     * @param {Buffer} pPart gets plaintext
     * @param {Buffer} pulPartLen gets p-text length
     */
    Pkcs11.prototype.C_DecryptVerifyUpdate = function (hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen) {
        return this.lib.C_DecryptVerifyUpdate(hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen);
    };
    /* Key management */
    /**
     * C_GenerateKey generates a secret key, creating a new key object.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key generation mech.
     * @param {Buffer} pTemplate template for new key
     * @param {number} ulCount # of attrs in template
     * @param {Buffer} phKey gets handle of new key
     */
    Pkcs11.prototype.C_GenerateKey = function (hSession, pMechanism, pTemplate, ulCount, phKey) {
        return this.lib.C_GenerateKey(hSession, pMechanism, pTemplate, ulCount, phKey);
    };
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
    Pkcs11.prototype.C_GenerateKeyPair = function (hSession, pMechanism, pPublicKeyTemplate, ulPublicKeyAttributeCount, pPrivateKeyTemplate, ulPrivateKeyAttributeCount, phPublicKey, phPrivateKey) {
        return this.lib.C_GenerateKeyPair(hSession, pMechanism, pPublicKeyTemplate, ulPublicKeyAttributeCount, pPrivateKeyTemplate, ulPrivateKeyAttributeCount, phPublicKey, phPrivateKey);
    };
    /**
     * C_WrapKey wraps (i.e., encrypts) a key.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism the wrapping mechanism
     * @param {number} hWrappingKey wrapping key
     * @param {number} hKey key to be wrapped
     * @param {Buffer} pWrappedKey gets wrapped key
     * @param {Buffer} pulWrappedKeyLen gets wrapped key size
     */
    Pkcs11.prototype.C_WrapKey = function (hSession, pMechanism, hWrappingKey, hKey, pWrappedKey, pulWrappedKeyLen) {
        return this.lib.C_WrapKey(hSession, pMechanism, hWrappingKey, hKey, pWrappedKey, pulWrappedKeyLen);
    };
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
    Pkcs11.prototype.C_UnwrapKey = function (hSession, pMechanism, hUnwrappingKey, pWrappedKey, ulWrappedKeyLen, pTemplate, ulAttributeCount, phKey) {
        return this.lib.C_UnwrapKey(hSession, pMechanism, hUnwrappingKey, pWrappedKey, ulWrappedKeyLen, pTemplate, ulAttributeCount, phKey);
    };
    /**
     * C_DeriveKey derives a key from a base key, creating a new key object.
     * @param {number} hSession the session's handle
     * @param {Buffer} pMechanism key deriv. mech.
     * @param {number} hBaseKey base key
     * @param {Buffer} pTemplate new key template
     * @param {number} ulAttributeCount template length
     * @param {Buffer} phKey gets new handle
     */
    Pkcs11.prototype.C_DeriveKey = function (hSession, pMechanism, hBaseKey, pTemplate, ulAttributeCount, phKey) {
        return this.lib.C_DeriveKey(hSession, pMechanism, hBaseKey, pTemplate, ulAttributeCount, phKey);
    };
    /* Random number generation */
    /**
     * C_SeedRandom mixes additional seed material into the token's
     * random number generator.
     * @param {number} hSession the session's handle
     * @param {Buffer} pSeed the seed material
     * @param {number} ulSeedLen length of seed material
     */
    Pkcs11.prototype.C_SeedRandom = function (hSession, pSeed, ulSeedLen) {
        return this.lib.C_SeedRandom(hSession, pSeed, ulSeedLen);
    };
    /**
     * C_GenerateRandom generates random data.
     * @param {number} hSession the session's handle
     * @param {Buffer} pRandomData receives the random data
     * @param {number} ulRandomLen # of bytes to generate
     */
    Pkcs11.prototype.C_GenerateRandom = function (hSession, pRandomData, ulRandomLen) {
        return this.lib.C_GenerateRandom(hSession, pRandomData, ulRandomLen);
    };
    /* Parallel function management */
    /**
     * C_GetFunctionStatus is a legacy function; it obtains an
     * updated status of a function running in parallel with an
     * application.
     * @param {number} hSession the session's handle
     */
    Pkcs11.prototype.C_GetFunctionStatus = function (hSession) {
        return this.lib.C_GetFunctionStatus(hSession);
    };
    /**
     * C_CancelFunction is a legacy function; it cancels a function
     * running in parallel.
     * @param {number} hSession the session's handle
     */
    Pkcs11.prototype.C_CancelFunction = function (hSession) {
        return this.lib.C_CancelFunction(hSession);
    };
    /* Functions added in for Cryptoki Version 2.01 or later */
    /**
     * C_WaitForSlotEvent waits for a slot event (token insertion,
     * removal, etc.) to occur.
     * @param {number} flags blocking/nonblocking flag
     * @param {Buffer} pSlot location that receives the slot ID
     * @param {Buffer} pRserved reserved.  Should be NULL_PTR
     */
    Pkcs11.prototype.C_WaitForSlotEvent = function (flags, pSlot, pRserved) {
        if (pRserved === void 0) { pRserved = exports.NULL_PTR; }
        return this.lib.C_WaitForSlotEvent(flags, pSlot, pRserved);
    };
    return Pkcs11;
})();
exports.Pkcs11 = Pkcs11;
//# sourceMappingURL=pkcs11.js.map