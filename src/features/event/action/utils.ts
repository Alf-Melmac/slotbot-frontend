/**
 * Generates a random color in hex format
 */
export function randomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
