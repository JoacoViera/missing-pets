const config = require('./config');

module.exports = [{ method: 'POST', path: '/sendMail', config: config.create }];
