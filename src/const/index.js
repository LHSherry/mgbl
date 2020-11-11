
const RefreshTime = 60000;

// 模块枚举
const ModuleEnum = {
	CONTRACT: 'contract',
	DEVICE: 'device',
	ORG: 'org',
	DEVICETPL: 'deviceTpl',
	PATIENT: 'patient'
}

// 性别枚举
const GenderEnum = {
	MALE: 1,
	FEMALE: 2,
};

const GenderOption = [
	{ id: GenderEnum.MALE, name: '男' },
	{ id: GenderEnum.FEMALE, name: '女' },
];

// 学历枚举
const EducationEnum = {
	XIAOXUE: 1,
	CHUZHONG: 2,
	GAOZHONG: 3,
	DAZHUAN: 4,
	BENKE: 5,
	SHUOSHI: 6,
	BOSHI: 7,
	NONE: 0
};

const EducationOption = [
	{ id: EducationEnum.XIAOXUE, name: '小学' },
	{ id: EducationEnum.CHUZHONG, name: '初中' },
	{ id: EducationEnum.GAOZHONG, name: '高中' },
	{ id: EducationEnum.DAZHUAN, name: '大专' },
	{ id: EducationEnum.BENKE, name: '本科' },
	{ id: EducationEnum.SHUOSHI, name: '硕士' },
	{ id: EducationEnum.BOSHI, name: '博士' },
	{ id: EducationEnum.NONE, name: '无' },
];

//婚姻枚举
const MaritalEnum = {
	UNMARRIED: 0,
	MARRIED: 1,
};

const MaritalOption = [
	{ id: MaritalEnum.UNMARRIED, name: '未婚' },
	{ id: MaritalEnum.MARRIED, name: '已婚' },
];

// 血型
const BloodTypeEnum = {
	A: 'A',
	B: 'B',
	AB: 'AB',
	O: 'O',
};

const BloodTypeOption = [
	{ id: BloodTypeEnum.A, name: 'A' },
	{ id: BloodTypeEnum.B, name: 'B' },
	{ id: BloodTypeEnum.AB, name: 'AB' },
	{ id: BloodTypeEnum.O, name: 'O' },
];

// 慢病枚举
const ChronicTypeEnum = {
	GXY: 1,
	GXT: 2,
	SG: 3,
	LNR: 4,
};

const ChronicTypeOption = [
	{ id: ChronicTypeEnum.GXY, name: '高血压' },
	{ id: ChronicTypeEnum.GXT, name: '高血糖' },
	{ id: ChronicTypeEnum.SG, name: '双高' },
	{ id: ChronicTypeEnum.LNR, name: '老年人' }
];

// 依从性枚举
const ComplianceEnum = {
	COMPLIANCE: 1,
	NEVER: 0
};

const ComplianceOption = [
	{ id: ComplianceEnum.NEVER, name: '从不' },
	{ id: ComplianceEnum.COMPLIANCE, name: '服从' },
];

// 失能枚举
const DisabilityEnum = {
	SN: 1,
	BSN: 2,
	FSN: 3
};

const DisabilityOption = [
	{ id: DisabilityEnum.SN, name: '失能' },
	{ id: DisabilityEnum.BSN, name: '半失能' },
	{ id: DisabilityEnum.FSN, name: '非失能' }
];

// 是否已分配
const AssignedOption = [
	{ value: true, name: '已分配' },
	{ value: false, name: '未分配' },
]


export default {
	ModuleEnum,
	RefreshTime,
	GenderEnum, GenderOption,
	EducationEnum, EducationOption,
	MaritalEnum, MaritalOption,
	BloodTypeEnum, BloodTypeOption,
	ChronicTypeEnum, ChronicTypeOption,
	ComplianceEnum, ComplianceOption,
	DisabilityEnum, DisabilityOption,
	AssignedOption
};
