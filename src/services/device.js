
import Axios from '@/utils/axios';

// 获取设备列表查询条件
export const getDeviceQuerySource = async () => {
	return Axios('/api/1.0/device/NewQueryInstanceCondtion')
}

// 获取设备列表
export const getDeviceList = async (data) => {
	return Axios('/api/1.0/device/QueryDeviceInstance', data, 'post')
}

// 获取设备详情
export const getDeviceDetail = async (data) => {
	return Axios('/api/1.0/device/GetDeviceInstance', data);
}

// 导入设备实例
export const importSignDevice = async (data) => {
	return Axios('/api/1.0/device/BatchRegisterDeviceInstance', data, 'post');
}

// 批量导入设备实例
export const importBatchDeviceReady = async (data ) => {
	return Axios('/api/1.0/device/ReadyImportDeviceInstances',data, 'post');
}

// 批量导入设备实例 上传文件
export const importBatchDeviceUpload = async (data) => {
	let form = new FormData()
	let keys = Object.keys(data)
	keys.forEach(key => {
		form.append(key, data[key])
	})
	return Axios('/api/1.0/device/ImportDeviceInstances', form, 'post', {
		'Content-Type': 'multipart/form-data'
	});
}

// 批量导入设备实例
export const importBatchDeviceAdminReady = async ({ organId, deptId, deviceModelId, inDate, validMonths } = {}) => {
	return Axios('/api/1.0/device/ReadyImportDeviceInstancesToLibrary', {
		organId, deptId, deviceModelId, inDate, validMonths
	}, 'post');
}
// 批量导入设备实例 上传文件
export const importBatchDeviceAdminUpload = async (data) => {
	let form = new FormData()
	let keys = Object.keys(data)
	keys.forEach(key => {
		form.append(key, data[key])
	})
	return Axios('/api/1.0/device/ImportDeviceInstanceToLibrary', form, 'post', {
		'Content-Type': 'multipart/form-data'
	});
}

// 保存设备实例
export const saveDevice = async (data) => {
	return Axios('/api/1.0/device/SaveDeviceInstance', data, 'post');
}

// 删除设备实例
export const deleteDevice = async (data) => {
	return Axios('/api/1.0/device/DeleteDeviceInstances', data, 'post')
}

// 获取设备模板列表查询条件
export const getDeviceTplQuerySource = async () => {
	return Axios('/api/1.0/device/NewQueryModelConditon')
}

// 获取设备模板列表
export const getDeviceTplList = async (data) => {
	return Axios('/api/1.0/device/QueryDeviceModels', data, 'post')
}

// 获取设备模板详情
export const getDeviceTplDetail = async (data) => {
	return Axios('/api/1.0/device/GetDeviceModel', data);
}

// 创建设备模板时需要的数据源
export const createDeviceTpl = async () => {
	return Axios('/api/1.0/device/CreateDeviceModel');
}

// 保存设备模板时需要的数据源
export const saveDeviceTpl = async (data) => {
	return Axios('/api/1.0/device/SaveDeviceModel', data, 'post')
}

// 删除设备模板
export const delDeviceTpl = async (data) => {
	return Axios('/api/1.0/device/DeleteDeviceModels', data, 'post')
}

// 归还设备
export const reclaimDevice = async (data) => {
	return Axios('/api/1.0/device/ReclaimDevice', data)
}

// 报废设备
export const scrapDevice = async (data) => {
	return Axios('/api/1.0/device/ScrapDevices', data, 'post')
}

// 查询设备计划
export const QueryProvideDevicePlans = async (data) => {
	return Axios('/api/1.0/device/QueryProvideDevicePlans',{queryStr:data},"GET")
}
// 发放设备
export const provideDevice = async (data) => {
	return Axios('/api/1.0/device/ProvideDevice', {patientId:data.patientId,sn:data.sn},'GET')
}
// 获取设备型号
export const GetDivceModelRefer = async (data) => {
	return Axios('/api/1.0/device/GetDivceModelRefer', data)
}
//获取部门的机构
export const GetOrganDepts = async (data) => {
	return Axios('/api/1.0/organization/GetOrganItems', {parentId:data}, 'GET');
}
//获取部门
export const GetOrganDeptsss = async (data) => {
	return Axios('/api/1.0/organization/GetOrganDepts', {organId:data}, 'GET');
}

