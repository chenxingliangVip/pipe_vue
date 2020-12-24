<template>
  <div class="Materials">
    <h1 class="header_h1">材料管理</h1>
    <!-- 头部搜索 -->
    <!-- <div class="Search_Top_Input addMaterials">
      <el-form :model="addForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="addList">
          <div class="list_nav">
            <p>材料名称</p>
            <el-form-item class="formList" prop="name">
              <el-input clearable v-model.trim="addForm.name" placeholder=""></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>密度kg/m³</p>
            <el-form-item class="formList" prop="density">
              <el-input clearable v-model="addForm.density" placeholder=""></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>导热常数项系数</p>
            <el-form-item class="formList" prop="constNum">
              <el-input clearable v-model="addForm.constNum" placeholder=""></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>导热方程一次项系数</p>
            <el-form-item class="formList" prop="oneNum">
              <el-input clearable v-model="addForm.oneNum" placeholder=""></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>导热方程二次项系数</p>
            <el-form-item class="formList" prop="twoNum">
              <el-input clearable v-model="addForm.twoNum" placeholder=""></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>导热方程三次项系数</p>
            <el-form-item class="formList" prop="threeNum">
              <el-input clearable v-model="addForm.threeNum" placeholder=""></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>衰减方程常数项系数</p>
            <el-form-item class="formList">
              <el-input clearable v-model="addForm.constNumDesc" placeholder="" :disabled="!isReflect"></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>衰减方程一次项系数</p>
            <el-form-item class="formList">
              <el-input clearable v-model="addForm.oneNumDesc" placeholder="" :disabled="!isReflect"></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>衰减方程二次项系数</p>
            <el-form-item class="formList">
              <el-input clearable v-model="addForm.twoNumDesc" placeholder="" :disabled="!isReflect"></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>衰减方程三次项系数</p>
            <el-form-item class="formList">
              <el-input clearable v-model="addForm.threeNumDesc" placeholder="" :disabled="!isReflect"></el-input>
            </el-form-item>
          </div>
          <div class="list_nav">
            <p>反射</p>
            <el-form-item class="formList">
              <el-select v-model="addForm.reflect" placeholder="" @change="reflectChange">
                <el-option value="1" label="是"></el-option>
                <el-option value="2" label="否"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="clearBoth"></div>
        </div>
        <div class="addNew">
          <el-form-item class="formList">
            <span @click="addPower('ruleForm')"><i class="el-icon-circle-plus-outline"></i> 新建材料</span>
          </el-form-item>
        </div>
      </el-form>
    </div> -->
    <div class="Search_Top_Input">
        <div class="search_list" style="width: calc(100% - 100px) !important">
            <div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="材料名称"></el-input>
            </div>
            <div class="input_flex search">
                <span class="zll-search">搜索</span>
                <span class="zll-search-reset">重置</span>
            </div>
        </div>
        <div class="addNew" style="width: 100px">
            <span @click="addPower()"><i class="el-icon-circle-plus-outline"></i> 新建材料</span>
        </div>
    </div>
    <!-- table -->
    <sys-table
      :isMultipleSelection="false"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :tableHeader="tableHeader"
      :scopeWidth="150"
    >
      <template slot-scope="scope" slot="operate">
        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </sys-table>

    <!-- 材料弹框 -->
    <div class="zll-dialog">
      <popout :title="type + '材料'" :visible.sync="addDialog" v-if="addDialog" class="package_dialog">
        <Add ref="add" slot="content" :editData="editData" @addForm="getFormData"></Add>
        <template slot="bottom">
          <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
        </template>
      </popout>
    </div>
  </div>
</template>

