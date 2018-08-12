var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');

var connection = mysql.createConnection(db.mysql);



/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "select * from manager"
  var result;
  connection.query(sql,function (err, rows) {
    if(err){
      console.log(err);
      return;
    }
    for(var i in rows){
      console.log(rows);
      var temp=rows[i].id;
      console.log(temp);
    }
    result=JSON.stringify(rows);//转换成JSON String格式
    console.log(result);
    res.end(result);

  })
  console.log(result);
  // res.render('index', { title: 'Express' });
});
router.post('/',function (req,res,next) {
  var body=req.body;
  console.log(body);
  console.log(body.user)
});
module.exports = router;
