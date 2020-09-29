<template>
    <div>
        <p class="type_title">管道参数设定</p>
        <el-form :model="line" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-form-item label="敷设方式：">
                        <el-select v-model="line.data1" placeholder="" style="width: calc(100% - 40px)">
                            <el-option label="1" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管道外径：">
                        <el-input v-model="line.data2" style="width: calc(100% - 40px)"></el-input>
                        <span>mm</span>
                    </el-form-item>
                    <el-form-item label="管道壁厚：">
                        <el-input v-model="line.data3" style="width: calc(100% - 40px)"></el-input>
                        <span>mm</span>
                    </el-form-item>
                    <el-form-item label="管道长度：">
                        <el-input v-model="line.data4" style="width: calc(100% - 40px)"></el-input>
                        <span>m</span>
                    </el-form-item>
                    <el-form-item label="局部阻系数：">
                        <el-input v-model="line.data5" style="width: calc(100% - 40px)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="空气层外径：">
                        <el-input v-model="line.data6" style="width: calc(100% - 40px)"></el-input>
                        <span>mm</span>
                    </el-form-item>
                    <el-form-item label="压降系数：">
                        <el-input v-model="line.data7" style="width: calc(100% - 40px)"></el-input>
                    </el-form-item>
                    <el-form-item label="温降系数：">
                        <el-input v-model="line.data8" style="width: calc(100% - 40px)"></el-input>
                    </el-form-item>
                    <el-form-item label="保温层数：">
                        <el-select v-model="line.data9" placeholder="" style="width: calc(100% - 40px)">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                            <el-option label="4" value="4"></el-option>
                            <el-option label="5" value="5"></el-option>
                            <el-option label="6" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管道名称：">
                        <el-input v-model="line.label" style="width: calc(100% - 40px)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <div class="echart">
                        <img src="@/assets/img/ceng.png">
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="table_ceng">
                        <table border="1">
                            <tr>
                                <th width="20%">层数</th><th width="40%">材质</th><th width="20%">是否反射层</th><th width="20%">厚度mm</th>
                            </tr>
                            <tr v-for="(item , index) in table" :key="index">
                                <td width="20%">{{ index + 1 }}</td>
                                <td width="40%"><el-input v-model="item.tableData1"></el-input></td>
                                <td width="20%"><el-input v-model="item.tableData2"></el-input></td>
                                <td width="20%"><el-input v-model="item.tableData3"></el-input></td>
                            </tr>
                        </table>
                    </div>
                </el-col>
                <el-col :span="3" class="middle_flex">
                    <div class="buttonnav">
                        <el-button round class="button_list sure"  @click="Submit('dataForm')">修 改</el-button>
                        <el-button round class="button_list set" @click="logResult()" v-show="isShow">管线输出结果</el-button>
                        <el-button round  type="info" class="button_list" disabled v-show="!isShow">用户输出结果</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:'editLine',
        data() {
            return {
                isShow: false,
                line: { label: '' },
                isUpdate: false,
                table: [{}, {},{},{},{},{},]
            }
        },
        watch: {
            line: {
                handler(val) {
                    if (this.isUpdate) {
                        this.$emit('line-save', this.line);
                    }
                },
                deep: true
            }
        },
        methods: {
            init(item) {
                this.isUpdate = false;
                this.line = item;
                this.$nextTick(function () {
                    this.isUpdate = true;
                });
            },
            Submit(formName) {
                this.$message.success('提交成功!');
                console.log(this.line)
                console.log(this.table)
            },
            logResult() {

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
}
.echart img {
    width: 200px;
}
.table_ceng table {
    width: 100%;
    border-collapse: collapse;
    border:1px solid #ffffff;
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
    text-overflow:ellipsis;
    white-space: nowrap;
}
.table_ceng table tr {
    background: #eaeff7;
}

.middle_flex {
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 200px;
}
.middle_flex .buttonnav {
    width: 120px;
}
.middle_flex .button_list {
    padding: 10px;
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
