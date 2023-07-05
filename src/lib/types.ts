export const ID_FORMAT = /([a-zA-Z]\d+)/g;

export interface IStack {
	name: string;
	rows: IRow[];
	hidden?: boolean;
	description?: string;
}

export interface IRow {
	label: string;
	fields: IField[];
	fieldsAreSwappable?: boolean;
}

export interface IField {
	label?: string;
	value?: any;
	disabled?: boolean;
	disabledValue?: any;
}

export enum State {
	Neutral = 'neutral',
	Success = 'success',
	Error = 'error'
}
