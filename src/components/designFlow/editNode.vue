<template>
    <div>
        <p class="type_title">{{ typeTitle }}</p>
        <el-form :model="node" ref="dataForm" label-width="80px" class="flowEditForm margin13" size="mini">
            <div v-if="node.Type == 1">
                <el-form-item label="编号：" class="floatForm">
                    <el-input v-model="node.id"></el-input>
                </el-form-item>
                <el-form-item label="名称：" class="floatForm">
                    <el-input v-model="node.label"></el-input>
                </el-form-item>
                <el-form-item label="温度：" class="floatForm">
                    <el-input v-model="node.temperature" style="width: calc(100% - 40px)"></el-input>
                    <span>℃ </span>
                </el-form-item>
                <el-form-item label="压力：" class="floatForm">
                    <el-input v-model="node.pressure" style="width: calc(100% - 100px)"></el-input>
                    <span>Mpa（绝压）</span>
                </el-form-item>
                <el-form-item class="floatForm">
                    <el-button round class="button_list sure" @click="Submit('dataForm', node.Type)">修 改</el-button>
                </el-form-item>
                <div class="clearBoth"></div>
            </div>
            <div v-if="node.Type == 2">
                <el-form-item label="编号：" class="floatForm">
                    <el-input v-model="node.id"></el-input>
                </el-form-item>
                <el-form-item label="名称：" class="floatForm">
                    <el-input v-model="node.label"></el-input>
                </el-form-item>
                <el-form-item class="floatForm">
                    <el-button round class="button_list sure" @click="Submit('dataForm', node.Type)">修 改</el-button>
                </el-form-item>
                <div class="clearBoth"></div>
            </div>
            <div v-if="node.Type == 3" class="user_nav">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="编号：">
                            <el-input v-model="node.id"></el-input>
                        </el-form-item>
                        <el-form-item label="名称：">
                            <el-input v-model="node.label"></el-input>
                        </el-form-item>
                        <el-form-item label="温度：">
                            <el-input v-model="node.temperature" style="width: calc(100% - 40px)"></el-input>
                            <span>℃ </span>
                        </el-form-item>
                        <el-form-item label="压力：">
                            <el-input v-model="node.pressure" style="width: calc(100% - 40px)"></el-input>
                            <span>Mpa</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" class="middle_flex">
                       <div class="buttonnav">
                            <el-button round class="button_list sure" @click="Submit('dataForm', node.Type)">修 改</el-button>
                            <el-button round class="button_list set" @click="setLoad()">24h负载设置</el-button>
                            <el-button round class="button_list log" @click="logResult()" v-show="isShow">用户输出结果</el-button>
                            <el-button round  type="info" class="button_list" disabled v-show="!isShow">用户输出结果</el-button>
                       </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="echart" ref="echart"></div>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>

<script>
	import echartOption from '@/views/DesignPage/echartOption.js'
    export default {
        name:'editNode',
        props: {
            isShowEchart: { 
                default: function() {
                    return false;
                },
                type: Boolean
            },
        },
        data() {
            return {
                isShow: false,
                typeTitle: '',
                node: {},
                TypeList: [{ Value: 1, Text: '起点' }, { Value: 2, Text: '终点' }, { Value: 3, Text: '人工活动' }, { Value: 4, Text: '自由活动' }],
            }
        },
        methods: {
            init(data, id) {
                data.nodeList.filter((node) => {
                    if (node.id === id) {
                        this.node = node;
                    }
                })
                if(this.node.Type == 1){
                    this.typeTitle = '热源参数设定'
                } else if( this.node.Type == 2 ) {
                    this.typeTitle = '分支节点设定'
                } else if( this.node.Type == 3 ) {
                    this.typeTitle = '用户参数及24h流量'
                }
            },
            Submit(formName, type) {
                this.$message.success('提交成功!');
                console.log(this.node)
            },
            setLoad() {//24h负载设置
                this.$emit('LoadSet', true)
            },
            logResult() {//用户输出结果
                this.$emit('showLog', true)
            },
			getEchartData() {  //echart
				let echart = this.$echarts.init(this.$refs.echart);
				echart.setOption(echartOption.option)
			},
        },
        watch: {
            isShowEchart(val) {
                if(val) {
                    this.getEchartData() 
                }
            }
        },
        mounted() {
            if(this.isShowEchart == true) {
                this.getEchartData() 
            }
        }
    }
</script>

<style scoped>
.type_title {
    font-size: 16px;
    line-height: 35px;
    background-color: #9bc9f5;
    padding-left: 40px;
    color: #333;
    position: relative;
}
.type_title::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #333;
    position: absolute;
    top: 12px;
    left: 20px;
}
.flowEditForm {
    padding: 10px;
}
.floatForm {
    float: left;
    margin-bottom: 10px !important;
}
.user_nav .middle_flex {
    display: flex;
    align-items: center;
    justify-content: center; 
}
.user_nav .middle_flex .buttonnav {
    width: 120px;
}
.user_nav .middle_flex .button_list {
    padding: 10px;
    width: 120px;
    margin: 0 auto;
    color: #fff;
    margin-bottom: 20px;
    font-size: 14px;
}
.user_nav .middle_flex .button_list.sure {
    background: #409eff;
}
.user_nav .middle_flex .button_list.set {
    background: #E6A23C;
}
.user_nav .middle_flex .button_list.log {
    background: #67C23A;
}
.user_nav .echart {
    width: 100%;
    height: 200px;
}
.button_list.sure {
    padding: 10px;
    width: 120px;
    margin: 0 auto;
    color: #fff;
    background: #409eff;
    font-size: 14px;
}
</style>