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
        <el-button @click="getPower(scope.row)" type="text" size="small">立即授权</el-button>
      </template>
    </sys-table>

    <!-- 授权弹框 -->
    <div class="zll-dialog">
      <popout title="项目借用授权" :visible.sync="addDialog" v-if="addDialog" class="minSize">
        <Add ref="add" slot="content" :editData="editData" @addForm="getFormData"></Add>
        <template slot="bottom">
          <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}" v-show="!editData.author">提 交</p>
        </template>
      </popout>
    </div>
  </div>
</template>

<script>
  import Add from './Add'
  import {formatDate} from '@/utils/formatDate'

  export default {
    data() {
      return {
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
        addDialog: false, //弹框
        editData:{}
      }
    },
    methods: {
      getList() {
        let self = this;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/program/queryPipeProgramList",
          method: "post",
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
        this.editData = Object.assign({},val);
        this.addDialog = true
      },
      getFormData(data) {
        this.authProgram(data);
      },

      authProgram(data) {
        let self = this;
        let param = {id:data.id,programAuth:{userId:data.userId,programDay:data.programDay}};
        self.$http({
          url: "/pipe/program/updatePipeProgram",
          method: "post",
          data: JSON.stringify(param),
          dataType: 'json',
          contentType: "application/json",
        }).then(resp => {
          if (resp.success) {
            self.$message.success("授权成功！");
            self.addDialog = false;
            self.getList();
          }else{
            self.$message.error("授权出现异常！");
          }
        });
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
