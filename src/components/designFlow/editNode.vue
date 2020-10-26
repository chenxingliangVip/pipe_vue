<template>
  <div>
    <p class="type_title">{{ typeTitle }}</p>
    <el-form :model="node" ref="dataForm" label-width="80px" class="flowEditForm margin13" size="mini">
      <div v-if="node.Type == 1">
        <el-form-item label="编号：" class="floatForm">
          <el-input v-model="node.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称：" class="floatForm">
          <el-input v-model="node.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="温度：" class="floatForm">
          <el-input v-model="node.temperature"  style="width: calc(100% - 40px)"></el-input>
          <span>℃ </span>
        </el-form-item>
        <el-form-item label="压力：" class="floatForm">
          <el-input v-model="node.pressure"   style="width: calc(100% - 100px)"></el-input>
          <span>Mpa（绝压）</span>
        </el-form-item>
        <!--<el-form-item class="floatForm">-->
          <!--<el-button round class="button_list sure" @click="Submit('dataForm', node.Type)">修 改</el-button>-->
        <!--</el-form-item>-->
        <div class="clearBoth"></div>
      </div>
      <div v-if="node.Type == 2">
        <el-form-item label="编号：" class="floatForm">
          <el-input v-model="node.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称：" class="floatForm">
          <el-input v-model="node.name" disabled></el-input>
        </el-form-item>
        <!--<el-form-item class="floatForm">-->
          <!--<el-button round class="button_list sure" @click="Submit('dataForm', node.Type)">修 改</el-button>-->
        <!--</el-form-item>-->
        <div class="clearBoth"></div>
      </div>
      <div v-if="node.Type == 3" class="user_nav">
        <el-row>
          <el-col :span="4">
            <el-form-item label="编号：">
              <el-input v-model="node.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称：">
              <el-input v-model="node.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="温度：" >
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
              <!--<el-button round class="button_list sure" @click="Submit('dataForm', node.Type)">修 改</el-button>-->
              <el-button round class="button_list set" @click="setLoad()">24h负载设置</el-button>
              <el-button round class="button_list log" @click="logResult()">用户输出结果</el-button>
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
    name: 'editNode',
    props: {
      isShowEchart: {
        default: function () {
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
        TypeList: [{Value: 1, Text: '起点'}, {Value: 2, Text: '终点'}, {Value: 3, Text: '人工活动'}, {Value: 4, Text: '自由活动'}],
      }
    },
    methods: {
      init(data, id) {
        let self = this;
        let isShowEchart = false;
        data.nodeList.filter((node) => {
          if (node.id === id) {
            self.node = node;
            isShowEchart = this.node.isShowEchart?true:false;
          }
        });

        if (self.node.Type == 1) {
          self.typeTitle = '热源参数设定';
          if(!this.node.temperature){
            self.$set(this.node, "temperature", "");
          }
          if(!self.node.pressure){
            self.$set(this.node, "pressure", "");
          }
        } else if (self.node.Type == 2) {
          self.typeTitle = '分支节点设定'
        } else if (self.node.Type == 3) {
          if(isShowEchart){
            self.getEchartData();
          }else{
            self.$nextTick(() => {
              let echart = self.$echarts.init(self.$refs.echart);
              echartOption.option.series[0].data = [];
              echart.setOption(echartOption.option)
            })
          }
          if(!self.node.temperature){
            self.$set(this.node, "temperature", "");
          }
          if(!self.node.pressure){
            self.$set(this.node, "pressure", "");
          }
          self.typeTitle = '用户参数及24h流量'
        }
      },
      Submit(formName, type) {
        let flag = false;
        flag = this.number(this.node.temperature);
        if(flag){
          this.number(this.node.pressure);
        }
        if(flag){
          this.$message.success('修改成功!');
        }
      },
      setLoad() {//24h负载设置

        this.$emit('LoadSet', this.node);
      },
      logResult() {//用户输出结果
        this.$emit('showLog', true)
      },
      getEchartData() {  //echart
        let echart = this.$echarts.init(this.$refs.echart);
        let table  = this.node.table;
        for(let key in table){
          let value = table[key];
          if(value){
            echartOption.option.series[0].data[key] = value;
          }else{
            echartOption.option.series[0].data[key] = 0;
          }
        }
        echart.setOption(echartOption.option)
      },
      number(value) {
        if(!value){
          this.$message.error('请输入数字!');
          return false;
        }
        if (value && (!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(value))) {
          this.$message.error('请输入数字!');
          return false;
        }
        return true;
      }
    },
    watch: {
      isShowEchart(val) {
        if (val) {
          this.getEchartData()
        }
      }
    },
    mounted() {
      // if (this.isShowEchart == true) {
      //   this.getEchartData()
      // }
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
    padding: 8px;
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
    padding: 8px;
    width: 120px;
    margin: 0 auto;
    color: #fff;
    background: #409eff;
    font-size: 14px;
  }
</style>
