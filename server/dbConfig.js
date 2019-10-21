var constants = require('./constants');
const mysql = require('mysql');
var pool;
var self=this;
module.exports = {
  getPool: function (){
     if (pool){
       return pool;
     }
     pool = mysql.createPool({
        connectionLimit : 100,
        host: constants.DB.HOST,
        user: constants.DB.USER,
        password: constants.DB.PSWD,
        port: constants.DB.PORT,
        database: constants.DB.DB_NAME
      });
      return pool;
  },
  connectToDB: function(query, callback, context, values){
      this.getPool().getConnection(function(err,connection){
         if(err) {
           process.exit(1);
           console.log("sql err >>",err);
           //this.stop(err);
         } else {
           connection.query(query,[values], function(err, rows){
              typeof callback == "function" && callback(err, rows, context);
           });
         }
     });
  },
  stop: function(err){
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
  }

}
