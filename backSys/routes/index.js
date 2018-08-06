var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');

var connection = mysql.createConnection(db);
var sql = "select * from manager"


/* GET home page. */
router.get('/', function(req, res, next) {
  var result1;
  console.log(req);
  connection.query(sql,function (err, result) {
    console.log('error')
    console.log(err)
    result1=result
    console.log('success')
    console.log(result1);
   })
  res.send("11")
  // res.render('index', { title: 'Express' });

});

module.exports = router;
