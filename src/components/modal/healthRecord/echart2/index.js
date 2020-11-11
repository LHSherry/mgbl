
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

import styles from './index.less';

const ChartLine = ({
	sourceGroup = ['GROUP', '血糖值'],
	data
}) => {

	const echartsProps = {
		option: {
			title: { text: ' ', },
			legend: { show: false },
			dataset: {
				source: [
					sourceGroup,
					...data,
				]
			},
			grid: {
				top: '20%',
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				axisLabel: {
					margin: 5,
					color: '#ffffff63'
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: true,
					length: 5,
					lineStyle: {
						color: '#ffffff1f'
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: '#ffffff1f'
					}
				}
			},
			yAxis: [{
				type: 'value',
				axisLabel: {
					margin: 20,
					color: '#ffffff63'
				},

				axisTick: {
					show: true,
					length: 15,
					lineStyle: {
						color: '#ffffff1f',
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: '#ffffff1f'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width: 2
					}
				}
			}],
			series: [
				{
					name: '注册总量',
					type: 'line',
					smooth: true, //是否平滑曲线显示
					showAllSymbol: true,
					symbol: 'circle',
					symbolSize: 6,
					lineStyle: {
						normal: {
							color: '#fff', // 线条颜色
						},
					},
					label: {
						show: true,
						position: 'top',
						textStyle: {
							color: '#fff',
						}
					},
					itemStyle: {
						normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#64CAFA' // 0% 处的颜色
							}, {
								offset: 0.5,
								color: '#64CAFA' // 100% 处的颜色
							}, {
								offset: 1,
								color: '#0078D7' // 100% 处的颜色
							}]), //背景渐变色
							lineStyle: { // 系列级个性化折线样式
								width: 0.5,
								type: 'solid',
								color: '#0078D7'
							}
						},
						emphasis: {
							color: '#02675f',
							lineStyle: { // 系列级个性化折线样式
								width: 0.5,
								type: 'dotted',
								color: '#02675f' //折线的颜色
							}
						}
					}, //线条样式
					tooltip: {
						show: false
					},
					areaStyle: {
						normal: {}
					},
				}
			]
		},
		notMerge: true,
		lazyUpdate: true,
		style: {
			width: '100%',
			height: '100%'
		}
	};

	return (
		<div className={styles.container}>
			<ReactEcharts {...echartsProps} />
		</div>
	);
};

export default ChartLine;
