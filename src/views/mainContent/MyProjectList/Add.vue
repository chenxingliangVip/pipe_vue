<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form fu">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" label="设计号：">
          <el-input clearable class="input_right" placeholder="请输入设计号" v-model="addForm.programCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" label="项目名称：">
          <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.programName" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="programId" label="项目号：">
          <el-input clearable class="input_right" placeholder="请输入项目号" v-model="addForm.programId"></el-input>
          <!-- <el-select clearable v-model="addForm.programId" placeholder="请选择项目号">
            <el-option :label="item" :value="item" v-for="(item,index) in programIds" :key="index"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="Search_Top_Input">
      <div class="search_list" style="width: 100% !important">
        <div class="input_flex">
          <el-input clearable v-model="searchdata" placeholder="客户名称"></el-input>
        </div>
        <div class="input_flex search">
          <span class="zll-search">搜索</span>
        </div>
      </div>
    </div>
    <!-- table -->
    <sys-table :isMultipleSelection="false"
               :tableData="tableData"
               :tableLoading="tableLoading"
               :tableHeader="tableHeader"
               :isOperate="false"
    >
    </sys-table>
  </div>
</template>
<script>
  export default {
    props: ['authProgramData'],
    data() {
      return {
        searchdata: '',
        addForm: {
          programId: '',
          custom: '',
          designer:"",
          programCode:"",
        },
        programIds:[],
        rules: {
          programId: [
            {required: true, message: '请输入项目号', trigger: 'blur'},
          ],
        },
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
      }
    },
    methods: {
      getPIds(){
         return this.addForm
      },
      getProgramId(){
        let self = this;
        self.$http({
          url: "/pipe/program/queryPipeProgramIds",
          method: "post",
        }).then(resp => {
          if (resp.success) {
             self.programIds = resp.result;
          }
        });
      },
      getList() {
        let self = this;
        self.tableLoading = true;
        setTimeout(() => {
            self.tableLoading = false;
            this.tableHeader = [
              {"columnValue": "programId", "columnName": "项目号"},
              {"columnValue": "programName", "columnName": "项目名称",},
              {"columnValue": "programCode", "columnName": "设计号"}
            ]
        }, 500)
      },
    },
    mounted() {
        this.getProgramId();
        this.getList()
    },
    watch:{
      authProgramData(val){
        this.addForm = val;
        console.log(this.addForm)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";
  .zll-form.fu {
    width: calc(100% - 50px);
  }
  .fu .formList {
      margin-top: 3px !important;
  }
  .float_add {
    position: absolute;
    right: -45px;
    padding: 0px 15px;
    font-size: 12px;
    line-height: 24px;
    top: 0px;
  }
</style>
