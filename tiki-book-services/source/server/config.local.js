const original = require('./config');
const settings = require('./settings');

module.exports = Object.assign({}, original, {
  'port': settings.PORT,
});
