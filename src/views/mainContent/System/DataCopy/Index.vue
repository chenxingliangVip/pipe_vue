<template>
    <div class="DataCopy">
        <h1 class="header_h1">数据备份</h1>
        <!-- table -->
        <sys-table :isMultipleSelection="false"
            :tableData="tableData"
            :tableLoading="tableLoading"
            :tableHeader="tableHeader"
            :scopeWidth="120"
            :isOperate="false"
            :isPagination="false"
        ></sys-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableLoading: true, //table刷新
            tableData: [
                {
                    tableNum1: "20200101", //备份日期
                    tableNum2: "1123", //数据量（M）
                    tableNum3: "成功", //备份状态
                    tableNum4: "20200101", //完成时间
                },
            ],
            tableHeader: [],
        };
    },
    methods: {
        getTableList() { //获取表格数据
            this.tableLoading = true;
            setTimeout(() => {
                this.tableHeader = [
                    { columnValue: "tableNum1", columnName: "备份日期" },
                    { columnValue: "tableNum2", columnName: "数据量（M）" },
                    { columnValue: "tableNum3", columnName: "备份状态" },
                    { columnValue: "tableNum4", columnName: "完成时间" },
                ];
                this.tableData = JSON.parse(JSON.stringify(this.tableData));
                this.tableLoading = false;
            }, 500);
        },
    },
    mounted() {
        this.getTableList(); //显示table
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/SearchTop.scss";
</style>