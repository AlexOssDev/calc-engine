import { writable } from 'svelte/store';

export const dataStore = writable([
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
]);
