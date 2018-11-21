// Type definitions for graphene-pk11 v2.0.3
// Project: https://github.com/PeculiarVentures/graphene
// Definitions by: Stepan Miroshin <https://github.com/microshine>

/// <reference types="node" />
/// <reference types="pkcs11js" />

/**
 * A simple layer for interacting with PKCS #11 / PKCS11 / CryptoKI for Node
 * v2.0.3
 */

declare namespace GraphenePkcs11 {

  type Handle = Pkcs11Js.Handle;
  type CryptoData = string | Buffer;

  class Pkcs11Error extends Error {
    public code: number;
    public func: string;
    constructor(code: number, func: string);
  }

  class BaseObject {
    public lib: Pkcs11Js.PKCS11;
    constructor(lib?: Pkcs11Js.PKCS11);
  }

  class HandleObject extends BaseObject {
    /**
     * handle to pkcs11 object
     */
    public handle: Handle;

    constructor(handle: Handle, lib: Pkcs11Js.PKCS11);

    protected getInfo(): void;
  }

  class Collection<T extends BaseObject> extends BaseObject {

    /**
     * returns length of collection
     */
    public length: number;

    // tslint:disable-next-line:variable-name
    protected items_: any[];
    protected classType: any;

    constructor(items: any[], lib: Pkcs11Js.PKCS11, classType: any);

    /**
     * returns item from collection by index
     * @param {number} index of element in collection `[0..n]`
     */
    public items(index: number): T;

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param obj       The value to locate in the array.
     * @param fromIndex The array index at which to begin the search.
     * If fromIndex is omitted, the search starts at index 0.
     */
    public indexOf(obj: T, fromIndex?: number): number;
  }

  function isString(v: any): v is string;
  function isNumber(v: any): v is number;
  function isBoolean(v: any): v is boolean;
  function isUndefined(v: any): v is undefined;
  function isNull(v: any): v is null;
  function isEmpty(v: any): v is null | undefined;
  function isFunction(v: any): v is (...args: any[]) => any;
  function isObject(v: any): v is object;
  function isArray(v: any): v is any[];
  function isFlag(v: any, fv: number): boolean;
  function dateFromString(text: string): Date;

  // ========== Crypto ==========

  class Cipher extends BaseObject {

    public session: Session;

    constructor(session: Session, alg: MechanismType, key: Key, lib: Pkcs11Js.PKCS11);

    public update(data: CryptoData): Buffer;
    public final(): Buffer;
    public once(data: CryptoData, enc: Buffer): Buffer;
    public once(data: CryptoData, enc: Buffer, cb: (error: Error, data: Buffer) => void): void;

    protected init(alg: MechanismType, key: Key): void;
  }

  class Decipher extends BaseObject {

    protected session: Session;
    protected blockSize: number;

    constructor(session: Session, alg: MechanismType, key: Key, blockSize: number, lib: Pkcs11Js.PKCS11);

    public update(data: Buffer): Buffer;
    public final(): Buffer;
    public once(data: Buffer, dec: Buffer): Buffer;
    public once(data: Buffer, dec: Buffer, cb: (error: Error, data: Buffer) => void): void;

    protected init(alg: MechanismType, key: Key): void;
  }

  class Digest extends BaseObject {

    public session: Session;

    constructor(session: Session, alg: MechanismType, lib: Pkcs11Js.PKCS11);

    public update(data: CryptoData): void;
    public final(): Buffer;
    public once(data: CryptoData): Buffer;
    public once(data: CryptoData, cb: (error: Error, data: Buffer) => void): void;

    protected init(alg: MechanismType): void;
  }

  class Sign extends BaseObject {

    public session: Session;

    constructor(session: Session, alg: MechanismType, key: Key, lib: Pkcs11Js.PKCS11);

    public update(data: CryptoData): void;
    public final(): Buffer;
    public once(data: CryptoData): Buffer;
    public once(data: CryptoData, cb: (error: Error, data: Buffer) => void): void;

    protected init(alg: MechanismType, key: Key): void;
  }

  class Verify extends BaseObject {

    public session: Session;

    constructor(session: Session, alg: MechanismType, key: Key, lib: Pkcs11Js.PKCS11);

    public update(data: CryptoData): void;
    public final(signature: Buffer): boolean;
    public once(data: CryptoData, signature: Buffer): boolean;
    public once(data: CryptoData, signature: Buffer, cb: (error: Error, valid: boolean) => void): void;

    protected init(alg: MechanismType, key: Key): void;
  }

  // ========== Keys ==========

  interface IParams {
    toCKI(): any;
  }

  enum MechParams {
    AesCBC,
    AesCCM,
    AesGCM,
    RsaOAEP,
    RsaPSS,
    EcDH,
    AesGCMv240,
  }

  // AES

  class AesCbcParams implements IParams, Pkcs11Js.AesCBC {
    /**
     * initialization vector
     * - must have a fixed size of 16 bytes
     */
    public iv: Buffer;
    /**
     * the data
     */
    public data: Buffer;
    public type: MechParams;
    constructor(iv: Buffer, data?: Buffer);
    public toCKI(): Buffer;
  }

  class AesCbcEncryptDataParams implements IParams, Pkcs11Js.AesCBC {

    /**
     * initialization vector
     * - must have a fixed size of 16 bytes
     */
    public iv: Buffer;
    /**
     * the data
     */
    public data: Buffer;
    public type: MechParams;
    constructor(iv: Buffer, data?: Buffer);
    public toCKI(): Pkcs11Js.AesCBC;
  }

  class AesCcmParams implements IParams {
    /**
     * length of the data where 0 <= dataLength < 2^8L
     */
    public dataLength: number;
    /**
     * the nonce
     */
    public nonce: Buffer;
    /**
     * the additional authentication data
     * - This data is authenticated but not encrypted
     */
    public aad: Buffer;
    /**
     * length of authentication tag (output following cipher text) in bits.
     * - Can be any value between 0 and 128
     */
    public macLength: number;
    public type: MechParams;
    constructor(dataLength: number, nonce: Buffer, aad?: Buffer, macLength?: number);
    public toCKI(): Pkcs11Js.AesCCM;
  }

  class AesGcmParams implements IParams {
    /**
     * initialization vector
     * - The length of the initialization vector can be any number between 1 and 256.
     * 96-bit (12 byte) IV values can be processed more efficiently,
     * so that length is recommended for situations in which efficiency is critical.
     */
    public iv: Buffer;
    /**
     * pointer to additional authentication data.
     * This data is authenticated but not encrypted.
     */
    public aad: Buffer;
    /**
     * length of authentication tag (output following cipher text) in bits.
     * Can be any value between 0 and 128. Default 128
     */
    public tagBits: number;
    public type: MechParams;
    constructor(iv: Buffer, aad?: Buffer, tagBits?: number);
    public toCKI(): Pkcs11Js.AesGCM;
  }

  class AesGcm240Params extends AesGcmParams { }

  // EC

  interface INamedCurve {
    name: string;
    oid: string;
    value: Buffer;
    size: number;
  }

  class NamedCurve {
    public static getByName(name: string): INamedCurve;
    public static getByOid(oid: string): INamedCurve;
    public static getByBuffer(buf: Buffer): INamedCurve;
  }

  enum EcKdf {
    NULL,
    SHA1,
    SHA224,
    SHA256,
    SHA384,
    SHA512,
  }

  class EcdhParams implements IParams, Pkcs11Js.ECDH1 {
    /**
     * key derivation function used on the shared secret value
     */
    public kdf: EcKdf;
    /**
     * some data shared between the two parties
     */
    public sharedData: Buffer;
    /**
     * other party's EC public key value
     */
    public publicData: Buffer;
    public type: MechParams;
    /**
     * Creates an instance of EcdhParams.
     *
     * @param {EcKdf} kdf key derivation function used on the shared secret value
     * @param {Buffer} [sharedData=null] some data shared between the two parties
     * @param {Buffer} [publicData=null] other party's EC public key value
     */
    constructor(kdf: EcKdf, sharedData?: Buffer | null, publicData?: Buffer | null);
    public toCKI(): Pkcs11Js.ECDH1;
  }

