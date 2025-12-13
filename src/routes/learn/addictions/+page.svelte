<script lang="ts">
	import { predefinedAddictions, getAddictionName } from '$lib/addictions';
	import * as m from '$lib/paraglide/messages';
	import { markdownToHtml } from '$lib/utils/markdown';

	let selectedAddictionId = $state<string | null>(null);

	const selectedAddiction = $derived(
		predefinedAddictions.find((a) => a.id === selectedAddictionId)
	);
</script>

<main class="container mx-auto px-4 py-12">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-4 text-4xl font-bold">{m.addictions_page_title()}</h1>
		<p class="mb-8 text-lg text-gray-300">
			{m.addictions_page_description()}
		</p>

		<div class="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-3">
			{#each predefinedAddictions as addiction}
				<button
					onclick={() =>
						(selectedAddictionId = selectedAddictionId === addiction.id ? null : addiction.id)}
					class="rounded-lg border border-gray-600 bg-gray-800 p-6 text-left transition-all hover:border-gray-500 hover:bg-gray-750 {selectedAddictionId ===
					addiction.id
						? 'ring-2 ring-blue-500 border-blue-500'
						: ''}"
				>
					<div class="mb-2 text-4xl">{addiction.emoji}</div>
					<div class="text-lg font-semibold text-white">{getAddictionName(addiction.id)}</div>
				</button>
			{/each}
		</div>

		{#if selectedAddiction}
			<div class="rounded-lg border border-gray-700 bg-gray-800/50 p-8">
				<div class="mb-6 flex items-center gap-4">
					<span class="text-5xl">{selectedAddiction.emoji}</span>
					<h2 class="text-3xl font-bold">{getAddictionName(selectedAddiction.id)}</h2>
				</div>

				<div class="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-400">
					{@html markdownToHtml(selectedAddiction.treatment)}
				</div>

				<div class="mt-8 rounded-lg border border-blue-700 bg-blue-900/20 p-4">
					<p class="text-sm text-blue-300">
						💡 <strong>{m.addictions_tip_label()}</strong> {m.addictions_tip_text()}
					</p>
				</div>
			</div>
		{:else}
			<div class="rounded-lg border border-gray-700 bg-gray-800/30 p-12 text-center">
				<p class="text-xl text-gray-400">
					{m.addictions_select_prompt()}
				</p>
			</div>
		{/if}
	</div>
</main>
