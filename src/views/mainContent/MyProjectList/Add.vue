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
          <el-select clearable v-model="addForm.programId" placeholder="请选择项目号">
            <el-option :label="item" :value="item" v-for="(item,index) in programIds" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formList"></el-form-item>
        <el-form-item class="formList" label="客户名称：">
          <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.custom" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" label="业务员：">
          <el-select clearable v-model="addForm.designer" placeholder="请选择业务员">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formList" label="日期：">
          <el-date-picker clearable class="input_right" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="addForm.createTime"></el-date-picker>
          <p class="zll-botton float_add"> 获取 </p>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableList sunhao">
        <table border="1">
        <tr class="add_Table" v-for="(item, index) in tableData" :key="index">
            <td width="50">
            <span class="checkStyle" @click="checkList(index)">
                <i class="el-icon-check" v-show="item.checked"></i>
                <i class="no-check" v-show="!item.checked"></i>
            </span>
            </td>
            <td width="200">
            <el-date-picker clearable type="date" placeholder=""  v-model="item.table1"></el-date-picker>
            </td>
            <td>
            <el-input clearable placeholder="" v-model="item.table2"></el-input>
            </td>
        </tr>
        </table>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['authProgramData'],
    data() {
      return {
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
        tableData: [
          {checked: false, table1: '', table2: ''},
          {checked: false, table1: '', table2: ''}
        ]
      }
    },
    methods: {
      checkList(index) {
        this.tableData[index].checked = !this.tableData[index].checked;
      },
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
      }
    },
    mounted() {
        this.getProgramId();
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
