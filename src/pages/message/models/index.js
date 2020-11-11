/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-22 09:26:34
 */
import pathToRegexp from 'path-to-regexp';

//service
export default {
	namespace: 'messageManager',

	state: {
		name_space: 'messageManager',
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/message').exec(pathname)) {
					dispatch({ type: 'clear' });
					dispatch({ type: 'queryList' });
				}
			});
		},
	},

	effects: {
		* queryList({ payload = {} }, { call, put }) {
			const list = [
				{ id: 1, title: '手机短信', taskStatus: '未执行', content: '【芯动数据】短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短', msgMode: '手机短信', msgType: '系统信息', userType: '指定用户', orgName: 'XX体检中心', createTime: 'yyyy-MM-dd HH:mm:ss', operateTime: 'yyyy-MM-dd HH:mm:ss', createUserName: '宋恺', operateUserName: '宋恺' },
				{ id: 2, title: '手机短信', taskStatus: '未执行', content: '【芯动数据】短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短', msgMode: '手机短信', msgType: '系统信息', userType: '指定用户', orgName: 'XX体检中心', createTime: 'yyyy-MM-dd HH:mm:ss', operateTime: 'yyyy-MM-dd HH:mm:ss', createUserName: '宋恺', operateUserName: '宋恺' },
				{ id: 3, title: '手机短信', taskStatus: '未执行', content: '【芯动数据】短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短', msgMode: '手机短信', msgType: '系统信息', userType: '指定用户', orgName: 'XX体检中心', createTime: 'yyyy-MM-dd HH:mm:ss', operateTime: 'yyyy-MM-dd HH:mm:ss', createUserName: '宋恺', operateUserName: '宋恺' },
				{ id: 4, title: '手机短信', taskStatus: '未执行', content: '【芯动数据】短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短', msgMode: '手机短信', msgType: '系统信息', userType: '指定用户', orgName: 'XX体检中心', createTime: 'yyyy-MM-dd HH:mm:ss', operateTime: 'yyyy-MM-dd HH:mm:ss', createUserName: '宋恺', operateUserName: '宋恺' },
				{ id: 5, title: '手机短信', taskStatus: '未执行', content: '【芯动数据】短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短', msgMode: '手机短信', msgType: '系统信息', userType: '指定用户', orgName: 'XX体检中心', createTime: 'yyyy-MM-dd HH:mm:ss', operateTime: 'yyyy-MM-dd HH:mm:ss', createUserName: '宋恺', operateUserName: '宋恺' },
				{ id: 6, title: '手机短信', taskStatus: '未执行', content: '【芯动数据】短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短信内容短', msgMode: '手机短信', msgType: '系统信息', userType: '指定用户', orgName: 'XX体检中心', createTime: 'yyyy-MM-dd HH:mm:ss', operateTime: 'yyyy-MM-dd HH:mm:ss', createUserName: '宋恺', operateUserName: '宋恺' },
			];
			yield put({
				type: 'changeState',
				payload: {
					list,
					pagination: {
						current: 1,
						pageSize: 10,
						total: list.length,
					}
				}
			});
		},
	},

	reducers: {
		clear(state) {
			return {
				...state,
				list: [],
				pagination: {
					current: 1,
					pageSize: 10,
					total: 0,
				},
			};
		},
		changeState(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
	},
};
