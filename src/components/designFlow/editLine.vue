<template>
  <div class="line_form">
    <p class="type_title">管道参数设定</p>
    <el-form :model="line" ref="dataForm" label-width="90px" class="flowEditForm margin13 pipes" size="mini">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="敷设方式：">
            <el-select v-model="line.psType" placeholder="" style="width: calc(100% - 40px)">
              <el-option label="架空" value="1"></el-option>
              <el-option label="地埋" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管道外径：">
            <el-input v-model="line.pipeOutside" style="width: calc(100% - 40px)"></el-input>
            <span>mm</span>
          </el-form-item>
          <el-form-item label="管道壁厚：">
            <el-input v-model="line.pipeWidth" style="width: calc(100% - 40px)"></el-input>
            <span>mm</span>
          </el-form-item>
          <el-form-item label="管道长度：">
            <el-input v-model="line.pipeSize" style="width: calc(100% - 40px)"></el-input>
            <span>m</span>
          </el-form-item>
          <el-form-item label="局部阻系数：">
            <el-input v-model="line.localNum" style="width: calc(100% - 40px)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="空气层外径：">
            <el-input v-model="line.airOutside" style="width: calc(100% - 40px)"></el-input>
            <span>mm</span>
          </el-form-item>
          <el-form-item label="压降系数：">
            <el-input v-model="line.pressNum" style="width: calc(100% - 40px)"></el-input>
          </el-form-item>
          <el-form-item label="温降系数：">
            <el-input v-model="line.degreeNum" style="width: calc(100% - 40px)"></el-input>
          </el-form-item>
          <el-form-item label="保温层数：">
            <el-select v-model="line.degreeLevel" @change="watchLevel" placeholder="" style="width: calc(100% - 40px)">
              <el-option v-for="index of levels " :label="index" :value="index" :key="index" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="换热系数：">
            <el-input v-model="line.pipeName" style="width: calc(100% - 40px)" disabled></el-input>
          </el-form-item>
          <el-form-item label="管道名称：">
            <el-input v-model="line.pipeName" style="width: calc(100% - 40px)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="echart">
            <img src="@/assets/img/ceng.png">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table_ceng">
            <table border="1">
              <tr>
                <th width="12%">层数</th>
                <th width="40%">材质</th>
                <th width="28%">是否反射层</th>
                <th width="20%">厚度mm</th>
              </tr>
              <tr v-for="(item , index) in line.pipeLineMaterials"  :key="index">
                <td width="12%">{{ index + 1 }}</td>
                <td width="40%">
                  <el-select v-model="item.materialType" placeholder="请选择材质" @change="materialChange(item)">
                    <el-option :value="item.id" :label="item.name" v-for="(item,index) in filterMaterial(materials,item)"  :key="index"></el-option>
                  </el-select>
                </td>
                <td width="28%">
                  <el-select v-model="item.reflect" placeholder="请选择是或否" @change="reflectChange(item)">
                    <el-option value="1" label="是"></el-option>
                    <el-option value="2" label="否"></el-option>
                  </el-select>
                </td>
                <td width="20%">
                  <el-input v-model="item.lineWidth"></el-input>
                </td>
              </tr>
            </table>
          </div>
        </el-col>
        <el-col :span="3" class="middle_flex">
          <div class="buttonnav">
            <!--<el-button round class="button_list sure"  @click="Submit('dataForm')">修 改</el-button>-->
            <el-button round class="button_list set" @click="logResult()">管线输出结果</el-button>
            <el-button round  type="info" class="button_list" @click="checkResult()">查看输出结果</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'editLine',
    data() {
      return {
        isShow: false,
        materials:[],
        line: {
          psType:"",
          pipeOutside:"",
          pipeWidth:"",
          pipeSize:"",
          localNum:"",
          airOutside:"",
          pressNum:"",
          degreeNum:"",
          degreeLevel:"",
          pipeName: "",
          pipeLineMaterials:[],
        },
        levels:6,
      }
    },
    watch: {

    },
    mounted(){
      this.getMaterials();
    },
    methods: {
      filterMaterial(materials,item){
        let reflect = item.reflect;
        let array = materials.filter(m => m.reflect == reflect );
        return array;
      },
      reflectChange(item){
        item.materialType = "";
      },
      materialChange(item){
        for(let m of this.materials){
          if(item.materialType == m.id){
            item.materialName = m.name;
          }
        }
      },
      getMaterials() {
        let self = this;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/material/queryMaterialList",
          method: "post",
        }).then(resp => {
          if (resp.success) {
            self.materials = resp.result;
          }
        });
      },

      init(item) {
        console.log("---------line init----------");
        this.line = item;
        console.log(this.line);
        if(!this.line.pipeLineMaterials||this.line.pipeLineMaterials.length == 0){
          this.$set(this.line,"pipeLineMaterials",[]);
          this.watchLevel();
        }
      },
      Submit(formName) {
        this.$message.success('提交成功!');

      },
      watchLevel(){
        let level = this.line.degreeLevel;
        this.line.pipeLineMaterials = [];
        for(let i = 0;i<level;i++){
          let item = {level:(i+1)+"",materialType:"",reflect:"1",lineWidth:"",materialName:""};
          this.line.pipeLineMaterials.push(item);
        }
      },
      logResult() {
        this.$emit("lineCompute",this.line);
      },
      checkResult() {
        this.$emit('checkResult', this.line)
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

  .echart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 240px;
  }

  .echart img {
    width: 100%;
  }

  .table_ceng table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ffffff;
    text-align: center;
    table-layout: fixed;
  }

  .table_ceng table th {
    background: #d2deef;
    padding: 3px;
    font-weight: normal;
    height: 26px;
    line-height: 26px;
  }

  .table_ceng table td {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .table_ceng table tr {
    background: #eaeff7;
  }

  .middle_flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 240px;
  }

  .middle_flex .buttonnav {
    width: 120px;
  }

  .middle_flex .button_list {
    padding: 8px;
    width: 120px;
    margin: 0 auto;
    color: #fff;
    margin-bottom: 20px;
  }

  .middle_flex .button_list.sure {
    background: #409eff;
  }

  .middle_flex .button_list.set {
    background: #67C23A;
  }
</style>
