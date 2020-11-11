
import Axios from '@/utils/axios';
export const ImportPatientFromExcel = async (data) => {
	return Axios('/api/1.0/patient/QueryPatients', data, 'POST')
}
//获取慢病类型
export const GetDisabledTypeRefer = async (data) => {
	return Axios('​/api/1.0/patient/GetDisabledTypeRefer', {stationId:data}, 'GET')
}
//获取失能参照
export const GetNcdTypeRefer = async (data) => {
	return Axios('​/api/1.0/patient/GetNcdTypeRefer', {stationId:data}, 'GET')
}
