<template>
    <div>
        <p class="type_title">流程图设定</p>
        <el-form :model="flowData" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
            <el-form-item label="流程名称" class="floatForm">
                <el-input v-model="flowData.Name"></el-input>
            </el-form-item>
            <el-form-item label="备注" class="floatForm">
                <el-input v-model="flowData.Remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </el-form-item>
            <div class="clearBoth"></div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:'editFlow',
        data() {
            return {
                flowData: {},
            }
        },
        methods: {
            init(data) {
                this.flowData = data;
            },
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
.floatForm {
    float: left;
    margin-bottom: 10px !important;
}
</style>
