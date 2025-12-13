<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { generateId } from '$lib/utils';
	import { goto } from '$app/navigation';
	import SeverityRating from '$lib/components/SeverityRating.svelte';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	let selectedRegrets = $state<string[]>([]);

	const sortedRegrets = $derived(
		[...appState.regrets].sort((a, b) => b.severity - a.severity).slice(0, 5)
	);

	async function handleResist() {
		await appState.recordEvent({
			id: generateId(),
			temptationId: 'general',
			timestamp: Date.now(),
			resisted: true,
			regretsViewed: [...selectedRegrets]
		});
		selectedRegrets = [];
		goto(localizeHref('/'));
	}

	async function handleGaveIn() {
		await appState.recordEvent({
			id: generateId(),
			temptationId: 'general',
			timestamp: Date.now(),
			resisted: false,
			regretsViewed: [...selectedRegrets]
		});
		selectedRegrets = [];
		goto(localizeHref('/'));
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
				<a href={localizeHref('/')} class="text-2xl font-bold hover:text-gray-300">← {m.app_name()}</a>
			</div>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-6 text-3xl font-bold">{m.intervention_title()}</h2>

			{#if appState.regrets.length === 0}
				<div class="rounded-lg bg-gray-800/50 p-8 text-center">
					<p class="mb-4 text-xl text-gray-300">{m.intervention_no_regrets()}</p>
					<a
						href={localizeHref('/regrets/new')}
						class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
					>
						{m.intervention_add_first()}
					</a>
				</div>
			{:else}
				<div class="mb-6 space-y-4">
					{#each sortedRegrets as regret (regret.id)}
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
							<div class="mt-3 flex items-center gap-3">
								<SeverityRating value={regret.severity} size="sm" />
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
						{m.intervention_resist_button()}
					</button>
					<button
						onclick={handleGaveIn}
						class="flex-1 rounded-lg bg-red-600/80 px-6 py-4 text-lg font-semibold hover:bg-red-600"
					>
						{m.intervention_gave_in_button()}
					</button>
				</div>

				<a
					href={localizeHref('/')}
					class="mt-4 block w-full rounded-lg border border-gray-600 px-6 py-3 text-center hover:bg-gray-800"
				>
					{m.intervention_go_back()}
				</a>
			{/if}
		</div>
	</main>
</div>
