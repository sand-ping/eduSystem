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
    // for(var i in rows){
    //   console.log(rows);
    //   var temp=rows[i].id;
    //   console.log(temp);
    // }
    result=JSON.stringify(rows);//转换成JSON String格式
    console.log(result);
    res.end(result);

  })
  console.log(result);
  // res.render('index', { title: 'Express' });
});
router.post('/',function (req,res,next) {
  let data={};
  let body=req.body;
  let sql="select * from student where snum=? and spwd=?";
  connection.query(sql,[body.num,body.password],function (err,rows) {
    console.log('postlogin',err,rows);
    if(err){
      data.success=false;
      data.data="";
      data.message=err;
    }else if(rows.length==0){
      data.success=false;
      data.data=""
      data.message="帐号或密码错误";
    }else{
      data.success=true;
      data.data=rows;
      data.message="";
    }
    res.send(data)

  })
});
module.exports = router;
