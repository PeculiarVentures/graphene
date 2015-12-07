
// Buffer class
interface Buffer extends NodeBuffer { }

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare var Buffer: {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     */
    new (str: string, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     */
    new (size: number): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: Uint8Array): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: any[]): Buffer;
    prototype: Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    isBuffer(obj: any): boolean;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    isEncoding(encoding: string): boolean;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    byteLength(string: string, encoding?: string): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    concat(list: Buffer[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    compare(buf1: Buffer, buf2: Buffer): number;
};

/**
 * @deprecated
 */
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): any;
    length: number;
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAsset?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt8(value: number, offset: number, noAssert?: boolean): void;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): void;
    fill(value: any, offset?: number, end?: number): void;
}

declare module "graphene-pk11" {

	export var Enums: {
		ObjectClass: ObjectClass;
		UserType: UserType;
		SessionFlags: SessionFlags;
		CryptokiResult: CryptokiResult;
		CertificateType: CertificateType;
		CertificateCategory: CertificateCategory;
		Attribute: Attribute;
		KeyType: KeyType;
		MechanismInformationFlags: MechanismInformationFlags;
		Mechanism: Mechanism;
	}
	
	/**
	 * Base class for Enums
	 */
	class Enum {
		/**
		 * Returns true if there is a value in enum
		 * @param v Enum value
		 */
		hasValue(v: number): boolean;
		/**
		 * Returns name from enum by value
		 * @param Enum value
		 */
		getText(v: number): string;
	}


	class ObjectClass extends Enum {
		/**
		 * Data objects (object class CKO_DATA) hold information defined by an application
		 */
		Data: number;
		/**
		 * Certificate objects (object class CKO_CERTIFICATE) hold public-key or attribute certificates
		 */
		Certificate: number;
		/**
		 * Public key objects (object class CKO_PUBLIC_KEY) hold public keys
		 */
		PublicKey: number;
		/**
		 * Private key objects (object class CKO_PRIVATE_KEY) hold private keys  
		 */
		PrivateKey: number;
		/**
		 * Secret key objects (object class CKO_SECRET_KEY) hold secret keys
		 */
		SecretKey: number;
		/**
		 * Hardware feature objects (CKO_HW_FEATURE) represent features of the device
		 */
		HardwareFeature: number;
		/**
		 * Domain parameter objects (object class CKO_DOMAIN_PARAMETERS) hold public domain parameters
		 */
		DomainParameters: number;
		/**
		 * Mechanism objects provide information about mechanisms supported by a device beyond 
		 * that given by the CK_MECHANISM_INFO structure
		 */
		Mechanism: number;
		OTPKey: number;
		VendorDefined: number;
	}

	class UserType extends Enum {
		/**
		 *  Security Officer 
		 */
		SO: number;
		/** 
		 * Normal user 
		 */
		User: number;
		/** 
		 * Context specific (added in v2.20) 
		 */
		ContextSpecific: number;
	}

	class SessionFlags extends Enum {
		/**
		* session is r/w
		*/
		ReadWrite: number;
		/**
		* no parallel 
		*/
		Serial: number;
	}

	class CryptokiResult extends Enum {
		OK: number;
		Cancel: number;
		HostMemory: number;
		SlotIdInvalid: number;
	
		/* CKR_FLAGS_INVALID was removed for v2.0 */
		
		/**
		* is new for v2.0
		*/
		GeneralError: number;
		/**
		* is new for v2.0
		*/
		FunctionFailed: number;
	
		/**
		* is new for v2.01
		*/
		ArgumentsBad: number;
		/**
		* is new for v2.01
		*/
		NoEvent: number;
		/**
		* is new for v2.01
		*/
		NeedToCreateThreads: number;
		/**
		* is new for v2.01
		*/
		CantLock: number;

		AttribureReadOnly: number;
		AttributeSensitive: number;
		AttributeTypeInvalid: number;
		AttributeValueInvalid: number;
		DataInvalid: number;
		DataLenRange: number;
		DeviceError: number;
		DeviceMemory: number;
		EncryptedDataInvalid: number;
		EncryptedDataLenRange: number;
		FunctionCanceled: number;
		FunctionNotParallel: number;

		/**
		 * is new for v2.0 
		 */
		FunctionNotSupported: number;

		KeyHandleInvalid: number;

		/* CKR_KEY_SENSITIVE was removed for v2.0 */

		KeySizeRange: number;
		KeyTypeInconsistent: number;
	
		/**
		 * is new for v2.0
		 */
		KeyNotNeeded: number;
		/**
		 * is new for v2.0
		 */
		KeyChanged: number;
		/**
		 * is new for v2.0
		 */
		KeyNeeded: number;
		/**
		 * is new for v2.0
		 */
		KeyIndigestible: number;
		/**
		 * is new for v2.0
		 */
		FunctionNotPermited: number;
		/**
		 * is new for v2.0
		 */
		KeyNotWrappable: number;
		/**
		 * is new for v2.0
		 */
		KeyUnextractable: number;

		MechanismInvalid: number;
		MechanismParamInvalid: number;

		/* CKR_OBJECT_CLASS_INCONSISTENT and CKR_OBJECT_CLASS_INVALID
 		* were removed for v2.0 */
		ObjectHandleInvalid: number;
		OperationActive: number;
		OperationNotInicialized: number;
		PinIncorrect: number;
		PinInvalid: number;
		PinLenRange: number;

		/**
		 * is new for v2.0
		 */
		PinExpired: number;
		/**
		 * is new for v2.0
		 */
		PinLocked: number;

		SessionClosed: number;
		SessionCount: number;
		SessionHandleInvalid: number;
		SessionPaeallelNotSuported: number;
		SessionReadOnly: number;
		SsessionExists: number;

		/**
		 * is new for v2.0
		 */
		SessionReadOnlyExists: number;
		/**
		 * is new for v2.0
		 */
		SessionReadWriteSoExists: number;

		SignatureInvalid: number;
		SignatureLenRange: number;
		TemplateIncomplete: number;
		TemplateInconsistent: number;
		TokenNotPresent: number;
		TokenNotRegistered: number;
		TokenWritrProtected: number;
		UnwrappingKeyHandleInvalid: number;
		UnwrappingKeySizeRange: number;
		UnwrappingKeyTypeInconsisten: number;
		UserAlreadyLoggedIn: number;
		UserNotLoggedIn: number;
		UserPinNotInitialized: number;
		UserTypeInvalid: number;

		/**
 		 * is new to v2.01 
		 */
		UserAnotherAlreadyLoggedIn: number;
		/**
 		 * is new to v2.01 
		 */
		UserTooManyTypes: number;

		WrappedKeyInvalid: number;
		WrappedKeyLenRange: number;
		WrappingKeyHandleInvalid: number;
		WrappingKeySizeRange: number;
		WrappingKeyTypeInconsistent: number;
		RandomSeedNotSupported: number;

		/**
		 * is new to v2.0 
		 */
		RandomNoRNG: number;

		/** 
		 * is new to v2.11 
		 */
		DomainParamsInvalid: number;

		/** 
		 * is new to v2.0 
		 */
		BufferTooSmall: number;
		/** 
		 * is new to v2.0 
		 */
		SavedStateInvalid: number;
		/** 
		 * is new to v2.0 
		 */
		InformationSensitive: number;
		/** 
		 * is new to v2.0 
		 */
		StateUnsaveable: number;

