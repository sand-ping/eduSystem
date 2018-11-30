var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql=require('mysql');
var db=require('./public/db');


var isNeedToken=require('./public/is_need_token');  //验证接口是否需要token
var tokenMethods=require('./public/token')    //token的生成和验证
var returnData = require('./public/returnData');  //返回数据格式
var faData=returnData.faData;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var managerRouter = require('./routes/manager');
var manager_college = require('./routes/manager_college');
var getStudentListRouter = require('./routes/getStudentList');
var upPhotoRouter = require('./routes/upPhoto');
var teacherRouter=require('./routes/teacher');
var getTeacherInfoRouter=require('./routes/getTeacherInfo');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置页面文件目录
app.set('view engine', 'jade');//设置模板引擎为jade

app.get('/', function(request, response) {
  response.render('pages/index.jade');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//自动解析参数
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置token拦截
app.use(function(req, res, next) {
  if(isNeedToken(req.url,req.method)){
    let token=req.headers.authorization;
    let result=tokenMethods.verifyToken(token);
    if(!result.success){
      faData.message=result.message;
      res.status(203);
      res.send(faData);
      return;
    }else{
      let sql=result.sql;
      var connection=mysql.createConnection(db.mysql);
      connection.query(sql,function (err,row) {
        if(err){
          faData.message=result.message;
          res.status(203);
          res.send(faData);
          return;
          // root.return={success:false,message:"token错误"}
        }else{
          if(row.length==0){
            faData.message='用户不存在';
            res.status(203);
            res.send(faData);
            return;
          }else{
            //若没有拦截到，就行匹配下一个接口·
            next();
          }

        }
      })
    }
  }else{
    //若没有拦截到，就行匹配下一个接口·
    next();
  }

});

app.use('/api/getTeacherInfo',getTeacherInfoRouter);
app.use('/api/loginT', teacherRouter);
app.use('/api/loginM', managerRouter);
app.use('/api/loginS', studentRouter);
app.use('/api/users', usersRouter);
app.use('/api/upPhoto', upPhotoRouter);
app.use('/api/getStudentList', getStudentListRouter);
app.use('/api/manager_college', manager_college);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
