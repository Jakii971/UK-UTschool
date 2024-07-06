const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  host: process.env.HOST,
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
};