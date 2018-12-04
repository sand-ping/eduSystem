var express=require("express");
var router=express.Router();
var mysql=require("mysql");
var db=require('../public/db');

var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

router.get('/',function (req,res,next) {
  let param=req.query;
  var sql="select * from s_class";
  var searchArr=[];
  //判断查询条件：学院
  if(param.major_id!=""&&param.major_id!=undefined){
    sql="select * from s_class where major_id=?";
    searchArr.push(param.major_id);
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

module.exports=router;