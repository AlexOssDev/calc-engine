<script lang="ts">
	import { IconEye, IconEyeOff } from '@tabler/icons-svelte';
	import { dataStore } from './storage';

	$: currentCommonState = $dataStore.map((stack) => stack.hidden).some((hidden) => !hidden);

	function toggleAll() {
		dataStore.set($dataStore.map((stack) => ({ ...stack, hidden: currentCommonState })));
	}
</script>

<ul class="p-3 pb-0">
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
