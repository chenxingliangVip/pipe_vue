<template>
  <div class="addProject reset">
    <div class="resetForm zll-form">
      <el-form :model="resetForm" :rules="rules" ref="resetForm">
        <el-form-item class="formList" prop="oldPassword" label="原密码：">
          <el-input clearable class="input_right" placeholder="请输入原密码" type="password"
                    v-model="resetForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="password" label="修改密码：">
          <el-input clearable class="input_right" placeholder="请输入修改密码" type="password"
                    v-model="resetForm.password"></el-input>
        </el-form-item>
        <el-form-item class="formList" prop="repeatPassword" label="确认密码：">
          <el-input clearable class="input_right" placeholder="请确认密码" type="password"
                    v-model="resetForm.repeatPassword"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {getToken} from '@/utils/auth' // 验权
  export default {
    data() {
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        resetForm: {
          oldPassword: "",
          password: "",
          repeatPassword: "",
          id: ""
        },
        rules: {
          oldPassword: [
            {required: true, message: "请输入原密码", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入修改密码", trigger: "blur"}
          ],
          repeatPassword: [
            {required: true, validator: checkPass, trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      setResetFormData(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let user = JSON.parse(getToken());
            this.resetForm.id = user.id;
            this.$emit("resetForm", this.resetForm);
          } else {
            return false;
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/style/dialog.scss";
</style>
