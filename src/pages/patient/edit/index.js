/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-22 23:32:15
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';

import classNames from 'classnames/bind';

import ListForm from '@/components/listForm';

import ENUM from '@/const';

import styles from './index.less';

const cx = classNames.bind(styles);
const Edit = ({
	patientEdit: {
		detail
	}
}) => {
	const [tabId, setTabId] = useState(1);

	const onTabChange = (tab) => {
		setTabId(tab);
	};

	const onSaveHandler = (values) => {
		console.log('onSaveHandler:', values);
	};

	console.log('detail', detail);

	const data = [
		'姓名',
		{ type: 'input', key: 'name', value: detail.name, },
		'性别',
		{ type: 'select', key: 'sex', value: detail.sex, option: ENUM.GenderOption, hasAll: true },
		'出生日期',
		{ type: 'datePicker', key: 'birthday', value: detail.birthday },
		'年龄',
		{ type: 'input', key: 'age', value: detail.age },
		'民族',
		{ type: 'input', key: 'mz', value: detail.mz },
		'身份证号码',
		{ type: 'input', key: 'sfzh', value: detail.sfzh },
		'联系电话',
		{ type: 'input', key: 'phone', value: detail.phone },
		'职业',
		{ type: 'input', key: 'job', value: detail.job },
		'工作单位',
		{ type: 'input', key: 'workplace', value: detail.workplace },
		'地址',
		{ type: 'input', key: 'address', value: detail.address },
		'文化程度',
		{ type: 'select', key: 'wenhua', value: detail.wenhua, option: ENUM.EducationOption },
		'婚姻状况',
		{ type: 'select', key: 'hunyin', value: detail.hunyin, option: ENUM.MaritalOption },
		'所属家庭医生',
		{ type: 'input', key: 'doctor', value: detail.doctor },
		'所属急救医生',
		{ type: 'input', key: 'doctor1', value: detail.doctor1 },
		'', '',
		'', '',
		'健康档案链接', <Link to="">查看</Link>,
		'合同名称（已签约）', <Link to="">宣化区随访合同模板HT001</Link>,
		'签约链接（未签约）', <Link to="">签约</Link>
	];

	const listFormProps = {
		initialValues: detail,
		data,
		btns: [
			{
				type: 'primary',
				htmlType: 'submit',
				name: '确认保存'
			}
		],
		onSubmit: onSaveHandler
	};

	return (
		<div className={styles.container}>
			<div className={styles.tabList}>
				<div className={cx({ active: tabId === 1 })} onClick={() => onTabChange(1)}>基本信息</div>
				<div className={cx({ active: tabId === 2 })} onClick={() => onTabChange(2)}>健康信息</div>
			</div>

			<ListForm {...listFormProps} />
		</div>
	);
};

export default connect(({ patientEdit, loading }) => ({
	patientEdit,
	loading: loading.models['patientEdit']
}))(Edit);
