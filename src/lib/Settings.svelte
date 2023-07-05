<script lang="ts">
	import { IconSettings } from '@tabler/icons-svelte';

	export let showLabel = true;

	let showModal = true;
</script>

{#if showModal}
	<div class="fixed top-0 h-screen w-screen bg-inherit p-3">Settings will go here</div>
	<div class="fixed bottom-0 w-full p-3">
		<button
			on:click={() => (showModal = false)}
			class="my-1 box-border block h-9 w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-1 text-center dark:border-slate-900 dark:bg-slate-800"
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