  // Rsa

  enum RsaMgf {
    MGF1_SHA1,
    MGF1_SHA224,
    MGF1_SHA256,
    MGF1_SHA384,
    MGF1_SHA512,
  }

  class RsaOaepParams implements IParams {
    public hashAlgorithm: MechanismEnum;
    public mgf: RsaMgf;
    public source: number;
    public sourceData: Buffer;
    public type: MechParams;
    constructor(hashAlg?: MechanismEnum, mgf?: RsaMgf, sourceData?: Buffer);
    public toCKI(): Pkcs11Js.RsaOAEP;
  }

  class RsaPssParams implements IParams {
    /**
     * hash algorithm used in the PSS encoding;
     * - if the signature mechanism does not include message hashing,
     * then this value must be the mechanism used by the application to generate
     * the message hash;
     * - if the signature mechanism includes hashing,
     * then this value must match the hash algorithm indicated
     * by the signature mechanism
     */
    public hashAlgorithm: MechanismEnum;
    /**
     * mask generation function to use on the encoded block
     */
    public mgf: RsaMgf;
    /**
     * length, in bytes, of the salt value used in the PSS encoding;
     * - typical values are the length of the message hash and zero
     */
    public saltLength: number;
    public type: MechParams;
    constructor(hashAlg?: MechanismEnum, mgf?: RsaMgf, saltLen?: number);
    public toCKI(): Pkcs11Js.RsaPSS;
  }

  // ========== Objects ==========

  enum ObjectClass {
    DATA,
    CERTIFICATE,
    PUBLIC_KEY,
    PRIVATE_KEY,
    SECRET_KEY,
    HW_FEATURE,
    DOMAIN_PARAMETERS,
    MECHANISM,
    OTP_KEY,
  }

  class SessionObject extends HandleObject {
    /**
     * Session
     */
    public session: Session;
    /**
     * gets the size of an object in bytes
     *
     * @readonly
     * @type {number}
     */
    public size: number;
    public class: ObjectClass;

    /**
     * Creates an instance of SessionObject.
     *
     * @param {SessionObject} object
     */
    constructor(object: SessionObject);
    /**
     * Creates an instance of SessionObject.
     *
     * @param {Handle} handle
     * @param {Session} session
     * @param {pkcs11.PKCS11} lib
     */
    constructor(handle: Handle, session: Session, lib: Pkcs11Js.PKCS11);
    constructor(handle: SessionObject);

    /**
     * copies an object, creating a new object for the copy
     *
     * @param {ITemplate} template template for the new object
     * @returns {SessionObject}
     */
    public copy(template: ITemplate): SessionObject;
    /**
     * destroys an object
     */
    public destroy(): void;
    public getAttribute(attr: string): any;
    public getAttribute(attrs: ITemplate): ITemplate;
    public setAttribute(attrs: string, value: any): void;
    public setAttribute(attrs: ITemplate): void;
    public get(name: string): any;
    public set(name: string, value: any): void;
    public toType<T extends SessionObject>(): T;
  }

  class SessionObjectCollection extends Collection<SessionObject> {
    public session: Session;

    constructor(items: Handle[], session: Session, lib: Pkcs11Js.PKCS11, classType?: any);

    public items(index: number): SessionObject;
  }

  class Storage extends SessionObject {
    /**
     * `true` if object is a token object;
     * `false` if object is a session object. Default is `false`.
     */
    public token: boolean;
    /**
     * `true` if object is a private object;
     * `false` if object is a public object.
     * Default value is token-specific, and may depend on the values of other attributes of the object.
     */
    public private: boolean;
    /**
     * `true` if object can be modified. Default is `false`
     */
    public modifiable: boolean;
    /**
     * Description of the object (default empty)
     */
    public label: string;
  }

  /**
   * Data objects (object class `CKO_DATA`) hold information defined by an application.
   * Other than providing access to it, Cryptoki does not attach any special meaning to a data object
   *
   * @export
   * @class Data
   * @extends {Storage}
   */
  class Data extends Storage {
    /**
     * Description of the application that manages the object (default empty)
     *
     * @type {string}
     */
    public application: string;
    /**
     * DER-encoding of the object identifier indicating the data object type (default empty)
     *
     * @type {Buffer}
     */
    public objectId: Buffer;
    /**
     * Value of the object (default empty)
     *
     * @type {Buffer}
     */
    public value: Buffer;
  }

  class DomainParameters extends Storage {
    /**
     * Type of key the domain parameters can be used to generate.
     */
    public keyType: KeyType;
    /**
     * `CK_TRUE` only if domain parameters were either * generated locally (i.e., on the token)
     * with a `C_GenerateKey` * created with a `C_CopyObject` call as a copy of domain parameters
     * which had its `CKA_LOCAL` attribute set to `CK_TRUE`
     */
    public local: boolean;
  }

  enum KeyType {
    RSA,
    DSA,
    DH,
    ECDSA,
    EC,
    X9_42_DH,
    KEA,
    GENERIC_SECRET,
    RC2,
    RC4,
    DES,
    DES2,
    DES3,
    CAST,
    CAST3,
    CAST5,
    CAST128,
    RC5,
    IDEA,
    SKIPJACK,
    BATON,
    JUNIPER,
    CDMF,
    AES,
    GOSTR3410,
    GOSTR3411,
    GOST28147,
    BLOWFISH,
    TWOFISH,
    SECURID,
    HOTP,
    ACTI,
    CAMELLIA,
    ARIA,
  }
  enum KeyGenMechanism {
    AES,
    RSA,
    RSA_X9_31,
    DSA,
    DH_PKCS,
    DH_X9_42,
    GOSTR3410,
    GOST28147,
    RC2,
    RC4,
    DES,
    DES2,
    SECURID,
    ACTI,
    CAST,
    CAST3,
    CAST5,
    CAST128,
    RC5,
    IDEA,
    GENERIC_SECRET,
    SSL3_PRE_MASTER,
    CAMELLIA,
    ARIA,
    SKIPJACK,
    KEA,
    BATON,
    ECDSA,
    EC,
    JUNIPER,
    TWOFISH,
  }

  /**
   * Definition for the base key object class
   * - defines the object class `CKO_PUBLIC_KEY`, `CKO_PRIVATE_KEY` and `CKO_SECRET_KEY` for type `CK_OBJECT_CLASS`
   * as used in the `CKA_CLASS` attribute of objects
   */
  class Key extends Storage {
    /**
     * Type of key
     * - Must be specified when object is created with `C_CreateObject`
     * - Must be specified when object is unwrapped with `C_UnwrapKey`
     */
    public type: KeyType;
    /**
     * Key identifier for key (default empty)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification
     * of the attribute during the course of a `C_CopyObject` call.
     */
    public id: Buffer;
    /**
     * Start date for the key (default empty)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification
     * of the attribute during the course of a `C_CopyObject` call.
     */
    public startDate: Date;
    /**
     * End date for the key (default empty)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification
     * of the attribute during the course of a `C_CopyObject` call.
     */
    public endDate: Date;
    /**
     * `CK_TRUE` if key supports key derivation
     * (i.e., if other keys can be derived from this one (default `CK_FALSE`)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification
     * of the attribute during the course of a `C_CopyObject` call.
     * @returns boolean
     */
    public derive: boolean;
    /**
     * `CK_TRUE` only if key was either * generated locally (i.e., on the token)
     * with a `C_GenerateKey` or `C_GenerateKeyPair` call * created with a `C_CopyObject` call
     * as a copy of a key which had its `CKA_LOCAL` attribute set to `CK_TRUE`
     * - Must not be specified when object is created with `C_CreateObject`.
     * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
     * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
     */
    public local: boolean;
    /**
     * Identifier of the mechanism used to generate the key material.
     * - Must not be specified when object is created with `C_CreateObject`.
     * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
     * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
     */
    public mechanism: KeyGenMechanism;
    public allowedMechanisms: void;
  }

