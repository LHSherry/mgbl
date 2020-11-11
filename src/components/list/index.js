
import React from 'react';

import { Button } from 'antd';

import styles from './index.less';

const List = ({
	data = [],
	rows = 8,
	btns = []
}) => {
	const count = Math.ceil(data.length / rows);
	const rowArr = new Array(count).fill(1);
	const itemArr = new Array(rows).fill(1);

	return (
		<div>
			<div className={styles.table}>
				{
					rowArr.map((_, index) => (
						<div key={index} className={styles.tableRow}>
							{
								itemArr.map((_, j) => {
									const item = data[index * rows + j];
									return <div key={j}>{item}</div>;
								})
							}
						</div>
					))
				}
			</div>

			{
				btns.length ?
					<div className={styles.btnList}>
						{
							btns.map((bn, index) => <Button key={index} {...bn}>{bn.name}</Button>)
						}
					</div>
					: null
			}
		</div>
	);
};

export default List;
