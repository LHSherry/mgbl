
// import { Link } from 'umi';

// import ENUM from '@/const'

// import { Filters as deviceTplFilters, TableColumns as deviceTplColumns } from '@/pages/deviceTpl/config';
// // import { Filters as orgFilters, TableColumns as orgColumns } from '@/pages/org/config';
// import { Filters as patientFilters, TableColumns as patientColumns } from '@/pages/patient/config';

// export const getFilters = (moduleType, querySource) => {
// 	switch (moduleType) {
// 		case ENUM.ModuleEnum.DEVICETPL:
// 			return deviceTplFilters.map(obj => {
// 				switch (obj.key) {
// 					case 'deviceDataTyps':
// 						return {
// 							...obj,
// 							option: querySource.deviceDataTyps
// 						}
// 					default:
// 						return obj
// 				}
// 			});
// 		case ENUM.ModuleEnum.ORG:
// 			return orgFilters;
// 		case ENUM.ModuleEnum.PATIENT:
// 			return patientFilters;
// 		default:
// 			return []
// 	}
// }

// export const TableColumns = {
// 	[ENUM.ModuleEnum.DEVICETPL]: deviceTplColumns,
// 	[ENUM.ModuleEnum.ORG]: orgColumns,
// 	[ENUM.ModuleEnum.PATIENT]: patientColumns,
// 	[ENUM.ModuleEnum.CONTRACT]: [
// 		{
// 			type: 'input',
// 			name: '设备编号',
// 			key: 'deviceCode',
// 			placeholder: '请输入设备编号'
// 		},
// 		{
// 			type: 'input',
// 			name: '设备名称',
// 			key: 'deviceName',
// 			placeholder: '请输入设备名称'
// 		},
// 		{
// 			type: 'select',
// 			name: '型号',
// 			key: 'mode',
// 			placeholder: '请选择',
// 			option: [{ id: '', name: '全部' }]
// 		},
// 	],
// 	[ENUM.ModuleEnum.DEVICE]: [
// 		{
// 			title: '设备编号',
// 			key: 'number'
// 		},
// 		{
// 			title: '型号',
// 			key: 'mode',
// 		},
// 		{
// 			title: '名称',
// 			key: 'name'
// 		},
// 		{
// 			title: '设备类型',
// 			key: 'type'
// 		},
// 		{
// 			title: '状态',
// 			key: 'status'
// 		},
// 	],
// };
