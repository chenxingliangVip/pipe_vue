<template>
    <div class="SystemLog">
        <div class="Search_Top_Input">
            <div class="input_flex"></div>
            <div class="addNew">
                <span class="delete" @click="batchCancal">
                    <i class="el-icon-delete"></i> 批量删除
                </span>
                <span @click="addDialog = true">
                    <i class="el-icon-circle-plus-outline"></i> 消息发布
                </span>
            </div>
        </div>
        <!-- table -->
        <sys-table
            :isMultipleSelection="true"
            :tableData="tableData"
            :tableLoading="tableLoading"
            :tableHeader="tableHeader"
            :scopeWidth="120"
            :isOperate="false"
            @getSelection="getSelection"
        ></sys-table>
        <!-- 消息发布弹框 -->
        <div class="zll-dialog">
            <popout title="消息发布" :visible.sync="addDialog" v-if="addDialog" class="bigSize">
                <Add ref="add" slot="content" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import Add from "./Add";
export default {
    data() {
        return {
            tableLoading: true, //table刷新
            tableData: [
                {
                    tableNum1: "用户名", //用户名
                    tableNum2: "操作时间", //操作时间
                },
            ],
            tableHeader: [],
            selectList: [],
            addDialog: false,
        };
    },
    methods: {
        getTableList() {
            //获取表格数据
            this.tableLoading = true;
            setTimeout(() => {
                this.tableHeader = [
                    { columnValue: "tableNum1", columnName: "消息主题" },
                    { columnValue: "tableNum2", columnName: "发布时间" },
                ];
                this.tableData = JSON.parse(JSON.stringify(this.tableData));
                this.tableLoading = false;
            }, 500);
        },
        batchCancal() {
            //批量删除
            if (this.selectList.length < 1) {
                this.$message.warning("至少选择一列数据！");
            } else {
                this.$confirm("确定删除？", "提示", {
                    distinguishCancelAndClose: true,
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                })
                    .then(() => {
                        this.$message.success("已删除");
                    })
                    .catch(() => {
                        this.$message.info("已取消");
                    });
            }
        },
        getFormData(data) {
            this.addDialog = false
            console.log(data)
        },
        getSelection(val) {
            this.selectList = val;
        },
    },
    mounted() {
        this.getTableList(); //显示table
    },
    components: {
        Add,
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/SearchTop.scss";
.SystemLog {
    h1 {
        text-align: center;
        color: #34bfc6;
        font-size: 20px;
        font-weight: normal;
        position: relative;
        width: 200px;
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