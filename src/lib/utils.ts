import { ID_FORMAT, type IField, type IStack } from './types';

const CHARCODE_FOR_A = 97;
const HUMAN_READABLE_ID = 1;

export function locateField(id: string, stack: IStack): IField | null {
	if (!id.match(ID_FORMAT)) {
		return null;
	}
	const row: number = id.toLocaleLowerCase().charCodeAt(0) - CHARCODE_FOR_A;
	const column: number = +id[1] - HUMAN_READABLE_ID;

	return stack?.rows[row]?.fields[column] || null;
}
