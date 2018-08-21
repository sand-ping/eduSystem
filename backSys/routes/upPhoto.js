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
    let body=req.body;
    console.log("post")
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../page/upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
        console.log(files.the_file);
        var filename = files.the_file.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.the_file.path, newPath);  //重命名
        res.send({data:"/upload/"+avatarName})
    })
});
router.options('/',function (req,res,next) {
    let body=req.body;
     // console.log(res)
    suData.data="";
    res.send(suData)
    return
    // var form = new formidable.IncomingForm();
    // form.encoding = 'utf-8';
    // form.uploadDir = path.join(__dirname + "/../page/upload");
    // form.keepExtensions = true;//保留后缀
    // form.maxFieldsSize = 2 * 1024 * 1024;
    // //处理图片
    // form.parse(req, function (err, fields, files){
    //     console.log(files.the_file);
    //     var filename = files.the_file.name
    //     var nameArray = filename.split('.');
    //     var type = nameArray[nameArray.length - 1];
    //     var name = '';
    //     for (var i = 0; i < nameArray.length - 1; i++) {
    //         name = name + nameArray[i];
    //     }
    //     var date = new Date();
    //     var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
    //     var avatarName = name + time + '.' + type;
    //     var newPath = form.uploadDir + "/" + avatarName;
    //     fs.renameSync(files.the_file.path, newPath);  //重命名
    //     res.send({data:"/upload/"+avatarName})
    // })
});


module.exports = router;

