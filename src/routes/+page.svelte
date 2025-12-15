<script lang="ts">
	import { appState } from '$lib/stores/app.svelte';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold">{m.app_name()}</h1>
				<div class="flex gap-4">
					<a href={localizeHref('/regrets')} class="hover:text-gray-300">{m.nav_my_regrets()}</a>
					<a href={localizeHref('/stats')} class="hover:text-gray-300">{m.nav_stats()}</a>
					<a href={localizeHref('/learn')} class="hover:text-gray-300">{m.nav_learn()}</a>
				</div>
			</div>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-12">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="mb-4 text-5xl font-bold">{m.home_title()}</h2>
			<p class="mb-8 text-xl text-gray-300">
				{m.home_subtitle()}
			</p>

			<div class="mb-8 grid gap-4">
				<a
					href={localizeHref('/intervention')}
					class="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
				>
					{m.home_show_regrets_button()}
				</a>

				<a
					href={localizeHref('/regrets/new')}
					class="rounded-lg border border-gray-600 px-8 py-4 text-lg font-semibold hover:bg-gray-800"
				>
					{m.home_add_regret_button()}
				</a>
			</div>

			<div class="mt-12 rounded-lg bg-gray-800/50 p-6">
				<h3 class="mb-4 text-2xl font-bold">{m.home_progress_title()}</h3>
				<div class="grid grid-cols-3 gap-4">
					<div>
						<div class="text-3xl font-bold text-green-400">
							{appState.stats.totalResisted}
						</div>
						<div class="text-gray-400">{m.home_times_resisted()}</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-red-400">{appState.stats.totalGaveIn}</div>
						<div class="text-gray-400">{m.home_times_gave_in()}</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-blue-400">
							{#if appState.stats.totalTemptations > 0}
								{Math.round((appState.stats.totalResisted / appState.stats.totalTemptations) * 100)}%
							{:else}
								-
							{/if}
						</div>
						<div class="text-gray-400">{m.home_success_rate()}</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
