<template>
  <div class="wrap">
    <pra-title title-ch="学院管理" title-en="TEACHER MANAGER"></pra-title>
    <!--搜索部分-->
    <div class="searchWrap">
      <div class="searchWrap-left">
        <el-input v-model="keyword" placeholder="请输入学院/专业" size="small"></el-input>
        <el-button type="primary" icon="el-icon-search" class="searchWrap-button" @click="getMajorList">搜索</el-button>
        <el-button type="primary" class="searchWrap-button" @click="reset">重置</el-button>
      </div>
      <div class="searchWrap-right"></div>
    </div>

    <div class="wrap-center" v-loading="allLoading">
      <el-table :data="majorList" style="width: 100%" class="wrap-table">
        <el-table-column prop="major_num" label="专业编号" max-width="180"></el-table-column>
        <el-table-column prop="major_name" label="专业" max-width="180"></el-table-column>
        <el-table-column prop="col_name" label="学院" max-width="180"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="showColInfo(scope.row)" size="small">查看</el-button>
            <el-button type="success" size="small" @click="showEditColInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查看,编辑和添加教工信息-->
    <el-dialog :visible.sync="showColInfoDialog" :title="isEdit?(isAdd?'添加专业':'编辑专业'):'查看专业信息'" class="dialog">
      <el-row class="dialogRow">
        <div class="dialogRow-left">专业编号：</div>
        <el-input v-model="majorInfo.major_num" placeholder="请输入专业编号" :disabled="!isAdd"></el-input>
      </el-row>
      <el-row class="dialogRow">
        <div class="dialogRow-left">专业名称：</div>
        <el-input v-model="majorInfo.major_name" placeholder="请输入专业名称" :disabled="!isEdit"></el-input>
      </el-row>
      <el-row class="dialogRow">
        <div class="dialogRow-left">学院名称：</div>
        <el-select v-model="majorInfo.col_name" placeholder="请选择学院" :disabled="!isEdit" class="rowSelect" @change="collegeChange">
          <el-option
              v-for="(item,index) in collegeList"
              :key="item.col_id"
              :label="item.col_name"
              :value="item.col_id">
          </el-option>
        </el-select>
      </el-row>
      <span slot="footer" class="dialog-footer" :hidden="!isEdit">
        <el-button @click="showColInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="editColInfo" v-show="!isAdd">编 辑</el-button>
        <el-button type="primary" @click="addColInfo" v-show="isAdd">添 加</el-button>
      </span>
    </el-dialog>
    <div class="footerWrap">
      <div class="footerWrap-left">
        <el-button type="primary" @click="showAddColInfo" size="small">添加</el-button>
      </div>
      <el-pagination @size-change="getMajorList" @current-change="getMajorList" :current-page="currentPage"
                     :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    components: {ElCol},
    data(){
      return{
        majorList:[],
        collegeList:[],
        majorInfo:{},
        pageSize:10,
        currentPage:1,
        total:0,
        isEdit:false,
        isAdd:false,
        showColInfoDialog:false,
        allLoading:false,
        keyword:"",
      }
    },
    created(){
      this.getMajorList();
    },
    methods: {
      //获取专业列表
      getMajorList: function () {
        let root = this;
        let para = {
          "page": root.currentPage,
          "pageSize": root.pageSize,
          "keyword": root.keyword,
        }
        root.allLoading = true;
        this.Http.get("majorList", para).then((res) => {
          root.allLoading = false;
          if (res.data.success) {
            root.majorList = res.data.data;
            root.total = res.data.count;
          }
        })
      },
      //获取学院列表
      getCollegeList:function () {
        let root=this;
        this.Http.get("college").then((res)=>{
          if(res.data.success){
            let data=res.data.data;
            root.collegeList=data;
          }
        })
      },
      //重置
      reset: function () {
        this.pageSize = 10;
        this.currentPage = 1;
        this.total = 0;
        this.keyword="";
        this.getMajorList();
      },
      //显示专业信息
      showColInfo: function (option) {
        this.showColInfoDialog = true;
        this.majorInfo = option;
        this.isEdit = false;
      },
      //显示编辑专业信息
      showEditColInfo: function (option) {
        this.showColInfoDialog = true;
        this.majorInfo = JSON.parse(JSON.stringify(option));
        this.isEdit = true;
        this.isAdd = false;
        this.getCollegeList();
      },
      //显示添加专业信息
      showAddColInfo: function () {
        this.showColInfoDialog = true;
        this.isEdit = true;
        this.isAdd = true;
        this.majorInfo = {
          "major_num":"",
          "col_id":"",
          "major_id":"",
          "major_name":"",
        }
      },
      //需要上传的专业信息
      getData: function () {
        let majorInfo = this.majorInfo;
        return {
          col_id: majorInfo.col_id,
          major_num: majorInfo.major_num,
          major_name: majorInfo.major_name,
          major_id: majorInfo.major_id,
        }
      },//编辑
      editColInfo:function () {
        let root=this;
        let para=root.getData()
        this.Http.put('major',para).then((res)=>{
          if(res.data.success){
            root.showColInfoDialog=false;
            root.getMajorList();
            this.$message({
              title: '提示',
              message: '修改成功',
              type: 'success'
            });
          }else{
            this.$message({
              title: '警告',
              message: res.data.message,
              type: 'error'
            });
          }
        })
      },
      //添加
      addColInfo: function () {
        let root = this;
        let para = root.getData()
        this.Http.post('major', para).then((res) => {
          if (res.data.success) {
            root.showColInfoDialog = false;
            root.getMajorList()
            this.$message({
              title: '提示',
              message: '添加成功',
              type: 'success'
            });
          } else {
            this.$message({
              title: '警告',
              message: res.data.message,
              type: 'error'
            });
          }
        })
      },
      collegeChange:function (value) {
        this.majorInfo.col_id=value;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/manageMajor";
</style>
<style lang="scss">
  /*修改组件内部样式不可以使用scoped*/
  .wrap-table .cell{
    text-align: center !important;
  }
</style>

