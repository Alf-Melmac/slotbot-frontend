import {useState} from 'react';
import {CounterBadge} from '../CounterBadge';

export function MaxLengthHelper(maxLength: number | undefined, value: string): any {
	const [showRightSection, setShowRightSection] = useState(false);
	if (!maxLength) {
		throw Error('MaxLength is missing.');
	}

	// noinspection JSUnusedGlobalSymbols False positive
	return {
		maxLength: maxLength,
		rightSection: showRightSection ? <CounterBadge currentValue={value.length} maxValue={maxLength}/> : null,
		rightSectionWidth: (maxLength || 0) < 1000 ? 60 : 81,
		onFocus: () => setShowRightSection(true),
		onBlur: () => setShowRightSection(false),
	};
}
