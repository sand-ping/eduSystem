<template>
  <div class="wrap">
    <pra-title title-ch="学生管理" title-en="STUDENT MANAGER"></pra-title>
    <!--搜索部分-->
    <div class="searchWrap">
      <div class="searchWrap-left">
        <el-input v-model="stuNum" placeholder="请输入学号" size="small"></el-input>
        <el-input v-model="stuName" placeholder="请输入姓名" size="small"></el-input>
        <el-select v-model="collegeIndex" placeholder="请选择学院" size="small" @change="collegeChange">
          <el-option
              v-for="item in collegeList"
              :key="item.col_id"
              :label="item.col_name"
              :value="item.col_id">
          </el-option>
        </el-select>
        <el-select v-model="majorIndex" placeholder="请选择专业" size="small" @change="majorChange">
          <el-option
              v-for="item in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id">
          </el-option>
        </el-select>
        <el-select v-model="classIndex" placeholder="请选择班级" size="small" @change="classChange">
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

    <div class="wrap-center" v-loading="allLoading">
      <el-table :data="studentList" style="width: 100%" class="wrap-table">
        <el-table-column prop="stu_num" label="学号" max-width="180"></el-table-column>
        <el-table-column prop="stu_name" label="姓名" max-width="180"></el-table-column>
        <el-table-column prop="stu_sex" label="性别" max-width="180"></el-table-column>
        <el-table-column prop="stu_nation" label="民族" max-width="180"></el-table-column>
        <el-table-column prop="stu_birth_date" label="出生年月" max-width="180"></el-table-column>
        <el-table-column prop="major_name" label="所在专业"></el-table-column>
        <el-table-column prop="s_class_name" label="所在班级" max-width="180"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="showStuInfo(scope.row)" size="small">查看</el-button>
            <el-button type="success" size="small" @click="showEditStuInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查看,编辑和添加学生信息-->
    <el-dialog :visible.sync="showStuInfoDialog" :title="isEdit?(isAdd?'添加学生信息':'编辑学生信息'):'查看学生信息'" class="dialog">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row class="dialogRow">
            <div class="dialogRow-left">姓名</div>
            <el-input v-model="stuInfo.stu_name" placeholder="请输入姓名" :disabled="!isEdit"></el-input>
          </el-row>
          <el-row class="dialogRow">
            <div class="dialogRow-left">性别</div>
            <el-select v-model="stuInfo.stu_sex" placeholder="请选择性别" :disabled="!isEdit" class="rowSelect">
              <el-option
                  v-for="(item,index) in ['男','女']"
                  :key="index"
                  :label="item"
                  :value="index">
              </el-option>
            </el-select>
          </el-row>
          <el-row class="dialogRow">
            <div class="dialogRow-left">民族</div>
            <el-input v-model="stuInfo.stu_nation" placeholder="请输入民族" :disabled="!isEdit"></el-input>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :disabled="!isEdit">
            <img v-if="stuInfo.stu_photo" :src="stuInfo.stu_photo" class="avatar">
            <i v-else class="avatar-uploader-icon el-icon-plus"></i>
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">学号</div>
          <el-input v-model="stuInfo.stu_num" placeholder="请输入学号" :disabled="!isEdit"></el-input>
        </el-col>
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">身份证</div>
          <el-input v-model="stuInfo.stu_identity_card" placeholder="请输入身份证" :disabled="!isEdit"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">所在学院</div>
          <el-select v-model="stuInfo.col_name" placeholder="请选择学院" @change="stuCollegeChange" :disabled="!isEdit" class="rowSelect">
            <el-option
                v-for="item in stu_collegeList"
                :key="item.col_id"
                :label="item.col_name"
                :value="item.col_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">出生年月</div>
          <el-date-picker
              v-model="stuInfo.stu_birth_date"
              type="date"
              placeholder="请选择出生年月"
              :disabled="!isEdit"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              class="rowPicker">
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">所在专业</div>
          <el-select v-model="stuInfo.major_name" placeholder="请选择专业" @change="stuMajorChange" :disabled="!isEdit" class="rowSelect">
            <el-option
                v-for="item in stu_majorList"
                :key="item.major_id"
                :label="item.major_name"
                :value="item.major_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">所在班级</div>
          <el-select v-model="stuInfo.s_class_name" placeholder="请选择班级" @change="stuClassChange" :disabled="!isEdit" class="rowSelect">
            <el-option
                v-for="item in stu_classList"
                :key="item.s_class_id"
                :label="item.s_class_name"
                :value="item.s_class_id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" :hidden="!isEdit">
        <el-button @click="showStuInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="editStuInfo" v-show="!isAdd">编 辑</el-button>
        <el-button type="primary" @click="addStuInfo" v-show="isAdd">添 加</el-button>
      </span>
    </el-dialog>
    <div class="footerWrap">
      <div class="footerWrap-left">
        <el-button type="primary" @click="showAddStuInfo" size="small">添加</el-button>
      </div>
      <el-pagination @size-change="getStudentList" @current-change="getStudentList" :current-page="currentPage"
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
      studentList:[],
      pageSize:10,
      currentPage:1,
      total:0,
      stuNum:"",
      stuName:"",
      collegeIndex:"",
      collegeList:[], //搜索框中的查询列表
      majorIndex:"",
      majorList:[],
      classIndex:"",
      classList:[],
      stuInfo:{}, //单个学生信息
      isEdit:false, //标记是查看信息还是编辑信息
      isAdd:false,
      showStuInfoDialog:false,
      stu_collegeList:[], //学生信息框中的学院列表
      stu_majorList:[],
      stu_classList:[],
      allLoading:false,
    }
  },
  created(){
    this.getStudentList();
    this.getCollege(1);
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
      root.allLoading=true;
      this.Http.get("stuList",para).then((res)=>{
        root.allLoading=false;
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
    //获取学院  type=1代表查找模块的，type=2代表学生信息模块的，clear代表是否要清空
    getCollege:function (type,clear) {
      let root=this;
      this.Http.get('college').then((res)=>{
        if(res.data.success){
          if(type==1){
            root.collegeIndex="";
            root.collegeList=res.data.data;
          }else{
            if(clear!=0){
              root.stuInfo.col_id="";
              root.stuInfo.col_name="";
            }
            root.stu_collegeList=res.data.data;
          }
        }else{
          this.$message({
            title: '警告',
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    //获取专业
    getMajor:function (type,option,clear) {
      let root=this;
      this.Http.get('major',{"col_id":option}).then((res)=>{
        if(res.data.success){
          if(type==1){
            root.majorIndex="";
            root.majorList=res.data.data;
          }else{
            if(clear!=0){
              root.stuInfo.major_id="";
              root.stuInfo.major_name="";
            }
            root.stu_majorList=res.data.data;
          }
        }else{
          this.$message({
            title: '警告',
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    //获取班级
    getClass:function (type,option,clear) {
      let root=this;
      this.Http.get('sClass',{"major_id":option}).then((res)=>{
        if(res.data.success){
          if(type==1){
            root.classIndex="";
            root.classList=res.data.data;
          }else{
            if(clear!=0){
              root.stuInfo.s_class_id="";
              root.stuInfo.s_class_name="";
            }
            root.stu_classList=res.data.data;
          }
        }else{
          this.$message({
            title: '警告',
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    //学院下拉改变触发事件
    collegeChange:function (value) {
      this.getMajor(1,value);
      this.classIndex="";
      this.classList=[];
    },
    //获取专业
    majorChange:function (value) {
      this.getClass(1,value);
    },
    classChange:function (value) {
    },
    //学生信息部分
    stuCollegeChange:function (value) {
      this.stuInfo.col_id=value;
      this.getMajor(2,value)
      this.stuInfo.s_class_id="";
      this.stuInfo.s_class_name="";
      this.stu_classList=[];
    },
    stuMajorChange:function (value) {
      this.stuInfo.major_id=value;
      this.getClass(2,value)
    },
    stuClassChange:function (value) {
      this.stuInfo.s_class_id=value;
    },
    //重置
    reset:function () {
      this.pageSize=10;
      this.currentPage=1;
      this.total=0;
      this.stuNum="";
      this.stuName="";
      this.collegeIndex="";
      this.collegeList=[];
      this.majorIndex="";
      this.majorList=[];
      this.classIndex="";
      this.classList=[];
      this.getStudentList();
      this.getCollege(1);
    },
    //显示学生信息
    showStuInfo:function (option) {
      this.showStuInfoDialog=true;
      this.stuInfo=option;
      this.isEdit=false;
    },
    //显示编辑学生信息
    showEditStuInfo:function (option) {
      this.showStuInfoDialog=true;
      if(option.stu_sex=='男'){
        option.stu_sex=0;
      }else{
        option.stu_sex=1;
      }
      this.stuInfo = JSON.parse(JSON.stringify(option));
      this.isEdit=true;
      this.isAdd=false;
      this.getCollege(2,0);
      this.getMajor(2,option.col_id,0);
      this.getClass(2,option.major_id,0);
    },
    //显示添加学生信息
    showAddStuInfo:function () {
      this.showStuInfoDialog=true;
      this.isEdit=true;
      this.isAdd=true;
      this.stuInfo={
        stu_num:"",
        stu_name:"",
        stu_sex:0,
        stu_nation:"",
        stu_identity_card:"",
        stu_birth_date:"",
        stu_photo:"",
        s_class_id:"",
        col_id:"",
        major_id:"",
        s_class_name:"",
        col_name:"",
        major_name:"",
      }
      this.stu_collegeList=[]; //学生信息框中的学院列表
      this.stu_majorList=[];
      this.stu_classList=[];
      this.getCollege(2,0);
    },
    //需要上传的学生信息
    getData:function () {
      let stuInfo=this.stuInfo;
      return {
        stu_id:stuInfo.stu_id,
        stu_num:stuInfo.stu_num,
        stu_name:stuInfo.stu_name,
        stu_sex:stuInfo.stu_sex,
        stu_nation:stuInfo.stu_nation,
        stu_identity_card:stuInfo.stu_identity_card,
        stu_birth_date:stuInfo.stu_birth_date,
        stu_photo:stuInfo.stu_photo,
        s_class_id:stuInfo.s_class_id,
      }
    },
    //编辑
    editStuInfo:function () {
      let root=this;
      let para=root.getData()
      this.Http.put('stuInfo',para).then((res)=>{
        if(res.data.success){
          root.showStuInfoDialog=false;
          root.getStudentList();
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
    addStuInfo:function () {
      let root=this;
      let para=root.getData()
      this.Http.post('stuInfo',para).then((res)=>{
        if(res.data.success){
          root.showStuInfoDialog=false;
          root.getStudentList()
          this.$message({
            title: '提示',
            message: '添加成功',
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
  @import "../sass/manageStudent";
</style>
<style lang="scss">
  /*修改组件内部样式不可以使用scoped*/
  .wrap-table .cell{
    text-align: center !important;
  }
</style>
<style lang="scss">
  .avatar-uploader{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 154px;
    height: 154px;
    line-height: 154px;
    text-align: center;
  }
  .avatar {
    width: 154px;
    height: 154px;
    display: block;
  }
</style>
