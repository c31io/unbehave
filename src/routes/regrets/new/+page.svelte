<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { generateId } from '$lib/utils';
	import type { Regret } from '$lib/types';
	import { goto } from '$app/navigation';

	let title = $state('');
	let description = $state('');
	let severity = $state<'low' | 'medium' | 'high'>('medium');
	let tagInput = $state('');
	let tags = $state<string[]>([]);

	function addTag() {
		const trimmed = tagInput.trim();
		if (trimmed && !tags.includes(trimmed)) {
			tags = [...tags, trimmed];
			tagInput = '';
		}
	}

	function removeTag(tag: string) {
		tags = tags.filter((t) => t !== tag);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!title.trim() || !description.trim()) {
			alert('Please fill in both title and description');
			return;
		}

		const regret: Regret = {
			id: generateId(),
			title: title.trim(),
			description: description.trim(),
			timestamp: Date.now(),
			severity,
			tags: [...tags]
		};

		await appState.addRegret(regret);
		goto('/regrets');
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<a href="/regrets" class="text-2xl font-bold hover:text-gray-300">← Back to Regrets</a>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-2xl">
			<h1 class="mb-8 text-4xl font-bold">Add a New Regret</h1>

			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="title" class="mb-2 block text-sm font-semibold">Title</label>
					<input
						id="title"
						type="text"
						bind:value={title}
						placeholder="e.g., Wasted 4 hours on social media"
						class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label for="description" class="mb-2 block text-sm font-semibold">Description</label>
					<textarea
						id="description"
						bind:value={description}
						placeholder="Describe what happened and how you felt..."
						rows="6"
						class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					></textarea>
				</div>

				<fieldset>
					<legend class="mb-2 block text-sm font-semibold">Severity</legend>
					<div class="flex gap-4">
						<label class="flex items-center gap-2">
							<input
								type="radio"
								bind:group={severity}
								value="low"
								class="h-4 w-4 text-blue-600"
							/>
							<span>Low</span>
						</label>
						<label class="flex items-center gap-2">
							<input
								type="radio"
								bind:group={severity}
								value="medium"
								class="h-4 w-4 text-blue-600"
							/>
							<span>Medium</span>
						</label>
						<label class="flex items-center gap-2">
							<input
								type="radio"
								bind:group={severity}
								value="high"
								class="h-4 w-4 text-blue-600"
							/>
							<span>High</span>
						</label>
					</div>
				</fieldset>

				<div>
					<label for="tags" class="mb-2 block text-sm font-semibold">Tags (optional)</label>
					<div class="flex gap-2">
						<input
							id="tags"
							type="text"
							bind:value={tagInput}
							onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
							placeholder="Add a tag..."
							class="flex-1 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							type="button"
							onclick={addTag}
							class="rounded-lg bg-gray-700 px-6 py-3 font-semibold hover:bg-gray-600"
						>
							Add
						</button>
					</div>
					{#if tags.length > 0}
						<div class="mt-3 flex flex-wrap gap-2">
							{#each tags as tag}
								<button
									type="button"
									onclick={() => removeTag(tag)}
									class="flex items-center gap-1 rounded bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600"
								>
									{tag}
									<span class="text-gray-400">×</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
					>
						Save Regret
					</button>
					<a
						href="/regrets"
						class="flex-1 rounded-lg border border-gray-600 px-6 py-3 text-center font-semibold hover:bg-gray-800"
					>
						Cancel
					</a>
				</div>
			</form>
		</div>
	</main>
</div>
