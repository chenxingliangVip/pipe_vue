<template>
  <div class="User">
    <h1 class="header_h1">我的项目</h1>
    <div class="Search_Top_Input">
      <div class="search_list" style="width: calc(100% - 100px) !important">
        <div class="input_flex">
          <el-input clearable v-model="searchForm.custom" placeholder="客户名称"></el-input>
        </div>
        <div class="input_flex">
          <el-input clearable v-model="searchForm.programName" placeholder="项目名称"></el-input>
        </div>
        <div class="input_flex">
          <el-input clearable v-model="searchForm.programId" placeholder="项目号"></el-input>
        </div>
        <div class="input_flex">
          <el-input clearable v-model="searchForm.programCode" placeholder="设计号"></el-input>
        </div>
        <div class="input_flex search">
          <span class="zll-search" @click="getList()">搜索</span>
          <span class="zll-search-reset" @click="searchReset()">重置</span>
        </div>
      </div>
      <div class="addNew" style="width: 100px !important">
        <span @click="addProject()"><i class="el-icon-circle-plus-outline"></i> 赋项目号</span>
      </div>
    </div>
    <!-- table -->
    <sys-table :isMultipleSelection="true"
               :tableData="tableData"
               :tableLoading="tableLoading"
               :tableHeader="tableHeader"
               :scopeWidth="180"
               @getSelection="getSelection"
    >
      <template slot-scope="scope" slot="operate">
        <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="copyPro(scope.row)" type="text" size="small" >复制
        </el-button>
        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除
        </el-button>
        <el-button @click="Impower(scope.row)" type="text" size="small" >授权</el-button>
      </template>
    </sys-table>

    <!-- 赋项目号弹框 -->
    <div class="zll-dialog">
      <popout title="赋项目号" :visible.sync="addDialog" v-show="addDialog" class="fu_project">
        <Add ref="addPid" slot="content" :authProgramData="authProgramData"></Add>
        <template slot="bottom">
          <p class="zll-botton" @click="authProgramId"> 确 定 </p>
        </template>
      </popout>
    </div>
    <!-- 复制弹框 -->
    <div class="zll-dialog">
      <popout title="项目复制" :visible.sync="copyDialog" v-show="copyDialog" class="minSize_copy">
        <copy ref="copy" slot="content" :copyData="copyData"></copy>
        <template slot="bottom">
          <p class="zll-botton" @click="copyProgram"> 复 制 </p>
        </template>
      </popout>
    </div>
    <!-- 授权弹框 -->
    <div class="zll-dialog">
      <popout title="项目授权" :visible.sync="impowerDialog" v-show="impowerDialog">
        <Impower ref="Impower" :authData="authData" slot="content"></Impower>
        <template slot="bottom">
          <p class="zll-botton" @click="saveImpower"> 确定 </p>
        </template>
      </popout>
    </div>
  </div>
</template>

