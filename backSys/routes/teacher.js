var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var db=require('../public/db');
var Token=require('../public/token');
var returnData=require('../public/returnData');
var suData=returnData.suData;
var faData=returnData.faData;


router.post('/',function (req,res,next) {
  let data=req.body;
  let sql="select * from teacher where tea_num=? and tea_psw=?";
  let connection=mysql.createConnection(db.mysql);
  connection.query(sql,[data.num,data.password],function (err,row) {
    if(err){
      faData.message=err;
      res.send(faData)
      return
    }else if(row.length==0){
      faData.message="帐号或密码错误";
      res.send(faData)
      return
    }else{
      let token=Token.getToken(1,rows[0].tea_id);
      suData.data=rows[0];
      suData.data.token=token;
      res.send(suData)
      return
    }
  })
})
module.exports = router;

