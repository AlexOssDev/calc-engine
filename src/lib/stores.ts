import { writable } from 'svelte/store';

export const dataStore = writable([
	{
		name: 'Area',
		rows: [
			{
				label: 'dimensions',
				fields: [{ label: 'x', value: 20 }, { value: 69 }]
			},
			{ label: 'result', fields: [{ value: '=up(A1 * A2)' }] }
		]
	}
]);
