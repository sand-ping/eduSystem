var mysql=require('mysql');
var db=require('./db');
var jwt =require('jsonwebtoken');


var tokenMethods={}
var secretOrPrivateKey="jiangzp"    // 这是加密的key（密钥）
var user_type=['stu','tea','man']    //用户类型

var connection=mysql.createConnection(db.mysql);

//生成token
tokenMethods.getToken=function (uid,uTypeIndex) {
  let content ={'name':user_type[uTypeIndex],'uid':uid}; // 要生成token的主题信息
  let token = jwt.sign(content, secretOrPrivateKey, {
    expiresIn: 60*60*24*3,  // 3天过期  后面返回的单位是秒
  });
  return token;

}

//验证token
tokenMethods.verifyToken=function (token) {
  let root=this;
  let returnMsg={};
  jwt.verify(token, secretOrPrivateKey, function (err, decode) {
    if (err) {  //  时间失效的时候/ 伪造的token
      console.log(err)
      root.returnMsg={success:false,message:"token错误"}
    } else {
      console.log(decode);
      let now_time=new Date();
      now_time=now_time.getTime();
      now_time=now_time/1000;
      let end_time=decode.exp;
      console.log(now_time)
      console.log(end_time)

      if(end_time<now_time){
        console.log(1111111111)
        root.returnMsg={success:false,message:"token过期"}
      }
      console.log(decode.name)
      let index=user_type.indexOf(decode.name);
      let sql="";
      console.log('index',index)
      if(index==-1){
        root.returnMsg={success:false,message:"token错误"}
      }else if(index==0){
        sql="select * from student where stu_id='"+decode.uid+"'";
      }else if(index==1){
        sql="select * from teacher where tea_id='"+decode.uid+"'";
      }else if(index==2){
        sql="select * from manager where man_id='"+decode.uid+"'";
      }
      console.log('decodeid',decode.uid)
      connection.query(sql,function (err,row) {
        console.log(222222222)
        console.log(row)
        if(err){
          root.returnMsg={success:false,message:"token错误"}
        }else{
          if(row.length==0){
            root.returnMsg={success:false,message:"用户不存在"}
          }else{
            root.returnMsg={success:true,message:""}
          }

        }
      })
      // var date=new Date(decode.exp)
      // console.log(date)
    }
  })
  // return=returnMsg;
  // var decoded = jwt.decode(token, {complete: true});
  // console.log(decoded.header);
  // console.log(decoded.payload)
  // console.log(decoded.signature)
}

module.exports=tokenMethods;