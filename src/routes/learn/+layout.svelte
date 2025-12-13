<script lang="ts">
	import { page } from '$app/stores';
	import { localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	const isActive = (path: string) => {
		// Remove locale prefix from pathname for comparison
		const pathname = $page.url.pathname;
		const pathWithoutLocale = pathname.startsWith('/cn') ? pathname.slice(3) : pathname;
		return pathWithoutLocale === path || pathWithoutLocale.startsWith(path + '/');
	};
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<a href={localizeHref('/')} class="text-2xl font-bold hover:text-gray-300">← {m.app_name()}</a>
		</div>
	</nav>

	<div class="border-b border-gray-700 bg-gray-900/30">
		<div class="container mx-auto px-4">
			<div class="flex gap-1">
				<a
					href={localizeHref('/learn/science')}
					class="px-6 py-3 font-semibold transition-colors {isActive('/learn/science')
						? 'border-b-2 border-blue-500 text-white'
						: 'text-gray-400 hover:text-gray-300'}"
				>
					{m.learn_tab_science()}
				</a>
				<a
					href={localizeHref('/learn/addictions')}
					class="px-6 py-3 font-semibold transition-colors {isActive('/learn/addictions')
						? 'border-b-2 border-blue-500 text-white'
						: 'text-gray-400 hover:text-gray-300'}"
				>
					{m.learn_tab_addictions()}
				</a>
			</div>
		</div>
	</div>

	<slot />
</div>
