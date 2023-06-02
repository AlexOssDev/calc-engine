<script lang="ts">
	import Row from './Row.svelte';
	import type { IStack } from './types';

	export let data: IStack;
</script>

{#if !data.hidden}
	<div>
		<h2 class="mt-4 border-t-2 text-center text-xl">{data.name}</h2>
		{#each data.rows as row}
			<Row bind:data={row} stack={data} />
		{/each}
	</div>
{/if}
