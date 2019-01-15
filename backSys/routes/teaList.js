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
  var sql="select teacher.tea_id,teacher.tea_name,teacher.tea_sex,teacher.tea_num,teacher.tea_nation,teacher.tea_identity_card,teacher.tea_birth_date,teacher.tea_photo,"
    +"major.major_id,major_name,college.col_id,college.col_name "
    +"from teacher,major,college "
    +"where teacher.major_id=major.major_id "
    +"and major.col_id=college.col_id "
    +"and teacher.tea_num like ? "
    +"and teacher.tea_name like ? "
    +"and major.major_id like ? "
    +"and college.col_id like ?";
  if(param.teaNum!=""&&param.teaNum!=undefined){
    searchArr.push("%"+param.teaNum+"%");
  }else{
    searchArr.push('%');
  }
  if(param.teaName!=""&&param.teaName!=undefined){
    searchArr.push("%"+param.teaName+"%");
  }else{
    searchArr.push('%');
  }
  if(param.major_id!=""&&param.major_id!=undefined){
    searchArr.push(param.major_id);
  }else{
    searchArr.push('%');
  }
  if(param.college_id!=""&&param.college_id!=undefined){
    searchArr.push(param.college_id);
  }else{
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
    for(let i=0;i<returnData.length;i++){
      if(returnData[i].tea_birth_date){
        returnData[i].tea_birth_date=returnData[i].tea_birth_date.toLocaleDateString();
      }
    }
    suData.data=returnData;
    suData.count=count;
    res.send(suData)
    return
  })
})


module.exports = router;