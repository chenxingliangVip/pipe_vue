<template>
    <div class="FirstPage">
        <h1>信息公告</h1>
        <div class="message">
            <div class="listNav" v-for="(item,index) in list" :key="index" :class="{ 'isread': !item.isread }" @click="goDetail">
                <el-row class="item">
                    <el-col :span="5">
                        <p class="tableTime">{{ item.time }}</p>
                    </el-col>
                    <el-col :span="16">
                        <p class="tableTxt">{{ item.txt }}</p>
                    </el-col>
                    <el-col :span="3">
                        <p class="tableDept">{{ item.dept }}</p>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="zll-dialog">
            <popout title="查看通知" :visible.sync="detailDialog" v-if="detailDialog">
                <Detail ref="detail" slot="content" ></Detail>
                <template slot="bottom">
                    <p class="zll-botton" @click="detailDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import Detail from './detail'
export default {
    data() {
        return {
            detailDialog: false,
            list: [{
                time: '2020-02-22 11:11:11',
                txt: '优秀员工通知优秀员工通知',
                dept: '技术部',
                isread: false,
            }, {
                time: '2020-02-22 11:11:11',
                txt: '优秀员工通知优秀员工通知',
                dept: '技术部',
                isread: true,
            }],
        };
    },
    methods: {
        goDetail(){
            this.detailDialog = true
        },
    },
    components: {
        Detail
    },
    
};
</script>
<style scoped lang="scss">
    .FirstPage {
        margin: 0 50px;
        h1 {
            text-align: center;
            color: #1397de;
            font-size: 20px;
            font-weight: normal;
            position: relative;
            width: 100px;
            margin: 0 auto;
            padding-bottom: 50px;
        }
        .message {
            padding: 20px 30px;    
            box-shadow: 0 0 10px #ccc;
        }
        .listNav {
            .item {
                color: #666666;
                cursor: pointer;
                transition: all 0.3s;
                &:hover {
                    color: #1397de ;
                }
            }
            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 8px 10px;
            }
            &.isread .item {
                color: #1397de ;
            }
        }
    }
</style>
