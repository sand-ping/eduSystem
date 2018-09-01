var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');
var con_db = require('../public/con_db');
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

var connection = con_db.connection;
// var connection = mysql.createConnection(db.mysql);
// connection.on('error', function(err) {
//   console.log('db error', err);
//   if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//     connection = mysql.createConnection(db.mysql);
//   }else{
//     throw err;
//   }
// });




/* GET home page. */
router.get('/', function(req, res, next) {
  let param=req.query;
  var sql = "select * from student where sid=?";
  console.log(req,param,)
  connection.query(sql,[param.sid],function (err, rows) {
    if(err){
      faData.message=err;
      res.send(faData)
      return
    }
    suData.data=rows[0];
    res.send(suData)
    return

  })
});
router.post('/',function (req,res,next) {
  let body=req.body;
  let sql="select * from student where snum=? and spwd=?";
  connection.query(sql,[body.num,body.password],function (err,rows) {
    console.log('postlogin',err,rows);
    if(err){
      faData.message=err;
      res.send(faData)
      return
    }else if(rows.length==0){
      faData.message="帐号或密码错误";
      res.send(faData)
      return
    }else{
      suData.data=rows;
      res.send(suData)
      return
    }
  })
});
module.exports = router;
