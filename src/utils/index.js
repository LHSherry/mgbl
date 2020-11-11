
import { Input, DatePicker, InputNumber, Select } from 'antd';
import InputSelectModal from '@/components/inputModal'
import ServicesCheckBox from '@/components/servicesCheckBox';
import MBSelect from '@/components/select';
import LazyArea from '@/components/lazyArea';

const { RangePicker } = DatePicker;

export const getField = (item) => {
	const { type, ...props } = item;
	switch (type) {
		case 'input':
			return <Input {...props} />;

		case 'inputNumber':
			return <InputNumber style={{ width: '100%' }} {...props} />

		case 'select':
			return (
				<MBSelect {...props} />
			);
		case 'antSelect':
			const { option = [], hasAll, ...antSelectProps } = props;
			return (
				<Select showArrow={true} {...antSelectProps}>
					{
						hasAll ? <Select.Option key={-1} value={null}>全部</Select.Option> : null
					}
					{
						option.map((opt, index) => <Select.Option key={index} value={opt.value}>{opt.name}</Select.Option>)
					}
				</Select >
			);
		case 'rangePicker':
			return <RangePicker {...props} />;

		case 'datePicker':
			return <DatePicker style={{ width: '100%' }}  {...props} />;

		case 'selectModal':
			return <InputSelectModal {...props} />;

		case 'servicesCheckBox':
			return <ServicesCheckBox {...props} />;

		case 'textarea':
			return <Input.TextArea {...props} />

		case 'lazyArea':
			return <LazyArea {...props} />

		default:
			return null;
	}
};

/**
 * 格式化显示时间
 * @param time
 * @param format  如"yyyy.MM.dd HH:mm"   "yyyy.MM.dd"
 * @returns {*}
 */
export const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
	if (!time) return '';

	if (typeof (time) === 'string') time = time.replace(/-/g, '/');
	let t = new Date(time);
	let tf = function (i) {
		return (i < 10 ? '0' : '') + i;
	};
	return format.replace(/YYYY|yyyy|YY|yy|MM|DD|dd|HH|hh|mm|ss/g, function (a) {
		switch (a) {
			case 'YYYY':
			case 'yyyy':
				return tf(t.getFullYear());
			case 'YY':
			case 'yy':
				const str = tf(t.getFullYear());
				return str.substr(str.length - 2, 2);
			case 'MM':
				return tf(t.getMonth() + 1);
			case 'mm':
				return tf(t.getMinutes());
			case 'DD':
			case 'dd':
				return tf(t.getDate());
			case 'HH':
			case 'hh':
				return tf(t.getHours());
			case 'ss':
				return tf(t.getSeconds());
			default:
				return '';
		}
	});
};

export const getUser = () => {
	const userStr = sessionStorage.getItem('user');
	return userStr ? JSON.parse(userStr) : null;
};

export const isAdmin = ({ roles = [] }) => {
	return roles.includes('SysAdministrator') || roles.includes('OrganManager')
}
