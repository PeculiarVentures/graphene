import { ObjectClass, SessionObjectFactory, SessionObject } from "../object";
import { Data } from "./data";
import { DomainParameters } from "./domain";
import { PrivateKey, PublicKey, SecretKey } from "./keys";
import { Certificate, CertificateType, AttributeCertificate, X509Certificate, WtlsCertificate } from "./certs";

SessionObjectFactory.register(ObjectClass.DATA, Data);
SessionObjectFactory.register(ObjectClass.DOMAIN_PARAMETERS, DomainParameters);
SessionObjectFactory.register(ObjectClass.PRIVATE_KEY, PrivateKey);
SessionObjectFactory.register(ObjectClass.PUBLIC_KEY, PublicKey);
SessionObjectFactory.register(ObjectClass.SECRET_KEY, SecretKey);
SessionObjectFactory.register(ObjectClass.CERTIFICATE, Certificate, (cert) => {
  const type = cert.type;
  switch (type) {
    case CertificateType.X_509:
      return new X509Certificate(cert);
    case CertificateType.WTLS:
      return new WtlsCertificate(cert);
    case CertificateType.X_509_ATTR_CERT:
      return new AttributeCertificate(cert) as any;
    default:
      throw new Error(`Unknown certificate (CKC_?) type '${type}'`);
  }
});
SessionObjectFactory.register(ObjectClass.HW_FEATURE, SessionObject);
SessionObjectFactory.register(ObjectClass.OTP_KEY, SessionObject);

export * from "./storage";
export * from "./data";
export * from "./certs";
export * from "./keys";
export * from "./domain";
