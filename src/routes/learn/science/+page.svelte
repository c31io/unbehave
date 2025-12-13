<script lang="ts">
	import scienceContentEn from '$lib/data/science-content.md?raw';
	import scienceContentZh from '$lib/data/science-content.zh.md?raw';
	import { markdownToHtml } from '$lib/utils/markdown';

	// Detect locale from URL
	let content = $state('');
	$effect(() => {
		if (typeof window !== 'undefined') {
			const markdown = window.location.pathname.startsWith('/cn')
				? scienceContentZh
				: scienceContentEn;
			content = markdownToHtml(markdown);
		} else {
			content = markdownToHtml(scienceContentEn);
		}
	});
</script>

<main class="container mx-auto px-4 py-12">
	<div class="prose prose-invert mx-auto max-w-4xl prose-headings:font-bold prose-a:text-blue-400">
		{@html content}
	</div>
</main>
