/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-17 21:41:33
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';

import classNames from 'classnames/bind';

import List from '@/components/list';
import ModalHealthRecord from '@/components/modal/healthRecord';

import styles from './index.less';

const cx = classNames.bind(styles);
const Detail = ({
	patientDetail: {
		detail
	}
}) => {
	const [tabId, setTabId] = useState(1);
	const [healthModal, setHealthModal] = useState(false);

	const onTabChange = (tab) => {
		setTabId(tab);
	};

	let data;
	if (tabId === 1) {
		data = [
			'姓名', detail.name,
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
			'健康档案链接', <a onClick={() => setHealthModal(true)}>查看</a>,
			'合同名称（已签约）', <Link to="">宣化区随访合同模板HT001</Link>,
			'签约链接（未签约）', <Link to="">签约</Link>
		];
	} else if (tabId === 2) {
		data = [
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
			'残疾说明', '无',
			'合同名称', '',
			'签约链接', ''
		];
	} else if (tabId === 3) {
		data = [
			'发放设备状态', '无需发放',
			'发放设备状态', '发放设备',
			'发放设备状态', 'HB288088',
		];
	}

	const healthModalProps = {
		visible: healthModal,
		data: detail,
		onCancel: () => setHealthModal(false)
	}

	return (
		<div className={styles.container}>
			<div className={styles.tabList}>
				<div className={cx({ active: tabId === 1 })} onClick={() => onTabChange(1)}>基本信息</div>
				<div className={cx({ active: tabId === 2 })} onClick={() => onTabChange(2)}>健康信息</div>
				<div className={cx({ active: tabId === 3 })} onClick={() => onTabChange(3)}>随访信息</div>
			</div>

			<List data={data} />

			<ModalHealthRecord {...healthModalProps} />
		</div>
	);
};

export default connect(({ patientDetail, loading }) => ({
	patientDetail,
	loading: loading.models['patientDetail']
}))(Detail);
