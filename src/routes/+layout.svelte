<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { appState } from '$lib/stores/app.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		await appState.initialize();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