  /**
   * Private key objects (object class `CKO_PRIVATE_KEY`) hold private keys
   */
  class PrivateKey extends Key {
    /**
     * DER-encoding of the key subject name (default empty)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     */
    public subject: Buffer;
    /**
     * `CK_TRUE` if key is sensitive
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Attribute cannot be changed once set to CK_TRUE. It becomes a read only attribute.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public sensitive: boolean;
    /**
     * `CK_TRUE` if key supports decryption
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public decrypt: boolean;
    /**
     * `CK_TRUE` if key supports signatures where the signature is an appendix to the data
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public sign: boolean;
    /**
     * `CK_TRUE` if key supports signatures where the data can be recovered from the signature
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public signRecover: boolean;
    /**
     * `CK_TRUE` if key supports unwrapping (i.e., can be used to unwrap other keys)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public unwrap: boolean;
    /**
     * `CK_TRUE` if key is extractable and can be wrapped
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Attribute cannot be changed once set to `CK_FALSE`. It becomes a read only attribute.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public extractable: boolean;
    /**
     * `CK_TRUE` if key has always had the `CKA_SENSITIVE` attribute set to `CK_TRUE`
     * - Must not be specified when object is created with `C_CreateObject`.
     * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
     * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
     */
    public alwaysSensitive: boolean;
    /**
     * `CK_TRUE` if key has never had the `CKA_EXTRACTABLE` attribute set to `CK_TRUE`
     * - Must not be specified when object is created with `C_CreateObject`.
     * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
     * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
     */
    public neverExtractable: boolean;
    /**
     * `CK_TRUE` if the key can only be wrapped with a wrapping key
     * that has `CKA_TRUSTED` set to `CK_TRUE`. Default is `CK_FALSE`.
     * - Attribute cannot be changed once set to `CK_TRUE`. It becomes a read only attribute.
     */
    public wrapTrusted: boolean;
    /**
     * For wrapping keys. The attribute template to apply to any keys unwrapped
     * using this wrapping key. Any user supplied template is applied after this template
     * as if the object has already been created.
     */
    public template: void;
    public alwaysAuthenticate: boolean;
  }

  /**
   * Public key objects (object class CKO_PUBLIC_KEY) hold public keys
   */
  class PublicKey extends Key {
    /**
     * DER-encoding of the key subject name (default empty)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     */
    public subject: Buffer;
    /**
     * `CK_TRUE` if key supports encryption
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public encrypt: boolean;
    /**
     * `CK_TRUE` if key supports verification where the signature is an appendix to the data
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public verify: boolean;
    /**
     * `CK_TRUE` if key supports verification where the data is recovered from the signature
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public verifyRecover: boolean;
    /**
     * `CK_TRUE` if key supports wrapping (i.e., can be used to wrap other keys)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public wrap: boolean;
    /**
     * The key can be trusted for the application that it was created.
     * - The wrapping key can be used to wrap keys with `CKA_WRAP_WITH_TRUSTED` set to `CK_TRUE`.
     * - Can only be set to CK_TRUE by the SO user.
     */
    public trusted: boolean;
    /**
     * For wrapping keys. The attribute template to match against any keys wrapped using this wrapping key.
     * Keys that do not match cannot be wrapped.
     */
    public template: void;
  }

  /**
   * Secret key objects (object class `CKO_SECRET_KEY`) hold secret keys.
   */
  class SecretKey extends Key {
    /**
     * `CK_TRUE` if key is sensitive
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Attribute cannot be changed once set to `CK_TRUE`. It becomes a read only attribute.
     */
    public sensitive: boolean;
    /**
     * `CK_TRUE` if key supports encryption
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public encrypt: boolean;
    /**
     * `CK_TRUE` if key supports decryption
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public decrypt: boolean;
    /**
     * `CK_TRUE` if key supports verification (i.e., of authentication codes)
     * where the signature is an appendix to the data
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public verify: boolean;
    /**
     * 	`CK_TRUE` if key supports signatures (i.e., authentication codes) where the signature is an appendix to the data
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public sign: boolean;
    /**
     * `CK_TRUE` if key supports wrapping (i.e., can be used to wrap other keys)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public wrap: boolean;
    /**
     * `CK_TRUE` if key supports unwrapping (i.e., can be used to unwrap other keys)
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public unwrap: boolean;
    /**
     * `CK_TRUE` if key is extractable and can be wrapped
     * - May be modified after object is created with a `C_SetAttributeValue` call,
     * or in the process of copying object with a `C_CopyObject` call.
     * However, it is possible that a particular token may not permit modification of the attribute
     * during the course of a `C_CopyObject` call.
     * - Attribute cannot be changed once set to `CK_FALSE`. It becomes a read only attribute.
     * - Default value is token-specific, and may depend on the values of other attributes.
     */
    public extractable: boolean;
    /**
     * `CK_TRUE` if key has always had the `CKA_SENSITIVE` attribute set to `CK_TRUE`
     * - Must not be specified when object is created with `C_CreateObject`.
     * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
     * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
     */
    public alwaysSensitive: boolean;
    /**
     * `CK_TRUE` if key has never had the `CKA_EXTRACTABLE` attribute set to `CK_TRUE`
     * - Must not be specified when object is created with `C_CreateObject`.
     * - Must not be specified when object is generated with `C_GenerateKey` or `C_GenerateKeyPair`.
     * - Must not be specified when object is unwrapped with `C_UnwrapKey`.
     */
    public neverExtractable: boolean;
    /**
     * Key checksum
     */
    public checkValue: Buffer;
    /**
     * `CK_TRUE` if the key can only be wrapped with a wrapping key
     * that has `CKA_TRUSTED` set to `CK_TRUE`. Default is `CK_FALSE`.
     * - Attribute cannot be changed once set to `CK_TRUE`. It becomes a read only attribute.
     */
    public wrapTrusted: boolean;
    /**
     * The wrapping key can be used to wrap keys with `CKA_WRAP_WITH_TRUSTED` set to `CK_TRUE`.
     * - Can only be set to CK_TRUE by the SO user.
     */
    public trusted: boolean;
    /**
     * For wrapping keys.
     * The attribute template to match against any keys wrapped using this wrapping key.
     * Keys that do not match cannot be wrapped.
     */
    public wrapTemplate: void;
    /**
     * For wrapping keys.
     * The attribute template to apply to any keys unwrapped using this wrapping key.
     * Any user supplied template is applied after this template as if the object has already been created.
     */
    public unwrapTemplate: void;
  }

  enum CertificateType {
    X_509,
    X_509_ATTR_CERT,
    WTLS,
  }

  enum CertificateCategory {
    Unspecified,
    TokenUser,
    Authority,
    OtherEntity,
  }

  /**
   * Certificate objects (object class CKO_CERTIFICATE) hold public-key or attribute certificates
   */
  class Certificate extends Storage {
    /**
     * Type of certificate
     */
    public type: CertificateType;
    /**
     * The certificate can be trusted for the application that it was created.
     */
    public trusted: boolean;
    /**
     * Categorization of the certificate
     */
    public category: CertificateCategory;
    /**
     * Checksum
     */
    public checkValue: Buffer;
    /**
     * Start date for the certificate (default empty)
     */
    public startDate: Date;
    /**
     * End date for the certificate (default empty)
     */
    public endDate: Date;
  }

