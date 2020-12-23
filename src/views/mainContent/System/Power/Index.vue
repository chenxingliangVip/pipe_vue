<template>
    <div class="Power">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="addNew">
                <span @click="addPower()"><i class="el-icon-circle-plus-outline"></i> 新建角色</span>
			</div>
		</div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="false" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="120"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </sys-table>
        
        <!-- 新建管理角色弹框 -->
        <div class="zll-dialog">
            <popout :title="'角色权限 · ' + type " :visible.sync="addDialog" v-if="addDialog" class="bigSize">
                <Add ref="add" slot="content" :type="type" @addForm="getFormData"></Add>
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
                type: '',
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                tableData: [{
                    tableNum1: '部门',//部门
                    tableNum2: '角色',//角色
                    tableNum3: '',//权限
                    tableNum4: '正常',//状态
                }],
                tableHeader:[],
                addDialog: false, //角色弹框
            }
        },
        methods: {
             getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tableNum1", "columnName": "部门", width: "100"},
                        {"columnValue": "tableNum2", "columnName": "角色", width: "100"},
                        {"columnValue": "tableNum3", "columnName": "权限"},
                        {"columnValue": "tableNum4", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            addPower(){
                this.addDialog = true
                this.type = "新建"
            },
            getFormData(data){
                this.addDialog = false
            },
            edit(){ //管理
                this.addDialog = true
                this.type = "编辑"
            },
            searchReset() { //重置搜索
                this.searchInput1 = "";
                this.searchInput2 = "";
                this.searchInput3 = "";
                this.getTableList();
            },
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
    h1 {
        text-align: center;
        color: #34bfc6;
        font-size: 20px;
        font-weight: normal;
        position: relative;
        width: 100px;
        margin: 0 auto;
        padding-bottom: 10px;
        .line1 {
            width: 30px;
            height: 1px;
            position: absolute;
            left: -40px;
            top: 14px;
            background:  #34bfc6;
        }
        .line2 {
            width: 30px;
            height: 1px;
            position: absolute;
            right: -40px;
            top: 14px;
            background:  #34bfc6;
        }
    }
}
</style>