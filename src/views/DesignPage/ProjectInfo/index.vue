<template>
  <div class="addProject package">
    <div class="addForm zll-form package_form">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item class="formList" prop="custom" label="客户名称：">
              <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.custom" disabled></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="programName" label="项目名称：">
              <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.programName" disabled></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="acuteValue" label="管线计算精度：">
              <el-input clearable class="input_right" placeholder="请输入管线计算精度" v-model="addForm.acuteValue" disabled
                        style="width: calc(100% - 60px)"></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="rough" label="管道等值粗糙度：">
              <el-input clearable class="input_right" placeholder="请输入管道等值粗糙度" v-model="addForm.rough" disabled
                        style="width: calc(100% - 60px)"></el-input>
              <span class="danwei">mm</span>
            </el-form-item>
            <el-form-item class="formList" style="height: 15px"></el-form-item>
            <el-form-item class="formList" prop="designer" label="设计：">
              <el-input clearable class="input_right" placeholder="请输入设计" v-model="addForm.designer" disabled></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="checker" label="校对：">
              <el-input clearable class="input_right" placeholder="请输入校对" v-model="addForm.checker" disabled></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="examiner" label="审查：">
              <el-input clearable class="input_right" placeholder="请输入审查" v-model="addForm.examiner" disabled></el-input>
            </el-form-item>
            <el-form-item class="formList" prop="approver" label="审批：">
              <el-input clearable class="input_right" placeholder="请输入审批" v-model="addForm.approver" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="pack_list pack_list1">
              <el-row>
                <el-col :span="3">
                  <div class="logo">架空</div>
                </el-col>
                <el-col :span="21">
                  <el-form-item class="formList" prop="averDegree" label="环境温度：">
                    <el-input clearable class="input_right" placeholder="请输入环境温度" v-model="addForm.averDegree" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">℃</span>
                  </el-form-item>
                  <el-form-item class="formList" prop="averWind" label="平均风速：">
                    <el-input clearable class="input_right" placeholder="请输入平均风速" v-model="addForm.averWind" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">m/s</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="pack_list">
              <el-row>
                <el-col :span="3">
                  <div class="logo">地理</div>
                </el-col>
                <el-col :span="21">
                  <el-form-item class="formList" prop="airDegree" label="空气温度：">
                    <el-input clearable class="input_right" placeholder="请输入空气温度：" v-model="addForm.airDegree" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">℃</span>
                  </el-form-item>
                  <el-form-item class="formList" prop="groundDegree" label="土壤温度：">
                    <el-input clearable class="input_right" placeholder="请输入土壤温度" v-model="addForm.groundDegree" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">℃</span>
                  </el-form-item>
                  <el-form-item class="formList" prop="groundDeep" label="土壤深度：">
                    <el-input clearable class="input_right" placeholder="请输入土壤深度" v-model="addForm.groundDeep" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">m</span>
                  </el-form-item>
                  <el-form-item class="formList" prop="groundHeat" label="土壤导热系数：">
                    <el-input clearable class="input_right" placeholder="请输入土壤导热系数" v-model="addForm.groundHeat" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">W/(m·K)</span>
                  </el-form-item>
                  <el-form-item class="formList" prop="airHeat" label="空气导热系数：">
                    <el-input clearable class="input_right" placeholder="请输入空气导热系数" v-model="addForm.airHeat" disabled
                              style="width: calc(100% - 60px)"></el-input>
                    <span class="danwei">W/(m·K)</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['editData'],
    data() {
      return {
        addForm: {
          custom: '',
          programName: '',
          acuteValue: '',
          rough: '',
          designer: '',
          checker: '',
          examiner: '',
          approver: '',
          averDegree: '',
          averWind: '',
          airDegree: '',
          groundDegree: '',
          groundDeep: '',
          groundHeat: '',
          airHeat: '',
        },
        rules: {},
      }
    },
    methods: {

    },
    mounted() {
      this.addForm = this.editData;
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/dialog.scss";
  @import "@/assets/style/pageStyle.scss";
</style>
