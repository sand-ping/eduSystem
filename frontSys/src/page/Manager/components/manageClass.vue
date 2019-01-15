<template>
  <div class="wrap">
    <pra-title title-ch="学院管理" title-en="TEACHER MANAGER"></pra-title>
    <!--搜索部分-->
    <div class="searchWrap">
      <div class="searchWrap-left">
        <el-input v-model="keyword" placeholder="请输入学院/专业/班级" size="small"></el-input>
        <el-button type="primary" icon="el-icon-search" class="searchWrap-button" @click="getClassList">搜索</el-button>
        <el-button type="primary" class="searchWrap-button" @click="reset">重置</el-button>
      </div>
      <div class="searchWrap-right"></div>
    </div>

    <div class="wrap-center" v-loading="allLoading">
      <el-table :data="classList" style="width: 100%" class="wrap-table">
        <el-table-column prop="s_class_id" label="班级编号" max-width="180"></el-table-column>
        <el-table-column prop="s_class_name" label="班级" max-width="180"></el-table-column>
        <el-table-column prop="tea_name" label="班主任" max-width="180"></el-table-column>
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
      <el-row class="dialogRow" v-if="!isAdd">
        <div class="dialogRow-left">班级编号：</div>
        <el-input v-model="classInfo.s_class_id" placeholder="请输入专业编号" :disabled="!isAdd"></el-input>
      </el-row>
      <el-row class="dialogRow">
        <div class="dialogRow-left">班级名称：</div>
        <el-input v-model="classInfo.s_class_name" placeholder="请输入专业名称" :disabled="!isEdit"></el-input>
      </el-row>
      <el-row class="dialogRow">
        <div class="dialogRow-left">班主任：</div>
        <el-select v-model="classInfo.tea_name" placeholder="请选择班主任" :disabled="!isEdit" class="rowSelect" @change="TeacherChange">
          <el-option
              v-for="(item,index) in teacherList"
              :key="item.tea_id"
              :label="item.tea_name"
              :value="item.tea_id">
          </el-option>
        </el-select>
      </el-row>
      <el-row class="dialogRow">
        <div class="dialogRow-left">专业名称：</div>
        <el-select v-model="classInfo.major_name" placeholder="请选择专业" :disabled="!isEdit" class="rowSelect" @change="MajorChange">
          <el-option
              v-for="(item,index) in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id">
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
      <el-pagination @size-change="getClassList" @current-change="getClassList" :current-page="currentPage"
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
        teacherList:[],
        classList:[],
        classInfo:{},
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
      this.getClassList();
    },
    methods: {
      //获取班级列表
      getClassList: function () {
        let root = this;
        let para = {
          "page": root.currentPage,
          "pageSize": root.pageSize,
          "keyword": root.keyword,
        }
        root.allLoading = true;
        this.Http.get("sClassList", para).then((res) => {
          root.allLoading = false;
          if (res.data.success) {
            root.classList = res.data.data;
            root.total = res.data.count;
          }
        })
      },
      //获取专业列表
      getMajorList:function () {
        let root=this;
        this.Http.get("major").then((res)=>{
          if(res.data.success){
            let data=res.data.data;
            root.majorList=data;
          }
        })
      },
      //获取教师列表
      getTeacherList:function () {
        let root=this;
        this.Http.get("teaInfo",{"type":1}).then((res)=>{
          if(res.data.success){
            let data=res.data.data;
            console.log(res)
            root.teacherList=data;
          }
        })
      },
      //重置
      reset: function () {
        this.pageSize = 10;
        this.currentPage = 1;
        this.total = 0;
        this.keyword="";
        this.getClassList();
      },
      //显示专业信息
      showColInfo: function (option) {
        this.showColInfoDialog = true;
        this.classInfo = option;
        this.isEdit = false;
      },
      //显示编辑专业信息
      showEditColInfo: function (option) {
        this.showColInfoDialog = true;
        this.classInfo = JSON.parse(JSON.stringify(option));
        this.isEdit = true;
        this.isAdd = false;
        this.getMajorList();
        this.getTeacherList();
      },
      //显示添加专业信息
      showAddColInfo: function () {
        this.showColInfoDialog = true;
        this.isEdit = true;
        this.isAdd = true;
        this.classInfo = {
          "tea_id":"",
          "tea_name":"",
          "major_id":"",
          "major_name":"",
          "s_class_id":"",
          "s_class_name":"",
        }
      },
      //需要上传的专业信息
      getData: function () {
        let classInfo = this.classInfo;
        return {
          s_class_id: classInfo.s_class_id,
          s_class_name: classInfo.s_class_name,
          major_id: classInfo.major_id,
          tea_id: classInfo.tea_id,
        }
      },//编辑
      editColInfo:function () {
        let root=this;
        let para=root.getData()
        this.Http.put('sClass',para).then((res)=>{
          if(res.data.success){
            root.showColInfoDialog=false;
            root.getClassList();
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
        this.Http.post('sClass', para).then((res) => {
          if (res.data.success) {
            root.showColInfoDialog = false;
            root.getClassList()
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
      MajorChange:function (value) {
        this.classInfo.major_id=value;
      },
      TeacherChange:function (value) {
        this.classInfo.tea_id=value;
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

