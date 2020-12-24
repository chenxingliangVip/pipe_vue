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
                    mainTitle: '项目管理',
                    children: [{
                        subtitle: '部门项目',
                        content: [
                            { title: '新建', value: '新建申请新建' },
                            { title: '提交', value: '新建申请提交' }
                        ],
                    },{
                        subtitle: '我的项目',
                        content: [
                            { title: '新建', value: '申请管理新建' },
                            { title: '查看', value: '申请管理查看' },
                            { title: '编辑', value: '申请管理编辑' },
                        ],
                    },{
                        subtitle: '项目授权',
                        content: [
                            { title: '查看', value: '批次请检查看' },
                            { title: '编辑', value: '批次请检编辑' },
                            { title: '删除', value: '批次请检删除' }
                        ],
                    }] 
                },{
                    mainTitle: '工程设计',
                    children: [{}]
                },{
                    mainTitle: '物性计算',
                    children: [{}]
                },{
                    mainTitle: '材料管理',
                    children: [{}]
                },{
                    mainTitle: '系统管理',
                    children: [{
                        subtitle: '部门管理',
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