<script lang="ts">
	import { ID_FORMAT, type IRow, type IStack } from './types';
	import { locateField } from './utils';

	export let data: IRow;
	export let stack: IStack;

	function calculate(initialExpression: string): string {
		const expression = initialExpression
			.toLowerCase()
			.replaceAll('up(', 'Math.ceil(')
			.replaceAll('down(', 'Math.floor(')
			.replaceAll('pi', 'Math.PI')
			.replaceAll('^', '**')
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
					class="m-1 box-border block w-full rounded-lg border-2 border-sky-400 p-1 text-center align-bottom dark:border-sky-300 dark:bg-slate-800"
					>{calculate(value)}</span
				>
			{:else if label}
				<label class="w-full text-center">
					{label}
					<input
						type="number"
						bind:value
						class="m-1 box-border block w-full rounded-lg border-2 border-gray-900 p-1 text-center align-bottom focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
					/>
				</label>
			{:else}
				<input
					type="number"
					bind:value
					class="m-1 box-border block w-full rounded-lg border-2 border-gray-900 p-1 text-center align-bottom focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
