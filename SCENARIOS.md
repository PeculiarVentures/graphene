# Scenarios
### Securely signing documents and messages
In some cases the use of Hardware Security Modules and/or Smart Cards are required. In others they are not required but would be valuable to reduce risk of key compromise. Use keys generated and managed by a hardware security device to address these risks and requirements.

### Securely encrypting documents and messages
Stolen keys can be used without your knowledge using keys generated and managed in a hardware security device helps reduce the risk of key compromise.

### Securing your bitcoin keys
Bitcoin wallets are fundamentally just ECC keys. You can generate and manage these keys in a hardware security device to prevent the loss of funds.

### Securing keys you use for authentication
Many machines have Trusted Platform Modules (TPMs) you can use these through PKCS#11 or leverage a hardware security device to prevent your services authentication keys from stolen.

### Securely generated keys and trusted implementations
Weak random numbers and other fundamental crypto mistakes can be avoided when using trusted implementations of the associated algorithms.
