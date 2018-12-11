var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');
// var con_db = require('../public/con_db');
var Token=require('../public/token');
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

router.get('/', function(req, res, next) {
  let param=req.query;
  var sql = "select * from student where stu_id=?";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,[param.id],function (err, rows) {
    if(err){
      faData.message=err;
      res.send(faData)
      return
    }
    let data=rows[0];
    if(rows[0].man_birth_date){
      suData.data.stu_birth_date=rows[0].stu_birth_date.toLocaleDateString();
    }
    suData.data=data;
    res.send(suData);
    return
  })
});
router.put('/',function (req,res,next) {
  let param=req.body;
  let para=[param.stu_num,param.stu_name,param.stu_sex,param.stu_nation,param.stu_identity_card,param.stu_birth_date,param.stu_photo,param.s_class_id,param.stu_id];
  let sql="update student set stu_num=?,stu_name=?,stu_sex=?,stu_nation=?,stu_identity_card=?,stu_birth_date=?,stu_photo=?,s_class_id=? where stu_id=?";
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
router.post('/',function (req,res,next) {
  let param=req.body;
  let para=[param.stu_num,param.stu_name,param.stu_sex,param.stu_nation,param.stu_identity_card,param.stu_birth_date,param.stu_photo,param.s_class_id];
  let sql="insert into student(stu_psw,stu_num,stu_name,stu_sex,stu_nation,stu_identity_card,stu_birth_date,stu_photo,s_class_id) values('123456',?,?,?,?,?,?,?,?)";
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

module.exports = router;