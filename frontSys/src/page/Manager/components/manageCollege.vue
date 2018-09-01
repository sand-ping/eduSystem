<template>
  <div class="wrap">
    <div class="wrap-center">
      <el-table :data="studentList" style="width: 100%" class="wrap-table">
        <el-table-column prop="snum" label="学院编号" width="180"></el-table-column>
        <el-table-column prop="sname" label="学院" width="180"></el-table-column>
        <el-table-column prop="ssex" label="院长"></el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="footer-left">
        <el-button type="primary" class="footer-left-view">添加</el-button>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

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
      }
    },
    created(){
      this.getStudentList();
    },
    methods:{
      getStudentList:function () {
        let root=this;
        this.$http.get("/api/manager_college",{"page":root.currentPage,"pageSize":root.pageSize}).then((res)=>{
          if(res.data.success){
            root.studentList=res.data.data.data;
            root.total=res.data.data.count;
          }
        })
      },
      handleCurrentChange:function () {

      },
      handleSizeChange:function () {

      }
    }
  }
</script>
<style lang="scss">
  @import "../sass/manageCollege";
</style>
<style>
  /*修改组件内部样式不可以使用scoped*/
  .wrap-table .cell{
    text-align: center !important;
  }
</style>
