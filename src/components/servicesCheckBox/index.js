
import React from 'react';
import { Checkbox, Radio } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons'

import styles from './index.less';

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};
const ServicesCheckBox = ({
	option,
	value,
	onChange
}) => {
	const triggerChange = changedValue => {
		onChange && onChange(changedValue);
	};

	return (
		<div className={styles.container}>
			<Checkbox.Group className={styles.checkboxDiv}>
				{
					[1, 2, 3, 4, 5].map((obj, index) => (
						<div key={index} className={styles.cbItem}>
							<div>
								<Checkbox value={obj} />
								<span className={styles.cbName}>多参数报告{index}</span>
							</div>
							<div>未设置</div>
						</div>
					))
				}
			</Checkbox.Group>
			<div className={styles.iconDiv}>
				<DoubleRightOutlined className={styles.icon} />
			</div>

			<Radio.Group className={styles.radioDiv}>
				<Radio style={radioStyle} value={1}>1次/周</Radio>
				<Radio style={radioStyle} value={2}>1次/月</Radio>
				<Radio style={radioStyle} value={3}>1次/季度</Radio>
			</Radio.Group>
		</div>
	)
}

export default ServicesCheckBox
