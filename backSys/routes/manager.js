var express=require('express');
var router = express.Router();
var mysql=require("mysql");
var db=require("../public/db");
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;



router.post('/',function (req,res,next) {
  let body=req.body;
  var sql="select * from manager where man_num=? and man_pwd=?"
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
      suData.data=rows;
      res.send(suData)
      return
    }
  })
})
module.exports = router;