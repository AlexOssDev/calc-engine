<script lang="ts">
	import { IconCheck, IconFold, IconSettings, IconTerminal, IconX } from '@tabler/icons-svelte';
	import { dataStore } from './storage';
	import { State } from './types';

	export let showLabel = true;

	let showModal = false;
	let showImportInput = false;
	let importInputData: string;
	let importInputState = State.Neutral;

	function importRawData() {
		try {
			const stack = JSON.parse(importInputData);
			if ($dataStore.find((item) => item === stack)) return;
			console.log(`importing \`${importInputData}\``);

			dataStore.push(stack);

			importInputData = '';
			importInputState = State.Success;
		} catch {
			importInputState = State.Error;
		}
	}
</script>

{#if showModal}
	<div class="fixed top-0 h-screen w-screen overflow-auto bg-inherit p-3">
		<button
			on:click={() => (showImportInput = !showImportInput)}
			class="my-1 box-border flex h-9 w-full justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
		>
			Import stack (JSON)
			{#if showImportInput}<IconFold />{:else}<IconTerminal />{/if}
		</button>
		{#if showImportInput}
			<textarea
				bind:value={importInputData}
				placeholder="Paste the raw JSON for a stack here"
				class="my-1 box-border block h-96 w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 transition-colors ease-out focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
			/>

			{#if importInputState === State.Neutral}
				<button
					class="my-1 box-border flex h-9 w-full items-center justify-center rounded-lg border-2 border-sky-400 bg-gray-50 p-1 text-center dark:border-sky-300 dark:bg-slate-800"
					on:click={importRawData}
				>
					Import that
				</button>
			{:else if importInputState === State.Success}
				<button
					class="my-1 box-border flex h-9 w-full items-center justify-center rounded-lg border-2 border-green-400 bg-gray-50 p-1 text-center dark:border-green-300 dark:bg-slate-800"
					on:click={importRawData}
				>
					Done <IconCheck />
				</button>
			{:else}
				<button
					class="my-1 box-border flex h-9 w-full items-center justify-center rounded-lg border-2 border-red-400 bg-gray-50 p-1 text-center dark:border-red-300 dark:bg-slate-800"
					on:click={importRawData}
				>
					Invalid <IconX />
				</button>
			{/if}
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
