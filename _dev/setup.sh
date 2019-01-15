#!/bin/sh

echo "=> Provision Vagrant box"

echo "nameserver 8.8.8.8" | sudo tee -a /etc/resolv.conf
echo "nameserver 8.8.4.4" | sudo tee -a /etc/resolv.conf
echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf

# https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository
# https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user
# https://docs.docker.com/compose/install/

sudo apt-get update -y
sudo apt-get install -y linux-headers-$(uname -r) build-essential dkms
sudo apt-get install -y wget

echo "==> Install Docker"

sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update -y
sudo apt-get install -y docker-ce
sudo docker run hello-world

sudo groupadd docker
sudo usermod -aG docker $USER
sudo usermod -aG docker ubuntu
sudo usermod -aG docker vagrant
docker run hello-world

echo "==> Install Docker Compose"

sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

echo "==> Install Java"

echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | sudo tee /etc/apt/sources.list.d/webupd8team-java.list
echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | sudo tee -a /etc/apt/sources.list.d/webupd8team-java.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
sudo apt-get update -y

echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections
echo oracle-java8-installer shared/accepted-oracle-licence-v1-1 boolean true | sudo /usr/bin/debconf-set-selections

sudo apt-get install -y oracle-java8-installer
sudo apt-get install -y oracle-java8-set-default

java -version

JAVA_HOME=$(which java)
echo JAVA_HOME=\"${JAVA_HOME}\" | sudo tee -a /etc/environment
. /etc/environment