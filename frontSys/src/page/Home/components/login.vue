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
          <div class="header-stu">学生登录</div>
          <div class="header-tea">教师登录</div>
        </div>
        <div class="messageWrap">
          <div class="message">短信快捷登陆</div>
        </div>
        <div class="loginWrap-center">
          <el-input v-model="user" placeholder="请输入帐号" class="loginWrap-center-input"></el-input>
          <el-input v-model="password" placeholder="请输入密码" class="loginWrap-center-input"></el-input>
        </div>
        <div class="login">登录</div>
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
  }
}
</script>
<style lang="scss" scoped>
  @import "./../sass/login.scss";
</style>
