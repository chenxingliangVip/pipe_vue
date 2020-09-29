<template>
    <div class="addProject computer_add">
        <div class="addForm zll-form package_form">
            <el-form class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="item_list item_list1">
                            <p class="top">
                                <img src="@/assets/img/icon1.png">
                                <span>水/蒸气热力性质计算</span>
                            </p>
                            <el-form-item class="formList" label="温度：">
                                <el-input clearable class="input_right" placeholder="请输入温度" v-model="formData1.addformdata1" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">m/s</span>
                            </el-form-item>
                            <el-form-item class="formList" label="压力：">
                                <el-input clearable class="input_right" placeholder="请输入压力" v-model="formData1.addformdata2" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">Mpa(绝压)</span>
                            </el-form-item>
                            <div class="botton">
                                <el-button type="danger" class="comp_botton" round @click="counter1()">热力性质计算</el-button>
                            </div>
                            <el-form-item class="formList" label="比容：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata3" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">m³/kg</span>
                            </el-form-item>
                            <el-form-item class="formList" label="比焓：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata4" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">J/kg</span>
                            </el-form-item>
                            <el-form-item class="formList" label="定压比容：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata5" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">J/(kg·K)</span>
                            </el-form-item>
                            <el-form-item class="formList" label="动力粘度：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata6" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">Pa·s</span>
                            </el-form-item>
                            <el-form-item class="formList" label="饱和压力：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata7" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">Mpa(绝压)</span>
                            </el-form-item>
                            <el-form-item class="formList" label="饱和温度：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata8" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei"> ℃</span>
                            </el-form-item>
                            <el-form-item class="formList" label="热力状态：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata9" style="width: calc(100% - 80px)"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" label="饱和水焓：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData1.addformdata10" style="width: calc(100% - 80px)"></el-input>
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
                                <el-input clearable class="input_right" placeholder="请输入压力" v-model="formData2.addformdata1" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">Mpa(绝压)</span>
                            </el-form-item>
                            <el-form-item class="formList" label="比焓：">
                                <el-input clearable class="input_right" placeholder="请输入比焓" v-model="formData2.addformdata2" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">J/kg</span>
                            </el-form-item>
                            <div class="botton">
                                <el-button type="danger" class="comp_botton" round @click="counter2()">热力性质计算</el-button>
                            </div>
                            <el-form-item class="formList" label="温度：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData2.addformdata3" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">℃</span>
                            </el-form-item>
                            <el-form-item class="formList" label="饱和温度：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData2.addformdata4" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">℃</span>
                            </el-form-item>
                            <el-form-item class="formList" label="界限焓值：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData2.addformdata5" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">J/kg</span>
                            </el-form-item>
                            <el-form-item class="formList" label="区域：">
                                <el-input clearable class="input_right red" placeholder="" v-model="formData2.addformdata6" style="width: calc(100% - 80px)"></el-input>
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
                                <el-input clearable class="input_right" placeholder="请输入疏水器" v-model="formData3.addformdata1" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">个</span>
                            </el-form-item>
                            <el-form-item class="formList" label="操作压力：">
                                <el-input clearable class="input_right" placeholder="请输入操作压力" v-model="formData3.addformdata2" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">Mpa</span>
                            </el-form-item>
                            <el-form-item class="formList" label="水管管径：">
                                <el-input clearable class="input_right" placeholder="请输入水管管径" v-model="formData3.addformdata3" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">mm</span>
                            </el-form-item>
                            <el-form-item class="formList" label="水管长度：">
                                <el-input clearable class="input_right" placeholder="请输入水管长度" v-model="formData3.addformdata4" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">m</span>
                            </el-form-item>
                            <div class="botton">
                                <el-button type="danger" class="comp_botton" round @click="counter3()">冷凝水损失计算</el-button>
                            </div>
                            <el-form-item class="formList" label="冷凝水量：">
                                <el-input clearable class="input_right blue" placeholder="" v-model="formData3.addformdata5" style="width: calc(100% - 80px)"></el-input>
                                <span class="danwei">L</span>
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
    data () {
        return {
            formData1: { 
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
            },
            formData2: {
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
                addformdata5: '',
                addformdata6: '',

            },
            formData3: {
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
                addformdata5: '',
            },
        }
    },
    methods: {
        counter1() {
            if( this.formData1.addformdata1 == '') {
                this.$message.info('请输入温度!');
                return false
            }
            if( this.formData1.addformdata2 == '') {
                this.$message.info('请输入压力!');
                return false
            }
            this.formData1.addformdata3 = '3'
            this.formData1.addformdata4 = '3'
            this.formData1.addformdata5 = '3'
            this.formData1.addformdata6 = '3'
            this.formData1.addformdata7 = '3'
            this.formData1.addformdata8 = '3'
            this.formData1.addformdata9 = '3'
            this.formData1.addformdata10 = '3'
        },
        counter2() {
            if( this.formData2.addformdata1 == '') {
                this.$message.info('请输入压力!');
                return false
            }
            if( this.formData2.addformdata2 == '') {
                this.$message.info('请输入比焓!');
                return false
            }
            this.formData2.addformdata3 = '3'
            this.formData2.addformdata4 = '3'
            this.formData2.addformdata5 = '3'
            this.formData2.addformdata6 = '3'
        },
        counter3() {
            if( this.formData3.addformdata1 == '') {
                this.$message.info('请输入疏水器!');
                return false
            }
            if( this.formData3.addformdata2 == '') {
                this.$message.info('请输入操作压力!');
                return false
            }
            if( this.formData3.addformdata3 == '') {
                this.$message.info('请输入水管管径!');
                return false
            }
            if( this.formData3.addformdata4 == '') {
                this.$message.info('请输入水管长度!');
                return false
            }
            this.formData3.addformdata5 = '3'
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
