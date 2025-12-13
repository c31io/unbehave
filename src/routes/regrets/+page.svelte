<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import { formatRelativeTime } from '$lib/utils';
	import SeverityRating from '$lib/components/SeverityRating.svelte';

	const sortedRegrets = $derived(
		[...appState.regrets].sort((a, b) => b.timestamp - a.timestamp)
	);

	let showImportModal = $state(false);
	let importMode = $state<'merge' | 'replace'>('merge');

	async function deleteRegret(id: string) {
		if (confirm('Are you sure you want to delete this regret?')) {
			await appState.deleteRegret(id);
		}
	}

	async function exportData() {
		try {
			const jsonData = await appState.exportData();
			const blob = new Blob([jsonData], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			const date = new Date().toISOString().split('T')[0];
			a.download = `unbehave-backup-${date}.json`;
			a.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			alert('Failed to export data: ' + (error as Error).message);
		}
	}

	function openImportDialog() {
		showImportModal = true;
	}

	function closeImportModal() {
		showImportModal = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		// Only close if clicking directly on the backdrop, not on modal content
		if (event.target === event.currentTarget) {
			closeImportModal();
		}
	}

	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeImportModal();
		}
	}

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				try {
					const jsonData = e.target?.result as string;
					await appState.importData(jsonData, importMode);
					showImportModal = false;
					alert('Data imported successfully!');
				} catch (error) {
					alert('Failed to import data: ' + (error as Error).message);
				}
			};
			reader.readAsText(file);
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
				<div class="flex gap-2">
					<button
						onclick={exportData}
						class="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold hover:bg-gray-800"
						title="Export all data"
					>
						📥 Export
					</button>
					<button
						onclick={openImportDialog}
						class="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold hover:bg-gray-800"
						title="Import data from file"
					>
						📤 Import
					</button>
					<a
						href="/regrets/new"
						class="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
					>
						Add New
					</a>
				</div>
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

							<div class="flex items-center gap-3">
								<SeverityRating value={regret.severity} size="sm" />
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

	{#if showImportModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
			onclick={handleBackdropClick}
			onkeydown={handleBackdropKeydown}
			role="button"
			tabindex="0"
			aria-label="Close import dialog"
		>
			<div
				class="mx-4 w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-xl"
			>
				<h2 class="mb-4 text-2xl font-bold">Import Data</h2>

				<fieldset class="mb-6">
					<legend class="mb-3 text-sm font-semibold text-gray-300">Import Mode</legend>
					<div class="space-y-3">
						<label class="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-600 bg-gray-800 p-3 transition-colors hover:border-gray-500">
							<input
								type="radio"
								name="importMode"
								value="merge"
								bind:group={importMode}
								class="mt-1 h-4 w-4 border-gray-500 text-blue-600 focus:ring-2 focus:ring-blue-500"
							/>
							<div class="flex-1">
								<div class="font-semibold">Merge</div>
								<div class="text-sm text-gray-400">
									Add imported data to existing data (recommended)
								</div>
							</div>
						</label>

						<label class="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-600 bg-gray-800 p-3 transition-colors hover:border-gray-500">
							<input
								type="radio"
								name="importMode"
								value="replace"
								bind:group={importMode}
								class="mt-1 h-4 w-4 border-gray-500 text-blue-600 focus:ring-2 focus:ring-blue-500"
							/>
							<div class="flex-1">
								<div class="font-semibold">Replace</div>
								<div class="text-sm text-gray-400">
									Delete all existing data and replace with imported data
								</div>
							</div>
						</label>
					</div>
				</fieldset>

				<input
					type="file"
					accept=".json"
					onchange={handleFileSelect}
					class="mb-4 w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:hover:bg-blue-700"
				/>

				<div class="flex gap-3">
					<button
						onclick={closeImportModal}
						class="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold hover:bg-gray-800"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
