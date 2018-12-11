<template>
  <div class="wrap">
    <pra-title title-ch="教师管理" title-en="TEACHER MANAGER"></pra-title>
    <!--搜索部分-->
    <div class="searchWrap">
      <div class="searchWrap-left">
        <el-input v-model="teaNum" placeholder="请输入工号" size="small"></el-input>
        <el-input v-model="teaName" placeholder="请输入姓名" size="small"></el-input>
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

        <el-button type="primary" icon="el-icon-search" class="searchWrap-button" @click="getTeacherList">搜索</el-button>
        <el-button type="primary" class="searchWrap-button" @click="reset">重置</el-button>
      </div>
      <div class="searchWrap-right"></div>
    </div>

    <div class="wrap-center" v-loading="allLoading">
      <el-table :data="teacherList" style="width: 100%" class="wrap-table">
        <el-table-column prop="tea_num" label="工号" width="180"></el-table-column>
        <el-table-column prop="tea_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="tea_sex" label="性别" width="180"></el-table-column>
        <el-table-column prop="tea_nation" label="民族" width="180"></el-table-column>
        <el-table-column prop="tea_birth_date" label="出生年月" width="180"></el-table-column>
        <el-table-column prop="major_name" label="所在专业"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="showTeaInfo(scope.row)" size="small">查看</el-button>
            <el-button type="success" size="small" @click="showEditTeaInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查看,编辑和添加教工信息-->
    <el-dialog :visible.sync="showTeaInfoDialog" :title="isEdit?(isAdd?'添加教工信息':'编辑教工信息'):'查看教工信息'" class="dialog">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row class="dialogRow">
            <div class="dialogRow-left">姓名</div>
            <el-input v-model="teaInfo.tea_name" placeholder="请输入姓名" :disabled="!isEdit"></el-input>
          </el-row>
          <el-row class="dialogRow">
            <div class="dialogRow-left">性别</div>
            <el-select v-model="teaInfo.tea_sex" placeholder="请选择性别" :disabled="!isEdit" class="rowSelect">
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
            <el-input v-model="teaInfo.tea_nation" placeholder="请输入民族" :disabled="!isEdit"></el-input>
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
            <img v-if="teaInfo.tea_photo" :src="teaInfo.tea_photo" class="avatar">
            <i v-else class="avatar-uploader-icon el-icon-plus"></i>
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">工号</div>
          <el-input v-model="teaInfo.tea_num" placeholder="请输入学号" :disabled="!isEdit"></el-input>
        </el-col>
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">身份证</div>
          <el-input v-model="teaInfo.tea_identity_card" placeholder="请输入身份证" :disabled="!isEdit"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">所在学院</div>
          <el-select v-model="teaInfo.col_name" placeholder="请选择学院" @change="teaCollegeChange" :disabled="!isEdit" class="rowSelect">
            <el-option
                v-for="item in tea_collegeList"
                :key="item.col_id"
                :label="item.col_name"
                :value="item.col_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="dialogRow">
          <div class="dialogRow-left">出生年月</div>
          <el-date-picker
              v-model="teaInfo.tea_birth_date"
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
          <el-select v-model="teaInfo.major_name" placeholder="请选择专业" @change="teaMajorChange" :disabled="!isEdit" class="rowSelect">
            <el-option
                v-for="item in tea_majorList"
                :key="item.major_id"
                :label="item.major_name"
                :value="item.major_id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" :hidden="!isEdit">
        <el-button @click="showTeaInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="editTeaInfo" v-show="!isAdd">编 辑</el-button>
        <el-button type="primary" @click="addTeaInfo" v-show="isAdd">添 加</el-button>
      </span>
    </el-dialog>
    <div class="footerWrap">
      <div class="footerWrap-left">
        <el-button type="primary" @click="showAddTeaInfo" size="small">添加</el-button>
      </div>
      <el-pagination @size-change="getTeacherList" @current-change="getTeacherList" :current-page="currentPage"
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
        teacherList:[],
        pageSize:10,
        currentPage:1,
        total:0,
        teaNum:"",
        teaName:"",
        collegeIndex:"",
        collegeList:[], //搜索框中的查询列表
        majorIndex:"",
        majorList:[],
        teaInfo:{}, //单个教工信息
        isEdit:false, //标记是查看信息还是编辑信息
        isAdd:false,
        showTeaInfoDialog:false,
        tea_collegeList:[], //教工信息框中的学院列表
        tea_majorList:[],
        allLoading:false,
      }
    },
    created(){
      this.getTeacherList();
      this.getCollege(1);
    },
    methods:{
      //获取教工列表
      getTeacherList:function () {
        let root=this;
        let para={
          "page":root.currentPage,
          "pageSize":root.pageSize,
          "teaNum":root.teaNum,
          "teaName":root.teaName,
          "college_id":root.collegeIndex,
          "major_id":root.majorIndex,
        }
        root.allLoading=true;
        this.Http.get("teaList",para).then((res)=>{
          root.allLoading=false;
          if(res.data.success){
            let data=res.data.data;
            for(let i=0;i<data.length;i++){
              if(data[i].tea_sex==0){
                data[i].tea_sex="男";
              }else{
                data[i].tea_sex="女";
              }
            }
            root.teacherList=data;
            root.total=res.data.count;
          }
        })
      },
      //获取学院  type=1代表查找模块的，type=2代表教工信息模块的，clear代表是否要清空
      getCollege:function (type,clear) {
        let root=this;
        this.Http.get('college').then((res)=>{
          if(res.data.success){
            if(type==1){
              root.collegeIndex="";
              root.collegeList=res.data.data;
            }else{
              if(clear!=0){
                root.teaInfo.col_id="";
                root.teaInfo.col_name="";
              }
              root.tea_collegeList=res.data.data;
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
                root.teaInfo.major_id="";
                root.teaInfo.major_name="";
              }
              root.tea_majorList=res.data.data;
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
      },
      //获取专业
      majorChange:function (value) {
      },
      //教工信息部分
      teaCollegeChange:function (value) {
        this.teaInfo.col_id=value;
        this.getMajor(2,value)
      },
      teaMajorChange:function (value) {
        this.teaInfo.major_id=value;
      },
      //重置
      reset:function () {
        this.pageSize=10;
        this.currentPage=1;
        this.total=0;
        this.teaNum="";
        this.teaName="";
        this.collegeIndex="";
        this.collegeList=[];
        this.majorIndex="";
        this.majorList=[];
        this.getTeacherList();
        this.getCollege(1);
      },
      //显示教工信息
      showTeaInfo:function (option) {
        this.showTeaInfoDialog=true;
        this.teaInfo=option;
        this.isEdit=false;
      },
      //显示编辑教工信息
      showEditTeaInfo:function (option) {
        this.showTeaInfoDialog=true;
        if(option.tea_sex=='男'){
          option.tea_sex=0;
        }else{
          option.tea_sex=1;
        }
        this.teaInfo=option;
        this.isEdit=true;
        this.isAdd=false;
        this.getCollege(2,0);
        this.getMajor(2,option.col_id,0);
      },
      //显示添加教工信息
      showAddTeaInfo:function () {
        this.showTeaInfoDialog=true;
        this.isEdit=true;
        this.isAdd=true;
        this.teaInfo={
          tea_num:"",
          tea_name:"",
          tea_sex:0,
          tea_nation:"",
          tea_identity_card:"",
          tea_birth_date:"",
          tea_photo:"",
          col_id:"",
          major_id:"",
          col_name:"",
          major_name:"",
        }
        this.tea_collegeList=[]; //教工信息框中的学院列表
        this.tea_majorList=[];
        this.getCollege(2,0);
      },
      //需要上传的教工信息
      getData:function () {
        let teaInfo=this.teaInfo;
        return {
          tea_id:teaInfo.tea_id,
          tea_num:teaInfo.tea_num,
          tea_name:teaInfo.tea_name,
          tea_sex:teaInfo.tea_sex,
          tea_nation:teaInfo.tea_nation,
          tea_identity_card:teaInfo.tea_identity_card,
          tea_birth_date:teaInfo.tea_birth_date,
          tea_photo:teaInfo.tea_photo,
          major_id:teaInfo.major_id,
        }
      },
      //编辑
      editTeaInfo:function () {
        let root=this;
        let para=root.getData()
        this.Http.put('teaInfo',para).then((res)=>{
          if(res.data.success){
            root.showTeaInfoDialog=false;
            root.getTeacherList();
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
      addTeaInfo:function () {
        let root=this;
        let para=root.getData()
        this.Http.post('teaInfo',para).then((res)=>{
          if(res.data.success){
            root.showTeaInfoDialog=false;
            root.getTeacherList()
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
  @import "../sass/manageTeacher";
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
