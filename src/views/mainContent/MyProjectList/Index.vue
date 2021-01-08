<template>
    <div class="User">
        <h1 class="header_h1">我的项目</h1>
        <div class="Search_Top_Input">
            <div class="search_list" style="width: calc(100% - 100px) !important">
                <div class="input_flex">
                    <el-input clearable v-model="searchInput1" placeholder="客户名称"></el-input>
                </div>
                <div class="input_flex">
                    <el-input clearable v-model="searchInput2" placeholder="项目名称"></el-input>
                </div>
                <div class="input_flex">
                    <el-input clearable v-model="searchInput3" placeholder="项目号"></el-input>
                </div>
                <div class="input_flex">
                    <el-input clearable v-model="searchInput4" placeholder="设计号"></el-input>
                </div>
                <div class="input_flex search">
                    <span class="zll-search">搜索</span>
                    <span class="zll-search-reset" @click="searchReset()">重置</span>
                </div>
            </div>
            <div class="addNew" style="width: 100px !important">
                <span @click="addProject()"><i class="el-icon-circle-plus-outline"></i> 赋项目号</span>
            </div>
        </div>
        <!-- table -->
        <sys-table :isMultipleSelection="true"
            :tableData="tableData"
            :tableLoading="tableLoading"
            :tableHeader="tableHeader"
            :scopeWidth="180"
            @getSelection="getSelection"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="copyPro(scope.row)" type="text" size="small" v-if="scope.row.tableNum6 == '授权中'">复制</el-button>
                <el-button @click="deleteRow(scope.index, tableData)" type="text" size="small" v-if="scope.row.tableNum6 == '无'">删除</el-button>
                <el-button @click="Impower(scope.row)" type="text" size="small" v-if="scope.row.tableNum6 == '无'">授权</el-button>
                <el-button type="text" size="small" v-if="scope.row.tableNum6 == '授权中'">转换</el-button>
            </template>
        </sys-table>

        <!-- 赋项目号弹框 -->
        <div class="zll-dialog">
            <popout title="赋项目号" :visible.sync="addDialog" v-if="addDialog"  class="minSize">
                <Add ref="add" slot="content" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}"> 确 定 </p>
                </template>
            </popout>
        </div>
        <!-- 复制弹框 -->
        <div class="zll-dialog">
            <popout title="项目复制" :visible.sync="copyDialog" v-if="copyDialog"  class="minSize_copy">
                <copy ref="copy" slot="content"></copy>
                <template slot="bottom">
                    <p class="zll-botton" @click="copyDialog = false"> 复 制 </p>
                </template>
            </popout>
        </div>
        <!-- 授权弹框 -->
        <div class="zll-dialog">
            <popout title="项目授权" :visible.sync="impowerDialog" v-if="impowerDialog">
                <Impower ref="Impower" slot="content"></Impower>
                <template slot="bottom">
                    <p class="zll-botton" @click="impowerDialog = false"> 确定 </p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import Add from "./Add";
import copy from "./copy";
import Impower from "./Impower";
import { getToken } from "@/utils/auth"; // 验权
export default {
    data() {
        return {
            tableLoading: true, //table刷新
            tableData: [
                {
                    tableNum1: "",
                    tableNum2: "",
                    tableNum3: "",
                    tableNum4: "",
                    tableNum5: "",
                    tableNum6: "授权中",
                }, {
                    tableNum1: "",
                    tableNum2: "",
                    tableNum3: "",
                    tableNum4: "",
                    tableNum5: "",
                    tableNum6: "无",
                },
            ],
            tableHeader: [],
            addDialog: false, //弹框
            copyDialog: false, //复制弹框
            impowerDialog: false, //授权弹框
            searchInput1: "",
            searchInput2: "",
            searchInput3: "",
            searchInput4: "",
            selectList: [],
        };
    },
    methods: {
        getList() {
            //获取表格数据
            this.tableLoading = true;
            setTimeout(() => {
                this.tableHeader = [
                    { columnValue: "tableNum1", columnName: "项目号" },
                    { columnValue: "tableNum2", columnName: "项目名称" },
                    { columnValue: "tableNum3", columnName: "客户名称" },
                    { columnValue: "tableNum4", columnName: "设计号" },
                    { columnValue: "tableNum5", columnName: "设计人" },
                    { columnValue: "tableNum6", columnName: "授权状态", width: 100, },
                ];
                this.tableData = JSON.parse(JSON.stringify(this.tableData));
                this.tableLoading = false;
            }, 500);
        },
        addProject() {
            if(this.selectList.length == 1 ){
                this.addDialog = true
            }else {
                this.$message.warning("请选择一列数据！");
            }
        },
        copyPro(val) {//复制
            this.copyDialog = true
        },
        Impower(val) {//授权
            this.impowerDialog = true
        },
        goDetail(val) { //查看
        },
        getFormData(data) {
            this.addDialog = false;
        },
        getSelection(val) {
            this.selectList = val;
        },
        deleteRow(index, rows) {//删除
            this.$confirm('确定删除？', '提示', {       
                distinguishCancelAndClose: true,
                cancelButtonText: '取消',
                confirmButtonText: '确定',
            }).then(() => {
                rows.splice(index, 1);
                this.$message.success("已删除")
                this.getList()
            }).catch(() => {
                this.$message.info("已取消")          
            });
        },
        searchReset() {
            this.searchInput1 == "";
            this.searchInput2 == "";
            this.searchInput3 == "";
            this.searchInput4 == "";
            this.getList();
        },
    },
    mounted() {
        this.getList(); //显示table
    },
    components: {
        Add,
        copy,
        Impower,
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/SearchTop.scss";
</style>
