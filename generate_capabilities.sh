#!/bin/bash -e
# Run standard capability tests.
P11_LIBRARY_PATH=$1
P11_LIBRARY_NAME=$2
SLOT=$3
PIN=$4

usage() {
  echo "generate_capabilities.sh p11-lib-path p11-lib-name slot-id pin" >&2
}

if [ ! -f $P11_LIBRARY_PATH ];
then
  echo "P11 library does not exist ($P11_LIBRARY_PATH)" >&2
  exit 1
fi

if [ "x$P11_LIBRARY_NAME" = "x" ];
then
  usage
  exit 1
fi

if [ "x$SLOT" = "x" ];
then
  usage
  exit 1
fi

if [ "x$PIN" = "x" ];
then
  usage
  exit 1
fi

mkdir -p capabilities
cat > capabilities/$P11_LIBRARY_NAME.capabilities <<EOF
**$P11_LIBRARY_NAME PKCS#11 DEVICE CAPABILITIES**
---
EOF

node build/console/console.js >> capabilities/$P11_LIBRARY_NAME.capabilities <<EOF
module load -l $P11_LIBRARY_PATH -n $P11_LIBRARY_NAME
slot open --slot $SLOT --pin $PIN
slot algs -s 0 -fa
test gen -it 5 -a all
test sign -it 200 -a all
test enc -it 200 -a all
exit
EOF
