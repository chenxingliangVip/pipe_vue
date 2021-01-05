<template>
  <div class="addProject computer_add">
    <div class="addForm zll-form package_form">
      <el-form class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="item_list item_list1">
              <p class="top">
                <img src="@/assets/img/icon1.png">
                <span>水/蒸气热力性质计算</span>
              </p>
              <el-form-item class="formList" label="温度：">
                <el-input clearable class="input_right" placeholder="请输入温度" v-model="formData1.degree"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">℃</span>
              </el-form-item>
              <el-form-item class="formList" label="压力：">
                <el-input clearable class="input_right" placeholder="请输入压力" v-model="formData1.press"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">Mpa(绝压)</span>
              </el-form-item>
              <div class="botton">
                <el-button type="danger" class="comp_botton" round @click="counter1()">热力性质计算</el-button>
              </div>
              <el-form-item class="formList" label="比容：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.br"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">m³/kg</span>
              </el-form-item>
              <el-form-item class="formList" label="比焓：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.bh"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">kJ/kg</span>
              </el-form-item>
              <el-form-item class="formList" label="定压比热容：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.dyrr"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">kJ/(kg·K)</span>
              </el-form-item>
              <el-form-item class="formList" label="动力粘度：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.nd"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">Pa·s</span>
              </el-form-item>
              <el-form-item class="formList" label="饱和压力：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.ps"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">Mpa(绝压)</span>
              </el-form-item>
              <el-form-item class="formList" label="饱和温度：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.ts"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei"> ℃</span>
              </el-form-item>
              <el-form-item class="formList" label="热力状态：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.status"
                          style="width: calc(100% - 59px)"></el-input>
              </el-form-item>
              <el-form-item class="formList" label="饱和水焓：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData1.hs"
                          style="width: calc(100% - 59px)"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item_list item_list1">
              <p class="top">
                <img src="@/assets/img/icon1.png">
                <span>【反推】水/蒸气热力性质计算</span>
              </p>
              <el-form-item class="formList" label="压力：">
                <el-input clearable class="input_right" placeholder="请输入压力" v-model="formData2.press"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">Mpa(绝压)</span>
              </el-form-item>
              <el-form-item class="formList" label="比焓：">
                <el-input clearable class="input_right" placeholder="请输入比焓" v-model="formData2.H"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">kJ/kg</span>
              </el-form-item>
              <div class="botton">
                <el-button type="danger" class="comp_botton" round @click="counter2()">热力性质计算</el-button>
              </div>
              <el-form-item class="formList" label="温度：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData2.t"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">℃</span>
              </el-form-item>
              <el-form-item class="formList" label="饱和温度：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData2.ts"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">℃</span>
              </el-form-item>
              <el-form-item class="formList" label="区域：">
                <el-input clearable class="input_right red" placeholder="" v-model="formData2.status"
                          style="width: calc(100% - 59px)"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item_list item_list2">
              <p class="top">
                <img src="@/assets/img/icon2.png">
                <span>冷凝水损失计算</span>
              </p>
              <el-form-item class="formList" label="疏水器：">
                <el-input clearable class="input_right" placeholder="请输入疏水器" v-model="formData3.rootNum"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">个</span>
              </el-form-item>
              <el-form-item class="formList" label="操作压力：">
                <el-input clearable class="input_right" placeholder="请输入操作压力" v-model="formData3.press"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">Mpa</span>
              </el-form-item>
              <el-form-item class="formList" label="水管管径：">
                <el-input clearable class="input_right" placeholder="请输入水管管径" v-model="formData3.width"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">mm</span>
              </el-form-item>
              <el-form-item class="formList" label="水管长度：">
                <el-input clearable class="input_right" placeholder="请输入水管长度" v-model="formData3.len"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">m</span>
              </el-form-item>
              <div class="botton">
                <el-button type="danger" class="comp_botton" round @click="counter3()">冷凝水损失计算</el-button>
              </div>
              <el-form-item class="formList" label="冷凝水量：">
                <el-input clearable class="input_right blue" placeholder="" v-model="formData3.water"
                          style="width: calc(100% - 59px)"></el-input>
                <span class="danwei">Kg/h</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    props:['isEdit','editData'],
    data() {
      return {
        lns:false,
        formData1: {
          degree: '',
          press: '',
          br: '',
          bh: '',
          dyrr: '',
          nd: '',
          ps: '',
          ts: '',
          status: '',
          hs: '',
        },
        formData2: {
          press: '',
          H: '',
          t: '',
          ts: '',
          status: '',
        },
        formData3: {
          rootNum: '',
          press: '',
          width: '',
          len: '',
          water: '',
        },
      }
    },
    methods: {
      counter1() {
        if (this.formData1.degree == '') {
          this.$message.error('请输入温度!');
          return false
        }
        if (this.formData1.press == '') {
          this.$message.error('请输入压力!');
          return false
        }
        this.computeForm1();
      },
      counter2() {
        if (this.formData2.press == '') {
          this.$message.error('请输入压力!');
          return false
        }
        if (this.formData2.H == '') {
          this.$message.error('请输入比焓!');
          return false
        }
        this.computeForm2();
      },
      counter3() {
        if(!this.isEdit){
          this.$message.error('未创建项目，无法计算冷凝水!');
          return;
        }
        if (this.formData3.rootNum == '') {
          this.$message.error('请输入疏水器!');
          return false
        }
        if (this.formData3.press == '') {
          this.$message.error('请输入操作压力!');
          return false
        }
        if (this.formData3.width == '') {
          this.$message.error('请输入水管管径!');
          return false
        }
        if (this.formData3.length == '') {
          this.$message.error('请输入水管长度!');
          return false
        }
        this.computeForm3();
      },
      computeForm1() {
        let self = this;
        let param = {degree:parseFloat(this.formData1.degree)+273.15,press:parseFloat(this.formData1.press)};
        self.$http({
          url: "/pipe/formula/queryDegreeAndPress",
          method: "post",
          params:param
        }).then(resp => {
          if (resp.success) {
            let result = resp.result;
            for(let k in result){
              self.formData1[k] = result[k];
            }
          }
        });
      },
      computeForm2() {
        let self = this;
        let param = {press:parseFloat(this.formData2.press),ha:parseFloat(this.formData2.H)};
        self.$http({
          url: "/pipe/formula/queryPressAndH",
          method: "post",
          params:param
        }).then(resp => {
          if (resp.success) {
            let result = resp.result;
            for(let k in result){
              self.formData2[k] = result[k];
            }
          }
        });
      },
      computeForm3() {
        let self = this;
        let degree = this.editData.averDegree;
        let averWeed = this.editData.averWind;
        let param = {
          rootNum:parseInt(this.formData3.rootNum),
          press:parseFloat(this.formData3.press),
          width:parseFloat(this.formData3.width),
          length:parseFloat(this.formData3.len),
          degree:parseFloat(degree),
          averWeed:parseFloat(averWeed)
        };
        self.$http({
          url: "/pipe/formula/queryCompute_water",
          method: "post",
          params:param
        }).then(resp => {
          if (resp.success) {
            self.formData3.water = resp.result;
            self.$eventBus.$emit("getHotValue",self.formData3.water);
          }
        });
      },
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/dialog.scss";
  @import "@/assets/style/pageStyle.scss";
</style>
