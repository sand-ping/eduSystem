var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');
// var con_db = require('../public/con_db');
var Token=require('../public/token');
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

// var connection = con_db.connection;
// var connection=mysql.createConnection(db.mysql);
// var connection = mysql.createConnection(db.mysql);
// connection.on('error', function(err) {
//   console.log('db error', err);
//   if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//     connection = mysql.createConnection(db.mysql);
//   }else{
//     throw err;
//   }
// });


router.post('/',function (req,res,next) {
  let body=req.body;
  let sql="select * from student where stu_num=? and stu_psw=?";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,[body.num,body.password],function (err,rows) {
    if(err){
      faData.message=err;
      res.send(faData)
      return
    }else if(rows.length==0){
      faData.message="帐号或密码错误";
      res.send(faData)
      return
    }else{
      let token=Token.getToken(0,rows[0].stu_id)
      suData.data=rows[0];
      suData.data.token=token;
      res.send(suData)
      return
    }
  })
});
module.exports = router;
