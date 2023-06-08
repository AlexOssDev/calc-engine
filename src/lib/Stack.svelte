<script lang="ts">
	import Row from './Row.svelte';
	import type { IStack } from './types';

	export let data: IStack;
</script>

{#if !data.hidden}
	<div
		class="mt-4 border-t-2 pt-2 dark:border-t-slate-800 md:first:mt-0 md:first:border-t-0 md:first:pt-0"
	>
		<h2 class="text-center text-xl">
			{data.name}
		</h2>
		{#each data.rows as row}
			<Row bind:data={row} stack={data} />
		{/each}

		{#if data.description}
			<pre class="w-full rounded-lg bg-gray-50 p-4 dark:bg-slate-800">{data.description}</pre>
		{/if}
	</div>
{/if}
