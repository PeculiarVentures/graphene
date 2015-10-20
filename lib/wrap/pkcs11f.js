var ffi = require("ffi");
var t = require("./pkcs11t");

function copyTypes(m, t) {
    for (var i in t) {
        m[i] = t[i];
    }
}

function Cryptoki(path) {
    var cki = ffi.Library(path, {
        "C_Initialize": [t.CK_RV, [t.CK_VOID_PTR]],
        "C_Finalize": [t.CK_RV, [t.CK_VOID_PTR]],
        "C_GetInfo": [t.CK_RV, [t.CK_INFO_PTR]],
        //C_GetFunctionList
        "C_GetSlotList": [t.CK_RV, [t.CK_BBOOL, t.CK_SLOT_ID_PTR, t.CK_ULONG_PTR]],
        "C_GetSlotInfo": [t.CK_RV, [t.CK_SLOT_ID, t.CK_SLOT_INFO_PTR]],
        "C_GetTokenInfo": [t.CK_RV, [t.CK_SLOT_ID, t.CK_TOKEN_INFO_PTR]],
        //"C_InitToken": [t.CK_RV, [t.CK_SLOT_ID, t.CK_UTF8CHAR_PTR, t.CK_ULONG, t.CK_UTF8CHAR_PTR]],
        //"C_InitPIN": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_UTF8CHAR_PTR, t.CK_ULONG]],
        //"C_SetPIN": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_UTF8CHAR_PTR, t.CK_ULONG, t.CK_UTF8CHAR_PTR, t.CK_ULONG]],
        "C_OpenSession": [t.CK_RV, [t.CK_SLOT_ID, t.CK_FLAGS, t.CK_VOID_PTR, t.CK_VOID_PTR/*t.CK_NOTIFY*/, t.CK_SESSION_HANDLE_PTR]],
        "C_CloseSession": [t.CK_RV, [t.CK_SESSION_HANDLE]],
        "C_GetSessionInfo": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_SESSION_INFO_PTR]],
        "C_GetMechanismList": [t.CK_RV, [t.CK_SLOT_ID, t.CK_MECHANISM_TYPE_PTR, t.CK_ULONG_PTR]],
        "C_GetMechanismInfo": [t.CK_RV, [t.CK_SLOT_ID, t.CK_MECHANISM_TYPE, t.CK_MECHANISM_INFO_PTR]],
        //"C_GetOperationState": [t.CK_RV, [t.CK_SLOT_ID, t.CK_MECHANISM_TYPE, t.CK_MECHANISM_INFO_PTR]],
        //"C_SetOperationState": [t.CK_RV, [t.CK_SLOT_ID, t.CK_MECHANISM_TYPE, t.CK_MECHANISM_INFO_PTR]],
        "C_Login": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_USER_TYPE, "string", t.CK_ULONG]],
        "C_Logout": [t.CK_RV, [t.CK_SESSION_HANDLE]],
        /* Object management */
        // "C_CreateObject":[t.CK_RV, []],
        // "C_CopyObject":[t.CK_RV, []],
        "C_DestroyObject":[t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_OBJECT_HANDLE]],
        // "C_GetObjectSize":[t.CK_RV, []],
        "C_GetAttributeValue": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_OBJECT_HANDLE, t.CK_ATTRIBUTE_PTR, t.CK_ULONG]],
        // "C_SetAttributeValue":[t.CK_RV, []],
        "C_FindObjectsInit": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_ATTRIBUTE_PTR, t.CK_ULONG]],
        "C_FindObjects": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_OBJECT_HANDLE_PTR, t.CK_ULONG, t.CK_ULONG_PTR]],
        "C_FindObjectsFinal": [t.CK_RV, [t.CK_SESSION_HANDLE]],
        /* Message digesting functions */
        "C_DigestInit": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR]],
        "C_Digest": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_DigestUpdate": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG]],
        "C_DigestKey": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_OBJECT_HANDLE]],
        "C_DigestFinal": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        /* Message signing functions */
        "C_SignInit": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE]],
        "C_Sign": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_SignUpdate": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG]],
        "C_SignFinal": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        /* Message verifying functions */
        "C_VerifyInit": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE]],
        "C_Verify": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG]],
        "C_VerifyUpdate": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG]],
        "C_VerifyFinal": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG]],
        /* Encryption and decryption */
        /* Message encryption functions */
        "C_EncryptInit": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE]],
        "C_Encrypt": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_EncryptUpdate": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_EncryptFinal": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        /* Message decryption functions */
        "C_DecryptInit": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE]],
        "C_Decrypt": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_DecryptUpdate": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_DecryptFinal": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        /* Key management */
        "C_GenerateKey": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_ATTRIBUTE_PTR, t.CK_ULONG, t.CK_OBJECT_HANDLE_PTR]],
        "C_GenerateKeyPair": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_ATTRIBUTE_PTR, t.CK_ULONG, t.CK_ATTRIBUTE_PTR, t.CK_ULONG, t.CK_OBJECT_HANDLE_PTR, t.CK_OBJECT_HANDLE_PTR]],
        "C_WrapKey": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE_PTR, t.CK_OBJECT_HANDLE_PTR, t.CK_BYTE_PTR, t.CK_ULONG_PTR]],
        "C_UnwrapKey": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG, t.CK_ATTRIBUTE_PTR, t.CK_ULONG, t.CK_OBJECT_HANDLE_PTR]],
        "C_DeriveKey": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_MECHANISM_PTR, t.CK_OBJECT_HANDLE, t.CK_ATTRIBUTE_PTR, t.CK_ULONG, t.CK_OBJECT_HANDLE_PTR]],
        /* Random number generation */
        "C_SeedRandom": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG]],
        "C_GenerateRandom": [t.CK_RV, [t.CK_SESSION_HANDLE, t.CK_BYTE_PTR, t.CK_ULONG]],
        
    });
    return cki;
}

var exp = {
    Cryptoki: Cryptoki
};
copyTypes(exp, t);

module.exports = exp;