const namedCurves: INamedCurve[] = [
  { name: "secp160r1", oid: "1.3.132.0.8", value: Buffer.from("06052b81040008", "hex"), size: 160 },
  { name: "secp192r1", oid: "1.2.840.10045.3.1.1", value: Buffer.from("06082A8648CE3D030101", "hex"), size: 192 },
  { name: "secp256r1", oid: "1.2.840.10045.3.1.7", value: Buffer.from("06082A8648CE3D030107", "hex"), size: 256 },
  { name: "secp384r1", oid: "1.3.132.0.34", value: Buffer.from("06052B81040022", "hex"), size: 384 },
  { name: "secp521r1", oid: "1.3.132.0.35", value: Buffer.from("06052B81040023", "hex"), size: 521 },
  { name: "prime192r1", oid: "1.2.840.10045.3.1.1", value: Buffer.from("06082A8648CE3D030101", "hex"), size: 192 },
  { name: "prime256v1", oid: "1.2.840.10045.3.1.7", value: Buffer.from("06082A8648CE3D030107", "hex"), size: 256 },
  { name: "prime384v1", oid: "1.3.132.0.34", value: Buffer.from("06052B81040022", "hex"), size: 384 },
  { name: "ansiX9p192r1", oid: "1.2.840.10045.3.1.1", value: Buffer.from("06082A8648CE3D030101", "hex"), size: 192 },
  { name: "ansiX9p256r1", oid: "1.2.840.10045.3.1.7", value: Buffer.from("06082A8648CE3D030107", "hex"), size: 256 },
  { name: "ansiX9p384r1", oid: "1.3.132.0.34", value: Buffer.from("06052B81040022", "hex"), size: 384 },
  // tslint:disable-next-line:max-line-length
  { name: "brainpoolP192r1", oid: "1.3.36.3.3.2.8.1.1.3", value: Buffer.from("06092B2403030208010103", "hex"), size: 192 },
  // tslint:disable-next-line:max-line-length
  { name: "brainpoolP224r1", oid: "1.3.36.3.3.2.8.1.1.5", value: Buffer.from("06092B2403030208010105", "hex"), size: 224 },
  // tslint:disable-next-line:max-line-length
  { name: "brainpoolP256r1", oid: "1.3.36.3.3.2.8.1.1.7", value: Buffer.from("06092B2403030208010107", "hex"), size: 256 },
  { name: "curve25519", oid: "1.3.6.1.4.1.11591.15.1", value: Buffer.from("06092B06010401DA470F01", "hex"), size: 256 },
];

export interface INamedCurve {
  name: string;
  oid: string;
  value: Buffer;
  size: number;
}

export class NamedCurve {

  public static getByName(name: string): INamedCurve {
    for (const i in namedCurves) {
      const nc = namedCurves[i];
      if (nc.name === name) {
        return nc;
      }
    }
    throw new Error(`Can not find named curve by name '${name}'`);
  }

  public static getByOid(oid: string): INamedCurve {
    for (const i in namedCurves) {
      const nc = namedCurves[i];
      if (nc.oid === oid) {
        return nc;
      }
    }
    throw new Error(`Can not find named curve by oid '${oid}'`);
  }

  public static getByBuffer(buf: Buffer): INamedCurve {
    for (const i in namedCurves) {
      const nc = namedCurves[i];
      if (nc.value.equals(buf)) {
        return nc;
      }
    }
    throw new Error(`Can not find named curve by buffer value '${buf.toString("hex")}'`);
  }
}
