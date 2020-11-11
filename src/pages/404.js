
import React from 'react';
import { history } from 'umi';

import { Button } from 'antd';

export default () => {

	return (
		<div className="es-container" style={{ paddingTop: 12, paddingBottom: 12 }}>
			<h1 style={{ color: '#ff4f2b', fontSize: 24 }}>404</h1>
			<p>找不到该页面</p>
			<Button type="primary" onClick={() => history.push('/')}>回到首页</Button>
		</div>
	);
};
