function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./pkcs11t"));
var FFI = require("ffi");
var pkcs11f_1 = require("./pkcs11f");
exports.NULL_PTR = null;
var Pkcs11 = (function () {
    function Pkcs11(libFile) {
        Object.defineProperty(this, "lib", {
            writable: true
        });
        this.lib = FFI.Library(libFile, pkcs11f_1.CK_FUNCTIONS);
    }
    Pkcs11.prototype.callFunction = function (funcName, args) {
        var func = this.lib[funcName];
        if (typeof args[args.length - 1] === "function")
            func.async.apply(this, args);
        else
            return func.apply(this, args);
    };
    Pkcs11.prototype.C_Initialize = function (pInitArgs, callback) {
        if (pInitArgs === void 0) { pInitArgs = exports.NULL_PTR; }
        return this.callFunction("C_Initialize", callback ? [pInitArgs, callback] : [pInitArgs]);
    };
    Pkcs11.prototype.C_Finalize = function (pReserved, callback) {
        if (pReserved === void 0) { pReserved = exports.NULL_PTR; }
        return this.callFunction("C_Finalize", callback ? [pReserved, callback] : [pReserved]);
    };
    Pkcs11.prototype.C_GetInfo = function (pInfo, callback) {
        return this.callFunction("C_GetInfo", arguments);
    };
    Pkcs11.prototype.C_GetSlotList = function (tokenPresent, pSlotList, pulCount) {
        return this.callFunction("C_GetSlotList", arguments);
    };
    Pkcs11.prototype.C_GetSlotInfo = function (slotID, pInfo, callback) {
        return this.callFunction("C_GetSlotInfo", arguments);
    };
    Pkcs11.prototype.C_GetTokenInfo = function (slotID, pInfo, callback) {
        return this.callFunction("C_GetTokenInfo", arguments);
    };
    Pkcs11.prototype.C_GetMechanismList = function (slotID, pMechanismList, pulCount, callback) {
        return this.callFunction("C_GetMechanismList", arguments);
    };
    Pkcs11.prototype.C_GetMechanismInfo = function (slotID, type, pInfo, callback) {
        return this.callFunction("C_GetMechanismInfo", arguments);
    };
    Pkcs11.prototype.C_InitToken = function (slotID, pPin, ulPinLen, pLabel, callback) {
        return this.callFunction("C_InitToken", arguments);
    };
    Pkcs11.prototype.C_InitPIN = function (hSession, pPin, ulPinLen, callback) {
        return this.callFunction("C_InitPIN", arguments);
    };
    Pkcs11.prototype.C_SetPIN = function (hSession, pOldPin, ulOldLen, pNewPin, ulNewLen, callback) {
        return this.callFunction("C_SetPIN", arguments);
    };
    Pkcs11.prototype.C_OpenSession = function (slotID, flags, pApplication, notify, phSession, callback) {
        if (pApplication === void 0) { pApplication = exports.NULL_PTR; }
        if (notify === void 0) { notify = exports.NULL_PTR; }
        if (phSession === void 0) { phSession = exports.NULL_PTR; }
        return this.callFunction("C_OpenSession", callback ? [slotID, flags, pApplication, notify, phSession, callback] : [slotID, flags, pApplication, notify, phSession]);
    };
    Pkcs11.prototype.C_CloseSession = function (hSession, callback) {
        return this.callFunction("C_CloseSession", arguments);
    };
    Pkcs11.prototype.C_CloseAllSessions = function (slotID, callback) {
        return this.callFunction("C_CloseAllSessions", arguments);
    };
    Pkcs11.prototype.C_GetSessionInfo = function (hSession, pInfo, callback) {
        return this.callFunction("C_GetSessionInfo", arguments);
    };
    Pkcs11.prototype.C_GetOperationState = function (hSession, pOperationState, pulOperationStateLen, callback) {
        return this.callFunction("C_GetOperationState", arguments);
    };
    Pkcs11.prototype.C_SetOperationState = function (hSession, pOperationState, ulOperationStateLen, hEncryptionKey, hAuthenticationKey, callback) {
        return this.callFunction("C_SetOperationState", arguments);
    };
    Pkcs11.prototype.C_Login = function (hSession, userType, pPin, ulPinLen, callback) {
        return this.callFunction("C_Login", arguments);
    };
    Pkcs11.prototype.C_Logout = function (hSession, callback) {
        return this.callFunction("C_Logout", arguments);
    };
    Pkcs11.prototype.C_CreateObject = function (hSession, pTemplate, ulCount, phObject, callback) {
        return this.callFunction("C_CreateObject", arguments);
    };
    Pkcs11.prototype.C_CopyObject = function (hSession, hObject, pTemplate, ulCount, phNewObject, callback) {
        return this.callFunction("C_CopyObject", arguments);
    };
    Pkcs11.prototype.C_DestroyObject = function (hSession, hObject, callback) {
        return this.callFunction("C_DestroyObject", arguments);
    };
    Pkcs11.prototype.C_GetObjectSize = function (hSession, hObject, pulSize, callback) {
        return this.callFunction("C_GetObjectSize", arguments);
    };
    Pkcs11.prototype.C_GetAttributeValue = function (hSession, hObject, pTemplate, ulCount, callback) {
        return this.callFunction("C_GetAttributeValue", arguments);
    };
    Pkcs11.prototype.C_SetAttributeValue = function (hSession, hObject, pTemplate, ulCount, callback) {
        return this.callFunction("C_SetAttributeValue", arguments);
    };
    Pkcs11.prototype.C_FindObjectsInit = function (hSession, pTemplate, ulCount, callback) {
        return this.callFunction("C_FindObjectsInit", arguments);
    };
    Pkcs11.prototype.C_FindObjects = function (hSession, phObject, ulMaxObjectCount, pulObjectCount, callback) {
        return this.callFunction("C_FindObjects", arguments);
    };
    Pkcs11.prototype.C_FindObjectsFinal = function (hSession, callback) {
        return this.callFunction("C_FindObjectsFinal", arguments);
    };
    Pkcs11.prototype.C_EncryptInit = function (hSession, pMechanism, hKey, callback) {
        return this.callFunction("C_EncryptInit", arguments);
    };
    Pkcs11.prototype.C_Encrypt = function (hSession, pData, ulDataLen, pEncryptedData, pulEncryptedDataLen, callback) {
        return this.callFunction("C_Encrypt", arguments);
    };
    Pkcs11.prototype.C_EncryptUpdate = function (hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen, callback) {
        return this.callFunction("C_EncryptUpdate", arguments);
    };
    Pkcs11.prototype.C_EncryptFinal = function (hSession, pLastEncryptedPart, pulLastEncryptedPartLen, callback) {
        return this.callFunction("C_EncryptFinal", arguments);
    };
    Pkcs11.prototype.C_DecryptInit = function (hSession, pMechanism, hKey, callback) {
        return this.callFunction("C_DecryptInit", arguments);
    };
    Pkcs11.prototype.C_Decrypt = function (hSession, pEncryptedData, ulEncryptedDataLen, pData, pulDataLen, callback) {
        return this.callFunction("C_Decrypt", arguments);
    };
    Pkcs11.prototype.C_DecryptUpdate = function (hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen, callback) {
        return this.callFunction("C_DecryptUpdate", arguments);
    };
    Pkcs11.prototype.C_DecryptFinal = function (hSession, pLastPart, pulLastPartLen, callback) {
        return this.callFunction("C_DecryptFinal", arguments);
    };
    Pkcs11.prototype.C_DigestInit = function (hSession, pMechanism, callback) {
        return this.callFunction("C_DigestInit", arguments);
    };
    Pkcs11.prototype.C_Digest = function (hSession, pData, ulDataLen, pDigest, pulDigestLen, callback) {
        return this.callFunction("C_Digest", arguments);
    };
    Pkcs11.prototype.C_DigestUpdate = function (hSession, pPart, ulPartLen, callback) {
        return this.callFunction("C_DigestUpdate", arguments);
    };
    Pkcs11.prototype.C_DigestKey = function (hSession, hKey, callback) {
        return this.callFunction("C_DigestKey", arguments);
    };
    Pkcs11.prototype.C_DigestFinal = function (hSession, pDigest, pulDigestLen, callback) {
        return this.callFunction("C_DigestFinal", arguments);
    };
    Pkcs11.prototype.C_SignInit = function (hSession, pMechanism, hKey, callback) {
        return this.callFunction("C_SignInit", arguments);
    };
    Pkcs11.prototype.C_Sign = function (hSession, pData, ulDataLen, pSignature, pulSignatureLen, callback) {
        return this.callFunction("C_Sign", arguments);
    };
    Pkcs11.prototype.C_SignUpdate = function (hSession, pPart, ulPartLen, callback) {
        return this.callFunction("C_SignUpdate", arguments);
    };
    Pkcs11.prototype.C_SignFinal = function (hSession, pSignature, pulSignatureLen, callback) {
        return this.callFunction("C_SignFinal", arguments);
    };
    Pkcs11.prototype.C_SignRecoverInit = function (hSession, pMechanism, hKey, callback) {
        return this.callFunction("C_SignRecoverInit", arguments);
    };
    Pkcs11.prototype.C_SignRecover = function (hSession, pData, ulDataLen, pSignature, pulSignatureLen, callback) {
        return this.callFunction("C_SignRecover", arguments);
    };
    Pkcs11.prototype.C_VerifyInit = function (hSession, pMechanism, hKey, callback) {
        return this.callFunction("C_VerifyInit", arguments);
    };
    Pkcs11.prototype.C_Verify = function (hSession, pData, ulDataLen, pSignature, ulSignatureLen, callback) {
        return this.callFunction("C_Verify", arguments);
    };
    Pkcs11.prototype.C_VerifyUpdate = function (hSession, pPart, ulPartLen, callback) {
        return this.callFunction("C_VerifyUpdate", arguments);
    };
    Pkcs11.prototype.C_VerifyFinal = function (hSession, pSignature, ulSignatureLen, callback) {
        return this.callFunction("C_VerifyFinal", arguments);
    };
    Pkcs11.prototype.C_VerifyRecoverInit = function (hSession, pMechanism, hKey, callback) {
        return this.callFunction("C_VerifyRecoverInit", arguments);
    };
    Pkcs11.prototype.C_VerifyRecover = function (hSession, pSignature, ulSignatureLen, pData, pulDataLen, callback) {
        return this.callFunction("C_VerifyRecovers", arguments);
    };
    Pkcs11.prototype.C_DigestEncryptUpdate = function (hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen, callback) {
        return this.callFunction("C_DigestEncryptUpdate", arguments);
    };
    Pkcs11.prototype.C_DecryptDigestUpdate = function (hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen, callback) {
        return this.callFunction("C_DecryptDigestUpdate", arguments);
    };
    Pkcs11.prototype.C_SignEncryptUpdate = function (hSession, pPart, ulPartLen, pEncryptedPart, pulEncryptedPartLen, callback) {
        return this.callFunction("C_SignEncryptUpdate", arguments);
    };
    Pkcs11.prototype.C_DecryptVerifyUpdate = function (hSession, pEncryptedPart, ulEncryptedPartLen, pPart, pulPartLen, callback) {
        return this.callFunction("C_DecryptVerifyUpdate", arguments);
    };
    Pkcs11.prototype.C_GenerateKey = function (hSession, pMechanism, pTemplate, ulCount, phKey, callback) {
        return this.callFunction("C_GenerateKey", arguments);
    };
    Pkcs11.prototype.C_GenerateKeyPair = function (hSession, pMechanism, pPublicKeyTemplate, ulPublicKeyAttributeCount, pPrivateKeyTemplate, ulPrivateKeyAttributeCount, phPublicKey, phPrivateKey, callback) {
        return this.callFunction("C_GenerateKeyPair", arguments);
    };
    Pkcs11.prototype.C_WrapKey = function (hSession, pMechanism, hWrappingKey, hKey, pWrappedKey, pulWrappedKeyLen, callback) {
        return this.callFunction("C_WrapKey", arguments);
    };
    Pkcs11.prototype.C_UnwrapKey = function (hSession, pMechanism, hUnwrappingKey, pWrappedKey, ulWrappedKeyLen, pTemplate, ulAttributeCount, phKey, callback) {
        return this.callFunction("C_UnwrapKey", arguments);
    };
    Pkcs11.prototype.C_DeriveKey = function (hSession, pMechanism, hBaseKey, pTemplate, ulAttributeCount, phKey, callback) {
        return this.callFunction("C_DeriveKey", arguments);
    };
    Pkcs11.prototype.C_SeedRandom = function (hSession, pSeed, ulSeedLen, callback) {
        return this.callFunction("C_SeedRandom", arguments);
    };
    Pkcs11.prototype.C_GenerateRandom = function (hSession, pRandomData, ulRandomLen, callback) {
        return this.callFunction("C_GenerateRandom", arguments);
    };
    Pkcs11.prototype.C_GetFunctionStatus = function (hSession, callback) {
        return this.callFunction("C_GetFunctionStatus", arguments);
    };
    Pkcs11.prototype.C_CancelFunction = function (hSession, callback) {
        return this.callFunction("C_CancelFunction", arguments);
    };
    Pkcs11.prototype.C_WaitForSlotEvent = function (flags, pSlot, pRserved, callback) {
        if (pRserved === void 0) { pRserved = exports.NULL_PTR; }
        return this.callFunction("C_WaitForSlotEvent", arguments);
    };
    return Pkcs11;
})();
exports.Pkcs11 = Pkcs11;
