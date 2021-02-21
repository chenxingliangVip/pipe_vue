<template>
  <div class="addProject">
    <div class="tableList normal sunhao">
      <table>
        <tr>
          <th width="20%">输出节点</th>
          <th width="20%">预计温度</th>
          <th width="20%">实际温度</th>
          <th width="20%">预计压力</th>
          <th width="20%">实际压力</th>
        </tr>
        <tr v-for="(item, index) in tableData" :key="index">
          <td width="20%">
            {{ item.name }}
          </td>
          <td width="20%" >
            {{ item.temperature }}
          </td>
          <td width="20%" :style="{color: item.tempColor}">
            {{ item.finalT }}
          </td>
          <td width="20%" >
            {{ item.pressure }}
          </td>
          <td width="20%" :style="{color: item.pressColor}">
            {{ item.finalPressure }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['warningData'],
    data() {
      return {
        tableData: []
      };
    },
    methods: {
      getTable() {
        return this.tableData;
      }
    },
    mounted() {

    },
    watch: {
      warningData(val) {
        this.tableData = val;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/assets/style/dialog.scss";
  @import "@/assets/style/pageStyle.scss";
</style>
