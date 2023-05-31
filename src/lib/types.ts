export const ID_FORMAT = /[a-zA-Z]\d+/;

export interface IStack {
	name: string;
	rows: IRow[];
}

export interface IRow {
	label: string;
	fields: IField[];
	fieldsAreSwappable?: boolean;
}

export interface IField {
	label?: string;
	value?: any;
}
