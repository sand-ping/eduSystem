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
    data.stu_birth_date=rows[0].stu_birth_date.toLocaleDateString();
    suData.data=data;
    res.send(suData);
    return
  })
});

module.exports = router;