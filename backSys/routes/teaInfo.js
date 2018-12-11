var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');
// var con_db = require('../public/con_db');
var Token=require('../public/token');
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

router.get('/',function (req,res,next) {
  let data=req.query;
  let sql="select * from teacher where tea_id=?";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,[data.id],function (err,rows) {
    if(err){
      faData.message=err;
      res.send(faData);
      return
    }else{
      suData.data=rows[0];
      if(rows[0].man_birth_date){
        suData.data.tea_birth_date=rows[0].tea_birth_date.toLocaleDateString();
      }
      res.send(suData);
      return
    }
  })
})
router.put('/',function (req,res,next) {
  let param=req.body;
  let para=[param.tea_num,param.tea_name,param.tea_sex,param.tea_nation,param.tea_identity_card,param.tea_birth_date,param.tea_photo,param.major_id,param.tea_id];
  let sql="update teacher set tea_num=?,tea_name=?,tea_sex=?,tea_nation=?,tea_identity_card=?,tea_birth_date=?,tea_photo=?,major_id=? where tea_id=?";
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
  let para=[param.tea_num,param.tea_name,param.tea_sex,param.tea_nation,param.tea_identity_card,param.tea_birth_date,param.tea_photo,param.major_id];
  let sql="insert into teacher(tea_psw,tea_num,tea_name,tea_sex,tea_nation,tea_identity_card,tea_birth_date,tea_photo,major_id) values('123456',?,?,?,?,?,?,?,?)";
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