<script lang="ts">
	import type { IRow } from './types';

	export let data: IRow;
</script>

<h3>{data.label}</h3>

{#each data.fields as { label, value }}
	{#if typeof value === 'string' && value[0] === '='}
		<div>
			{#if label}
				<span>{label}</span>
			{/if}
			<span>{value}</span>
		</div>
	{:else}
		<div>
			{#if label}
				<label>
					{label}
					<input type="number" bind:value />
				</label>
			{:else}
				<input type="number" bind:value />
			{/if}
		</div>
	{/if}
{/each}
