<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" prop="programId" label="项目号：" disabled>
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
      <div class="impower-p">
        <span class="person">被授权人：</span>
        <div class="mine-add">
          <span class="el-icon-circle-plus" @click="addTable"></span>
          <span class="el-icon-remove-outline" @click.stop="deleteTable"></span>
        </div>
        <div class="tableList sunhao">
          <table border="1">
            <tr>
              <th width="50"></th>
              <th width="200">姓名</th>
              <th>授权天数</th>
            </tr>
            <tr class="add_Table" v-for="(item, index) in tableData" :key="index">
              <td width="50">
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.checked"></i>
                                    <i class="no-check" v-show="!item.checked"></i>
                                </span>
              </td>
              <td width="200">
                <el-select clearable v-model="item.userId" placeholder="" :disabled="item.programId">
                  <el-option v-show="item.id != addForm.createUser" :label="item.userName" :value="item.id" v-for="(item,index) in userList" :key="index"></el-option>
                </el-select>
              </td>
              <td>
                <el-select clearable v-model="item.programDay" placeholder="" :disabled="item.programId">
                  <el-option label="1天" value="1"></el-option>
                  <el-option label="2天" value="2"></el-option>
                  <el-option label="3天" value="3"></el-option>
                  <el-option label="4天" value="4"></el-option>
                  <el-option label="5天" value="5"></el-option>
                  <el-option label="6天" value="6"></el-option>
                  <el-option label="7天" value="7"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['authData'],
    data() {
      return {
        userList:[],
        addForm: {
          createUser:"",
          programId: '',
          custom: '',
          programName: '',
          programCode: '',
        },
        tableData: [{checked: false, userId: '', programDay: ''}],
        rules: {

        },
      }
    },
    methods: {
      addTable() {//增加table
        this.tableData.push({checked: false, userId: '', programDay: ''})
      },
      checkList(index) {
        this.tableData[index].checked = !this.tableData[index].checked;
      },
      deleteTable() {//删除table
        if (this.tableData.length == 1) {
          this.$message.warning('不能少于一列!');
          return false
        } else {
          this.tableData = this.tableData.filter(e => {
            return !e.checked
          })
        }
      },
      getTableData(){
        let data = {tableData:this.tableData,programId:this.authData.id};
        return data;
      },
      getUserList() {
        let self = this;
        self.userList = [];
        self.$http({
          url: "/pipe/queryAllLoginList",
          method: "post",
        }).then(resp => {
          if (resp.success) {
            self.userList = resp.result;
          }
        });

      },
    },
    mounted() {
      this.getUserList();
    },
    watch:{
      authData(val){
        this.addForm = val;
        let auths = val.programAuths;
        this.tableData = [];
        if(auths && auths.length > 0){
          for(let _d of auths){
            let data = {};
            data.programId = _d.programId;
            data.userId = _d.userId;
            data.programDay = _d.programDay;
            data.checked = false;
            this.tableData.push(data);
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";

  .impower-p {
    margin-top: 15px;

    .person {
      width: 72px;
      text-align: right;
      color: #606266;
      display: inline-block;
    }
  }

  .sunhao {
    table {
      width: calc(100% - 72px) !important;
      margin-left: 72px;
    }
  }
</style>
