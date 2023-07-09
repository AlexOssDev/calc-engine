<script lang="ts">
	import {
		IconCheck,
		IconCode,
		IconFileExport,
		IconFileImport,
		IconFold,
		IconSettings,
		IconX
	} from '@tabler/icons-svelte';
	import { dataStore } from './storage';
	import { State, type IStack } from './types';

	export let showLabel = true;

	let showModal = false;
	let showImportInput = false;
	let importInputData: string;
	let importInputState = State.Neutral;

	let selectedStack: IStack;

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

	function copyStacksJson() {
		const stack = JSON.stringify(selectedStack);
		navigator.clipboard.writeText(stack);
	}

	function closeWindow() {
		showModal = false;
		showImportInput = false;
	}
</script>

{#if showModal}
	<div
		class="fixed top-0 flex h-screen w-screen flex-col gap-2 overflow-auto bg-gray-100 p-3 dark:bg-slate-700 dark:text-slate-200 md:w-fit md:shadow-xl"
	>
		<h2 class="text-center text-xl">Import</h2>
		<div class="flex items-center gap-2">
			<p class="flex-1">Import stack</p>
			<button
				on:click={() => (showImportInput = !showImportInput)}
				class="box-border block h-9 justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
			>
				{#if showImportInput}<IconFold />{:else}<IconCode />{/if}
			</button>
			<button
				on:click={() => (showImportInput = !showImportInput)}
				class="box-border block h-9 justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
			>
				<IconFileImport />
			</button>
		</div>
		{#if showImportInput}
			<textarea
				bind:value={importInputData}
				placeholder="Paste the raw JSON for a stack here"
				class="box-border block h-96 w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 transition-colors ease-out focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
			/>

			{#if importInputState === State.Neutral}
				<button
					class="box-border flex h-9 w-full items-center justify-center rounded-lg border-2 border-sky-400 bg-gray-50 p-1 text-center dark:border-sky-300 dark:bg-slate-800"
					on:click={importRawData}
				>
					Import that
				</button>
			{:else if importInputState === State.Success}
				<button
					class="box-border flex h-9 w-full items-center justify-center rounded-lg border-2 border-green-400 bg-gray-50 p-1 text-center dark:border-green-300 dark:bg-slate-800"
					on:click={importRawData}
				>
					Done <IconCheck />
				</button>
			{:else}
				<button
					class="box-border flex h-9 w-full items-center justify-center rounded-lg border-2 border-red-400 bg-gray-50 p-1 text-center dark:border-red-300 dark:bg-slate-800"
					on:click={importRawData}
				>
					Invalid <IconX />
				</button>
			{/if}
		{/if}

		<h2
			class="mt-4 border-t-2 pt-2 text-center text-xl dark:border-t-slate-800 md:mt-0 md:border-t-0 md:pt-0"
		>
			Export
		</h2>
		<div class="flex items-center gap-2">
			<select
				class="w-full bg-gray-100 text-inherit outline-none dark:bg-slate-700"
				bind:value={selectedStack}
			>
				{#each $dataStore as stack}
					<option value={stack}>{stack.name}</option>
				{/each}
			</select>
			<button
				class="box-border block h-9 justify-between gap-1 rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center active:border-emerald-400 dark:border-slate-900 dark:bg-slate-800 dark:active:border-emerald-300"
				on:click={copyStacksJson}
			>
				<IconCode />
			</button>
			<button
				class="box-border block h-9 justify-between gap-1 rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
			>
				<IconFileExport />
			</button>
		</div>
		<div class="absolute bottom-0 left-0 right-0 w-full p-3">
			<button
				on:click={closeWindow}
				class="box-border block h-9 w-full justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
			>
				Close
			</button>
		</div>
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
