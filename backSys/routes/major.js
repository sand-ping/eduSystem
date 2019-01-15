var express=require("express");
var router=express.Router();
var mysql=require("mysql");
var db=require('../public/db');

var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

router.get('/',function (req,res,next) {
  let param=req.query;
  var sql="select * from major";
  var searchArr=[];
  //判断查询条件：学院
  if(param.col_id!=""&&param.col_id!=undefined){
    sql="select * from major where col_id=?";
    searchArr.push(param.col_id);
  }
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,searchArr,function (err,rows) {
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
  let para=[param.major_num,param.major_name,param.col_id,param.major_id];
  let sql="update major set major_num=?,major_name=?,col_id=? where major_id=?";
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
  let para=[param.major_num,param.major_name,param.col_id];
  let sql="insert into major(major_num,major_name,col_id) values(?,?,?)";
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