		/** 
		 * is new to v2.01 
		 */
		CryptokiNotInicialized: number;
		/** 
		 * is new to v2.01 
		 */
		CryptokiAlreadyInitialized: number;
		/** 
		 * is new to v2.01 
		 */
		MutexBad: number;
		/** 
		 * is new to v2.01 
		 */
		MutexNotLocked: number;

		/**
		 * is new for PKCS #11 v2.20 amendment 3 
		 */
		NewPinMode: number;
		/**
		 * is new for PKCS #11 v2.20 amendment 3 
		 */
		NextOTP: number;

		/** 
		 * This is new to v2.20 
		 */
		FunctionRejected: number;

		VendorDefined: number;
	}

	class CertificateType extends Enum {
		/**
		 * X.509 certificate objects (certificate type CKC_X_509) hold X.509 public key certificates
		 * 
		 */
		X509Certificate: number;
		/**
		 * X.509 attribute certificate objects (certificate type CKC_X_509_ATTR_CERT) hold X.509 attribute certificates
		 * is new for v2.10 
		 */
		X509CertificateAttribute: number;
		/**
		 * WTLS certificate objects (certificate type CKC_WTLS) hold WTLS public key certificates
		 * is new for v2.20
		 */
		WTLS: number;
		VendorDefined: number;
	}

	class CertificateCategory extends Enum {
		Unspecified: number;
		TokenUser: number;
		Authority: number;
		OtherEntity: number;
	}

	class Attribute extends Enum {
		/* The following attribute types are defined: */
		class: number;
		token: number;
		"private": number;
		label: number;
		application: number;
		value: number;

		/**
		 * is new for v2.10 
		 */
		objectId: number;

		certType: number;
		issuer: number;
		serial: number;

		/**
		 * is new for v2.10 
		 */
		issuerAC: number;
		/**
		 * is new for v2.10 
		 */
		owner: number;
		/**
		 * is new for v2.10 
		 */
		attrTypes: number;

		/**
		 * is new for v2.11 
		 */
		trusted: number;

		/**
		 * is new for v2.20 
		 */
		certCategory: number;
		/**
		 * is new for v2.20 
		 */
		javaDomain: number;
		/**
		 * is new for v2.20 
		 */
		url: number;
		/**
		 * is new for v2.20 
		 */
		subjectHash: number;
		/**
		 * is new for v2.20 
		 */
		issuerHash: number;
		/**
		 * is new for v2.20 
		 */
		checkValue: number;

		keyType: number;
		subject: number;
		id: number;
		sensitive: number;
		encrypt: number;
		decrypt: number;
		wrap: number;
		unwrap: number;
		sign: number;
		signRecover: number;
		verify: number;
		verifyRecover: number;
		derive: number;
		startDate: number;
		endDate: number;
		modulus: number;
		modulusBits: number;
		publicExp: number;
		privateExp: number;
		prime1: number;
		prime2: number;
		exp1: number;
		exp2: number;
		coef: number;
		prime: number;
		subprime: number;
		base: number;

		/** 
		 * is new for v2.11 
		 */
		primeBits: number;
		/** 
		 * is new for v2.11 
		 */
		subprimeBits: number;
		/* (To retain backwards-compatibility) */

		valueBits: number;
		valueLen: number;

		/**
		 * is new for v2.0 
		 */
		extractable: number;
		/**
		 * is new for v2.0 
		 */
		local: number;
		/**
		 * is new for v2.0 
		 */
		neverExtractable: number;
		/**
		 * is new for v2.0 
		 */
		alwaysSensitive: number;

		/**
		 * is new for v2.11
		 */
		keyGenMechanism: number;

		/**
		 * is new for v2.0 
		 */
		modifiable: number;

		/**
		 * is new for v2.0, is deprecated in v2.11
		 */
		paramsECDSA: number;
		/**
		 * is new for v2.0, is preferred 
		 */
		paramsEC: number;

		/**
		 * is new for v2.0 
		 */
		pointEC: number;

		/**
 		 * is new for v2.10. Deprecated in v2.11 and onwards. 
		 */
		secondaryAuth: number;
		/**
 		 * is new for v2.10. Deprecated in v2.11 and onwards. 
		 */
		AuthPinFlags: number;

		/**
		 * new for v2.20 
		 */
		alwaysAuth: number;
		/**
		 * new for v2.20 
		 */
		WrapWithTrusted: number;
		/**
		 * new for v2.20 
		 */
		WrapTemplate: number;
		/**
		 * new for v2.20 
		 */
		UnwrapTemplate: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpFormat: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpLength: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpTimeInterval: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpUserFriendlyMode: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpChallengeReq: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpTimeReq: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpCounterReq: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otppinReq: number;
		otpCounter: number;
		otpTime: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		OtpUserId: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpServiceId: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpServiceLogo: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3. 
		 */
		otpServiceLogoType: number;


		/**
		 * new for v2.10 
		 */
		hwFeatureType: number;
		/**
		 * new for v2.10 
		 */
		resetOnInit: number;
		/**
		 * new for v2.10 
		 */
		hasReset: number;

		/**
		 * new for v2.20 
		 */
		pixelX: number;
		/**
		 * new for v2.20 
		 */
		pixelY: number;
		/**
		 * new for v2.20 
		 */
		resolution: number;
		/**
		 * new for v2.20 
		 */
		charRows: number;
		/**
		 * new for v2.20 
		 */
		charCols: number;
		/**
		 * new for v2.20 
		 */
		color: number;
		/**
		 * new for v2.20 
		 */
		bitsPerPixel: number;
		/**
		 * new for v2.20 
		 */
		charSets: number;
		/**
		 * new for v2.20 
		 */
		encMethod: number;
		/**
		 * new for v2.20 
		 */
		mimeTypes: number;
		/**
		 * new for v2.20 
		 */
		mechanismType: number;
		/**
		 * new for v2.20 
		 */
		requiredCmsAttrs: number;
		/**
		 * new for v2.20 
		 */
		defaultCmsAttrs: number;
		/**
		 * new for v2.20 
		 */
		suportedCmsAttrs: number;
		/**
		 * new for v2.20 
		 */
		allowedMechanisms: number;
	}

	class KeyType extends Enum {
		RSA: number;
		DSA: number;
		DH: number;

		/**
		 * new in v2.0, deprecated in v2.11
		 */
		ECDSA: number;
		/**
		 * new in v2.0, preferred
		 */
		EC: number;
		/**
		 * new in v2.0
		 */
		X9_42_DH: number;
		/**
		 * new in v2.0
		 */
		KEA: number;

		GENERIC_SECRET: number;
		RC2: number;
		RC4: number;
		DES: number;
		DES2: number;
		DES3: number;

		/**
		 * new for v2.0 
		 */
		CAST: number;
		/**
		 * new for v2.0 
		 */
		CAST3: number;
		/**
		 * new for v2.0, deprecated in v2.11
		 */
		CAST5: number;
		/**
		 * new for v2.0, preferred
		 */
		CAST128: number;
		/**
		 * new for v2.0 
		 */
		RC5: number;
		/**
		 * new for v2.0 
		 */
		IDEA: number;
		/**
		 * new for v2.0 
		 */
		SKIPJACK: number;
		/**
		 * new for v2.0 
		 */
		BATON: number;
		/**
		 * new for v2.0 
		 */
		JUNIPER: number;
		/**
		 * new for v2.0 
		 */
		CDMF: number;
		/**
		 * new for v2.0 
		 */
		AES: number;

