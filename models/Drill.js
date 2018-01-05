var db=require('../dbconnection'); //reference of dbconnection.js

var Drill={
  getAllDrills:function(callback){
    return db.query("select * from Drills",callback);
  },
  getDrillById:function(id,callback){
    return db.query("select * from Drills where id=?",id,callback);
  },
  addDrill:function(drill,callback){
    return db.query("insert into Drills values(NULL,?,?,?)",[drill.name,drill.image,drill.procedure],callback);
  },
  deleteDrill:function(drill,callback){
    return db.query("delete from Drills where id=?",[drill.id],callback);
  },
  updateDrill:function(drill,callback){
    return db.query("update Drills set `name`=?, image=?, `procedure`=? where id=?",[drill.name,drill.image,drill.procedure,drill.id],callback);
  }

};
module.exports=Drill;
