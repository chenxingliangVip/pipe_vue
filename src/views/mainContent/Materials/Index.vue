<template>
    <div class="Materials">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input addMaterials">
            <el-form :model="addForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <div class="addList">
                    <div class="list_nav">
                        <p>材料名称</p>
                        <el-form-item class="formList" prop="addFormdata1">
                            <el-input clearable v-model.trim="addForm.addFormdata1" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>密度kg/m³</p>
                        <el-form-item class="formList" prop="addFormdata2">
                            <el-input clearable v-model="addForm.addFormdata2" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>导热常数项系数</p>
                        <el-form-item class="formList" prop="addFormdata3">
                            <el-input clearable v-model="addForm.addFormdata3" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>导热方程一次项系数</p>
                        <el-form-item class="formList" prop="addFormdata4">
                            <el-input clearable v-model="addForm.addFormdata4" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>导热方程二次项系数</p>
                        <el-form-item class="formList" prop="addFormdata5">
                            <el-input clearable v-model="addForm.addFormdata5" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>衰减方程常数项系数</p>
                        <el-form-item class="formList">
                            <el-input clearable v-model="addForm.addFormdata6" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>衰减方程一次项系数</p>
                        <el-form-item class="formList">
                            <el-input clearable v-model="addForm.addFormdata7" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="list_nav">
                        <p>衰减方程二次项系数</p>
                        <el-form-item class="formList">
                            <el-input clearable v-model="addForm.addFormdata8" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="clearBoth"></div>
                </div>
                <div class="addNew">
                    <el-form-item class="formList">
                        <span @click="addPower('ruleForm')"><i class="el-icon-circle-plus-outline"></i> 新建材料</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="false" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="150"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteRow(scope.row, tableData)" type="text" size="small">删除</el-button>
            </template>
        </sys-table>
        
        <!-- 材料弹框 -->
        <div class="zll-dialog">
            <popout title="编辑材料" :visible.sync="addDialog" v-if="addDialog" class="package_dialog">
                <Add ref="add" slot="content" :editData="editData"  @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import Add from './Add'
import { Density, Coefficient } from '@/assets/js/verify'
export default {
    data(){
        return {
            tableLoading:true, //table刷新
            tableData: [{
                tableNum1: '材料名称',//材料名称
                tableNum2: '',//密度kg/m³
                tableNum3: '',//导热常数项系数
                tableNum4: '',//导热方程一次项系数
                tableNum5: '',//导热方程二次项系数
                tableNum6: '',//衰减方程常数项系数
                tableNum7: '',//衰减方程一次项系数
                tableNum8: '',//衰减方程二次项系数
            }],
            tableHeader:[],
            editData: [],
            addDialog: false, //角色弹框
            addForm: {
                addFormdata1: '',
                addFormdata2: '',
                addFormdata3: '',
                addFormdata4: '',
                addFormdata5: '',
                addFormdata6: '',
                addFormdata7: '',
                addFormdata8: '',
            },
            rules: {
                addFormdata1:[
                    { required: true, message: '请输入材料名称', trigger: 'blur' },
                ],
                addFormdata2:[
                    { required: true, validator: Density, trigger: 'blur' },
                ],
                addFormdata3:[
                    { required: true, validator: Coefficient, trigger: 'blur' },
                ],
                addFormdata4:[
                    { required: true, validator: Coefficient, trigger: 'blur' },
                ],
                addFormdata5:[
                    { required: true, validator: Coefficient, trigger: 'blur' },
                ],
                addFormdata6:[
                    { validator: Coefficient, trigger: 'blur' },
                ],
                addFormdata7:[
                    { validator: Coefficient, trigger: 'blur' },
                ],
                addFormdata8:[
                    { validator: Coefficient, trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        getTableList(){//获取表格数据
            this.tableLoading = true;
            setTimeout(()=>{
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i]["index"] = i + 1;
                }
                this.tableHeader =  [
                    { "columnValue": "index", "columnName": "序号", width: '50px' },
                    {"columnValue": "tableNum1", "columnName": "材料名称", width: "100"},
                    {"columnValue": "tableNum2", "columnName": "密度kg/m³", width: "100"},
                    {"columnValue": "tableNum3", "columnName": "导热常数项系数"},
                    {"columnValue": "tableNum4", "columnName": "导热方程一次项系数"},
                    {"columnValue": "tableNum5", "columnName": "导热方程二次项系数"},
                    {"columnValue": "tableNum6", "columnName": "衰减方程常数项系数"},
                    {"columnValue": "tableNum7", "columnName": "衰减方程常数项系数"},
                    {"columnValue": "tableNum8", "columnName": "衰减方程二次项系数"},
                ]
                this.tableData = JSON.parse(JSON.stringify(this.tableData))
                this.tableLoading = false;
            },500)
        },
        addPower(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    setTimeout(() => {
                        this.tableData.push({
                            tableNum1: this.addForm.addFormdata1,
                            tableNum2: this.addForm.addFormdata2,
                            tableNum3: this.addForm.addFormdata3,
                            tableNum4: this.addForm.addFormdata4,
                            tableNum5: this.addForm.addFormdata5,
                            tableNum6: this.addForm.addFormdata6,
                            tableNum7: this.addForm.addFormdata7,
                            tableNum8: this.addForm.addFormdata8,
                        })
                        this.$message.success('新建成功!');
                    this.$refs[formName].resetFields();
                    }, 500)
                    this.getTableList();
                }else {
                    return false
                }
            })
        },
        getFormData(data){
            this.addDialog = false
        },
        edit(val){ //管理
            this.addDialog = true
            this.editData = val
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
            this.getTableList();
        }
    },
    mounted(){
        this.getTableList();//显示table
    },
    components: {
        Add,
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
    .Power{
        .leadOut{
            background: #e69c2d;
            color: #ffffff;
            position: relative;
            padding: 10px 10px 10px 20px;
            img {
                position: absolute;
                left: 7px;
            }
            &:hover {
                opacity: .8;
                transition: all .3s;
            }
        }
    }
    
</style>