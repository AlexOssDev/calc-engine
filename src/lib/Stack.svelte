<script lang="ts">
	import Row from './Row.svelte';
	import type { IStack } from './types';

	export let data: IStack;
</script>

{#if !data.hidden}
	<div>
		<h2>{data.name}</h2>
		{#each data.rows as row}
			<Row bind:data={row} stack={data} />
		{/each}
	</div>
{/if}
