const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
};

// TODO set pw to proccess.env
// PROD
// const databaseUrl = 'mongodb://AdminKatomi:fw9spRj#mWg4hXq1@15.237.60.243:27017/msdb?authSource=admin';
// STAGING
const databaseUrl = 'mongodb+srv://root:aZbOkdpzE5bfizjT@msante.vi2cn.mongodb.net/msante?retryWrites=true&w=majority';

mongoose.connect(databaseUrl, mongooseOptions).catch((err) => {
  console.log(err);
});
