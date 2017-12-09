/**
 * Created by samhuber on 8/13/17.
 */
var db=require('../dbconnection'); //reference of dbconnection.js

var BulletManufacturer={

  getAllBulletManufacturers:function(callback){

    return db.query("select * from BulletManufacturers",callback);

  },
  getBulletManufacturerById:function(id,callback){

    return db.query("select * from BulletManufacturers where id=?",[id],callback);
  },
  addBulletManufacturer:function(id, name,callback){
    return db.query("Insert into BulletManufacturers values(?,?)",[id,name],callback);
  },
  deleteBulletManufacturer:function(id,callback){
    return db.query("delete from BulletManufacturers where id=?",[id],callback);
  },
  updateBulletManufacturer:function(id,name,callback){
    return db.query("update BulletManufacturers set name=? where id=?",[name,id],callback);
  }

};
module.exports=BulletManufacturer;