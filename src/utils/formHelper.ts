function requiredField(length: number, check: () => React.ReactNode): React.ReactNode {
	return length < 1 ? 'Pflichtfeld' : check();
}

export function requiredFieldWithMaxLength(length: number, maxLength: number): React.ReactNode {
	return requiredField(length, () => maxLengthField(length, maxLength));
}

export function maxLengthField(length: number, maxLength: number): React.ReactNode {
	return validate(length > maxLength, `Nicht länger als ${maxLength} Zeichen`);
}

export function validate(check: boolean, error: string): React.ReactNode {
	return check ? error : null;
}