		/**
		 * new for v2.20 
		 */
		BLOWFISH: number;
		/**
		 * new for v2.20 
		 */
		TWOFISH: number;

		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		SECURID: number;
		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		HOTP: number;
		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		ACTI: number;
	
		/* GOST KEY TYPES */
		GOSTR3410: number;
		GOSTR3411: number;
		GOST28147: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		ARIA: number;

		VENDOR_DEFINED: number;
	}

	class MechanismInformationFlags extends Enum {
		Hardware: number;
		Encrypt: number;
		Decrypt: number;
		Digest: number;
		Sign: number;
		SignRecover: number;
		Verify: number;
		VerifyRecover: number;
		Generate: number;
		GenerateKeyPair: number;
		Wrap: number;
		Unwrap: number;
		Derive: number;
		Extension: number;
	}

	class Mechanism extends Enum {
		RSA_PKCS_KEY_PAIR_GEN: number;
		RSA_PKCS: number;
		RSA_9796: number;
		RSA_X_509: number;

		/**
		 * new for v2.0.  It's a mechanism for hash and sign 
		 */
		MD2_RSA_PKCS: number;
		/**
		 * new for v2.0.  It's a mechanism for hash and sign 
		 */
		MD5_RSA_PKCS: number;
		/**
		 * new for v2.0.  It's a mechanism for hash and sign 
		 */
		SHA1_RSA_PKCS: number;

		/** 
		 * new for v2.10 
		 */
		RIPEMD128_RSA_PKCS: number;
		/** 
		 * new for v2.10 
		 */
		RIPEMD160_RSA_PKCS: number;
		/** 
		 * new for v2.10 
		 */
		RSA_PKCS_OAEP: number;

		/**
		 * new for v2.11 
		 */
		RSA_X9_31_KEY_PAIR_GEN: number;
		/**
		 * new for v2.11 
		 */
		RSA_X9_31: number;
		/**
		 * new for v2.11 
		 */
		SHA1_RSA_X9_31: number;
		/**
		 * new for v2.11 
		 */
		RSA_PKCS_PSS: number;
		/**
		 * new for v2.11 
		 */
		SHA1_RSA_PKCS_PSS: number;

		DSA_KEY_PAIR_GEN: number;
		DSA: number;
		DSA_SHA1: number;
		DH_PKCS_KEY_PAIR_GEN: number;
		DH_PKCS_DERIVE: number;

		/**
		 * new for v2.11 
		 */
		X9_42_DH_KEY_PAIR_GEN: number;
		/**
		 * new for v2.11 
		 */
		X9_42_DH_DERIVE: number;
		/**
		 * new for v2.11 
		 */
		X9_42_DH_HYBRID_DERIVE: number;
		/**
		 * new for v2.11 
		 */
		X9_42_MQV_DERIVE: number;

		/**
		 * new for v2.20 
		 */
		SHA256_RSA_PKCS: number;
		/**
		 * new for v2.20 
		 */
		SHA384_RSA_PKCS: number;
		/**
		 * new for v2.20 
		 */
		SHA512_RSA_PKCS: number;
		/**
		 * new for v2.20 
		 */
		SHA256_RSA_PKCS_PSS: number;
		/**
		 * new for v2.20 
		 */
		SHA384_RSA_PKCS_PSS: number;
		/**
		 * new for v2.20 
		 */
		SHA512_RSA_PKCS_PSS: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		SHA224_RSA_PKCS: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		SHA224_RSA_PKCS_PSS: number;

		RC2_KEY_GEN: number;
		RC2_ECB: number;
		RC2_CBC: number;
		RC2_MAC: number;

		/**
		 * new for v2.0 
		 */
		RC2_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		RC2_CBC_PAD: number;

		RC4_KEY_GEN: number;
		RC4: number;
		DES_KEY_GEN: number;
		DES_ECB: number;
		DES_CBC: number;
		DES_MAC: number;

		/**
		 * new for v2.0 
		 */
		DES_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		DES_CBC_PAD: number;

		DES2_KEY_GEN: number;
		DES3_KEY_GEN: number;
		DES3_ECB: number;
		DES3_CBC: number;
		DES3_MAC: number;

		/**
		 * new for v2.0 
		 */
		DES3_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		DES3_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		CDMF_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		CDMF_ECB: number;
		/**
		 * new for v2.0 
		 */
		CDMF_CBC: number;
		/**
		 * new for v2.0 
		 */
		CDMF_MAC: number;
		/**
		 * new for v2.0 
		 */
		CDMF_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		CDMF_CBC_PAD: number;

		DES3_CMAC_GENERAL: number;
		DES3_CMAC: number;

		/**
		 * new for v2.20 
		 */
		DES_OFB64: number;
		/**
		 * new for v2.20 
		 */
		DES_OFB8: number;
		/**
		 * new for v2.20 
		 */
		DES_CFB64: number;
		/**
		 * new for v2.20 
		 */
		DES_CFB8: number;

		MD2: number;

		/**
		 * new for v2.0 
		 */
		MD2_HMAC: number;
		/**
		 * new for v2.0 
		 */
		MD2_HMAC_GENERAL: number;

		MD5: number;

		/** 
		 * new for v2.0 
		 */
		MD5_HMAC: number;
		/** 
		 * new for v2.0 
		 */
		MD5_HMAC_GENERAL: number;

		SHA1: number;
		SHA: number;
		"SHA-1": number;
		SHA_1: number;

		/**
		 * new for v2.0 
		 */
		SHA_1_HMAC: number;
		/**
		 * new for v2.0 
		 */
		SHA_1_HMAC_GENERAL: number;

		/**
		 * new for v2.10 
		 */
		RIPEMD128: number;
		/**
		 * new for v2.10 
		 */
		RIPEMD128_HMAC: number;
		/**
		 * new for v2.10 
		 */
		RIPEMD128_HMAC_GENERAL: number;
		/**
		 * new for v2.10 
		 */
		RIPEMD160: number;
		/**
		 * new for v2.10 
		 */
		RIPEMD160_HMAC: number;
		/**
		 * new for v2.10 
		 */
		RIPEMD160_HMAC_GENERAL: number;

		/**
		 * new for v2.20 
		 */
		SHA256: number;
		/**
		 * new for v2.20 
		 */
		SHA256_HMAC: number;
		/**
		 * new for v2.20 
		 */
		SHA256_HMAC_GENERAL: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		SHA224: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		SHA224_HMAC: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		SHA224_HMAC_GENERAL: number;

		SHA384: number;
		SHA384_HMAC: number;
		SHA384_HMAC_GENERAL: number;
		SHA512: number;
		SHA512_HMAC: number;
		SHA512_HMAC_GENERAL: number;

		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		SECURID_KEY_GEN: number;
		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		SECURID: number;

		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		HOTP_KEY_GEN: number;
		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		HOTP: number;

		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		ACTI: number;
		/**
		 * new for PKCS #11 v2.20 amendment 1 
		 */
		ACTI_KEY_GEN: number;

