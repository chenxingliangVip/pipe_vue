<template>
  <div class="addProject UserAdd">
    <div class="addForm zll-form">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-form-item class="formList" prop="roleType" label="角色：">
          <el-select clearable v-model="addForm.roleType" placeholder="请选择角色">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="经理" value="2"></el-option>
            <el-option label="设计员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formList" prop="userName" label="姓名：">
          <el-input clearable class="input_right" placeholder="请输入姓名" v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="userAccount" label="用户名：">
          <el-input clearable class="input_right" placeholder="请输入用户名" v-model="addForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="password" label="密码：">
          <el-input clearable class="input_right" show-password placeholder="请输入密码" v-model="addForm.password"
                    :disabled="titleTxt !='新建'"></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="addFormData5" label="状态：">
          <el-select clearable v-model="addForm.accountStatus" placeholder="请选择状态">
            <el-option label="在用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['titleTxt', 'editData'],
    data() {
      return {
        addForm: {
          roleType: '',//角色
          userAccount: '',//姓名
          userName: '',//用户名
          password: '',//密码
          accountStatus: '',//状态
        },
        rules: {
          roleType: [
            {required: true, message: '请选择角色', trigger: 'change'},
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          userAccount: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          accountStatus: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },
      }
    },
    methods: {
      setFormData(formName) {
        let addForm = {
          ...this.addForm,
        };
        delete addForm.createTime;
        delete addForm.updateTime;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('addForm', addForm)
          } else {
            return false
          }
        })
      },
    },
    mounted() {
      this.addForm = this.editData;
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";

  .UserAdd {
    .upLoad {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .bottom {
      border-top: 1px solid #DCDFE6;
      margin-top: 15px;

      .input_right {
        width: calc(100% - 100px);
      }
    }

    .addNew {
      float: right;
      text-align: right;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
      font-size: 12px;
      margin-top: 3px;
      margin-left: 10px;

      span {
        background: #ca8114;
        color: #ffffff;
        border-radius: 14px;
        text-align: center;
        display: inline-block;
        padding: 0 10px;

        &:hover {
          opacity: .8;
          transition: all .3s;
        }
      }
    }
  }
</style>
