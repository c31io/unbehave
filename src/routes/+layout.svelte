<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { appState } from '$lib/stores/app.svelte';
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let showInstallBanner = $state(false);
	let deferredPrompt: any = null;
	let isIOS = $state(false);
	let isDesktop = $state(false);
	let showIOSInstructions = $state(false);
	let showDesktopInstructions = $state(false);

	function isMobileDevice() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	function isStandalone() {
		return (
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone ||
			document.referrer.includes('android-app://')
		);
	}

	function checkIOSDevice() {
		return /iPhone|iPad|iPod/i.test(navigator.userAgent);
	}

	function getDesktopBrowser() {
		const ua = navigator.userAgent;
		if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
		if (ua.includes('Edg')) return 'Edge';
		if (ua.includes('Firefox')) return 'Firefox';
		if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
		return 'Browser';
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

		isIOS = checkIOSDevice();
		isDesktop = !isMobileDevice();

		// Show banner if not already in standalone mode
		if (!isStandalone()) {
			showInstallBanner = true;
		}

		// Listen for the beforeinstallprompt event (Chrome/Edge)
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredPrompt = e;
			showInstallBanner = true;
		});
	});

	async function handleInstallClick() {
		if (isIOS) {
			// Show instructions for iOS
			showIOSInstructions = true;
		} else if (deferredPrompt) {
			// Show native install prompt for Chrome/Edge
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				showInstallBanner = false;
			}
			deferredPrompt = null;
		} else if (isDesktop) {
			// Show desktop instructions
			showDesktopInstructions = true;
		} else {
			// Fallback: show instructions
			showIOSInstructions = true;
		}
	}

	function dismissBanner() {
		showInstallBanner = false;
		localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
	}

	function closeInstructions() {
		showIOSInstructions = false;
		showDesktopInstructions = false;
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
				<p class="text-sm font-semibold">Install unbehave</p>
				<p class="text-xs opacity-90">Add to your home screen for quick access</p>
			</div>
			<div class="flex gap-2">
				<button
					onclick={handleInstallClick}
					class="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
				>
					Install
				</button>
				<button
					onclick={dismissBanner}
					class="rounded px-2 text-white hover:bg-blue-700"
					aria-label="Dismiss"
				>
					×
				</button>
			</div>
		</div>
	</div>
{/if}

{#if showIOSInstructions}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
		<div class="max-w-sm rounded-lg bg-gray-800 p-6 text-white shadow-xl">
			<h3 class="mb-4 text-xl font-bold">Install unbehave</h3>
			{#if isIOS}
				<ol class="mb-4 space-y-2 text-sm">
					<li class="flex items-start gap-2">
						<span class="font-bold">1.</span>
						<span>Tap the Share button <span class="text-blue-400">⎙</span> at the bottom</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">2.</span>
						<span>Scroll down and tap "Add to Home Screen" <span class="text-blue-400">+</span></span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">3.</span>
						<span>Tap "Add" to confirm</span>
					</li>
				</ol>
			{:else}
				<ol class="mb-4 space-y-2 text-sm">
					<li class="flex items-start gap-2">
						<span class="font-bold">1.</span>
						<span>Tap the menu button (⋮) in your browser</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">2.</span>
						<span>Select "Add to Home screen" or "Install app"</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">3.</span>
						<span>Tap "Add" or "Install" to confirm</span>
					</li>
				</ol>
			{/if}
			<button
				onclick={closeInstructions}
				class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
			>
				Got it
			</button>
		</div>
	</div>
{/if}

{#if showDesktopInstructions}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
		<div class="max-w-md rounded-lg bg-gray-800 p-6 text-white shadow-xl">
			<h3 class="mb-4 text-xl font-bold">Install unbehave on {getDesktopBrowser()}</h3>
			{#if getDesktopBrowser() === 'Chrome'}
				<ol class="mb-4 space-y-3 text-sm">
					<li class="flex items-start gap-2">
						<span class="font-bold">1.</span>
						<span>Click the install icon <span class="text-blue-400">⊕</span> in the address bar (right side)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">2.</span>
						<span>Or click the three-dot menu <span class="text-blue-400">⋮</span> → "Install unbehave"</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">3.</span>
						<span>Click "Install" to add to your desktop/taskbar</span>
					</li>
				</ol>
			{:else if getDesktopBrowser() === 'Edge'}
				<ol class="mb-4 space-y-3 text-sm">
					<li class="flex items-start gap-2">
						<span class="font-bold">1.</span>
						<span>Click the install icon <span class="text-blue-400">⊕</span> in the address bar</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">2.</span>
						<span>Or click Settings menu <span class="text-blue-400">⋯</span> → "Apps" → "Install this site as an app"</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">3.</span>
						<span>Click "Install" to add to your Start menu/taskbar</span>
					</li>
				</ol>
			{:else if getDesktopBrowser() === 'Firefox'}
				<div class="mb-4 rounded-lg bg-yellow-900/30 p-4 text-sm">
					<p class="mb-2 font-semibold text-yellow-400">Firefox doesn't support PWA installation yet</p>
					<p class="text-gray-300">
						For the best experience, try using Chrome or Edge to install unbehave.
					</p>
					<p class="mt-2 text-gray-400">
						You can bookmark this page (Ctrl+D) for quick access.
					</p>
				</div>
			{:else if getDesktopBrowser() === 'Safari'}
				<div class="mb-4 rounded-lg bg-yellow-900/30 p-4 text-sm">
					<p class="mb-2 font-semibold text-yellow-400">Safari has limited PWA support</p>
					<p class="text-gray-300">
						For the best experience on macOS, try using Chrome or Edge to install unbehave.
					</p>
					<p class="mt-2 text-gray-400">
						You can bookmark this page (⌘+D) for quick access.
					</p>
				</div>
			{:else}
				<ol class="mb-4 space-y-3 text-sm">
					<li class="flex items-start gap-2">
						<span class="font-bold">1.</span>
						<span>Look for an install icon in your browser's address bar</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">2.</span>
						<span>Or check your browser's menu for "Install app" option</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="font-bold">3.</span>
						<span>Alternatively, bookmark this page for easy access</span>
					</li>
				</ol>
			{/if}
			<button
				onclick={closeInstructions}
				class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
			>
				Got it
			</button>
		</div>
	</div>
{/if}

<div class="{showInstallBanner ? 'pt-[72px]' : ''}">
	{@render children()}
	<Footer />
</div>
