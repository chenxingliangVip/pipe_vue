<template>
    <div class="addProject">
        <div class="tableList normal sunhao">
            <table>
                <tr>       
                    <th width="20%">输出节点</th>
                    <th width="20%">预计温度</th>
                    <th width="20%">实际温度</th>
                    <th width="20%">预计压力</th>
                    <th width="20%">实际温度</th>
                </tr>
                <tr v-for="(item, index) in tableData" :key="index">
                    <td width="20%">
                        {{ item.data }}
                    </td>
                    <td width="20%">
                        {{ item.data }}
                    </td>
                    <td width="20%">
                        {{ item.data }}
                    </td>
                    <td width="20%">
                        {{ item.data }}
                    </td>
                    <td width="20%">
                        {{ item.data }}
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
            tableData: [{}]
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
