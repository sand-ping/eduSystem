<template>
  <div class="wrapper">
    <div class="wrapper-left" :style="'width:'+leftWidth+'px'">
      <div class="wrapper-left-top">
        <div class="wrapper-logo"></div>
        <div :class="'wrapper-shrink iconfont '+(isCollapse?'icon-youshuangjiantou':'icon-zuoshuangjiantou')" @click="collapseClick"></div>
      </div>
      <el-menu default-active="1-4-1" class="wrapper-left-body" @open="" @close="" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false" :router="true">
        <el-submenu index="/homeManager">
          <template slot="title">
            <i class="wrapper-left-left-icon iconfont icon-yonghudianji"></i>
            <span slot="title">学生管理</span>
          </template>
          <el-menu-item index="/homeManager">学生列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="wrapper-left-left-icon iconfont icon-kecheng"></i>
            <span slot="title">教工管理</span>
          </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="wrapper-left-left-icon iconfont icon-chengji"></i>
            <span slot="title">学院管理</span>
          </template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="wrapper-right">
      <div class="wrapper-right-top"></div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        isCollapse:false,
        leftWidth:230,
      }
    },
    methods:{
      collapseClick:function () {
        let root=this;
        if(root.isCollapse){
          root.isCollapse=false;
          root.leftWidth=230;
        }else{
          root.isCollapse=true;
          root.leftWidth=66;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../sass/homeManager.scss";
</style>
