<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	import { ID_FORMAT, type IRow, type IStack } from './types';
	import { getFieldsValue } from './utils';

	export let data: IRow;
	export let stack: IStack;

	function calculate(initialExpression: string): string {
		let expression = initialExpression.toLowerCase().slice(1);
		let depth = 0;

		while (expression.match(ID_FORMAT)) {
			expression = insertFieldValuesIntoExpression(expression);
			depth++;

			if (depth > 100) return "couldn't process, sorry :(";
		}

		expression = expression
			.replaceAll('up(', 'Math.ceil(')
			.replaceAll('down(', 'Math.floor(')
			.replaceAll('pi', 'Math.PI')
			.replaceAll('^', '**');

		return String(eval(expression));
	}

	function insertFieldValuesIntoExpression(expression: string): string {
		const fieldNames: string[] = expression.match(ID_FORMAT) || [];
		const fields: { name: string; value: any }[] = fieldNames.map((fieldName) => ({
			name: fieldName,
			value: getFieldsValue(fieldName, stack)
		}));

		const finalFunction = expression.replace(ID_FORMAT, (_, name) => {
			const value = fields.find((field) => field.name == name)?.value || 0;
			return '(' + String(value).replace(/^=/m, '') + ')';
		});

		return finalFunction;
	}
</script>

<div class="mb-4 md:flex md:justify-between md:gap-4">
	<h3 class="ml-1 text-center text-lg md:my-auto md:text-left">{data.label}</h3>

	<div class="flex gap-1 md:w-8/12">
		{#each data.fields as { label, value, disabled, disabledValue }}
			{#if typeof value === 'string' && value[0] === '='}
				<div class="grid w-full">
					{#if label}
						<span class="text-center">{label}</span>
					{/if}
					<span
						class="min-h-9 m-1 box-border block w-full rounded-lg border-2 border-sky-400 bg-gray-50 p-1 text-center dark:border-sky-300 dark:bg-slate-800"
						>{calculate(value).replace(/(\d+\.\d{2})\d+/, '$1')}</span
					>
				</div>
			{:else if label}
				<label class="w-full text-center">
					{label}
					<div class="contents">
						{#if disabledValue !== undefined}
							<input
								id={'checkbox' + counter}
								type="checkbox"
								class="peer hidden"
								bind:checked={disabled}
							/>
							<label
								for={'checkbox' + counter++}
								class="m-1 box-border block aspect-square h-9 rounded-lg border-2 border-gray-200 bg-sky-400 transition-colors ease-out peer-checked:bg-gray-50 dark:border-slate-900 dark:bg-sky-300 dark:peer-checked:bg-slate-800"
							/>
						{/if}
						{#if disabled}
							<span
								class="min-h-9 m-1 box-border block w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center text-slate-500 dark:border-slate-900 dark:bg-slate-800"
								>{disabledValue}</span
							>
						{:else}
							<input
								type="number"
								bind:value
								class="min-h-9 m-1 box-border block w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center transition-colors ease-out focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
							/>
						{/if}
					</div>
				</label>
			{:else}
				<div class="contents">
					{#if disabledValue !== undefined}
						<input
							id={'checkbox' + counter}
							type="checkbox"
							class="peer hidden"
							bind:checked={disabled}
						/>
						<label
							for={'checkbox' + counter++}
							class="m-1 box-border block aspect-square h-9 rounded-lg border-2 border-gray-200 bg-sky-400 transition-colors ease-out peer-checked:bg-gray-50 dark:border-slate-900 dark:bg-sky-300 dark:peer-checked:bg-slate-800"
						/>
					{/if}
					{#if disabled}
						<span
							class="min-h-9 m-1 box-border block w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center text-slate-500 dark:border-slate-900 dark:bg-slate-800"
							>{disabledValue}</span
						>
					{:else}
						<input
							type="number"
							bind:value
							class="min-h-9 m-1 box-border block w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center transition-colors ease-out focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
						/>
					{/if}
				</div>
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
