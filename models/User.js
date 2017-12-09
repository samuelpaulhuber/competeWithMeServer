/**
 * Created by samhuber on 8/13/17.
 */
var db=require('../dbconnection'); //reference of dbconnection.js

var User={
  checkCredentials:function(user,callback){
    try {
      return db.query("select * from Users where email=? and password=?", [user.email, user.password], callback);
    }
    catch(e) {
      throw e;
    }
    //return db.query("select * from Users where email =? and password =?",[user.email,user.password],callback);
  },
  getAllUsers:function(callback){
    return db.query("select * from Users",callback);
  },
  getUserById:function(id,callback){
    return db.query("select * from Users where id=?",[id],callback);
  },
  addUser:function(user,callback){
    return db.query("insert into Users values(NULL,?,?,?)",[user.email,user.password,user.salt],callback);
  },
  deleteUser:function(id,callback){
    return db.query("delete from Users where id=?",[id],callback);
  },
  updateUser:function(id,email,callback){
    return db.query("update Users set email=? where id=?",[email,id],callback);
  }

};
module.exports=User;
