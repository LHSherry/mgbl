
import React from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import styles from './index.less';

const ChartLine = ({
	sourceGroup = ['GROUP', '舒张压', '收缩压'],
	data = [],
}) => {

	const echartsProps = {
		option: {
			title: { text: ' ' },
			dataset: {
				source: [
					sourceGroup,
					...data,
				]
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '2%',
				right: '2%',
				bottom: '2%',
				top: '16%',
				containLabel: true
			},
			legend: {
				right: 10,
				top: 12,
				textStyle: {
					color: '#fff'
				},
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLine: {
					lineStyle: {
						color: '#c2c2c2', width: 1,
						type: 'solid'
					}
				}
			},

			yAxis: {
				type: 'value',
				axisLine: {
					show: false,
					lineStyle: {
						color: '#c2c2c2'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255,255,255,0.3)'
					}
				},
				axisLabel: {}
			},

			series: [
				{
					type: 'line',
					smooth: true, //这个是把线变成曲线
					itemStyle: {
						normal: {
							color: '#0092f6',
							lineStyle: {
								color: '#0092f6',
								width: 1
							},
							areaStyle: {
								//color: '#94C9EC'
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: 'rgba(7,44,90,0.3)'
								}, {
									offset: 1,
									color: 'rgba(0,146,246,0.9)'
								}]),
							}
						}
					},
				},
				{
					type: 'line',
					smooth: true, //这个是把线变成曲线
					itemStyle: {
						normal: {
							color: '#00d4c7',
							lineStyle: {
								color: '#00d4c7',
								width: 1
							},
							areaStyle: {
								//color: '#94C9EC'
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: 'rgba(7,44,90,0.3)'
								}, {
									offset: 1,
									color: 'rgba(0,212,199,0.9)'
								}]),
							}
						}
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
