<template>
  <div class="addProject package">
    <div class="tableList normal">
      <table>
        <tr>
          <th width="16.6%">流量（t/h）</th>
          <th width="16.6%">起点压力（MPa）</th>
          <th width="16.6%">末点压力（MPa）</th>
          <th width="16.6%">起点温度（℃）</th>
          <th width="16.6%">末点温度（℃）</th>
          <th >流速</th>
        </tr>
        <tr v-for="(item ,index) in table" :key="index" >
          <td width="20%" >{{ item.data1 + '时：' + item.data1_value }}</td>
          <td width="20%" >{{ item.data2 + '时：' + item.data2_value }}</td>
          <td width="20%" :class="{cell_red:parseFloat(item.data3_value) < pressure}">{{ item.data3 + '时：' + item.data3_value }}</td>
          <td width="20%" >{{ item.data4 + '时：' + item.data4_value }}</td>
          <td width="20%" :class="{cell_red:parseFloat(item.data5_value) < temperature}">{{ item.data5 + '时：' + item.data5_value }}</td>
          <td width="20%" >{{ item.data6 + '时：' + item.data6_value }}</td>
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
        temperature:0,
        pressure:0,
      }
    },
    methods: {
      getFloat(num, n){
        n = n ? parseInt(n) : 0;
        if(n <= 0) {
          return Math.round(num);
        }
        num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
        num = Number(num).toFixed(n); //补足位数
        return num;
      },
      init(data,initData) {
        this.table = [];
        if(initData.temperature){
          this.temperature = parseFloat(initData.temperature);
        }
        if(initData.pressure){
          this.pressure = parseFloat(initData.pressure);
        }
        console.log("-------------------")
        console.log(data);
        let pipeResults = data.lineResult.pipeResults;
        if (pipeResults) {
          let pipeG = data.pipeG;
          for (let i = 0; i < 24; i++) {
            let data1 = pipeResults.LiuLiang[i];
            let data2 = pipeResults.startYaLi[i];
            let data3 = pipeResults.yaLi[i];
            let data4 = pipeResults.startDegrees[i];
            let data5 = pipeResults.degrees[i];
            let data6 = pipeResults.liuSu[i];
            let data = {
              data1:data1.wh,data1_value:this.getFloat(pipeG[i],1),
              data2:data2.wh1,data2_value:this.getFloat(data2.sp,3),
              data3:data3.wh2,data3_value:this.getFloat(data3.ep,3),
              data4:data4.wh3,data4_value:this.getFloat(data4.st,1),
              data5:data5.wh4,data5_value:this.getFloat(data5.et,1),
              data6:data6.wh6,data6_value:this.getFloat(data6.ew,1),
            };
            if(pipeG[i] != 0){
              this.table.push(data);
            }
          }
        }
        // if(this.table.length >0){
        //   initData.finalT = this.table[0].data1_value;
        //   initData.finalPressure = this.table[0].data5_value;
        //   initData.liuL = this.table[0].data3_value;
        // }
        console.log(data);
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/dialog.scss";
  @import "@/assets/style/pageStyle.scss";

</style>
<style>
  .cell_red {
    color: red !important;
  }
</style>
