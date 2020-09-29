<template>
    <div class="addProject package">
        <div class="addForm zll-form package_form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata1" label="客户名称：">
                            <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.addformdata1"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata2" label="项目名称：">
                            <el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.addformdata2"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata3" label="管线计算精度：">
                            <el-input clearable class="input_right" placeholder="请输入管线计算精度" v-model="addForm.addformdata3" style="width: calc(100% - 60px)"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata4" label="管道等值粗糙度：">
                            <el-input clearable class="input_right" placeholder="请输入管道等值粗糙度" v-model="addForm.addformdata4" style="width: calc(100% - 60px)"></el-input> 
                            <span class="danwei">mm</span>
                        </el-form-item>
                        <el-form-item class="formList" style="height: 15px"></el-form-item>
                        <el-form-item class="formList" prop="addformdata5" label="设计：">
                            <el-input clearable class="input_right" placeholder="请输入设计" v-model="addForm.addformdata5"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata6" label="校对：">
                            <el-input clearable class="input_right" placeholder="请输入校对" v-model="addForm.addformdata6"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata7" label="审查：">
                            <el-input clearable class="input_right" placeholder="请输入审查" v-model="addForm.addformdata7"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata8" label="审批：">
                            <el-input clearable class="input_right" placeholder="请输入审批" v-model="addForm.addformdata8"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="pack_list pack_list1">
                            <el-row>
                                <el-col :span="3">
                                    <div class="logo">架空</div>
                                </el-col>
                                <el-col :span="21">
                                    <el-form-item class="formList" prop="addformdata9" label="环境温度：">
                                        <el-input clearable class="input_right" placeholder="请输入环境温度" v-model="addForm.addformdata9" style="width: calc(100% - 60px)"></el-input> 
                                        <span class="danwei">℃</span>
                                    </el-form-item>
                                    <el-form-item class="formList" prop="addformdata10" label="平均风速：">
                                        <el-input clearable class="input_right" placeholder="请输入平均风速" v-model="addForm.addformdata10" style="width: calc(100% - 60px)"></el-input> 
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
                                    <el-form-item class="formList" prop="addformdata11" label="空气温度：">
                                        <el-input clearable class="input_right" placeholder="请输入空气温度：" v-model="addForm.addformdata11" style="width: calc(100% - 60px)"></el-input>
                                        <span class="danwei">℃</span>
                                    </el-form-item>
                                    <el-form-item class="formList" prop="addformdata12" label="土壤温度：">
                                        <el-input clearable class="input_right" placeholder="请输入土壤温度" v-model="addForm.addformdata12" style="width: calc(100% - 60px)"></el-input>
                                        <span class="danwei">℃</span>
                                    </el-form-item>
                                    <el-form-item class="formList" prop="addformdata13" label="土壤深度：">
                                        <el-input clearable class="input_right" placeholder="请输入土壤深度" v-model="addForm.addformdata13" style="width: calc(100% - 60px)"></el-input>
                                        <span class="danwei">m</span>
                                    </el-form-item>
                                    <el-form-item class="formList" prop="addformdata14" label="土壤导热系数：">
                                        <el-input clearable class="input_right" placeholder="请输入土壤导热系数" v-model="addForm.addformdata14" style="width: calc(100% - 60px)"></el-input>
                                        <span class="danwei">W/(m·K)</span>
                                    </el-form-item>
                                    <el-form-item class="formList" prop="addformdata15" label="空气导热系数：">
                                        <el-input clearable class="input_right" placeholder="请输入空气导热系数" v-model="addForm.addformdata15" style="width: calc(100% - 60px)"></el-input>
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
    data () {
        return {
            state: '',
            addForm: { 
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
                addformdata5: '',
                addformdata6: '',
                addformdata7: '',
                addformdata8: '',
                addformdata9: '',
                addformdata10: '',
                addformdata11: '',
                addformdata12: '',
                addformdata13: '',
                addformdata14: '',
                addformdata15: '',
            },
            rules: {
                addformdata1:[
                    { required: true, message: '请输入客户名称', trigger: 'blur' },
                ],
                addformdata2:[
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                ],
                addformdata3:[
                    { required: true, message: '请输入管线计算精度', trigger: 'blur' },
                ],
                addformdata4:[
                    { required: true, message: '请输入管道等值粗糙度', trigger: 'blur' },
                ],
                addformdata5:[
                    { required: true, message: '请输入设计', trigger: 'blur' },
                ],
                addformdata6:[
                    { required: true, message: '请输入校对', trigger: 'blur' },
                ],
                addformdata7:[
                    { required: true, message: '请输入审查', trigger: 'blur' },
                ],
                addformdata8:[
                    { required: true, message: '请输入审批', trigger: 'blur' },
                ],
                addformdata9:[
                    { required: true, message: '请输入环境温度', trigger: 'blur' },
                ],
                addformdata10:[
                    { required: true, message: '请输入平均风速', trigger: 'blur' },
                ],
                addformdata11:[
                    { required: true, message: '请输入空气温度：', trigger: 'blur' },
                ],
                addformdata12:[
                    { required: true, message: '请输入土壤温度', trigger: 'blur' },
                ],
                addformdata13:[
                    { required: true, message: '请输入土壤深度', trigger: 'blur' },
                ],
                addformdata14:[
                    { required: true, message: '请输入土壤导热系数', trigger: 'blur' },
                ],
                addformdata15:[
                    { required: true, message: '请输入空气导热系数', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        setFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.state = 'add'
                    sessionStorage.setItem('isAdd', this.state);
                    this.$emit('addForm',this.addForm)
                }else {
                    return false
                }
            })
        },
    },
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    @import "@/assets/style/pageStyle.scss";
</style>
