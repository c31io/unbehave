<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { appState } from '$lib/stores/app.svelte';
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { children } = $props();

	let showInstallBanner = $state(false);

	function isStandalone() {
		return (
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone ||
			document.referrer.includes('android-app://')
		);
	}

	onMount(async () => {
		await appState.initialize();

		// Check if banner was dismissed in the last 7 days
		const dismissed = localStorage.getItem('pwa-banner-dismissed');
		if (dismissed) {
			const dismissedTime = parseInt(dismissed);
			if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
				return;
			}
		}

		// Show banner if not already in standalone mode
		if (!isStandalone()) {
			showInstallBanner = true;
		}
	});

	function dismissBanner() {
		showInstallBanner = false;
		localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if showInstallBanner}
	<div
		class="fixed left-0 right-0 top-0 z-50 border-b border-blue-700 bg-blue-600 px-4 py-3 text-white shadow-lg"
	>
		<div class="mx-auto flex max-w-4xl items-center justify-between gap-3">
			<div class="flex-1">
				<p class="text-sm font-semibold">{m.pwa_install_title()}</p>
				<p class="text-xs opacity-90">{m.pwa_install_subtitle()}</p>
			</div>
			<div class="flex gap-2">
				<a
					href={localizeHref('/install')}
					class="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
				>
					{m.pwa_install_button()}
				</a>
				<button
					onclick={dismissBanner}
					class="rounded px-2 text-white hover:bg-blue-700"
					aria-label={m.pwa_dismiss_aria_label()}
				>
					×
				</button>
			</div>
		</div>
	</div>
{/if}

<div class="{showInstallBanner ? 'pt-[72px]' : ''}">
	{#if !appState.isInitialized}
		<!-- Loading state -->
		<div class="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
			<div class="text-center">
				<div class="mb-4 flex justify-center">
					<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-600"></div>
				</div>
				<p class="text-lg text-gray-400">{m.loading_app()}</p>
			</div>
		</div>
	{:else}
		{@render children()}
		<Footer />
	{/if}
</div>
