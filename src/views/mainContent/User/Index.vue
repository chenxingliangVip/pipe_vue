<template>
    <div class="User">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
            <div class="addNew">
                <span @click="addUser()"><i class="el-icon-circle-plus-outline"></i> 新建用户</span>
            </div>
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
        
        <!-- 新建管理用户弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '用户'" :visible.sync="addDialog" v-if="addDialog" class="minSize">
                <Add ref="add" slot="content" :titleTxt="title" :editData="editData" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div> 
    </div>
</template>

<script>
    import Add from './Add'
    export default {
        data(){
            return {
                title: '',
                tableLoading:true, //table刷新
                tableData: [{
                    tableNum1: 'admin',//姓名
                    tableNum2: 'admin',//用户名
                    tableNum3: '管理员',//角色
                    tableNum4: '111',//密码
                    tableNum5: '在用',//状态
                }],
                tableHeader:[],
                addDialog: false, //用户弹框
                editData: [],
            }
        },
        methods: {
             getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tableNum1", "columnName": "姓名", },
                        {"columnValue": "tableNum2", "columnName": "用户名",},
                        {"columnValue": "tableNum3", "columnName": "角色"},
                        {"columnValue": "tableNum5", "columnName": "状态",},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            addUser(){
                this.title = '新建'
                this.addDialog = true
                this.editData = []
            },
            edit(val){ //编辑
                this.addDialog = true
                this.title = '编辑'
                this.editData = val
            },
            getFormData(data){
                console.log(data)
                this.addDialog = false
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
    .User{
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