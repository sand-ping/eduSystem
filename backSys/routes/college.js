var express=require("express");
var router=express.Router();
var mysql=require("mysql");
var db=require('../public/db');

var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

router.get('/',function (req,res,next) {
  let param=req.query;
  var sql="select * from college";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,[],function (err,rows) {
    if(err){
      faData.message=err;
      res.send(faData)
      return
    }
    suData.data=rows;
    res.send(suData);
    return
  })
})
router.put('/',function (req,res,next) {
  let param=req.body;
  let para=[param.col_num,param.col_name,param.tea_id,param.col_id];
  let sql="update college set col_num=?,col_name=?,tea_id=? where col_id=?";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,para,function (err,rows) {
    if(err){
      faData.message=err;
      res.send(faData);
      return
    }
    res.send(suData);
    return
  })
})
router.post('/',function (req,res,next) {
  let param=req.body;
  let para=[param.col_num,param.col_name,param.tea_id];
  let sql="insert into college(col_num,col_name,tea_id,sch_id) values(?,?,?,1)";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,para,function (err,rows) {
    if(err){
      faData.message=err;
      res.send(faData);
      return
    }
    console.log(rows)
    res.send(suData);
    return
  })
})
module.exports=router;