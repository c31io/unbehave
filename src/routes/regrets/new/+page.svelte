<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { generateId } from '$lib/utils';
	import type { Regret } from '$lib/types';
	import { goto } from '$app/navigation';
	import { predefinedAddictions, getUserAddictions } from '$lib/addictions';
	import { onMount } from 'svelte';
	import SeverityRating from '$lib/components/SeverityRating.svelte';

	let title = $state('');
	let description = $state('');
	let severity = $state(5);
	let selectedAddiction = $state('');
	let showTreatment = $state(false);
	let userAddictions = $state<string[]>([]);
	let showAddictionSetup = $state(false);

	onMount(() => {
		userAddictions = getUserAddictions();
		if (userAddictions.length === 0) {
			showAddictionSetup = true;
		}
	});

	const selectedAddictionData = $derived(
		predefinedAddictions.find((a) => a.id === selectedAddiction)
	);

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
			tags: selectedAddiction ? [selectedAddiction] : []
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
					<legend class="mb-2 block text-sm font-semibold">
						Severity
						<span class="ml-2 text-xs font-normal text-gray-400">Current: {severity}</span>
					</legend>
					<SeverityRating value={severity} interactive={true} onchange={(val) => (severity = val)} size="lg" />
				</fieldset>

				<div>
					<label for="addiction" class="mb-2 block text-sm font-semibold">
						Choose addiction label
						{#if userAddictions.length === 0}
							<span class="ml-2 text-xs text-gray-400">(Setup your list first)</span>
						{/if}
					</label>
					{#if showAddictionSetup}
						<div class="mb-4 rounded-lg border-2 border-blue-600 bg-blue-900/20 p-4">
							<p class="mb-3 text-sm text-blue-300">
								Select the addictions/temptations you want to track. You can always change this
								later.
							</p>
							<div class="grid gap-2 sm:grid-cols-2">
								{#each predefinedAddictions as addiction}
									<label class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-600 bg-gray-800 p-3 transition-colors hover:border-gray-500">
										<input
											type="checkbox"
											value={addiction.id}
											checked={userAddictions.includes(addiction.id)}
											onchange={(e) => {
												const checked = (e.target as HTMLInputElement).checked;
												if (checked) {
													userAddictions = [...userAddictions, addiction.id];
												} else {
													userAddictions = userAddictions.filter((id) => id !== addiction.id);
												}
											}}
											class="h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-2 focus:ring-blue-500"
										/>
										<span class="text-2xl">{addiction.emoji}</span>
										<span class="flex-1 text-sm font-medium">{addiction.name}</span>
									</label>
								{/each}
							</div>
							<button
								type="button"
								onclick={() => {
									if (userAddictions.length > 0) {
										import('$lib/addictions').then(({ setUserAddictions }) => {
											setUserAddictions(userAddictions);
										});
										showAddictionSetup = false;
									} else {
										alert('Please select at least one addiction to track');
									}
								}}
								class="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
							>
								Save My List
							</button>
						</div>
					{:else}
						<select
							id="addiction"
							bind:value={selectedAddiction}
							onchange={() => (showTreatment = false)}
							class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">None</option>
							{#each userAddictions as addictionId}
								{@const addiction = predefinedAddictions.find((a) => a.id === addictionId)}
								{#if addiction}
									<option value={addiction.id}>
										{addiction.emoji} {addiction.name}
									</option>
								{/if}
							{/each}
						</select>
						<button
							type="button"
							onclick={() => (showAddictionSetup = true)}
							class="mt-2 text-sm text-blue-400 hover:text-blue-300"
						>
							⚙️ Manage my addiction list
						</button>
					{/if}
				</div>

				{#if selectedAddictionData && !showAddictionSetup}
					<div class="rounded-lg border border-gray-700 bg-gray-800/50">
						<button
							type="button"
							onclick={() => (showTreatment = !showTreatment)}
							class="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-800"
						>
							<div class="flex items-center gap-3">
								<span class="text-2xl">{selectedAddictionData.emoji}</span>
								<span class="font-semibold">
									Treatment Guide: {selectedAddictionData.name}
								</span>
							</div>
							<span class="text-2xl text-gray-400">{showTreatment ? '−' : '+'}</span>
						</button>
						{#if showTreatment}
							<div class="border-t border-gray-700 p-4">
								<div class="prose prose-invert prose-sm max-w-none">
									{@html selectedAddictionData.treatment
										.split('\n')
										.map((line) => {
											if (line.startsWith('## ')) return `<h2 class="text-xl font-bold mb-3 text-white">${line.slice(3)}</h2>`;
											if (line.startsWith('### ')) return `<h3 class="text-lg font-semibold mb-2 text-blue-300">${line.slice(4)}</h3>`;
											if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-bold text-gray-200 mb-2">${line.slice(2, -2)}</p>`;
											if (line.startsWith('- ')) return `<li class="ml-4 text-gray-300">${line.slice(2)}</li>`;
											if (line.trim() === '') return '<br/>';
											return `<p class="text-gray-300 mb-2">${line}</p>`;
										})
										.join('')}
								</div>
							</div>
						{/if}
					</div>
				{/if}

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
