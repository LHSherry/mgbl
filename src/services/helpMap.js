
import Axios from '@/utils/axios';

export const getList = async (data) => {
	return Axios('/login.ashx', data);
};

export const GetUnHandleSosInfos = async (data) => {
	return Axios('/api/1.0/contract/GetUnHandleSosInfos', data);
};
export const GetSosHandleWayRefer = async (data) => {
	return Axios('/api/1.0/contract/GetSosHandleWayRefer', data);
};
export const CommitSosHandleResult = async (data) => {
	return Axios('/api/1.0/contract/CommitSosHandleResult', data,"POST");
};

