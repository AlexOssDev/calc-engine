<script lang="ts">
	import Stack from '../lib/Stack.svelte';
	import type { IStack } from '../lib/types';

	const data: IStack[] = [
		{
			name: 'Area',
			rows: [
				{
					label: 'dimensions',
					fields: [{ label: 'x', value: 20 }, { value: 69 }]
				},
				{ label: 'result', fields: [{ value: '=up(A1 * A2)' }] }
			]
		}
	];
</script>

{#each data as stack}
	<Stack bind:data={stack} />
{/each}

<h2>RAW DATA</h2>
<pre>
    {JSON.stringify(data, undefined, 4)}
</pre>
