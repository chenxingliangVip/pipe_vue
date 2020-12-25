<template>
  <div class="addProject package">
    <div class="addForm zll-form">
      <el-form :model="setForm" ref="setForm" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item class="formList" prop="addformdata1" label="编号：">
              <el-input clearable class="input_right" placeholder="请输入编号" v-model="setForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="addformdata2" label="名称：">
              <el-input clearable class="input_right" placeholder="请输入名称" v-model="setForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="formList" prop="addformdata3" label="温度：">
              <el-input clearable class="input_right" placeholder="请输入温度" v-model="setForm.temperature" disabled
                        style="width: calc(100% - 100px)"></el-input>
              <span class="danwei"> ℃</span>
            </el-form-item>
            <el-form-item class="formList" prop="addformdata4" label="压力：">
              <el-input clearable class="input_right" placeholder="请输入压力" v-model="setForm.pressure" disabled
                        style="width: calc(100% - 100px)"></el-input>
              <span class="danwei"> Mpa（绝压）</span>
            </el-form-item>
            <el-form-item class="formList" prop="addformdata4" label="输出小时：">
                <el-select clearable class="input_right"  v-model="setForm.pressure" placeholder="请输入输出小时" disabled style="width: calc(100% - 100px)">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                </el-select>
              <span class="danwei"> 时</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tableList">
          <table border="1">
            <tr>
              <th>0时</th>
              <th>1时</th>
              <th>2时</th>
              <th>3时</th>
              <th>4时</th>
              <th>5时</th>
              <th>6时</th>
              <th>7时</th>
              <th>8时</th>
              <th>9时</th>
              <th>10时</th>
              <th>11时</th>
            </tr>
            <tr class="set_Table">
              <td>
                <el-input clearable v-model="setForm.table['0']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['1']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['2']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['3']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['4']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['5']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['6']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['7']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['8']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['9']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['10']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['11']" placeholder=""></el-input>
              </td>
            </tr>
            <tr>
              <th>12时</th>
              <th>13时</th>
              <th>14时</th>
              <th>15时</th>
              <th>16时</th>
              <th>17时</th>
              <th>18时</th>
              <th>19时</th>
              <th>20时</th>
              <th>21时</th>
              <th>22时</th>
              <th>23时</th>
            </tr>
            <tr class="add_Table">
              <td>
                <el-input clearable v-model="setForm.table['12']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['13']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['14']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['15']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['16']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['17']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['18']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['19']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['20']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['21']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['22']" placeholder=""></el-input>
              </td>
              <td>
                <el-input clearable v-model="setForm.table['23']" placeholder=""></el-input>
              </td>
            </tr>
          </table>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loadSetData: {
        default: function () {
          return {};
        },
        type: Object
      },
    },
    data() {
      return {
        setForm: {
          id: '',
          name: '',
          temperature: '',
          pressure: '',
          table: {

          }
        },
      }
    },
    methods: {
      initTable(){
        for(let i = 0;i<24;i++){
          let key = i+"";
          this.$set(this.setForm.table, key, 0);
        }
      },
      setFormData(formName) {
        let flag = false;
        for(let i = 0;i<24;i++){
           if(this.setForm.table[i+""]!=0){
             flag = true;
           }
        }
        if(!flag){
          this.$message.error('请检查24小时负载数据是否异常!');
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('setForm', this.setForm)
          } else {
            return false
          }
        })
      },
    },
    watch: {
      loadSetData(val) {
        console.log(val)
        this.setForm = val;
        if(!this.setForm.table){
          this.$set(this.setForm, "table", {});
          this.initTable();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/dialog.scss";
  @import "@/assets/style/pageStyle.scss";
</style>
