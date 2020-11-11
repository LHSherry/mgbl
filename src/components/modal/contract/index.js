
import React, { useState } from 'react';

import { Modal } from 'antd';

import List from '@/components/list';

const ModalContract = ({
	data = {},
	children,
}) => {
	const [visible, setVisible] = useState(false);

	const listData1 = [
		'合同名称', '宣化区随访合同模板',
		'合同期限', '长期',
		'是否自动续约', '自动续约',
		'服务内容', '健康报告',
		'报告服务范围', '多参',
		'报告服务频率', '1次/季度',
		'服务内容', '随访服务',
		'随访服务范围', '多参',
		'随访服务频率', '1次/季度'
	]

	const listData2 = [
		'设备型号', '爱奥乐血压AAL-001'
	]

	const listData3 = [
		'发放模式', '租赁/销售/免费',
		'设备费用（元）', '0.00',
		'服务费用（元）', '0.00',
		'应收费用（元）', '0.00',
		'实收费用（元）', '0.00'
	]

	const modalProps = {
		visible,
		title: `合同详情(合同编号:${data.code})`,
		onCancel: () => setVisible(false),
		width: '80%',
		footer: null

	}
	return (
		<span>
			<span onClick={() => setVisible(true)}>{children}</span>
			<Modal {...modalProps}>
				<div>
					<div>合同信息</div>
					<List rows={6} data={listData1} />
					<div>支持设备</div>
					<List rows={2} data={listData2} />
					<div>发放模式及相关费用</div>
					<List rows={6} data={listData3} />
				</div>
			</Modal>
		</span>

	)
}


export default ModalContract
