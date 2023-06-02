<script lang="ts">
	import { dataStore } from './storage';
</script>

<ul>
	{#each $dataStore as stack}
		<li>
			<button on:click={() => (stack.hidden = !stack.hidden)}>
				{stack.name}
			</button>
		</li>
	{/each}
</ul>
