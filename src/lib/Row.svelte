<script lang="ts">
	import { ID_FORMAT, type IRow, type IStack } from './types';
	import { locateField } from './utils';

	export let data: IRow;
	export let stack: IStack;

	function calculate(initialExpression: string): string {
		const expression = initialExpression
			.toLowerCase()
			.replace(/up\((.*?)\)/g, 'Math.ceil($1)')
			.replace(/down\((.*?)\)/g, 'Math.floor($1)')
			.replace('pi', 'Math.PI')
			.replace('^', '**')
			.slice(1);

		const fieldNames: string[] = expression.match(ID_FORMAT) || [];
		const fields: { name: string; value: any }[] = fieldNames.map((fieldName) => ({
			name: fieldName,
			value: locateField(fieldName, stack)?.value
		}));

		const finalFunction = expression.replace(
			ID_FORMAT,
			(_, name) => fields.find((field) => field.name == name)?.value || 0
		);

		return eval(finalFunction);
	}
</script>

<h3>{data.label}</h3>

{#each data.fields as { label, value }}
	{#if typeof value === 'string' && value[0] === '='}
		<div>
			{#if label}
				<span>{label}</span>
			{/if}
			<span>{calculate(value)}</span>
		</div>
	{:else}
		<div>
			{#if label}
				<label>
					{label}
					<input type="number" bind:value />
				</label>
			{:else}
				<input type="number" bind:value />
			{/if}
		</div>
	{/if}
{/each}
