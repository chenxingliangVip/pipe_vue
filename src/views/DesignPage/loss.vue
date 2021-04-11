<template>
    <div class="addProject">
        <div class="tableList normal sunhao">
            <table>
                <tr>
                    <th width="25%">材料名</th>
                    <th width="14%">损耗系数</th>
                    <th width="14%">用量</th>
                    <!--<th width="14%">防水层面积</th>-->
                    <!--<th width="14%">外护层面积</th>-->
                    <!--<th>反射层面积</th>-->

                </tr>
                <tr v-for="(item, index) in tableData" :key="index">
                    <td width="30%">
                        {{ item.materialName }}
                    </td>
                  <td width="40%" >
                    <el-input clearable v-model="item.loss" placeholder=""></el-input>
                  </td>
                    <td width="30%">
                        {{ item.materialLarge }}
                    </td>
                  <!--<td width="30%">-->
                    <!--{{ item.fsArea }}-->
                  <!--</td>-->
                  <!--<td width="30%">-->
                    <!--{{ item.outArea }}-->
                  <!--</td>-->
                  <!--<td width="30%">-->
                    <!--{{ item.reArea }}-->
                  <!--</td>-->
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