  /**
   * X.509 attribute certificate objects (certificate type `CKC_X_509_ATTR_CERT`) hold X.509 attribute certificates
   */
  class AttributeCertificate extends Certificate {
    /**
     * DER-encoding of the attribute certificate's subject field.
     * This is distinct from the `CKA_SUBJECT` attribute contained in `CKC_X_509` certificates
     * because the `ASN.1` syntax and encoding are different.
     * - Must be specified when the object is created
     */
    public owner: Buffer;
    /**
     * DER-encoding of the attribute certificate's issuer field.
     * This is distinct from the `CKA_ISSUER` attribute contained in `CKC_X_509` certificates
     * because the ASN.1 syntax and encoding are different. (default empty)
     */
    public issuer: Buffer;
    /**
     * DER-encoding of the certificate serial number (default empty)
     */
    public serialNumber: Buffer;
    /**
     * BER-encoding of a sequence of object identifier values corresponding
     * to the attribute types contained in the certificate.
     * When present, this field offers an opportunity for applications
     * to search for a particular attribute certificate without fetching
     * and parsing the certificate itself. (default empty)
     */
    public types: Buffer;
    /**
     * BER-encoding of the certificate
     * - Must be specified when the object is created.
     */
    public value: Buffer;
  }

  /**
   * WTLS certificate objects (certificate type `CKC_WTLS`) hold WTLS public key certificates
   */
  class WtlsCertificate extends Certificate {
    /**
     * WTLS-encoding (Identifier type) of the certificate subject
     * - Must be specified when the object is created.
     * - Can only be empty if `CKA_VALUE` is empty.
     */
    public subject: Buffer;
    /**
     * WTLS-encoding (Identifier type) of the certificate issuer (default empty)
     */
    public issuer: Buffer;
    /**
     * Key identifier for public/private key pair (default empty)
     */
    public id: Buffer;
    /**
     * WTLS-encoding of the certificate
     * - Must be specified when the object is created.
     * - Must be non-empty if `CKA_URL` is empty.
     */
    public value: Buffer;
    /**
     * If not empty this attribute gives the URL where the complete certificate
     * can be obtained (default empty)
     * - Must be non-empty if `CKA_VALUE` is empty
     */
    public url: string;
    /**
     * DER-encoding of the certificate serial number (default empty)
     */
    public serialNumber: Buffer;
    /**
     * SHA-1 hash of the subject public key (default empty)
     * - Can only be empty if `CKA_URL` is empty.
     */
    public subjectKeyIdentifier: Buffer;
    /**
     * SHA-1 hash of the issuer public key (default empty)
     * - Can only be empty if `CKA_URL` is empty.
     */
    public authorityKeyIdentifier: Buffer;
  }

  enum JavaMIDP {
    Unspecified,
    Manufacturer,
    Operator,
    ThirdParty,
  }

  /**
   * X.509 certificate objects (certificate type `CKC_X_509`) hold X.509 public key certificates
   */
  class X509Certificate extends Certificate {
    /**
     * DER-encoding of the certificate subject name
     * - Must be specified when the object is created.
     * - Must be non-empty if `CKA_URL` is empty.
     */
    public subject: Buffer;
    /**
     * Key identifier for public/private key pair (default empty)
     */
    public id: Buffer;
    /**
     * DER-encoding of the certificate issuer name (default empty)
     */
    public issuer: Buffer;
    /**
     * HEX-encoding of the certificate serial number (default empty)
     */
    public serialNumber: string;
    /**
     * BER-encoding of the certificate
     * - Must be specified when the object is created.
     * - Must be non-empty if `CKA_URL` is empty.
     */
    public value: Buffer;
    /**
     * If not empty this attribute gives the URL where the complete certificate
     * can be obtained (default empty)
     * - Must be non-empty if `CKA_VALUE` is empty
     */
    public url: string;
    /**
     * SHA-1 hash of the subject public key (default empty)
     * - Can only be empty if `CKA_URL` is empty.
     */
    public subjectKeyIdentifier: Buffer;
    /**
     * SHA-1 hash of the issuer public key (default empty)
     * - Can only be empty if `CKA_URL` is empty.
     */
    public authorityKeyIdentifier: Buffer;
    /**
     * Java MIDP security domain
     */
    public java: JavaMIDP;
  }

  interface IAlgorithm {
    name: string;
    params: Buffer | IParams | null;
  }

  type MechanismType = MechanismEnum | KeyGenMechanism | IAlgorithm | string;

  enum MechanismFlag {
    /**
     * `True` if the mechanism is performed by the device; `false` if the mechanism is performed in software
     */
    HW,
    /**
     * `True` if the mechanism can be used with encrypt function
     */
    ENCRYPT,
    /**
     * `True` if the mechanism can be used with decrypt function
     */
    DECRYPT,
    /**
     * `True` if the mechanism can be used with digest function
     */
    DIGEST,
    /**
     * `True` if the mechanism can be used with sign function
     */
    SIGN,
    /**
     * `True` if the mechanism can be used with sign recover function
     */
    SIGN_RECOVER,
    /**
     * `True` if the mechanism can be used with verify function
     */
    VERIFY,
    /**
     * `True` if the mechanism can be used with verify recover function
     */
    VERIFY_RECOVER,
    /**
     * `True` if the mechanism can be used with geberate function
     */
    GENERATE,
    /**
     * `True` if the mechanism can be used with generate key pair function
     */
    GENERATE_KEY_PAIR,
    /**
     * `True` if the mechanism can be used with wrap function
     */
    WRAP,
    /**
     * `True` if the mechanism can be used with unwrap function
     */
    UNWRAP,
    /**
     * `True` if the mechanism can be used with derive function
     */
    DERIVE,
  }

  class Mechanism extends HandleObject {

    public static create(alg: MechanismType): Pkcs11Js.Mechanism;
    public static vendor(jsonFile: string): void;
    public static vendor(name: string, value: number): void;

    public type: MechanismEnum;

    /**
     * the minimum size of the key for the mechanism
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    public minKeySize: number;
    /**
     * the maximum size of the key for the mechanism
     * _whether this is measured in bits or in bytes is mechanism-dependent_
     */
    public maxKeySize: number;
    /**
     * bit flag specifying mechanism capabilities
     */
    public flags: number;
    /**
     * returns string name from MechanismEnum
     */
    public name: string;

    protected slotHandle: Handle;

    constructor(type: number, handle: number, slotHandle: Handle, lib: Pkcs11Js.PKCS11);

    protected getInfo(): void;
  }

  class MechanismCollection extends Collection<Mechanism> {

    protected slotHandle: Handle;

    constructor(items: number[], slotHandle: Handle, lib: Pkcs11Js.PKCS11, classType?: typeof Mechanism);
    /**
     * returns item from collection by index
     * @param {number} index of element in collection `[0..n]`
     */
    public items(index: number): Mechanism;
  }

