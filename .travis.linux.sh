git clone https://github.com/opendnssec/SoftHSMv2.git
cd SoftHSMv2

sudo apt-get update -qq

# prepare the configuration scripts
sudo apt-get install autoconf -y
sudo apt-get install automake -y
sudo apt-get install libtool -y

echo "Configure SoftHSMv2"
sh ./autogen.sh
./configure
make
echo "Install SoftHSMv2"
sudo make install

echo "Running SoftHSMv2"
/usr/local/bin/softhsm2-util --init-token --so-pin "12345" --pin "12345" --slot 0 --label "My slot 0"
cd ..