/**
 * Created by samhuber on 12/31/17.
 */
var db=require('../dbconnection'); //reference of dbconnection.js

var DrillUser={
  getDrillDataByIdAndUserId:function(data, callback){
    return db.query("select * from UserDrillDetails where drillId=? and userId=?",[data.drillId,data.userId], callback);
  },
  addDrillDataByIdAndUserId:function(data,callback){
    return db.query("insert into UserDrillDetails values(NULL,?,?,NOW(),?,?,?,?,?,?,?)",
      [data.drillId,data.userId,data.time,data.alpha,data.charlie,data.delta,data.mike,data.noShoot,data.penalty],callback);
  },
  deleteDrillDataById:function(drill,callback){
    return db.query("delete from UserDrillDetails where id=?",[drill.id],callback);
  },
  updateDrillDataById:function(data,callback){
    return db.query("update UserDrillDetails set `time`=?, alpha=?, charlie=?, delta=?, mike=?, noShoot=?, `penalty`=? where id=?",
      [data.time,data.alpha,data.charlie,data.delta,data.mike,data.noShoot,data.penalty,data.id],callback);
  }
};
module.exports=DrillUser;