  enum MechanismEnum {
    RSA_PKCS_KEY_PAIR_GEN,
    RSA_PKCS,
    RSA_9796,
    RSA_X_509,
    MD2_RSA_PKCS,
    MD5_RSA_PKCS,
    SHA1_RSA_PKCS,
    RIPEMD128_RSA_PKCS,
    RIPEMD160_RSA_PKCS,
    RSA_PKCS_OAEP,
    RSA_X9_31_KEY_PAIR_GEN,
    RSA_X9_31,
    SHA1_RSA_X9_31,
    RSA_PKCS_PSS,
    SHA1_RSA_PKCS_PSS,
    DSA_KEY_PAIR_GEN,
    DSA,
    DSA_SHA1,
    DSA_SHA224,
    DSA_SHA256,
    DSA_SHA384,
    DSA_SHA512,
    DH_PKCS_KEY_PAIR_GEN,
    DH_PKCS_DERIVE,
    X9_42_DH_KEY_PAIR_GEN,
    X9_42_DH_DERIVE,
    X9_42_DH_HYBRID_DERIVE,
    X9_42_MQV_DERIVE,
    SHA256_RSA_PKCS,
    SHA384_RSA_PKCS,
    SHA512_RSA_PKCS,
    SHA256_RSA_PKCS_PSS,
    SHA384_RSA_PKCS_PSS,
    SHA512_RSA_PKCS_PSS,
    SHA224_RSA_PKCS,
    SHA224_RSA_PKCS_PSS,
    RC2_KEY_GEN,
    RC2_ECB,
    RC2_CBC,
    RC2_MAC,
    RC2_MAC_GENERAL,
    RC2_CBC_PAD,
    RC4_KEY_GEN,
    RC4,
    DES_KEY_GEN,
    DES_ECB,
    DES_CBC,
    DES_MAC,
    DES_MAC_GENERAL,
    DES_CBC_PAD,
    DES2_KEY_GEN,
    DES3_KEY_GEN,
    DES3_ECB,
    DES3_CBC,
    DES3_MAC,
    DES3_MAC_GENERAL,
    DES3_CBC_PAD,
    CDMF_KEY_GEN,
    CDMF_ECB,
    CDMF_CBC,
    CDMF_MAC,
    CDMF_MAC_GENERAL,
    CDMF_CBC_PAD,
    DES_OFB64,
    DES_OFB8,
    DES_CFB64,
    DES_CFB8,
    MD2,
    MD2_HMAC,
    MD2_HMAC_GENERAL,
    MD5,
    MD5_HMAC,
    MD5_HMAC_GENERAL,
    SHA1,
    SHA,
    SHA_1,
    SHA_1_HMAC,
    SHA_1_HMAC_GENERAL,
    RIPEMD128,
    RIPEMD128_HMAC,
    RIPEMD128_HMAC_GENERAL,
    RIPEMD160,
    RIPEMD160_HMAC,
    RIPEMD160_HMAC_GENERAL,
    SHA256,
    SHA256_HMAC,
    SHA256_HMAC_GENERAL,
    SHA224,
    SHA224_HMAC,
    SHA224_HMAC_GENERAL,
    SHA384,
    SHA384_HMAC,
    SHA384_HMAC_GENERAL,
    SHA512,
    SHA512_HMAC,
    SHA512_HMAC_GENERAL,
    SECURID_KEY_GEN,
    SECURID,
    HOTP_KEY_GEN,
    HOTP,
    ACTI,
    ACTI_KEY_GEN,
    CAST_KEY_GEN,
    CAST_ECB,
    CAST_CBC,
    CAST_MAC,
    CAST_MAC_GENERAL,
    CAST_CBC_PAD,
    CAST3_KEY_GEN,
    CAST3_ECB,
    CAST3_CBC,
    CAST3_MAC,
    CAST3_MAC_GENERAL,
    CAST3_CBC_PAD,
    CAST5_KEY_GEN,
    CAST128_KEY_GEN,
    CAST5_ECB,
    CAST128_ECB,
    CAST5_CBC,
    CAST128_CBC,
    CAST5_MAC,
    CAST128_MAC,
    CAST5_MAC_GENERAL,
    CAST128_MAC_GENERAL,
    CAST5_CBC_PAD,
    CAST128_CBC_PAD,
    RC5_KEY_GEN,
    RC5_ECB,
    RC5_CBC,
    RC5_MAC,
    RC5_MAC_GENERAL,
    RC5_CBC_PAD,
    IDEA_KEY_GEN,
    IDEA_ECB,
    IDEA_CBC,
    IDEA_MAC,
    IDEA_MAC_GENERAL,
    IDEA_CBC_PAD,
    GENERIC_SECRET_KEY_GEN,
    CONCATENATE_BASE_AND_KEY,
    CONCATENATE_BASE_AND_DATA,
    CONCATENATE_DATA_AND_BASE,
    XOR_BASE_AND_DATA,
    EXTRACT_KEY_FROM_KEY,
    SSL3_PRE_MASTER_KEY_GEN,
    SSL3_MASTER_KEY_DERIVE,
    SSL3_KEY_AND_MAC_DERIVE,
    SSL3_MASTER_KEY_DERIVE_DH,
    TLS_PRE_MASTER_KEY_GEN,
    TLS_MASTER_KEY_DERIVE,
    TLS_KEY_AND_MAC_DERIVE,
    TLS_MASTER_KEY_DERIVE_DH,
    TLS_PRF,
    SSL3_MD5_MAC,
    SSL3_SHA1_MAC,
    MD5_KEY_DERIVATION,
    MD2_KEY_DERIVATION,
    SHA1_KEY_DERIVATION,
    SHA256_KEY_DERIVATION,
    SHA384_KEY_DERIVATION,
    SHA512_KEY_DERIVATION,
    SHA224_KEY_DERIVATION,
    PBE_MD2_DES_CBC,
    PBE_MD5_DES_CBC,
    PBE_MD5_CAST_CBC,
    PBE_MD5_CAST3_CBC,
    PBE_MD5_CAST5_CBC,
    PBE_MD5_CAST128_CBC,
    PBE_SHA1_CAST5_CBC,
    PBE_SHA1_CAST128_CBC,
    PBE_SHA1_RC4_128,
    PBE_SHA1_RC4_40,
    PBE_SHA1_DES3_EDE_CBC,
    PBE_SHA1_DES2_EDE_CBC,
    PBE_SHA1_RC2_128_CBC,
    PBE_SHA1_RC2_40_CBC,
    PKCS5_PBKD2,
    PBA_SHA1_WITH_SHA1_HMAC,
    WTLS_PRE_MASTER_KEY_GEN,
    WTLS_MASTER_KEY_DERIVE,
    WTLS_MASTER_KEY_DERIVE_DH_ECC,
    WTLS_PRF,
    WTLS_SERVER_KEY_AND_MAC_DERIVE,
    WTLS_CLIENT_KEY_AND_MAC_DERIVE,
    KEY_WRAP_LYNKS,
    KEY_WRAP_SET_OAEP,
    CAMELLIA_KEY_GEN,
    CAMELLIA_ECB,
    CAMELLIA_CBC,
    CAMELLIA_MAC,
    CAMELLIA_MAC_GENERAL,
    CAMELLIA_CBC_PAD,
    CAMELLIA_ECB_ENCRYPT_DATA,
    CAMELLIA_CBC_ENCRYPT_DATA,
    CAMELLIA_CTR,
    ARIA_KEY_GEN,
    ARIA_ECB,
    ARIA_CBC,
    ARIA_MAC,
    ARIA_MAC_GENERAL,
    ARIA_CBC_PAD,
    ARIA_ECB_ENCRYPT_DATA,
    ARIA_CBC_ENCRYPT_DATA,
    SKIPJACK_KEY_GEN,
    SKIPJACK_ECB64,
    SKIPJACK_CBC64,
    SKIPJACK_OFB64,
    SKIPJACK_CFB64,
    SKIPJACK_CFB32,
    SKIPJACK_CFB16,
    SKIPJACK_CFB8,
    SKIPJACK_WRAP,
    SKIPJACK_PRIVATE_WRAP,
    SKIPJACK_RELAYX,
    KEA_KEY_PAIR_GEN,
    KEA_KEY_DERIVE,
    FORTEZZA_TIMESTAMP,
    BATON_KEY_GEN,
    BATON_ECB128,
    BATON_ECB96,
    BATON_CBC128,
    BATON_COUNTER,
    BATON_SHUFFLE,
    BATON_WRAP,
    ECDSA_KEY_PAIR_GEN,
    EC_KEY_PAIR_GEN,
    ECDSA,
    ECDSA_SHA1,
    ECDSA_SHA224,
    ECDSA_SHA256,
    ECDSA_SHA384,
    ECDSA_SHA512,
    ECDH1_DERIVE,
    ECDH1_COFACTOR_DERIVE,
    ECMQV_DERIVE,
    JUNIPER_KEY_GEN,
    JUNIPER_ECB128,
    JUNIPER_CBC128,
    JUNIPER_COUNTER,
    JUNIPER_SHUFFLE,
    JUNIPER_WRAP,
    FASTHASH,
    AES_KEY_GEN,
    AES_ECB,
    AES_CBC,
    AES_MAC,
    AES_MAC_GENERAL,
    AES_CBC_PAD,
    AES_CTR,
    AES_CMAC,
    AES_CMAC_GENERAL,
    BLOWFISH_KEY_GEN,
    BLOWFISH_CBC,
    TWOFISH_KEY_GEN,
    TWOFISH_CBC,
    AES_GCM,
    AES_CCM,
    AES_KEY_WRAP,
    AES_KEY_WRAP_PAD,
    DES_ECB_ENCRYPT_DATA,
    DES_CBC_ENCRYPT_DATA,
    DES3_ECB_ENCRYPT_DATA,
    DES3_CBC_ENCRYPT_DATA,
    AES_ECB_ENCRYPT_DATA,
    AES_CBC_ENCRYPT_DATA,
    GOSTR3410_KEY_PAIR_GEN,
    GOSTR3410,
    GOSTR3410_WITH_GOSTR3411,
    GOSTR3410_KEY_WRAP,
    GOSTR3410_DERIVE,
    GOSTR3411,
    GOSTR3411_HMAC,
    GOST28147_KEY_GEN,
    GOST28147_ECB,
    GOST28147,
    GOST28147_MAC,
    GOST28147_KEY_WRAP,
    DSA_PARAMETER_GEN,
    DH_PKCS_PARAMETER_GEN,
    X9_42_DH_PARAMETER_GEN,
    VENDOR_DEFINED,
  }

