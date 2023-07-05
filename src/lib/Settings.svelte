<script lang="ts">
	import { IconEye, IconEyeOff, IconEyeX, IconSettings } from '@tabler/icons-svelte';
	import { dataStore } from './storage';
	import type { State } from './types';

	export let showLabel = true;

	let showModal = true;
	let showImportInput = false;
	let importInputData: string;
	let importInputState: State;

	function importRawData() {
		const stack = JSON.parse(importInputData);
		if ($dataStore.find((item) => item === stack)) return;
		console.log(`importing \`${importInputData}\``);

		dataStore.push(stack);

		importInputData = '';

		// TODO: inform the user about the successful import
	}
</script>

{#if showModal}
	<div class="fixed top-0 h-screen w-screen overflow-auto bg-inherit p-3">
		<button
			on:click={() => (showImportInput = !showImportInput)}
			class="my-1 box-border flex h-9 w-full justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
		>
			Import a stack via source code
			{#if showImportInput}<IconEye />{:else}<IconEyeOff />{/if}
		</button>
		{#if showImportInput}
			<textarea
				bind:value={importInputData}
				placeholder="Paste the raw JSON for a stack here"
				class="my-1 box-border block h-96 w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 transition-colors ease-out focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
			/>
			<button
				class="my-1 box-border block h-9 w-full rounded-lg border-2 border-sky-400 bg-gray-50 p-1 text-center transition-all focus:border-emerald-400 dark:border-sky-300 dark:bg-slate-800 dark:focus:border-emerald-300"
				on:click={importRawData}
			>
				Import that
			</button>
		{/if}
	</div>

	<div class="fixed bottom-0 w-full p-3">
		<button
			on:click={() => (showModal = false)}
			class="my-1 box-border block h-9 w-full justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
		>
			Close
		</button>
	</div>
{:else}
	<button
		on:click={() => (showModal = true)}
		class:w-full={showLabel}
		class="flex justify-between gap-4 p-3 text-left"
	>
		{#if showLabel}Settings{/if}
		<IconSettings />
	</button>
{/if}
