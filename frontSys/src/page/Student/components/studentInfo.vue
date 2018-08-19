<template>
  <div class="wrap">
    <div class="wrapCenter">
      <el-row>
        <el-col :span="12">
          <div class="row">
            <div class="row-title">头像：</div>
            <div class="row-text">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i class="el-icon avatar-uploader-icon" v-else ></i>
              </el-upload>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="row">
            <div class="row-title">姓名：</div>
            <div class="row-text">
              <el-input :disabled="disable">{{}}</el-input>
            </div>
          </div>
          <div class="row">
            <div class="row-title">学号：</div>
            <div class="row-text">
              <el-input :disabled="disable"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <div class="row">
            <div class="row-title">性别</div>
            <div class="row-text"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="row">
            <div class="row-title">出生年月</div>
            <div class="row-text"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        imageUrl: '',
        disable:true,
        studentInfo:{},

      }
    },
    created(){
      this.getStudentInfo()
    },
    methods:{
      getStudentInfo:function () {
        let userInfo=localStorage.getItem("userInfo");
        userInfo=JSON.parse(userInfo);
        this.$http.get('/api/loginS',{"sid":userInfo.sid}).then((res)=>{
          if(res.body.success){
            this.studentInfo=res.body.data;
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../sass/studentInfo";
</style>
