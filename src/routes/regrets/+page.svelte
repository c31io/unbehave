<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { formatRelativeTime } from '$lib/utils';

	const sortedRegrets = $derived(
		[...appState.regrets].sort((a, b) => b.timestamp - a.timestamp)
	);

	async function deleteRegret(id: string) {
		if (confirm('Are you sure you want to delete this regret?')) {
			await appState.deleteRegret(id);
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="text-2xl font-bold hover:text-gray-300">← unbehave</a>
			</div>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-4xl">
			<div class="mb-8 flex items-center justify-between">
				<h1 class="text-4xl font-bold">My Regrets</h1>
				<a
					href="/regrets/new"
					class="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
				>
					Add New
				</a>
			</div>

			{#if sortedRegrets.length === 0}
				<div class="rounded-lg bg-gray-800/50 p-12 text-center">
					<h2 class="mb-4 text-2xl font-bold text-gray-300">No regrets yet</h2>
					<p class="mb-6 text-gray-400">
						Start by documenting moments you want to remember when tempted.
					</p>
					<a
						href="/regrets/new"
						class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
					>
						Add Your First Regret
					</a>
				</div>
			{:else}
				<div class="space-y-4">
					{#each sortedRegrets as regret (regret.id)}
						<div class="rounded-lg border border-gray-700 bg-gray-800/50 p-6 hover:border-gray-600">
							<div class="mb-2 flex items-start justify-between">
								<h2 class="text-2xl font-bold">{regret.title}</h2>
								<button
									onclick={() => deleteRegret(regret.id)}
									class="text-gray-400 hover:text-red-400"
									aria-label="Delete regret"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							</div>

							<p class="mb-4 text-gray-300">{regret.description}</p>

							<div class="flex items-center gap-2">
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
								<span class="ml-auto text-sm text-gray-400">
									{formatRelativeTime(regret.timestamp)}
								</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>
</div>