		/**
		 * new for v2.0 
		 */
		CAST_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		CAST_ECB: number;
		/**
		 * new for v2.0 
		 */
		CAST_CBC: number;
		/**
		 * new for v2.0 
		 */
		CAST_MAC: number;
		/**
		 * new for v2.0 
		 */
		CAST_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		CAST_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		CAST3_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		CAST3_ECB: number;
		/**
		 * new for v2.0 
		 */
		CAST3_CBC: number;
		/**
		 * new for v2.0 
		 */
		CAST3_MAC: number;
		/**
		 * new for v2.0 
		 */
		CAST3_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		CAST3_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		CAST5_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		CAST128_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		CAST5_ECB: number;
		/**
		 * new for v2.0 
		 */
		CAST128_ECB: number;
		/**
		 * new for v2.0 
		 */
		CAST5_CBC: number;
		/**
		 * new for v2.0 
		 */
		CAST128_CBC: number;
		/**
		 * new for v2.0 
		 */
		CAST5_MAC: number;
		/**
		 * new for v2.0 
		 */
		CAST128_MAC: number;
		/**
		 * new for v2.0 
		 */
		CAST5_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		CAST128_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		CAST5_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		CAST128_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		RC5_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		RC5_ECB: number;
		/**
		 * new for v2.0 
		 */
		RC5_CBC: number;
		/**
		 * new for v2.0 
		 */
		RC5_MAC: number;
		/**
		 * new for v2.0 
		 */
		RC5_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		RC5_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		IDEA_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		IDEA_ECB: number;
		/**
		 * new for v2.0 
		 */
		IDEA_CBC: number;
		/**
		 * new for v2.0 
		 */
		IDEA_MAC: number;
		/**
		 * new for v2.0 
		 */
		IDEA_MAC_GENERAL: number;
		/**
		 * new for v2.0 
		 */
		IDEA_CBC_PAD: number;
		/**
		 * new for v2.0 
		 */
		GENERIC_SECRET_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		CONCATENATE_BASE_AND_KEY: number;
		/**
		 * new for v2.0 
		 */
		CONCATENATE_BASE_AND_DATA: number;
		/**
		 * new for v2.0 
		 */
		CONCATENATE_DATA_AND_BASE: number;
		/**
		 * new for v2.0 
		 */
		XOR_BASE_AND_DATA: number;
		/**
		 * new for v2.0 
		 */
		EXTRACT_KEY_FROM_KEY: number;
		/**
		 * new for v2.0 
		 */
		SSL3_PRE_MASTER_KEY_GEN: number;
		/**
		 * new for v2.0 
		 */
		SSL3_MASTER_KEY_DERIVE: number;
		/**
		 * new for v2.0 
		 */
		SSL3_KEY_AND_MAC_DERIVE: number;

		/**
		 * new for v2.11 
		 */
		SSL3_MASTER_KEY_DERIVE_DH: number;
		/**
		 * new for v2.11 
		 */
		TLS_PRE_MASTER_KEY_GEN: number;
		/**
		 * new for v2.11 
		 */
		TLS_MASTER_KEY_DERIVE: number;
		/**
		 * new for v2.11 
		 */
		TLS_KEY_AND_MAC_DERIVE: number;
		/**
		 * new for v2.11 
		 */
		TLS_MASTER_KEY_DERIVE_DH: number;

		/* CKM_TLS_PRF is new for v2.20 */
		TLS_PRF: number;

		SSL3_MD5_MAC: number;
		SSL3_SHA1_MAC: number;
		MD5_KEY_DERIVATION: number;
		MD2_KEY_DERIVATION: number;
		SHA1_KEY_DERIVATION: number;

		/**
		 * new for v2.20 
		 */
		SHA256_KEY_DERIVATION: number;
		/**
		 * new for v2.20 
		 */
		SHA384_KEY_DERIVATION: number;
		/**
		 * new for v2.20 
		 */
		SHA512_KEY_DERIVATION: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		SHA224_KEY_DERIVATION: number;

		PBE_MD2_DES_CBC: number;
		PBE_MD5_DES_CBC: number;
		PBE_MD5_CAST_CBC: number;
		PBE_MD5_CAST3_CBC: number;
		PBE_MD5_CAST5_CBC: number;
		PBE_MD5_CAST128_CBC: number;
		PBE_SHA1_CAST5_CBC: number;
		PBE_SHA1_CAST128_CBC: number;
		PBE_SHA1_RC4_128: number;
		PBE_SHA1_RC4_40: number;
		PBE_SHA1_DES3_EDE_CBC: number;
		PBE_SHA1_DES2_EDE_CBC: number;
		PBE_SHA1_RC2_128_CBC: number;
		PBE_SHA1_RC2_40_CBC: number;

		/**
		 * new for v2.10 
		 */
		PKCS5_PBKD2: number;

		PBA_SHA1_WITH_SHA1_HMAC: number;

		/**
		 * new for v2.20 
		 * */
		WTLS_PRE_MASTER_KEY_GEN: number;
		/**
		 * new for v2.20 
		 * */
		WTLS_MASTER_KEY_DERIVE: number;
		/**
		 * new for v2.20 
		 * */
		WTLS_MASTER_KEY_DERIVE_DH_ECC: number;
		/**
		 * new for v2.20 
		 * */
		WTLS_PRF: number;
		/**
		 * new for v2.20 
		 * */
		WTLS_SERVER_KEY_AND_MAC_DERIVE: number;
		/**
		 * new for v2.20 
		 * */
		WTLS_CLIENT_KEY_AND_MAC_DERIVE: number;

		KEY_WRAP_LYNKS: number;
		KEY_WRAP_SET_OAEP: number;

		/**
		 * new for v2.20 
		 */
		CMS_SIG: number;

		/**
		 * new for PKCS #11 v2.20 amendment 2 
		 */
		KIP_DERIVE: number;
		/**
		 * new for PKCS #11 v2.20 amendment 2 
		 */
		KIP_WRAP: number;
		/**
		 * new for PKCS #11 v2.20 amendment 2 
		 */
		KIP_MAC: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_KEY_GEN: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_ECB: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_CBC: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_MAC: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_MAC_GENERAL: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_CBC_PAD: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_ECB_ENCRYPT_DATA: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_CBC_ENCRYPT_DATA: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		CAMELLIA_CTR: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_KEY_GEN: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_ECB: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_CBC: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_MAC: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_MAC_GENERAL: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_CBC_PAD: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_ECB_ENCRYPT_DATA: number;
		/**
		 * new for PKCS #11 v2.20 amendment 3
		 */
		ARIA_CBC_ENCRYPT_DATA: number;

		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_KEY_GEN: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_ECB64: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_CBC64: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_OFB64: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_CFB64: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_CFB32: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_CFB16: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_CFB8: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_WRAP: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_PRIVATE_WRAP: number;
		/**
		 * Fortezza mechanism 
		 */
		SKIPJACK_RELAYX: number;
		/**
		 * Fortezza mechanism 
		 */
		KEA_KEY_PAIR_GEN: number;
		/**
		 * Fortezza mechanism 
		 */
		KEA_KEY_DERIVE: number;
		/**
		 * Fortezza mechanism 
		 */
		FORTEZZA_TIMESTAMP: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_KEY_GEN: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_ECB128: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_ECB96: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_CBC128: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_COUNTER: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_SHUFFLE: number;
		/**
		 * Fortezza mechanism 
		 */
		BATON_WRAP: number;

		/**
		 * deprecated in v2.11
		 */
		ECDSA_KEY_PAIR_GEN: number;
		/** 
		 * preferred 
		 */
		EC_KEY_PAIR_GEN: number;

		ECDSA: number;
		ECDSA_SHA1: number;

