export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(timestamp: number): string {
	const date = new Date(timestamp);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function formatRelativeTime(timestamp: number): string {
	const now = Date.now();
	const diff = now - timestamp;
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) return 'just now';
	if (minutes < 60) return `${minutes}m ago`;
	if (hours < 24) return `${hours}h ago`;
	if (days < 7) return `${days}d ago`;
	if (days < 30) return `${Math.floor(days / 7)}w ago`;
	return formatDate(timestamp);
}

export function calculateStreak(events: Array<{ timestamp: number; resisted: boolean }>): number {
	if (events.length === 0) return 0;

	const sortedEvents = events.sort((a, b) => b.timestamp - a.timestamp);
	let streak = 0;
	const oneDayMs = 24 * 60 * 60 * 1000;
	let currentDate = new Date().setHours(0, 0, 0, 0);

	for (const event of sortedEvents) {
		if (!event.resisted) break;

		const eventDate = new Date(event.timestamp).setHours(0, 0, 0, 0);
		const diff = currentDate - eventDate;

		if (diff <= oneDayMs) {
			streak++;
			currentDate = eventDate - oneDayMs;
		} else {
			break;
		}
	}

	return streak;
}
