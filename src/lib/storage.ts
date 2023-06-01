import { writable } from 'svelte/store';
import type { IStack } from './types';

const initialData: IStack[] = [
	{
		name: 'Area of a rectangle',
		rows: [
			{
				label: 'dimensions',
				fields: [{ label: 'x', value: 20 }, { value: 69 }]
			},
			{ label: 'result', fields: [{ value: '=up(A1 * A2)' }] }
		]
	},
	{
		name: 'Area of a circle',
		rows: [
			{
				label: 'radius',
				fields: [{ value: 20 }]
			},
			{ label: 'area', fields: [{ value: '=pi * A1^2' }] }
		]
	}
];

export const dataStore = createStacks();

function createStacks() {
	const save = (value: any) =>
		typeof window !== 'undefined' && localStorage.setItem('data', JSON.stringify(value));
	const load = () =>
		typeof window !== 'undefined' && JSON.parse(localStorage.getItem('data') || 'null');

	const { subscribe, set, update } = writable<IStack[]>(load() || initialData);

	return {
		subscribe,
		push: (item: IStack) =>
			update((data) => {
				data.push(item);
				save(data);
				return data;
			}),
		pop: (): IStack | null => {
			let lastItem: IStack | undefined;
			update((data) => {
				lastItem = data.pop();
				save(data);
				return data;
			});
			return lastItem || null;
		},
		set: (data: IStack[]) => {
			set(data);
		},
		save: () =>
			update((data) => {
				save(data);
				return data;
			}),
		delete: (item: IStack) => {
			update((data) => {
				data = data.filter((stack) => stack.name != item.name);
				save(data);
				return data;
			});
		}
	};
}