<script>
  import Add from "./Add";
  import copy from "./copy";
  import Impower from "./Impower";
  import {getToken} from "@/utils/auth"; // 验权
  export default {
    data() {
      return {
        copyData:{},
        authData:{},
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
        addDialog: false, //弹框
        copyDialog: false, //复制弹框
        impowerDialog: false, //授权弹框
        searchForm:{custom:"",programId:"",programCode:"",programName:"",userId:""},
        selectList: [],
        authProgramData:{}
      };
    },
    methods: {
      authProgram(data){
        let self = this;
        self.$http({
          url: "/pipe/program/updatePipeProgram",
          method: "post",
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: "application/json",
        }).then(resp => {
          if (resp.success) {
            self.$message.success("授权成功！");
            self.getList()
            self.impowerDialog = false;
          }else{
            self.$message.success("授权失败，请刷新页面授权！")
          }
        });
      },
      deleteProgram(row){
        let self = this;
        self.$http({
          url: "/pipe/program/deletePipeProgram",
          method: "post",
          params: {id: row.id}
        }).then(resp => {
          if (resp.success) {
            self.$message.success("已删除");
            self.getList()
          }else{
            self.$message.success("删除失败，请刷新页面删除！")
          }
        });
      },
      getList() {
        let self = this;
        let user = JSON.parse(getToken());
        let id = user.id;
        self.searchForm.userId = id;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/program/queryPipeProgramList",
          method: "post",
          params: self.searchForm
        }).then(resp => {
          if (resp.success) {
            self.tableLoading = false;
            self.tableData = resp.result;
            for (let data of self.tableData) {
              if(data.programAuths.length > 0){
                data.author = "已授权";
              }else{
                data.author = "未授权";
              }
            }
            this.tableHeader = [
              {"columnValue": "programId", "columnName": "项目号", width: 150},
              {"columnValue": "programName", "columnName": "项目名称",},
              {"columnValue": "programCode", "columnName": "设计号", width: 150},
              {"columnValue": "designer", "columnName": "设计人", width: 150},
              {"columnValue": "custom", "columnName": "客户名称", width: 150},
              {"columnValue": "author", "columnName": "授权状态", width: 150}]
          }
        });

      },
      addProject() {
        if (this.selectList.length == 1) {
          let data = this.selectList[0];
          if(data.programId){
            this.$message.warning("项目号已存在！");
            return;
          }
          this.authProgramData = Object.assign({},data);
          this.addDialog = true
        } else {
          this.$message.warning("请选择一列数据！");
        }
      },
      authProgramId(){
        let self = this;
        let auth = this.$refs.addPid.getPIds();
        let param= {id:auth.id,programId:auth.programId};
        self.$http({
          url: "/pipe/program/updatePipeProgramId",
          method: "post",
          params: param,
        }).then(resp => {
          if (!resp.success) {
            self.$message.error("赋予项目号失败！请检查项目号是否已经存在");
          } else {
            self.$message.success('赋予项目号成功!');
            self.getList();
            self.addDialog = false;
          }
        });
      },
      copyPro(val) {//复制
        this.copyData = Object.assign({},val);
        this.copyDialog = true
      },
      copyProgram(){
        let self = this;
        let copy  =self.$refs.copy.getCopyData();
        console.log(copy);
        let updateData = [];
        for(let _d of copy){
          if(_d.custom.trim()&&_d.programName&&_d.programCode.trim()){
            updateData.push(_d);
          }
        }
        if(updateData.length == 0){
          this.$message.warning("请补充信息！");
          return;
        }
        self.$http({
          url: "/pipe/program/updateCopyPipeProgram",
          method: "post",
          data: JSON.stringify(updateData),
          dataType: 'json',
          contentType: "application/json",
        }).then(resp => {
          if (resp.success) {
            self.$message.success("复制成功！");
            self.copyDialog = false;
          }else{
            self.$message.success("复制失败，请刷新页面复制！")
          }
        });
      },
      Impower(val) {//授权
        this.authData = Object.assign({},val);
        this.impowerDialog = true
      },
      saveImpower(){
        let self = this;
        let improveData =self.$refs.Impower.getTableData();
        let tableData = improveData.tableData;
        let saveData = {id:"",programAuths:[]};
        saveData.id = improveData.programId;
        let userIds = [];
        for(let data of tableData){
          let _d = {userId:"",programDay:""};
          if(!data.userId){
            this.$message.error("请选择授权用户！");
            return;
          }
          if(!data.programDay){
            this.$message.error("请选择授权天数！");
            return;
          }
          if(userIds.indexOf(data.userId) > -1){
            this.$message.error("授权用户重复！");
            return;
          }
          _d.userId = data.userId;
          _d.programDay = data.programDay;
          saveData.programAuths.push(_d);
          userIds.push(data.userId);
        }
        self.authProgram(saveData);
      },
      goDetail(val) { //查看
        let type = "see";
        let createUser = val.createUser;
        let user = JSON.parse(getToken());
        if(user.id == createUser){
          type = "all";
        }
        // if(user.id == userId){
        //   type = "save";
        // }
        let name = "DesignPage";
        this.$router.push({ name ,query: {type: type,id:val.id }});
      },
      getFormData(data) {
        this.addDialog = false;
      },
      getSelection(val) {
        this.selectList = val;
      },
      deleteRow(row) {//删除
        let self = this;
        let programAuths = row.programAuths;
        if(programAuths && programAuths.length > 0){
          this.$message.error("项目授权中，无法删除");
          return;
        }
        this.$confirm('确定删除？', '提示', {
          distinguishCancelAndClose: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          self.deleteProgram(row);
        }).catch(() => {
          self.$message.info("已取消")
        });
      },
      searchReset() {
        this.searchForm = {custom:"",programId:"",programCode:"",programName:""};
        this.getList();
      },
    },
    mounted() {
      this.getList(); //显示table
    },
    components: {
      Add,
      copy,
      Impower,
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/style/SearchTop.scss";
</style>
