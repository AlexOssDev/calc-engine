<script lang="ts">
	import { dataStore } from './storage';
</script>

<ul>
	{#each $dataStore as stack}
		<li class="m-3 flex justify-between gap-3">
			<button class="w-full text-left" on:click={() => (stack.hidden = !stack.hidden)}>
				{stack.name}
			</button>
			{stack.hidden ? '✘' : '✔'}
		</li>
	{/each}
</ul>
