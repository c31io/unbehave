<script lang="ts">
	interface Props {
		value: number;
		interactive?: boolean;
		onchange?: (value: number) => void;
		size?: 'sm' | 'md' | 'lg';
	}

	let { value = 5, interactive = false, onchange, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'w-2 h-2',
		md: 'w-3 h-3',
		lg: 'w-4 h-4'
	};

	function getColor(index: number): string {
		// Use HSL color space for smooth gradient from blue (240°) to red (0°)
		// Going the other way: blue -> purple -> magenta -> red (avoiding green)
		const ratio = index / 10;
		// Hue: 240 (blue) -> 0 (red), going forward through purple/magenta
		// This avoids green (120°) which indicates healthy
		const hue = 240 + ratio * 120; // 240° -> 360° (which wraps to 0° red)
		// Saturation: reduced for more muted, less pure colors
		const saturation = 50;
		// Lightness: slightly brighter in middle range
		const lightness = 50 + Math.sin(ratio * Math.PI) * 10;
		
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	function handleClick(index: number) {
		if (interactive && onchange) {
			onchange(index);
		}
	}
</script>

<div class="flex items-center gap-1">
	{#each Array.from({ length: 10 }, (_, i) => i + 1) as index}
		<button
			type="button"
			onclick={() => handleClick(index)}
			disabled={!interactive}
			class="{sizeClasses[size]} rounded-full transition-all {interactive
				? 'cursor-pointer hover:scale-110'
				: 'cursor-default'}"
			style="background-color: {index <= value ? getColor(index) : '#374151'}"
			aria-label="Severity level {index}"
		></button>
	{/each}
</div>
