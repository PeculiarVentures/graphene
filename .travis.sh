#!/bin/bash
set -e

if [ "$TRAVIS_OS_NAME" == "linux" ]; then

    # Installing SoftHSM dependencies
    sudo apt-get update -qq
    sudo apt-get install libssl-dev
    sudo apt-get install autoconf -y
    sudo apt-get install automake -y
    sudo apt-get install libtool -y
    
    # Installing SoftHSM
    git clone https://github.com/opendnssec/SoftHSMv2.git -b develop
    cd SoftHSMv2
    sh ./autogen.sh
    ./configure
    make
    sudo -E make install
    cd ..
    sudo ldconfig
    
elif [ "$TRAVIS_OS_NAME" == "osx" ]; then

    # Installing SoftHSM dependencies
    brew update
    command -v automake || brew install automake
    command -v openssl || brew install openssl
    command -v nss || brew install nss
    
    # seems to be needed
    export OPENSSL_INCLUDE_DIR=`brew --prefix openssl`/include
    export OPENSSL_LIB_DIR=`brew --prefix openssl`/lib
    
    command -v sqlite || brew install sqlite
    command -v cppunit || brew install cppunit
    
    # Installing SoftHSM
    git clone https://github.com/opendnssec/SoftHSMv2.git -b develop
    cd SoftHSMv2
    sh ./autogen.sh
    ./configure \
    --with-openssl=/usr/local/opt/openssl \
    --with-sqlite3=/usr/local/opt/sqlite
    make
    sudo -E make install
    cd ..
    
fi

# initializing SoftHSM
softhsm2-util --init-token --so-pin "12345" --pin "12345" --slot 0 --label "My slot 0"
