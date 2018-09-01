var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

var connection = mysql.createConnection(db.mysql);
connection.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    connection = mysql.createConnection(db.mysql);
  }else{
    throw err;
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  let param=req.query;
  var sql = "select * from college";
  console.log(req,param,)
  connection.query(sql,function (err, rows) {
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
router.post('/', function(req, res, next) {
  let param=req.body;
  var sql = "insert into college(college_name,college_address) value(?,?) ";
  console.log(req,param,)
  connection.query(sql,[param.name,param.address],function (err, rows) {
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
module.exports = router;