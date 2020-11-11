
import axios from 'axios';

import { history } from 'umi';
import {message} from "antd"
const TimeOut = 100000;
const Axios = (url, params = {}, method = 'GET', headers = {}) => {
	method = method.toUpperCase();
	if (method === 'GET' && Object.keys(params).length > 0) {
		url += '?' + toExcString(params);
	}
	return new Promise((resolve, reject) => {
		axios({
			url,
			method,
			data: (method === 'GET' ? {} : params),
			headers,
			timeout: TimeOut,
			withCredentials: true,
		}).then(result => {
			if (result.status === 200) {
				if (result.data.lostSession) {
					message.error("登录失效！")
					history.push('/user/login');
				} else {
					resolve(result.data);
				}
			} else {
				reject(result);
			}
		}).catch(error => {
			console.log(error);
			reject({
				msg: '网络异常，请重试'
			});
		});
	});

};

const toExcString = function (array, type = {
	':': '=',
	',': '&'
}) {
	let result = '';
	for (let temp in array) {
		if (array[temp] instanceof Object) {
			result += temp + '=' + encodeURI(JSON.stringify(array[temp])) + '&';
		} else {
			result += temp + '=' + encodeURI(array[temp]) + '&';
		}
	}
	return result.substring(-1, result.length - 1);
};

export default Axios;
