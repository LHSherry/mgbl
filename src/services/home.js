
import Axios from '@/utils/axios';
export const GetAlarmInfo = async (payload) => {//获取告警信息
	return Axios('/api/1.0/bigdata/GetAlarmInfo',{},"GET")
}

export const GetPatientInfo = async (payload) => {//获取患者数量
	return Axios('/api/1.0/bigdata/GetPatientInfo',{},"GET")
}

export const GetDeviceProvideInfo = async (payload) => {//获取设备数量
	return Axios('/api/1.0/bigdata/GetDeviceProvideInfo',{},"GET")
}
export const GetPatientInfo_Age = async (payload) => {//获取患者年龄分段
	return Axios('api/1.0/bigdata/GetPatientInfo_Age',{},"GET")
}
export const GetPatientNewInfo = async (payload) => {//获取近一个月的新增患者信息
	return Axios('/api/1.0/bigdata/GetPatientNewInfo',{},"GET")
}
export const GetAlarmNewInfo = async (payload) => {//获取最近一个月的告警信息
	return Axios('/api/1.0/bigdata/GetAlarmNewInfo',{},"GET")
}
// export const GetPatientChartInfo = async (payload) => {//获取最近6个月的患者新增趋势信息
// 	return Axios('/api/1.0/bigdata/GetPatientChartInfo',{},"GET")
// }
export const GetPatientChartInfo = async (payload) => {//获取最近6个月的患者新增趋势信息
	return Axios('/api/1.0/bigdata/GetPatientChartInfo',{},"GET")
}
export const GetAlarmChartInfo = async (payload) => {//获取最近6个月的报警趋势信息
	return Axios('/api/1.0/bigdata/GetAlarmChartInfo',{},"GET")
}