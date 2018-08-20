<template>
  <div class="wrap">
    <div class="wrapCenter">
      <div class="wrapCenter-left">
        <div class="view">
          <div class="view-left">姓名：</div>
          <div class="view-right">{{studentInfo.sname}}</div>
        </div>
        <div class="view">
          <div class="view-left">性别：</div>
          <div class="view-right">{{studentInfo.ssex==0?"男":"女"}}</div>
        </div>
        <div class="view">
          <div class="view-left">名族：</div>
          <div class="view-right">{{studentInfo.snation}}</div>
        </div>
        <div class="view">
          <div class="view-left">出生年月：</div>
          <div class="view-right">{{studentInfo.sbirthday}}</div>
        </div>
        <div class="view">
          <div class="view-left">学号：</div>
          <div class="view-right">{{studentInfo.snum}}</div>
        </div>
        <div class="view">
          <div class="view-left">身份证号：</div>
          <div class="view-right">{{studentInfo.sidentityId}}</div>
        </div>
      </div>
      <div class="wrapCenter-right">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
      </div>
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
        console.log(userInfo,"userInfo")
        this.$http.get('/api/loginS',{params: {"sid":userInfo.sid}}).then((res)=>{
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
<style lang="scss" scoped>
  @import "../sass/studentInfo";
</style>
