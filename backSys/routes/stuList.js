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
  // var sql = "select * from student";
  var sql="select student.stu_id,student.stu_name,student.stu_sex,student.stu_num,student.stu_nation,student.stu_identity_card,student.stu_birth_date,student.stu_photo,"
    +"s_class.s_class_id,s_class_name,major.major_id,major_name,college.col_id,college.col_name "
    +"from student,s_class,major,college "
    +"where student.s_class_id=s_class.s_class_id "
    +"and s_class.major_id=major.major_id "
    +"and major.col_id=college.col_id "
    +"and student.stu_num like ? "
    +"and student.stu_name like ? "
    +"and s_class.s_class_id like ? "
    +"and major.major_id like ? "
    +"and college.col_id like ?";
  if(param.stuNum!=""){
    searchArr.push("%"+param.stuNum+"%");
  }else{
    searchArr.push('%');
  }
  if(param.stuName!=""){
    searchArr.push("%"+param.stuName+"%");
  }else{
    searchArr.push('%');
  }
  if(param.class_id!=""){
    searchArr.push(param.class_id);
  }else{
    searchArr.push('%');
  }
  if(param.major_id!=""){
    searchArr.push(param.major_id);
  }else{
    searchArr.push('%');
  }
  if(param.college_id!=""){
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
      if(returnData[i].stu_birth_date){
        returnData[i].stu_birth_date=returnData[i].stu_birth_date.toLocaleDateString();
      }
    }
    suData.data=returnData;
    suData.count=count;
    res.send(suData)
    return
  })
})


module.exports = router;