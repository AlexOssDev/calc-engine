<script lang="ts">
	import '../app.css';
	import { IconBrandGithub } from '@tabler/icons-svelte';
</script>

<svelte:head>
	<title>calculator engine</title>
</svelte:head>

<div class="top-0 min-h-screen dark:bg-slate-700 dark:text-slate-200 md:flex md:justify-between">
	<slot />
</div>

<a
	href="https://github.com/AlexOssDev/calc-engine"
	class="fixed bottom-0 flex rounded-lg p-2 text-xl text-transparent outline-none transition-colors hover:bg-white hover:text-sky-400 hover:dark:bg-slate-700 hover:dark:text-sky-300"
>
	<IconBrandGithub />
	v0.2.1
</a>
