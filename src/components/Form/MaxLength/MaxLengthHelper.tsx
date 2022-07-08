import {Badge} from '@mantine/core';
import {useState} from 'react';

export function MaxLengthHelper(maxLength: number | undefined, value: string): any {
	const [showRightSection, setShowRightSection] = useState(false);
	const badgeColor = (maxLength || 0) <= value.length ? 'red' : undefined;

	return {
		maxLength: maxLength,
		rightSection: showRightSection ? <Badge color={badgeColor}>{value.length}/{maxLength}</Badge> : null,
		rightSectionWidth: (maxLength || 0) < 1000 ? 60 : 81,
		onFocus: () => setShowRightSection(true),
		onBlur: () => setShowRightSection(false),
	};
}
