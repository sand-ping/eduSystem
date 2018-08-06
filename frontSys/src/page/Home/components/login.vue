<template>
  <div id="wrapper">
    <div class="loginWrap">
      <div class="loginWrap-header">
        <div class="header-stu">学生登录</div>
        <div class="header-tea">教师登录</div>
      </div>
      <div class="loginWrap-center">
        <div class="loginWrap-center-view">
          <div class="label">帐号</div>
          <el-input v-model="user" placeholder="请输入帐号"></el-input>
        </div>
        <div class="loginWrap-center-view">
          <div class="label">密码</div>
          <el-input v-model="password" placeholder="请输入密码"></el-input>
        </div>
      </div>
      <el-button type="primary">登录</el-button>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      user:"",
      password:""
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
