
import Axios from '@/utils/axios';
//获取合同列表
export const GetTemplates = async (data) => {
	return Axios('/api/1.0/contract/GetTemplates', {onlySelf:data}, 'GET');
}
//获取合同列表
export const QueryTemplates = async (data) => {
	return Axios('/api/1.0/contract/QueryTemplates',data, 'POST');
}
//获取创建模板第一步
export const CreateNewONCDContract = async () => {
	return Axios('/api/1.0/contract/CreateNewONCDContract', {},'GET');
}
//获取创建模板第二步
export const CommitEditContractBaseInfo = async (data) => {
	return Axios('/api/1.0/contract/CommitEditContractBaseInfo', data,'POST');
}
//获取创建模板第三步
export const CommitEditContractServiceSubjects = async (data) => {
	return Axios('/api/1.0/contract/CommitEditContractServiceSubjects', data,'POST');
}
//获取创建模板第四步
export const CommitEditContractDeviceSubjects = async (data) => {
	return Axios('/api/1.0/contract/CommitEditContractDeviceSubjects',data,'POST');
}
//最后提交结算
export const CommitEditContractOver = async (data) => {
	return Axios('/api/1.0/contract/CommitEditContractOver',data,'POST');
}
//取消
export const CancelTemplateEdit = async () => {
	return Axios('/api/1.0/contract/CancelTemplateEdit', {}, 'GET');
}

//下载文件
export const GetImportPatientTemplate = async () => {
	return Axios('/api/1.0/patient/GetImportPatientTemplate', {}, 'GET');
}
//签约第一步
export const PrepareBatchSignContract = async () => {
	return Axios('/api/1.0/contract/PrepareBatchSignContract', {}, 'GET');
}
//获取部门的机构
export const GetOrganDepts = async (data) => {
	return Axios('/api/1.0/organization/GetOrganDepts', {organId:data}, 'GET');
}
//签约第二步
export const BatchSignCommitBaseInfo = async (data) => {
	return Axios('/api/1.0/contract/BatchSignCommitBaseInfo',data, 'POST');
}
//取消签约
export const CancelBatchSignContract = async () => {
	return Axios('/api/1.0/contract/CancelBatchSignContract',{}, 'GET');
}
//删除模板
export const DeleteTemplate = async (data) => {
	return Axios('/api/1.0/contract/DeleteTemplate',{templateId:data}, 'GET');
}
//编辑模板第一步
export const EditContractTemplate = async (data) => {
	return Axios('/api/1.0/contract/EditContractTemplate',{templateId:data}, 'GET');
}
//分页查询签约合同
export const QueryContract = async (data) => {
	return Axios('/api/1.0/contract/QueryContract',data, 'POST');
}
//准备发放设备
export const PreperyBatchProvide = async (taskId) => {
	return Axios('/api/1.0/device/PreperyBatchProvide',{taskId}, 'GET');
}
//批量发放设备
export const BatchProvide = async (sn) => {
	return Axios('/api/1.0/device/BatchProvide',{sn}, 'GET');
}
//关闭批量发放设备
export const CloseBatchProvide = async () => {
	return Axios('/api/1.0/device/CloseBatchProvide',{}, 'GET');
}
//查询批量签约记录
export const QueryBatchSignTask = async (data) => {
	return Axios('/api/1.0/contract/QueryBatchSignTask',data, 'POST');
}


