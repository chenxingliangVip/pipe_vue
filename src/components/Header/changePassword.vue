<template>
    <div class="addProject reset">
        <div class="resetForm zll-form">
            <el-form :model="resetForm" :rules="rules" ref="resetForm">
                <el-form-item class="formList" prop="resetFormData1" label="原密码：">
                    <el-input clearable class="input_right" placeholder="请输入原密码"  type="password" v-model="resetForm.resetFormData1"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="resetFormData2" label="修改密码：">
                    <el-input clearable class="input_right" placeholder="请输入修改密码"  type="password" v-model="resetForm.resetFormData2"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="resetFormData3" label="确认密码：">
                    <el-input clearable class="input_right" placeholder="请确认密码"  type="password" v-model="resetForm.resetFormData3"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            var checkPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resetForm.resetFormData2) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                resetForm: {
                    resetFormData1: "",
                    resetFormData2: "",
                    resetFormData3: ""
                },
                rules: {
                    resetFormData1: [
                        { required: true, message: "请输入原密码", trigger: "blur" }
                    ],
                    resetFormData2: [
                        { required: true, message: "请输入修改密码", trigger: "blur" }
                    ],
                    resetFormData3: [
                        { required: true, validator: checkPass, trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            setResetFormData(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
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