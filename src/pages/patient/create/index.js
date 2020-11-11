/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-21 21:44:06
 */
import React, { useState } from 'react';
import { connect } from 'dva';

import { Steps } from 'antd';

import First from '../components/createFirst';
import Second from '../components/createSecond';

import styles from './index.less';

const { Step } = Steps;

const Create = () => {
	const [step, setStep] = useState(0);

	const onNext = (values) => {
		console.log('onNext:', values);
		setStep(1);
	};

	const onPrev = () => {
		setStep(0);
	};

	const onSave = () => {

	};

	return (
		<div className={styles.container}>
			<div className={styles.step}>
				<Steps current={step}>
					<Step title="基本信息" />
					<Step title="健康信息" />
				</Steps>
			</div>

			<div>
				{
					step === 0 ? <First onSubmit={onNext} /> : <Second onSubmit={onSave} onPrev={onPrev} />
				}
			</div>
		</div>
	);
};

export default connect(({ patientCreate, loading }) => ({
	patientCreate,
	loading: loading.models['patientCreate']
}))(Create);
