<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { generateId } from '$lib/utils';
	import type { Regret } from '$lib/types';

	let showRegrets = $state(false);
	let selectedRegrets = $state<string[]>([]);

	const highSeverityRegrets = $derived(
		appState.regrets.filter((r) => r.severity === 'high').slice(0, 3)
	);

	function handleResist() {
		if (selectedRegrets.length > 0) {
			appState.recordEvent({
				id: generateId(),
				temptationId: 'general',
				timestamp: Date.now(),
				resisted: true,
				regretsViewed: selectedRegrets
			});
			selectedRegrets = [];
			showRegrets = false;
		}
	}

	function handleGaveIn() {
		appState.recordEvent({
			id: generateId(),
			temptationId: 'general',
			timestamp: Date.now(),
			resisted: false,
			regretsViewed: selectedRegrets
		});
		selectedRegrets = [];
		showRegrets = false;
	}

	function toggleRegret(id: string) {
		if (selectedRegrets.includes(id)) {
			selectedRegrets = selectedRegrets.filter((r) => r !== id);
		} else {
			selectedRegrets = [...selectedRegrets, id];
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold">Unbehave</h1>
				<div class="flex gap-4">
					<a href="/regrets" class="hover:text-gray-300">My Regrets</a>
					<a href="/stats" class="hover:text-gray-300">Stats</a>
					<a href="/learn" class="hover:text-gray-300">Learn</a>
				</div>
			</div>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		{#if !showRegrets}
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="mb-4 text-5xl font-bold">Feeling tempted?</h2>
				<p class="mb-8 text-xl text-gray-300">
					Before you give in, take a moment to revisit your regrets.
				</p>

				<div class="mb-8 grid gap-4">
					<button
						onclick={() => (showRegrets = true)}
						class="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
					>
						Show Me My Regrets
					</button>

					<a
						href="/regrets/new"
						class="rounded-lg border border-gray-600 px-8 py-4 text-lg font-semibold hover:bg-gray-800"
					>
						Add a New Regret
					</a>
				</div>

				{#if appState.stats.totalTemptations > 0}
					<div class="mt-12 rounded-lg bg-gray-800/50 p-6">
						<h3 class="mb-4 text-2xl font-bold">Your Progress</h3>
						<div class="grid gap-4 sm:grid-cols-3">
							<div>
								<div class="text-3xl font-bold text-green-400">
									{appState.stats.totalResisted}
								</div>
								<div class="text-gray-400">Times Resisted</div>
							</div>
							<div>
								<div class="text-3xl font-bold text-red-400">{appState.stats.totalGaveIn}</div>
								<div class="text-gray-400">Times Gave In</div>
							</div>
							<div>
								<div class="text-3xl font-bold text-blue-400">
									{appState.stats.totalTemptations > 0
										? Math.round((appState.stats.totalResisted / appState.stats.totalTemptations) * 100)
										: 0}%
								</div>
								<div class="text-gray-400">Success Rate</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="mx-auto max-w-3xl">
				<h2 class="mb-6 text-3xl font-bold">Remember these moments...</h2>

				{#if appState.regrets.length === 0}
					<div class="rounded-lg bg-gray-800/50 p-8 text-center">
						<p class="mb-4 text-xl text-gray-300">You haven't added any regrets yet.</p>
						<a
							href="/regrets/new"
							class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
						>
							Add Your First Regret
						</a>
					</div>
				{:else}
					<div class="mb-6 space-y-4">
						{#each highSeverityRegrets as regret (regret.id)}
							<button
								onclick={() => toggleRegret(regret.id)}
								class="w-full rounded-lg border-2 p-6 text-left transition-all {selectedRegrets.includes(
									regret.id
								)
									? 'border-blue-500 bg-blue-900/30'
									: 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}"
							>
								<h3 class="mb-2 text-xl font-bold">{regret.title}</h3>
								<p class="text-gray-300">{regret.description}</p>
								<div class="mt-3 flex items-center gap-2">
									<span
										class="rounded px-2 py-1 text-sm {regret.severity === 'high'
											? 'bg-red-900/50 text-red-300'
											: regret.severity === 'medium'
												? 'bg-yellow-900/50 text-yellow-300'
												: 'bg-gray-700 text-gray-300'}"
									>
										{regret.severity}
									</span>
									{#each regret.tags as tag}
										<span class="rounded bg-gray-700 px-2 py-1 text-sm">{tag}</span>
									{/each}
								</div>
							</button>
						{/each}
					</div>

					<div class="flex gap-4">
						<button
							onclick={handleResist}
							class="flex-1 rounded-lg bg-green-600 px-6 py-4 text-lg font-semibold hover:bg-green-700"
						>
							I'll Resist
						</button>
						<button
							onclick={handleGaveIn}
							class="flex-1 rounded-lg bg-red-600/80 px-6 py-4 text-lg font-semibold hover:bg-red-600"
						>
							I Gave In
						</button>
					</div>

					<button
						onclick={() => (showRegrets = false)}
						class="mt-4 w-full rounded-lg border border-gray-600 px-6 py-3 hover:bg-gray-800"
					>
						Go Back
					</button>
				{/if}
			</div>
		{/if}
	</main>
</div>