  enum SessionFlag {
    /**
     * `True` if the session is read/write; `false` if the session is read-only
     */
    RW_SESSION,
    /**
     * This flag is provided for backward compatibility, and should always be set to `true`
     */
    SERIAL_SESSION,
  }

  enum UserType {
    /**
     * Security Officer
     */
    SO,
    /**
     * User
     */
    USER,
    /**
     * Context specific
     */
    CONTEXT_SPECIFIC,
  }

  interface IKeyPair {
    privateKey: PrivateKey;
    publicKey: PublicKey;
  }

  /**
   * provides information about a session
   *
   * @export
   * @class Session
   * @extends {core.HandleObject}
   */
  class Session extends HandleObject {
    /**
     * Slot
     *
     * @type {Slot}
     */
    public slot: Slot;
    /**
     * the state of the session
     *
     * @type {number}
     */
    public state: number;
    /**
     * bit flags that define the type of session
     *
     * @type {number}
     */
    public flags: number;
    /**
     * an error code defined by the cryptographic device. Used for errors not covered by Cryptoki
     *
     * @type {number}
     */
    public deviceError: number;

    constructor(handle: Handle, slot: Slot, lib: Pkcs11Js.PKCS11);

    /**
     * closes a session between an application and a token
     */
    public close(): void;
    /**
     * initializes the normal user's PIN
     * @param {string} pin the normal user's PIN
     */
    public initPin(pin: string): void;
    /**
     * modifies the PIN of the user who is logged in
     * @param {string} oldPin
     * @param {string} newPin
     */
    public setPin(oldPin: string, newPin: string): void;
    /**
     * obtains a copy of the cryptographic operations state of a session, encoded as a string of bytes
     */
    public getOperationState(): Buffer;
    /**
     * restores the cryptographic operations state of a session
     * from a string of bytes obtained with getOperationState
     * @param {Buffer} state the saved state
     * @param {number} encryptionKey holds key which will be used for an ongoing encryption
     * or decryption operation in the restored session
     * (or 0 if no encryption or decryption key is needed,
     * either because no such operation is ongoing in the stored session
     * or because all the necessary key information is present in the saved state)
     * @param {number} authenticationKey holds a handle to the key which will be used for an ongoing signature,
     * MACing, or verification operation in the restored session
     * (or 0 if no such key is needed, either because no such operation is ongoing in the stored session
     * or because all the necessary key information is present in the saved state)
     */
    public setOperationState(state: Buffer, encryptionKey?: number, authenticationKey?: number): void;
    /**
     * logs a user into a token
     * @param {string} pin the user's PIN.
     * - This standard allows PIN values to contain any valid `UTF8` character,
     * but the token may impose subset restrictions
     * @param {} userType the user type. Default is `USER`
     */
    public login(pin: string, userType?: UserType): void;
    /**
     * logs a user out from a token
     */
    public logout(): void;
    /**
     * creates a new object
     * - Only session objects can be created during a read-only session.
     * - Only public objects can be created unless the normal user is logged in.
     * @param {ITemplate} template the object's template
     * @returns {SessionObject}
     */
    public create(template: ITemplate): SessionObject;
    /**
     * Copies an object, creating a new object for the copy
     * @param {SessionObject} object the copied object
     * @param {ITemplate} template template for new object
     * @returns {SessionObject}
     */
    public copy(object: SessionObject, template: ITemplate): SessionObject;
    /**
     * removes all session objects matched to template
     * - if template is null, removes all session objects
     * - returns a number of destroyed session objects
     * @param {ITemplate} template template
     */
    public destroy(template: ITemplate): number;
    /**
     * @param {SessionObject} object
     */
    public destroy(object: SessionObject): number;
    public destroy(): number;
    /**
     * removes all session objects
     * - returns a number of destroyed session objects
     */
    public clear(): number;
    /**
     * returns a collection of session objects matched to template
     * @param template template
     * @param callback optional callback function which is called for each founded object
     * - if callback function returns false, it breaks find function.
     */
    public find(callback?: (obj: SessionObject) => any): SessionObjectCollection;
    public find(template: ITemplate, callback?: (obj: SessionObject, index: number) => any): SessionObjectCollection;
    /**
     * Returns object from session by handle
     * @param  {number} handle handle of object
     * @returns T
     */
    public getObject<T extends SessionObject>(handle: Handle): T;
    /**
     * generates a secret key or set of domain parameters, creating a new object.
     * @param mechanism generation mechanism
     * @param template template for the new key or set of domain parameters
     */
    public generateKey(mechanism: MechanismType, template?: ITemplate): SecretKey;
    public generateKey(
      mechanism: MechanismType,
      template: ITemplate,
      callback: (err: Error, key: SecretKey) => void,
    ): void;
    public generateKeyPair(mechanism: MechanismType, publicTemplate: ITemplate, privateTemplate: ITemplate): IKeyPair;
    public generateKeyPair(
      mechanism: MechanismType,
      publicTemplate: ITemplate,
      privateTemplate: ITemplate,
      callback: (err: Error, keys: IKeyPair) => void,
    ): void;
    public createSign(alg: MechanismType, key: Key): Sign;
    public createVerify(alg: MechanismType, key: Key): Verify;
    public createCipher(alg: MechanismType, key: Key): Cipher;
    public createDecipher(alg: MechanismType, key: Key, blockSize?: number): Decipher;
    public createDigest(alg: MechanismType): Digest;
    public wrapKey(alg: MechanismType, wrappingKey: Key, key: Key): Buffer;
    public wrapKey(alg: MechanismType, wrappingKey: Key, key: Key, callback: (err: Error, wkey: Buffer) => void): void;
    public unwrapKey(alg: MechanismType, unwrappingKey: Key, wrappedKey: Buffer, template: ITemplate): Key;
    public unwrapKey(
      alg: MechanismType,
      unwrappingKey: Key,
      wrappedKey: Buffer,
      template: ITemplate,
      callback: (err: Error, key: Key) => void,
    ): void;
    /**
     * derives a key from a base key, creating a new key object
     * @param {MechanismType} alg key derivation mech
     * @param {Key} baseKey base key
     * @param {ITemplate} template new key template
     */
    public deriveKey(alg: MechanismType, baseKey: Key, template: ITemplate): SecretKey;
    public deriveKey(
      alg: MechanismType,
      baseKey: Key,
      template: ITemplate,
      callback: (err: Error, key: Key) => void,
    ): void;
    /**
     * generates random data
     * @param {number} size \# of bytes to generate
     */
    public generateRandom(size: number): Buffer;

    protected getInfo(): void;
  }

  export type AttributeItemType = "number" | "boolean" | "string" | "buffer" | "date";

  /**
   * Registers new attribute
   * @param {string}              name        name of attribute
   * @param {number}              value       PKCS#11 number value of attribute
   * @param {AttributeItemType}   type        string name of type
   */
  function registerAttribute(name: string, value: number, type: AttributeItemType): void;

