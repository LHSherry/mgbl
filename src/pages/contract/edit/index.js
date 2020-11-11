
import React from 'react';

import { connect } from 'dva';

import Form from '@/components/form';

import styles from './index.less';

const Edit = ({
	contractEdit,
	dispatch,
}) => {

	// 提交事件
	const onSubmit = () => {

	};

	const forms = [
		{
			type: 'input',
			name: '合同名称',
			key: 'name',
			placeholder: '请输入合同名称',
			rules: [{ required: true, message: '请输入合同名称', whitespace: true }]
		},
		{
			type: 'servicesCheckBox',
			name: '服务内容',
			key: 'services',
		},
		{
			type: 'select',
			name: '设备型号',
			key: 'type',
			rules: [{ required: true, message: '请选择' }],
			option: [
				{ id: 1, name: '血压计' },
				{ id: 2, name: '血糖计' },
				{ id: 3, name: 'SOS呼救手表' }
			]
		},
		{
			type: 'selectModal',
			name: '设备型号',
			key: 'mode',
			rules: [{ required: true, message: '请输入设备型号' }],
		},
		{
			type: 'select',
			name: '所属区域',
			key: 'mz',
			placeholder: '请输入民族',
			option: [
				{ id: 1, name: '血压计' },
				{ id: 2, name: '血糖计' },
				{ id: 3, name: 'SOS呼救手表' }
			]
		},
		{
			type: 'selectModal',
			name: '机构名称',
			key: 'phone',
			placeholder: '请输入厂家地址',
		},
		{
			type: 'select',
			name: '医生名称',
			key: 'idCard',
			placeholder: '请选择医生名称',
			option: [
				{ id: 1, name: '血压计' },
				{ id: 2, name: '血糖计' },
				{ id: 3, name: 'SOS呼救手表' }
			]
		},
	];

	const btns = [
		{
			label: '保存合同模板',
			htmlType: 'submit',
			type: 'primary',
		}
	];

	// 通用Form表单参数
	const formProps = {
		forms,
		onFinish: onSubmit,
		btns,
		layouts: {
			wrapperCol: { span: 12 },
		}
	};

	return (
		<div className={styles.container}>
			<Form {...formProps} />
		</div>
	);
};

export default connect(({ contractEdit, loading }) => ({
	contractEdit,
	loading: loading.models['contractEdit']
}))(Edit);
