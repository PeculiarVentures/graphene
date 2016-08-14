git clone https://github.com/opendnssec/SoftHSMv2.git
cd SoftHSMv2

sudo apt-get update -qq

# prepare the configuration scripts
sudo apt-get install autoconf -y
sudo apt-get install automake -y
sudo apt-get install libtool -y

sh ./autogen.sh
./configure
make
sudo make install
cd ..