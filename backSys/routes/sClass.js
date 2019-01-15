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
router.put('/',function (req,res,next) {
  let param=req.body;
  let para=[param.s_class_name,param.major_id,param.tea_id,param.s_class_id];
  let sql="update s_class set s_class_name=?,major_id=?,tea_id=? where s_class_id=?";
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
  let s_class_date=new Date();
  s_class_date=s_class_date.toLocaleDateString();
  let para=[param.s_class_name,s_class_date,param.major_id,param.tea_id];
  let sql="insert into s_class(s_class_name,s_class_date,major_id,tea_id) values(?,?,?,?)";
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