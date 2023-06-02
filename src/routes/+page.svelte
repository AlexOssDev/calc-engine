<script lang="ts">
	import StackList from '$lib/StackList.svelte';
	import Stack from '../lib/Stack.svelte';
	import { dataStore } from '../lib/storage';

	const params = decodeURI(window.location.search);

	function parseParams(params: string) {
		const paramRegEx = /^\?(\w+)=(.*)$/;
		const [_, action, data] = params.match(paramRegEx) || [null, '', ''];

		if (action === 'import') {
			const stack = JSON.parse(data);
			if ($dataStore.find((item) => item === stack)) return;
			console.log(`importing \`${data}\``);

			dataStore.push(stack);
		} else if (action === 'pop') {
			dataStore.pop();
		}
	}

	parseParams(params);
	if (params) window.location.search = '';
</script>

<StackList />

{#each $dataStore as stack}
	<Stack bind:data={stack} />
{/each}

<h2 style="color: green">RAW DATA</h2>
<pre style="color: green">
    {JSON.stringify($dataStore, undefined, 4)}
</pre>
