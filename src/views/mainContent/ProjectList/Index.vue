<template>
  <div class="User">
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
        tableData: [{
          tableNum1: 'P20090001',//项目号
          tableNum2: '北疆热电二期工程',//项目名称
          tableNum3: '徐峰',//设计人
          tableNum4: '李美然',//授权访问
          tableNum5: '2020-10-26',//截止日期
        }],
        tableHeader: [],
        addDialog: false, //弹框
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
        this.$router.push({ name ,query: {type: type }});
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
