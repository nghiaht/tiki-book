SCRIPT_DIR=$(cd $(dirname "$0"); pwd)
SOURCE="${SCRIPT_DIR}/.."

IMAGE_TAG="nghiaht/tiki-book:web-latest"

docker tag tiki-book-web:latest ${IMAGE_TAG}
docker push ${IMAGE_TAG}
