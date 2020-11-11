
import React, { useState } from 'react';

import classNames from 'classnames/bind';

import SelectModal from '../modal/selectModule';

import styles from './index.less';

const cx = classNames.bind(styles);
const InputModal = ({
	title,
	moduleType,
	multiple = false,
	value = [],
	placeholder,
	renderName = (record) => record.name,
	onChange
}) => {
	console.log('moduleType:', moduleType)
	const [modalVisible, setModalVisible] = useState(false);

	const triggerChange = changedValue => {
		onChange && onChange(changedValue);
	};

	const onClearHandler = () => {
		if (multiple) {
			triggerChange([]);
		} else {
			triggerChange([]);
		}
	}

	const onSelectHandler = (values) => {
		console.log('onSelectHandler:', values);
		triggerChange(values);
		onHideModal();
	}

	const onShowModal = () => {
		setModalVisible(true);
	}

	const onHideModal = () => {
		setModalVisible(false);
	}

	const modalProps = {
		title,
		moduleType,
		multiple,
		value,
		onOk: onSelectHandler,
		onCancel: onHideModal
	}

	return (
		<div className={styles.container}>
			<div className={cx('input', { tip: value.length === 0 })}>{value.length === 0 ? placeholder : value.map(obj => renderName(obj)).join('、')}</div>
			<div className={styles.bnSearch} onClick={onShowModal}>查询</div>
			<div className={styles.bnClear} onClick={onClearHandler}>清除</div>

			{modalVisible ? <SelectModal {...modalProps} /> : null}
		</div>
	)
}

export default InputModal
