#!/bin/bash -e
# Run standard capability tests.
THIS=$0
P11_LIBRARY_PATH=$1
P11_LIBRARY_NAME=$2
SLOT=$3
PIN=$4

usage() {
  echo "$THIS p11-lib-path p11-lib-name slot-id pin" >&2
}

if [ ! -f $P11_LIBRARY_PATH ]
then
  echo "P11 library does not exist ($P11_LIBRARY_PATH)" >&2
  exit 1
fi

if [ "x$P11_LIBRARY_NAME" = "x" ]
then
  usage
  exit 1
fi

if [ "x$SLOT" = "x" ]
then
  usage
  exit 1
fi

if [ "x$PIN" = "x" ]
then
  usage
  exit 1
fi

OUTPUT=capabilities/$P11_LIBRARY_NAME.md
mkdir -p capabilities
cat > $OUTPUT <<EOF
**$P11_LIBRARY_NAME PKCS#11 DEVICE CAPABILITIES**
---

EOF

cat >> $OUTPUT <<EOF
#### Capabilities

    a - all mechanisms in PKCS11
    h - mechanism can be used with C_DigestInit
    s - mechanism can be used with C_SignInit
    v - mechanism can be used with C_VerifyInit
    e - mechanism can be used with C_EncryptInit
    d - mechanism can be used with C_DecryptInit
    w - mechanism can be used with C_WrapKey
    u - mechanism can be used with C_UnwrapKey
    g - mechanism can be used with C_GenerateKey or C_GenerateKeyPair
    D - mechanism can be used with C_DeriveKey

EOF

node build/console/console.js >> $OUTPUT <<EOF
module load -l $P11_LIBRARY_PATH -n $P11_LIBRARY_NAME
slot open --slot $SLOT --pin $PIN
slot algs -s 0 -fa
exit
EOF

declare -A CMDS=(["Key generation"]="test gen -it 5 -a all"
                 ["Signing"]="test sign -it 200 -a all"
                 ["Encryption"]="test enc -it 200 -a all")

echo "#### Performance" >> $OUTPUT 
for CMD in "${!CMDS[@]}"
do
  echo "##### $CMD" >> $OUTPUT
  node build/console/console.js >> $OUTPUT <<EOF
module load -l $P11_LIBRARY_PATH -n $P11_LIBRARY_NAME
slot open --slot $SLOT --pin $PIN
${CMDS[$CMD]}
exit
EOF
done
sed -i '/^=\(=\)*=$/d' $OUTPUT
sed -i '/^>\s*$/d' $OUTPUT
sed -i '/Thanks for using/d' $OUTPUT
