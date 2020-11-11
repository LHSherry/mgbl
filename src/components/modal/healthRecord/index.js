

import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import { Modal } from 'antd';

import Table from '@/components/table';
import List from '@/components/list';

import EChart1 from './echart1';
import EChart2 from './echart2';

import styles from './index.less';

const cx = classNames.bind(styles);
const HealthRecord = ({
	data,
	visible,
	onCancel
}) => {
	const [tabId, setTabId] = useState(1);

	useEffect(() => {
		if (visible) setTabId(1);
	}, [visible])

	const onTabChange = (id) => {
		setTabId(id)
	}

	const renderContent = () => {
		if (tabId === 1) {
			const listData = [
				'姓名', '张三',
				'性别', '男',
				'出生日期', '1937-9-1',
				'年龄', '33',
				'民族', '汉',
				'身份证号码', '999999999999999999',
				'联系电话', '13800138000',
				'职业', '退休',
				'工作单位', '-',
				'地址', 'XXXXXXXXXXXXXXXX',
				'文化程度', '高中',
				'婚姻状况', '已婚',
				'所属家庭医生', '张三/13800138000',
				'所属急救医生', '李四/13800138000',
				'', '',
				'', '',
				'慢病类型', '高血压',
				'是否为失能老人（SOS手表用户）', '非失能',
				'体重（kg）', '66',
				'身高（cm）', '175',
				'血型', 'A',
				'摄盐情况', '轻',
				'服药依从性', '从不',
				'睡眠情况', '良',
				'体育锻炼', '2次/周、30分钟/次',
				'抽烟饮酒情况', '5支/日、2两/日',
				'药物过敏史', '无',
				'疾病史', '无',
				'手术史', '有',
				'残疾说明', '无'
			];
			return <List data={listData} />
		} else if ([3, 4, 5].includes(tabId)) {
			let tableProps;
			switch (tabId) {
				case 3:
					tableProps = {
						data: [
							{
								sfsj: 'yyyy-MM-dd HH:mm:ss', sffs: '家庭', sfys: '赵柳（13800138000）'
							}
						],
						columns: [
							{
								title: '随访时间',
								key: 'sfsj'
							},
							{
								title: '随访方式',
								key: 'sffs'
							},
							{
								title: '随访医生',
								key: 'sfys'
							}
						],
						control: [
							{
								key: 'view',
								name: '查看随访记录',
								onClick: (record) => console.log(record)
							},
						],
					};
					break;
				case 4:
					tableProps = {
						data: [
							{
								sfsj: 'yyyy-MM-dd HH:mm:ss', sffs: 'XX卫生院', sfys: '综合评价：良'
							}
						],
						columns: [
							{
								title: '体检时间',
								key: 'sfsj'
							},
							{
								title: '机构',
								key: 'sffs'
							},
							{
								title: '健康评价',
								key: 'sfys'
							}
						],
						control: [
							{
								key: 'view',
								name: '查看体检记录',
								onClick: (record) => console.log(record)
							},
						],
					};
					break;
				case 5:
					tableProps = {
						data: [
							{
								sfsj: 'yyyy-MM-dd HH:mm:ss', sffs: 'XXXXX医院', sfys: '102239', mzh: '292883', zzys: '易医生', 'zdjl': '-'
							}
						],
						columns: [
							{
								title: '就诊/住院时间',
								key: 'sfsj'
							},
							{
								title: '医院',
								key: 'sffs'
							},
							{
								title: '住院号',
								key: 'zyh'
							},
							{
								title: '门诊号',
								key: 'mzh'
							},
							{
								title: '主治医生',
								key: 'zzys'
							},
							{
								title: '诊断结论',
								key: 'zdjl'
							}
						],
						control: [
							{
								key: 'view',
								name: '查看体检记录',
								onClick: (record) => console.log(record)
							},
						],
					};
					break;
				default:
					break;
			}

			return <Table {...tableProps} />
		} else if (tabId === 2) {
			console.log('11111111');
			const chartProps1 = {
				data: [['周1', 100, 200], ['周2', 110, 220], ['周3', 120, 210], ['周4', 100, 230], ['周5', 110, 200]]
			};

			const chartProps2 = {
				data: [['周1', 100], ['周2', 110], ['周3', 120], ['周4', 100], ['周5', 110]]
			};

			const tableProps1 = {
				data: [
					{
						sfsj: '家庭', sffs: 'yyyy-MM-dd HH:mm:ss', sfys: '120', mzh: '80', zzys: '100'
					}
				],
				columns: [
					{
						title: '测量场景',
						key: 'sfsj'
					},
					{
						title: '时间',
						key: 'sffs'
					},
					{
						title: '高压',
						key: 'zyh'
					},
					{
						title: '低压',
						key: 'mzh'
					},
					{
						title: '平均值',
						key: 'zzys'
					},
				]
			}

			const tableProps2 = {
				data: [
					{
						sfsj: '家庭', sffs: 'yyyy-MM-dd HH:mm:ss', sfys: '3.3'
					}
				],
				columns: [
					{
						title: '测量场景',
						key: 'sfsj'
					},
					{
						title: '时间',
						key: 'sffs'
					},
					{
						title: '血糖数值',
						key: 'zyh'
					},
				],
			};

			return (
				<div>
					<div className={styles.echartContainer}>
						<EChart1 {...chartProps1} />
					</div>
					<Table {...tableProps1} />
					<div className={styles.echartContainer}>
						<EChart2 {...chartProps2} />
					</div>
					<Table {...tableProps2} />
				</div>
			)
		}

		return null
	}

	const modalProps = {
		title: '健康档案',
		visible,
		onCancel,
		footer: null,
		width: '80%'
	}
	return (
		<Modal {...modalProps}>
			<div className={styles.container}>
				<div className={styles.tabList}>
					<div className={cx({ active: tabId === 1 })} onClick={() => onTabChange(1)}>基本信息</div>
					<div className={cx({ active: tabId === 2 })} onClick={() => onTabChange(2)}>测量记录</div>
					<div className={cx({ active: tabId === 3 })} onClick={() => onTabChange(3)}>随访记录</div>
					<div className={cx({ active: tabId === 4 })} onClick={() => onTabChange(4)}>体检记录</div>
					<div className={cx({ active: tabId === 5 })} onClick={() => onTabChange(5)}>病例记录</div>
				</div>

				<div className={styles.title}>
					<div>档案编号：02123371716263545</div>
					<div>管理机构：宣化区卫健委</div>
					<div>建档时间：2017-03-12  13:00:12</div>
				</div>

				{renderContent()}
			</div>
		</Modal>
	)
}

export default HealthRecord;
