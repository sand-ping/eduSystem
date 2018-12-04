<template>
  <div class="wrap">
    <pra-title title-ch="学生管理" title-en="STUDENT MANAGER"></pra-title>
    <div class="searchWrap">
      <div class="searchWrap-left">
        <el-input v-model="stuNum" placeholder="请输入学号" size="small"></el-input>
        <el-input v-model="stuName" placeholder="请输入姓名" size="small"></el-input>
        <el-select v-model="collegeName" placeholder="请选择学院" size="small" @change="collegeChange">
          <el-option
              v-for="item in collegeList"
              :key="item.col_id"
              :label="item.col_name"
              :value="item.col_id">
          </el-option>
        </el-select>
        <el-select v-model="majorName" placeholder="请选择专业" size="small" @change="majorChange">
          <el-option
              v-for="item in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id">
          </el-option>
        </el-select>
        <el-select v-model="className" placeholder="请选择班级" size="small" @change="classChange">
          <el-option
              v-for="item in classList"
              :key="item.s_class_id"
              :label="item.s_class_name"
              :value="item.s_class_id">
          </el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search" class="searchWrap-button" @click="getStudentList">搜索</el-button>
        <el-button type="primary" class="searchWrap-button" @click="reset">重置</el-button>
      </div>
      <div class="searchWrap-right"></div>
    </div>
    <div class="wrap-center">
      <el-table :data="studentList" style="width: 100%" class="wrap-table">
        <el-table-column prop="stu_num" label="学号" width="180"></el-table-column>
        <el-table-column prop="stu_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="stu_sex" label="性别"></el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="searchStuInfo(scope.row)" size="small">查看</el-button>
            <el-button type="success" size="small" @click="editStuInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="getStudentList" @current-change="getStudentList" :current-page="currentPage"
      :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default{
  data(){
    return{
      studentList:[],
      pageSize:10,
      currentPage:1,
      total:0,
      stuNum:"",
      stuName:"",
      collegeIndex:"",
      collegeName:"",
      collegeList:[],
      majorIndex:"",
      majorName:"",
      majorList:[],
      classIndex:"",
      className:"",
      classList:[],
    }
  },
  created(){
    this.getStudentList();
    this.getCollege();
  },
  methods:{
    //获取学生列表
    getStudentList:function () {
      let root=this;
      let para={
        "page":root.currentPage,
        "pageSize":root.pageSize,
        "stuNum":root.stuNum,
        "stuName":root.stuName,
        "college_id":root.collegeIndex,
        "major_id":root.majorIndex,
        "class_id":root.classIndex,

      }
      this.Http.get("stuList",para).then((res)=>{
        if(res.data.success){
          let data=res.data.data;
          for(let i=0;i<data.length;i++){
            if(data[i].stu_sex==0){
              data[i].stu_sex="男";
            }else{
              data[i].stu_sex="女";
            }
          }
          root.studentList=data;
          root.total=res.data.count;
        }
      })
    },
    //获取学院
    getCollege:function () {
      let root=this;
      this.Http.get('college').then((res)=>{
        if(res.data.success){
          root.collegeList=res.data.data;
        }else{
          this.$notify({
            title: '警告',
            message: res.data.message,
            type: 'warning'
          });
        }
      })
    },
    //获取专业
    getMajor:function (option) {
      let root=this;
      this.Http.get('major',{"col_id":option}).then((res)=>{
        if(res.data.success){
          root.majorList=res.data.data;
        }else{
          this.$notify({
            title: '警告',
            message: res.data.message,
            type: 'warning'
          });
        }
      })
    },
    //获取班级
    getClass:function (option) {
      let root=this;
      this.Http.get('sClass',{"major_id":option}).then((res)=>{
        if(res.data.success){
          root.classList=res.data.data;
        }else{
          this.$notify({
            title: '警告',
            message: res.data.message,
            type: 'warning'
          });
        }
      })
    },
    //学院下拉改变触发事件
    collegeChange:function (value) {
      this.collegeIndex=value;
      this.getMajor(value)
    },
    //获取专业
    majorChange:function (value) {
      this.majorIndex=value;
      this.getClass(value)
    },
    classChange:function (value) {
      this.classIndex=value;
      this.classIndex=value;
    },
    //重置
    reset:function () {
      this.pageSize=10;
      this.currentPage=1;
      this.total=0;
      this.stuNum="";
      this.stuName="";
      this.collegeName="";
      this.className="";
      this.classList=[];
      this.getStudentList();
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/manageStudent";
</style>
<style lang="scss">
  /*修改组件内部样式不可以使用scoped*/
  .wrap-table .cell{
    text-align: center !important;
  }
</style>
