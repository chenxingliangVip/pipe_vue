<template>
  <div class="addProject package">
    <div class="tableList normal">
      <table>
        <tr>
          <th width="20%">流量（t/h）</th>
          <th width="20%">起点压力（MPa）</th>
          <th width="20%">末点压力（MPa）</th>
          <th width="20%">起点温度（℃）</th>
          <th width="20%">末点温度（℃）</th>
        </tr>
        <tr v-for="(item ,index) in table" :key="index">
          <td width="20%" >{{ item.data1 + '时：' + item.data1_value }}</td>
          <td width="20%" >{{ item.data2 + '时：' + item.data2_value }}</td>
          <td width="20%" >{{ item.data3 + '时：' + item.data3_value }}</td>
          <td width="20%" >{{ item.data4 + '时：' + item.data4_value }}</td>
          <td width="20%" >{{ item.data5 + '时：' + item.data5_value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        table: [],
      }
    },
    methods: {
      init(data) {
        this.table = [];
        let pipeResults = data.lineResult.pipeResults;
        if (pipeResults) {
          let pipeG = data.pipeG;
          for (let i = 0; i < 24; i++) {
            let data1 = pipeResults.LiuLiang[i];
            let data2 = pipeResults.startYaLi[i];
            let data3 = pipeResults.yaLi[i];
            let data4 = pipeResults.startDegrees[i];
            let data5 = pipeResults.degrees[i];
            let data = {
              data1:data1.wh,data1_value:pipeG[i],
              data2:data2.wh1,data2_value:data2.sp,
              data3:data3.wh2,data3_value:data3.ep,
              data4:data4.wh3,data4_value:data4.st,
              data5:data5.wh4,data5_value:data5.et,
            };
            this.table.push(data);
          }
        }
        console.log(data);
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/dialog.scss";
  @import "@/assets/style/pageStyle.scss";
</style>
