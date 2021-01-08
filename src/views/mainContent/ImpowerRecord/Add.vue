<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" prop="id" label="项目号：">
          <el-input clearable class="input_right" placeholder="请输入项目号" v-model="addForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="custom" label="客户名称：">
          <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.custom"
                    disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="programName" label="项目名称：">
          <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.programName"
                    disabled></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="userId" label="授权姓名：">
          <el-select clearable v-model="addForm.userId" placeholder="授权姓名" :disabled="disabled">
            <el-option v-for="(item,index) in userList" :key="index" :label="item.userName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formList" prop="programDay" label="授权天数：">
          <el-select clearable v-model="addForm.programDay" placeholder="请选择授权天数" :disabled="disabled">
            <el-option label="1天" value="1"></el-option>
            <el-option label="2天" value="2"></el-option>
            <el-option label="3天" value="3"></el-option>
            <el-option label="4天" value="4"></el-option>
            <el-option label="5天" value="5"></el-option>
            <el-option label="6天" value="6"></el-option>
            <el-option label="7天" value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['editData'],
    data() {
      return {
        disabled:true,
        addForm: {
          id: '',//项目号
          custom: '',//客户名称
          programName: '',//项目名称
          userId: '',//姓名
          programDay: '',//授权天数
        },
        userList:[],
        rules: {
          userId: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          id: [
            {required: true, message: '请输入项目号', trigger: 'blur'},
          ],
          programDay: [
            {required: true, message: '请选择授权天数', trigger: 'change'},
          ],
        },
      }
    },
    methods: {
      setFormData(formName) {
        let addForm = {
          ...this.addForm,
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('addForm', addForm)
          } else {
            return false
          }
        })
      },
      getUserList() {
        let self = this;
        if(self.userList.length > 0){
            return;
        }
        self.$http({
          url: "/pipe/queryLoginList",
          method: "post",
          params:{status:"1"}
        }).then(resp => {
          if (resp.success) {
            self.userList = resp.result;
          }
        });
      },
    },
    mounted() {
      this.addForm = this.editData;
      this.disabled = this.editData.programAuth.userId?true:false;
      if(this.disabled){
        this.addForm.userId = this.editData.programAuth.userId;
        this.addForm.programDay = this.editData.programAuth.programDay;
      }
      this.getUserList();
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";
</style>
