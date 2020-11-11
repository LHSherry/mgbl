/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-23 14:04:38
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-03 21:38:16
 */
import { formatTime } from '@/utils';

export const getListDataByTab = ({ tab, detail, model, querySource }) => {
	let result = [];
	switch (tab) {
		case 1:
			result = [
				'名称', detail.modelName,
				'类型', detail.deviceType,
				'型号', detail.modelName,
				'厂家名称', model.manufacturer,
				'厂家地址', model.address,
				'厂家联系方式', model.phone,
				'保质日期（月）', model.serviceLife,
				'医疗器械注册证号', model.certifiCFDA,
				'设备SN', detail.sn
			];
			break;
		case 2:
			result = [
				'入库日期', formatTime(detail.inDate, 'yyyy-MM-dd'),
				'生产批号', detail.batchNo,
				'设备编号', detail.sn
			];
			break;
		case 3:
			result = [
				'设备状态', detail.status,
				'所属机构', detail.deptName,
				'当前使用者', detail.patientName,
				'所属合同', detail.contractName
			];
			break;
		default:
			break;
	}

	return result;
};
