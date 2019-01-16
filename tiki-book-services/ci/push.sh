SCRIPT_DIR=$(cd $(dirname "$0"); pwd)
SOURCE="${SCRIPT_DIR}/.."

IMAGE_TAG="nghiaht/tiki-book:services-latest"

docker tag tiki-book-services:latest ${IMAGE_TAG}
docker push ${IMAGE_TAG}
