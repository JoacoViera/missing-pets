const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodb = async () => {
  const db = mongoose.connection;
  db.once('connected', () =>
    // eslint-disable-next-line no-console
    console.log('[mongodb]', `Connected to: ${db.host}:${db.port}/${db.name}`),
  );

  await mongoose.connect(uri, options);

  return db;
};

module.exports = mongodb;
