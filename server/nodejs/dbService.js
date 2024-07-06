const mysql = require('mysql');
const dbConfig = require('./config');

let instance = null;

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if(err){
    console.log('Database connection failed:', err.message);
  }
  console.log('Database ' + connection.state);
})

class DbService {
  static getDbServiceInstance(){
    return instance ? instance : new DbService();
  }

  static getConnection(){
    return connection;
  }
}

module.exports = DbService;