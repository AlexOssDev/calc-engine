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

<main class="mt-0 md:p-2">
	{#each $dataStore as stack}
		<Stack bind:data={stack} />
	{:else}
		<h2 class="text-2xl text-center">No stacks yet!</h2>
		<p class="text-center">Enable or import some!</p>
	{/each}
</main>

<!-- this is just to get everything centered -->
<span />
