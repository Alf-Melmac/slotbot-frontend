import {FocusEvent, useState} from 'react';
import {CounterBadge} from '../../Form/CounterBadge';
import {TextareaProps, TextInputProps} from '@mantine/core';

type InputProps = TextInputProps | TextareaProps;

export function MaxLengthHelper(maxLength: number | undefined, value: string, props: InputProps): any {
	const [showRightSection, setShowRightSection] = useState(false);
	if (!maxLength) {
		throw Error('MaxLength is missing.');
	}

	// noinspection UnnecessaryLocalVariableJS Want to type the variable
	const ret: InputProps = {
		...props,
		maxLength: maxLength,
		rightSection: showRightSection ? <CounterBadge currentValue={value.length} maxValue={maxLength}/> : null,
		rightSectionWidth: (maxLength || 0) < 1000 ? 60 : 81,
		onFocus: (e: FocusEvent<HTMLInputElement> & FocusEvent<HTMLTextAreaElement>) => {
			props.onFocus?.(e);
			setShowRightSection(true);
		},
		onBlur: (e: FocusEvent<HTMLInputElement> & FocusEvent<HTMLTextAreaElement>) => {
			props.onBlur?.(e);
			setShowRightSection(false);
		},
	};
	return ret;
}
