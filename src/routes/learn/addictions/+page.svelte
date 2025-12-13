<script lang="ts">
	import { predefinedAddictions } from '$lib/addictions';

	let selectedAddictionId = $state<string | null>(null);

	const selectedAddiction = $derived(
		predefinedAddictions.find((a) => a.id === selectedAddictionId)
	);

	function formatTreatment(text: string): string {
		return text
			.split('\n')
			.map((line) => {
				if (line.startsWith('## ')) {
					return `<h2 class="text-2xl font-bold mb-4 mt-8 text-white">${line.slice(3)}</h2>`;
				}
				if (line.startsWith('### ')) {
					return `<h3 class="text-xl font-semibold mb-3 mt-6 text-blue-300">${line.slice(4)}</h3>`;
				}
				if (line.startsWith('**') && line.endsWith('**')) {
					return `<p class="font-bold text-gray-200 mb-2 mt-4">${line.slice(2, -2)}</p>`;
				}
				if (line.startsWith('⚠️')) {
					return `<div class="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 mb-4 text-yellow-200">${line}</div>`;
				}
				if (line.startsWith('- ')) {
					return `<li class="ml-4 text-gray-300 mb-1">${line.slice(2)}</li>`;
				}
				if (line.trim() === '') {
					return '<br/>';
				}
				return `<p class="text-gray-300 mb-2">${line}</p>`;
			})
			.join('');
	}
</script>

<main class="container mx-auto px-4 py-12">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-4 text-4xl font-bold">Understanding Addictions</h1>
		<p class="mb-8 text-lg text-gray-300">
			Learn about common addictions, their mechanisms, and evidence-based treatment approaches.
		</p>

		<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
					<div class="text-lg font-semibold text-white">{addiction.name}</div>
				</button>
			{/each}
		</div>

		{#if selectedAddiction}
			<div class="rounded-lg border border-gray-700 bg-gray-800/50 p-8">
				<div class="mb-6 flex items-center gap-4">
					<span class="text-5xl">{selectedAddiction.emoji}</span>
					<h2 class="text-3xl font-bold">{selectedAddiction.name}</h2>
				</div>

				<div class="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-400">
					{@html formatTreatment(selectedAddiction.treatment)}
				</div>

				<div class="mt-8 rounded-lg border border-blue-700 bg-blue-900/20 p-4">
					<p class="text-sm text-blue-300">
						💡 <strong>Tip:</strong> When creating a regret entry, you can select this addiction
						to access quick treatment tips and track patterns specific to this behavior.
					</p>
				</div>
			</div>
		{:else}
			<div class="rounded-lg border border-gray-700 bg-gray-800/30 p-12 text-center">
				<p class="text-xl text-gray-400">
					Select an addiction above to learn about its treatment approaches
				</p>
			</div>
		{/if}
	</div>
</main>
