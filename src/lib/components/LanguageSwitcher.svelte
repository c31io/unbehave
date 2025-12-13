<script lang="ts">
	import { getLocale, localizeHref, type Locale } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	const languageNames: Record<Locale, string> = {
		en: 'English',
		cn: '中文'
	};

	let currentLocale = $derived(getLocale());
	let nextLocale = $derived<Locale>(currentLocale === 'en' ? 'cn' : 'en');
	let switchUrl = $derived(localizeHref($page.url.pathname, { locale: nextLocale }));
</script>

<a
	href={switchUrl}
	data-sveltekit-reload
	class="flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:bg-gray-700"
	title="Switch language"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
		/>
	</svg>
	<span>{languageNames[currentLocale]}</span>
</a>
