/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-21 08:54:55
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-22 18:32:17
 */
import React from 'react';

import Form from '@/components/form';

import Option from '@/const';

const CreateFirst = ({
	onSubmit
}) => {
	const forms = [
		{
			type: 'input',
			name: '姓名',
			key: 'name',
			placeholder: '请输入姓名',
			rules: [{ required: true, message: '请输入姓名', whitespace: true }]
		},
		{
			type: 'select',
			name: '性别',
			key: 'sex',
			rules: [{ required: true, message: '请选择' }],
			option: Option.GenderOption
		},
		{
			type: 'datePicker',
			name: '出生日期',
			key: 'birstday',
			rules: [{ required: true, message: '请选择' }],
		},
		{
			type: 'input',
			name: '民族',
			key: 'mz',
			placeholder: '请输入民族',
			rules: [{ required: true, message: '请输入民族' }],
		},
		{
			type: 'input',
			name: '联系电话',
			key: 'phone',
			placeholder: '请输入联系电话',
			rules: [{ required: true, message: '请输入联系电话' }],
		},
		{
			type: 'input',
			name: '身份证号码',
			key: 'idCard',
			placeholder: '请输入身份证号码',
			rules: [{ required: true, message: '请输入身份证号码' }],
		},
		// {
		// 	地址
		// },
		{
			type: 'input',
			name: '详情地址',
			key: 'address',
			placeholder: '请输入详情地址',
		},
		{
			type: 'input',
			name: '职业',
			key: 'job',
			placeholder: '请输入职业',
		},
		{
			type: 'input',
			name: '工作单位',
			key: 'workplace',
			placeholder: '请输入工作单位',
		},
		{
			type: 'select',
			name: '文化程度',
			key: 'education',
			placeholder: '请选择',
			option: Option.EducationOption
		},
		{
			type: 'select',
			name: '婚姻状况',
			key: 'hy',
			placeholder: '请选择',
			option: Option.MaritalOption
		}
	];

	const btns = [
		{
			label: '下一步',
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

export default CreateFirst;
