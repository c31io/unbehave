<script lang="ts">
	import { page } from '$app/stores';

	const isActive = (path: string) => {
		return $page.url.pathname === path || $page.url.pathname.startsWith(path + '/');
	};
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<nav class="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<a href="/" class="text-2xl font-bold hover:text-gray-300">← unbehave</a>
		</div>
	</nav>

	<div class="border-b border-gray-700 bg-gray-900/30">
		<div class="container mx-auto px-4">
			<div class="flex gap-1">
				<a
					href="/learn/science"
					class="px-6 py-3 font-semibold transition-colors {isActive('/learn/science')
						? 'border-b-2 border-blue-500 text-white'
						: 'text-gray-400 hover:text-gray-300'}"
				>
					Science
				</a>
				<a
					href="/learn/addictions"
					class="px-6 py-3 font-semibold transition-colors {isActive('/learn/addictions')
						? 'border-b-2 border-blue-500 text-white'
						: 'text-gray-400 hover:text-gray-300'}"
				>
					Addictions
				</a>
			</div>
		</div>
	</div>

	<slot />
</div>
