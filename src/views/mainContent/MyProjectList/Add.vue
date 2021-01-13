<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" label="客户名称：">
          <el-input clearable class="input_right" placeholder="客户名称" v-model="addForm.custom" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" label="订单日期：">
          <el-input clearable class="input_right" placeholder="设计人" v-model="addForm.designer" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="addFormData3" label="设计号：">
          <el-input clearable class="input_right" placeholder="客户名称" v-model="addForm.programCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="programId" label="项目号：">
          <el-select clearable v-model="addForm.programId" placeholder="请输入项目号">
            <el-option :label="item" :value="item" v-for="(item,index) in programIds" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
      }
    },
    methods: {
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";
</style>
