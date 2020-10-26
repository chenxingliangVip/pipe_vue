<template>
    <div class="addProject package">
        <div class="addForm zll-form">
            <el-form :model="logForm" ref="logForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata1" label="用户输出：">
                            <el-input clearable class="input_right" placeholder="请输入用户输出" v-model="logForm.addformdata1"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata2" label="温度：">
                            <el-input clearable class="input_right" placeholder="请输入温度" v-model="logForm.addformdata2" style="width: calc(100% - 100px)"></el-input>
                            <span class="danwei"> ℃</span>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata3" label="压力：">
                            <el-input clearable class="input_right" placeholder="请输入压力" v-model="logForm.addformdata3" style="width: calc(100% - 100px)"></el-input> 
                            <span class="danwei"> Mpa（绝压）</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata4" label="流量：">
                            <el-input clearable class="input_right" placeholder="请输入流量" v-model="logForm.addformdata3" style="width: calc(100% - 100px)"></el-input>
                            <span class="danwei"></span>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata5" label="流速：">
                            <el-input clearable class="input_right" placeholder="请输入流速" v-model="logForm.addformdata5" style="width: calc(100% - 100px)"></el-input> 
                            <span class="danwei"></span>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata6" label="冷凝水损失：">
                            <el-input clearable class="input_right" placeholder="请输入冷凝水损失" v-model="logForm.addformdata6" style="width: calc(100% - 100px)"></el-input> 
                            <span class="danwei"></span>
                        </el-form-item>
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
            logForm: { 
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
                addformdata5: '',
                addformdata6: '',
            },
        }
    },
    methods: {
        
    },
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    @import "@/assets/style/pageStyle.scss";
</style>
