/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-04 20:46:28
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-24 20:40:21
 */
import React from 'react';
import { Badge, Avatar, Popover } from 'antd';

import { MailOutlined, UserOutlined } from '@ant-design/icons';

import { getUser } from '@/utils';

import styles from './index.less';

const Header = ({
	loginOut
}) => {
	const user = getUser() || {};

	const content = (
		<div className={styles.popContent}>
			<Avatar src={user.avatarUrl} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597660553743&di=59f8ddaa37cf2e6d57a0b210d2631433&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0" size={64} />
			<div className={styles.userName}>
				{user.userName}
			</div>
			<div className={styles.orgName}>
				{user.organName}
			</div>
			<div className={styles.bnExit} onClick={loginOut}>退出登录</div>
		</div>
	)

	return (
		<div className={styles.container}>
			<div className={styles.title}>慢病管理平台</div>
			{
				user ?
					<div className={styles.content}>
						<div className={styles.mail}><Badge dot={true}><MailOutlined /></Badge></div>

						<Popover content={content}>
							<div className={styles.user}>
								<Avatar src={user.avatarUrl} shape="square" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597660553743&di=59f8ddaa37cf2e6d57a0b210d2631433&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0" className={styles.avatar} />
								<span>{user.userName}</span>
							</div>
						</Popover>
					</div>
					: null
			}
		</div>
	);
};

export default Header;
