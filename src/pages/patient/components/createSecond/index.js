/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-21 08:54:55
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-22 18:32:25
 */
import React from 'react';

import Form from '@/components/form';

import Option from '@/const';

const CreateSecond = ({
	onSubmit,
	onPrev
}) => {
	const forms = [
		{
			type: 'select',
			name: '慢病类型',
			key: 'mblx',
			rules: [{ required: true, message: '请选择' }],
			option: Option.ChronicTypeOption
		},
		{
			type: 'input',
			name: '体重',
			placeholder: '请输入体重',
			key: 'tz',
			suffix: 'KG'
		},
		{
			type: 'input',
			name: '身高',
			placeholder: '请输入身高',
			key: 'sg',
			suffix: 'CM'
		},
		{
			type: 'select',
			name: '血型',
			key: 'xx',
			placeholder: '请选择',
			option: Option.BloodTypeOption
		},
		{
			type: 'input',
			name: '摄盐情况',
			key: 'syqk',
			placeholder: '请输入摄盐情况',
		},
		// {
		// 	地址
		// },
		{
			type: 'select',
			name: '服药依从性',
			key: 'fyycx',
			option: Option.ComplianceOption
		},
		{
			type: 'input',
			name: '睡眠情况',
			key: 'smqk',
			placeholder: '请输入睡眠情况',
		},
		{
			type: 'input',
			name: '体育锻炼频率',
			key: 'tyTimes1',
			suffix: '次/每周'
		},
		{
			type: 'input',
			name: '体育锻炼量',
			key: 'tyTimes',
			suffix: '分钟/每次'
		},
		{
			type: 'input',
			name: '抽烟量',
			key: 'cyyjqk',
			suffix: '支/周'
		},
		{
			type: 'input',
			name: '饮酒量',
			key: 'cyyjqk',
			suffix: '两/周'
		},
		{
			type: 'input',
			name: '药物过敏史',
			key: 'yhgms',
			placeholder: '请输入药物过敏史',
		},
		{
			type: 'input',
			name: '疾病史',
			key: 'jbs',
			placeholder: '请输入疾病史',
		},
		{
			type: 'input',
			name: '手术史',
			key: 'sss',
			placeholder: '请输入手术史',
		},
		{
			type: 'input',
			name: '残疾说明',
			key: 'cjsm',
			placeholder: '请输入残疾说明',
		},
		{
			type: 'select',
			name: '是否为失能老人',
			key: 'snlr',
			placeholder: '请选择',
			option: Option.DisabilityOption
		}
	];

	const btns = [
		{
			label: '上一步',
			onClick: onPrev
		},
		{
			label: '提交',
			htmlType: 'submit',
			type: 'primary',
		}
	];

	const formProps = {
		forms,
		onFinish: onSubmit,
		btns
	};
	return (
		< div >
			<Form {...formProps} />
		</div >
	);
};

export default CreateSecond;
