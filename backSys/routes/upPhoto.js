var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var path = require("path");
var fs = require("fs");
var db = require('../public/db');
var returnData = require('../public/returnData');
var formidable = require('formidable');
var suData=returnData.suData;
var faData=returnData.faData;
var connection = mysql.createConnection(db.mysql);
var form=new formidable.IncomingForm();
router.post('/',function (req,res,next) {
  res.header("access-control-allow-origin","*");
  res.header("Access-Control-Allow-Methods","OPTIONS, HEAD, POST");
  res.header("Content-Type","application/json");
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname,'../public/images/' );
  form.keepExtensions = true;//保留后缀
  form.maxFieldsSize = 2000 * 1024 * 1024;
  //处理图片
  let backData={};
  form.parse(req, function (err, fields, files){
    var filename = files.img.name;
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length - 1];
    var date = new Date();
    var time=date.getTime();
    var avatarName = time + '.' + type;
    var newPath = form.uploadDir + "/" + avatarName;
    fs.renameSync(files.img.path, newPath);  //重命名
    backData.path='/images/'+avatarName;
    suData.data=backData;
    res.send(suData)
  })
});
router.options('/',function (req,res,next) {
  let body=req.body;
  res.header("access-control-allow-origin","*");
  res.header("Access-Control-Allow-Methods","OPTIONS, HEAD, POST");
  suData.data="";
  res.send(suData)
  return
});


module.exports = router;

