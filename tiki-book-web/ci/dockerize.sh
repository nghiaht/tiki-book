SCRIPT_DIR=$(cd $(dirname "$0"); pwd)
SOURCE="${SCRIPT_DIR}/.."

docker build -t tiki-book-web:latest -f ${SCRIPT_DIR}/Dockerfile ${SOURCE}