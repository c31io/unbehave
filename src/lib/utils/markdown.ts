/**
 * Simple markdown to HTML converter
 * Relies on Tailwind Typography prose classes for styling
 */
export function markdownToHtml(markdown: string): string {
	return markdown
		// Headers
		.replace(/^### (.+)$/gm, '<h3>$1</h3>')
		.replace(/^## (.+)$/gm, '<h2>$1</h2>')
		.replace(/^# (.+)$/gm, '<h1>$1</h1>')
		// Blockquotes
		.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
		// Bold
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		// Italic
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		// Links
		.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
		// Horizontal rules
		.replace(/^---$/gm, '<hr />')
		// Unordered lists
		.replace(/^- (.+)$/gm, '<li>$1</li>')
		// Ordered lists
		.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
		// Wrap consecutive list items in ul
		.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
		// Paragraphs (anything not already wrapped in tags)
		.replace(/^(?!<[hbul]|<\/|<hr)(.+)$/gm, '<p>$1</p>')
		// Clean up empty lines
		.replace(/\n\n+/g, '\n');
}
