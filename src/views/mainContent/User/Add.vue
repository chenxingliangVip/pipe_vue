<template>
    <div class="addProject UserAdd">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                    <el-form-item class="formList" prop="addFormData1" label="角色：">
                        <el-select clearable v-model="addForm.addFormData1" placeholder="请选择角色" :disabled="disabled">
                            <el-option label="管理员" value="管理员"></el-option>
                            <el-option label="经理" value="经理"></el-option>
                            <el-option label="设计员" value="设计员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData2" label="姓名：">
                        <el-input clearable class="input_right" placeholder="请输入姓名" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData3" label="用户名：">
                        <el-input clearable class="input_right" placeholder="请输入用户名" v-model="addForm.addFormData3" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData4" label="密码："  v-if="titleTxt == '新建'">
                        <el-input clearable class="input_right" show-password placeholder="请输入密码" v-model="addForm.addFormData4" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData4" label="密码：" v-else>
                        <el-input clearable class="input_right" show-password placeholder="请输入密码" v-model="addForm.addFormData4" :disabled="disabled"  style="width: calc(100% - 100px)"></el-input>
                        <div class="addNew">
                                <span class="password" @click="setPass()"> 重置密码</span>
                        </div>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData5" label="状态：">
                        <el-select clearable v-model="addForm.addFormData5" placeholder="请选择状态" :disabled="disabled">
                            <el-option label="在用" value="在用"></el-option>
                            <el-option label="停用" value="停用"></el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['titleTxt', 'editData'],
    data(){
        return {
            disabled: false,
            addForm:{
                addFormData1: '',//角色
                addFormData2: '',//姓名
                addFormData3: '',//用户名
                addFormData4: '',//密码
                addFormData5: '',//状态
            },
            rules: {
                addFormData1:[
                    { required: true, message: '请选择角色', trigger: 'change' },
                ],
                addFormData2:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                addFormData3:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                addFormData4:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                addFormData5:[
                    { required: true, message: '请选择状态', trigger: 'change' },
                ],
            },
        }
    },
    methods: {
        setFormData(formName){
            let addForm = {
                ...this.addForm,
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm', addForm)
                }else {
                    return false
                }
            })
        },
    },
    mounted(){
        if( this.titleTxt == '查看') {
            this.disabled = true
        }else if(this.titleTxt == '编辑') {
            this.addForm.addFormData1 = this.editData.tableNum3
            this.addForm.addFormData2 = this.editData.tableNum1
            this.addForm.addFormData3 = this.editData.tableNum2
            this.addForm.addFormData4 = this.editData.tableNum4
            this.addForm.addFormData5 = this.editData.tableNum5
        }
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
                width: calc( 100% - 100px );
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