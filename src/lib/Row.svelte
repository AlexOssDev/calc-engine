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

<div class="mb-4 md:flex md:justify-between md:gap-4">
	<h3 class="ml-1 text-center text-lg md:my-auto md:text-left">{data.label}</h3>

	<div class="flex gap-1 md:w-8/12">
		{#each data.fields as { label, value }}
			{#if typeof value === 'string' && value[0] === '='}
				{#if label}
					<span>{label}</span>
				{/if}
				<span
					class="m-1 box-border block w-full rounded-lg border-2 border-sky-400 p-1 align-bottom"
					>{calculate(value)}</span
				>
			{:else if label}
				<label class="w-full text-center">
					{label}
					<input
						type="number"
						bind:value
						class="m-1 box-border block w-full rounded-lg border-2 border-gray-900 p-1 align-bottom"
					/>
				</label>
			{:else}
				<input
					type="number"
					bind:value
					class="m-1 box-border block w-full rounded-lg border-2 border-gray-900 p-1 align-bottom"
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	input {
		-moz-appearance: textfield;
		-webkit-appearance: none;
	}
</style>