		ECDSA_SHA224: number;
		ECDSA_SHA256: number;
		ECDSA_SHA384: number;
		ECDSA_SHA512: number;

		/**
		 * new for v2.11 
		 */
		ECDH1_DERIVE: number;
		/**
		 * new for v2.11 
		 */
		ECDH1_COFACTOR_DERIVE: number;
		/**
		 * new for v2.11 
		 */
		ECMQV_DERIVE: number;

		JUNIPER_KEY_GEN: number;
		JUNIPER_ECB128: number;
		JUNIPER_CBC128: number;
		JUNIPER_COUNTER: number;
		JUNIPER_SHUFFLE: number;
		JUNIPER_WRAP: number;
		FASTHASH: number;

		/**
		 * new for v2.11 
		 */
		AES_KEY_GEN: number;
		/**
		 * new for v2.11 
		 */
		AES_ECB: number;
		/**
		 * new for v2.11 
		 */
		AES_CBC: number;
		/**
		 * new for v2.11 
		 */
		AES_MAC: number;
		/**
		 * new for v2.11 
		 */
		AES_MAC_GENERAL: number;
		/**
		 * new for v2.11 
		 */
		AES_CBC_PAD: number;

		/**
		 * new for PKCS #11 v2.20 amendment 3 
		 */
		AES_CTR: number;

		AES_CMAC: number;
		AES_CMAC_GENERAL: number;

		/**
		 * new for v2.20 
		 */
		BLOWFISH_KEY_GEN: number;
		/**
		 * new for v2.20 
		 */
		BLOWFISH_CBC: number;
		/**
		 * new for v2.20 
		 */
		TWOFISH_KEY_GEN: number;
		/**
		 * new for v2.20 
		 */
		TWOFISH_CBC: number;


		/**
		 * new for v2.20 
		 */
		DES_ECB_ENCRYPT_DATA: number;
		/**
		 * new for v2.20 
		 */
		DES_CBC_ENCRYPT_DATA: number;
		/**
		 * new for v2.20 
		 */
		DES3_ECB_ENCRYPT_DATA: number;
		/**
		 * new for v2.20 
		 */
		DES3_CBC_ENCRYPT_DATA: number;
		/**
		 * new for v2.20 
		 */
		AES_ECB_ENCRYPT_DATA: number;
		/**
		 * new for v2.20 
		 */
		AES_CBC_ENCRYPT_DATA: number;
	
		/* CKM_GOST mechanisms */
		GOSTR3410_KEY_PAIR_GEN: number;
		GOSTR3410: number;
		GOSTR3410_WITH_GOSTR3411: number;
		GOSTR3410_KEY_WRAP: number;
		GOSTR3410_DERIVE: number;
		GOSTR3411: number;
		GOSTR3411_HMAC: number;
		GOST28147_KEY_GEN: number;
		GOST28147_ECB: number;
		GOST28147: number;
		GOST28147_MAC: number;
		GOST28147_KEY_WRAP: number;

		DSA_PARAMETER_GEN: number;
		DH_PKCS_PARAMETER_GEN: number;
		X9_42_DH_PARAMETER_GEN: number;

		VENDOR_DEFINED: number;
	}
	
	//CLASSES
	
	export class Module {
		/**
		 * Loads PKCS11 library
		 * 
		 * @param lib Path name to PKCS11 library
		 * @param name String name of PKCS11 module
		 */
		static load(lib: string, name: string): Module;

		initialize();
		finalize();
		getInfo(): {
			cryptokiVersion: string,
			libraryVersion: string,
			manufacturerID: Buffer,
			libraryDescription: string,
			flags: number,
			type: string
		}

		getSlots(tokenPresent?: boolean): Array<Slot>;
	}

	class Slot {
		tokenInfo: Object;
		session: Session;
		mechanismList: Array<MechanismInfo>;
		needLogin: boolean;
		readOnly: boolean;
		hasRandom: boolean;
		protectedAuthPath: boolean;
		name: string;
		minPassword: number;
		maxPassword: number;
		serial: string;
		description: string;
		flags: number;
		manufacturerID: string;
		hardwareVersion: string;
		firmwareVersion: string;
		getInfo(): {
			slotDescription: Buffer,
			manufacturerID: string,
			flags: number,
			hardwareVersion: string,
			firmwareVersion: string,
			type: string
		};
		getTokenInfo(): Object;
		/**
		* Retrieves a Boolean value that indicates whether the slot is a removable device. 
		* If true, the slot is a removable device.
		*/
		isRemovable(): boolean;
		/**
		* Retrieves a Boolean value that indicates whether the slot is a hardware device. 
		* If true, the slot is a hardware device.
		*/
		isHardware(): boolean;
		/**
		* Retrieves a Boolean value that indicates whether the slot is accessible by the user. 
		* If true, the user can access the slot.
		*/
		isAccessible(): boolean;
		/**
		* Retrieves a Boolean value that indicates whether the slot is initialized by the user.
		* If true, the user can access the slot.
		*/
		isInitialized(): boolean;
		/**
		* Returns an array with the names of the supported hash algorithms
		*/
		getHashes(): Array<string>;
		/**
		* Returns an array with the names of the supported ciphers
		*/
		getCiphers(): Array<string>;
		/**
		* Returns an array with the names of the supported algotiphms
		*/
		getAlgoriphms(): Array<string>;
	}

	class Session {
		slotInfo: Slot;
		
		/**
		* Retrieves a Boolean value that indicates whether the session is started by the user.
		*/
		isStarted(): boolean;
		/**
		* Retrieves a Boolean value that indicates whether the session is logged by the user.
		*/
		isLogged(): boolean;
		
		/**
		 * Stop a session
		 */
		stop();
		
		/**
		 * Loggin to session
		 * @param pin PIN for session
		 * @param utype Type of user. UserType enum.
		 */
		login(pin: string, utype?: Number);
		
		/**
		 * Logout from session
		 */
		logout()

		getInfo(): {
			slotID: number,
			state: number,
			flags: number,
			ulDeviceError: number,
			type: string
		}
		
		/**
		 * Start session
		 * @param flags Start session parameter. SessionFlags enum. Default value is SessionFlags.Serial
		 */
		start(flags?: number);
		/**
		 * Start session
		 * @param slotInfo Slot whether the session should be opened
		 * @param flags Start session parameter. SessionFlags enum. Default value is SessionFlags.Serial
		 */
		static start(slotInfo: Slot, flags?: number);
		
		/**
		 * Destroy object from slot
		 */
		destroyObject(obj: SessionObject);
		
		/**
		 * Returns a list of SessionObject
		 */
		findObjects(): Array<SessionObject>;
		
		/**
		 * Returns new instance of Digest object
		 * @param algName String name of digest algorithm
		 */
		createDigest(algName: string): Digest;
		
		/**
		 * Returns new instance of Sign object
		 * @param algName String name of sign algorithm
		 * @param key Key with sign mechanism
		 */
		createSign(algName: string, key: Key): Sign
		
		/**
		 * Returns new instance of Verify object
		 * @param algName String name of verify algorithm
		 * @param key Key with verify mechanism
		 */
		createVerify(algName: string, key: Key): Verify
		
		/**
		 * Returns new instance of Encrypt object
		 * @param algName String name of encrypt algorithm
		 * @param key Key with encrypt mechanism
		 */
		createEncrypt(algName: string, key: Key): Encrypt
		
