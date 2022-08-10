export function handleGrammaticalNumber(number: number, singular: string, plural: string): string {
	return number === 1 ? `${number} ${singular}` : `${number} ${plural}`;
}
