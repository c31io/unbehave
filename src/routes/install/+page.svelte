<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	function checkIOSDevice(): boolean {
		if (typeof window === 'undefined') return false;
		return /iPad|iPhone|iPod/.test(navigator.userAgent);
	}

	function isMobileDevice(): boolean {
		if (typeof window === 'undefined') return false;
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	function getDesktopBrowser(): string {
		if (typeof window === 'undefined') return 'Unknown';
		const ua = navigator.userAgent;
		if (ua.indexOf('Edg') > -1) return 'Edge';
		if (ua.indexOf('Chrome') > -1) return 'Chrome';
		if (ua.indexOf('Firefox') > -1) return 'Firefox';
		if (ua.indexOf('Safari') > -1) return 'Safari';
		return 'Unknown';
	}

	function isStandalone(): boolean {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(display-mode: standalone)').matches;
	}

	let isIOS = $state(false);
	let isDesktop = $state(false);
	let isInstalled = $state(false);

	$effect(() => {
		isIOS = checkIOSDevice();
		isDesktop = !isMobileDevice();
		isInstalled = isStandalone();
	});
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<a href={localizeHref('/')} class="text-2xl font-bold hover:text-gray-300">← {m.app_name()}</a>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-3xl">
			<h1 class="mb-8 text-4xl font-bold">{m.pwa_install_title()}</h1>

			{#if isInstalled}
				<div class="mb-8 rounded-lg bg-green-900/30 border border-green-700 p-6">
					<div class="flex items-center gap-3 mb-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-green-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h2 class="text-xl font-bold text-green-400">{m.install_already_installed()}</h2>
					</div>
					<p class="text-gray-300">
						{m.install_already_installed_desc({ appName: m.app_name() })}
					</p>
				</div>
			{/if}

			<div class="mb-8 rounded-lg bg-gray-800/50 p-6">
				<h2 class="mb-4 text-2xl font-bold">{m.install_why_title()}</h2>
				<ul class="space-y-3 text-gray-300">
					<li class="flex items-start gap-3">
						<span class="text-blue-400">✓</span>
						<span><strong>{m.install_works_offline()}</strong> {m.install_works_offline_desc()}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-blue-400">✓</span>
						<span><strong>{m.install_quick_access()}</strong> {m.install_quick_access_desc()}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-blue-400">✓</span>
						<span><strong>{m.install_private_secure()}</strong> {m.install_private_secure_desc()}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-blue-400">✓</span>
						<span><strong>{m.install_no_app_store()}</strong> {m.install_no_app_store_desc()}</span>
					</li>
				</ul>
			</div>

			<!-- iOS Instructions -->
			{#if isIOS}
				<div class="mb-8 rounded-lg border border-blue-600 bg-blue-900/20 p-6">
					<h2 class="mb-4 text-2xl font-bold text-blue-400">{m.install_ios_title()}</h2>
					<ol class="space-y-4 text-gray-300">
						<li class="flex items-start gap-3">
							<span class="font-bold text-blue-400">1.</span>
							<div>
								<p class="mb-2">{m.install_ios_step1({ icon: '' })}</p>
								<div class="rounded bg-gray-700/50 p-3 text-center">
									<span class="text-3xl">⎙</span>
								</div>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<span class="font-bold text-blue-400">2.</span>
							<p>{m.install_ios_step2({ action: '' })}</p>
						</li>
						<li class="flex items-start gap-3">
							<span class="font-bold text-blue-400">3.</span>
							<p>{m.install_ios_step3()}</p>
						</li>
					</ol>
				</div>
			{/if}

			<!-- Android Instructions -->
			{#if !isIOS && !isDesktop}
				<div class="mb-8 rounded-lg border border-green-600 bg-green-900/20 p-6">
					<h2 class="mb-4 text-2xl font-bold text-green-400">{m.install_android_title()}</h2>
					<ol class="space-y-4 text-gray-300">
						<li class="flex items-start gap-3">
							<span class="font-bold text-green-400">1.</span>
							<p>{m.install_android_step1()}</p>
						</li>
						<li class="flex items-start gap-3">
							<span class="font-bold text-green-400">2.</span>
							<p>{m.install_android_step2()}</p>
						</li>
						<li class="flex items-start gap-3">
							<span class="font-bold text-green-400">3.</span>
							<p>{m.install_android_step3()}</p>
						</li>
					</ol>
				</div>
			{/if}

			<!-- Desktop Instructions -->
			{#if isDesktop}
				<div class="mb-8 rounded-lg border border-purple-600 bg-purple-900/20 p-6">
					<h2 class="mb-4 text-2xl font-bold text-purple-400">
						{m.install_desktop_title({ browser: getDesktopBrowser() })}
					</h2>

					{#if getDesktopBrowser() === 'Chrome'}
						<ol class="space-y-4 text-gray-300">
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">1.</span>
								<p>{m.install_chrome_step1()}</p>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">2.</span>
								<p>{m.install_chrome_step2({ appName: m.app_name() })}</p>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">3.</span>
								<p>{m.install_chrome_step3()}</p>
							</li>
						</ol>
					{:else if getDesktopBrowser() === 'Edge'}
						<ol class="space-y-4 text-gray-300">
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">1.</span>
								<p>{m.install_edge_step1()}</p>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">2.</span>
								<p>{m.install_edge_step2()}</p>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">3.</span>
								<p>{m.install_edge_step3()}</p>
							</li>
						</ol>
					{:else if getDesktopBrowser() === 'Firefox'}
						<div class="rounded-lg bg-yellow-900/30 p-4 text-sm">
							<p class="mb-2 font-semibold text-yellow-400">
								{m.install_firefox_warning()}
							</p>
							<p class="text-gray-300">
								{m.install_firefox_desc({ appName: m.app_name() })}
							</p>
							<p class="mt-2 text-gray-400">
								{m.install_firefox_bookmark()}
							</p>
						</div>
					{:else if getDesktopBrowser() === 'Safari'}
						<div class="rounded-lg bg-yellow-900/30 p-4 text-sm">
							<p class="mb-2 font-semibold text-yellow-400">{m.install_safari_warning()}</p>
							<p class="text-gray-300">
								{m.install_safari_desc({ appName: m.app_name() })}
							</p>
							<p class="mt-2 text-gray-400">{m.install_safari_bookmark()}</p>
						</div>
					{:else}
						<ol class="space-y-4 text-gray-300">
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">1.</span>
								<p>{m.install_generic_step1()}</p>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">2.</span>
								<p>{m.install_generic_step2()}</p>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-purple-400">3.</span>
								<p>{m.install_generic_step3()}</p>
							</li>
						</ol>
					{/if}
				</div>
			{/if}

			<div class="rounded-lg bg-gray-800/50 p-6">
				<h2 class="mb-4 text-2xl font-bold">{m.install_need_help()}</h2>
				<p class="text-gray-300">
					{m.install_help_text_before()}
					<a
						href="https://github.com/c31io/unbehave"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:text-blue-300 underline"
					>
						{m.install_github_link()}
					</a>
					{m.install_help_text_after()}
				</p>
			</div>
		</div>
	</main>
</div>