		/**
		 * Returns new instance of Decrypt object
		 * @param algName String name of decrypt algorithm
		 * @param key Key with decrypt mechanism
		 */
		createDecrypt(algName: string, key: Key): Decrypt
		
		/**
		 * Mixes additional seed material into the token's random number generator
		 * @param buf Incoming buffer
		 */
		seedRandom(buf: Buffer): Buffer;
		
		/**
		 * Generates random or pseudo-random data
		 * @param len Size of generated buffer with random values
		 */
		generateRandom(len: number): Buffer;
		
		/**
		 * Generates key pair
		 * @param algName String name of algorithm
		 * @param pukParams Set of params for PublicKey  
		 * @param pukParams Set of params for PrivateKey  
		 */
		generateKeyPair(algName: string, pukParams: Object, prkParams: Object): KeyPair;

		/**
		 * Generates key pair
		 * @param alg Object with name and params of algorithm
		 * @param pukParams Set of params for PublicKey  
		 * @param pukParams Set of params for PrivateKey  
		 */
		generateKeyPair(alg: AlgParams, pukParams: Object, prkParams: Object): KeyPair;
		
		/**
		 * Generates key
		 * @param algName String name of algorithm
		 * @param params Set of params for Key    
		 */
		generateKey(algName: string, params: Object): Key;
		
		/**
		 * Generates key
		 * @param alg Object with name and params of algorithm
		 * @param params Set of params for Key    
		 */
		generateKey(alg: AlgParams, params: Object): Key;
		
		/**
		 * Derives a key from a base key, creating a new key object
		 * @param alg Key derivation algorithm
		 * @param key Key object which must be derived
		 * @param template Template for the new key
		 */
		deriveKey(alg: AlgParams | String, key: Key, template: Object): Key;
		
		generate(keyType: number, algorithm: AlgParams, props: Object): Key;
	}

	interface AlgParams {
		name: string;
		params?: Buffer;
	}

	interface KeyPair {
		private: PrivateKey,
		public: PublicKey,
	}

	class MechanismInfo {
		slot: Slot;
		name: string;
		minKeySize: number;
		maxKeySize: number;
		flags: number;

		getInfo(): {
			ulMinKeySize: number;
			ulMaxKeySize: number;
			flags: number;
			type: string;
		}
		
		/**
		 * True if the mechanism is performed by the device; false if the mechanism is performed in software
		 */
		isHardware(): boolean;
		
		/**
		 * True if the mechanism can be used with C_EncryptInit
		 */
		isEncrypt(): boolean;
		
		/**
		 * True if the mechanism can be used with C_DecryptInit
		 */
		isDecrypt(): boolean;

		/**
		 * True if the mechanism can be used with C_DigestInit
		 */
		isDigest(): boolean;
		
		/**
		 * True if the mechanism can be used with C_SignInit
		 */
		isSign(): boolean;
		
		/**
		 * True if the mechanism can be used with C_SignRecoverInit
		 */
		isSignRecover(): boolean;
		
		/**
		 * True if the mechanism can be used with C_VerifyInit
		 */
		isVerify(): boolean;
		
		/**
		 * True if the mechanism can be used with C_VerifyRecoverInit
		 */
		isVerifyRecover(): boolean;
		
		/**
		 * True if the mechanism can be used with C_GenerateKey
		 */
		isGenerateKey(): boolean;
		
		/**
		 * True if the mechanism can be used with C_GenerateKeyPair
		 */
		isGenerateKeyPair(): boolean;
		
		/**
		 * True if the mechanism can be used with C_WrapKey
		 */
		isWrap(): boolean;
		
		/**
		 * True if the mechanism can be used with C_UnwrapKey
		 */
		isUnwrap(): boolean;
		
		/**
		 * True if the mechanism can be used with C_DeriveKey
		 */
		isDerive(): boolean;
		
		/**
		 * True if there is an extension to the flags; false if no extensions. 
		 * Must be false for this version.
		 */
		isExtension(): boolean;
				
		/**
		 * Create MechanismInfo by algorithm name
		 * @param algName String name of algorithm
		 */
		static create(algName: string): MechanismInfo;
		
		/**
		 * Create MechanismInfo by algorithm name and prarams
		 * @param alg Object with name and params of algorithm
		 */
		static create(alg: AlgParams): MechanismInfo;

	}

	class SessionObject {
		session: Session;
		type: string;
		
		/**
		 * Returns attribute value by attribute number.
		 * @param atrType Number of attribute type. Use Attribute enum.
		 * @param atrType Number of buffer size  
		 */
		getAttribute(atrType: number, len?: number): Buffer
		
		/**
		 * Returns boolean value of attribute
		 * @param attrType Number of attribute type. Use Attribute enum.
		 */
		getBooleanAttribute(attrType: number): boolean
		
		/**
		 * Returns number value of attribute
		 * @param attrType Number of attribute type. Use Attribute enum.
		 */
		getNumberAttribute(attrType: number): number
		
		/**
		 * Returns Buffer value of attribute
		 * @param attrType Number of attribute type. Use Attribute enum.
		 */
		getBinaryAttribute(attrType: number): Buffer
		
		/**
		 * Returns String value of attribute. Charset UTF-8
		 * @param attrType Number of attribute type. Use Attribute enum.
		 */
		getUtf8Attribute(attrType: number): string
		
		/**
		 * Returns number of class (type) of SessionObject.
		 * Use ObjectClass enum. 
		 */
		getClass(): number;
		
		/**
		 * CK_TRUE if object is a token object; CK_FALSE if object is a session object. Default is CK_FALSE.
		 */
		isToken(): boolean;
		
		/**
		 * CK_TRUE if object is a private object; CK_FALSE if object is a public object. 
 		 * Default value is token-specific, and may depend on the values of other attributes of the object.
		 */
		isPrivate(): boolean;

		/**
		 * CK_TRUE if object can be modified Default is CK_TRUE.
		 */
		isModifiable(): boolean;
		
		/**
		 * Description of the object (default empty).
		 */
		getLabel(): string;
		
		/**
		 * Convert Session object to extended type
		 * @param obj SessionObject which must be converted
		 * @param classType Number of class type. USe ObjectClass enum
		 */
		static toType(obj: SessionObject, classType: string): any
		
		/**
		 * Convert Session object to extended type
		 * @param classType Number of class type. USe ObjectClass enum 
		 */
		toType(classType: string): any;
	}

	class Key extends SessionObject {
		/**
		 * Returns number of key type. Use KeyType enum. 
		 */
		getType(): number;
		
		/**
		 * Key identifier for key (default empty)
		 */
		getId(): Buffer
		
		/**
		 * CK_TRUE if key supports key derivation 
		 * i.e., if other keys can be derived from this one (default CK_FALSE))
		 */
		isDerived(): boolean;
		
		/**
		 * CK_TRUE only if key was either * generated locally (i.e., on the token) 
		 * with a C_GenerateKey or C_GenerateKeyPair call * created with a C_CopyObject call 
		 * as a copy of a key which had its CKA_LOCAL attribute set to CK_TRUE
		 */
		isLocal(): boolean;
		
		/**
		 * Start date for the key (default empty)
		 */
		getStartDate(): Buffer;
		
		/**
		 * End date for the key (default empty)
		 */
		getEndDate(): Buffer;
		
		/**
		 * Identifier of the mechanism used to generate the key material
		 * Use Mechanism enum
		 */
		getKeyGenMechanism(): number;
		
