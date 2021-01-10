<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" prop="programId" label="项目号：">
          <el-input clearable class="input_right" placeholder="请输入项目号" v-model="addForm.programId" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="custom" label="客户名称：">
          <el-input clearable class="input_right" placeholder="请选择客户名称" v-model="addForm.custom" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="programName" label="项目名称：">
          <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.programName" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="programCode" label="设计号：">
          <el-input clearable class="input_right" placeholder="请输入设计号" v-model="addForm.programCode" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="copy_list" v-for="(item, index) in copyList" :key="index">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input clearable class="nav" placeholder="请选择客户名称" v-model="item.custom"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input clearable class="nav" placeholder="请输入项目名称" v-model="item.programName"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input clearable class="nav" placeholder="请输入设计号" v-model="item.programCode"></el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    props:['copyData'],
    data() {
      return {
        addForm: {
          id:"",
          createUser:"",
          programId: '',
          custom: '',
          programName: '',
          programCode: '',
        },
        copyList: [
          {custom: '', programName: '', programCode: '',createUser:""},
          {custom: '', programName: '', programCode: '',createUser:""},
          {custom: '', programName: '', programCode: '',createUser:""},
        ],
        rules: {
        },
      }
    },
    methods: {
        getCopyData(){
          let userId = this.addForm.createUser;
          let id = this.addForm.id;
          for(let data of this.copyList){
            data.createUser = userId;
            data.id = id;
          }
          return this.copyList;
        }
    },
    mounted() {

    },
    watch:{
      copyData(val){
        this.addForm = val;
        this.copyList = [
          {custom: '', programName: '', programCode: '',createUser:""},
          {custom: '', programName: '', programCode: '',createUser:""},
          {custom: '', programName: '', programCode: '',createUser:""},
        ];
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";

  .copy_list {
    margin-bottom: 15px;
  }
</style>
