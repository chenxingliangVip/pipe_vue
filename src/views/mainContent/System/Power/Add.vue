<template>
    <div class="addProject UserAdd">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="addFormData1" label="角色名称：">
                    <el-input clearable class="input_right" placeholder="请输入角色名称" v-model="addForm.addFormData1"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="Table_body zll-table powerTable">
            <el-table :data="powerTable"
                      border style="width: 100%"
                      tooltip-effect="light"
                      :span-method="arraySpanMethod"
            >
                <el-table-column prop="index"  label="序号" width="50" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="tableNum1" label="主标题"  width="100"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="tableNum2" label="副标题"  width="150" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="内容" :show-overflow-tooltip="true">
                    <template slot-scope="{row}">
                        <el-checkbox-group v-model="check">
                            <el-checkbox :label="item.value" v-for="(item,index) in row.tableNum3"  :key="index" >{{item.title}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['type'],
        data(){
            return {
                check: [],
                addForm:{
                    addFormData1: '',
                },
                rules: {
                    addFormData1:[
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                    ],
                },
                powerTable:[],
                powerData: [{
                    mainTitle: '信息公告',
                    children: [{
                    }]
                    
                },{
                    mainTitle: '准入申请',
                    children: [{
                        subtitle: '新建申请',
                        content: [
                            { title: '新建', value: '新建申请新建' },
                            { title: '保存', value: '新建申请保存' },
                            { title: '提交', value: '新建申请提交' }
                        ],
                    },{
                        subtitle: '申请管理',
                        content: [
                            { title: '删除', value: '申请管理新建' },
                            { title: '查看', value: '申请管理查看' },
                            { title: '编辑', value: '申请管理编辑' },
                            { title: '作废', value: '申请管理作废' }
                        ],
                    },{
                        subtitle: '批次请检',
                        content: [
                            { title: '入库批检', value: '入库批检' },
                            { title: '查看', value: '批次请检查看' },
                            { title: '编辑', value: '批次请检编辑' },
                            { title: '删除', value: '批次请检删除' }
                        ],
                    }] 
                },{
                    mainTitle: '审计管理',
                    children: [{
                        subtitle: '准入审计',
                        content: [
                            { title: '查看', value: '准入审计查看' },
                            { title: '审计', value: '准入审计审计' }
                        ],
                    }, {
                        subtitle: '动态审计',
                        content: [
                            { title: '查看', value: '动态审计查看' },
                            { title: '审计', value: '动态审计审计' }
                        ],
                    }, {
                        subtitle: '定时审计',
                        content: [
                            { title: '查看', value: '定时审计查看' },
                            { title: '审计', value: '定时审计审计' }
                        ],
                    }, {
                        subtitle: '年度计划',
                        content: [
                            { title: '新建', value: '年度计划新建' },
                            { title: '查看', value: '年度计划查看' },
                            { title: '编辑', value: '年度计划编辑' }
                        ],
                    }, {
                        subtitle: '质量回顾',
                        content: [
                            { title: '新建', value: '质量回顾新建' },
                            { title: '查看', value: '质量回顾查看' },
                            { title: '编辑', value: '质量回顾编辑' }
                        ],
                    }]
                },{
                    mainTitle: '供应商管理',
                    children: [{
                        subtitle: '准供应商',
                        content: [
                            { title: '查看', value: '准供应商查看' },
                        ],
                    }, {
                        subtitle: '合格供应商',
                        content: [
                            { title: '查看', value: '合格供应商查看' },
                        ],
                    }, {
                        subtitle: '资质时效',
                        content: [
                            { title: '查看', value: '资质时效查看' },
                        ],
                    },]
                },{
                    mainTitle: '检验考察',
                    children: [{
                        subtitle: '检验结果',
                        content: [
                            { title: '查看', value: '检验结果查看' },
                        ],
                    }, {
                        subtitle: 'QC检验',
                        content: [
                            { title: '查看', value: 'QC检验查看' },
                            { title: '检验', value: 'QC检验检验' },
                            { title: '报告', value: 'QC检验报告' },
                        ],
                    }, {
                        subtitle: '稳定性考察',
                        content: [
                            { title: '新建', value: '稳定性考察新建' },
                            { title: '考察', value: '稳定性考察考察' },
                        ],
                    },{
                        subtitle: '留样考察',
                        content: [
                            { title: '新建', value: '留样考察新建' },
                            { title: '编辑', value: '留样考察编辑' },
                            { title: '查看', value: '留样考察查看' },
                            { title: '考察', value: '留样考察考察' },
                        ],
                    },]
                },{
                    mainTitle: '审批',
                    children: [{
                        subtitle: '准入审批',
                    },{
                        subtitle: '动态审批',
                    },{
                        subtitle: '质量标准',
                    },{
                        subtitle: '物料管理',
                    },]
                },{
                    mainTitle: '标准管理',
                    children: [{
                        subtitle: '信息发布',
                        content: [
                            { title: '新建', value: '信息发布新建' },
                            { title: '删除', value: '信息发布删除' },
                        ],
                    },{
                        subtitle: '参数设定',
                    },{
                        subtitle: '质量标准',
                        content: [
                            { title: '新建', value: '质量标准新建' },
                            { title: '查看', value: '质量标准查看' },
                            { title: '修订', value: '质量标准修订' },
                        ],
                    },{
                        subtitle: '资质名称',
                        content: [
                            { title: '新建', value: '资质名称新建' },
                            { title: '编辑', value: '资质名称编辑' },
                        ],
                    }]
                },{
                    mainTitle: '系统',
                    children: [{
                        subtitle: '组织架构',
                        content: [
                            { title: '新建', value: '组织架构新建' },
                        ],
                    },{
                        subtitle: '角色权限',
                        content: [
                            { title: '新建', value: '角色权限新建' },
                            { title: '编辑', value: '角色权限编辑' },
                        ],
                    },{
                        subtitle: '用户管理',
                        content: [
                            { title: '新建', value: '用户管理新建' },
                            { title: '编辑', value: '用户管理编辑' },
                            { title: '删除', value: '用户管理删除' },
                        ],
                    },{
                        subtitle: '数据备份',
                    },{
                        subtitle: '系统日志',
                    }]
                }],
            }
        },
        methods: {
            tableList(){
                let i = 1;
                for (let _i of this.powerData) {
                    let rowSpan = false;
                    let j = 1;
                    for(let _j of _i.children){
                        let obj ={
                            index: i,
                            tableNum1: _i.mainTitle,
                            tableNum2: _j.subtitle,
                            tableNum3: [],
                            rowSpan: _i.children.length,
                        }
                        if(_j.content){
                            for(let _k of _j.content){
                                let child = {
                                    title: _k.title,
                                    value: _k.value,
                                    rowSpan: _j.content.length,
                                };
                                obj.tableNum3.push(child);
                            }
                        }
                        if(rowSpan){
                            obj.rowSpan = 0;
                        }
                        j++;
                        rowSpan = true;
                        this.powerTable.push(obj);
                    }
                    i++;
                }
            },
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex < 2) {
                    if (row.rowSpan === 0) {
                        return [0, 0]
                    } else {
                        return [row.rowSpan, 1]
                    }
                }
            },
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
        mounted(){
            this.tableList()
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
    .UserAdd {
        .addForm {
            width: 50%;
        }
        .zll-table {
            margin-top: 15px;
        }
    }
    
</style>