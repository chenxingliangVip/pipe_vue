<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form fu">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" label="设计号：">
          <el-input clearable class="input_right" placeholder="" v-model="addForm.programCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" label="项目名称：">
          <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.programName" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="programId" label="项目号：">
          <el-input clearable class="input_right" placeholder="赋值项目号" v-model="addForm.programId" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="Search_Top_Input">
      <div class="search_list" style="width: 100% !important">
        <div class="input_flex">
          <el-input clearable v-model="programId" placeholder="项目号"></el-input>
        </div>
        <div class="input_flex search">
          <span class="zll-search" @click="getProgramId">搜索</span>
        </div>
      </div>
    </div>
    <!-- table -->
    <sys-table :isMultipleSelection="false"
               :tableData="tableData"
               :tableLoading="tableLoading"
               :tableHeader="tableHeader"
               :scopeWidth="100"
    >
      <template slot-scope="scope" slot="operate">
        <el-button @click="copyPro(scope.row)" type="text" size="small" >赋值</el-button>
      </template>
    </sys-table>
  </div>
</template>
<script>
  export default {
    props: ['authProgramData'],
    data() {
      return {
        programId: '',
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
        self.tableLoading = true;
        self.$http({
          url: "/pipe/programId/getAuthProgramIds",
          method: "post",
          params:{programId:self.programId}
        }).then(resp => {
          if (resp.success) {
            self.tableLoading = false;
            self.tableData = resp.result;
            self.tableHeader = [
              {"columnValue": "programId", "columnName": "项目号"},
            ]
          }
        });
      },
      copyPro(val) {
        this.$set(this.addForm,"programId", val.programId);
      }
    },
    mounted() {

    },
    watch:{
      authProgramData(val){
        this.getProgramId();
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
