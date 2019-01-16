SCRIPT_DIR=$(cd $(dirname "$0"); pwd)
SOURCE="${SCRIPT_DIR}/../source"

docker build -t tiki-book-services:latest -f ${SCRIPT_DIR}/Dockerfile ${SOURCE}