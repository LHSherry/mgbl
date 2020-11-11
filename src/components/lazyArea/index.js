
import React, { useState, useEffect } from 'react';

import { Cascader, message } from 'antd'

import Axios from '@/utils/axios';

const LazyArea = ({
	value,
	onChange,
	...props
}) => {
	const [option, setOption] = useState([]);

	useEffect(() => {
		queryData('3').then((result) => {
			const list = result.filter(obj => obj.name === '张家口市')
			setOption(list);
		})
	}, [])

	const queryData = (parentId = '') => {
		return new Promise(resolve => {
			Axios('/api/1.0/organization/GetAreas', { parentId }).then(data => {
				const { result = [], successed, errMessage } = data;
				if (successed) {
					resolve(result.map(obj => ({ ...obj, isLeaf: false })))
				} else {
					message.error(errMessage)
				}
			})
		})
	};

	const loadData = (selectedOptions) => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;
		queryData(targetOption.id).then((result) => {
			targetOption.loading = false;
			console.log('loadData:', result)
			if (result.length) {
				targetOption.children = result;
			} else {
				targetOption.isLeaf = true;
			}

			setOption([...option])
		})
	};

	const opt = {
		value,
		fieldNames: { label: 'name', value: 'id' },
		options: option,
		onChange,
		loadData,
		changeOnSelect: true,
	}

	return (
		<Cascader {...opt} {...props} />
	)
}

export default LazyArea;
