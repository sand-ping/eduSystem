var express=require("express")
var router=express.Router()
var mysql  = require('mysql');
var db=require("../public/db")
var returnData = require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;
var connection = mysql.createConnection(db.mysql);

router.get("/",function (req,res,next) {
  let param=req.query;
  let page=param.page?param.page:1;
  let pageSize=param.pageSize?param.pageSize:10;
  let returnData="";
  let count=0;
  var sql = "select * from student";
  connection.query(sql,function (err, rows) {
    if(err){
      faData.message=err;
      suData.count=count;
      res.send(faData)
      return
    }
    count=rows.length;
    returnData=rows.splice((page-1)*pageSize,pageSize)
    for(let i=0;i<returnData.length;i++){
      returnData[i].stu_birth_date=returnData[i].stu_birth_date.toLocaleDateString();
    }
    suData.data=returnData;
    suData.count=count;
    res.send(suData)
    return

  })
})



module.exports = router;