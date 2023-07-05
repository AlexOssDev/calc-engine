<script lang="ts">
	import { IconEye, IconEyeOff, IconFileImport } from '@tabler/icons-svelte';
	import { dataStore } from './storage';

	$: currentCommonState = $dataStore.map((stack) => stack.hidden).some((hidden) => !hidden);
	let showImportModal = false;
	let modalData: string;

	function toggleAll() {
		dataStore.set($dataStore.map((stack) => ({ ...stack, hidden: currentCommonState })));
	}

	function importModalData() {
		const stack = JSON.parse(modalData);
		if ($dataStore.find((item) => item === stack)) return;
		console.log(`importing \`${modalData}\``);

		dataStore.push(stack);

		modalData = '';

		showImportModal = false;
	}
</script>

{#if showImportModal}
	<div class="absolute flex h-screen w-screen flex-col items-start bg-inherit p-4">
		<textarea
			bind:value={modalData}
			placeholder="Paste the raw JSON for a stack here"
			class="my-1 box-border block h-full w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 transition-colors ease-out focus:border-emerald-400 focus:outline-none dark:border-slate-900 dark:bg-slate-800 dark:focus:border-emerald-300"
		/>
		<button
			on:click={() => (showImportModal = false)}
			class="my-1 box-border block h-9 w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
		>
			Cancel
		</button>
		<button
			on:click={importModalData}
			class="my-1 box-border block h-9 w-full rounded-lg border-2 border-sky-400 bg-gray-50 p-1 text-center dark:border-sky-300 dark:bg-slate-800"
		>
			Import
		</button>
	</div>
{/if}

<ul>
	<li>
		<button
			on:click={() => (showImportModal = true)}
			class="flex w-full justify-between gap-4 p-3 text-left"
		>
			Import
			<IconFileImport />
		</button>
	</li>
	<li>
		<button class="flex w-full justify-between gap-4 p-3 text-left" on:click={toggleAll}>
			{#if currentCommonState}
				Hide all
				<IconEye />
			{:else}
				Show all
				<IconEyeOff />
			{/if}
		</button>
	</li>
	{#each $dataStore as stack}
		<li>
			<button
				class="flex w-full justify-between gap-4 p-3 text-left"
				on:click={() => (stack.hidden = !stack.hidden)}
			>
				{stack.name}
				{#if stack.hidden}
					<IconEyeOff />
				{:else}
					<IconEye />
				{/if}
			</button>
		</li>
	{/each}
</ul>