<script>
  import Add from './Add'
  import {Density, Coefficient,number} from '@/assets/js/verify'

  export default {
    data() {
      return {
        type: '',
        searchInput1: '',
        tableLoading: true, //table刷新
        tableData: [],
        tableHeader: [],
        editData: [],
        addDialog: false, //角色弹框
        isReflect:true,
        addForm: {
          name: '',
          density: '',
          constNum: '',
          oneNum: '',
          twoNum: '',
          threeNum: '',
          constNumDesc: '',
          oneNumDesc: '',
          twoNumDesc: '',
          threeNumDesc: '',
          reflect: '1',
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
          threeNum: [
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
          ],
          threeNumDesc: [
            {validator: number, trigger: 'blur'},
          ]
        },
      }
    },
    methods: {

      reflectChange(val){
         if(val == '2'){
           this.isReflect = false;
         }else{
           this.isReflect = true;
         }
      },
      getList() {
        let self = this;
        self.tableLoading = true;
        self.$http({
          url: "/pipe/material/queryMaterialList",
          method: "post",
        }).then(resp => {
          if (resp.success) {
            self.tableLoading = false;
            self.tableData = resp.result;
            for(let i=0;i<self.tableData.length ;i++){
              self.tableData[i].index = i+1;
            }
            this.tableHeader = [
              {"columnValue": "index", "columnName": "序号", width: '50px'},
              {"columnValue": "name", "columnName": "材料名称"},
              {"columnValue": "density", "columnName": "密度kg/m³"},
              {"columnValue": "constNum", "columnName": "导热常数项系数", width: "180"},
              {"columnValue": "oneNum", "columnName": "导热方程一次项系数", width: "180"},
              {"columnValue": "twoNum", "columnName": "导热方程二次项系数", width: "180"},
              {"columnValue": "threeNum", "columnName": "导热方程三次项系数", width: "180"},
              {"columnValue": "constNumDesc", "columnName": "衰减方程常数项系数", width: "180"},
              {"columnValue": "oneNumDesc", "columnName": "衰减方程一次项系数", width: "180"},
              {"columnValue": "twoNumDesc", "columnName": "衰减方程二次项系数", width: "180"},
              {"columnValue": "threeNumDesc", "columnName": "衰减方程三次项系数", width: "180"},
            ]
          }
        });

      },

      editMaterial(data,type) {
        let self = this;
        let tip = "材料添加成功";
        let url = "/pipe/material/addMaterial";
        if(type == 'edit'){
          url = "/pipe/material/updateMaterial";
          tip = "材料修改成功";
        }
        delete data.createTime;
        delete data.updateTime;
        self.$http({
          url: url,
          method: "post",
          params: data
        }).then(resp => {
          if (!resp.success) {
            this.$message.error("材料已经存在！");
          }else{
            this.$message.success(tip);
          }
          self.getList();
        });

      },

    //   addPower(formName) {
    //     let self = this;
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         self.editMaterial(self.addForm);
    //       } else {
    //         return false
    //       }
    //     })
    //   },
      addPower() {
        this.type = '新建'
        this.addDialog = true;
        this.editData = {};
      },
      getFormData(data) {
        this.addDialog = false;
        this.editMaterial(data,'edit');
      },
      edit(val) { //管理
        this.type = '编辑'
        this.addDialog = true
        this.editData = val;
      },

      deleteRow(rows) {
        let self = this;
        self.$confirm('确定删除该信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http({
            url: "/pipe/material/deleteMaterial",
            method: "post",
            params: {id:rows.id}
          }).then(resp => {
            if (resp.success) {
              self.getList();
              self.$message.success("删除成功");
              return
            }
            self.$message.success("操作失败，请联系管理员");
          });
        });
      },
    },
    mounted() {
      this.getList();//显示table
    },
    components: {
      Add,
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/SearchTop.scss";

  .Power {
    .leadOut {
      background: #e69c2d;
      color: #ffffff;
      position: relative;
      padding: 10px 10px 10px 20px;

      img {
        position: absolute;
        left: 7px;
      }

      &:hover {
        opacity: .8;
        transition: all .3s;
      }
    }
  }

</style>
