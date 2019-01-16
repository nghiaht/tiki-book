const Settings = {
  PORT: process.env.PORT || 3500,
  DB_HOST: process.env.DB_HOST || "172.16.1.11",
  DB_PORT: process.env.DB_PORT || "27017",
  DB_NAME: process.env.DB_NAME || "tikibookdb",
  DB_USER: process.env.DB_USER || "tiki",
  DB_PASSWORD: process.env.DB_PASSWORD || "tiki",
};

module.exports = Settings;
