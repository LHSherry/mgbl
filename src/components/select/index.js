
import React, { useState, useEffect } from 'react';

import { Select } from 'antd';

const Container = ({
	value,
	option = [],
	onChange,
	mode,
	hasAll,
	...props
}) => {
	const [current, setCurrent] = useState(value);

	useEffect(() => {
		let tempValue = value;
		if (!Array.isArray(tempValue)) {
			tempValue = [tempValue];
		}

		tempValue = tempValue.filter(obj => obj);
		if (mode === 'multiple') {
			tempValue = tempValue.map(obj => obj ? obj.value : '');
		} else {
			tempValue = tempValue.length ? tempValue[0].value : hasAll ? '' : undefined
		}
		console.log('tempValue:', tempValue)
		setCurrent(tempValue);
	}, [value])

	const triggerChange = changedValue => {
		onChange && onChange(changedValue);
	};

	const onChangeHandler = (val) => {
		let result;
		if (!Array.isArray(val)) {
			val = [val];
		}

		val = val.filter(obj => option.find(opt => opt.value === obj));

		result = val.map(obj => {
			let item = option.find(opt => opt.value === obj);
			return { ...item, checked: true }
		})

		triggerChange(result);
	}

	return (
		<Select {...props} mode={mode} showArrow={true} onChange={onChangeHandler} value={current}>
			{
				hasAll ? <Select.Option key={-1} value=''>全部</Select.Option> : null
			}
			{
				option.map((opt, index) => <Select.Option key={index} value={opt.value}>{opt.name}</Select.Option>)
			}
		</Select >
	)
}

export default Container;
