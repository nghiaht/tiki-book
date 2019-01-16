FROM node:carbon-alpine as base

FROM base as builder

WORKDIR /usr/src/app

COPY client/package.json .
RUN npm install

COPY client/ .
RUN npm run build

FROM base as server

WORKDIR /usr/src/app

COPY server/package.json .
RUN npm install

COPY server/ .
COPY --from=builder /usr/src/app/build /usr/src/app/build/

CMD ["node", "index.js"]