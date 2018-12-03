var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('../public/db');
// var con_db = require('../public/con_db');
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;

router.get('/',function (req,res,next) {
  let data=req.query;
  let sql="select * from manager where man_id=?";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,[data.id],function (err,rows) {
    if(err){
      faData.message=err;
      res.send(faData);
      return
    }else{
      rows[0].tea_birth_date=rows[0].tea_birth_date.toLocaleDateString();
      suData.data=rows[0];
      res.send(suData);
      return
    }
  })
})
module.exports=router;