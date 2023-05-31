<script lang="ts">
	import Stack from '../lib/Stack.svelte';
	import { dataStore } from '../lib/stores';
	import type { IStack } from '../lib/types';

	const data: IStack[] = $dataStore;
</script>

{#each data as stack}
	<Stack bind:data={stack} />
{/each}

<h2 style="color: green">RAW DATA</h2>
<pre style="color: green">
    {JSON.stringify(data, undefined, 4)}
</pre>
