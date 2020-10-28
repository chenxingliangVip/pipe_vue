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
                <tr v-for="(item , index) in tableData" :key="index">
                    <td width="20%">{{ index + '时：' + item.data1 }}</td>
                    <td width="20%">{{ index + '时：' + item.data2 }}</td>
                    <td width="20%">{{ index + '时：' + item.data3 }}</td>
                    <td width="20%">{{ index + '时：' + item.data4 }}</td>
                    <td width="20%">{{ index + '时：' + item.data5 }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [{
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }, {
                data1: '11',
                data2: '23',
                data3: '',
                data4: '',
                data5: '',
            }]
        }
    },
    methods: {
        
    },
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    @import "@/assets/style/pageStyle.scss";
</style>
