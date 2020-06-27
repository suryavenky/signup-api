const mongoose = require('mongoose');

const DB_CONNECTION = process.env.DATABASE_CONNECTION;

exports.initializeMongo = function () {
  console.log(
    '----------Trying to connect db----------',
    DB_CONNECTION,
  );
  mongoose.connect(DB_CONNECTION);

  var db = mongoose.connection;
  db.on('error', function () {
    console.log(
      'Connection error: Please check the connection and DB is up and running..!',
    );
  });
  db.once('open', function () {
    console.log('-----------DB successfully connected----------');
  });
};

require('./user.model');
