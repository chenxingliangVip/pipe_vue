<template>
    <div class="addProject package">
        <div class="addForm zll-form">
            <el-form :model="setForm" ref="setForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata1" label="编号：">
                            <el-input clearable class="input_right" placeholder="请输入编号" v-model="setForm.addformdata1" disabled></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata2" label="名称：">
                            <el-input clearable class="input_right" placeholder="请输入名称" v-model="setForm.addformdata2" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata3" label="温度：">
                            <el-input clearable class="input_right" placeholder="请输入温度" v-model="setForm.addformdata3" style="width: calc(100% - 100px)"></el-input>
                            <span class="danwei"> ℃</span>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata4" label="压力：">
                            <el-input clearable class="input_right" placeholder="请输入压力" v-model="setForm.addformdata4" style="width: calc(100% - 100px)"></el-input> 
                            <span class="danwei"> Mpa（绝压）</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="tableList">
                    <table border="1">
                        <tr>
                            <th>0时</th><th>1时</th><th>2时</th><th>3时</th><th>4时</th><th>5时</th><th>6时</th><th>7时</th><th>8时</th><th>9时</th><th>10时</th><th>11时</th>
                        </tr>
                        <tr class="set_Table">
                            <td><el-input clearable v-model="table.tableData1" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData2" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData3" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData4" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData5" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData6" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData7" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData8" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData9" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData10" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData11" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData12" placeholder=""></el-input></td>
                        </tr>
                        <tr>
                            <th>12时</th><th>13时</th><th>14时</th><th>15时</th><th>16时</th><th>17时</th><th>18时</th><th>19时</th><th>20时</th><th>21时</th><th>22时</th><th>23时</th>
                        </tr>
                        <tr class="add_Table">
                            <td><el-input clearable v-model="table.tableData13" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData14" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData15" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData16" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData17" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData18" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData19" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData20" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData21" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData22" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData23" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="table.tableData24" placeholder=""></el-input></td>
                        </tr>
                    </table>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            setForm: { 
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
            },
            table: {
                tableData1: '',
                tableData2: '',
                tableData3: '',
                tableData4: '',
                tableData5: '',
                tableData6: '',
                tableData7: '',
                tableData8: '',
                tableData9: '',
                tableData10: '',
                tableData11: '',
                tableData12: '',
                tableData13: '',
                tableData14: '',
                tableData15: '',
                tableData16: '',
                tableData17: '',
                tableData18: '',
                tableData19: '',
                tableData20: '',
                tableData21: '',
                tableData22: '',
                tableData23: '',
                tableData24: '',
            }
        }
    },
    methods: {
        setFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('setForm',this.table)
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
