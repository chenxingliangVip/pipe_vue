<template>
    <div class="addProject UserAdd">
        <div class="addForm zll-form">
            <el-form :model="addForm" ref="addForm" class="demo-ruleForm">
                    <el-form-item class="formList" prop="addFormData1" label="姓名：">
                        <el-input clearable class="input_right" placeholder="请输入姓名" v-model="addForm.addFormData1" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData2" label="项目号：">
                        <el-input clearable class="input_right" placeholder="请输入项目号" v-model="addForm.addFormData2" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData3" label="客户名称：">
                        <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.addFormData3" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData4" label="项目名称：">
                        <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.addFormData4" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="formList" prop="addFormData5" label="授权天数：">
                        <el-select clearable v-model="addForm.addFormData5" placeholder="请选择授权天数" disabled>
                            <el-option label="1天" value="1天"></el-option>
                            <el-option label="2天" value="2天"></el-option>
                            <el-option label="3天" value="3天"></el-option>
                            <el-option label="4天" value="4天"></el-option>
                            <el-option label="5天" value="5天"></el-option>
                            <el-option label="6天" value="6天"></el-option>
                            <el-option label="7天" value="7天"></el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            addForm:{
                addFormData1: '',//姓名
                addFormData2: '',//项目号
                addFormData3: '',//客户名称
                addFormData4: '',//项目名称
                addFormData5: '',//授权天数
            },
        }
    },
    methods: {
        
    },
    mounted(){
        
    },
}
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
</style>