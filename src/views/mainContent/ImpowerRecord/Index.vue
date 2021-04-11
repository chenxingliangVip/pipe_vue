<template>
  <div class="User">
    <h1 class="header_h1">授权记录</h1>
    <div class="Search_Top_Input">
        <div class="search_list" style="width: calc(100%) !important">
            <!--<div class="input_flex">-->
                <!--<el-input clearable v-model="searchInput1" placeholder="客户名称"></el-input>-->
            <!--</div>-->
            <div class="input_flex">
                <el-input clearable v-model="queryForm.programName" placeholder="项目名称"></el-input>
            </div>
            <div class="input_flex">
                <el-input clearable v-model="queryForm.programId" placeholder="项目号"></el-input>
            </div>
            <div class="input_flex">
                <el-input clearable v-model="queryForm.programCode" placeholder="设计号"></el-input>
            </div>
            <div class="input_flex">
                <el-input clearable v-model="queryForm.name" placeholder="被授权人"></el-input>
            </div>
            <div class="input_flex search">
                <span class="zll-search" @click="getList">搜索</span>
                <!--<span class="zll-search-reset">重置</span>-->
            </div>
        </div>
    </div>
    <!-- table -->
    <sys-table
      :isMultipleSelection="false"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :tableHeader="tableHeader"
    >
      <template slot-scope="scope" slot="operate">
        <el-button @click="getPower(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </sys-table>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth' // 验权
  export default {
    data() {
      return {
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
        queryForm:{
           programName:"",
           programId:"",
           programCode:"",
           name:"",
           id:""
         }
      }
    },
    methods: {
      getPower(val) { //立即授权
        let type = "save";
        let name = "DesignPage";
        this.$router.push({ name ,query: {type:type,id:val.id }});
      },
      getList() {
        let self = this;
        let user = JSON.parse(getToken());
        self.queryForm.id =  user.id;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/program/queryAuthPipeProgramList",
          method: "post",
          params:self.queryForm
        }).then(resp => {
          if (resp.success) {
            self.tableLoading = false;
            self.tableData = resp.result;
            this.tableHeader = [
              {"columnValue": "programId", "columnName": "项目号", width: 150},
              {"columnValue": "programName", "columnName": "项目名称",},
              {"columnValue": "userId", "columnName": "被授权人", width: 150},
              {"columnValue": "programDay", "columnName": "授权天数", width: 150},
              {"columnValue": "programTime", "columnName": "截止日期", width: 200},
            ]
          }
        });

      },
    },
    mounted() {
      this.getList();//显示table
    },
    components: {
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
