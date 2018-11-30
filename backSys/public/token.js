var jwt =require('jsonwebtoken');

var tokenMethods={}
var secretOrPrivateKey="jiangzp"    // 这是加密的key（密钥）
var user_type=['stu','tea','man']    //用户类型


//生成token
tokenMethods.getToken=function (uTypeIndex,uid) {
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
      returnMsg={success:false,message:"token错误"}
    } else {
      let now_time=new Date();
      now_time=now_time.getTime();
      now_time=now_time/1000;
      let end_time=decode.exp;
      if(end_time<now_time){
        returnMsg={success:false,message:"token过期"}
      }
      let index=user_type.indexOf(decode.name);
      let sql="";
      if(index==-1){
        returnMsg={success:false,message:"token错误"}
      }else if(index==0){
        sql="select * from student where stu_id='"+decode.uid+"'";
      }else if(index==1){
        sql="select * from teacher where tea_id='"+decode.uid+"'";
      }else if(index==2){
        sql="select * from manager where man_id='"+decode.uid+"'";
      }
      returnMsg={success:true,message:"",sql:sql}
    }
  })
  return returnMsg;
  // return=returnMsg;
  // var decoded = jwt.decode(token, {complete: true});
  // console.log(decoded.header);
  // console.log(decoded.payload)
  // console.log(decoded.signature)
}

module.exports=tokenMethods;