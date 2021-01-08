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
            <div class="impower-p">
                <span class="person">被授权人：</span>
                <div class="mine-add">
                    <span class="el-icon-circle-plus" @click="addTable"></span>
                    <span class="el-icon-remove-outline" @click.stop="deleteTable"></span>
                </div>
                <div class="tableList sunhao">
                    <table border="1">
                        <tr>
                            <th width="50"></th><th width="200">姓名</th><th>授权天数</th>
                        </tr>
                        <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                            <td width="50">
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td width="200"><el-input clearable v-model="item.table1" placeholder=""></el-input></td>
                            <td>
                                <el-select clearable v-model="item.table2" placeholder="">
                                    <el-option label="1天" value="1天"></el-option>
                                    <el-option label="2天" value="2天"></el-option>
                                    <el-option label="3天" value="3天"></el-option>
                                    <el-option label="4天" value="4天"></el-option>
                                    <el-option label="5天" value="5天"></el-option>
                                    <el-option label="6天" value="6天"></el-option>
                                    <el-option label="7天" value="7天"></el-option>
                                </el-select>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
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
            tableData:[
                { list:false,table1: '',table2: '' },
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
        addTable(){//增加table
            this.tableData.push({ list:false,table1: '',table2: '' })
        },
        checkList(index){
            this.tableData[index].list = !this.tableData[index].list;
        },
        deleteTable(){//删除table
            if(this.tableData.length == 1){
                this.$message.warning('不能少于一列!');
                return false
            }else{
                this.tableData = this.tableData.filter(e => {
                    return !e.list
                })
            }
        },
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
    .impower-p {
        margin-top: 15px;
        .person {
            width: 72px;
            text-align: right;
            color: #606266;
            display: inline-block;
        }
    }
    .sunhao {
        table {
            width: calc(100% - 72px) !important;
            margin-left: 72px;
        }
    }
</style>