  interface ITemplate {
    [key: string]: any;
    /**
     * CKA_CLASS
     */
    class?: number | null;
    /**
     * CKA_TOKEN
     */
    token?: boolean | null;
    /**
     * CKA_PRIVATE
     */
    private?: boolean | null;
    /**
     * CKA_LABEL
     */
    label?: string | null;
    /**
     * CKA_APPLICATION
     */
    application?: string | null;
    /**
     * CKA_VALUE
     */
    value?: Buffer | null;
    /**
     * CKA_OBJECT_ID
     */
    objectId?: Buffer | null;
    /**
     * CKA_CERTIFICATE_TYPE
     */
    certType?: number | null;
    /**
     * CKA_ISSUER
     */
    issuer?: Buffer | null;
    /**
     * CKA_SERIAL_NUMBER
     */
    serial?: Buffer | null;
    /**
     * CKA_AC_ISSUER
     */
    issuerAC?: Buffer | null;
    /**
     * CKA_OWNER
     */
    owner?: Buffer | null;
    /**
     * CKA_ATTR_TYPES
     */
    attrTypes?: Buffer | null;
    /**
     * CKA_TRUSTED
     */
    trusted?: boolean | null;
    /**
     * CKA_CERTIFICATE_CATEGORY
     */
    certCategory?: number | null;
    /**
     * CKA_JAVA_MIDP_SECURITY_DOMAIN
     */
    javaDomain?: number | null;
    /**
     * CKA_URL
     */
    url?: string | null;
    /**
     * CKA_HASH_OF_SUBJECT_PUBLIC_KEY
     */
    ski?: Buffer | null;
    /**
     * CKA_HASH_OF_ISSUER_PUBLIC_KEY
     */
    aki?: Buffer | null;
    /**
     * CKA_NAME_HASH_ALGORITHM
     */
    digestName?: number | null;
    /**
     * CKA_CHECK_VALUE
     */
    checkValue?: Buffer | null;
    /**
     * CKA_KEY_TYPE
     */
    keyType?: number | null;
    /**
     * CKA_SUBJECT
     */
    subject?: Buffer | null;
    /**
     * CKA_ID
     */
    id?: Buffer | null;
    /**
     * CKA_SENSITIVE
     */
    sensitive?: boolean | null;
    /**
     * CKA_ENCRYPT
     */
    encrypt?: boolean | null;
    /**
     * CKA_DECRYPT
     */
    decrypt?: boolean | null;
    /**
     * CKA_WRAP
     */
    wrap?: boolean | null;
    /**
     * CKA_UNWRAP
     */
    unwrap?: boolean | null;
    /**
     * CKA_SIGN
     */
    sign?: boolean | null;
    /**
     * CKA_SIGN_RECOVER
     */
    signRecover?: boolean | null;
    /**
     * CKA_VERIFY
     */
    verify?: boolean | null;
    /**
     * CKA_VERIFY_RECOVER
     */
    verifyRecover?: boolean | null;
    /**
     * CKA_DERIVE
     */
    derive?: boolean | null;
    /**
     * CKA_START_DATE
     */
    startDate?: Date | null;
    /**
     * CKA_END_DATE
     */
    endDate?: Date | null;
    /**
     * CKA_MODULUS
     */
    modulus?: Buffer | null;
    /**
     * CKA_MODULUS_BITS
     */
    modulusBits?: number | null;
    /**
     * CKA_PUBLIC_EXPONENT
     */
    publicExponent?: Buffer | null;
    /**
     * CKA_PRIVATE_EXPONENT
     */
    privateExponent?: Buffer | null;
    /**
     * CKA_PRIME_1
     */
    prime1?: Buffer | null;
    /**
     * CKA_PRIME_2
     */
    prime2?: Buffer | null;
    /**
     * CKA_EXPONENT_1
     */
    exp1?: Buffer | null;
    /**
     * CKA_EXPONENT_2
     */
    exp2?: Buffer | null;
    /**
     * CKA_COEFFICIENT
     */
    coefficient?: Buffer | null;
    /**
     * CKA_PRIME
     */
    prime?: Buffer | null;
    /**
     * CKA_SUBPRIME
     */
    subprime?: Buffer | null;
    /**
     * CKA_BASE
     */
    base?: Buffer | null;
    /**
     * CKA_PRIME_BITS
     */
    primeBits?: number | null;
    /**
     * CKA_SUBPRIME_BITS
     */
    subprimeBits?: number | null;
    /**
     * CKA_VALUE_BITS
     */
    valueBits?: number | null;
    /**
     * CKA_VALUE_LEN
     */
    valueLen?: number | null;
    /**
     * CKA_EXTRACTABLE
     */
    extractable?: boolean | null;
    /**
     * CKA_LOCAL
     */
    local?: boolean | null;
    /**
     * CKA_NEVER_EXTRACTABLE
     */
    neverExtractable?: boolean | null;
    /**
     * CKA_ALWAYS_SENSITIVE
     */
    alwaysSensitive?: boolean | null;
    /**
     * CKA_KEY_GEN_MECHANISM
     */
    keyGenMechanism?: number | null;
    /**
     * CKA_MODIFIABLE
     */
    modifiable?: boolean | null;
    /**
     * CKA_COPYABLE
     */
    copyable?: boolean | null;
    /**
     * CKA_ECDSA_PARAMS
     */
    paramsECDSA?: Buffer | null;
    paramsEC?: Buffer | null;
    /**
     * CKA_EC_POINT
     */
    pointEC?: Buffer | null;
    /**
     * CKA_SECONDARY_AUTH
     */
    secondaryAuth?: boolean | null;
    /**
     * CKA_AUTH_PIN_FLAGS
     */
    authPinFlags?: Buffer | null;
    /**
     * CKA_ALWAYS_AUTHENTICATE
     */
    alwaysAuth?: boolean | null;
    /**
     * CKA_WRAP_WITH_TRUSTED
     */
    wrapWithTrusted?: boolean | null;
    /**
     * CKA_WRAP_TEMPLATE
     */
    wrapTemplate?: any | null;
    /**
     * CKA_UNWRAP_TEMPLATE
     */
    unwrapTemplate?: any | null;
    /**
     * CKA_OTP_FORMAT
     */
    otpFormat?: any | null;
    /**
     * CKA_OTP_LENGTH
     */
    otpLength?: any | null;
    /**
     * CKA_OTP_TIME_INTERVAL
     */
    otpTimeInterval?: any | null;
    /**
     * CKA_OTP_USER_FRIENDLY_MODE
     */
    otpUserFriendlyMode?: any | null;
    /**
     * CKA_OTP_CHALLENGE_REQUIREMENT
     */
    otpChallengeReq?: any | null;
    /**
     * CKA_OTP_TIME_REQUIREMENT
     */
    otpTimeReq?: any | null;
    /**
     * CKA_OTP_COUNTER_REQUIREMENT
     */
    otpCounterReq?: any | null;
    /**
     * CKA_OTP_PIN_REQUIREMENT
     */
    otpPinReq?: any | null;
    /**
     * CKA_OTP_COUNTER
     */
    otpCounter?: any | null;
    /**
     * CKA_OTP_TIME
     */
    otpTime?: any | null;
    /**
     * CKA_OTP_USER_IDENTIFIER
     */
    otpUserId?: any | null;
    /**
     * CKA_OTP_SERVICE_IDENTIFIER
     */
    otpServiceId?: any | null;
    /**
     * CKA_OTP_SERVICE_LOGO
     */
    otpServiceLogo?: any | null;
    /**
     * CKA_OTP_SERVICE_LOGO_TYPE
     */
    otpServiceLogoType?: any | null;
    /**
     * CKA_HW_FEATURE_TYPE
     */
    hwFeatureType?: any | null;
    /**
     * CKA_RESET_ON_INIT
     */
    resetOnInit?: any | null;
    /**
     * CKA_HAS_RESET
     */
    hasReset?: any | null;
    /**
     * CKA_PIXEL_X
     */
    pixelX?: any | null;
    /**
     * CKA_PIXEL_Y
     */
    pixelY?: any | null;
    /**
     * CKA_RESOLUTION
     */
    resolution?: any | null;
    /**
     * CKA_CHAR_ROWS
     */
    charRows?: any | null;
    /**
     * CKA_CHAR_COLUMNS
     */
    charCols?: any | null;
    /**
     * CKA_COLOR
     */
    color?: any | null;
    /**
     * CKA_BITS_PER_PIXEL
     */
    bitsPerPixel?: any | null;
    /**
     * CKA_CHAR_SETS
     */
    charSets?: any | null;
    /**
     * CKA_ENCODING_METHODS
     */
    encMethod?: any | null;
    /**
     * CKA_MIME_TYPES
     */
    mimeTypes?: any | null;
    /**
     * CKA_MECHANISM_TYPE
     */
    mechanismType?: any | null;
    /**
     * CKA_REQUIRED_CMS_ATTRIBUTES
     */
    requiredCmsAttrs?: any | null;
    /**
     * CKA_DEFAULT_CMS_ATTRIBUTES
     */
    defaultCmsAttrs?: any | null;
    /**
     * CKA_SUPPORTED_CMS_ATTRIBUTES
     */
    supportedCmsAttrs?: any | null;
    /**
     * CKA_ALLOWED_MECHANISMS
     */
    allowedMechanisms?: any | null;
  }

