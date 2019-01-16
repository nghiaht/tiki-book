const original = require("./datasources");
const settings = require("./settings");

const overridden = Object.assign({}, original, {
  "tikibookdb": {
    "host": settings.DB_HOST,
    "port": settings.DB_PORT,
    "url": "",
    "database": settings.DB_NAME,
    "password": settings.DB_PASSWORD,
    "name": settings.DB_NAME,
    "user": settings.DB_USER,
    "connector": "mongodb"
  }
});

module.exports = overridden;
