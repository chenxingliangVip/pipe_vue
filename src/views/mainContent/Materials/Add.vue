<template>
    <div class="addProject package">
        <div class="addForm zll-form package_form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <div class="pack_list pack_list1">
                    <el-row>
                        <el-col :span="3">
                            <div class="logo">基本</div>
                        </el-col>
                        <el-col :span="21">
                            <el-form-item class="formList" prop="name" label="材料名称：">
                                <el-input clearable class="input_right" placeholder="请输入材料名称" v-model.trim="addForm.name"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="density" label="密度Kg/m³：">
                                <el-input clearable class="input_right" placeholder="请输入密度Kg/m³" v-model="addForm.density"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="pack_list">
                    <el-row>
                        <el-col :span="3">
                            <div class="logo">导热</div>
                        </el-col>
                        <el-col :span="21">
                            <el-form-item class="formList" prop="constNum" label="常数项系数：">
                                <el-input clearable class="input_right" placeholder="请输入常数项系数：" v-model="addForm.constNum"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="oneNum" label="一次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入一次项系数" v-model="addForm.oneNum"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="twoNum" label="二次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入二次项系数" v-model="addForm.twoNum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="pack_list">
                    <el-row>
                        <el-col :span="3">
                            <div class="logo">衰减</div>
                        </el-col>
                        <el-col :span="21">
                            <el-form-item class="formList" prop="constNumDesc" label="常数项系数：">
                                <el-input clearable class="input_right" placeholder="请输入常数项系数" v-model="addForm.constNumDesc"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="oneNumDesc" label="一次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入一次项系数" v-model="addForm.oneNumDesc"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="twoNumDesc" label="二次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入二次项系数" v-model="addForm.twoNumDesc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Density, Coefficient,number } from '@/assets/js/verify'
export default {
    props: ['editData'],
    data () {
        return {
            addForm: {
              name: '',
              density: '',
              constNum: '',
              oneNum: '',
              twoNum: '',
              constNumDesc: '',
              oneNumDesc: '',
              twoNumDesc: '',
            },
            rules: {
              name: [
                {required: true, message: '请输入材料名称', trigger: 'blur'},
              ],
              density: [
                {required: true, validator: Density, trigger: 'blur'},
              ],
              constNum: [
                {required: true, validator: number, trigger: 'blur'},
              ],
              oneNum: [
                {required: true, validator: number, trigger: 'blur'},
              ],
              twoNum: [
                {required: true, validator: number, trigger: 'blur'},
              ],
              constNumDesc: [
                {required: true, validator: number, trigger: 'blur'},
              ],
              oneNumDesc: [
                {validator: number, trigger: 'blur'},
              ],
              twoNumDesc: [
                {validator: number, trigger: 'blur'},
              ]
            },
        }
    },
    methods: {
        setFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm',this.addForm)
                }else {
                    return false
                }
            })
        },
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
