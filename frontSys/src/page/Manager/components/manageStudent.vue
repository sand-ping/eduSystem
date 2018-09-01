<template>
  <div class="wrap">
    <div class="wrap-center">
      <el-table :data="studentList" style="width: 100%" class="wrap-table">
        <el-table-column prop="snum" label="学号" width="180"></el-table-column>
        <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
        <el-table-column prop="ssex" label="性别"></el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
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
    }
  },
  created(){
    this.getStudentList();
  },
  methods:{
    getStudentList:function () {
      let root=this;
      this.$http.get("/api/getStudentList",{"page":root.currentPage,"pageSize":root.pageSize}).then((res)=>{
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

<style lang="scss" scoped>
  @import "../sass/manageStudent";
</style>
<style>
  /*修改组件内部样式不可以使用scoped*/
  .wrap-table .cell{
    text-align: center !important;
  }
</style>
