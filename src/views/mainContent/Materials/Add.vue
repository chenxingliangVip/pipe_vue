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
                            <el-form-item class="formList" prop="addformdata1" label="材料名称：">
                                <el-input clearable class="input_right" placeholder="请输入材料名称" v-model.trim="addForm.addformdata1"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addformdata2" label="密度Kg/m³：">
                                <el-input clearable class="input_right" placeholder="请输入密度Kg/m³" v-model="addForm.addformdata2"></el-input>
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
                            <el-form-item class="formList" prop="addformdata3" label="常数项系数：">
                                <el-input clearable class="input_right" placeholder="请输入常数项系数：" v-model="addForm.addformdata3"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addformdata4" label="一次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入一次项系数" v-model="addForm.addformdata4"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addformdata5" label="二次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入二次项系数" v-model="addForm.addformdata5"></el-input>
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
                            <el-form-item class="formList" prop="addformdata6" label="常数项系数：">
                                <el-input clearable class="input_right" placeholder="请输入常数项系数" v-model="addForm.addformdata6"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addformdata7" label="一次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入一次项系数" v-model="addForm.addformdata7"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addformdata8" label="二次项系数：">
                                <el-input clearable class="input_right" placeholder="请输入二次项系数" v-model="addForm.addformdata8"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Density, Coefficient } from '@/assets/js/verify'
export default {
    props: ['editData'],
    data () {
        return {
            addForm: { 
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
                addformdata5: '',
                addformdata6: '',
                addformdata7: '',
                addformdata8: '',
            },
            rules: {
                addformdata1:[
                    { required: true, message: '请输入材料名称', trigger: 'blur' },
                ],
                addformdata2:[
                    { required: true, validator: Density, trigger: 'blur' },
                ],
                addformdata3:[
                    { required: true, validator: Coefficient, trigger: 'blur' },
                ],
                addformdata4:[
                    { required: true, validator: Coefficient, trigger: 'blur' },
                ],
                addformdata5:[
                    { required: true, validator: Coefficient, trigger: 'blur' },
                ],
                addformdata6:[
                    { validator: Coefficient, trigger: 'blur' },
                ],
                addformdata7:[
                    { validator: Coefficient, trigger: 'blur' },
                ],
                addformdata8:[
                    { validator: Coefficient, trigger: 'blur' },
                ],
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
        this.addForm.addformdata1 = this.editData.tableNum1
        this.addForm.addformdata2 = this.editData.tableNum2
        this.addForm.addformdata3 = this.editData.tableNum3
        this.addForm.addformdata4 = this.editData.tableNum4
        this.addForm.addformdata5 = this.editData.tableNum5
        this.addForm.addformdata6 = this.editData.tableNum6
        this.addForm.addformdata7 = this.editData.tableNum7
        this.addForm.addformdata8 = this.editData.tableNum8
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    @import "@/assets/style/pageStyle.scss";
</style>
