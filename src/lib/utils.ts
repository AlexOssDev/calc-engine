import { ID_FORMAT, type IField, type IStack } from './types';

const CHARCODE_FOR_A = 97;

function locateField(id: string, stack: IStack): IField | null {
	if (!id.match(ID_FORMAT)) {
		return null;
	}
	const row: number = id.charCodeAt(0) - CHARCODE_FOR_A;
	const column: number = +id[1];

	return stack.rows[row].fields[column];
}
