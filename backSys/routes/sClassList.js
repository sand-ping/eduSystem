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
  let searchArr=[];
  let page=param.page?param.page:1;
  let pageSize=param.pageSize?param.pageSize:10;
  let returnData="";
  let count=0;
  var sql="select s_class.s_class_id,s_class.s_class_name,teacher.tea_name,teacher.tea_id,major.major_id,major.major_name,college.col_name "
    +"from college,teacher,major,s_class "
    +"where s_class.tea_id=teacher.tea_id "
    +"and college.col_id=major.col_id "
    +"and s_class.major_id=major.major_id "
    +"and (college.col_name like ? "
    +"or s_class.s_class_name like ? "
    +"or major.major_name like ?);"
  if(param.keyword!=""){
    searchArr.push("%"+param.keyword+"%");
    searchArr.push("%"+param.keyword+"%");
    searchArr.push("%"+param.keyword+"%");
  }else{
    searchArr.push('%');
    searchArr.push('%');
    searchArr.push('%');
  }
  connection.query(sql,searchArr,function (err, rows) {
    if(err){
      faData.message=err;
      suData.count=count;
      res.send(faData)
      return
    }
    count=rows.length;
    returnData=rows.splice((page-1)*pageSize,pageSize)
    suData.data=returnData;
    suData.count=count;
    res.send(suData)
    return
  })
})


module.exports = router;