  class Template {
    public static toPkcs11(tmpl: ITemplate): Pkcs11Js.Attribute[];
    public static fromPkcs11(tmpl: Pkcs11Js.Template): ITemplate;
  }

  enum SlotFlag {
    /**
     * `True` if a token is present in the slot (e.g., a device is in the reader)
     */
    TOKEN_PRESENT,
    /**
     * `True` if the reader supports removable devices
     */
    REMOVABLE_DEVICE,
    /**
     * True if the slot is a hardware slot, as opposed to a software slot implementing a "soft token"
     */
    HW_SLOT,
  }
  class Slot extends HandleObject {

    public slotDescription: string;
    public manufacturerID: string;
    public flags: number;
    public hardwareVersion: Pkcs11Js.Version;
    public firmwareVersion: Pkcs11Js.Version;
    public module: Module;

    constructor(handle: Handle, module: Module, lib: Pkcs11Js.PKCS11);

    /**
     * Returns information about token
     *
     * @returns {Token}
     */
    public getToken(): Token;
    /**
     * returns list of `MechanismInfo`
     *
     * @returns {MechanismCollection}
     */
    public getMechanisms(): MechanismCollection;
    /**
     * initializes a token
     *
     * @param {string} pin the SO's initial PIN
     * @returns {string}
     */
    public initToken(pin: string): string;
    /**
     * opens a session between an application and a token in a particular slot
     *
     * @param {SessionFlag} [flags=session.SessionFlag.SERIAL_SESSION] indicates the type of session
     * @returns {Session}
     */
    public open(flags?: SessionFlag): Session;
    /**
     * closes all sessions an application has with a token
     */
    public closeAll(): void;

    /**
     * Receive information about Slot
     *
     * @protected
     */
    protected getInfo(): void;
  }

  /**
   * Collection of slots
   *
   * @export
   * @class SlotCollection
   * @extends {core.Collection<Slot>}
   */
  class SlotCollection extends Collection<Slot> {
    public module: Module;
    constructor(items: Buffer[], module: Module, lib: Pkcs11Js.PKCS11, classType?: any);
    public items(index: number): Slot;
  }

  enum TokenFlag {
    RNG,
    WRITE_PROTECTED,
    LOGIN_REQUIRED,
    USER_PIN_INITIALIZED,
    RESTORE_KEY_NOT_NEEDED,
    CLOCK_ON_TOKEN,
    PROTECTED_AUTHENTICATION_PATH,
    DUAL_CRYPTO_OPERATIONS,
    TOKEN_INITIALIZED,
    SECONDARY_AUTHENTICATION,
    USER_PIN_COUNT_LOW,
    USER_PIN_FINAL_TRY,
    USER_PIN_LOCKED,
    USER_PIN_TO_BE_CHANGED,
    SO_PIN_COUNT_LOW,
    SO_PIN_FINAL_TRY,
    SO_PIN_LOCKED,
    SO_PIN_TO_BE_CHANGED,
    ERROR_STATE,
  }

  class Token extends HandleObject {
    /**
     * application-defined label, assigned during token initialization.
     * - Must be padded with the blank character (' ').
     * - Should __not__ be null-terminated.
     */
    public label: string;
    /**
     * ID of the device manufacturer.
     * - Must be padded with the blank character (' ').
     * - Should __not__ be null-terminated.
     */
    public manufacturerID: string;
    /**
     * model of the device.
     * - Must be padded with the blank character (' ').
     * - Should __not__ be null-terminated.
     */
    public model: string;
    /**
     * character-string serial number of the device.
     * - Must be padded with the blank character (' ').
     * - Should __not__ be null-terminated.
     */
    public serialNumber: string;
    /**
     * bit flags indicating capabilities and status of the device
     */
    public flags: number;
    /**
     * maximum number of sessions that can be opened with the token at one time by a single application
     */
    public maxSessionCount: number;
    /**
     * number of sessions that this application currently has open with the token
     */
    public sessionCount: number;
    /**
     * maximum number of read/write sessions that can be opened
     * with the token at one time by a single application
     */
    public maxRwSessionCount: number;
    /**
     * number of read/write sessions that this application currently has open with the token
     */
    public rwSessionCount: number;
    /**
     * maximum length in bytes of the PIN
     */
    public maxPinLen: number;
    /**
     * minimum length in bytes of the PIN
     */
    public minPinLen: number;
    /**
     * the total amount of memory on the token in bytes in which public objects may be stored
     */
    public totalPublicMemory: number;
    /**
     * the amount of free (unused) memory on the token in bytes for public objects
     */
    public freePublicMemory: number;
    /**
     * the total amount of memory on the token in bytes in which private objects may be stored
     */
    public totalPrivateMemory: number;
    /**
     * the amount of free (unused) memory on the token in bytes for private objects
     */
    public freePrivateMemory: number;
    /**
     * version number of hardware
     */
    public hardwareVersion: Pkcs11Js.Version;
    /**
     * version number of firmware
     */
    public firmwareVersion: Pkcs11Js.Version;
    /**
     * current time as a character-string of length 16,
     * represented in the format YYYYMMDDhhmmssxx
     */
    public utcTime: Date;

    constructor(handle: Handle, lib: Pkcs11Js.PKCS11);

    protected getInfo(): void;
  }

  class Module extends BaseObject {
    /**
     * loads pkcs11 lib
     * @param libFile path to PKCS11 library
     * @param libName name of PKCS11 library
     */
    public static load(libFile: string, libName?: string): Module;
    public libFile: string;
    public libName: string;
    /**
     * Cryptoki interface version
     */
    public cryptokiVersion: Pkcs11Js.Version;
    /**
     * blank padded manufacturer ID
     */
    public manufacturerID: string;
    /**
     * must be zero
     */
    public flags: number;
    /**
     * blank padded library description
     */
    public libraryDescription: string;
    /**
     * version of library
     */
    public libraryVersion: Pkcs11Js.Version;
    constructor(lib: Pkcs11Js.PKCS11);
    /**
     * initializes the Cryptoki library
     */
    public initialize(options?: Pkcs11Js.InitializationOptions): void;
    /**
     * indicates that an application is done with the Cryptoki library
     */
    public finalize(): void;
    /**
     * obtains a list of slots in the system
     * @param {number} index index of an element in collection
     * @param {number} tokenPresent only slots with tokens. Default `True`
     */
    public getSlots(index: number, tokenPresent?: boolean): Slot;
    /**
     * @param {number} tokenPresent only slots with tokens. Default `True`
     */
    public getSlots(tokenPresent?: boolean): SlotCollection;
    /**
     * closes PKCS#11 library
     */
    public close(): void;
    protected getInfo(): void;
  }

}

declare module "graphene-pk11" {
  export = GraphenePkcs11;
}
