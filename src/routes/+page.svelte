<script lang="ts">
	import Stack from '../lib/Stack.svelte';
	import { dataStore } from '../lib/storage';
</script>

{#each $dataStore as stack}
	<Stack bind:data={stack} />
{/each}

<h2 style="color: green">RAW DATA</h2>
<pre style="color: green">
    {JSON.stringify($dataStore, undefined, 4)}
</pre>
