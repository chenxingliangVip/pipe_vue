<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="addFormData1" label="主题：">
                    <el-input clearable class="input_right" placeholder="请输入主题" v-model="addForm.addFormData1"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData2" label="内容：">
                    <Tinymce v-model="addForm.Tinymce"></Tinymce>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/index'
export default {
    data() {
        return {
            addForm: {
                addFormData1: '',
                Tinymce: ''
            },
            rules: {
                addFormData1:[
                    { required: true, message: '请输入主题', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        setFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm',this.addForm)
                }else {
                    return false
                }
            })
        },
    },
    mounted() {},
    components: {
        Tinymce
    }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/dialog.scss";
</style>