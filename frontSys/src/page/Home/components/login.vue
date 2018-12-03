<template>
  <div id="wrapper">
    <div class="bgimage"></div>
    <div class="centerwrap">
      <div class="centerWrap-left">
        <div class="centerWrap-left-image"></div>
      </div>
      <div class="loginWrap">
        <div class="loginWrap-header">
          <div class="loginWrap-header-line">
            <div class="loginWrap-header-line-left" :style="loginModel==0?'background:#108cee':''" v-show="loginModel!=2"></div>
            <div class="loginWrap-header-line-right" :style="loginModel==1?'background:#108cee':''" v-show="loginModel!=2"></div>
          </div>
          <div class="header-stu" @click="clickHeader(0)" v-show="loginModel!=2">学生登录</div>
          <div class="header-tea" @click="clickHeader(1)" v-show="loginModel!=2">教师登录</div>
          <div class="header-man" @click="clickHeader(2)" v-show="loginModel==2">管理员登录</div>
        </div>
        <div class="messageWrap">
          <div class="message" @click="clickHeader(2)" v-show="loginModel!=2">管理员登录</div>
          <div class="message" @click="clickHeader(0)" v-show="loginModel==2">学生教师登录</div>
        </div>
        <div class="loginWrap-center">
          <el-input v-model="user" placeholder="请输入帐号" class="loginWrap-center-input"></el-input>
          <el-input v-model="password" placeholder="请输入密码" class="loginWrap-center-input"></el-input>
        </div>
        <div class="login" @click="login">登录</div>
      </div>
    </div>

  </div>
</template>
<script>
export default{
  data(){
    return{
      user:"",
      password:"",
      loginModel:0,
    }
  },
  created:function () {

  },
  methods:{
    clickHeader:function (e) {
      this.loginModel=e;
    },
    getPara:function () {
      let root=this;
      if(root.user.trim()==""){
        root.$message({
          message:"帐号不能为空",
          type:'error',
        })
        return false;
      }else if(root.password.trim()==""){
        root.$message({
          message:"密码不能为空",
          type:'error',
        })
        return false;
      }
      return true;
    },
    login:function () {
      let root=this;
      if(!root.getPara()){
        return
      }
      var api="";
      var gopath=""
      if(root.loginModel==0){
        api="loginS";
        gopath="home";
      }else if(root.loginModel==1){
        api="loginT";
        gopath="teacherHome";
      }else if(root.loginModel==2){
        api="loginM";
        gopath="managerHome";
      }
      this.Http.post(api,{"num":root.user,"password":root.password}).then((res)=>{
        //如果是vueresource请求返回的数据为res.body.data
        console.log(res.data.data)
        let userInfo=JSON.stringify(res.data.data)
        console.log(res.data.data)
        if(res.data.success){
          localStorage.setItem('userInfo',userInfo);
          console.log(res.data.data.token)
          localStorage.setItem('token',res.data.data.token);
          root.$router.push({ path: gopath })
        }else{
          root.$message({
            type:"error",
            message:res.data.message
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./../sass/login.scss";
</style>
