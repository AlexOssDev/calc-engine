import { writable } from 'svelte/store';
import type { IStack } from './types';

const initialData: IStack[] = [];

export const dataStore = createStacks();

function createStacks() {
	const save = (value: any) =>
		typeof window !== 'undefined' && localStorage.setItem('data', JSON.stringify(value));
	const load = () =>
		typeof window !== 'undefined' && JSON.parse(localStorage.getItem('data') || 'null');

	const { subscribe, set, update } = writable<IStack[]>(load() || initialData);

	const deleteByName = (data: IStack[], item: IStack, dontSave?: boolean) => {
		const filtered = data.filter((stack) => {
			return stack.name !== item.name;
		});
		dontSave || save(filtered);
		return filtered;
	};

	return {
		subscribe,
		push: (item: IStack) =>
			update((data) => {
				const filtered = deleteByName(data, item, true);
				filtered.push(item);
				save(filtered);
				return filtered;
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
		delete: (item: IStack) => update((data) => deleteByName(data, item))
	};
}
