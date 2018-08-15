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
            <div class="loginWrap-header-line-left" :style="loginModel==0?'background:#108cee':''"></div>
            <div class="loginWrap-header-line-right" :style="loginModel==1?'background:#108cee':''"></div>
          </div>
          <div class="header-stu" @click="clickHeader">学生登录</div>
          <div class="header-tea" @click="clickHeader">教师登录</div>
        </div>
        <div class="messageWrap">
          <div class="message">短信快捷登陆</div>
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
    clickHeader:function () {
      if(this.loginModel==0){
        this.loginModel=1;
      }else{
        this.loginModel=0;
      }
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
      this.$http.post("/api/login",{"num":root.user,"password":root.password}).then((res)=>{
        console.log(res)
        if(res.body.success){
          root.$router.push({ path: 'home' })
        }else{
          root.$message({
            type:"error",
            message:res.body.message
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