		/**
		 * Not realized in current version
		 * A list of mechanisms allowed to be used with this key. The number of
 	     * mechanisms in the array is the ulValueLen component of the attribute divided by the size
         * of CK_MECHANISM_TYPE.
		 */
		getAllowedMechanisms(): any;


	}

	class PrivateKey extends Key {
		/**
		 * DER-encoding of the key subject name (default empty)  
		 */
		getSubject(): Buffer;
		
		/**
		 * CK_TRUE if key is sensitive
		 */
		isSensitive(): boolean;

		/**
		 * CK_TRUE if key supports decryption
		 */
		isDecrypt(): boolean;
		
		/**
		 * CK_TRUE if key supports signatures where the signature is an appendix to the data
		 */
		isSign(): boolean;
		
		/**
		 * CK_TRUE if key supports signatures where the data can be recovered from the signature
		 */
		isSignRecover(): boolean;
		
		/**
		 * CK_TRUE if key supports unwrapping (i.e., can be used to unwrap other keys)
		 */
		isUnwrap(): boolean;
		
		/**
		 * CK_TRUE if key is extractable and can be wrapped
		 */
		isExtractable(): boolean;
		
		/**
		 * CK_TRUE if key has always had the CKA_SENSITIVE attribute set to CK_TRUE 
		 */
		isAlwaysSensitive(): boolean;
		
		/**
		 * CK_TRUE if key has never had the CKA_EXTRACTABLE attribute set to CK_TRUE
		 */
		isNeverExtractable(): boolean;
		
		/**
		 * CK_TRUE if the key can only be wrapped with a wrapping key that has CKA_TRUSTED set to CK_TRUE. 
		 * Default is CK_FALSE.
		 */
		isWrapWithTrusted(): boolean;
		
		/**
		 * If CK_TRUE, the user has to supply the PIN for each use (sign or decrypt) with the key. 
		 * Default is CK_FALSE.
		 */
		isAlwaysAuthenticate(): boolean;
		
		/**
		 * Not realized in current version.
		 * For wrapping keys. The attribute template to apply to
		 * any keys unwrapped using this wrapping key. Any user
		 * supplied template is applied after this template as if the
		 * object has already been created. The number of
		 * attributes in the array is the ulValueLen component of the
		 * attribute divided by the size of CK_ATTRIBUTE. 
		 */
		getUnwrapTemplate(): boolean;

	}

	class PublicKey extends Key { 
		/**
		 * DER-encoding of the key subject name (default empty)  
		 */
		getSubject(): Buffer;
		
		/**
		 * CK_TRUE if key supports encryption
		 */
		isEncrypt(): boolean;
		
		/**
		 * CK_TRUE if key supports verification where the signature is an appendix to the data
		 */
		isVerify(): boolean;		
		
		/**
		 * CK_TRUE if key supports verification where the data is recovered from the signature
		 */
		isVerifyRecover(): boolean;
		
		/**
		 * CK_TRUE if key supports wrapping (i.e., can be used to wrap other keys)
		 */
		isWrap(): boolean;
		
		/**
		 * The key can be trusted for the application that it was created.
		 * The wrapping key can be used to wrap keys with
		 * CKA_WRAP_WITH_TRUSTED set to CK_TRUE.
		 */
		isTrusted(): boolean;
		
		/**
		 * Not realized in current version.
 		 * For wrapping keys. The attribute template to match against any keys
 		 * wrapped using this wrapping key. Keys that do not match cannot be wrapped.
 		 * The number of attributes in the array is the ulValueLen component of the
 		 * attribute divided by the size of CK_ATTRIBUTE. 
 		 */
		getWrapTemplate(): any;
	}

	class SecretKey extends Key {		
		/**
		 * CK_TRUE if key is sensitive
		 */
		isSensitive(): boolean;
		
		/**
		 * CK_TRUE if key supports encryption
		 */
		isEncrypt(): boolean;

		/**
		 * CK_TRUE if key supports decryption
		 */
		isDecrypt(): boolean;
		
		/**
		 * CK_TRUE if key supports signatures where the signature is an appendix to the data
		 */
		isSign(): boolean;
		
		/**
		 * CK_TRUE if key supports verification where the signature is an appendix to the data
		 */
		isVerify(): boolean;
		
		/**
		 * CK_TRUE if key supports wrapping (i.e., can be used to wrap other keys)
		 */
		isWrap(): boolean;
		
		/**
		 * CK_TRUE if key supports unwrapping (i.e., can be used to unwrap other keys)
		 */
		isUnwrap(): boolean;
		
		/**
		 * CK_TRUE if key is extractable and can be wrapped
		 */
		isExtractable(): boolean;
		
		/**
		 * CK_TRUE if key has always had the CKA_SENSITIVE attribute set to CK_TRUE 
		 */
		isAlwaysSensitive(): boolean;
		
		/**
		 * CK_TRUE if key has never had the CKA_EXTRACTABLE attribute set to CK_TRUE
		 */
		isNeverExtractable(): boolean;
		
		/**
		 * Key checksum
		 */
		getCheckValue(): Buffer;
		
		/**
		 * CK_TRUE if the key can only be wrapped with a wrapping key that has CKA_TRUSTED set to CK_TRUE. 
		 * Default is CK_FALSE.
		 */
		isWrapWithTrusted(): boolean;
		
		/**
		 * Not realized in current version.
 		 * For wrapping keys. The attribute template to match against any keys
 		 * wrapped using this wrapping key. Keys that do not match cannot be wrapped.
 		 * The number of attributes in the array is the ulValueLen component of the
 		 * attribute divided by the size of CK_ATTRIBUTE. 
 		 */
		getWrapTemplate(): any;
		
		/**
		 * Not realized in current version.
		 * For wrapping keys. The attribute template to apply to
		 * any keys unwrapped using this wrapping key. Any user
		 * supplied template is applied after this template as if the
		 * object has already been created. The number of
		 * attributes in the array is the ulValueLen component of the
		 * attribute divided by the size of CK_ATTRIBUTE. 
		 */
		getUnwrapTemplate(): boolean;
	}

	class Certificate extends SessionObject {
		/**
		 * Type of certificate
		 */
		getType(): number;
		
		/**
		 * The certificate can be trusted for the application that it was created.
		 */
		isTrusted(): boolean;
		
		/**
		 * Categorization of the certificate:0 = unspecified (default value), 
 		 * 1 = token user, 2 = authority, 3 = other entity
		 */
		getCategory(): number;
		
		/**
		 * Checksum
		 */
		getCheckValue(): Buffer;
		
		/**
		 * Start date for the certificate (default empty)
		 */
		getStartDate(): Buffer;
		
		/**
		 * End date for the certificate (default empty)
		 */
		getEndDate(): Buffer;
	}
	
	/**
	 * X.509 public key certificate objects
	 */
	class X509Certificate extends Certificate {
		/**
		 * DER-encoding of the certificate subject name
		 */
		getSubject(): Buffer;
		
		/**
		 * DER-encoding of the certificate issuer name (default empty)
		 */
		getIssuer(): Buffer;
		
		/**
		 * DER-encoding of the certificate serial number (default empty)
		 */
		getSerialNumber(): Buffer;
		
		/**
		 * Key identifier for public/private key pair (default empty)
		 */
		getId(): Buffer;
		
		/**
		 * 	DER-encoding of the certificate
		 */
		getValue(): Buffer;
		
