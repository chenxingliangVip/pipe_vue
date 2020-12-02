<template>
    <div class="addProject">
        <div class="tableList normal sunhao">
            <table>
                <tr>
                    <th width="30%">材料名</th>
                    <th width="30%">长度</th>
                    <th width="40%">损耗系数</th>
                </tr>
                <tr v-for="(item, index) in tableData" :key="index">
                    <td width="30%">
                        {{ item.materialName }}
                    </td>
                    <td width="30%">
                        {{ item.materialLen }}
                    </td>
                    <td width="40%">
                        <el-input clearable v-model="item.loss" placeholder=""></el-input>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
      init(val){
        this.tableData = val;
      },
      getTable(){
        return this.tableData;
      }
    },
    mounted() {

    },
};
</script>

<style scoped lang="scss">
@import "@/assets/style/dialog.scss";
@import "@/assets/style/pageStyle.scss";
</style>
