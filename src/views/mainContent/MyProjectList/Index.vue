<template>
  <div class="User">
    <h1 class="header_h1">我的项目</h1>
    <div class="Search_Top_Input">
        <div class="search_list" style="width: calc(100%) !important">
            <div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="项目号"></el-input>
            </div>
            <div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="项目名称"></el-input>
            </div>
            <div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="设计人"></el-input>
            </div>
            <div class="input_flex search">
                <span class="zll-search">搜索</span>
                <span class="zll-search-reset" @click="searchReset()">重置</span>
            </div>
        </div>
    </div>
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
        searchInput1: '',
        searchInput2: '',
        searchInput3: '',
      }
    },
    methods: {
      getList() {
        let self = this;
        let user = JSON.parse(getToken());
        let id = user.roleType == 1?"":user.id;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/program/queryPipeProgramList",
          method: "post",
          params:{id:id}
        }).then(resp => {
          if (resp.success) {
            self.tableLoading = false;
            self.tableData = resp.result;
            for (let data of self.tableData) {
              data.author = data.programAuth.userName || "";
              data.authEndTime = data.programAuth.programTime || "";
            }
            this.tableHeader = [
              {"columnValue": "id", "columnName": "项目号", width: 150},
              {"columnValue": "programName", "columnName": "项目名称",},
              {"columnValue": "designer", "columnName": "设计人", width: 150},
              {"columnValue": "author", "columnName": "授权访问", width: 150},
              {"columnValue": "authEndTime", "columnName": "截止日期", width: 200},
            ]
          }
        });

      },
      getPower(val) { //立即授权
        let type = "see";
        let createUser = val.createUser;
        let userId = val.programAuth.userId;
        let user = JSON.parse(getToken());
        if(user.id == createUser){
          type = "all";
        }
        if(user.id == userId){
          type = "save";
        }
        let name = "DesignPage";
        this.$router.push({ name ,query: {type: type,id:val.id }});
      },
      getFormData(data) {
        this.addDialog = false
      },
      searchReset() {
          this.searchInput1 ==''
          this.searchInput2 ==''
          this.searchInput3 ==''
          this.getList()
      }
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
