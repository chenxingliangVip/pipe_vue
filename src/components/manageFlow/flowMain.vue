<template>
    <div class="appcontainer" v-loading="loading">
        <div class="flow-menu">
            <div class="menu-item" :class="{ 'nodrop' : isGoDetail }">
                <img class="imgsrc" src="@/assets/img/xm.png" v-show="!isGoDetail">
                <img class="imgsrc" src="@/assets/img/xm2.png" v-show="isGoDetail">
                <div>项目</div>
            </div>
            <hr style="margin-bottom: 20px" />
            <div class="menu-item item2" v-for="(item, index) in navList" :key="index">
                <div :class="{ 'isGodetail' : !isGoDetail }" v-show="!isGoDetail">
                    <img class="imgsrc" :src="item.noDropImg">
                    <div>{{item.name}}</div>
                </div>
                <div v-show="isGoDetail" @click="goPage(item.name)">
                    <img class="imgsrc" :src="item.img">
                    <div>{{item.name}}</div>
                </div>
            </div>
        </div>
        <div class="page_right">
            <div class="add_design">
                <div class="nav-item close">{{ name }}</div>
                <div class="middle">
                    <div class="nav-item close" @click="closeProject()"  v-show="isGoDetail">
                        <img src="@/assets/img/close.png"> 
                        <span>关闭</span>
                    </div>
                </div>
            </div>
            <div class="project_table" v-show="!isGoDetail">
                <sys-table  
                    :isMultipleSelection="false" 
                    :tableData="tableData" 
                    :tableLoading="tableLoading" 
                    :tableHeader="tableHeader"
                    :scopeWidth="120"
                >
                    <template slot-scope="scope" slot="operate">
                        <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </sys-table>
            </div>
            <div class="project_table" v-show="isGoDetail">
                <div v-if="pageType == '项目信息'">
                    <project-info></project-info>
                </div>
                <div v-else>
                    <analyze></analyze>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import ProjectInfo from "@/views/ManagePage/ProjectInfo.vue";
import Analyze from "@/views/ManagePage/Analyze.vue";
export default {
    name: "flowMain",
    data() {
        return {
            name: '',
            pageType: '项目信息',
            isGoDetail: false,
            loading: false,
            navList: [
                {
                    name: "项目信息",
                    img: require("@/assets/img/xmxinxi.png"),
                    noDropImg: require("@/assets/img/xmxinxi2.png"),
                    isShow: false,
                }, {
                    name: "统计分析",
                    img: require("@/assets/img/tongji.png"),
                    noDropImg: require("@/assets/img/tongji2.png"),
                    isShow: false,
                },
            ],
            tableLoading:true, //table刷新
            tableData: [{
                tableNum1: 'P20090004',//项目编号
                tableNum2: '项目名称',//项目名称
                tableNum3: '客户名称',//客户名称
                tableNum4: '吴然',//设计
                tableNum5: '周瑾',//校核
                tableNum6: '李美然',//审核
                tableNum7: '徐峰',//批准
            }],
            tableHeader:[],
        };
    },
    components: {
        ProjectInfo, Analyze
    },
    created() {},
    mounted() {
        this.loading = true
        this.getTableList();//显示table
        setTimeout(() => {
            this.loading = false
        }, 500)
    },
    methods: {
        getTableList(){//获取表格数据
            this.tableLoading = true;
            setTimeout(()=>{
                this.tableHeader =  [
                    {"columnValue": "tableNum1", "columnName": "项目编号", },
                    {"columnValue": "tableNum2", "columnName": "项目名称",},
                    {"columnValue": "tableNum3", "columnName": "客户名称"},
                    {"columnValue": "tableNum4", "columnName": "设计", width: 100 },
                    {"columnValue": "tableNum5", "columnName": "校核", width: 100 },
                    {"columnValue": "tableNum6", "columnName": "审核", width: 100 },
                    {"columnValue": "tableNum7", "columnName": "批准", width: 100 },
                ]
                this.tableData = JSON.parse(JSON.stringify(this.tableData))
                this.tableLoading = false;
            },500)
        },
        closeProject() {
            this.isGoDetail = false
            this.name = ''
            localStorage.removeItem('goDetail')
        },
        goDetail(val) {
            this.isGoDetail = true
            this.name = val.tableNum3 + ' ' + val.tableNum2 + ' ' + val.tableNum1
            localStorage.setItem('goDetail', this.isGoDetail) 
        },
        goPage(val) {
            this.pageType = val
        }
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/design.scss';
.appcontainer {
    display: flex;
    height: calc(100vh - 50px);
    color: #606266;
}
.flow-detail {
    flex: 1;
    border: 1px solid #ebeef5;
    padding: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
    border-radius: 4px;
    position: relative;
    height: 100% !important;

    // background: -webkit-linear-gradient(top,transparent 39px,#dedede 40px),-webkit-linear-gradient(left,transparent 39px,#dedede 40px);
    // background-size: 40px 40px;
}

#flowContent {
    width: 100%;
    height: 100%;
    position: relative;
}

.item {
    position: absolute;
    width: 60px;
    height: 90px;
    border: 1px solid #007aff;
}

.flow-menu {
    width: 100px;
    background: #284358;
    padding: 10px;
    word-break: break-all;
    height: 100%;
    overflow-y: scroll;
}
*::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
    -webkit-appearance: none;
}
*::-webkit-scrollbar-thumb {
    height: 4px;
    border: 1px solid transparent;
    border-top: 0;
    border-bottom: 0;
    border-radius: 4px;
    background-color: #ccc;
    background-clip: padding-box;
}
.menu-item {
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;
    color: #ffffff;
    padding: 5px 0;
    .imgsrc {
        width: 45px;
        height: 45px;
        margin-bottom: 3px;
    }
}
.project_table {
    padding: 20px;
}
.menu-item .isGodetail {
    color: #bfbfbf;
    cursor: no-drop;
}
</style>
