<template>
    <div class="addProject UserAdd">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="addFormData4" label="项目号：">
                    <el-input clearable class="input_right" placeholder="请输入项目号" v-model="addForm.addFormData4"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData1" label="客户名称：">
                    <el-select clearable v-model="addForm.addFormData1" placeholder="请选择客户名称">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData2" label="项目名称：">
                    <el-date-picker clearable type="date" placeholder="请输入项目名称" v-model="addForm.addFormData2"> </el-date-picker>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData3" label="设计号：">
                        <el-select clearable v-model="addForm.addFormData3" placeholder="请输入设计号">
                        <el-option label="张三" value="张三"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="copy_list" v-for="(item, index) in copyList"  :key="index">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input clearable class="nav" placeholder="请选择客户名称" v-model="item.data1"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input clearable class="nav" placeholder="请输入项目名称" v-model="item.data2"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input clearable class="nav" placeholder="请输入设计号" v-model="item.data3"></el-input>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            addForm:{
                addFormData1: '',
                addFormData2: '',
                addFormData3: '',
                addFormData4: '',
            }, 
            copyList: [
                { data1: '',data2: '',data3: '', },
                { data1: '',data2: '',data3: '', },
                { data1: '',data2: '',data3: '', },
            ],
            rules: {
               addFormData1:[
                    { required: true,message: '请选择客户名称', trigger: 'change' },
                ],
                addFormData2:[
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                ],
                addFormData3:[
                    { required: true, message: '请输入设计号', trigger: 'blur' },
                ],
                addFormData4:[
                    { required: true, message: '请输入项目号', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        setFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm', this.addForm)
                }else {
                    return false
                }
            })
        },
    },
    mounted(){
        
    },
}
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
    .copy_list {
        margin-bottom: 15px;
    }
</style>