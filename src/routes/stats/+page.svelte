<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { formatDate } from '$lib/utils';

	const successRate = $derived(
		appState.stats.totalTemptations > 0
			? Math.round((appState.stats.totalResisted / appState.stats.totalTemptations) * 100)
			: 0
	);

	const recentEvents = $derived(
		[...appState.events].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10)
	);
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<a href="/" class="text-2xl font-bold hover:text-gray-300">← unbehave</a>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-4xl">
			<h1 class="mb-8 text-4xl font-bold">Your Stats</h1>

			<div class="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-blue-400">{appState.stats.totalTemptations}</div>
					<div class="text-gray-400">Total Temptations</div>
				</div>

				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-green-400">{appState.stats.totalResisted}</div>
					<div class="text-gray-400">Times Resisted</div>
				</div>

				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-red-400">{appState.stats.totalGaveIn}</div>
					<div class="text-gray-400">Times Gave In</div>
				</div>

				<div class="rounded-lg bg-gray-800/50 p-6">
					<div class="text-3xl font-bold text-purple-400">{successRate}%</div>
					<div class="text-gray-400">Success Rate</div>
				</div>
			</div>

			<div class="mb-8 rounded-lg bg-gray-800/50 p-6">
				<h2 class="mb-4 text-2xl font-bold">Overview</h2>
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-gray-300">Total Regrets Documented</span>
						<span class="font-bold">{appState.regrets.length}</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-gray-300">Most Recent Activity</span>
						<span class="font-bold">
							{appState.stats.lastActivity ? formatDate(appState.stats.lastActivity) : 'Never'}
						</span>
					</div>
				</div>
			</div>

			{#if recentEvents.length > 0}
				<div class="rounded-lg bg-gray-800/50 p-6">
					<h2 class="mb-4 text-2xl font-bold">Recent Events</h2>
					<div class="space-y-3">
						{#each recentEvents as event (event.id)}
							<div
								class="flex items-center justify-between rounded-lg border border-gray-700 p-4 {event.resisted
									? 'bg-green-900/20'
									: 'bg-red-900/20'}"
							>
								<div>
									<div class="font-semibold {event.resisted ? 'text-green-400' : 'text-red-400'}">
										{event.resisted ? '✓ Resisted' : '✗ Gave In'}
									</div>
									<div class="text-sm text-gray-400">
										Viewed {event.regretsViewed.length} regret(s)
									</div>
								</div>
								<div class="text-sm text-gray-400">{formatDate(event.timestamp)}</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="rounded-lg bg-gray-800/50 p-12 text-center">
					<p class="text-xl text-gray-400">No activity yet. Start using the app to see stats!</p>
				</div>
			{/if}
		</div>
	</main>
</div>
