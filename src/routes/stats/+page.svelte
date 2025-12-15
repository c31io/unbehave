<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { formatDate } from '$lib/utils';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	const successRate = $derived(
		appState.stats.totalTemptations > 0
			? Math.round((appState.stats.totalResisted / appState.stats.totalTemptations) * 100)
			: 0
	);

	const recentEvents = $derived(
		[...appState.events].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10)
	);

	let showClearDialog = $state(false);

	function openClearDialog() {
		showClearDialog = true;
	}

	function closeClearDialog() {
		showClearDialog = false;
	}

	async function clearAllStats() {
		await appState.clearAllEvents();
		showClearDialog = false;
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<a href={localizeHref('/')} class="text-2xl font-bold hover:text-gray-300">← {m.app_name()}</a>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-4xl">

			<div class="sticky bottom-0 mb-8 flex items-center justify-between">
				<h1 class="text-4xl font-bold">{m.stats_page_title()}</h1>
				<button
					onclick={openClearDialog}
					class="rounded-lg border border-red-600 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-900/20"
					disabled={appState.events.length === 0}
				>
					{m.stats_clear_button()}
				</button>
			</div>

			<div class="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-blue-400">{appState.stats.totalTemptations}</div>
					<div class="text-gray-400">{m.stats_total_temptations()}</div>
				</div>

				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-green-400">{appState.stats.totalResisted}</div>
					<div class="text-gray-400">{m.stats_times_resisted()}</div>
				</div>

				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-red-400">{appState.stats.totalGaveIn}</div>
					<div class="text-gray-400">{m.stats_times_gave_in()}</div>
				</div>

				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-purple-400">{successRate}%</div>
					<div class="text-gray-400">{m.stats_success_rate()}</div>
				</div>
			</div>

			<div class="mb-8 rounded-lg bg-gray-800/50 p-6">
				<h2 class="mb-4 text-2xl font-bold">{m.stats_overview_title()}</h2>
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-gray-300">{m.stats_total_regrets()}</span>
						<span class="font-bold">{appState.regrets.length}</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-gray-300">{m.stats_recent_activity()}</span>
						<span class="font-bold">
							{appState.stats.lastActivity ? formatDate(appState.stats.lastActivity) : m.stats_never()}
						</span>
					</div>
				</div>
			</div>

			{#if recentEvents.length > 0}
				<div class="rounded-lg bg-gray-800/50 p-6">
					<h2 class="mb-4 text-2xl font-bold">{m.stats_recent_events_title()}</h2>
					<div class="space-y-3">
						{#each recentEvents as event (event.id)}
							<div
								class="flex items-center justify-between rounded-lg border border-gray-700 p-4 {event.resisted
									? 'bg-green-900/20'
									: 'bg-red-900/20'}"
							>
								<div>
									<div class="font-semibold {event.resisted ? 'text-green-400' : 'text-red-400'}">
										{event.resisted ? `✓ ${m.stats_resisted()}` : `✗ ${m.stats_gave_in()}`}
									</div>
									<div class="text-sm text-gray-400">
										{m.stats_viewed_regrets({ count: event.regretsViewed.length })}
									</div>
								</div>
								<div class="text-sm text-gray-400">{formatDate(event.timestamp)}</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="rounded-lg bg-gray-800/50 p-12 text-center">
					<p class="text-xl text-gray-400">{m.stats_no_activity()}</p>
				</div>
			{/if}
		</div>
	</main>

	<!-- Clear Stats Confirmation Dialog -->
	{#if showClearDialog}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeClearDialog();
			}}
			role="dialog"
			aria-labelledby="clear-dialog-title"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
				<h2 id="clear-dialog-title" class="mb-4 text-2xl font-bold text-red-400">
					{m.stats_clear_confirm_title()}
				</h2>
				<p class="mb-6 text-gray-300">
					{m.stats_clear_confirm_message()}
				</p>
				<div class="flex gap-3">
					<button
						onclick={closeClearDialog}
						class="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold hover:bg-gray-700"
					>
						{m.stats_clear_cancel_button()}
					</button>
					<button
						onclick={clearAllStats}
						class="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
					>
						{m.stats_clear_confirm_button()}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
