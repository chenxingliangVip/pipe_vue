export default {
	option: {
        backgroundColor: '#ffffff',
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			orient: 'vertical',
			right: '0',
			top: '40%',
			icon: 'square',
			data: [''],
			textStyle: { //图例的公共文本样式
				color: 'white',
				fontSize: 14
			},
		},
		grid: {
			left: '3%',
			right: '3%',
			bottom: '10%',
			top: '6%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			axisLabel: {  //坐标轴刻度标签的相关设置
				fontSize: 12,
				fontWeight: 400
			},
			axisLine: {  //坐标轴轴线相关设置
				lineStyle: {
					color: '#aaa',
					opacity: 0
				}
			},
			axisTick: {  //坐标轴刻度相关设置
				lineStyle: {
					color: '#64a7e0',
					opacity: 0
				}
            },
            nameRotate: 15,
			data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时'],
		},
		yAxis: {
			type: 'value',  //坐标轴类型。
			axisLine: {  //坐标轴轴线相关设置
				lineStyle: {
					color: '#aaa',
					opacity: 0
				}
			},
			axisTick: {  //坐标轴刻度相关设置
				lineStyle: {
					color: '#64a7e0',
					opacity: 0
				}
			},
			axisLabel: {  //坐标轴刻度标签的相关设置
				fontSize: 12,
				fontWeight: 400
            },
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed'
                }
            }
		},
        dataZoom: [
            {
                show: true,
                start: 0,
                end: 80
            }, {
                type: 'inside',
                start: 94,
                end: 100
            },
        ],
		series: [{
				name: '',
				type: 'bar',
				stack: '样品',  //stack 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置
				itemStyle: {
					normal: {
						color: '#64a7e0',
					}
				},
                data: [18, 23, 0, 100, 0, 0,0, 0, 0, 0, 0, 0,0, 0, 0, 100, 0, 0,0, 300, 29, 100, 18, 33],
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff'
                },
			},
		]
	},
}