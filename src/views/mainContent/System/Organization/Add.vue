<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" ref="addForm" class="demo-ruleForm">
                <div class="nav_organize">
                    <el-checkbox class="left_check" v-model="checked1" @change="isChecked1"></el-checkbox>
                    <el-form-item class="formList" label="一级部门：">
                        <el-input clearable class="input_right" placeholder="请输入一级部门" :disabled="!checked1" v-model="addForm.addFormData1"></el-input>
                    </el-form-item>
                </div>
                <div class="nav_organize">
                    <el-checkbox class="left_check" v-model="checked2" :disabled="!checked1" @change="isChecked2"></el-checkbox>
                    <el-form-item class="formList" label="二级部门：">
                        <el-input clearable class="input_right" placeholder="请输入二级部门" :disabled="!checked2" v-model="addForm.addFormData2"></el-input>
                    </el-form-item>
                </div>
                <div class="nav_organize">
                    <el-checkbox class="left_check" v-model="checked3" :disabled="!checked2"></el-checkbox>
                    <el-form-item class="formList" label="三级部门：">
                        <el-input clearable class="input_right" placeholder="请输入三级部门" :disabled="!checked3" v-model="addForm.addFormData3"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['type'],
        data(){
            return {
                checked1: true,
                checked2: false,
                checked3: false,
                addForm:{
                    addFormData1: '',
                    addFormData2: '',
                    addFormData3: '',
                },
            }
        },
        methods: {
            isChecked1(val) {
                if( !val ) {
                    this.checked2 = false
                    this.checked3 = false
                }
            },
            isChecked2(val) {
                if( !val ) {
                    this.checked3 = false
                }
            },
            setFormData(formName){
                if( this.checked1 ) {
                    if( !this.addForm.addFormData1 ) {
                        this.$message.error('请输入一级部门!');
                        return false
                    }
                }
                if( this.checked2 ) {
                    if( !this.addForm.addFormData2 ) {
                        this.$message.error('请输入二级部门!');
                        return false
                    }
                }
                if( this.checked3 ) {
                    if( !this.addForm.addFormData3 ) {
                        this.$message.error('请输入三级部门!');
                        return false
                    }
                }
                this.$emit('addForm', this.addForm)
            },
        },
        mounted(){
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/style/dialog.scss";
.addProject {
    .nav_organize {
        .left_check {
            width: 20px;
            float: left;
            height: 30px;
            line-height: 30px;
        }
        .formList {
            width: calc(100% - 20px);
            float: left;
        }
    }
}
</style>