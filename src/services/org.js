
import Axios from '@/utils/axios';


// 查询机构列表包含通过id查找
export const queryOrgList = async (data) => {
	return Axios('/api/1.0/organization/GetOrganItems', {parentId:data}, 'GET')
}

// 获取员工类型
export const querystation = async (data) => {
	return Axios('/api/1.0/organization/GetStationUsers', {stationId:data}, 'GET')
}
// 保存职位
export const savestations = async (data) => {
	return Axios('/api/1.0/organization/SaveStation', data, 'post')
}
// 请求新增机构
export const querynewOrg = async (data) => {
	return Axios('/api/1.0/organization/AddOrganization',{parentId:data}, 'GET')
}
// 请求新增部门
export const AddDepartment = async (data) => {
	return Axios('/api/1.0/organization/AddDepartment',{parentId:data}, 'GET')
}
// 请求新增职位
export const AddStation = async (data) => {
	return Axios('/api/1.0/organization/AddStation',{parentId:data}, 'GET')
}
// 删除机构
export const deleteOrg = async (data) => {
	return Axios('/api/1.0/organization/DeleteOrganization', {organId:data},'GET')
}
//删除职位
export const deletestation = async (data) => {
	return Axios('/api/1.0/organization/DeleteStation', {stationId:data},'GET')
}
// 查找区域
export const getarea = async (data) => {
	return Axios('/api/1.0/organization/GetAreas',{parentId:data}, 'GET')
}

// 保存机构信息
export const saveOrg = async (data) => {
	return Axios('/api/1.0/organization/SaveOrganization', data, 'post');
}
//注册用户
export const SaveUser = async (data) => {
	return Axios('/api/1.0/organization/RegisterUser', data, 'post');
}
//保存用户
export const SaveUserr = async (data) => {
	return Axios('/api/1.0/organization/SaveUser', data, 'post');
}
//删除用户
export const RemoveUserFromStation = async ({stationId,userId}) => {
	return Axios('/api/1.0/organization/RemoveUserFromStation',{stationId,userId}, 'GET');
}
//添加用户至职位
export const AddUserToStation = async (data) => {
	return Axios('/api/1.0/organization/AddUserToStation', data, 'post');
}
//获取未分配职位员工
export const GetAllFreeUsers = async (data) => {
	return Axios('/api/1.0/organization/GetAllFreeUsers', {organId:data}, 'GET');
}
//注册用户成为机构管理员
export const RegisterUserAsOrgAdminstrators = async (data) => {
	return Axios('/api/1.0/organization/RegisterUserAsOrgAdminstrators', data, 'POST');
}
//获取指定id机构/部门信息
export const GetOrganizationItem = async (data) => {
	return Axios('/api/1.0/organization/GetOrganizationItem', {organId:data}, 'GET');
}
//获取指定id职位信息
export const GetStation = async (data) => {
	return Axios('/api/1.0/organization/GetStation', {stationId:data}, 'GET');
}
//获取指定idy员工信息
export const GetUser = async (data) => {
	return Axios('/api/1.0/organization/GetUser', {userId:data}, 'GET');
}
//获取用户列表
export const QueryUsers = async (data) => {
	return Axios('/api/1.0/organization/QueryUsers', data, 'POST');
}
//获取机构本用户机构参照
export const GetOrganRefer = async (data) => {
	return Axios('/api/1.0/organization/GetOrganRefer', {parentId:data}, 'GET');
}
//禁用用户
export const BlockUser = async (data) => {
	return Axios('/api/1.0/organization/BlockUser', {userId:data}, 'GET');
}
//解封用户
export const UnBlockUser = async (data) => {
	return Axios('/api/1.0/organization/UnBlockUser', {userId:data}, 'GET');
}