		/**
		 * If not empty this attribute gives the URL where the complete
 		 * certificate can be obtained (default empty)
		 */
		getUrl(): string;
		
		/**
		 * SHA-1 hash of the subject public key (default empty)
		 */
		getSubjectPublicKeyHash(): Buffer;
		
		/**
		 * SHA-1 hash of the issuer public key (default empty)
		 */
		getIssuerPublicKeyHash(): Buffer;
		
		/**
		 * Java MIDP security domain: 
		 * 0 = unspecified (default value), 
		 * 1 = manufacturer, 
		 * 2 = operator, 
		 * 3 = third party 
 		 */
		getJavaMIDP(): number;
	}
	
	/**
	 * X.509 attribute certificate object
	 */
	class X509CertificateAttribute extends Certificate {
		/**
		 * DER-encoding of the attribute certificate's subject field. This is distinct from the
 		 * CKA_SUBJECT attribute contained in CKC_X_509 certificates because the ASN.1 
 	     * syntax and encoding are different.
		 */
		getOwner(): Buffer;
		
		/**
		 * DER-encoding of the attribute certificate's issuer field. This is distinct from the
	 	 * CKA_ISSUER attribute contained in CKC_X_509 certificates because the ASN.1
	 	 * syntax and encoding are different. (default empty)
		 */
		getIssuer(): Buffer;
		
		/**
		 * DER-encoding of the certificate serial number (default empty)
		 */
		getSerialNumber(): Buffer;
		
		/**
		 * DER-encoding of the attribute certificate
		 */
		getValue(): Buffer;
		
		/**
		 * DER-encoding of a sequence of object identifier values corresponding to the attribute
  	     * types contained in the certificate. When present, this field offers an opportunity for
 		 * applications to search for a particular attribute certificate without fetching and parsing the
 		 * certificate itself. (default empty)
		 */
		getAttributeTypes(): Buffer;
	}
	
	/**
	 * Data object
	 */
	class Data extends SessionObject {
		/**
		 * Description of the application that manages the object (default empty)
		 */
		getApplication(): string
		
		/**
		 * DER-encoding of the object identifier indicating the data object type (default empty)
		 */
		getObjectId(): Buffer;
		
		/**
		 * Value of the object (default empty)
		 */
		getValue(): Buffer;
	}

	class Digest {
		session: SessionObject;
	
		/**
		 * Do digest operation
		 */
		update(data: Buffer);	
		
		/**
		 * Returns hash of digest operation.
		 */
		final(): Buffer;
	}
	
	class Sign {
		session: SessionObject;
	
		/**
		 * Do sign operation
		 */
		update(data: Buffer);	
		
		/**
		 * Finalize sign operation.
		 */
		final(): Buffer;
	}
	
	class Verify {
		session: SessionObject;
	
		/**
		 * Do verify operation
		 */
		update(data: Buffer);	
		
		/**
		 * Returns true if verify operation is ok.
		 * @param signature DER-encoding signature value
		 */
		final(signature: Buffer): boolean;
	}
	
	class Encrypt {
		session: SessionObject;
	
		/**
		 * Returns encrypted data from data
		 */
		update(data: Buffer): Buffer;	
		
		/**
		 * Finalize encrypt operation.
		 */
		final(): Buffer;
	}
	
	class Decrypt {
		session: SessionObject;
	
		/**
		 * Returns decrypted data from encrypted data
		 */
		update(data: Buffer): Buffer;	
		
		/**
		 * Finalize decrypt operation.
		 */
		final(): Buffer;
	}
	
	export var RSA: {
		Rsa: Rsa
		Rsa1_5: Rsa1_5
		RsaOAEP: RsaOAEP
		RsaOAEPParams: RsaOAEPParams
		RsaPSS: RsaPSS
		RsaPSSParams: RsaPSSParams
	}
	
	export var AES: {
		Aes: Aes
		AesCBC: AesCBC
		AesGCM: AesGCM
		AesGCMParams: AesGCMParams
	}
	
	class AsymmetricKey{
		session: Session
		publicKey: Key
		privateKey: Key	
		algorithm: string | AlgParams
	}
	
	class SymmetricKey{
		session: Session
		key: Key	
		algorithm: string | AlgParams
	}
		
	interface GenParams {
      label?: string
      extractable?: boolean
      keyUsages: Array<string>
	}
	
	interface RsaGenParams extends GenParams{
		modulusLength: number
		publicExponent: number
	}
	
	interface AesGenParams extends GenParams{
		length: number
	}
	
	class Rsa extends AsymmetricKey{
		modulusLength: number
		publicExponent: number
		
		generate(session: Session, algorithm: string | AlgParams, props: RsaGenParams): Rsa;
	}
	
	interface ISign{
		sign(data: Buffer): Buffer
	}
	
	interface IVerify{
		verify(signature: Buffer, data: Buffer): boolean
	}
	
	interface IEncrypt{
		encrypt(data: Buffer): Buffer
	}
	
	interface IDecrypt{
		decrypt(data: Buffer): Buffer
	}
	
	interface IWrapKey{
		wrapKey(key: Key): Buffer
	}
	
	interface IUnwrapKey{
		wrapKey(data: Buffer): Key
	}
	
	class Rsa1_5 extends Rsa implements ISign, IVerify, IEncrypt, IDecrypt, IWrapKey, IUnwrapKey{
		sign(data: Buffer): Buffer
		verify(signature: Buffer, data: Buffer): boolean
		encrypt(data: Buffer): Buffer
		decrypt(data: Buffer): Buffer
		wrapKey(key: Key): Buffer
		wrapKey(data: Buffer): Key
	}	
	
	class RsaOAEP extends Rsa implements IEncrypt, IDecrypt, IWrapKey, IUnwrapKey{
		encrypt(data: Buffer): Buffer
		decrypt(data: Buffer): Buffer
		wrapKey(key: Key): Buffer
		wrapKey(data: Buffer): Key
	}
	
	interface ICkiConverter{
		toCKI(): Object
	}
	
	class RsaOAEPParams implements ICkiConverter{
		constructor(hashAlgs: number, mgf: number, sourceData?: number, source?: Buffer)
		toCKI(): Object
	}
	
	class RsaPSS extends Rsa implements ISign, IVerify{
		sign(data: Buffer): Buffer
		verify(signature: Buffer, data: Buffer): boolean
	}
	
	class RsaPSSParams implements ICkiConverter{
		constructor(hashAlgs: number, mgf: number, soltLength: number)
		toCKI(): Object
	}
	
	class RsaSignature extends Rsa implements ISign, IVerify{
		sign(data: Buffer): Buffer
		verify(signature: Buffer, data: Buffer): boolean
	}
	
	class Aes extends SymmetricKey{
		length: number
		
		generate(session: Session, algorithm: string | AlgParams, props: AesGenParams): Aes;
	}	
	
	class AesCBC extends Aes implements IEncrypt, IDecrypt, IWrapKey, IUnwrapKey{
		encrypt(data: Buffer): Buffer
		decrypt(data: Buffer): Buffer
		wrapKey(key: Key): Buffer
		wrapKey(data: Buffer): Key
	}
	
	class AesGCMParams implements ICkiConverter{
		constructor(iv: Buffer, additionalData?: Buffer, tagLength?: number)
		toCKI(): Object
	}
	
	class AesGCM extends Aes implements IEncrypt, IDecrypt{
		encrypt(data: Buffer): Buffer
		decrypt(data: Buffer): Buffer
	}	
	
}