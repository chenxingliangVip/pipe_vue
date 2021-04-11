<template>
  <div class="User">
    <h1 class="header_h1">部门项目</h1>
    <!-- table -->
    <sys-table
      :isMultipleSelection="false"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :tableHeader="tableHeader"
      :scopeWidth="150"
    >
      <template slot-scope="scope" slot="operate">
        <el-button @click="getPower(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </sys-table>

    <!-- 查看弹框 -->
    <div class="zll-dialog">
      <popout title="查看项目" :visible.sync="addDialog" v-if="addDialog" class="minSize">
        <Add ref="add" slot="content"></Add>
        <template slot="bottom">
          <p class="zll-botton cancal" @click="addDialog = false">取 消</p>
        </template>
      </popout>
    </div>
  </div>
</template>

<script>
  import Add from './Add'
  import {getToken} from '@/utils/auth' // 验权
  export default {
    data() {
      return {
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
        addDialog: false, //弹框
      }
    },
    methods: {
      getList() {
        let self = this;
        let user = JSON.parse(getToken());
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
      getPower(val) { //立即授权
        let type = "see";
        let createUser = val.createUser;
        let programAuths = val.programAuths;
        let user = JSON.parse(getToken());
        if(user.id == createUser){
          type = "all";
        }else if(programAuths.length >0 ){
            for(let auth of programAuths ){
              if(auth.userId == user.id ){
                type = "save";
              }
            }
        }
        let name = "DesignPage";
        this.$router.push({ name ,query: {type: type,id:val.id }});
      },
      getFormData(data) {
        this.addDialog = false
      },
    },
    mounted() {
      this.getList();//显示table
    },
    components: {
      Add,
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/SearchTop.scss";

  .User {
    .leadOut {
      background: #e69c2d;
      color: #ffffff;
      position: relative;
      padding: 10px 10px 10px 20px;

      img {
        position: absolute;
        left: 7px;
      }

      &:hover {
        opacity: .8;
        transition: all .3s;
      }
    }
  }

</style>
