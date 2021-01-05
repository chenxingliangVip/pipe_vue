<template>
  <div class="User">
    <h1 class="header_h1">用户管理</h1>
    <!-- 头部搜索 -->
    <div class="Search_Top_Input">
      <div class="search_list" style="width: calc(100% - 100px) !important"></div>
      <div class="addNew" style="width: 100px">
        <span @click="addUser()"><i class="el-icon-circle-plus-outline"></i> 新建用户</span>
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
        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </sys-table>

    <!-- 新建管理用户弹框 -->
    <div class="zll-dialog">
      <popout :title="title + '用户'" :visible.sync="addDialog" v-if="addDialog" class="minSize">
        <Add ref="add" slot="content" :titleTxt="title" :editData="editData" @addForm="getFormData"></Add>
        <template slot="bottom">
          <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
        </template>
      </popout>
    </div>
  </div>
</template>

<script>
  import Add from './Add'

  export default {
    data() {
      return {
        title: '',
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
        addDialog: false, //用户弹框
        editData: [],
        searchInput1: '',
        searchInput2: '',
        searchInput3: '',
      }
    },
    methods: {
      getList() {
        let self = this;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/queryLoginList",
          method: "post",
        }).then(resp => {
          if (resp.success) {
            self.tableLoading = false;
            self.tableData = resp.result;
            self.tableHeader = [{"columnValue": "userName", "columnName": "姓名"},
              {"columnValue": "userAccount", "columnName": "用户名"},
              {"columnValue": "roleName", "columnName": "职务"},
              {"columnValue": "accountStatusCn", "columnName": "状态"},];
          }
        });

      },

      editUser(data) {
        let self = this;
        let tip = "用户添加成功";
        let url = '/pipe/addUser';
        if (this.title == '编辑') {
          url = '/pipe/updateUser';
          tip = "用户修改成功";
        }
        if(data.roleType == '1'){
          data.roleName = '管理员';
        }
        if(data.roleType == '2'){
          data.roleName = '经理';
        }
        if(data.roleType == '3'){
          data.roleName = '设计员';
        }
        self.$http({
          url: url,
          method: "post",
          params: data
        }).then(resp => {
          if (!resp.success) {
            this.$message.error("账户已经存在！");
          }else{
            this.$message.success(tip);
          }
          self.getList();
        });

      },

      addUser() {
        this.title = '新建'
        this.addDialog = true;
        this.editData = [];
      },
      edit(val) { //编辑
        this.addDialog = true
        this.title = '编辑';
        this.editData = val;
      },
      getFormData(data) {
        this.addDialog = false;
        this.editUser(data);
      },
      deleteRow(rows) {
        let self = this;
        self.$confirm('确定删除该信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http({
            url: "/pipe/deleteUser",
            method: "post",
            params: {id:rows.id}
          }).then(resp => {
            if (resp.success) {
              self.getList();
              self.$message.success("删除成功");
              return
            }
            self.$message.success("操作失败，请联系管理员");
          });
        });
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
